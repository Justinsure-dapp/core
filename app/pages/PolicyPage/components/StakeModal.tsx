import { twMerge } from "tailwind-merge";
import Heading from "../../NewPolicyPage/components/Heading";
import Icon from "../../../common/Icon";
import useModal from "../../../hooks/useModal";
import { useEffect, useState } from "react";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import contractDefinitions from "../../../contracts";
import { Policy } from "../../../types";
import { isAddress, zeroAddress } from "viem";
import useUsdjHook from "../../../hooks/useUsdj";
import api from "../../../utils/api";
import { useNavigate } from "react-router-dom";

export default function StakeModal({ policy }: {
  policy: Policy;
  initialStake: boolean;
}) {
  const modal = useModal();
  const [stake, setStake] = useState<bigint>(0n);
  const [loading, setLoading] = useState(false);
  const { data: hash, writeContractAsync } = useWriteContract()
  const navigate = useNavigate();
  const { allowance, approve, format } = useUsdjHook();

  const stakeReciept = useWaitForTransactionReceipt({
    confirmations: 2,
    hash,
  });

  async function handleSubmit() {
    if (stake === 0n) {
      alert("Please enter a valid amount to stake");
      return;
    }

    setLoading(true);
    try {
      if (allowance === BigInt(0) || Number(allowance) < Number(stake)) {
        await approve();
      }

      await writeContractAsync({
        ...contractDefinitions.insuranceController,
        address: isAddress(policy.address) ? policy.address : zeroAddress,
        functionName: "stakeToPolicy",
        args: [stake],
      });
    } catch (error) {
      console.error(error);
      alert("Error while staking!");
    }
  }
  
  console.log({stake})

  useEffect(() => {
    async function saveStakeToDB() {
      const result = await api.policy.updateStakers(policy.address, policy.creator);

      if (result) {
        alert("Staked successfully");
        modal.hide();
        navigate(0);
      } else {
        console.error("Error while updating stakers in mongoDB");
      }
    }

    if (stakeReciept.isSuccess) saveStakeToDB();

    if (stakeReciept.isError) {
      alert("Error while staking!");
      console.error(stakeReciept.error);
    }
  }, [stakeReciept]);

  return (
    <div className="relative flex flex-col gap-y-1 bg-background max-w-[40vw] mobile:max-w-[90vw] px-16 py-8 rounded-lg border border-primary/60 mobile:px-8">
      <button
        className="absolute top-3 right-3 text-red-500 rounded-full border border-red-500 p-1"
        onClick={() => modal.hide()}
      >
        <Icon icon="close" className="text-[1.5rem] mobile:text-[1rem]" />
      </button>
      <h1 className="text-2xl font-bold">
        Stake in <span className="text-secondary">{policy.name}</span>{" "}
        policy
      </h1>
      {policy.description && (
        <p className="text-front/80 text-sm">{policy.description}</p>
      )}
      {policy.tags && policy.tags.length > 0 && (
        <p className="mt-3">
          <span className="font-bold text-secondary">Tags:</span>{" "}
          {policy.tags.map((tag) => `#${tag}`).join(", ")}
        </p>
      )}
      <div className="flex flex-col mt-3">
        <Heading>Enter amount to be Staked in policy</Heading>
        <input
          type="number"
          className="rounded-md p-2 bg-background border border-border shadow shadow-mute/30"
          placeholder="Enter Amount in USDJ"
          onChange={(e) => setStake(BigInt(e.target.value))}
        />
      </div>
      <button
        className={twMerge(
          "mt-6 text-secondary border-primary font-bold border duration-300 ease-in w-max px-6 py-2 self-end rounded-lg hover:bg-primary hover:text-back",
          loading ? "animate-pulse" : "",
        )}
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Staking..." : "Stake"}
      </button>
    </div>
  );
}