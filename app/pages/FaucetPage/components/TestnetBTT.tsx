import React, { useState } from 'react'

export default function TestnetBTT() {
    const [loading, setLoading] = useState(false)
    return (
        <div className="flex flex-col items-center gap-y-4">
            <h2 className="font-medium text-lg">Testnet BTTC</h2>
            <div className="bg-foreground p-8 rounded-[2rem] flex flex-col items-center gap-y-2">
                <h3>Enter you wallet address</h3>
                <p className="text-sm text-slate-400">
                    You can claim 0 BTTC every 3600 hours
                </p>

                <div className="my-4 relative">
                    {/* {displayInvalidMessage && (
                        <span className="absolute bottom-full right-2 text-red-500 text-xs">
                            Invalid Address
                        </span>
                    )} */}
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
    )
}
