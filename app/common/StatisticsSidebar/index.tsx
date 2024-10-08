import { useEffect, useRef, useState } from "react";
import StakingStats from "./components/StakingStats";
import SurityInfo from "./components/SurityInfo";
import { twMerge } from "tailwind-merge";
import SurityBranding from "./components/SurityBranding";
import useSureCoinHook from "../../hooks/useSurecoin";
import useModal from "../../hooks/useModal";
import WithdrawSurecoinModal from "./components/WithdrawSurecoinModal";
import { useWatchAsset } from "wagmi";
import evmConfig from "../../../evmConfig";
import { toast } from "react-toastify";
import { formatCompactNumber } from "../../utils";

export default function StatisticsSidebar() {
  const [hidden, setHidden] = useState(false);
  const surecoin = useSureCoinHook();
  const modal = useModal();
  const { watchAsset } = useWatchAsset();

  const balance = surecoin.getUserBalance();
  const earned = surecoin.getUserEarned();

  const flag = useRef(true);
  useEffect(() => {
    if (flag.current) {
      flag.current = false;
      setInterval(() => {
        surecoin.refreshEarned();
      }, 5000);
    }
  }, []);

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
            <div className="flex flex-col xl:flex-row gap-2 xl:justify-between ">
              <button
                title="Add SURE to your wallet"
                className="flex gap-2 text-sm items-center rounded-xl"
                onClick={() => {
                  toast.info("Adding SURE to your wallet..");
                  watchAsset({
                    type: "ERC20",
                    options: {
                      address: evmConfig.surecoin.address,
                      symbol: "SURE",
                      decimals: surecoin.decimals || 6,
                    },
                  });
                }}
              >
                Balance:
                <p className="font-mono text-secondary text-xl font-medium">
                  {balance ? formatCompactNumber(balance) : "0"}
                </p>
              </button>

              <button
                title="Withdraw SureCoin"
                onClick={() => modal.show(<WithdrawSurecoinModal />)}
                className="flex gap-2 text-sm items-center rounded-xl"
              >
                Earned:
                <p className="font-mono text-secondary text-xl font-medium animate-pulse">
                  {earned ? formatCompactNumber(earned) : "0"}
                </p>
              </button>
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
