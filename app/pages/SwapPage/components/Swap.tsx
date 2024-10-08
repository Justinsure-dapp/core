import React, { useState } from "react";
import Icon from "../../../common/Icon";
import useSureCoinHook from "../../../hooks/useSurecoin";
import { useAccount, useReadContract } from "wagmi";
import contractDefinitions from "../../../contracts";
import { zeroAddress } from "viem";

export default function Swap() {
  const [isSurecoinToUsdj, setIsSurecoinToUsdj] = useState(true);
  const [amount, setAmount] = useState<string>("");
  const { address } = useAccount();

  const { data: usdjDecimals } = useReadContract({
    abi: contractDefinitions.usdj.abi,
    address: contractDefinitions.usdj.address,
    functionName: "decimals",
  });

  const { data: balanceUsdj } = useReadContract({
    address: contractDefinitions.usdj.address,
    abi: contractDefinitions.usdj.abi,
    functionName: "balanceOf",
    args: [address || zeroAddress],
  });

  const surecoin = useSureCoinHook();
  const surecoinBalance = surecoin.getUserBalance();
  const usdjBalance = Number(balanceUsdj) / Math.pow(10, Number(usdjDecimals));
  const swapRate = 20;

  const balance = isSurecoinToUsdj ? surecoinBalance : usdjBalance;

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    if (!isNaN(Number(input))) {
      setAmount(input);
    }
  };

  // Calculate equivalent amount
  const calculatedAmount = isSurecoinToUsdj
    ? (Number(amount) * swapRate).toFixed(2)
    : (Number(amount) / swapRate).toFixed(2);

  // Toggle swap direction
  const toggleDirection = () => {
    setIsSurecoinToUsdj(!isSurecoinToUsdj);
    setAmount("");
  };

  return (
    <div className="relative h-max rounded-lg border border-border p-4 shadow-md">
      {/* Sell section */}
      <div className="mt-2 rounded-md border border-border p-3">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-sm">Sell</p>
          <p className="text-xs">
            Max: {balance.toFixed(2)} {isSurecoinToUsdj ? "Surecoin" : "USDJ"}
          </p>
        </div>
        <div className="flex items-center">
          <input
            type="text"
            value={amount}
            onChange={handleAmountChange}
            placeholder="0.00"
            className="w-full border-none bg-transparent text-right text-2xl text-white focus:outline-none"
          />
          <span className="ml-2 text-sm">
            {isSurecoinToUsdj ? "Surecoin" : "USDJ"}
          </span>
        </div>
      </div>

      {/* Swap toggle */}
      <div className="text-center">
        <button
          onClick={toggleDirection}
          className="rounded-full bg-transparent p-2 text-xl text-white duration-300 hover:bg-primary/20"
        >
          <Icon icon="arrow_forward" className="rotate-90" />
        </button>
      </div>

      {/* Buy section */}
      <div className="rounded-md border border-border p-2">
        <div className="mb-2 flex items-center justify-between">
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
            value={calculatedAmount}
            disabled
            className="w-full border-none bg-transparent text-right text-2xl text-white focus:outline-none"
          />
          <span className="ml-2 text-sm">
            {isSurecoinToUsdj ? "USDJ" : "Surecoin"}
          </span>
        </div>
      </div>

      {/* Buy button */}
      <button className="mt-4 w-full rounded-md bg-primary/80 py-2 text-center font-bold duration-100 ease-in hover:bg-primary">
        Swap
      </button>
    </div>
  );
}
