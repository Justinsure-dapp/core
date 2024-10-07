import { Address } from "viem";
import { Args } from "../pages/NewPolicyPage/components/ArgsTypeDefine";

export type RGBColor = [number, number, number];

interface Marketer {
  name?: string;
  image?: string;
  policiesCreated?: [string];
}

export interface User {
  address: string;
  name?: string;
  image?: string;
  marketer?: Marketer;
}

export interface Policy {
  _id: string;
  address: string;
  image: string;
  cid: string;
  rating?: number;
  tags?: string[];
  name: string;
  blockNumber?: bigint;
  description: string;
  category: string;
  minimumClaim: number;
  maximumClaim: number;
  premiumFunc: string;
  premiumFuncDescription: string;
  claimFunc: string;
  claimFuncDescription: string;
  minimumDuration: number;
  maximumDuration: number;
  creator: string;
  stakeToken: string;
  stakers: string[];
  holders: {
    address: string;
    premium: number;
    claimExpiry: Date;
    args: object;
    status: "ongoing" | "expired";
  }[];
  claims: {
    address: string;
    status: "requested" | "approved";
    amount: number;
    requestedAt: Date;
    approvedAt: Date;
  }[];
  createdAt: string;
  updatedAt: string;
  premiumFuncArgs: Args;
  claimFuncArgs: Args;
  __v: number;
}
