import { Network } from "@tronweb3/tronwallet-abstract-adapter";
import { TronLinkAdapter } from "@tronweb3/tronwallet-adapters";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface Web3ContextType {
  adapter: TronLinkAdapter;
  account?: string;
  network?: Network;
}

const Web3Context = createContext<Web3ContextType>({} as Web3ContextType);

export function Web3Provider({ children }: { children: React.ReactNode }) {
  const [account, setAccount] = useState("");
  const [network, setNetwork] = useState<Network>();

  const adapter = useMemo(() => new TronLinkAdapter(), []);

  const value = { adapter, account, network };

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

  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>;
}

export default function useWeb3() {
  return useContext(Web3Context);
}
