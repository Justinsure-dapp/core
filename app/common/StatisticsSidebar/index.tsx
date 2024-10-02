import { useEffect, useState } from "react";
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

  const fetchedBalance = useContractRead({
    ...contractDefinitions.sureCoin,
    functionName: "balanceOf",
    args: [address || "0x5071437be4b13e62522D2b48E9514FF36f68641d"],
  });

  const fetchedEarned = useContractRead({
    ...contractDefinitions.sureCoin,
    functionName: "earned",
    args: [address || "0x5071437be4b13e62522D2b48E9514FF36f68641d"],
  });

  return (
    <section className="flex relative flex-col border-l border-border max-w-[20vw] h-screen mobile:hidden">
      {!hidden && (
        <>
          <div className="px-6 py-3 flex flex-col gap-y-2">
            <div className="flex items-center justify-between text-mute text-base font-bold">
              <h1 className="">SureCoin Balance</h1>
              <button
                onClick={() => setHidden(true)}
                className="disabled:hidden text-sm text-secondary"
                disabled={hidden}
              >
                Hide
              </button>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <h2 className="text-xs">Wallet:</h2>
                <p className="font-mono text-secondary text-2xl font-medium">
                  {fetchedBalance.data ? fetchedBalance.data.toString() : "0"}
                </p>
              </div>
              <div className="flex gap-2 items-center">
                <h2 className="text-xs">Pending:</h2>
                <p className="font-mono text-secondary text-2xl font-medium">
                  {fetchedEarned.data ? fetchedEarned.data.toString() : "0"}
                </p>
              </div>
            </div>
          </div>

          <StakingStats />

          <figure role="separator" className="flex-1" />

          <SurityInfo />
        </>
      )}

      <div
        className={twMerge(
          "flex flex-col overflow-y-clip",
          hidden ? "h-full" : "",
        )}
      >
        <button
          onClick={() => setHidden(!true)}
          className="disabled:hidden text-sm text-secondary pt-7 px-4 font-bold"
          disabled={!hidden}
        >
          Expand
        </button>

        {hidden && <SurityBranding />}
      </div>
    </section>
  );
}
