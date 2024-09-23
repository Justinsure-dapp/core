import { useState } from "react";
import StakingStats from "./components/StakingStats";
import SurityInfo from "./components/SurityInfo";
import { twMerge } from "tailwind-merge";
import SurityBranding from "./components/SurityBranding";
import { useAccount, useContractRead } from "wagmi";
import contractDefinitions from "../../contracts";
import { isAddress } from "viem";

export default function StatisticsSidebar() {
  const [hidden, setHidden] = useState(false);
  const { address } = useAccount();

  const balance = useContractRead({
    ...contractDefinitions.sureCoin,
    functionName: "balanceOf",
    args: [address || "0x1"],
  });

  const earned = useContractRead({
    ...contractDefinitions.sureCoin,
    functionName: "earned",
    args: [address || "0x1"],
  });

  return (
    <section className="flex relative flex-col border-l border-border max-w-[20vw] h-screen mobile:hidden">
      <div
        className={twMerge(
          "absolute top-4 right-4 text-sm text-secondary",
          hidden && "relative"
        )}
      >
        <button
          onClick={() => setHidden(true)}
          className="disabled:hidden"
          disabled={hidden}
        >
          Hide
        </button>
        <button
          onClick={() => setHidden(!true)}
          className="disabled:hidden pl-7"
          disabled={!hidden}
        >
          Expand
        </button>
      </div>

      {!hidden && (
        <>
          <div className="px-6 py-3 flex flex-col gap-y-2">
            <h1 className="text-mute text-base font-bold">SureCoin Balance</h1>
            <div>
              <h2 className="text-xs -mb-1">Wallet</h2>
              <p className="font-mono text-secondary text-2xl font-medium">
                {balance.data?.toString()}
              </p>
            </div>
            <div>
              <h2 className="text-xs -mb-1">Pending</h2>
              <p className="font-mono text-secondary text-2xl font-medium">
                {earned.data?.toString()}
              </p>
            </div>
          </div>

          <StakingStats />

          <figure role="separator" className="flex-1" />

          <SurityInfo />
        </>
      )}

      {hidden && <SurityBranding />}
    </section>
  );
}
