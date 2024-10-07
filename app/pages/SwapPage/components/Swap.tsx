import React, { useState } from 'react';
import Icon from '../../../common/Icon';
import useSureCoinHook from '../../../hooks/useSurecoin';
import { useAccount, useReadContract } from 'wagmi';
import contractDefinitions from '../../../contracts';
import { zeroAddress } from 'viem';

export default function Swap() {
    const [isSurecoinToUsdj, setIsSurecoinToUsdj] = useState(true);
    const [amount, setAmount] = useState<string>('');
    const { address } = useAccount()


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
    const usdjBalance = Number(balanceUsdj) / Math.pow(10, Number(usdjDecimals))
    const swapRate = 20

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
        setAmount('');
    };

    return (
        <div className="w-1/3 h-max p-2 border border-border rounded-lg shadow-md relative">
            <h2 className="font-semibold mb-2 text-front/80">{`You are ${isSurecoinToUsdj ? 'buying USDJ for Surecoin' : 'buying Surecoin for USDJ'}`}</h2>
            {/* Sell section */}
            <div className="p-3 border border-border rounded-md">
                <div className="flex justify-between items-center mb-2">
                    <p className="text-sm">Sell</p>
                    <p className="text-xs">Max: {balance.toFixed(2)} {isSurecoinToUsdj ? 'Surecoin' : 'USDJ'}</p>
                </div>
                <div className="flex items-center">
                    <input
                        type="text"
                        value={amount}
                        onChange={handleAmountChange}
                        placeholder="0.00"
                        className="w-full text-right bg-transparent text-white border-none focus:outline-none text-2xl"
                    />
                    <span className="ml-2 text-sm">{isSurecoinToUsdj ? 'Surecoin' : 'USDJ'}</span>
                </div>
            </div>

            {/* Swap toggle */}
            <div className="text-center">
                <button
                    onClick={toggleDirection}
                    className="text-white text-xl p-2 hover:bg-primary/20 duration-300 rounded-full bg-transparent"
                >
                    <Icon icon='arrow_forward' className='rotate-90' />
                </button>
            </div>

            {/* Buy section */}
            <div className="p-2 border border-border rounded-md">
                <div className="flex justify-between items-center mb-2">
                    <p className="text-sm">Buy</p>
                    <p className="text-xs">Balance: {(isSurecoinToUsdj ? usdjBalance : surecoinBalance).toFixed(2)} {isSurecoinToUsdj ? 'USDJ' : 'Surecoin'}</p>
                </div>
                <div className="flex items-center">
                    <input
                        type="text"
                        value={calculatedAmount}
                        disabled
                        className="w-full text-right bg-transparent text-white border-none focus:outline-none text-2xl"
                    />
                    <span className="ml-2 text-sm">{isSurecoinToUsdj ? 'USDJ' : 'Surecoin'}</span>
                </div>
            </div>

            {/* Buy button */}
            <button className="w-full py-2 bg-green-600/50 hover:bg-green-500/60 duration-300 ease-in rounded-md text-center font-bold mt-4">
                Buy
            </button>
        </div>
    );
};