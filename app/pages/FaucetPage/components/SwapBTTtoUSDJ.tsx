import React, { useEffect, useState } from 'react'
import Icon from '../../../common/Icon'
import { useAccount, useBalance, useContractRead } from 'wagmi'
import contractDefinitions from '../../../contracts'

export default function SwapBTTtoUSDJ() {

    const [loading, setLoading] = useState(false)
    const [decimal, setDecimal] = useState(0);

    const { address = "0x" } = useAccount()

    const { data: usdjDecimals } = useContractRead({
        address: contractDefinitions.usdj.adddress,
        abi: contractDefinitions.usdj.abi,
        functionName: "decimals",
    });

    useEffect(() => {
        if (usdjDecimals) {
            setDecimal(Number(usdjDecimals));
        }
    }, [usdjDecimals]);

    const { data: balanceUsdj } = useContractRead({
        address: contractDefinitions.usdj.adddress,
        abi: contractDefinitions.usdj.abi,
        functionName: 'balanceOf',
        args: [address],
    })

    // const balance = useBalance()


    return (
        <div className="flex flex-col items-center gap-y-4">
            <div className="bg-foreground p-8 rounded-[2rem] flex flex-col items-center gap-y-2">
                <h3>Enter amount to be Swapped</h3>
                <div className="flex flex-col items-center my-4 gap-y-2">
                    <div className="flex flex-col">
                        <div className="text-sm self-end text-slate-400">
                            Balance : {0} BTT
                        </div>
                        <div className="relative">
                            {/* {displayInvalidMessage && (
                                <span className="absolute bottom-full right-2 text-red-500 text-xs">
                                    Invalid Address
                                </span>
                            )} */}
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
                            Balance : {Number(balanceUsdj) / Math.pow(10, Number(usdjDecimals))} USDJ
                        </div>
                        <div className="relative">
                            {/* {displayInvalidMessage && (
                                <span className="absolute bottom-full right-2 text-red-500 text-xs">
                                    Invalid Address
                                </span>
                            )} */}
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
    )
}
