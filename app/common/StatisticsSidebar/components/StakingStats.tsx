import React, { useEffect, useRef, useState } from "react";
import useIdleScrollbar from "../../../hooks/useIdleScrollbar";
import { useAccount, useReadContract } from "wagmi";
import useWeb3 from "../../../contexts/web3context";
import { Address, isAddress, zeroAddress } from "viem";
import contractDefinitions from "../../../contracts";
import { Policy } from "../../../types";
import useUsdjHook from "../../../hooks/useUsdj";
import { useWriteContract } from "wagmi";
import { toast } from "react-toastify";
import useModal from "../../../hooks/useModal";
import Heading from "../../../pages/NewPolicyPage/components/Heading";
import Icon from "../../Icon";
import { twMerge } from "tailwind-merge";
import { Link, useNavigate } from "react-router-dom";
import { extractErrorFromTx } from "../../../utils";

export default function StakingStats() {
  const containerRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const { address } = useAccount();
  const { policies } = useWeb3();
  const [totalStake, setTotalStake] = useState(0);

  useIdleScrollbar(containerRef);
  const policiesStakedIn =
    policies?.filter((p) => p.stakers?.includes(address as string)) || [];

  return (
    <div
      className="border-y border-border px-6 py-4 flex flex-col max-h-[80vh] overflow-y-scroll scrollbar-primary gap-3"
      ref={containerRef}
    >
      <div className="flex items-center justify-between gap-x-3">
        <h1 className="text-mute text-base font-bold">Your Stakes</h1>
        <p className="bg-foreground p-2 text-sm font-semibold rounded-lg">
          Total : ${totalStake.toFixed(1)}
        </p>
      </div>

      {policiesStakedIn.map((policy, index) => (
        <StakedInCard
          key={index}
          setTotalStake={setTotalStake}
          policy={policy}
          withdrawable={false}
        />
      ))}
    </div>
  );
}

export function StakedInCard({
  policy,
  setTotalStake,
  setStakes,
  withdrawable,
}: {
  policy: Policy;
  setTotalStake: Function;
  setStakes?: Function;
  withdrawable?: boolean;
}) {
  const { address } = useAccount();
  const hasAddedStake = useRef(false);
  const usdj = useUsdjHook();
  const modal = useModal();

  const { data: stakeAmount } = useReadContract({
    ...contractDefinitions.insuranceController,
    address:
      policy.address && isAddress(policy.address)
        ? policy.address
        : zeroAddress,
    functionName: "stakedAmountOfAddress",
    args: [address ? address : zeroAddress],
  });

  useEffect(() => {
    if (stakeAmount && !hasAddedStake.current) {
      if (setStakes) {
        setStakes((prev: any) => {
          return [
            ...prev,
            {
              name: policy.name,
              address: policy.address,
              value: usdj.divideByDecimals(stakeAmount || 0n),
            },
          ];
        });
      }

      setTotalStake(
        (prev: number) => prev + usdj.divideByDecimals(stakeAmount || 0n),
      );
      hasAddedStake.current = true;
    }
  }, [stakeAmount, setTotalStake]);

  return (
    <>
      {stakeAmount && stakeAmount > usdj.multiplyWithDecimals(0.1) && (
        <Link
          to={`/policies/${policy.address}`}
          className={twMerge(
            `border transition-all p-2 border-border bg-background rounded-lg`,
            !withdrawable && "hover:bg-mute/5",
          )}
          title={
            policy.creator === address ? "Created by you" : "Staked by you"
          }
        >
          <div className="flex gap-x-2 relative">
            <img
              src={policy.image}
              alt="image"
              className="aspect-square rounded-md object-cover h-10 w-10"
            />
            <div className="flex w-full justify-between">
              <div className="flex flex-col w-2/3 truncate">
                <h1 className="font-semibold text-sm w-full capitalize truncate">
                  {policy.name}
                </h1>
                <p
                  className={twMerge(
                    "text-xs text-mute flex gap-x-1 whitespace-nowrap mt-1",
                    withdrawable ? "" : "",
                  )}
                >
                  Stake: ${usdj.divideByDecimals(stakeAmount || 0n).toFixed(2)}
                </p>
              </div>

              {withdrawable && (
                <button
                  className="border border-border transition-all  w-max px-3 py-2 text-front/80 bg-front/10 rounded-md self-start text-sm"
                  onClick={() =>
                    modal.show(<WithdrawStakeModal policy={policy} />)
                  }
                >
                  Withdraw
                </button>
              )}
            </div>
          </div>
        </Link>
      )}
    </>
  );
}

function WithdrawStakeModal({ policy }: { policy: Policy }) {
  const {
    writeContractAsync,
    error: txError,
    data: txHash,
  } = useWriteContract();
  const modal = useModal();
  const [stake, setStake] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const usdjHook = useUsdjHook();
  const [showWarning, setShowWarning] = useState(false);
  const { address } = useAccount();
  const navigate = useNavigate();

  const { data: stakedAmount } = useReadContract({
    ...contractDefinitions.insuranceController,
    address: policy.address as Address,
    functionName: "stakedAmountOfAddress",
    args: [address || zeroAddress],
  });

  const { data: profitShare } = useReadContract({
    ...contractDefinitions.insuranceController,
    address: policy.address as Address,
    functionName: "profitShare",
    args: [address || zeroAddress],
  });

  useEffect(() => {
    if (stake > usdjHook.divideByDecimals(stakedAmount || 0n)) {
      setShowWarning(true);
    } else {
      setShowWarning(false);
    }
  }, [stake]);

  async function handleSubmit() {
    if (stake === 0) {
      toast.error("Please enter a valid amount..", {
        type: "error",
        autoClose: 2000,
      });
      return;
    }

    setLoading(true);
    toast.info("Sign the request to continue..");

    await writeContractAsync({
      ...contractDefinitions.insuranceController,
      address: policy.address as Address,
      functionName: "revokeStakeFromPolicy",
      args: [usdjHook.multiplyWithDecimals(stake)],
    });
  }

  useEffect(() => {
    if (txHash) {
      toast.success("Withdrawn Successfully..", {
        type: "success",
        autoClose: 2000,
      });
      modal.hide();
      setLoading(false);
      navigate(0);
    }

    if (txError) {
      const errormsg = extractErrorFromTx(txError.message);
      toast.error(errormsg || "Failed to withdraw stake..", {
        type: "error",
        autoClose: 2000,
      });
      setLoading(false);
    }

    console.log({ txHash, txError });
  }, [txHash, txError]);

  return (
    <div className="relative flex flex-col gap-y-1 bg-background w-[40vw] mobile:w-[80vw] px-8 py-8 rounded-lg border border-primary/60 mobile:px-8">
      {loading && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
          <div className="bg-zinc-200 animate-pulse border border-border p-8 rounded-lg flex flex-col items-center">
            <div className="w-7 h-7 border-2 border-t-0 border-primary rounded-full animate-spin" />
            <p className="text-primary mt-2 font-semibold">
              Processing Request
            </p>
            <p className="text-mute">Please wait..</p>
          </div>
        </div>
      )}

      <button
        className="absolute top-3 right-3 text-red-500 rounded-full border border-red-500 p-1 hover:opacity-100 opacity-50 ease-in duration-300"
        onClick={() => modal.hide()}
      >
        <Icon icon="close" className="text-[1rem] mobile:text-[1rem]" />
      </button>
      <h1 className="text-2xl font-bold">
        Withdraw Stake from{" "}
        <span className="text-secondary">{policy.name}</span>
      </h1>
      <div className="text-mute flex flex-col text-sm ">
        You can withdraw your stake from the policy at any time along with the
        profit.
        <p>
          You can only withdraw the amount you have staked. You can check the
          amount you have staked below.
        </p>
        <p className="text-front mt-2">
          Max Withdrawl:{" "}
          {usdjHook.divideByDecimals(stakedAmount || 0n).toFixed(2)}
        </p>
      </div>
      <div className="flex flex-col mt-4 relative">
        {showWarning && (
          <p
            className={twMerge(
              "text-xs absolute top-1 right-0 text-red-500 flex gap-x-1 items-center",
              showWarning ? "animate-pulse" : "",
            )}
          >
            <Icon icon="info" /> Withdrawal Limit: $
            {usdjHook.divideByDecimals(stakedAmount || 0n).toFixed(2)}
          </p>
        )}
        <Heading>Enter amount to withdraw</Heading>
        <input
          type="number"
          className="mt-1 rounded-md p-2 bg-background border border-border shadow shadow-mute/30"
          placeholder="Enter Amount in USDJ"
          onChange={(e) => setStake(Number(e.target.value))}
        />
        <p className={twMerge("text-xs text-green-500 flex gap-x-1 mt-2")}>
          Max Profit: ${usdjHook.divideByDecimals(profitShare || 0n)}
        </p>
      </div>

      <button
        className={twMerge(
          " text-secondary border-primary font-bold border duration-300 disabled:opacity-50 disabled:pointer-events-none ease-in w-max px-6 py-2 self-end rounded-lg hover:bg-primary hover:text-front",
          loading ? "animate-pulse" : "",
        )}
        onClick={handleSubmit}
        disabled={loading || showWarning}
      >
        {loading ? "Processing..." : "Withdraw"}
      </button>
    </div>
  );
}
