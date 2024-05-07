import { Chain, configureChains, createConfig } from "wagmi";
import { bitTorrent, bitTorrentTestnet } from "wagmi/chains";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { publicProvider } from "wagmi/providers/public";

const donau: Chain = {
  id: 1029,
  name: "BitTorrent Chain Donau",
  nativeCurrency: {
    symbol: "BTT",
    decimals: 18,
    name: "BitTorrent Token (BTT)",
  },
  network: "bittorrent-chain-donau",
  rpcUrls: {
    default: { http: ["https://pre-rpc.bt.io/"] },
    public: { http: ["https://pre-rpc.bt.io/"] },
  },
  blockExplorers: {
    default: { name: "BTTscan donau", url: "https://testscan.bt.io" },
  },
};

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [donau],
  [publicProvider()]
);

const wagmiConfig = createConfig({
  autoConnect: true,
  logger: { warn: (msg) => console.warn(msg) },
  connectors: [
    new InjectedConnector({ chains }),
    new WalletConnectConnector({
      options: {
        projectId: "756f8ad5a4c44ce4fbd9897445a10187",
        qrModalOptions: { themeMode: "dark" },
        metadata: {
          name: "Surity",
          description: "Surity Web3 Insurance",
          icons: ["/favicon.ico"],
          url: window.location.hostname,
        },
      },
      chains: [donau],
    }),
  ],
  publicClient,
  webSocketPublicClient,
});

export default wagmiConfig;
export { publicClient, webSocketPublicClient };
