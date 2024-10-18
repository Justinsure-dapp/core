import { Policy } from "../../../types";
import { useEffect, useState } from "react";
import useModal from "../../../hooks/useModal";
import { twMerge } from "tailwind-merge";
import Icon from "../../../common/Icon";
import Heading from "../../NewPolicyPage/components/Heading";
import ToastsInput from "../../../common/ToastsInput";
import ClipboardWrapper from "../../../common/ClipboardWrapper";
import { formatEvmAddress } from "../../../utils";
import { useAccount, useSignMessage } from "wagmi";
import api from "../../../utils/api";
import { toast } from "react-toastify";

export default function EditPolicyComponent({ policy }: { policy: Policy }) {
    const twInputStyle = "text-lg rounded-md p-2 bg-background border border-border shadow shadow-mute/30";
    const [loading, setLoading] = useState<boolean>(false);
    const modal = useModal();
    const [logo, setLogo] = useState<string>(policy.image || "");
    const [tags, setTags] = useState<string[]>(policy.tags || []);
    const { signMessage, data: sign, error } = useSignMessage();
    const { address } = useAccount();

    const data = {
        image: logo,
        tags,
    }

    async function handleSubmit() {
        if(address !== policy.creator) {
            toast.error("You are not the creator of this policy");
            return;
        }
        
        setLoading(true);
        try {
            const nonce = await api.policy.requestNonce(address as string);
            signMessage({
                message: `${JSON.stringify(data)}${nonce}`,
            });

            toast.info("Sign the message to continue...");
        } catch (error) {
            setLoading(false);
            console.error(error);
            toast.error("An error occured, please try again");
        }
    }

    useEffect(() => {
        async function updatePolicy() {
            try {
                const result = await api.policy.updatePolicy(policy.address, sign as string, data);
                console.log(result);
                toast.success("Policy updated successfully");
                modal.hide();
            } catch (error) {
                console.error(error);
                toast.error("An error occured, please try again");
            }
        }

        if (error) {
            toast.error(error.message);
            setLoading(false);
        }

        if (sign) {
            updatePolicy();
        }
    }, [sign, error]);

    return (
        <div className="relative flex mobile:w-[70vw] max-h-[90vh] overflow-auto scrollbar-primary widescreen:w-[50vw] flex-col gap-y-1 rounded-lg border border-primary/60 bg-background px-8 py-8 mobile:px-8">
            {loading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
                    <div className="flex animate-pulse flex-col items-center rounded-lg border border-border bg-zinc-200 p-8">
                        <div className="h-7 w-7 animate-spin rounded-full border-2 border-t-0 border-primary" />
                        <p className="mt-2 font-semibold text-primary">
                            Processing Request
                        </p>
                        <p className="text-mute">Please wait..</p>
                    </div>
                </div>
            )}

            <button
                className="absolute right-3 top-3 rounded-full border border-red-500 p-1 text-red-500 opacity-50 duration-300 ease-in hover:opacity-100"
                onClick={() => modal.hide()}
            >
                <Icon icon="close" className="text-[1rem] mobile:text-[1rem]" />
            </button>
            <div>
                <h1 className="text-2xl font-bold">Edit Policy</h1>
                <div className="mt-1 flex flex-col text-sm text-mute">
                    <span className="flex gap-1 items-center">
                        Address:{" "}
                        <ClipboardWrapper
                            textToBeCopied={policy.address}
                            className="text-xs text-mute"
                        >
                            <p className="flex items-center gap-x-1">
                                {formatEvmAddress(policy.address)}
                                <Icon icon="contentCopy" />
                            </p>
                        </ClipboardWrapper>
                    </span>
                    <span>Created: {new Date(policy.createdAt).toDateString()}</span>
                </div>
            </div>

            <div className="flex flex-col-reverse sm:flex-row mt-2 justify-between gap-5 w-full">
                <div className="w-full">
                    <div className="relative flex flex-col">
                        <Heading className="">Policy Logo</Heading>
                        <input
                            type="url"
                            name="image"
                            className="mt-2 rounded-lg border border-front/20 bg-background px-3 py-3 focus-within:outline-none"
                            placeholder="Provide logo url"
                            defaultValue={logo}
                            onChange={(e) => setLogo(e.target.value)}
                        />
                    </div>

                    <div className="mt-4 flex flex-col">
                        <Heading>Tags</Heading>
                        <ToastsInput
                            setter={setTags}
                            defaultValues={tags}
                            className={twMerge("mb-3 mt-2 text-sm", twInputStyle)}
                        />
                    </div>
                </div>

                <div
                    className={twMerge(
                        "flex aspect-square items-center justify-center rounded-xl border border-border bg-secondary/20 my-3 sm:max-w-[10rem]",
                        !logo && "animate-pulse",
                    )}
                >
                    <img
                        src={logo}
                        onError={(e) => {
                            e.currentTarget.src = "";
                            setLogo(e.currentTarget.src);
                        }}
                        draggable={false}
                        className="h-full rounded-xl object-cover"
                    />
                </div>
            </div>

            <div className="flex text-sm gap-2 w-full justify-end">
                <button
                    className={twMerge(
                        "mt-3 w-max self-end rounded-lg bg-zinc-900 px-6 py-2 font-bold text-zinc-300 duration-300 ease-in hover:bg-zinc-800 hover:text-front disabled:pointer-events-none disabled:opacity-50",
                    )}
                    onClick={() => modal.hide()}
                >
                    Cancel
                </button>

                <button
                    className={twMerge(
                        "mt-3 w-max self-end rounded-lg border border-primary px-6 py-2 font-bold text-secondary duration-300 ease-in hover:bg-primary hover:text-front disabled:pointer-events-none disabled:opacity-50",
                        loading ? "animate-pulse" : "",
                    )}

                    onClick={handleSubmit}
                >
                    {loading ? "Processing..." : "Submit"}
                </button>
            </div>
        </div>
    )
}