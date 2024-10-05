import "node";

interface Policy {
  address: string;
  expiry: number;
}

interface Marketer {
  name?: string;
  image?: string;
}

export type Arg = {
  name: string;
  typeName: string;
  description: string;
  htmlType: string;
};

interface User {
  address: string;
  name?: string;
  image?: string;
  marketer?: Marketer;
  policiesOwned: {
    address: string;
    premium: number;
    claimExpiry: date;
    args: object;
    status: "Ongoing" | "Claim Requested" | "Claimed" | "Expired";
  }[];
}

interface PolicyData {
  address: string;
  image?: string;
  cid: string;
  rating?: number;
  tags?: string[];
  name: string;
  description: string;
  category: string;
  minimumClaim: number;
  maximumClaim: number;
  minimumDuration: number;
  maximumDuration: number;
  premiumFunc: string;
  premiumFuncDescription: string;
  premiumFuncArgs: Arg[];
  claimFunc: string;
  claimFuncDescription: string;
  claimFuncArgs: Arg[];
  creator: string;
  stakeToken: string;
  stakeTokenSymbol: string;
  holders: string[];
  stakers: string[];
  claims: string[];
  createdAt: string;
  updatedAt: string;
}

export { User, Marketer, Policy, PolicyData };
