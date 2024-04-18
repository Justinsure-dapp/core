import { Network } from "@tronweb3/tronwallet-abstract-adapter";
import {
  WalletProvider,
  useWallet,
} from "@tronweb3/tronwallet-adapter-react-hooks";
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
import type { Adapter } from "@tronweb3/tronwallet-abstract-adapter";
import api, { clearAddress, setAddress } from "../utils/api";
import useModal from "../hooks/useModal";
import { User } from "../types";

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
  const [user, setUser] = useState<User | null>();
  const [network, setNetwork] = useState<Network>();

  const modal = useModal();

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
    adapter.address && setAccount(adapter.address.trim());

    adapter.on("connect", () => {
      adapter.address && setAccount(adapter.address.trim());
    });

    adapter.on("accountsChanged", (data: string) => {
      setAccount(data.trim());
    });

    adapter.on("chainChanged", (data) => {
      setNetwork(data as Network);
    });

    adapter.on("disconnect", () => {
      // location.reload();
    });
    return () => {
      // remove all listeners when components is destroyed
      adapter.removeAllListeners();
    };
  }, []);

  async function pingServerWithAddress() {
    if (!account) return;
    if (user && user.address == account) return;
    setUser(null);

    const { exists: userExists } = await api.user.check(account);

    if (userExists) {
      const userData = await api.user.get(account);
      setUser(userData.user);
    } else {
      const nonce = await api.user.requestNonce(account);
      modal.show(<VerificationModal nonce={nonce} />);
    }
  }

  function onConnect() {
    pingServerWithAddress();
    if (account) setAddress(account);
    if (!account) clearAddress();
  }
  async function onAccountsChanged() {
    pingServerWithAddress();
    if (account) setAddress(account);
    if (!account) clearAddress();
  }
  async function onAdapterChanged(adapter: Adapter | null) {
    pingServerWithAddress();
    if (account) setAddress(account);
    if (!account) clearAddress();
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

function VerificationModal(props: { nonce: string }) {
  const { disconnect, address, signMessage } = useWallet();

  const modal = useModal();

  const [loading, setLoading] = useState(false);

  return (
    <div className="bg-background p-4 rounded-md flex flex-col text-center gap-y-2">
      <h1 className="font-semibold text-primary">
        We need you to sign a nonce
      </h1>
      <p className="text-sm text-mute">
        this is done for registration and user verification purposes
      </p>

      <div className="flex gap-x-5 px-[10%]">
        <button
          disabled={loading}
          className="flex-1 bg-foreground p-1 font-medium rounded disabled:animate-pulse disabled:opacity-60 disabled:cursor-not-allowed"
          onClick={async () => {
            setLoading(true);
            try {
              const signedMessage = await signMessage(props.nonce);
              if (address && signedMessage)
                await api.user.verify(address, signedMessage);
            } finally {
              setLoading(false);
            }
          }}
        >
          Sign
        </button>
        <button
          className="flex-1 border border-front p-1 font-medium rounded"
          onClick={() => {
            disconnect();
            modal.hide();
          }}
        >
          Disconnect
        </button>
      </div>
    </div>
  );
}
