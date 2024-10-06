import { twMerge } from "tailwind-merge";
import Heading from "../../NewPolicyPage/components/Heading";
import Icon from "../../../common/Icon";
import useModal from "../../../hooks/useModal";
import { useEffect, useState } from "react";
import {
  useAccount,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import contractDefinitions from "../../../contracts";
import { Policy } from "../../../types";
import { isAddress, zeroAddress } from "viem";
import useUsdjHook from "../../../hooks/useUsdj";
import api from "../../../utils/api";
import { useNavigate } from "react-router-dom";

export default function InitialStakeModal({ policy }: { policy: Policy }) {
  const modal = useModal();
  const [stake, setStake] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const { data: hash, writeContractAsync } = useWriteContract();
  const navigate = useNavigate();
  const { allowance, approve, multiplyWithDecimals } = useUsdjHook();
  const [showWarning, setShowWarning] = useState(false);
  const { address } = useAccount();

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

  async function handleSubmit() {
    if (stake === 0) {
      alert("Please enter a valid amount to stake");
      return;
    }

    if(!address || !policy.address || address !== policy.address) {
      alert("You have to be the policy creator to stake initially!");
      return;
    }

    setLoading(true);
    try {
      if (allowance === BigInt(0) || Number(allowance) < stake) {
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
    if (stake < minStakewithDecimals) {
      setShowWarning(true);
    } else {
      setShowWarning(false);
    }
  }, [stake]);

  useEffect(() => {
    async function saveStakeToDB() {
      if(!address) return;

      const result = await api.policy.updateStakers(
        policy.address,
        address,
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
    <div className="relative flex flex-col gap-y-1 bg-background w-[40vw] mobile:w-[80vw] px-8 py-8 rounded-lg border border-primary/60 mobile:px-8">
      <button
        className="absolute top-3 right-3 text-red-500 rounded-full border border-red-500 p-1 hover:opacity-100 opacity-50 ease-in duration-300"
        onClick={() => modal.hide()}
      >
        <Icon icon="close" className="text-[1rem] mobile:text-[1rem]" />
      </button>
      <h1 className="text-2xl font-bold mb-2">Initial Stake Required</h1>
        <div className="text-mute flex flex-col gap-y-1 text-sm ">To activate this policy, you must provide an initial stake. This stake serves two important purposes:
          <p>
            <span className="text-front">1. Liquidity Provision: </span>
            The initial stake ensures there is enough liquidity to support any
            claims or payouts from the policy, making the policy viable.
          </p>
          <p>
            <span className="text-front">2. Visibility: </span>
            Without the initial stake, the policy will not be visible to the
            public. Staking upfront demonstrates your commitment to the policy,
            allowing others to trust and interact with it.
          </p>
          <p className="mt-2 text-red-500/80 bg-red-500/10 py-1 px-2 rounded-md">
            Please note that if no initial stake is provided, the policy will
            remain inactive & hidden from potential backers.
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
