import { createConfig } from "wagmi";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import evmConfig from "../../evmConfig";

const wagmiConfig = getDefaultConfig({
  appName: "JustInsure",
  projectId: "756f8ad5a4c44ce4fbd9897445a10187",
  chains: [evmConfig.primaryChain],
});

export default wagmiConfig;
