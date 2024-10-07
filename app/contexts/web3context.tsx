import React, { createContext, useContext, useEffect, useState } from "react";
import { useAccount, WagmiProvider } from "wagmi";
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import wagmiConfig from "../config/wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import api, { clearAddress, setAddress } from "../utils/api";
import { Policy, User } from "../types";

interface Web3ContextType {
  user: User | null;
  policies: Policy[] | undefined;
  fetchUser: () => void;
  fetchPolicies: () => void;
}

const Web3Context = createContext<Web3ContextType>({} as Web3ContextType);

export function Web3Provider({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();

  return (
    <>
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider
            theme={darkTheme({
              accentColor: "#18181b",
              overlayBlur: "small",
              fontStack: "system",
            })}
          >
            <Wrapper>{children}</Wrapper>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </>
  );
}

function Wrapper({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [policies, setPolicies] = useState<Policy[]>();
  const { address } = useAccount();

  async function fetchUser() {
    if (!address) return;
    if (user && user.address == address) return;
    setUser(null);

    const { exists: userExists } = await api.user.check(address);

    if (userExists) {
      const user = await api.user.get(address);
      setUser(user);
    }
  }

  async function fetchPolicies() {
    const data = await api.policy.fetchAllPolicies();
    setPolicies(data);
  }

  useEffect(() => {
    fetchUser();
    if (address) setAddress(address);
    if (!address) {
      setUser(null);
      clearAddress();
    }

    fetchPolicies();
  }, [address]);

  const value = { user, policies, fetchUser, fetchPolicies };
  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>;
}

export default function useWeb3() {
  return useContext(Web3Context);
}
