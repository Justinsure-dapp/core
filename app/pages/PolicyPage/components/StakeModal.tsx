import { twMerge } from "tailwind-merge";
import Heading from "../../NewPolicyPage/components/Heading";
import Icon from "../../../common/Icon";
import useModal from "../../../hooks/useModal";
import { useEffect, useState } from "react";
import { useAccount, useReadContract, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
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
  const [showWarning, setShowWarning] = useState(false);

  const stakeReciept = useWaitForTransactionReceipt({
    confirmations: 2,
    hash,
  });

  const { data: minStake } = useReadContract({
    ...contractDefinitions.surityInterface,
    functionName: "minimumInitialStake",
  });

  const { data: usdjDecimals } = useReadContract({
    abi: contractDefinitions.usdj.abi,
    address: contractDefinitions.usdj.address,
    functionName: "decimals",
  });

  const minStakewithDecimals =
    Number(minStake) / Math.pow(10, Number(usdjDecimals));

  useEffect(() => {
    if (stake < minStakewithDecimals) {
      setShowWarning(true);
    } else {
      setShowWarning(false);
    }
  }, [stake]);

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

      toast.update(handleSubmitToast, { render: "Transaction submitted..", type: "info", isLoading: false, autoClose: 2000 });
    } catch (error) {
      toast.update(handleSubmitToast, { render: "Something went wrong..", type: "error", isLoading: false, autoClose: 2000 });
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
        navigate('/account');
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
    <div className="relative flex flex-col gap-y-1 bg-background w-[40vw] mobile:w-[80vw] px-8 py-8 rounded-lg border border-primary/60 mobile:px-8">
      <button
        className="absolute top-3 right-3 text-red-500 rounded-full border border-red-500 p-1 hover:opacity-100 opacity-50 ease-in duration-300"
        onClick={() => modal.hide()}
      >
        <Icon icon="close" className="text-[1rem] mobile:text-[1rem]" />
      </button>
      <h1 className="text-2xl font-bold mb-2">Stake in the Policy and Earn Rewards</h1>
      <div className="text-mute flex flex-col gap-y-1 text-sm ">By staking in this policy, you can actively participate and earn benefits. Here's how it works:
        <p>
          <span className="text-front">1. Profit Sharing: </span>
          When you stake, you will receive 2% of the policy's total revenue. This includes premiums collected, allowing you to earn passive income based on the policy's performance.
        </p>
        <p>
          <span className="text-front">2. SureCoin Rewards: </span>
          In addition to profit sharing, you will earn <span className="text-secondary font-bold">
            SureCoins
          </span>
          — A special revenue-sharing token. SureCoin holders benefit from platform-wide activity, as 50% of all platform fees are used to support the liquidity of SureCoin. This ensures that even if no one directly invests in SureCoin, it continues to gain value over time.
        </p>
      </div>
      <div className="flex flex-col mt-6 relative">
        <p
          className={twMerge(
            "text-xs absolute top-1 right-0 animate-pulse text-red-500 flex gap-x-1 items-center",
            showWarning ? "" : "hidden",
          )}
        >
          <Icon icon="info" /> Minimum Stake: {minStakewithDecimals} USDJ
        </p>
        <Heading>Enter amount to be Staked in policy</Heading>
        <input
          type="number"
          className="mt-1 rounded-md p-2 bg-background border border-border shadow shadow-mute/30"
          placeholder="Enter Amount in USDJ"
          onChange={(e) => setStake(Number(e.target.value))}
        />
      </div>
      <button
        className={twMerge(
          "mt-3 text-secondary border-primary font-bold border duration-300 disabled:opacity-50 disabled:pointer-events-none ease-in w-max px-6 py-2 self-end rounded-lg hover:bg-primary hover:text-front",
          loading ? "animate-pulse" : "",
        )}
        onClick={handleSubmit}
        disabled={loading || showWarning}
      >
        {loading ? "Staking..." : "Stake"}
      </button>
    </div>
  );
}
