import { useState } from "react";
import { Link } from "react-router-dom";
import SwapBTTtoUSDJ from "./SwapBTTtoUSDJ";
import TestnetBTT from "./TestnetBTT";

export default function Hero() {
    //   const config = useApiResponse(api.getConfiguration);

    const [displayInvalidMessage, setDisplayInvalidMessage] = useState(false);
    const [loading, setLoading] = useState(false);
    const [addr, setAddr] = useState("");

    return (
        <section className="h-screen bg-background text-white flex flex-col items-center p-20 gap-y-10 relative">
            <div className="flex text-7xl items-center">
                {/* <img src="/logo.png" className="h-[1.3em]" /> */}
                <h1 className="font-semibold">JustInsure</h1>
            </div>
            <div className="flex gap-x-8">
                <TestnetBTT />
                <SwapBTTtoUSDJ />
            </div>
            <div className="bg-yellow-200 text-yellow-900 p-2 rounded-md text-sm">
                You will receive these tokens on the{" "}
                <Link
                    to="https://testfaucet.bt.io/#/"
                    target="_blank"
                    className="underline underline-offset-2 hover:no-underline duration-150"
                >
                    BTTC Donau Testnet
                </Link>
            </div>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center text-gray-300">
                If these tokens are not needed any longer, make sure you send them back
                to 0x54e4fb4CE1388e6A67D4d7Ffb231D5E46751e4cb
            </div>
            <img
                src="/images/soparu.webp"
                alt="soparu"
                className="h-[30vh] absolute bottom-0 right-3"
            />
        </section>
    );
}
