import {
  useAccount,
  useConnect,
  useDisconnect,
  useNetwork,
  useSwitchNetwork,
} from "wagmi";
import { useEffect, useState } from "react";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAutoAnimate } from "@formkit/auto-animate/react";

export default function ConnectWallet() {
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();

  const { chains, chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();
  const { disconnect } = useDisconnect();
  const { address, isConnected } = useAccount();
  const [parent] = useAutoAnimate();

  const [showConnectors, setShowConnectors] = useState(false);
  const [showNetworks, setShowNetworks] = useState(false);
  const [correctNetwork, setCorrectNetwork] = useState(false);

  useEffect(() => {
    const allowedChains = chains.map((c) => c.id);
    chain && setCorrectNetwork(allowedChains.includes(chain.id));
  }, [chain]);

  return (
    <div ref={parent}>
      <div className="rounded-xl">
        <ConnectButton />
      </div>

      {showConnectors && (
        <div className="fixed mobile:top-32 mobile:right-28 widescreen:top-0 widescreen:left-0 w-full h-full flex flex-col items-center justify-center bg-black/80">
          <div className="bg-background rounded-lg border border-front/20 shadow shadow-front/20 flex flex-col p-5 gap-y-3">
            {connectors.map((connector) => {
              return (
                <button
                  className="bg-primary w-[33vh] py-2 text-black rounded font-medium disabled:opacity-50"
                  disabled={isLoading}
                  key={connector.id}
                  onClick={() => {
                    connect({ connector });
                    setShowConnectors(false);
                  }}
                >
                  {connector.name}
                </button>
              );
            })}
            <button
              className="py-2 bg-tron-red rounded"
              onClick={() => {
                setShowConnectors(false);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {showNetworks && (
        <div className="fixed mobile:top-[116px] mobile:-left-[106px] top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-black/80">
          <div className="bg-background rounded-lg border border-front/20 shadow shadow-front/20 flex flex-col p-5 gap-y-4">
            <p className="text-center">Choose Network</p>
            {chains.map((chain) => (
              <button
                className="bg-primary w-[40vh] py-2 text-back rounded font-medium disabled:opacity-50"
                key={chain.id}
                onClick={() => {
                  switchNetwork && switchNetwork(chain.id);
                  setShowNetworks(false);
                }}
              >
                {chain.name}
              </button>
            ))}
            <button
              className="py-2 bg-tron-red rounded"
              onClick={() => {
                disconnect();
                setShowNetworks(false);
              }}
            >
              Disconnect Wallet
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
