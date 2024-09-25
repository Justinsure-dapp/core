import { useEffect, useState } from "react";
import AutomatedInvestment from "./AutomatedInvestment";
import PolicyHolders from "./PolicyHolders";
import StakeDistribution from "./StakeDistribution";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { twMerge } from "tailwind-merge";
import { useContractRead } from "wagmi";
import contractDefinitions from "../../../contracts";
import { isAddress } from "viem";
import { Policy, User } from "../../../types";
import api from "../../../utils/api";

export default function PolicyCard(props: { policy: Policy }) {
  const [expanded, setExpanded] = useState(false);
  const [creator, setCreator] = useState<User>();
  const [parent] = useAutoAnimate();

  console.log(creator)

  const { data: isPaused } = useContractRead({
    ...contractDefinitions.insuranceController,
    address: isAddress(props.policy.address) ? props.policy.address : undefined,
    functionName: "paused",
  });

  useEffect(() => {
    api.user.get(props.policy.creator)
      .then((user) => {
        setCreator(user);
      }).catch((error) => {
        console.error(error);
        alert("Failed to fetch creator details");
      });
  }, [props.policy.creator]);

  return (
    <div
      ref={parent}
      className="flex flex-col gap-y-4 p-6 rounded-lg border border-secondary/30 relative"
    >
      <div className="flex flex-col gap-y-1">
        <h1 className="text-xl font-semibold">{props.policy.name}</h1>
        <div className="text-front/80 text-sm">{props.policy.description}</div>
      </div>
      <div className="flex gap-x-4 flex-wrap gap-y-4 mobile:gap-y-2">
        <div className="bg-background hover:bg-front hover:bg-opacity-[1%] duration-300 ease-in-out border border-front/20 w-max flex px-4 py-3 rounded-xl gap-x-8 justify-between items-center">
          <div className="flex flex-col">
            <p className="text-front/80 flex items-center text-sm">
              Stake Holders &#160;{" "}
            </p>
          </div>
          <div className="p-2 bg-green-500/20 rounded-xl">
            <img src="https://img.icons8.com/ios-filled/32/40C057/bullish.png" />
          </div>
        </div>
        <div className="bg-background hover:bg-slate-400 hover:bg-opacity-[1%] duration-300 ease-in-out border border-front/20 w-max flex px-4 py-3 rounded-xl gap-x-8 justify-between items-center">
          <div className="flex flex-col">
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
          {/* <StakeDistribution data={props.policy.data} /> */}
          <AutomatedInvestment />
        </div>
      )}
    </div>
  );
}
