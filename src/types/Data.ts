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
