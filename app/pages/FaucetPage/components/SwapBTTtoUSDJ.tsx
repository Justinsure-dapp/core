import React, { useEffect, useRef, useState } from "react";
import Icon from "../../../common/Icon";
import { useAccount, useBalance, useReadContract, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import contractDefinitions from "../../../contracts";
import { zeroAddress } from "viem";
import { twMerge } from "tailwind-merge";

export default function SwapBTTtoUSDJ() {
  const [loading, setLoading] = useState(false);
  const [sufficient, setSufficient] = useState(false)
  const { address } = useAccount();
  const [amountIn, setAmountIn] = useState(0);

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

  const balanceBTT = useBalance({ address: address })

  const ratioConsideration = BigInt(100_000_000 * Math.pow(10, 18));
  const { data: amountOut } = useReadContract({
    ...contractDefinitions.usdj,
    functionName: "amountOut",
    args: [ratioConsideration],
  });

  const ratio = Number(amountOut || 0n) / Number(ratioConsideration);

  useEffect(() => {
    if (amountIn > (Number(balanceBTT.data?.value) / Math.pow(10, Number(balanceBTT.data?.decimals)))) {
      setSufficient(false)
    }
    else {
      setSufficient(true)
    }
  }, [amountIn])

  
  const { data: txHash, writeContractAsync } = useWriteContract();
  
  async function handleSwap() {
    if (amountIn === 0) {
      alert("Please enter a valid amount to swap");
      return;
    }
  
    setLoading(true);
  
    if (sufficient) {
      try {
        const txHash = await writeContractAsync({
          ...contractDefinitions.usdj,
          functionName: "mint",
          value: BigInt(amountIn * Math.pow(10, 18))
        });

          alert("Swap Successful!");
      } catch (error) {
        console.error(error);
        alert("Error while swapping!");
      } finally {
        setLoading(false);
      }
    } else {
      alert("Insufficient Balance");
      setLoading(false);
    }
  }
  


  return (
    <div className="flex flex-col items-center gap-y-4">
      <div className="bg-foreground p-8 rounded-[2rem] flex flex-col items-center gap-y-2">
        <h3>Enter amount to be Swapped</h3>
        <div className="flex flex-col items-center my-4 gap-y-2">
          <div className="flex flex-col">
            <div className="text-sm self-end text-slate-400">
              Balance :{" "}
              {(
                Number(balanceBTT.data?.value) /
                Math.pow(10, Number(balanceBTT.data?.decimals))
              ).toString()}{" "}
              BTT
            </div>
            <div className="relative">
              <input
                type="number"
                placeholder="BTT Amount"
                onChange={(e) => setAmountIn(Number(e.target.value))}
                defaultValue={0}
                min={0}
                className="py-1 px-3 rounded-lg bg-front/20 w-[42.8ch] text-front"
              />
            </div>
          </div>
          <Icon
            icon="arrow_forward"
            className="rotate-90 bg-foreground text-[1.3rem] text-mute translate-y-2"
          />
          <div className="flex flex-col">
            <div className="text-sm self-end text-slate-400">
              Balance :{" "}
              {usdjDecimals
                ? Number(balanceUsdj) / Math.pow(10, Number(usdjDecimals))
                : "0"}{" "}
              USDJ
            </div>
            <div className="relative">
              {/* {displayInvalidMessage && (
                                <span className="absolute bottom-full right-2 text-red-500 text-xs">
                                    Invalid Address
                                </span>
                            )} */}
              <input
                type="number"
                name="address"
                disabled={true}
                placeholder="Recieving UDSJ amount"
                id="address"
                value={amountIn / 100}
                className="py-1 px-3 rounded-lg bg-front/20 w-[42.8ch] text-black"
              />
            </div>
          </div>
        </div>
        <button
          onClick={() => (handleSwap())}
          disabled={!sufficient || loading}
          className={twMerge("px-5 py-2 text-black rounded-md active:translate-y-1 disabled:cursor-not-allowed active:scale-90 duration-300 disabled:pointer-events-none w-[15vw]", sufficient ? 'hover:scale-[102%] hover:-translate-y-1 hover:shadow-lg bg-front/80' : 'bg-front/60 ', loading ? "animate-pulse" : "")}
        >
          {loading ? (
            <figure className="w-5 h-5 animate-spin border-2 border-dashed border-white rounded-full" />
          ) : (
            sufficient ?
              "Swap" : "Insufficient Balance"
          )}
        </button>
      </div>
    </div>
  );
}
