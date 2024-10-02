import express from "express";
import User from "../models/User";
import { generateRandomHex } from "../utils";
import { recoverMessageAddress, verifyMessage } from "viem";

const router = express.Router();

const userNonceStore: Record<string, string> = {};
router.post("/request-nonce", async (req, res) => {
  userNonceStore[req.body.address] = generateRandomHex(32);
  res.status(200).json({ nonce: userNonceStore[req.body.address] });
});

router.get("/check/:address", async (req, res) => {
  const user = await User.exists({ address: req.params.address });
  res.status(200).send({
    exists: user ? true : false,
  });
});

router.get("/get/:address", async (req, res) => {
  try {
    const user = await User.findOne({ address: req.params.address });
    res.status(200).send({ user });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

router.post("/create", async (req, res) => {
  try {
    const { address } = req.body;
    const user = await User.create({ address });
    await user.save();
    return res.status(200).json({ user: user });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
});

router.post("/become-marketer", async (req, res) => {
  try {
    const { data, sign, address } = req.body;
    const { name, imageUrl } = data;

    const verified = await verifyMessage({
      address: address,
      message: `${JSON.stringify(data)}${userNonceStore[address]}`,
      signature: sign,
    });

    if (!verified) {
      return res.status(401).json({ message: "Signature verification failed" });
    }

    const existingUser = await User.findOne({ address });

    if (!existingUser) {
      const newUser = await User.create({
        address,
        marketer: {
          name,
          image: imageUrl,
        },
      });
      await newUser.save();

      return res.status(200).json({
        message: "Marketer created successfully",
        marketerID: newUser._id,
      });
    } else if (!existingUser.marketer) {
      existingUser.marketer = {
        name,
        image: imageUrl,
      };
      await existingUser.save();

      return res.status(200).json({
        message: "Marketer updated successfully",
        marketerID: existingUser._id,
      });
    } else {
      return res.status(400).json({ message: "User is already a marketer" });
    }
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
});

export default router;
