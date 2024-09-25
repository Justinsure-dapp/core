import { twMerge } from "tailwind-merge";
import Heading from "../../NewPolicyPage/components/Heading";
import Icon from "../../../common/Icon";
import useModal from "../../../hooks/useModal";
import { useEffect, useRef, useState } from "react";
import { usdtDecimals } from "../../../contracts/usdj";
import { useAccount, useContractRead, useContractWrite, useSignMessage, useWaitForTransaction } from "wagmi";
import contractDefinitions from "../../../contracts";
import { Policy } from "../../../types";
import { isAddress } from "viem";

export default function StakeModal(props: { policy: Policy }) {
  const modal = useModal();
  const stakeRef = useRef<HTMLInputElement>(null);
  const [stake, setStake] = useState(0);
  const [loading, setLoading] = useState(false);
  const { address: stakerAddress } = useAccount();
  const policyAddress = props.policy.address;


  if (!policyAddress || !isAddress(policyAddress)) {
    return null;
  }

  const { data: usdjDecimals } = useContractRead({
    abi: contractDefinitions.usdj.abi,
    address: contractDefinitions.usdj.address,
    functionName: "decimals",
  })

  if (!usdjDecimals) {
    return null;
  }

  const { data: stakingResult, isLoading: stakingIsLoading, isSuccess: stakingSuccess,
     write } = useContractWrite({
    abi: contractDefinitions.insuranceController.abi,
    address: policyAddress,
    functionName: "stakeToPolicy",
    args: [BigInt(stake) * BigInt(usdjDecimals)],
  });

  const handleStakeChange = () => {
    if (stakeRef.current) {
      const value = Number(stakeRef.current.value);
      setStake(value);
    }
  };

  const registerStake = () => {
    setLoading(true);
    try {
      if (!stakerAddress || !isAddress(stakerAddress)) {
        throw new Error("Invalid staker address");
      }

      write();

      if (!stakingIsLoading && stakingSuccess) {
        alert("Stake registered successfully");
        console.log({ stakingResult });
        modal.hide();
      } else {
        alert("Staking failed, check console for more details..");
        modal.hide();
      }

      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      console.error(error);
      if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert("An error occured, please try again");
      }
    }
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
        onClick={registerStake}
        disabled={loading}
      >
        {loading ? "Staking..." : "Stake"}
      </button>
    </div>
  );
}
