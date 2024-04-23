import { twMerge } from "tailwind-merge";
import DocTitle from "../../common/DocTitle";
import Heading from "../NewPolicyPage/components/Heading";
import { useEffect, useState } from "react";
import DurationInput from "../../common/DurationInput";
import DataForm from "../../common/DataForm";
import { closestTimeUnit } from "../../utils";

export default function BuyPolicyPage() {
  const twInputStyle =
    "text-lg rounded-md p-2 bg-background border border-border shadow shadow-mute/30";
  const [claimValue, setClaimValue] = useState<string>("");
  const [isClaimInRange, setIsClaimInRange] = useState<boolean>(true);
  const [duration, setDuration] = useState<number>(
    insuranceData.durationLimits.minimum
  );
  const [isDurationInRange, setIsDurationInRange] = useState<boolean>(true);

  function checkRange(min: number, max: number, inputValue: number) {
    return inputValue >= min && inputValue <= max;
  }

  useEffect(() => {
    if (
      duration &&
      checkRange(
        insuranceData.claimLimits.minimum,
        insuranceData.claimLimits.maximum,
        duration
      )
    ) {
      setIsDurationInRange(true);
    } else {
      console.log("first");
      console.log(
        "clain",
        checkRange(
          insuranceData.claimLimits.minimum,
          insuranceData.claimLimits.maximum,
          duration
        )
      );
      console.log(duration);
      setIsDurationInRange(false);
    }
  }, [duration]);

  return (
    <>
      <DocTitle title="Buy Policy" />
      <div className="flex gap-x-6 p-page py-8">
        <DataForm className="flex flex-col gap-y-7 flex-1">
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
                isClaimInRange ? "" : "border-red-500 "
              )}
              placeholder="Claim value"
              value={claimValue}
              onChange={(e) => {
                const isClaimInRange = checkRange(
                  insuranceData.claimLimits.minimum,
                  insuranceData.claimLimits.maximum,
                  parseFloat(e.currentTarget.value)
                );
                setClaimValue(e.target.value);
                setIsClaimInRange(isClaimInRange);
              }}
              type="number"
            />
            <p className="text-red-500">
              {!isClaimInRange &&
                `Claim value must be between ${insuranceData.claimLimits.minimum} and ${insuranceData.claimLimits.maximum}`}
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
                isDurationInRange ? "" : "border-red-500"
              )}
              name="minimumDuration"
              defaultValue="Days"
              setter={setDuration}
            />
            <p className="text-red-500">
              {!isDurationInRange &&
                `Duration value must be between ${closestTimeUnit(
                  insuranceData.durationLimits.minimum
                )} and ${closestTimeUnit(
                  insuranceData.durationLimits.maximum
                )}`}
            </p>
          </div>

          <div className="w-full">
            <h1>Premium calculation function arguments</h1>
            <div className="mt-2 bg-secondary/5 p-4 rounded-xl flex flex-col gap-y-4">
              {insuranceData.premiumCalculationFunction.arguments.map(
                (arg, key) => (
                  <div key={key} className="w-full flex flex-col gap-y-2">
                    <div className="flex gap-x-2">
                      <Heading className="capitalize">{arg.name}:</Heading>
                      <p className="text-front/80">{arg.description}</p>
                    </div>
                    <input
                      type={arg.htmlType}
                      className={twMerge(twInputStyle, "w-full")}
                      placeholder={arg.htmlType}
                    />
                  </div>
                )
              )}
            </div>
          </div>

          {/* <div className="w-full">
            <h1>Claim calculation function arguments</h1>
            <div className="mt-2 bg-secondary/5 p-4 rounded-xl flex flex-col gap-y-4">
              {insuranceData.claimCalculationFunction.arguments.map(
                (arg, key) => (
                  <div key={key} className="w-full flex flex-col gap-y-2">
                    <div className="flex gap-x-2">
                      <Heading className="capitalize">{arg.name}:</Heading>
                      <p className="text-front/80">{arg.description}</p>
                    </div>
                    <input
                      type={arg.htmlType}
                      className={twMerge(twInputStyle, "w-full")}
                      placeholder={arg.htmlType}
                    />
                  </div>
                )
              )}
            </div>
          </div> */}
          <button
            type="submit"
            className="bg-primary py-2 px-6 rounded-md text-back font-medium w-max"
          >
            Request Quote
          </button>
        </DataForm>

        <div className="basis-[28%] bg-foreground rounded-xl"></div>
      </div>
    </>
  );
}
const insuranceData = {
  claimLimits: { minimum: 1000, maximum: 50000 },
  durationLimits: { minimum: 864000000, maximum: 2592000000 },
  premiumCalculationFunction: {
    function: "calculateAutoPremium",
    arguments: [
      { name: "carValue", description: "Value of the car", htmlType: "number" },
      { name: "age", description: "Age of the driver", htmlType: "number" },
      {
        name: "drivingHistory",
        description: "Driving history of the insured",
        htmlType: "text",
      },
    ],
    description: "Function to calculate premium for auto insurance",
  },
  intialStake: 1500,
  tags: ["auto", "insurance", "vehicle"],
};
