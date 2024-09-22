import { twMerge } from "tailwind-merge";
import Heading from "../../NewPolicyPage/components/Heading";
import Icon from "../../../common/Icon";
import useModal from "../../../hooks/useModal";
import { useRef, useState } from "react";
import { usdtDecimals } from "../../../contracts/usdj";
import { useContractWrite, useWaitForTransaction } from "wagmi";

import contractDefinitions from "../../../contracts";
import { Policy } from "../../../types";

export default function StakeModal(props: { policy: Policy }) {
  const modal = useModal();
  const stakeRef = useRef<HTMLInputElement>(null);
  const [stake, setStake] = useState<bigint>(BigInt(0));
  const [loading, setLoading] = useState(false);

  const handleStakeChange = () => {
    if (stakeRef.current) {
      const value = Number(stakeRef.current.value);
      if (!isNaN(value)) {
        setStake(BigInt(value) * BigInt(Math.pow(10, usdtDecimals)));
      }
    }
  };

  const approveTransfer = useContractWrite({
    ...contractDefinitions.usdt,
    functionName: "approve",
  });

  const stakeToPolicy = useContractWrite({
    ...contractDefinitions.insurance,
    address: props.policy.address,
    functionName: "stakeToPolicy",
  });

  useWaitForTransaction({
    hash: approveTransfer.data?.hash,
    onSettled() {
      stakeToPolicy.write({ args: [stake] });
      setLoading(false);
    },
  });

  function stakeApprove() {
    setLoading(true);
    approveTransfer.write({
      args: [props.policy.address, stake + BigInt(1)],
    });

  }

  return (
    <div className="relative flex flex-col gap-y-1 bg-background max-w-[40vw] mobile:max-w-[90vw] px-16 py-8 rounded-lg border border-primary/60 mobile:px-8">
      <button
        className="absolute top-3 right-3 text-red-500 rounded-full border border-red-500 p-1"
        onClick={() => modal.hide()}
      >
        <Icon icon="close" className="text-[1.5rem] mobile:text-[1rem]" />
      </button>
      <h1 className="text-2xl font-bold">Stake in <span className="text-primary">{props.policy.name}</span> {" "} policy</h1>
      {props.policy.description && <p className="text-front/80 text-sm">{props.policy.description}</p>}
      {props.policy.tags.length > 0 && (
        <p className="mt-3">
          <span className="font-bold text-primary">Tags</span>: {props.policy.tags.map((tag) => `#${tag}`).join(", ")}
        </p>
      )}
      <div className="flex flex-col mt-3">
        <Heading>Enter amount to be Staked in policy</Heading>
        <input
          ref={stakeRef}
          type="number"
          className="rounded-md p-2 bg-background border border-border shadow shadow-mute/30"
          placeholder="Enter Amount in FUSDT"
          onChange={handleStakeChange}
        />
      </div>
      <button
        className={twMerge(
          "mt-6 text-primary border-primary font-bold border duration-300 ease-in w-max px-6 py-2 self-end rounded-lg hover:bg-primary hover:text-back",
          loading ? "animate-pulse" : ""
        )}
        onClick={stakeApprove}
        disabled={loading}
      >
        {loading ? "Staking..." : "Stake"}
      </button>
    </div>
  );
}
