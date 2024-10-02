import { Chain, configureChains, createConfig } from "wagmi";
import { bitTorrent, bitTorrentTestnet } from "wagmi/chains";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { publicProvider } from "wagmi/providers/public";
import {
  getDefaultWallets,
  connectorsForWallets,
} from "@rainbow-me/rainbowkit";
import evmConfig from "../../evmConfig"

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [evmConfig.primaryChain],
  [publicProvider()]
);

const { wallets } = getDefaultWallets({
  appName: "JustInsure",
  projectId: "756f8ad5a4c44ce4fbd9897445a10187",
  chains,
});

const connectors = connectorsForWallets([...wallets]);

const wagmiConfig = createConfig({
  autoConnect: true,
  logger: { warn: (msg) => console.warn(msg) },
  connectors,
  // connectors: [
  //   new InjectedConnector({ chains }),
  //   new WalletConnectConnector({
  //     options: {
  //       projectId: "756f8ad5a4c44ce4fbd9897445a10187",
  //       qrModalOptions: { themeMode: "dark" },
  //       metadata: {
  //         name: "JustInsure",
  //         description: "JustInsure Web3 Insurance",
  //         icons: ["/favicon.ico"],
  //         url: window.location.hostname,
  //       },
  //     },
  //     chains: [donau],
  //   }),
  // ],
  publicClient,
  webSocketPublicClient,
});

export default wagmiConfig;
export { chains, publicClient, webSocketPublicClient };
