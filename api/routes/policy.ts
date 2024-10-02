import express from "express";
import fs from "fs";
import crypto from "crypto";
import Policy from "../models/Policy";
import { getContract, isAddress, verifyMessage } from "viem";
import { generateRandomHex, generateTokenSymbol } from "../utils";
import { PinataSDK } from "pinata";
import contractDefinitions from "../contracts";
import { publicClient, walletClient } from "../../evm";
import { PolicyData } from "../types/custom";
import { spawn } from "child_process";
import User from "../models/User";
import executor from "../executor";

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
  try {
    // verify signature
    const { data, sign }: { data: PolicyData; sign: any } = req.body;

    const address = data.creator;
    const user = await User.findOne({ address });

    if (!user || !user.marketer) {
      return res.status(401).json({
        message: "No Marketer Account Found",
      });
    }

    if (!isAddress(address)) {
      return res
        .status(400)
        .json({ message: "Invalid Creator Address / Signature" });
    }

    const policyExists = await Policy.findOne({
      ...data,
    });

    if (policyExists) {
      return res.status(400).json({ message: "Policy already exists" });
    }

    const verified = await verifyMessage({
      address,
      message: `${JSON.stringify(data)}${newPolicyNonceStore[address]}`,
      signature: sign,
    });

    if (!verified) {
      return res.status(401).json({ message: "Signature verification failed" });
    }

    // Extract tags from data
    const tags = data.tags;
    delete data.tags;

    // Save to IPFS using pinata
    const file = new File([JSON.stringify(data)], `${address}.json`, {
      type: "application/json",
    });

    const upload = await pinata.upload.file(file);
    const cid = upload.cid;

    // Save the cid to blockchain
    const surityInterface = getContract({
      ...contractDefinitions.surityInterface,
      client: walletClient,
    });

    const blockNumberBeforeTx = await walletClient.getBlockNumber();

    const txHash = await surityInterface.write.createInsurancePolicy([
      address,
      cid,
      data.name,
      generateTokenSymbol(data.name),
      BigInt(data.minimumDuration),
      BigInt(data.maximumDuration),
      BigInt(data.minimumClaim),
      BigInt(data.maximumClaim),
    ]);

    const receipt = await walletClient.waitForTransactionReceipt({
      hash: txHash,
    });

    if (receipt.status !== "success") {
      return res.status(400).json({ message: "Staking failed" });
    }

    const logs = await publicClient.getContractEvents({
      abi: contractDefinitions.surityInterface.abi,
      address: contractDefinitions.surityInterface.address,
      eventName: "policyCreated",
      fromBlock: blockNumberBeforeTx,
      toBlock: "latest",
    });

    logs.filter((log) => log.args.creator === address);
    const controllerAddress = logs[0].args.controller;

    if (!controllerAddress) {
      return res.status(500).json({ message: "Controller address not found" });
    }

    if (!isAddress(controllerAddress)) {
      return res.status(500).json({ message: "Invalid Controller address" });
    }

    const stakeTokenAddress = await publicClient.readContract({
      address: controllerAddress,
      abi: contractDefinitions.insuranceController.abi,
      functionName: "stakeToken",
    });

    if (!stakeTokenAddress) {
      return res.status(500).json({ message: "Stake Token address not found" });
    }

    const policy = new Policy({
      ...data,
      address: controllerAddress,
      stakeToken: stakeTokenAddress,
      cid: cid,
      tags: tags,
    });

    await policy.save();

    user.marketer.policiesCreated?.push(controllerAddress as string);
    user.markModified("marketer");
    await user.save();

    return res.status(200).json({
      message: "Policy created successfully",
      policy,
    });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
});

router.get("/get/:address", async (req, res) => {
  const { address } = req.params;
  const policy = await Policy.findOne({ address: address });

  console.log(policy);

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

export default router;
