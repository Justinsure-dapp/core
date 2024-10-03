import React, { useRef } from "react";
import useIdleScrollbar from "../../../hooks/useIdleScrollbar";
import { useAccount, useReadContract } from "wagmi";
import useWeb3 from "../../../contexts/web3context";
import { isAddress, zeroAddress } from "viem";
import contractDefinitions from "../../../contracts";

export default function StakingStats() {
  const containerRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const { address } = useAccount();
  const { policies } = useWeb3();

  const policiesStakedIn = policies?.filter((p) => p.stakers?.includes(address as string)) || [];

  useIdleScrollbar(containerRef);
  const totalStake = 500;

  return (
    <div
      className="border-y border-border px-6 py-4 flex flex-col gap-y-5 max-h-[80vh] overflow-y-scroll scrollbar-primary"
      ref={containerRef}
    >
      <div className="flex items-center justify-between gap-x-3">
        <h1 className="text-mute text-base font-bold">Your Stakes</h1>
        <p className="bg-foreground p-2 text-sm font-semibold rounded-lg">
          Total : {totalStake}
        </p>
      </div>

      {policiesStakedIn?.map((policy, key) => (
        <div key={key} className="border border-border p-2 rounded-lg">
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
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}