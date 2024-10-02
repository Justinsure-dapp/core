import express from "express";
import crypto from "crypto";
import Policy from "../models/Policy";
import { isAddress, verifyMessage } from "viem";
import { generateRandomHex, generateTokenSymbol } from "../utils";
import { PinataSDK } from "pinata";
import { PolicyData } from "../types/custom";
import User from "../models/User";
import executor from "../executor";
import surityInterface from "../contracts/surityInterface";
import evm from "../evm";
import evmConfig from "../../evmConfig";

const router = express.Router();

const pinata = new PinataSDK({
  pinataJwt: process.env.PINATA_JWT,
  pinataGateway: process.env.PINATA_GATEWAY_URL,
});

const newPolicyNonceStore: Record<string, string> = {};
router.post("/new/request-nonce", async (req, res) => {
  newPolicyNonceStore[req.body.address] = generateRandomHex(32);
  res.status(200).send({ nonce: newPolicyNonceStore[req.body.address] });
});

router.post("/new", async (req, res) => {
  const { data, sign }: { data: PolicyData; sign: any } = req.body;

  try {
    // check if creator address is valid
    const creatorAddress = data.creator;

    if (!isAddress(creatorAddress)) {
      res.status(400).json({ message: "Invalid Creator Address / Signature" });
      return;
    }

    // check if user exists and is a marketer
    const user = await User.findOne({ address: creatorAddress });

    if (!user || !user.marketer) {
      res.status(401).json({
        message: "No Marketer Account Found",
      });
      return;
    }

    // check if policy with same form data already exists
    const policyExists = await Policy.findOne({
      ...data,
    });

    if (policyExists) {
      res.status(400).json({ message: "Policy already exists" });
      return;
    }

    // check if signature is valid
    const verified = await verifyMessage({
      address: creatorAddress,
      message: `${JSON.stringify(data)}${newPolicyNonceStore[creatorAddress]}`,
      signature: sign,
    });

    if (!verified) {
      res.status(401).json({ message: "Signature verification failed" });
      return;
    }

    // Save data in IPFS without tags
    const tags = data.tags;
    delete data.tags;

    const newBlob = new Blob([JSON.stringify(data)]);
    const newFile = new File([newBlob], `policy_${new Date().getTime()}.json`);

    const upload = await pinata.upload.file(newFile);
    const cid = upload.cid;

    // Save the cid to blockchain
    const tokenSymbol = generateTokenSymbol(data.name);
    const blockNumberBeforeTx = await evm.client.getBlockNumber();

    const txHash = await surityInterface.write.createInsurancePolicy([
      creatorAddress,
      cid,
      data.name,
      tokenSymbol,
      BigInt(data.minimumDuration),
      BigInt(data.maximumDuration),
      BigInt(data.minimumClaim),
      BigInt(data.maximumClaim),
    ]);

    const receipt = await evm.client.waitForTransactionReceipt({
      hash: txHash,
    });

    if (receipt.status !== "success") {
      res.status(400).json({ message: "Staking failed" });
      return;
    }

    // Get the controller address from the logs
    const logs = await evm.client.getContractEvents({
      abi: surityInterface.abi,
      address: surityInterface.address,
      eventName: "policyCreated",
      fromBlock: blockNumberBeforeTx,
      toBlock: "latest",
    });

    logs.filter((log) => log.args.creator === creatorAddress);
    const controllerAddress = logs[0].args.controller;

    if (!controllerAddress) {
      res.status(500).json({ message: "Controller address not found" });
      return;
    }

    if (!isAddress(controllerAddress)) {
      res.status(500).json({ message: "Invalid Controller address" });
      return;
    }

    const stakeTokenAddress = await evm.client.readContract({
      address: controllerAddress,
      abi: evmConfig.insuranceController.abi,
      functionName: "stakeToken",
    });

    if (!stakeTokenAddress) {
      res.status(500).json({ message: "Stake Token address not found" });
      return;
    }

    const policy = new Policy({
      ...data,
      address: controllerAddress,
      stakeToken: stakeTokenAddress,
      stakeTokenSymbol: tokenSymbol,
      cid: cid,
      tags: tags,
    });

    await policy.save();

    user.marketer.policiesCreated?.push(controllerAddress as string);
    user.markModified("marketer");
    await user.save();

    res.status(200).json({
      message: "Policy created successfully",
      policy,
    });

    return;
  } catch (error: any) {
    console.error(error);
    if (error?.message) {
      res.status(500).json({ message: error?.message });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
    return;
  }
});

router.get("/get/:address", async (req, res) => {
  const { address } = req.params;
  const policy = await Policy.findOne({ address: address });

  return res.status(200).send({ policy });
});

router.get("/fetch/all", async (req, res) => {
  try {
    const policies = await Policy.find();

    // const policyData = [];
    // fetch files for each CID from pinata
    // for (const policy of policies) {
    //   const cid = policy.cid;
    //   const file = await pinata.gateways.get(cid);
    //   const IPFSJSON = await blobToJSON(file.data as Blob);
    //   policyData.push({
    //     ...IPFSJSON,
    //     address: policy.address,
    //     tags: policy.tags,
    //     rating: policy.rating,
    //   });
    // }

    return res.status(200).send({ policies });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: error?.message });
  }
});

router.get("/fetch/:address", async (req, res) => {
  const creator = req.params.address;

  try {
    const policies = await Policy.find({ creator });
    return res.status(200).send({ policies });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: error?.message });
  }
});

router.get("/premium/:address/", async (req, res) => {
  try {
    if (typeof req.query.args != "string") throw "Invalid args";
    const args = JSON.parse(req.query.args) as Array<{
      arg: string;
      value: string;
    }>;

    const policy = await Policy.findOne({ address: req.params.address });
    if (!policy) throw "Invalid Policy Address";

    const functionNameMatch = policy.premiumFunc.match(
      /def\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/,
    );
    const funcName = functionNameMatch ? functionNameMatch[1] : null;

    const pyFile = `
${policy.premiumFunc}
    
print(${funcName}(${args.map((a) => a.value).join(",")}))
    `;

    const key = crypto.hash("SHA256", pyFile).toString();

    executor.outputStore[key] = {
      pycode: pyFile,
      output: null,
    };

    executor.executionQueue.push(key);

    return res.send({ key: key });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: error?.message });
  }
});

router.post("/update/stakers/:address", async (req, res) => {
  const { staker, amount } = req.body;
  const address = req.params.address;

  try {
    const policy = await Policy.findOne({
      address
    });

    if (!policy) {
      res.status(400).json({ message: "Policy not found.." });
      return;
    }

    // if already staked, update the amount
    const stakerIndex = policy.stakers.findIndex((s) => s.address === staker);

    if (stakerIndex !== -1) {
      policy.stakers[stakerIndex].amount += amount;
    } else {
      policy.stakers.push({ address: staker, amount });
    }

    console.log(policy.stakers);
    policy.markModified("stakers");
    await policy.save();

    res.status(200).json({ message: "Stakers updated successfully.." });
    return;
  } catch (error: any) {
    console.error(error);
    if (error?.message) {
      res.status(500).json({ message: error?.message });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
    return;
  }
});

export default router;
