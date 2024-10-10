import { useEffect, useState } from "react";
import AutomatedInvestment from "./AutomatedInvestment";
import PolicyHolders from "./PolicyHolders";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useReadContract, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import contractDefinitions from "../../../contracts";
import { Address, isAddress, zeroAddress } from "viem";
import { Policy, User } from "../../../types";
import useModal from "../../../hooks/useModal";
import useUsdjHook from "../../../hooks/useUsdj";
import InitialStakeModal from "./InitialStakeModal";
import Icon from "../../../common/Icon";
import { toast } from "react-toastify";
import Heading from "../../NewPolicyPage/components/Heading";
import { twMerge } from "tailwind-merge";
import { extractErrorFromTx } from "../../../utils";
import { useNavigate } from "react-router-dom";

export default function PolicyCard(props: { policy: Policy }) {
  const [parent] = useAutoAnimate();
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

  const { data: creatorStake } = useReadContract({
    abi: contractDefinitions.insuranceController.abi,
    address: policyAddress,
    functionName: "stakedAmountOfAddress",
    args: [props.policy.creator as Address],
  });

  return (
    <div
      ref={parent}
      className="relative flex flex-col gap-y-4 rounded-md border border-border p-3"
    >
      <div className="flex flex-col">
        <div className="flex justify-between gap-y-1">
          <div className="flex items-center gap-4">
            <img
              src={props.policy.image}
              alt="logo"
              className="h-12 w-12 rounded-md object-cover p-1"
            />
            <div>
              <h1 className="text-xl font-semibold">{props.policy.name}</h1>
              {isPaused ? (
                <p className="flex items-center gap-x-2 whitespace-nowrap text-sm tracking-wide text-red-500">
                  Policy Inactive
                  <Icon icon="info" />
                </p>
              ) : (
                <p className="flex items-center gap-x-2 whitespace-nowrap text-sm tracking-wide text-green-500">
                  Policy Active
                  <Icon icon="done" />
                </p>
              )}
            </div>
          </div>

          <div className="font-semibold">
            {isPaused && usdj.divideByDecimals(creatorStake || 0n) === 0 && (
              <button
                onClick={() =>
                  modal.show(<InitialStakeModal policy={props.policy} />)
                }
                className="whitespace-nowrap rounded-md border border-border/60 px-4 py-2 text-sm font-medium text-front transition-all hover:bg-zinc-900/60"
              >
                Set Initial Stake
              </button>
            )}

            {isPaused && usdj.divideByDecimals(creatorStake || 0n) > 0 && (
              <button
                onClick={() => modal.show(<EnablePolicyModal policy={props.policy} />)}
                className="whitespace-nowrap rounded-md border border-border/60 px-4 py-2 text-sm font-medium text-front transition-all hover:bg-zinc-900/60"
              >
                Enable Policy
              </button>
            )}

            {!isPaused && (
              <button
                onClick={() => modal.show(<DisablePolicyModal policy={props.policy} />)}
                className="whitespace-nowrap rounded-md border border-border/60 px-4 py-2 text-sm font-medium text-front transition-all hover:bg-zinc-900/60"
              >
                Disable Policy
              </button>
            )}
          </div>
        </div>

        <div className="mt-2 text-sm text-front/80">
          {`${props.policy.description.slice(0, 250)}${props.policy.description.length > 250 ? "..." : ""}`}
        </div>
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-4 mobile:gap-y-2">
        <div className="flex w-max items-center justify-between gap-x-8 rounded-2xl border border-front/10 bg-background px-4 py-1 duration-300 ease-in-out hover:bg-front hover:bg-opacity-[1%]">
          <div className="flex flex-col">
            <p className="flex items-center text-sm text-front/80">
              {props.policy.holders?.length} Policy Holders
            </p>
          </div>
        </div>
        <div className="flex w-max items-center justify-between gap-x-8 rounded-2xl border border-front/10 bg-background px-4 py-1 duration-300 ease-in-out hover:bg-slate-400 hover:bg-opacity-[1%]">
          <div className="flex flex-col">
            <p className="text-sm text-front/80">
              {usdj.divideByDecimals(totalStake || 0n)?.toString()} USDJ Staked
            </p>
          </div>
        </div>
      </div>

      <button
        className="absolute bottom-2 right-4 text-sm text-zinc-400 underline underline-offset-2"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? "View Less" : "View More"}
      </button>

      {expanded && <PolicyHolders holders={props.policy.holders} />}
    </div>
  );
}

function DisablePolicyModal({ policy }: { policy: Policy }) {
  const { writeContract, data, error: writeError } = useWriteContract();
  const [loading, setLoading] = useState<boolean>(false);
  const modal = useModal();
  const navigate = useNavigate();

  const { isLoading, isSuccess, error: recieptError } = useWaitForTransactionReceipt({
    hash: data
  })

  function handleDisable() {
    toast.info("Sign the messgae to continue");
    setLoading(true);
    try {
      writeContract({
        ...contractDefinitions.insuranceController,
        address: policy.address as Address,
        functionName: "pause",
      })
    } catch (error) {
      console.error(error);
      setLoading(false);
      toast.error("Error disabling policy");
    }
  }

  useEffect(() => {
    if (isSuccess) {
      setLoading(false);
      navigate(0);
      toast.success("Policy Disabled Successfully");
    }

    if (recieptError) {
      setLoading(false);
      const errorMsg = extractErrorFromTx(recieptError.message);
      toast.error(errorMsg);
    }

    if (writeError) {
      setLoading(false);
      const errorMsg = extractErrorFromTx(writeError.message);
      toast.error(errorMsg);
    }
  }, [isLoading, writeError])

  return (
    <div className="relative flex mobile:w-[70vw] widescreen:w-[40vw] flex-col gap-y-1 rounded-lg border border-primary/60 bg-background px-8 py-8 mobile:px-8">
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="flex animate-pulse flex-col items-center rounded-lg border border-border bg-zinc-200 p-8">
            <div className="h-7 w-7 animate-spin rounded-full border-2 border-t-0 border-primary" />
            <p className="mt-2 font-semibold text-primary">
              Processing Request
            </p>
            <p className="text-mute">Please wait..</p>
          </div>
        </div>
      )}

      <button
        className="absolute right-3 top-3 rounded-full border border-red-500 p-1 text-red-500 opacity-50 duration-300 ease-in hover:opacity-100"
        onClick={() => modal.hide()}
      >
        <Icon icon="close" className="text-[1rem] mobile:text-[1rem]" />
      </button>
      <h1 className="mb-2 text-2xl font-bold">Disable Policy</h1>
      {policy.description && (
        <div className="flex flex-col gap-y-1 text-sm text-mute">
          <div className="flex flex-col gap-y-1 text-sm text-mute">
            <p className="mt-2 rounded-md bg-red-500/10 px-2 py-1 text-red-500/80">
              Are you sure you want to disable the policy?
            </p>
            <p className="px-2 py-1">
              Disabling the policy will stop all the transactions and the policy will be inactive. You can always enable the policy later if you want to.
            </p>
          </div>
          <div className="flex gap-2 w-full justify-end">
            <button
              className={twMerge(
                "mt-3 w-max self-end rounded-lg bg-zinc-900 px-6 py-2 font-bold text-zinc-300 duration-300 ease-in hover:bg-zinc-800 hover:text-front disabled:pointer-events-none disabled:opacity-50",
              )}
              onClick={() => modal.hide()}
            >
              Cancel
            </button>

            <button
              className={twMerge(
                "mt-3 w-max self-end rounded-lg border border-primary px-6 py-2 font-bold text-secondary duration-300 ease-in hover:bg-primary hover:text-front disabled:pointer-events-none disabled:opacity-50",
                loading ? "animate-pulse" : "",
              )}

              onClick={handleDisable}
            >
              {loading ? "Processing..." : "Confirm"}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function EnablePolicyModal({ policy }: { policy: Policy }) {
  const { writeContract, data, error: writeError } = useWriteContract();
  const [loading, setLoading] = useState<boolean>(false);
  const modal = useModal();
  const navigate = useNavigate();

  const { isLoading, isSuccess, error: recieptError } = useWaitForTransactionReceipt({
    hash: data
  })

  function handleEnable() {
    toast.info("Sign the message to continue..");
    setLoading(true);
    try {
      writeContract({
        ...contractDefinitions.insuranceController,
        address: policy.address as Address,
        functionName: "unpause",
      })
    } catch (error) {
      console.error(error);
      setLoading(false);
      toast.error("Error enabling policy");
    }
  }

  useEffect(() => {
    if (isSuccess) {
      setLoading(false);
      toast.success("Policy enabled successfully..");
      navigate(0);
      modal.hide();
    }

    if (recieptError) {
      setLoading(false);
      const errorMsg = extractErrorFromTx(recieptError.message);
      toast.error(errorMsg);
    }

    if (writeError) {
      setLoading(false);
      const errorMsg = extractErrorFromTx(writeError.message);
      toast.error(errorMsg);
    }
  }, [isLoading, writeError])

  return (
    <div className="relative flex mobile:w-[70vw] widescreen:w-[40vw] flex-col gap-y-1 rounded-lg border border-primary/60 bg-background px-8 py-8 mobile:px-8">
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="flex animate-pulse flex-col items-center rounded-lg border border-border bg-zinc-200 p-8">
            <div className="h-7 w-7 animate-spin rounded-full border-2 border-t-0 border-primary" />
            <p className="mt-2 font-semibold text-primary">
              Processing Request
            </p>
            <p className="text-mute">Please wait..</p>
          </div>
        </div>
      )}

      <button
        className="absolute right-3 top-3 rounded-full border border-red-500 p-1 text-red-500 opacity-50 duration-300 ease-in hover:opacity-100"
        onClick={() => modal.hide()}
      >
        <Icon icon="close" className="text-[1rem] mobile:text-[1rem]" />
      </button>
      <h1 className="mb-2 text-2xl font-bold">Enable Policy</h1>
      {policy.description && (
        <div className="flex flex-col gap-y-1 text-sm text-mute">
          <div className="flex flex-col gap-y-1 text-sm text-mute">
            <p className="mt-2 rounded-md bg-green-500/10 px-2 py-1 text-green-500/80">
              Are you sure you want to enable the policy?
            </p>
            <p className="px-2 py-1">
              Enabling the policy will make it available for transactions and the policy will be active. You can always disable the policy later if you want to.
            </p>
          </div>
          <div className="flex gap-2 w-full justify-end">
            <button
              className={twMerge(
                "mt-3 w-max self-end rounded-lg bg-zinc-900 px-6 py-2 font-bold text-zinc-300 duration-300 ease-in hover:bg-zinc-800 hover:text-front disabled:pointer-events-none disabled:opacity-50",
              )}
              onClick={() => modal.hide()}
            >
              Cancel
            </button>

            <button
              className={twMerge(
                "mt-3 w-max self-end rounded-lg border border-primary px-6 py-2 font-bold text-secondary duration-300 ease-in hover:bg-primary hover:text-front disabled:pointer-events-none disabled:opacity-50",
                loading ? "animate-pulse" : "",
              )}

              onClick={handleEnable}
            >
              {loading ? "Processing..." : "Confirm"}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}