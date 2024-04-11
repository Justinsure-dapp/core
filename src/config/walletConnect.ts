import {
  WalletConnectWallet,
  WalletConnectChainID,
} from "@tronweb3/walletconnect-tron";

export const wallet = new WalletConnectWallet({
  network: WalletConnectChainID.Mainnet,
  options: {
    relayUrl: "wss://relay.walletconnect.com",
    projectId: "d80820321898edad271be12e8a54f5d5",
    metadata: {
      name: "Surity",
      description: "Surity WalletConnect",
      url: "https://app.surity.marsian.devs/",
      icons: ["https://app.surity.marsian.devs/logo.png"],
    },
  },
  web3ModalConfig: {
    themeMode: "dark",
    themeVariables: {
      "--w3m-z-index": "1000",
    },
    /**
     * Recommended Wallets are fetched from WalletConnect explore api:
     * https://walletconnect.com/explorer?type=wallet&version=2.
     * You can copy these ids from the page.
     */
    explorerRecommendedWalletIds: [
      "1ae92b26df02f0abca6304df07debccd18262fdf5fe82daa81593582dac9a369",
      "4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0",
    ],
  },
});
