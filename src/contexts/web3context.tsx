import { Network } from "@tronweb3/tronwallet-abstract-adapter";
import { WalletProvider } from "@tronweb3/tronwallet-adapter-react-hooks";
import { WalletModalProvider } from "@tronweb3/tronwallet-adapter-react-ui";
import {
  BitKeepAdapter,
  LedgerAdapter,
  OkxWalletAdapter,
  TokenPocketAdapter,
  TronLinkAdapter,
  WalletConnectAdapter,
} from "@tronweb3/tronwallet-adapters";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type {
  Adapter,
  WalletError,
} from "@tronweb3/tronwallet-abstract-adapter";

interface Web3ContextType {
  adapters: (
    | TronLinkAdapter
    | WalletConnectAdapter
    | LedgerAdapter
    | TokenPocketAdapter
    | BitKeepAdapter
    | OkxWalletAdapter
  )[];
  account?: string;
  network?: Network;
}

const Web3Context = createContext<Web3ContextType>({} as Web3ContextType);

export function Web3Provider({ children }: { children: React.ReactNode }) {
  const [account, setAccount] = useState("");
  const [network, setNetwork] = useState<Network>();

  const adapter = useMemo(() => new TronLinkAdapter(), []);

  const adapters = useMemo(function () {
    const walletConnect1 = new WalletConnectAdapter({
      network: "Nile",
      options: {
        relayUrl: "wss://relay.walletconnect.com",
        // example WC app project ID
        projectId: "5fc507d8fc7ae913fff0b8071c7df231",
        metadata: {
          name: "Test DApp",
          description: "JustLend WalletConnect",
          url: "https://your-dapp-url.org/",
          icons: ["https://your-dapp-url.org/mainLogo.svg"],
        },
      },
      web3ModalConfig: {
        themeMode: "dark",
        themeVariables: {
          "--w3m-z-index": "1000",
        },
        // explorerRecommendedWalletIds: 'NONE',
        enableExplorer: true,
        explorerRecommendedWalletIds: [
          "225affb176778569276e484e1b92637ad061b01e13a048b35a9d280c3b58970f",
          "1ae92b26df02f0abca6304df07debccd18262fdf5fe82daa81593582dac9a369",
          "4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0",
        ],
      },
    });
    const ledger = new LedgerAdapter({
      accountNumber: 2,
    });
    const tokenPocket = new TokenPocketAdapter();
    const bitKeep = new BitKeepAdapter();
    const okxWalletAdapter = new OkxWalletAdapter();
    return [
      adapter,
      walletConnect1,
      ledger,
      tokenPocket,
      bitKeep,
      okxWalletAdapter,
    ];
  }, []);

  const value = { adapters, account, network };

  useEffect(() => {
    setAccount(adapter.address!);

    adapter.on("connect", () => {
      setAccount(adapter.address!);
    });

    adapter.on("accountsChanged", (data) => {
      setAccount(data);
    });

    adapter.on("chainChanged", (data) => {
      setNetwork(data as Network);
    });

    adapter.on("disconnect", () => {
      // when disconnect from wallet
    });
    return () => {
      // remove all listeners when components is destroyed
      adapter.removeAllListeners();
    };
  }, []);

  function onConnect() {
    console.log("onConnect");
  }
  async function onAccountsChanged() {
    console.log("onAccountsChanged");
  }
  async function onAdapterChanged(adapter: Adapter | null) {
    console.log("onAdapterChanged", adapter);
  }
  return (
    <WalletProvider
      onConnect={onConnect}
      onAccountsChanged={onAccountsChanged}
      onAdapterChanged={onAdapterChanged}
      adapters={adapters}
      autoConnect
    >
      <WalletModalProvider>
        <Web3Context.Provider value={value}>{children}</Web3Context.Provider>
      </WalletModalProvider>
    </WalletProvider>
  );
}

export default function useWeb3() {
  return useContext(Web3Context);
}
