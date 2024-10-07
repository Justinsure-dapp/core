import "node";

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
}

interface Policy {
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
  blockNumber: number;
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
    requestedAt: date;
    approvedAt: date;
  }[];
  stakeToken: string;
  stakeTokenSymbol: string;
  stakers: string[];
  createdAt: string;
  updatedAt: string;
}

export { User, Marketer, Policy, PolicyData };
