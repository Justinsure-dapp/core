import { ChangeEvent, useState } from "react";
import useApiResponse from "../../../hooks/useApiResponse";
import api from "../../../utils/api";
import { Link } from "react-router-dom";
import Icon from "../../../common/Icon";

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
                <div className="flex flex-col items-center gap-y-4">
                    <h2 className="font-medium text-lg">Testnet BTTC</h2>
                    <div className="bg-foreground p-8 rounded-[2rem] flex flex-col items-center gap-y-2">
                        <h3>Enter you wallet address</h3>
                        <p className="text-sm text-slate-400">
                            You can claim 0 BTTC every 3600 hours
                        </p>

                        <div className="my-4 relative">
                            {displayInvalidMessage && (
                                <span className="absolute bottom-full right-2 text-red-500 text-xs">
                                    Invalid Address
                                </span>
                            )}
                            <input
                                type="text"
                                name="address"
                                placeholder="0x..."
                                id="address"
                                className="py-1 px-3 rounded-lg bg-front/20 w-[42.8ch] text-front"
                            />
                        </div>
                        <button
                            className="bg-front/60 px-5 py-2 text-black rounded-md hover:scale-[102%] hover:-translate-y-1 hover:shadow-lg active:translate-y-1 
          active:scale-75 duration-300 disabled:opacity-50 disabled:pointer-events-none"
                        >
                            {loading ? (
                                <figure className="w-5 h-5 animate-spin border-2 border-dashed border-white rounded-full" />
                            ) : (
                                "Request"
                            )}
                        </button>
                    </div>
                </div>

                <div className="flex flex-col items-center gap-y-4">
                    <h2 className="font-medium text-lg">Swap BTTC with USDC</h2>

                    <div className="bg-foreground p-8 rounded-[2rem] flex flex-col items-center gap-y-2">
                        <h3>Enter amount to be Swapped</h3>
                        <div className="flex flex-col items-center my-4 gap-y-2">
                            <div className="flex flex-col">
                                <div className="text-sm self-end text-slate-400">
                                    Balance : {0} BTT
                                </div>
                                <div className="relative">
                                    {displayInvalidMessage && (
                                        <span className="absolute bottom-full right-2 text-red-500 text-xs">
                                            Invalid Address
                                        </span>
                                    )}
                                    <input
                                        type="text"
                                        name="address"
                                        placeholder="BTT Amount"
                                        id="address"
                                        className="py-1 px-3 rounded-lg bg-front/20 w-[42.8ch] text-front"
                                    />
                                </div>
                            </div>
                            <Icon icon="arrow_forward" className="rotate-90 bg-foreground text-[1.3rem] text-mute" />
                            <div className="flex flex-col">
                                <div className="text-sm self-end text-slate-400">
                                    Balance : {0} USDJ
                                </div>
                                <div className="relative">
                                    {displayInvalidMessage && (
                                        <span className="absolute bottom-full right-2 text-red-500 text-xs">
                                            Invalid Address
                                        </span>
                                    )}
                                    <input
                                        type="text"
                                        name="address"
                                        disabled={true}
                                        placeholder="Recieving UDSJ amount"
                                        id="address"
                                        className="py-1 px-3 rounded-lg bg-front/20 w-[42.8ch] text-black"
                                    />
                                </div>
                            </div>
                        </div>
                        <button
                            className="bg-front/60 px-5 py-2 text-black rounded-md hover:scale-[102%] hover:-translate-y-1 hover:shadow-lg active:translate-y-1 
          active:scale-75 duration-300 disabled:opacity-50 disabled:pointer-events-none"
                        >
                            {loading ? (
                                <figure className="w-5 h-5 animate-spin border-2 border-dashed border-white rounded-full" />
                            ) : (
                                "Request"
                            )}
                        </button>
                    </div>
                </div>
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
