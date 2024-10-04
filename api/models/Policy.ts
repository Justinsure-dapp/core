import { Schema, model } from "mongoose";
import { PolicyData } from "../types/custom";

const policySchema = new Schema<PolicyData>(
  {
    address: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
      default: "https://res.cloudinary.com/dqjkucbjn/image/upload/v1726786874/logo_ipjrnu.png",
    },
    cid: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    tags: {
      type: [String],
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    minimumClaim: {
      type: Number,
      required: true,
    },
    maximumClaim: {
      type: Number,
      required: true,
    },
    premiumFunc: {
      type: String,
      required: true,
    },
    premiumFuncDescription: {
      type: String,
      required: true,
    },
    claimFunc: {
      type: String,
      required: true,
    },
    claimFuncDescription: {
      type: String,
      required: true,
    },
    minimumDuration: {
      type: Number,
      required: true,
    },
    maximumDuration: {
      type: Number,
      required: true,
    },
    creator: {
      type: String,
      required: true,
    },
    stakeToken: {
      type: String,
      required: true,
    },
    stakeTokenSymbol: {
      type: String,
      required: true,
    },
    holders: {
      type: [String],
      default: [],
    },
    stakers: {
      type: [String],
      default: [],
    },
    premiumFuncArgs: {
      type: [
        {
          name: String,
          typeName: String,
          description: String,
          htmlType: String,
        },
      ],
      required: true,
    },
    claimFuncArgs: {
      type: [
        {
          name: String,
          typeName: String,
          description: String,
          htmlType: String,
        },
      ],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default model("Policy", policySchema);
