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
  address: `0x${string}`;
  name: string;
  owner: string;
  description: string;
  category: string;
  claimLimits: { minimum: number; maximum: number };
  durationLimits: { minimum: number; maximum: number };
  claimValidationFunction: {
    function: string;
    description: string;
    arguments: { name: string; description: string; htmlType: string }[];
  };
  premiumCalculationFunction: {
    function: string;
    description: string;
    arguments: { name: string; description: string; htmlType: string }[];
  };
  intialStake: { type: number };
  tags: Array<string>;
}
