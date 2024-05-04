import React, { createContext, useContext, useEffect, useState } from "react";
import { WagmiConfig, useAccount, useDisconnect, useSignMessage } from "wagmi";
import wagmiConfig from "../config/wagmi";
import getContracts from "../contracts";
import { User } from "../types";
import api from "../utils/api";
import useModal from "../hooks/useModal";

interface Web3ContextType {
  user: User | null;
}

const Web3Context = createContext<Web3ContextType>({} as Web3ContextType);

export function Web3Provider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <Wrapper>{children}</Wrapper>
      </WagmiConfig>
    </>
  );
}

function Wrapper({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const { address } = useAccount();
  const modal = useModal();

  async function pingServerWithAddress() {
    if (!address) return;
    if (user && user.address == address) return;
    setUser(null);

    const { exists: userExists } = await api.user.check(address);

    if (userExists) {
      const { user } = await api.user.get(address);
      setUser(user);
    } else {
      const nonce = await api.user.requestNonce(address);
      modal.show(<VerificationModal nonce={nonce} />);
    }
  }

  useEffect(() => {
    pingServerWithAddress();
  }, [address]);

  const value = { user };

  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>;
}

export default function useWeb3() {
  return useContext(Web3Context);
}

function VerificationModal(props: { nonce: string }) {
  const { disconnect } = useDisconnect();
  const { data: signed, signMessageAsync } = useSignMessage();
  const { address } = useAccount();

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
          className="flex-1 bg-foreground p-1 font-medium rounded disabled:animate-pulse disabled:opacity-60 disabled:cursor-progress"
          onClick={() => {
            setLoading(true);
            signMessageAsync({ message: props.nonce })
              .then(async (signed) => {
                address && signed && (await api.user.verify(address, signed));
                location.reload();
              })
              .finally(() => setLoading(false));
          }}
        >
          Sign
        </button>
        <button
          className="flex-1 border border-front p-1 font-medium rounded disabled:animate-pulse disabled:opacity-60 disabled:cursor-not-allowed"
          onClick={() => {
            disconnect();
            modal.hide();
          }}
          disabled={loading}
        >
          Disconnect
        </button>
      </div>
    </div>
  );
}
