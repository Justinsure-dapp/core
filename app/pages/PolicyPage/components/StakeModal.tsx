import { twMerge } from "tailwind-merge";
import Heading from "../../NewPolicyPage/components/Heading";
import Icon from "../../../common/Icon";
import useModal from "../../../hooks/useModal";
import { useEffect, useRef, useState } from "react";
import { useContractRead, useContractWrite } from "wagmi";
import contractDefinitions from "../../../contracts";
import { Policy } from "../../../types";
import { isAddress, zeroAddress } from "viem";
import useUsdj from "../../../hooks/useUsdj";

export default function StakeModal(props: { policy: Policy, initialStake: boolean }) {
  const modal = useModal();
  const stakeRef = useRef<HTMLInputElement>(null);
  const [stake, setStake] = useState(0);
  const [loading, setLoading] = useState(false);
  const usdjHook = useUsdj({ amount: stake });
  const [decimal, setDecimal] = useState(0);
  const policyAddress = isAddress(props.policy.address) ? props.policy.address : zeroAddress;

  // Set USDJ Decimals
  const { data: usdjDecimals } = useContractRead({
    abi: contractDefinitions.usdj.abi,
    address: contractDefinitions.usdj.address,
    functionName: "decimals",
  })

  const { data } = useContractRead({
    ...contractDefinitions.sureCoin,
    functionName: "totalStake",
  })

  console.log(data)


  useEffect(() => {
    if (usdjDecimals) {
      setDecimal(Number(usdjDecimals));
    }
  }, [usdjDecimals]);

  // Approve USDJ
  useEffect(() => {
    if (usdjHook?.isSuccess) {
      alert("Approved successfully. Proceed with staking!");
      modal.hide();
      window.location.reload();
    } else if (usdjHook?.error) {
      alert("Error approving, Check console for more details!");
    }
  }, [usdjHook?.isSuccess, usdjHook?.error]);

  // Register Stake
  const { write: registerStakeWrite, isSuccess: registerStakeSuccess, error: registerStakeError } = useContractWrite({
    abi: contractDefinitions.insuranceController.abi,
    address: policyAddress,
    functionName: "stakeToPolicy",
    args: [BigInt(stake) * BigInt(decimal)],
  });

  const registerStake = async () => {
    if (usdjHook?.isAllowed) {
      registerStakeWrite();
    } else {
      usdjHook?.approve();
    }
  }

  useEffect(() => {
    if (registerStakeSuccess) {
      alert("Staked successfully");
    } else if (registerStakeError) {
      alert("Error staking, Check console for more details!");
    }
  }, [registerStakeSuccess, registerStakeError]);

  // Initial Staking
  const amount = BigInt(stake * (10**decimal));
  console.log(amount);
  const { write: initialStakeWrite, isSuccess: initialStakeSuccess, error: initialStakeError } = useContractWrite({
    abi: contractDefinitions.insuranceController.abi,
    address: policyAddress,
    functionName: "initialStake",
    args: [amount],
  });

  const setInitialStake = async () => {
    if (usdjHook?.isAllowed) {
      initialStakeWrite();
    } else {
      usdjHook?.approve();
    }
  }

  useEffect(() => {
    if (initialStakeSuccess) {
      alert("Staked successfully");
      modal.hide();
      window.location.reload();
    } else if (initialStakeError) {
      alert("Error staking, Check console for more details!");
    }
  }, [initialStakeSuccess, initialStakeError]);

  // Modal UI
  if(policyAddress === zeroAddress) return null;

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
      {props.policy.tags && props.policy.tags.length > 0 && (
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
          onChange={() => {
            if (stakeRef.current) {
              const value = Number(stakeRef.current.value);
              setStake(value);
            }
          }}
        />
      </div>
      <button
        className={twMerge(
          "mt-6 text-primary border-primary font-bold border duration-300 ease-in w-max px-6 py-2 self-end rounded-lg hover:bg-primary hover:text-back",
          loading ? "animate-pulse" : ""
        )}
        onClick={!props.initialStake ? registerStake : setInitialStake}
        disabled={loading}
      >
        {loading ? "Staking..." : "Stake"}
      </button>
    </div>
  );
}
