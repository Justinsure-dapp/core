import React, { useEffect, useState } from "react";
import useModal from "../../../hooks/useModal";
import Icon from "../../Icon";
import { twMerge } from "tailwind-merge";
import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import contractDefinitions from "../../../contracts";
import useSureCoinHook from "../../../hooks/useSurecoin";
import { toast } from "react-toastify";

export default function WithdrawSurecoinModal() {
  const modal = useModal();
  const { address } = useAccount();
  const [loading, setLoading] = useState(false);
  const { data: hash, writeContractAsync } = useWriteContract();
  const surecoin = useSureCoinHook();
  const earned = surecoin.getUserEarned();

  const receipt = useWaitForTransactionReceipt({ hash });

  const handleClaim = async () => {
    if (!earned || earned <= 0) {
      toast.error("No rewards to claim.", { autoClose: 2000 });
      return;
    }

    setLoading(true);
    const claimToast = toast("Processing claim...", {
      type: "info",
      isLoading: true,
    });

    try {
      await writeContractAsync({
        ...contractDefinitions.surecoin,
        functionName: "claimRewards",
      });

      toast.update(claimToast, {
        render: "Transaction submitted!",
        type: "info",
        isLoading: false,
        autoClose: 2000,
      });
    } catch (error) {
      console.error(error);
      toast.update(claimToast, {
        render: "Transaction failed.",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (receipt.isSuccess) {
      toast.success("Rewards claimed successfully!", { autoClose: 2000 });
      modal.hide();
    }
    if (receipt.isError) {
      toast.error("Transaction failed.", { autoClose: 2000 });
    }
  }, [receipt.isSuccess, receipt.isError]);

  return (
    <div className="relative flex flex-col gap-y-1 bg-background w-[40vw] mobile:w-[80vw] px-8 py-8 rounded-lg border border-primary/60 mobile:px-8">
      {loading && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
          <div className="bg-zinc-200 animate-pulse border border-border p-8 rounded-lg flex flex-col items-center">
            <div className="w-7 h-7 border-2 border-t-0 border-primary rounded-full animate-spin" />
            <p className="text-primary mt-2 font-semibold">
              Processing Request
            </p>
            <p className="text-mute">Please wait..</p>
          </div>
        </div>
      )}
      <button
        className="absolute top-3 right-3 text-red-500 rounded-full border border-red-500 p-1 hover:opacity-100 opacity-50 ease-in duration-300"
        onClick={() => modal.hide()}
      >
        <Icon icon="close" className="text-[1rem] mobile:text-[1rem]" />
      </button>
      <h1 className="text-lg">
        Do you want to claim your Surecoins to your wallet?
      </h1>
      <p className="text-front/60 text-sm">
        By following this process, you will be able to securely store Surecoins
        in your wallet, where they will remain stable. These Surecoins will be
        available for trade in exchange for USDJ at any time.{" "}
      </p>
      <div className="text-md justify-end gap-x-4 flex mt-4">
        <button
          onClick={() => modal.hide()}
          className="bg-front/80 text-back py-1 px-4 rounded-sm"
        >
          Cancel
        </button>
        <button
          className={twMerge(
            " bg-green-800  duration-300 disabled:opacity-50 disabled:pointer-events-none ease-in w-max px-6 py-1  self-end rounded-sm ",
            loading ? "animate-pulse" : "",
          )}
          onClick={handleClaim}
          disabled={loading}
        >
          {loading ? "Claiming..." : "Claim"}
        </button>
      </div>
    </div>
  );
}
