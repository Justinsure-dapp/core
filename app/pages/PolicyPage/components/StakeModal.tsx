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

export default function StakeModal({
  policy,
}: {
  policy: Policy;
}) {
  const modal = useModal();
  const [stake, setStake] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const { data: hash, writeContractAsync } = useWriteContract();
  const navigate = useNavigate();
  const { allowance, approve, multiplyWithDecimals } = useUsdjHook();

  const stakeReciept = useWaitForTransactionReceipt({
    confirmations: 2,
    hash,
  });

  async function handleSubmit() {
    if (stake === 0) {
      alert("Please enter a valid amount to stake");
      return;
    }

    setLoading(true);
    try {
      if (allowance === BigInt(0) || Number(allowance) < Number(multiplyWithDecimals(stake))) {
        await approve();
      }

      await writeContractAsync({
        ...contractDefinitions.insuranceController,
        address: isAddress(policy.address) ? policy.address : zeroAddress,
        functionName: "stakeToPolicy",
        args: [multiplyWithDecimals(stake)],
      });
    } catch (error) {
      console.error(error);
      alert("Error while staking!");
    }
  }

  useEffect(() => {
    async function saveStakeToDB() {
      const result = await api.policy.updateStakers(
        policy.address,
        policy.creator,
      );

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
    <div className="relative flex flex-col gap-y-1 bg-background widescreen:w-[50vw] max-w-[640px] mobile:w-[80vw] py-8 rounded-lg border border-primary/60 px-8">
      <div className="flex justify-between gap-4 items-center">
        <h1 className="text-2xl font-bold">
          Stake in <span className="text-secondary">{policy.name}</span> policy
        </h1>
        <button
          className="text-red-500 rounded-full border border-red-500 p-1"
          onClick={() => modal.hide()}
        >
          <Icon icon="close" />
        </button>
      </div>
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
          className="rounded-md mt-1 p-2 bg-background border border-border shadow shadow-mute/30"
          placeholder="Enter Amount in USDJ"
          onChange={(e) => setStake(Number(e.target.value))}
        />
      </div>
      <button
        className={twMerge(
          "mt-4 text-secondary border-primary font-bold border duration-300 ease-in w-max px-6 py-2 self-end rounded-lg hover:bg-primary hover:text-front",
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
