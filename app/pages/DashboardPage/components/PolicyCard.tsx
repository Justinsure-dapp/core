import { useEffect, useState } from "react";
import AutomatedInvestment from "./AutomatedInvestment";
import PolicyHolders from "./PolicyHolders";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useReadContract } from "wagmi";
import contractDefinitions from "../../../contracts";
import { isAddress, zeroAddress } from "viem";
import { Policy, User } from "../../../types";
import useModal from "../../../hooks/useModal";
import useUsdjHook from "../../../hooks/useUsdj";
import InitialStakeModal from "./InitialStakeModal";
import Icon from "../../../common/Icon";
import api from "../../../utils/api";

export default function PolicyCard(props: { policy: Policy }) {
  const [parent] = useAutoAnimate();
  const modal = useModal();
  const usdj = useUsdjHook();
  const [expanded, setExpanded] = useState(false);
  const policyAddress = isAddress(props.policy.address)
    ? props.policy.address
    : zeroAddress;

  const { data: isPaused } = useReadContract({
    abi: contractDefinitions.insuranceController.abi,
    address: policyAddress,
    functionName: "paused",
  });

  const { data: totalStake } = useReadContract({
    abi: contractDefinitions.insuranceController.abi,
    address: policyAddress,
    functionName: "totalStake",
  });

  return (
    <div
      ref={parent}
      className="flex flex-col gap-y-4 relative bg-foreground/20 border border-front border-opacity-[15%] rounded-md p-3"
    >
      <div className="flex flex-col">
        <div className="flex gap-y-1 justify-between">
          <div className="flex gap-4 items-center">
            <img src={props.policy.image} alt="logo" className="w-12 h-12 rounded-lg border border-border object-cover" />
            <div>
              <h1 className="text-xl font-semibold">{props.policy.name}</h1>
              {isPaused ? (
                <p className="text-red-500 tracking-wide flex gap-x-2 whitespace-nowrap text-sm items-center">
                  Policy Inactive<Icon icon="info" />
                </p>
              ) : (
                <p className="text-green-500 tracking-wide flex gap-x-2 whitespace-nowrap text-sm items-center">
                  Policy Active<Icon icon="done" />
                </p>
              )}
            </div>
          </div>

          <div className="font-semibold">
            {isPaused && (
              <button
                onClick={() =>
                  modal.show(<InitialStakeModal policy={props.policy} />)
                }
                className="transition-all border hover:bg-zinc-900/60 border-zinc-600 px-4 py-1 text-sm text-front rounded-md font-medium whitespace-nowrap"
              >
                Set Initial Stake
              </button>
            )}
          </div>
        </div>

        <div className="text-front/80 mt-2 text-sm">
          {`${props.policy.description.slice(0, 250)}${props.policy.description.length > 250 ? "..." : ""}`}
        </div>
      </div>
      <div className="flex gap-x-4 flex-wrap gap-y-4 mobile:gap-y-2">
        <div className="bg-background hover:bg-front hover:bg-opacity-[1%] duration-300 ease-in-out border border-front/20 w-max flex px-4 py-1 rounded-2xl gap-x-8 justify-between items-center">
          <div className="flex flex-col">
            <p className="text-front/80 flex items-center text-sm">
              {props.policy.holders?.length} Policy Holders
            </p>
          </div>
        </div>
        <div className="bg-background hover:bg-slate-400 hover:bg-opacity-[1%] duration-300 ease-in-out border border-front/20 w-max flex px-4 py-1 rounded-2xl gap-x-8 justify-between items-center">
          <div className="flex flex-col">
            <p className="text-front/80 text-sm">
              {usdj.divideByDecimals(totalStake || 0n)?.toString()} USDJ Staked
            </p>
          </div>
        </div>
      </div>

      <button
        className="text-sm absolute bottom-2 right-4 underline underline-offset-2 text-zinc-400"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? "View Less" : "View More"}
      </button>

      {expanded && <PolicyHolders holders={props.policy.holders} />}
    </div>
  );
}
