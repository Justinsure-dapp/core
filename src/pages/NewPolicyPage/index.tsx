import React, { useEffect, useReducer, useRef, useState } from "react";
import DocTitle from "../../common/DocTitle";
import Heading from "./components/Heading";
import useModal from "../../hooks/useModal";
import TexteditorModal from "./components/TexteditorModal";
import ArgsTypeDefine, { Args } from "./components/ArgsTypeDefine";
import insuranceCategories from "../../assets/data/insuranceCategories";
import { twMerge } from "tailwind-merge";
import ToastsInput from "../../common/ToastsInput";
import DurationInput from "../../common/DurationInput";
import DataForm from "../../common/DataForm";
import api from "../../utils/api";
import { AbiCoder, FunctionFragment, ethers, keccak256 } from "ethers";
import {
  useAccount,
  useSignMessage,
  useContractRead,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import contractDefinitions from "../../contracts";
import { usdtDecimals } from "../../contracts/usdj";
import { useNavigate } from "react-router-dom";
import Icon from "../../common/Icon";
import { useAutoAnimate } from '@formkit/auto-animate/react'

export default function NewPolicyPage() {
  const twInputStyle =
    "text-lg rounded-md p-2 bg-background border border-border shadow shadow-mute/30";

  const modal = useModal();

  const { address } = useAccount();
  const [parent] = useAutoAnimate();

  const [premiumFunc, setPremiumFunc] = useState("");
  const [premiumFuncArgs, setPremiumFuncArgs] = useState<Array<string>>([]);
  const [claimFunc, setClaimFunc] = useState("");
  const [claimFuncArgs, setClaimFuncArgs] = useState<Array<string>>([]);
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [premiumFuncArgsSetter, setPremiumFuncArgsSetter] = useState<Args>([]);
  const [claimFuncArgsSetter, setclaimFuncArgsSetter] = useState<Args>([]);
  const [manualPremiumCheck, setManualPremiumCheck] = useState(false);
  const [manualClaimCheck, setManualClaimCheck] = useState(false);
  const { signMessage, data: nonceData, isLoading: nonceLoading, isSuccess: nonceSuccess, isError: nonceError } = useSignMessage();

  const [loading, setLoading] = useState(false);

  const newPolicyOnSurity = useContractWrite({
    ...contractDefinitions.surity,
    functionName: "deployNewScheme",
  });
  const approveTransfer = useContractWrite({
    ...contractDefinitions.usdt,
    functionName: "approve",
  });

  const latestPolicy = useContractRead({
    ...contractDefinitions.surity,
    functionName: "getLatestScheme",
  });

  const abiEncoder = new ethers.AbiCoder();
  const navigate = useNavigate();

  const [newPolicyArgs, setNewPolicyArgs] = useState<[bigint, `0x${string}`]>();
  const [reqData, setReq] = useState<any>({});

  useWaitForTransaction({
    hash: approveTransfer.data?.hash,
    onSettled() {
      newPolicyArgs && newPolicyOnSurity.write({ args: newPolicyArgs });
    },
  });

  const [formData, setFormData] = useState<any>({})

  useEffect(() => {
    const submitForm = async () => {
      try {
        if (nonceData && nonceSuccess) {
          const reqBody = {
            data: formData,
            sign: nonceData,
            address
          }
          const result = await api.policy.createNewPolicy(reqBody);
          alert(result?.message);
        }
      } catch (error: any) {
        alert(error?.message);
      }
    }

    if (nonceData && nonceSuccess) {
      submitForm();
    }
  }, [nonceData, nonceSuccess]);

  const handleSubmit = async (data: Record<string, string>) => {
    try {
      setFormData({
        ...data,
        owner: address,
        tags,
      });
      const nonce = await api.policy.requestNonce(`${address}`);
      signMessage({
        message: `${JSON.stringify({
          ...data,
          owner: address,
          tags,
        })}${nonce}`
      });
    } catch (error: any) {
      console.log(error);
      alert(error?.message);
    }
  }

  return (
    <>
      <DocTitle title="New Policy" />

      <div className="p-page overflow-x-hidden">
        <section className="py-8">
          <DataForm
            className="flex flex-col"
            callback={handleSubmit}
          >
            <h1 className="font-semibold text-xl">Policy Settings</h1>
            <h2 className=" text-mute font-semibold">
              Configure your new policy
            </h2>

            <Heading className="mt-7">Name of insurance</Heading>
            <input
              required
              type="text"
              name="name"
              className={twInputStyle}
              placeholder="Enter Policy Name"
            />

            <Heading className="mt-7">Insurance Description</Heading>
            <textarea
              required
              className={twMerge(twInputStyle, "h-[20vh] resize-none")}
              placeholder="Description"
              name="description"
            />

            <Heading className="mt-7">What is this Insurance for</Heading>
            <select
              onChange={(e) => setCategory(e.target.value)}
              className={twInputStyle}
              name="category"
            >
              {insuranceCategories.toSorted().map((cat, key) => (
                <option key={key} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            {category == "other" && (
              <>
                <input
                  required
                  className={twMerge("mt-2", twInputStyle)}
                  placeholder="Enter what this insurance is for (Eg: Naval Accidents)"
                  name="category"
                />
              </>
            )}

            <div className="mt-7 flex gap-x-7">
              <div className="basis-1/2 w-1/2">
                <Heading tooltip="This indicates minimum amount the user can claim from this policy">
                  Minimum claim for the policy
                </Heading>
                <input
                  required
                  name="minimumClaim"
                  className={twMerge(twInputStyle, "w-full")}
                  placeholder="Amount"
                  type="number"
                />
              </div>
              <div className="basis-1/2 w-1/2">
                <Heading tooltip="This indicates maximum amount the user can claim from this policy">
                  Maximum claim for the policy
                </Heading>
                <input
                  required
                  name="maximumClaim"
                  className={twMerge(twInputStyle, "w-full")}
                  placeholder="Amount"
                  type="number"
                />
              </div>
            </div>
            <div  className="flex gap-x-7 mt-7 flex-col gap-y-7">
              {!manualPremiumCheck && (
                <div className="flex gap-x-7">
                  <div className="basis-1/2 w-1/2 border-2 border-mute/40 rounded-lg">
                    <Heading className="p-2">
                      Premium Calculation Function
                    </Heading>
                    <textarea
                      required
                      className="w-full bg-background border-2 border-x-transparent border-mute/40 resize-none h-[20vh] outline-none text-xs scrollbar-primary p-1"
                      readOnly
                      value={premiumFunc}
                      name="premiumFunc"
                      onClick={() => {
                        modal.show(
                          <TexteditorModal
                            defaultValue={premiumFunc}
                            setter={setPremiumFunc}
                            argsSetter={setPremiumFuncArgs}
                          />
                        );
                      }}
                    />
                    <ArgsTypeDefine
                      className="p-2"
                      args={premiumFuncArgs}
                      setter={setPremiumFuncArgsSetter}
                      key={premiumFunc}
                    />
                  </div>
                  <div className="flex flex-col gap-y-2 basis-1/2">
                    <Heading tooltip="Provide description such that a non-technical person will be able to understand you function">
                      Describe this function
                    </Heading>
                    <textarea
                      required
                      className={twMerge(
                        twInputStyle,
                        "h-[25vh] w-full resize-none scrollbar-primary text-sm"
                      )}
                      placeholder="Description"
                      name="premiumFuncDescription"
                    />
                  </div>
                </div>
              )}

              <div className="flex justify-between bg-primary/20 py-2 px-4 rounded-lg group hover:bg-primary/10 duration-300 ease-in">
                <p className="group-hover:opacity-40 ease-in duration-300">
                  I want to manually verify the request and calculate the
                  premium
                </p>
                <div className="font-bold text-red-500  animate-pulse items-center hidden group-hover:flex duration-300 ease-in gap-x-1">
                  Work in Progress{" "}
                  <span>
                    <Icon icon="warning" />
                  </span>
                </div>
                <input
                  disabled
                  className="w-[1.2rem] group-hover:opacity-40 ease-in duration-300"
                  type="checkbox"
                  checked={manualPremiumCheck}
                  onChange={() => setManualPremiumCheck(!manualPremiumCheck)}
                />
              </div>

              {!manualClaimCheck && (
                <div className="flex gap-x-7">
                  <div className="basis-1/2 w-1/2 border-2 border-mute/40 rounded-lg">
                    <Heading className="p-2">Claim Validation Function</Heading>
                    <textarea
                      required
                      className="w-full bg-background border-2 border-x-transparent border-mute/40 resize-none h-[20vh] outline-none text-xs scrollbar-primary p-1"
                      readOnly
                      value={claimFunc}
                      name="claimFunc"
                      onClick={() => {
                        modal.show(
                          <TexteditorModal
                            defaultValue={claimFunc}
                            setter={setClaimFunc}
                            argsSetter={setClaimFuncArgs}
                          />
                        );
                      }}
                    />
                    <ArgsTypeDefine
                      key={claimFunc}
                      className="p-2"
                      args={claimFuncArgs}
                      setter={setclaimFuncArgsSetter}
                    />
                  </div>
                  <div className="flex flex-col gap-y-2 basis-1/2">
                    <Heading tooltip="Provide description such that a non-technical person will be able to understand you function">
                      Describe this function
                    </Heading>
                    <textarea
                      required
                      className={twMerge(
                        twInputStyle,
                        "h-[25vh] w-full resize-none scrollbar-primary text-sm"
                      )}
                      placeholder="Description"
                      name="claimFuncDescription"
                    />
                  </div>
                </div>
              )}

              <div className="flex justify-between bg-primary/20 py-2 px-4 rounded-lg group hover:bg-primary/10 duration-300 ease-in">
                <p className="group-hover:opacity-40 ease-in duration-300">
                  I want to manually verify the request of the Claim
                </p>
                <div className="font-bold text-red-500  animate-pulse items-center hidden group-hover:flex duration-300 ease-in gap-x-1">
                  Work in Progress{" "}
                  <span>
                    <Icon icon="warning" />
                  </span>
                </div>
                <input
                  disabled
                  className="w-[1.2rem] group-hover:opacity-40 ease-in duration-300"
                  type="checkbox"
                  checked={manualClaimCheck}
                  onChange={() => setManualClaimCheck(!manualClaimCheck)}
                />
              </div>
            </div>

            <div className="mt-7 flex gap-x-7">
              <div className="basis-1/2 w-1/2">
                <Heading tooltip="This indicates for minimum how long a user can take this policy">
                  Minimum duration for the policy
                </Heading>
                <DurationInput
                  className={twMerge("w-1/2", twInputStyle)}
                  name="minimumDuration"
                  defaultValue={1000 * 60 * 60 * 24}
                />
              </div>
              <div className="basis-1/2 w-1/2">
                <Heading tooltip="This indicates for maximum how long a user can take this policy">
                  Maximum duration for the policy
                </Heading>
                <DurationInput
                  className={twMerge("w-1/2", twInputStyle)}
                  name="maximumDuration"
                  defaultValue={1000 * 60 * 60 * 24}
                />
              </div>
            </div>

            <div className="flex flex-col mt-7">
              <Heading>Tags</Heading>
              <ToastsInput
                setter={setTags}
                className={twMerge("text-sm mt-1 mb-3", twInputStyle)}
              />
            </div>

            <div className="mt-2 flex items-start gap-4">
              <button
                type="submit"
                className="bg-primary py-2 px-6 rounded-md text-back font-medium disabled:cursor-progress disabled:opacity-60 disabled:animate-pulse"
              // disabled={loading}
              >
                Save
              </button>
              <div className="bg-red-300 w-full p-2 rounded-lg text-red-950">
                <p className="text-xs leading-tight">
                  Once you create this policy, you won't be able to edit its
                  details. Therefore, it is crucial to carefully review all the
                  information you provide. Double-check every field to ensure
                  accuracy and completeness before proceeding. Make sure
                  everything is correct to avoid any future issues or
                  discrepancies.
                </p>
              </div>
            </div>
          </DataForm>

          {/* <div className="basis-[28%] bg-foreground rounded-xl mobile:hidden"></div> */}
        </section>
      </div>
    </>
  );
}