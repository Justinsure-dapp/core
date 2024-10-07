import { twMerge } from "tailwind-merge";
import { useEffect, useState } from "react";
import { useAccount, useSignMessage } from "wagmi";
import { useNavigate } from "react-router-dom";
import useModal from "../../hooks/useModal";
import useUsdjHook from "../../hooks/useUsdj";
import { Policy } from "../../types";
import api from "../../utils/api";
import Icon from "../../common/Icon";
import Heading from "../NewPolicyPage/components/Heading";
import { toast } from "react-toastify";
import useWeb3 from "../../contexts/web3context";

export default function RequestQuoteModal({
  policy,
  premium,
  formData,
}: {
  premium: number;
  policy: Policy;
  formData: Record<string, string>;
}) {
  const modal = useModal();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    allowance,
    approve,
    decimals,
    multiplyWithDecimals,
    divideByDecimals,
  } = useUsdjHook();
  const { address: userAddress } = useAccount();
  const { signMessage, data: sign, error: signError } = useSignMessage();
  const { fetchUser } = useWeb3();

  const formattedPremium = multiplyWithDecimals(premium);

  async function handleSubmit() {
    if (!decimals || !userAddress) {
      toast.error("Something went wrong, please try again..", {
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
      return;
    }

    setLoading(true);
    try {
      if (
        allowance === BigInt(0) ||
        Number(allowance) < Number(formattedPremium)
      ) {
        await approve();
      }

      const nonce = await api.policy.requestNonce(userAddress);
      signMessage({ message: JSON.stringify({ ...formData }) + nonce });

      toast.info("Sign the message to proceed..", {
        type: "info",
        isLoading: false,
        autoClose: 2000,
      });
    } catch (error) {
      setLoading(false);
      console.error(error);
      toast.error("Something went wrong, please try again..", {
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    }
  }

  useEffect(() => {
    async function buyPolicy() {
      try {
        if (!userAddress || !sign) {
          return alert("Error while signing the message!");
        }

        const result = await api.policy.buyPolicy(
          policy.address,
          userAddress,
          formData,
          sign,
          formattedPremium.toString(),
        );
        setLoading(false);
        toast.success("Policy bought successfully..", {
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
        modal.hide();
        fetchUser();
        navigate("/account");
      } catch (error) {
        console.error(error);
        setLoading(false);
        toast.error("Error while buying policy..", {
          type: "error",
          isLoading: false,
          autoClose: 2000,
        });
      }
    }

    if (sign) {
      buyPolicy();
    }

    if (signError) {
      setLoading(false);
      toast.error("Error while signing the message..", {
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
      console.error(signError);
    }
  }, [sign, signError]);

  return (
    <div className="relative w-[80vw] max-w-[720px] flex flex-col gap-y-1 bg-background py-8 rounded-lg border border-primary/60 px-8">
      {loading && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-zinc-200 animate-pulse border border-border p-8 rounded-lg flex flex-col items-center">
            <div className="w-7 h-7 border-2 border-t-0 border-primary rounded-full animate-spin" />
            <p className="text-primary mt-2 font-semibold">
              Processing Request..
            </p>
            <p className="text-mute">Please wait...</p>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between gap-10">
        <h1 className="text-2xl font-bold">
          Buy <span className="text-secondary">{policy.name}</span>{" "}
        </h1>
        <button
          className="text-red-500 rounded-full border border-red-500 p-1"
          onClick={() => modal.hide()}
        >
          <Icon icon="close" className="text-[1.5rem] mobile:text-[1rem]" />
        </button>
      </div>
      {policy.description && (
        <p className="text-front/80 text-sm mt-2 text-justify">
          {policy.description}
        </p>
      )}
      {policy.tags && policy.tags.length > 0 && (
        <p className="mt-3 flex gap-x-1 items-center">
          <span className="font-bold text-secondary">Tags:</span>
          {policy.tags?.map((tag) => (
            <span
              key={tag}
              className="border text-zinc-200 text-sm px-2 py-1 border-border rounded-full"
            >
              {tag}
            </span>
          ))}
        </p>
      )}
      <div className="flex items-center mt-3 gap-2">
        <Heading>Calculated Premium:</Heading>
        <div className="rounded-md w-fit py-1 px-2 bg-background border border-border shadow shadow-mute/30">
          <p>{divideByDecimals(formattedPremium)} USDJ</p>
        </div>
      </div>
      <div className="flex gap-4 self-end">
        <button
          className={twMerge(
            "mt-6 text-secondary border-secondary font-bold border duration-300 ease-in w-max px-6 py-2 rounded-lg hover:bg-white/30 hover:text-front",
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
            "mt-6 text-white/70 border-white/70 font-bold border duration-300 ease-in w-max px-6 py-2 rounded-lg hover:bg-secondary hover:text-front",
            loading ? "animate-pulse" : "",
          )}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Processing..." : "Buy Policy"}
        </button>
      </div>
    </div>
  );
}
