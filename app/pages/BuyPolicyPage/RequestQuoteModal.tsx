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
    <div className="relative flex flex-col gap-y-1 bg-background w-[40vw] mobile:w-[80vw] px-8 py-8 rounded-lg border border-primary/60 mobile:px-8">
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

      <button
        className="absolute top-3 right-3 text-red-500 rounded-full border border-red-500 p-1 hover:opacity-100 opacity-50 ease-in duration-300"
        onClick={() => modal.hide()}
      >
        <Icon icon="close" className="text-[1rem] mobile:text-[1rem]" />
      </button>

      <div className="flex flex-col gap-y-1">
        <h1 className="text-2xl font-bold">
          Calculated Premium for {policy.name}
        </h1>
        <p className="text-sm text-mute">
          The premium has been calculated based on the formula provided by the
          marketer, using the parameters and duration you specified. If the
          quoted premium meets your expectations, you can proceed with
          purchasing the policy. However, if the quote is not satisfactory, feel
          free to adjust the parameters or policy duration to explore
          alternative pricing options.
        </p>
      </div>
      <div className="flex items-center mt-3 gap-2">
        <Heading>Calculated Premium:</Heading>
        <div className="rounded-md w-fit py-1 px-4 bg-background border border-border ">
          <p>{divideByDecimals(formattedPremium)} USDJ</p>
        </div>
      </div>
      <div className="flex gap-4 self-end mt-6">
        <button
          className={twMerge(
            "duration-150 ease-in w-max px-6 py-1 rounded-sm bg-red-800/80 hover:bg-red-800",
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
            "py-1 px-6 bg-primary/80 rounded-sm hover:bg-primary duration-150 ease-in",
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
