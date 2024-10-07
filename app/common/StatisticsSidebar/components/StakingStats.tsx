import React, { useEffect, useRef, useState } from "react";
import useIdleScrollbar from "../../../hooks/useIdleScrollbar";
import { useAccount, useReadContract } from "wagmi";
import useWeb3 from "../../../contexts/web3context";
import { isAddress, zeroAddress } from "viem";
import contractDefinitions from "../../../contracts";
import { Policy } from "../../../types";
import useUsdjHook from "../../../hooks/useUsdj";
import { Link } from "react-router-dom";

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
          Total : {totalStake.toFixed(2)}
        </p>
      </div>

      {policiesStakedIn.map((policy, index) => (
        <StakedInCard
          key={index}
          setTotalStake={setTotalStake}
          policy={policy}
        />
      ))}
    </div>
  );
}

export function StakedInCard({
  policy,
  setTotalStake,
  setStakes,
}: {
  policy: Policy;
  setTotalStake: Function;
  setStakes?: Function;
}) {
  const { address } = useAccount();
  const hasAddedStake = useRef(false);
  const usdj = useUsdjHook();

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
    <div
      className={`border transition-all border-border p-2 rounded-lg ${policy.creator === address ? " hover:bg-secondary/30" : "hover:bg-secondary/10"}`}
      title={policy.creator === address ? "Created by you" : "Staked by you"}
    >
      <div className="flex gap-x-3 ">
        <img
          src={policy.image}
          alt="bf"
          className="aspect-square rounded-full p-1 object-cover border border-border h-14 "
        />
        <div className="flex flex-col w-full">
          <h1 className="font-semibold text-sm w-full capitalize">
            {policy.name}
          </h1>
          <p className="text-xs text-front/70">{policy.category}</p>
          <p className="text-xs self-end mt-2">
            Stake: {usdj.divideByDecimals(stakeAmount || 0n).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}
