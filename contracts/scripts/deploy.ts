import hre from "hardhat";
// import { defineChain, publicActions } from "viem";

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
  console.log("deployer : ", (await hre.viem.getWalletClients())[0].account.address)

  const usdj = await hre.viem.deployContract("USDJ");
  const usdjDecimals = BigInt(Math.pow(10, 6));

  usdj.write.transfer([
    "0xAA1bfB4D4eCDbc78A6f929D829fded3710D070D0",
    100_000_000_000n,
  ]);

  const periphery = await hre.viem.deployContract("SurityInterface", [
    usdj.address,
  ]);

  await periphery.write.updateStakingRewardRate([10_000n * usdjDecimals]);
  await periphery.write.setMinimumInitialStake([10n * usdjDecimals]);

  console.log(`USDJ : ${usdj.address}`);
  console.log(`Surity Interface : ${periphery.address}`);
  console.log(`Vault : ${await periphery.read.vault()}`);
  console.log(`SureCoin : ${await periphery.read.surecoin()}`);
}
main().catch((error) => {
  console.error("Error:", error);
  process.exit(1);
});
