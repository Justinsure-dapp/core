import { useState } from "react";
import { Link } from "react-router-dom";
import SwapBTTtoUSDJ from "./SwapBTTtoUSDJ";
import TestnetBTT from "./TestnetBTT";
import { twMerge } from "tailwind-merge";

export default function Hero() {
  const [showSwap, setShowSwap] = useState(false);

  return (
    <section className="bg-background text-white flex flex-col items-center py-16 gap-y-10 relative">
      <div className="flex flex-col w-full px-16 gap-y-16">
        <div className="self-end">
          <button
            className={twMerge(
              "border py-2 px-4",
              !showSwap
                ? "bg-front/90 text-black"
                : "hover:bg-front/10 duration-150",
            )}
            onClick={() => setShowSwap(false)}
          >
            BTT Faucet
          </button>
          <button
            className={twMerge(
              "border py-2 px-4",
              showSwap
                ? "bg-front/90 text-black"
                : "hover:bg-front/10 duration-150",
            )}
            onClick={() => setShowSwap(true)}
          >
            Swap BTT to USDJ
          </button>
        </div>
        {showSwap ? (
          <SwapBTTtoUSDJ />
        ) : (
          <div className="flex flex-col gap-y-10 items-center">
            <TestnetBTT />
            <div className="bg-yellow-200 text-yellow-900 p-2 rounded-md text-sm w-max">
              You will receive these tokens on the{" "}
              <Link
                to="https://testfaucet.bt.io/#/"
                target="_blank"
                className="underline underline-offset-2 hover:no-underline duration-150"
              >
                BTTC Donau Testnet
              </Link>
            </div>
          </div>
        )}
      </div>

      <div className="mt-28 w-[60%] text-center text-gray-300">
        Here is a gift from Sopparu, A Faucet for BTTC and USDJ, made just for
        you. So that you don't have to roam around looking for testnet tokens.
      </div>
      <img
        src="/images/soparu.webp"
        alt="soparu"
        className="h-[30vh] absolute bottom-0 right-3"
      />
    </section>
  );
}
