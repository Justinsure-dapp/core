import { useState } from "react";
import AutomatedInvestment from "./AutomatedInvestment";
import PolicyHolders from "./PolicyHolders";
import StakeDistribution from "./StakeDistribution";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { twMerge } from "tailwind-merge";

interface Policy {
  name: string;
  marketer: string;
  logoUrl: string;
  description: string;
  policyHolder: number;
  stakeHolder: number;
  MoneyInPool: number;
  data: {
    labels: string[];
    values: number[];
    bgColor: string[];
  };
}

export default function PolicyCard(props: { policy: Policy }) {
  const [expanded, setExpanded] = useState(false);
  const [parent] = useAutoAnimate();

  return (
    <div
      ref={parent}
      className="flex flex-col gap-y-4 p-4 rounded-lg border border-secondary/20 relative"
    >
      <div className="flex flex-col gap-y-1">
        <h1 className="text-xl font-semibold">{props.policy.name}</h1>
        <div className="text-front/80 text-sm">{props.policy.description}</div>
      </div>
      <div className="flex gap-x-4 flex-wrap gap-y-4 mobile:gap-y-2">
        <div className="bg-background hover:bg-front hover:bg-opacity-[1%] duration-300 ease-in-out border border-front/20 w-max flex px-4 py-3 rounded-xl gap-x-8 justify-between items-center">
          <div className="flex flex-col">
            <h1 className="text-xl font-bold font-mono">
              {props.policy.policyHolder}
            </h1>
            <p className="text-front/80 flex items-center text-sm">
              Policy Holders &#160;{" "}
              <span className="text-green-500">+21.4%</span>
            </p>
          </div>
          <div className="p-2 bg-green-500/20 rounded-xl">
            <img src="https://img.icons8.com/ios-filled/32/40C057/bullish.png" />
          </div>
        </div>
        <div className="bg-background hover:bg-slate-400 hover:bg-opacity-[1%] duration-300 ease-in-out border border-front/20 w-max flex px-4 py-3 rounded-xl gap-x-8 justify-between items-center">
          <div className="flex flex-col">
            <h1 className="text-xl font-bold font-mono">
              {props.policy.stakeHolder}
            </h1>
            <p className="text-front/80 text-sm">
              Stake Holders &#160; <span className="text-red-500">-12.43%</span>
            </p>
          </div>
          <div className="p-2 bg-red-500/20 rounded-xl">
            <img src="https://img.icons8.com/ios-filled/32/FA5252/bearish.png" />
          </div>
        </div>
        <div className="bg-background hover:bg-slate-400 hover:bg-opacity-[1%] duration-300 ease-in-out border border-front/20 w-max flex px-4 py-3 rounded-xl gap-x-8 justify-between items-center">
          <div className="flex flex-col">
            <h1 className="text-xl font-bold font-mono">
              $ {props.policy.MoneyInPool}
            </h1>
            <p className="text-front/80 text-sm">Money in Pool &#160; </p>
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
        <div className="flex flex-col">
          {/* <button className="bg-front/20 w-max py-2 px-3 rounded-lg">
              Recent Activity
            </button> */}
          <PolicyHolders />
          <StakeDistribution data={props.policy.data} />
          <AutomatedInvestment />
        </div>
      )}
    </div>
  );
}
