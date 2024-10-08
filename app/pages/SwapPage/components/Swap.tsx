import React, { useEffect, useState } from "react";
import Icon from "../../../common/Icon";
import useSureCoinHook from "../../../hooks/useSurecoin";
import { useAccount, useReadContract, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import contractDefinitions from "../../../contracts";
import { isAddress, zeroAddress } from "viem";
import { toast } from "react-toastify";
import useUsdjHook from "../../../hooks/useUsdj";
import { extractErrorFromTx } from "../../../utils";

export default function Swap() {
  const usdj = useUsdjHook();
  const surecoin = useSureCoinHook();
  const { address: userAddress } = useAccount();
  const [amount, setAmount] = useState<string>("");
  const [isSurecoinToUsdj, setIsSurecoinToUsdj] = useState(true);
  const surecoinBalance = surecoin.getUserBalance();
  const usdjBalance = usdj.getUserBalance();
  const balance = isSurecoinToUsdj ? surecoinBalance : usdjBalance;
  const [slippage, setSlippage] = useState<number>(0.5);
  const [status, setStatus] = useState<{
    isApproving: boolean;
    isSwapping: boolean;
  }>({
    isApproving: false,
    isSwapping: false,
  });

  // APPROVAL LOGIC
  const { data: txHash, error: txError, writeContract } = useWriteContract();
  const { error: receiptError, isSuccess: receiptSuccess } = useWaitForTransactionReceipt({
    confirmations: 2,
    hash: txHash,
    onReplaced: () => {
      toast.info("Transaction replaced");
    }
  });

  function ensureApproval() {
    setStatus({ ...status, isApproving: true });
    try {
      if (isSurecoinToUsdj) {
        // Selling SURE - Approve SURE
        if (Number(surecoin.allowance) < BigInt(amount)) {
          writeContract({
            ...contractDefinitions.surecoin,
            functionName: "approve",
            args: [contractDefinitions.surecoin.address, BigInt(amount)],
          })
        }
      } else {
        // Buying SURE - Approve USDJ
        if (Number(usdj.allowance) < BigInt(amount)) {
          writeContract({
            ...contractDefinitions.usdj,
            functionName: "approve",
            args: [contractDefinitions.surecoin.address, BigInt(amount)],
          })
        }
      }
    } catch (error) {
      setStatus({ ...status, isApproving: false });
      toast.error("Something went wrong..");
      console.error(error);
    }
  }

  // SWAP LOGIC
  const { data: liquidity, refetch: refetchLiquidity } = useReadContract({
    address: contractDefinitions.surecoin.address,
    abi: contractDefinitions.surecoin.abi,
    functionName: "liquidity",
  });

  const { data: reserve, refetch: refetchReserve } = useReadContract({
    address: contractDefinitions.surecoin.address,
    abi: contractDefinitions.surecoin.abi,
    functionName: "reserve",
  });

  const amountWithDecimals = Number(amount) * Math.pow(10, surecoin.decimals || 6);
  let calculatedAmount = 0;

  if (isSurecoinToUsdj) {
    calculatedAmount = (amountWithDecimals * Number(liquidity)) / (Number(reserve) + amountWithDecimals);
  } else {
    calculatedAmount = (amountWithDecimals * Number(reserve)) / (Number(liquidity) + amountWithDecimals);
  }

  function swap() {
    setStatus({ ...status, isSwapping: true });

    try {
      // Swap
      if (isSurecoinToUsdj) {
        // Sell SURE
        const Amount = Number(amount) * Math.pow(10, surecoin.decimals || 6);
        const AmountOutMin = calculatedAmount - (calculatedAmount * slippage) / 100;

        if (Amount === 0 || isNaN(Amount)) {
          toast.error("Invalid amount");
          return;
        } else if (Amount > surecoin.multiplyWithDecimals(BigInt(surecoinBalance))) {
          toast.error("Insufficient SURE balance");
          return;
        } else if (!userAddress) return toast.error("Please connect your wallet");

        // Transaction to sell SURE
        writeContract({
          ...contractDefinitions.surecoin,
          functionName: "sell",
          args: [BigInt(Amount), BigInt(AmountOutMin)],
        });
      } else {
        // Buy SURE
        const Amount = Math.round(Number(amount) * Math.pow(10, usdj.decimals || 6));
        const AmountOutMin = Math.round(calculatedAmount - (calculatedAmount * slippage) / 100);

        if (Amount === 0 || isNaN(Number(amount))) {
          toast.error("Invalid amount");
          return;
        } else if (Amount > usdj.multiplyWithDecimals(Amount)) {
          toast.error("Insufficient USDJ balance");
          return;
        } else if (!userAddress) return toast.error("Please connect your wallet");

        // Transaction to buy SURE
        writeContract({
          ...contractDefinitions.surecoin,
          functionName: "buy",
          args: [BigInt(Amount), BigInt(AmountOutMin)],
        });
      }
    } catch (error) {
      setStatus({ ...status, isSwapping: false });
      toast.error("Something went wrong..");
      console.error(error);
    }
  }

  useEffect(() => {
    if (status.isApproving && receiptSuccess) {
      setStatus({ ...status, isApproving: false });
      swap();
    } else if (status.isApproving && receiptError) {
      setStatus({ ...status, isApproving: false });
      toast.error(extractErrorFromTx(receiptError.message));
    }

    if (status.isSwapping && receiptSuccess) {
      setStatus({ ...status, isSwapping: false });
      toast.success("Swap successful");
      refetchLiquidity();
      refetchReserve();
    } else if (status.isSwapping && receiptError) {
      setStatus({ ...status, isSwapping: false });
      toast.error(extractErrorFromTx(receiptError.message));
    }
  }, [status]);

  return (
    <div className="h-max p-4 border border-border rounded-lg shadow-md relative">
      <div className="flex text-sm items-center justify-end gap-1">
        <p>Slippage:</p>
        <input
          type="text"
          name="slippage"
          value={slippage}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (!isNaN(Number(e.target.value))) {
              setSlippage(Number(e.target.value));
            }
          }}
          className="w-16 text-center bg-transparent text-white focus:outline-none border border-border rounded-md p-2"
        />
      </div>

      {/* Sell section */}
      <div className="p-3 mt-4 border border-border rounded-md">
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm">Sell</p>
          <p className="text-xs">
            Max: {balance.toFixed(2)} {isSurecoinToUsdj ? "Surecoin" : "USDJ"}
          </p>
        </div>
        <div className="flex items-center">
          <input
            type="text"
            name="amount"
            value={amount}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (!isNaN(Number(e.target.value))) {
                setAmount(e.target.value);
              }
            }}
            placeholder="0.00"
            className="w-full text-right bg-transparent text-white border-none focus:outline-none text-2xl"
          />
          <span className="ml-2 text-sm">
            {isSurecoinToUsdj ? "Surecoin" : "USDJ"}
          </span>
        </div>
      </div>

      {/* Swap toggle */}
      <div className="text-center">
        <button
          onClick={() => {
            setIsSurecoinToUsdj(!isSurecoinToUsdj);
            setAmount("");
          }}
          className="text-white text-xl p-2 hover:bg-primary/20 duration-300 rounded-full bg-transparent"
        >
          <Icon icon="arrow_forward" className="rotate-90" />
        </button>
      </div>

      {/* Buy section */}
      <div className="p-2 border border-border rounded-md">
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm">Buy</p>
          <p className="text-xs">
            Balance:{" "}
            {(isSurecoinToUsdj ? usdjBalance : surecoinBalance).toFixed(2)}{" "}
            {isSurecoinToUsdj ? "USDJ" : "Surecoin"}
          </p>
        </div>
        <div className="flex items-center">
          <input
            type="text"
            name="calculatedAmount"
            value={isSurecoinToUsdj ? usdj.divideByDecimals(calculatedAmount).toFixed(6) : surecoin.divideByDecimals(calculatedAmount).toFixed(6)}
            disabled
            className="w-full text-right bg-transparent text-white border-none focus:outline-none text-2xl"
          />
          <span className="ml-2 text-sm">
            {isSurecoinToUsdj ? "USDJ" : "Surecoin"}
          </span>
        </div>
      </div>

      {/* Buy button */}
      <button className="w-full py-2 bg-primary/80 hover:bg-primary duration-100 ease-in rounded-md text-center font-bold mt-4"
        onClick={ensureApproval}>
        Swap
      </button>
    </div>
  );
}
