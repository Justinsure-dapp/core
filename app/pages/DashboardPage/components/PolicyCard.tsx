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
import useApiResponse from "../../../hooks/useApiResponse";

export default function PolicyCard(props: { policy: Policy }) {
  const [parent] = useAutoAnimate();
  const [holders, setHolders] = useState<User[]>();
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

  useEffect(() => {
    const fetchPolicyHolders = async () => {
      const response = await api.user.fetchPolicyHolders(policyAddress);
      setHolders(response.holders);
    }

    fetchPolicyHolders();
  }, []);

  return (
    <div
      ref={parent}
      className="flex flex-col gap-y-4 p-6 rounded-lg border border-secondary/30 relative"
    >
      <div className="flex flex-col gap-4">
        <div className="flex gap-y-1 justify-between ">
          <div className="flex gap-2 items-center">
            <img
              src={props.policy.image}
              alt={props.policy.name}
              className="rounded-full aspect-square w-16 object-cover border border-border p-1"
            />

            <div>
              <h1 className="text-xl font-semibold">{props.policy.name}</h1>
              <div className="text-front/80 text-sm">
                {props.policy.description}
              </div>
            </div>
          </div>

          <div className="font-semibold">
            {isPaused ? (
              <div className="flex items-center gap-4">
                <p className="text-red-500 tracking-wide flex gap-x-2 items-center">
                  <Icon icon="info" className="text-xl" /> POLICY INACTIVE :</p>
                <button
                  onClick={() =>
                    modal.show(
                      <InitialStakeModal policy={props.policy} />,
                    )
                  }
                  className="transition-all border hover:bg-zinc-900/60 border-zinc-600 px-4 py-1 text-front rounded-lg font-medium"
                >
                  Set Initial Stake
                </button>
              </div>
            ) : (
              <div className="text-green-500 tracking-wide flex gap-x-2 items-center">
                <Icon icon="done" /> POLICY ACTIVE</div>
            )}
          </div>
        </div>
      </div>
      <div className="flex gap-x-4 flex-wrap gap-y-4 mobile:gap-y-2">
        <div className="bg-background hover:bg-front hover:bg-opacity-[1%] duration-300 ease-in-out border border-front/20 w-max flex px-4 py-3 rounded-xl gap-x-8 justify-between items-center">
          <div className="flex flex-col">
            <p className="text-front/80 flex items-center text-sm">
              {props.policy.holders?.length} Policy Holders
            </p>
          </div>
        </div>
        <div className="bg-background hover:bg-slate-400 hover:bg-opacity-[1%] duration-300 ease-in-out border border-front/20 w-max flex px-4 py-3 rounded-xl gap-x-8 justify-between items-center">
          <div className="flex flex-col">
            <p className="text-front/80 text-sm">{usdj.divideByDecimals(totalStake || 0n)?.toString()} USDJ Staked</p>
          </div>
        </div>
      </div>

      <button
        className="absolute bottom-2 right-4 underline underline-offset-2 text-zinc-400"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? "View Less" : "View More"}
      </button>

      {expanded && (
        <PolicyHolders holders={holders} />
      )}
    </div>
  );
}
