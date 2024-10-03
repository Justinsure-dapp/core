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
  const policiesStakedIn = policies?.filter((p) => p.stakers?.includes(address as string)) || [];

  return (
    <div
      className="border-y border-border px-6 py-4 flex flex-col gap-y-5 max-h-[80vh] overflow-y-scroll scrollbar-primary"
      ref={containerRef}
    >
      <div className="flex items-center justify-between gap-x-3">
        <h1 className="text-mute text-base font-bold">Your Stakes</h1>
        <p className="bg-foreground p-2 text-sm font-semibold rounded-lg">
          Total : {totalStake.toFixed(2)}
        </p>
      </div>

      {policiesStakedIn.map((policy, index) => (
        <PolicyCard key={index} setTotalStake={setTotalStake} policy={policy} />
      ))}
    </div>
  );
}

function PolicyCard({ policy, setTotalStake }: { policy: Policy, setTotalStake: Function }) {
  const { address } = useAccount();
  const hasAddedStake = useRef(false);
  const usdj = useUsdjHook();

  const { data: stakeAmount } = useReadContract({
    ...contractDefinitions.insuranceController,
    address: policy.address && isAddress(policy.address) ? policy.address : zeroAddress,
    functionName: "stakedAmountOfAddress",
    args: [address ? address : zeroAddress],
  });

  useEffect(() => {
    if (stakeAmount && !hasAddedStake.current) {
      setTotalStake((prev: number) => prev + usdj.divideByDecimals(stakeAmount || 0n));
      hasAddedStake.current = true;
    }
  }, [stakeAmount, setTotalStake]);

  return (
    <div className="border hover:bg-secondary/10 transition-all border-border p-2 rounded-lg">
      <div className="flex gap-x-3 items-center">
        <img
          src="/logo.png"
          alt="bf"
          className="aspect-square rounded-lg h-12 bg-foreground"
        />
        <div className="flex flex-col gap-y-1">
          <h1 className="font-semibold text-sm max-w-[12vw] truncate">
            {policy.name}
          </h1>
          <p className="text-xs">Category : {policy.category}</p>
          <p className="text-xs">Stake: {usdj.divideByDecimals(stakeAmount || 0n).toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}