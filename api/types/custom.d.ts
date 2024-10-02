import "node";

interface Policy {
  address: string;
  expiry: number;
}

interface Marketer {
  name?: string;
  image?: string;
  policiesCreated?: [string];
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

interface PolicyData {
  address: string;
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
  stakers: [{
    address: string;
    amount: number
  }];
  createdAt: string;
  updatedAt: string;
}

export { User, Marketer, Policy, PolicyData };
