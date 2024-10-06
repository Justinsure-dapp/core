import { twMerge } from "tailwind-merge";
import Heading from "../../NewPolicyPage/components/Heading";
import Icon from "../../../common/Icon";
import useModal from "../../../hooks/useModal";
import { useEffect, useState } from "react";
import { useAccount, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import contractDefinitions from "../../../contracts";
import { Policy } from "../../../types";
import { isAddress, zeroAddress } from "viem";
import useUsdjHook from "../../../hooks/useUsdj";
import api from "../../../utils/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function StakeModal({ policy }: { policy: Policy }) {
  const modal = useModal();
  const navigate = useNavigate();
  const [stake, setStake] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const { allowance, approve, multiplyWithDecimals } = useUsdjHook();
  const { address } = useAccount();
  const { data: hash, writeContractAsync } = useWriteContract();

  const stakeReciept = useWaitForTransactionReceipt({
    confirmations: 2,
    hash,
  });

  async function handleSubmit() {
    if (stake === 0) {
      toast.error("Invalid USDJ amount..", { type: "error", isLoading: false, autoClose: 2000 });
      return;
    }

    const handleSubmitToast = toast("Waiting for approval...", { type: "info", isLoading: true });
    setLoading(true);
    try {
      if (
        allowance === BigInt(0) ||
        Number(allowance) < Number(multiplyWithDecimals(stake))
      ) {
        await approve();
      }

      await writeContractAsync({
        ...contractDefinitions.insuranceController,
        address: isAddress(policy.address) ? policy.address : zeroAddress,
        functionName: "stakeToPolicy",
        args: [multiplyWithDecimals(stake)],
      });

      toast.update(handleSubmitToast, { render: "Transaction queued..", type: "info", isLoading: false, autoClose: 500 });
    } catch (error) {
      toast.update(handleSubmitToast, { render: "Something went wrong..", type: "error", isLoading: false, autoClose: 1000 });
      console.error(error);
    }
  }

  useEffect(() => {
    async function saveStakeToDB() {
      if (!address) return;
      const result = await api.policy.updateStakers(
        policy.address,
        address,
      );

      if (result) {
        toast.success("Staked successfully..", { type: "success", isLoading: false, autoClose: 2000 });
        modal.hide();
      } else {
        console.error("Error while updating stakers in mongoDB");
        toast.error("Error while updating stakers in mongoDB", { type: "error", isLoading: false, autoClose: 2000 });
      }
    }

    if (stakeReciept.isSuccess) {
      saveStakeToDB();
    }

    if (stakeReciept.isError) {
      toast.error("Transaction failed..", { type: "error", isLoading: false, autoClose: 2000 });
    }
  }, [stakeReciept.isLoading]);

  return (
    <div className="relative flex flex-col gap-y-1 bg-background widescreen:w-[50vw] max-w-[640px] mobile:w-[80vw] py-8 rounded-lg border border-primary/60 px-8">
      {loading && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
          <div className="bg-zinc-200 animate-pulse border border-border p-8 rounded-lg flex flex-col items-center">
            <div className="w-7 h-7 border-2 border-t-0 border-primary rounded-full animate-spin" />
            <p className="text-primary mt-2 font-semibold">Processing Request</p>
            <p className="text-mute">Please wait..</p>
          </div>
        </div>
      )}

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
        <Heading>Enter amount to be Staked in policy ( USDJ )</Heading>
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
