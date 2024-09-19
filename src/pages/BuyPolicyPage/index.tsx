import { twMerge } from "tailwind-merge";
import DocTitle from "../../common/DocTitle";
import Heading from "../NewPolicyPage/components/Heading";
import { useEffect, useState } from "react";
import DurationInput from "../../common/DurationInput";
import DataForm from "../../common/DataForm";
import { closestTimeUnit } from "../../utils";
import axios from "axios";
import { Navigate, useParams } from 'react-router-dom';
import {
  useContractWrite,
} from "wagmi";
import contractDefinitions from "../../contracts";
import { isAddress } from "viem";

export default function BuyPolicyPage() {
  const twInputStyle =
    "text-lg rounded-md p-2 bg-background border border-border shadow shadow-mute/30";
  const [claimValue, setClaimValue] = useState<string>("");
  const [isClaimInRange, setIsClaimInRange] = useState<boolean>(true);
  const [insuranceDataLive, setInsuranceDataLive] = useState<any>({});
  const [duration, setDuration] = useState<number>(0);
  const [isDurationInRange, setIsDurationInRange] = useState<boolean>(true);
  const { address } = useParams<{ address: string }>();

  if (typeof address !== 'string' || !isAddress(address)) {
    return <Navigate to="/policies" />
  }

  const buyInsurance = useContractWrite({ ...contractDefinitions.insurance, address: address, functionName: "buyInsurance" });

  function checkRange(min: number, max: number, inputValue: number) {
    return inputValue >= min && inputValue <= max;
  }

  useEffect(() => {
    const fetchInsuranceData = async () => {
      try {
        // fetch data from the server
        const result = await axios.get(`http://localhost:9090/policy/get/${address}`);

        // set the data to the state
        setInsuranceDataLive(result.data?.policy);
      } catch (error) {
        console.error("Error fetching data", error);
        setInsuranceDataLive({});
      }
    }

    fetchInsuranceData();
  }
    , []);

  useEffect(() => {
    if (
      duration &&
      checkRange(
        insuranceDataLive.durationLimits?.minimum,
        insuranceDataLive.durationLimits?.maximum,
        duration
      )
    ) {
      setIsDurationInRange(true);
    } else {
      checkRange(
        insuranceDataLive.durationLimits?.minimum,
        insuranceDataLive.durationLimits?.maximum,
        duration
      );
      setIsDurationInRange(false);
    }

  }, [duration]);

  const handleFormSubmit = (data: Record<string, string>) => {
    console.log(data);
  };

  return (
    <>
      <DocTitle title="Buy Policy" />
      <div className="flex gap-x-6 p-page py-8">
        <DataForm callback={handleFormSubmit} className="flex flex-col gap-y-7 flex-1 mobile:p-page">
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
              name="Claim Value"
              value={claimValue}
              onChange={(e) => {
                const isClaimInRange = checkRange(
                  insuranceDataLive.claimLimits?.minimum,
                  insuranceDataLive.claimLimits?.maximum,
                  parseFloat(e.currentTarget.value)
                );
                setClaimValue(e.target.value);
                setIsClaimInRange(isClaimInRange);
              }}
              type="number"
            />
            <p className="text-red-500">
              {!isClaimInRange &&
                `Claim value must be between ${insuranceDataLive.claimLimits?.minimum} and ${insuranceDataLive.claimLimits?.maximum}`}
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
              name="Duration"
              defaultValue={1000 * 60 * 60 * 24}
              setter={setDuration}
            />
            <p className="text-red-500">
              {!isDurationInRange &&
                `Duration value must be between ${closestTimeUnit(
                  insuranceDataLive.durationLimits?.minimum
                )} and ${closestTimeUnit(
                  insuranceDataLive.durationLimits?.maximum
                )}`}
            </p>
          </div>

          <div className="w-full">
            <h1>Premium calculation function arguments</h1>
            <div className="mt-2 bg-secondary/5 p-4 rounded-xl flex flex-col gap-y-4">
              {insuranceDataLive.premiumCalculationFunction?.arguments.map(
                (arg: any, key: number) => (
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

        <div className="basis-[28%] bg-foreground rounded-xl mobile:hidden"></div>
      </div>
    </>
  );
}

// const insuranceData = {
//   claimLimits: { minimum: 1000, maximum: 50000 },
//   durationLimits: { minimum: 864000000, maximum: 2592000000 },
//   premiumCalculationFunction: {
//     function: "calculateAutoPremium",
//     arguments: [
//       { name: "carValue", description: "Value of the car", htmlType: "number" },
//       { name: "age", description: "Age of the driver", htmlType: "number" },
//       {
//         name: "drivingHistory",
//         description: "Driving history of the insured",
//         htmlType: "text",
//       },
//     ],
//     description: "Function to calculate premium for auto insurance",
//   },
//   intialStake: 1500,
//   tags: ["auto", "insurance", "vehicle"],
// };

const newObj = {
  "claimLimits": {
    "minimum": 1,
    "maximum": 100
  },
  "durationLimits": {
    "minimum": 172800000,
    "maximum": 518400000
  },
  "claimValidationFunction": {
    "function": "def sex(ok, no):\n   return",
    "description": "no",
    "arguments": [
      {
        "name": "ok",
        "description": "",
        "htmlType": "text",
        "_id": "66e8acf27ec72a0ac134741d"
      },
      {
        "name": "no",
        "description": "",
        "htmlType": "text",
        "_id": "66e8acf27ec72a0ac134741e"
      }
    ]
  },
  "premiumCalculationFunction": {
    "function": "def sex(ok, no):\n   return",
    "description": "ok",
    "arguments": [
      {
        "name": "ok",
        "description": "",
        "htmlType": "text",
        "_id": "66e8acf27ec72a0ac134741f"
      },
      {
        "name": "no",
        "description": "",
        "htmlType": "text",
        "_id": "66e8acf27ec72a0ac1347420"
      }
    ]
  },
  "_id": "66e8acf27ec72a0ac134741c",
  "address": "0x1AB121856693bD8Cab8Ce88AB47BC5d1c9dD2260",
  "owner": "0xAA1bfB4D4eCDbc78A6f929D829fded3710D070D0",
  "name": "iiitm",
  "description": "marr gye toh / suicide. college ki mkc",
  "category": "Terrorism",
  "intialStake": 500000000,
  "tags": [],
  "__v": 0
}