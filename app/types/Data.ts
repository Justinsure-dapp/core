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
  policiesOwned: {
    address: string;
    premium: number;
    claimExpiry: Date;
    args: object;
    status: string;
  }[];
}

export interface Policy {
  _id: string;
  address: string;
  image: string;
  cid: string;
  rating?: number;
  tags?: string[];
  name: string;
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
  holders: string[];
  stakers: string[];
  createdAt: string;
  updatedAt: string;
  premiumFuncArgs: Args;
  claimFuncArgs: Args;
  __v: number;
}
