import { TronLinkAdapter } from "@tronweb3/tronwallet-adapters";
import { useEffect, useMemo, useState } from "react";
import useWeb3 from "../contexts/web3context";
import {
  WalletActionButton,
  WalletConnectButton,
  WalletDisconnectButton,
  WalletSelectButton,
} from "@tronweb3/tronwallet-adapter-react-ui";
import "@tronweb3/tronwallet-adapter-react-ui/style.css";
import { useWallet } from "@tronweb3/tronwallet-adapter-react-hooks";
import { twMerge } from "tailwind-merge";

export default function ConnectWallet(props: { className?: string }) {
  const { address } = useWallet();

  return (
    <div className="relative rounded-lg group">
      <WalletActionButton className={twMerge(props.className, "rounded-lg")} />
      {!address && (
        <div
          className="absolute-cover pointer-events-none z-1 rounded-inherit border-2 border-transparent bg-white text-tron-red font-semibold flex items-center justify-center gap-x-2
      group-hover:border-tron-red group-hover:border-2 group-hover:bg-background group-hover:text-white duration-300"
        >
          <img
            src="/icons/tron.svg"
            alt="tron"
            className="h-[1.4em] aspect-square group-hover:invert group-hover:brightness-0 duration-inherit"
          />
          Connect
        </div>
      )}
    </div>
  );
}
