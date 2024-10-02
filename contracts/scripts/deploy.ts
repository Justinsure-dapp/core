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
  const publicClient = await hre.viem.getPublicClient();

  async function latestNonce() {
    return await publicClient.getTransactionCount({
      address: deployer.account.address,
    });
  }

  const usdj = await hre.viem.deployContract("USDJ");

  const usdjDecimals = BigInt(Math.pow(10, await usdj.read.decimals()));
  
  await usdj.write.transfer(
    ["0x5dE36d74D5A8497a18Ed5B495A870e583b83B7da", 100_000_000_000n], // Riya
    {
      nonce: await latestNonce(),
    },
  );
  await usdj.write.transfer(
    ["0xAA1bfB4D4eCDbc78A6f929D829fded3710D070D0", 100_000_000_000n], // Kartik
    {
      nonce: await latestNonce(),
    },
  );

  const periphery = await hre.viem.deployContract("SurityInterface", [
    usdj.address,
  ]);

  await periphery.write.updateStakingRewardRate([10_000n * usdjDecimals], {
    nonce: await latestNonce(),
  });
  await periphery.write.setMinimumInitialStake([10n * usdjDecimals], {
    nonce: await latestNonce(),
  });

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

const primaryChain = defineChain(${JSON.stringify(deployer.chain)})

const surityInterface = {adddress : "${periphery.address}" as const, abi : ${JSON.stringify(periphery.abi)} as const}
const surecoin = {adddress : "${surecoin.address}" as const, abi : ${JSON.stringify(surecoin.abi)} as const}
const vault = {adddress : "${vault.address}" as const, abi : ${JSON.stringify(vault.abi)} as const}
const usdj = {adddress : "${usdj.address}" as const, abi : ${JSON.stringify(usdj.abi)} as const}

export default {primaryChain, surityInterface, surecoin, vault, usdj}
`;

  fs.writeFileSync("./evmConfig.ts", file);
  console.log("\n\nUPDATED EVM CONFIG");
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
