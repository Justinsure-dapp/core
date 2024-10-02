// @ts-nocheck

import hre from "hardhat";
import { Address } from "viem";
import fs from "fs";

// const donau = defineChain({
//   id: 1029,
//   rpcUrls: {
//     default: {
//       http: ["https://pre-rpc.bt.io"],
//       webSocket: ["wss://pre-rpc.bt.io:8546"],
//     },
//   },
//   name: "BitTorrent Chain Donau",
//   nativeCurrency: { symbol: "BTT", decimals: 18, name: "BitTorrent (BTT)" },
// });

async function main() {
  const [deployer] = await hre.viem.getWalletClients();

  const usdj = await hre.viem.deployContract("USDJ");

  const usdjDecimals = BigInt(Math.pow(10, await usdj.read.decimals()));

  await usdj.write.transfer([
    "0xAA1bfB4D4eCDbc78A6f929D829fded3710D070D0",
    100_000_000_000n,
  ]);

  const periphery = await hre.viem.deployContract("SurityInterface", [
    usdj.address,
  ]);

  await periphery.write.updateStakingRewardRate([10_000n * usdjDecimals]);
  await periphery.write.setMinimumInitialStake([10n * usdjDecimals]);

  const vaultAddress = (await periphery.read.vault()) as Address;
  const surecoinAddress = (await periphery.read.surecoin()) as Address;

  const vault = await hre.viem.getContractAt("Vault", vaultAddress);
  const surecoin = await hre.viem.getContractAt("SureCoin", surecoinAddress);

  console.log(`USDJ : ${usdj.address}`);
  console.log(`Surity Interface : ${periphery.address}`);
  console.log(`Vault : ${vault.address}`);
  console.log(`SureCoin : ${surecoin.address}`);

  // update evmConfig
  const file = `import {defineChain} from "viem"

export const primaryChain = defineChain(${JSON.stringify(deployer.chain)})

export const periphery = {adddress : "${periphery.address}", abi : ${JSON.stringify(periphery.abi)}}
export const surecoin = {adddress : "${surecoin.address}", abi : ${JSON.stringify(surecoin.abi)}}
export const vault = {adddress : "${vault.address}", abi : ${JSON.stringify(vault.abi)}}
export const usdj = {adddress : "${usdj.address}", abi : ${JSON.stringify(usdj.abi)}}
`;

  fs.writeFileSync("./evmConfig.ts", file);
  console.log("\n\nUPDATED EVM CONFIG")
}

main()
  .then(() => {
    console.log("\nDEPLOYED SUCCESSFULLY");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Error:", error);
    process.exit(1);
  });
