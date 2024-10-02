import type { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";
import "@nomicfoundation/hardhat-viem";
import "dotenv/config";

const config: HardhatUserConfig = {
  solidity: { version: "0.8.27", settings: { optimizer: { enabled: true } } },
  networks: {
    testnet: {
      url: "https://pre-rpc.bt.io",
      chainId: 1029,
      accounts: [`${process.env.OWNER_PVT_KEY}`],
    },
    opt: {
      url: "https://sepolia.optimism.io",
      chainId: 11155420,
      mining: { interval: 60_000 },
      accounts: [`${process.env.OWNER_PVT_KEY}`],
    },
  },
  paths: {
    root: "./contracts",
    sources: ".",
  },
};

export default config;
