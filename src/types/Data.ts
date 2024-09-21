export type RGBColor = [number, number, number];

export interface User {
  address: string;
  marketer: string;
}

export interface Marketer {
  name: string;
  image: string;
  policies: string[];
}

export interface Policy {
  _id: string;
  address: string;
  cid: string;
  rating: number;
  tags: string[];
  name: string;
  description: string;
  category: string;
  minimumClaim: string;
  maximumClaim: string;
  premiumFunc: string;
  premiumFuncDescription: string;
  claimFunc: string;
  claimFuncDescription: string;
  minimumDuration: string;
  maximumDuration: string;
  owner: string;
  __v: number;
}
