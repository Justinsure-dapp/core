import moment from "moment";
import useUsdjHook from "../../../hooks/useUsdj";
import Heading from "../../NewPolicyPage/components/Heading";
import useModal from "../../../hooks/useModal";
import Icon from "../../../common/Icon";
import { twMerge } from "tailwind-merge";
import { useEffect, useState } from "react";
import api from "../../../utils/api";
import { useAccount, useSignMessage } from "wagmi";


type Data = {
    premiumFunctionDetails: {
        function: string;
        desc: string;
        args: object[];
    };
    policyDetails: {
        premium: number | undefined;
        status: string | undefined;
        claimExpiry: Date | undefined;
        args: object | undefined;
    };
    claimFuctionDetails: {
        function: string;
        desc: string;
        args: object[];
    };
}

export default function ClaimCalculationModal({ data }: { data: Data }) {
    const usdjHook = useUsdjHook();
    const modal = useModal();
    const [loading, setLoading] = useState(false);
    const { address: userAddress } = useAccount();
    const { signMessage, data: sign, error } = useSignMessage();

    async function signNonce() {
        setLoading(true);

        try {
            if (!data.policyDetails.args) {
                throw new Error("Policy details not found");
            } else if (!userAddress) {
                throw new Error("User address not found");
            }

            const nonce = await api.policy.requestNonce(userAddress);
            signMessage({ message: JSON.stringify(data.policyDetails.args) + nonce });
            alert("Please sign the message to continue...");
        } catch (error) {
            setLoading(false);
            console.error(error);
        }
    }

    console.log({
        sign
    })

    useEffect(() => {
        async function validateClaim() {
            if (!userAddress) {
                return alert("Connect your wallet!");
            }

            const result = await api.policy.validateClaim(data);
            console.log({ result });
            setLoading(false);
            // modal.hide();
        }

        if (sign) {
            validateClaim();
        } else if (error) {
            setLoading(false);
            alert("Error while signing the message!");
        }
    }, [sign, error]);

    return (
        <div className="bg-background p-10 border border-border rounded-xl w-[80vw] max-w-[720px] max-h-[90vh] overflow-auto scrollbar-primary" >
            <div className="flex flex-col">
                <div className="flex justify-between mb-4 w-full items-center">
                    <Heading className="text-2xl">Claim Details</Heading>
                    <button
                        className="text-red-500 rounded-full border border-red-500 p-1"
                        onClick={() => modal.hide()}
                    >
                        <Icon icon="close" />
                    </button>
                </div>
                <div className="flex mobile:flex-col widescreen:flex-row widescreen:gap-5 justify-between">
                    <div className="flex items-center gap-2">
                        <Heading>Status:</Heading>
                        <p className="text-secondary font-semibold uppercase">{data.policyDetails.status}</p>
                    </div>
                    {data.policyDetails.claimExpiry && (
                        <div className="flex items-center mt-1 gap-2">
                            <Heading>Expires:</Heading>
                            <p className="text-secondary font-semibold uppercase">{moment(data.policyDetails.claimExpiry).fromNow()}</p>
                        </div>
                    )}
                    {data.policyDetails.premium && (
                        <div className="flex items-center gap-2 mt-1">
                            <Heading>Premium Amount:</Heading>
                            <p className="text-secondary font-semibold uppercase">{usdjHook.divideByDecimals(BigInt(data.policyDetails.premium || 0n))} USDJ</p>
                        </div>
                    )}
                </div>

                {data.policyDetails.args && (
                    <div className="flex flex-col mt-2 gap-1">
                        <Heading>Premium Function Arguments:</Heading>
                        <div className="border-border border p-2 rounded-xl">
                            {Object.entries(data.policyDetails.args).map(([key, value]) => (
                                <p key={key} className="text-xs font-mono text-secondary font-semibold">{key}: {value}</p>
                            ))}
                        </div>
                    </div>
                )}

                <div className="flex flex-col mt-2 gap-1">
                    <Heading>Claim Function:</Heading>
                    <div className="border-border border p-2 rounded-xl">
                        <pre className="text-xs font-mono text-secondary font-semibold">{data.claimFuctionDetails.function}</pre>
                    </div>
                </div>

                <div className="flex flex-col mt-2 gap-1">
                    <Heading>Claim Function Arguments:</Heading>
                    <div className="mt-2 border border-border bg-secondary/5 p-4 rounded-xl flex flex-col gap-y-4">
                        {data.claimFuctionDetails.args &&
                            data.claimFuctionDetails.args.length > 0 &&
                            data.claimFuctionDetails.args.map((arg: any, key: number) => {
                                if (arg.name === "claimValue" || arg.name === "claimDuration")
                                    return null;

                                return (
                                    <div key={key} className="w-full flex flex-col gap-y-2">
                                        <div className="flex gap-x-2">
                                            <Heading className="capitalize">{arg.name}:</Heading>
                                            <p className="text-front/80">{arg.description}</p>
                                        </div>
                                        <input
                                            type={arg.htmlType}
                                            className={twMerge("text-lg rounded-md p-2 bg-background border border-border shadow shadow-mute/30", "w-full")}
                                            placeholder={arg.htmlType}
                                            name={arg.name}
                                            required
                                        />
                                    </div>
                                );
                            })}
                    </div>
                </div>

                <div className="flex gap-4 self-end">
                    <button

                        className={twMerge(
                            "mt-6 text-white/70 border-white/70 font-bold border ease-in w-max px-6 py-2 rounded-lg hover:bg-white/10 duration-75 transition-all hover:text-zinc-400",
                            loading ? "animate-pulse" : "",
                        )}
                        onClick={() => {
                            modal.hide();
                        }}
                        disabled={loading}
                    >
                        Cancel
                    </button>
                    <button
                        className={twMerge(
                            "mt-6 text-secondary border-secondary font-bold border w-max px-6 py-2 rounded-lg hover:bg-secondary/30 transition-all duration-75 hover:text-zinc-100",
                            loading ? "animate-pulse" : "",
                        )}
                        onClick={signNonce}
                        disabled={loading}
                    >
                        {loading ? "Verifying..." : "Submit"}
                    </button>
                </div>
            </div>
        </div>
    )
}