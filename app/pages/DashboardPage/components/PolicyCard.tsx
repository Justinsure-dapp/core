import { useState } from "react";
import AutomatedInvestment from "./AutomatedInvestment";
import PolicyHolders from "./PolicyHolders";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useReadContract } from "wagmi";
import contractDefinitions from "../../../contracts";
import { isAddress, zeroAddress } from "viem";
import { Policy, User } from "../../../types";
import useModal from "../../../hooks/useModal";
import StakeModal from "../../PolicyPage/components/StakeModal";

export default function PolicyCard(props: { policy: Policy }) {
  const [parent] = useAutoAnimate();
  const [expanded, setExpanded] = useState(false);
  const modal = useModal();
  const policyAddress = isAddress(props.policy.address)
    ? props.policy.address
    : zeroAddress;
  const creatorAddress = isAddress(props.policy.creator)
    ? props.policy.creator
    : zeroAddress;

  const { data: isPaused } = useReadContract({
    abi: contractDefinitions.insuranceController.abi,
    address: policyAddress,
    functionName: "paused"
  });

  const { data: totalStake } = useReadContract({
    abi: contractDefinitions.insuranceController.abi,
    address: policyAddress,
    functionName: "totalStake"
  });

  return (
    <div
      ref={parent}
      className="flex flex-col gap-y-4 p-6 rounded-lg border border-secondary/30 relative"
    >
      <div className="flex flex-col  gap-4">
        <div className="flex gap-y-1 justify-between ">
          <h1 className="text-xl font-semibold">{props.policy.name}</h1>
          <div className="font-semibold">
            {isPaused ? (
              <div className="flex items-center gap-4">
                <p className="text-red-500">POLICY INACTIVE:</p>
                <button
                  onClick={() =>
                    modal.show(
                      <StakeModal policy={props.policy} initialStake={true} />,
                    )
                  }
                  className="transition-all border hover:bg-zinc-900 border-zinc-600 p-2 text-back rounded-lg font-medium"
                >
                  Set Initial Stake
                </button>
              </div>
            ) : (
              <div className="text-green-500">POLICY ACTIVE</div>
            )}
          </div>
        </div>
        <div className="text-front/80 text-sm">{props.policy.description}</div>
      </div>
      <div className="flex gap-x-4 flex-wrap gap-y-4 mobile:gap-y-2">
        <div className="bg-background hover:bg-front hover:bg-opacity-[1%] duration-300 ease-in-out border border-front/20 w-max flex px-4 py-3 rounded-xl gap-x-8 justify-between items-center">
          <div className="flex flex-col">
            <p className="text-front/80 flex items-center text-sm">
              {props.policy.holders?.length} Policy Holders
            </p>
          </div>
          <div className="p-2 bg-green-500/20 rounded-xl">
            <img src="https://img.icons8.com/ios-filled/32/40C057/bullish.png" />
          </div>
        </div>
        <div className="bg-background hover:bg-slate-400 hover:bg-opacity-[1%] duration-300 ease-in-out border border-front/20 w-max flex px-4 py-3 rounded-xl gap-x-8 justify-between items-center">
          <div className="flex flex-col">
            <p className="text-front/80 text-sm">{totalStake?.toString()} USDJ Staked</p>
          </div>
          <div className="p-2 bg-front/20 rounded-xl">
            <img src="https://img.icons8.com/pulsar-color/32/money-bag.png" />
          </div>
        </div>
      </div>

      <button
        className="absolute bottom-2 right-4 underline underline-offset-2 text-zinc-100"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? "View Less" : "View More"}
      </button>

      {expanded && (
        <div className="flex flex-col gap-5">
          <PolicyHolders holders={props.policy.holders} />
          <AutomatedInvestment />
        </div>
      )}
    </div>
  );
}
