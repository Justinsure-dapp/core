import { twMerge } from "tailwind-merge";
import DocTitle from "../../common/DocTitle";
import Heading from "../NewPolicyPage/components/Heading";
import { useEffect, useState } from "react";
import DurationInput from "../../common/DurationInput";
import DataForm from "../../common/DataForm";
import { closestTimeUnit } from "../../utils";
import { Navigate, useParams } from "react-router-dom";
import { isAddress } from "viem";
import useApiResponse from "../../hooks/useApiResponse";
import api from "../../utils/api";
import useModal from "../../hooks/useModal";
import RequestQuoteModal from "./RequestQuoteModal";

export default function BuyPolicyPage() {
  const twInputStyle =
    "text-lg rounded-md p-2 bg-background border border-border shadow shadow-mute/30";
  const [claimValue, setClaimValue] = useState<string>("");
  const [isClaimInRange, setIsClaimInRange] = useState<boolean>(true);
  const [duration, setDuration] = useState<number>(0);
  const [isDurationInRange, setIsDurationInRange] = useState<boolean>(true);
  const { address: policyAddress } = useParams<{ address: string }>();
  const modal = useModal();
  const [loading, setLoading] = useState(false);

  function checkRange(min: number, max: number, inputValue: number) {
    return inputValue >= min && inputValue <= max;
  }

  const { data: policyData } = useApiResponse(
    api.policy.getByAddress,
    policyAddress ? policyAddress : "",
  );

  useEffect(() => {
    if (
      duration &&
      policyData &&
      checkRange(
        policyData?.minimumDuration,
        policyData?.maximumDuration,
        duration,
      )
    ) {
      setIsDurationInRange(true);
    } else if (policyData) {
      checkRange(
        policyData?.minimumDuration,
        policyData?.maximumDuration,
        duration,
      );
      setIsDurationInRange(false);
    }
  }, [duration]);

  const handleFormSubmit = async (data: Record<string, string>) => {
    setLoading(true);
    try {
      if (policyData) {
        let argsArray = policyData.premiumFuncArgs.map((arg: any) => {
          return {
            arg: arg.name,
            value: data[arg.name],
          };
        });

        console.log(argsArray);

        if (!argsArray.every((arg: any) => arg.value)) {
          alert("Please fill all the fields");
          setLoading(false);
          return;
        }

        const { key } = await api.policy.calculatePremium(
          policyData.address,
          argsArray,
        );

        const intervalId = setInterval(async () => {
          const newData = await api.policy.getExecutedKey(key);

          if (newData.completed && newData.output) {
            setLoading(false);

            if (
              !isNaN(parseFloat(newData.output)) &&
              isFinite(Number(newData.output))
            ) {
              modal.show(
                <RequestQuoteModal
                  policy={policyData}
                  formData={data}
                  premium={parseFloat(newData.output)}
                />,
              );
            } else {
              alert("Invalid output type received from the policy");
            }

            clearInterval(intervalId);
          }
        }, 1000);
      }
    } catch (error) {
      console.error(error);
      alert("Error while calculating premium!");
    }
  };

  if (!policyAddress || !isAddress(policyAddress)) {
    return <Navigate to="/policies" />;
  }

  return (
    <>
      <DocTitle title="Buy Policy" />
      <div className="flex gap-x-6 p-page py-8 relative">
        {loading && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
            <div className="bg-zinc-200 animate-pulse border border-border p-8 rounded-lg flex flex-col items-center">
              <div className="w-7 h-7 border-2 border-t-0 border-primary rounded-full animate-spin" />
              <p className="text-primary mt-2 font-semibold">
                Calculating Premium
              </p>
              <p className="text-mute">Please wait...</p>
            </div>
          </div>
        )}

        <DataForm
          callback={handleFormSubmit}
          className="flex flex-col gap-y-7 flex-1 mobile:p-page"
        >
          <div className="flex flex-col basis-1/2">
            <h1 className="text-xl border-b border-front/20 pb-1">
              Premium Function
            </h1>
            <div className="flex flex-col border border-front/40 p-4 hover:bg-foreground/30 duration-300 text-secondary rounded-xl w-full max-h-[30vh] overflow-y-scroll scrollbar-primary mt-4">
              <pre className="text-xs font-mono">{policyData?.premiumFunc}</pre>
            </div>
          </div>

          <div>
            <Heading
              className=""
              tooltip="Make sure it is in range of the maximum and minimum claim issued by the marketer"
            >
              Claim value for the policy
            </Heading>
            <input
              className={twMerge(
                twInputStyle,
                "w-full",
                isClaimInRange ? "" : "border-red-500 ",
              )}
              placeholder="Claim value"
              name="claimValue"
              value={claimValue}
              onChange={(e) => {
                if (policyData) {
                  const isClaimInRange = checkRange(
                    policyData?.minimumClaim,
                    policyData?.maximumClaim,
                    parseFloat(e.currentTarget.value),
                  );
                  setClaimValue(e.target.value);
                  setIsClaimInRange(isClaimInRange);
                }
              }}
              type="number"
            />
            <p className="text-red-500">
              {!isClaimInRange &&
                `Claim value must be between ${policyData?.minimumClaim} and ${policyData?.maximumClaim}`}
            </p>
          </div>

          <div>
            <Heading
              className=""
              tooltip="Make sure it is in range of the maximum and minimum duration given by the marketer"
            >
              Duration for the policy
            </Heading>
            <DurationInput
              className={twMerge(
                "w-1/2",
                twInputStyle,
                isDurationInRange ? "" : "border-red-500",
              )}
              name="claimDuration"
              defaultValue={1000 * 60 * 60 * 24}
              setter={setDuration}
            />
            <p className="text-red-500">
              {!isDurationInRange &&
                policyData &&
                `Duration value must be between ${closestTimeUnit(
                  policyData?.minimumDuration,
                )} and ${closestTimeUnit(policyData?.maximumDuration)}`}
            </p>
          </div>

          <div className="w-full">
            <h1>Premium calculation function arguments</h1>
            <div className="mt-2 bg-secondary/5 p-4 rounded-xl flex flex-col gap-y-4">
              {policyData?.premiumFuncArgs &&
                policyData?.premiumFuncArgs.length > 0 &&
                policyData?.premiumFuncArgs.map((arg: any, key: number) => {
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
                        className={twMerge(twInputStyle, "w-full")}
                        placeholder={arg.htmlType}
                        name={arg.name}
                        required
                      />
                    </div>
                  );
                })}
            </div>
          </div>
          <button
            type="submit"
            className="bg-primary py-2 px-6 rounded-md text-back font-medium w-max"
          >
            Request Quote
          </button>
        </DataForm>

        <div className="basis-[28%] bg-foreground rounded-xl mobile:hidden"></div>
      </div>
    </>
  );
}
