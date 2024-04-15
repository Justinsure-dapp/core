import React, { useState } from "react";
import DocTitle from "../../common/DocTitle";
import Icon, { IconType } from "../../common/Icon";
import HelpTooltip from "../../common/HelpTooltip";
import Heading from "./components/Heading";
import useModal from "../../hooks/useModal";
import TexteditorModal from "./components/TexteditorModal";
import ArgsTypeDefine from "./components/ArgsTypeDefine";
import insuranceCategories from "../../assets/data/insuranceCategories";

export default function NewPolicyPage() {
  const twInputStyle =
    "text-lg rounded-md p-2 bg-background border border-border shadow shadow-mute/30";

  const modal = useModal();

  const [premiumFunc, setPremiumFunc] = useState("");
  const [premiumFuncArgs, setPremiumFuncArgs] = useState<Array<string>>([]);
  const [claimFunc, setClaimFunc] = useState("");
  const [claimFuncArgs, setClaimFuncArgs] = useState<Array<string>>([]);

  return (
    <>
      <DocTitle title="New Policy" />
      <div className="p-page">
        <section className="py-8 flex gap-x-6">
          <form className="flex-1 flex flex-col">
            <h1 className="font-semibold text-xl">Policy Settings</h1>
            <h2 className=" text-mute font-semibold">
              Configure your new policy
            </h2>

            <Heading className="mt-7">Name of insurance</Heading>
            <input
              type="text"
              className={twInputStyle}
              placeholder="Enter Policy Name"
            />

            <Heading className="mt-7">What is this Insurance for</Heading>
            <select className={twInputStyle} name="cars" id="cars">
              {insuranceCategories.map((cat, key) => (
                <option key={key} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <div className="flex gap-x-7 mt-7">
              <div className="basis-1/2 w-1/2 border-2 border-mute/40 rounded-lg">
                <Heading className="p-2">Premium Calculation Function</Heading>
                <textarea
                  className="w-full bg-background border-2 border-x-transparent border-mute/40 resize-none h-[20vh] outline-none text-xs scrollbar-primary p-1"
                  readOnly
                  value={premiumFunc}
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
                <ArgsTypeDefine className="p-2" args={premiumFuncArgs} />
              </div>
              <div className="basis-1/2 w-1/2 border-2 border-mute/40 rounded-lg">
                <Heading className="p-2">Claim Validation Function</Heading>
                <textarea
                  className="w-full bg-background border-2 border-x-transparent border-mute/40 resize-none h-[20vh] outline-none text-xs scrollbar-primary p-1"
                  readOnly
                  value={claimFunc}
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
                <ArgsTypeDefine className="p-2" args={claimFuncArgs} />
              </div>
            </div>

            <div className="">
              <div className="my-4 bg-red-300 w-full p-2 rounded-lg text-red-950">
                <p className="text-xs leading-tight">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
                  facere voluptates aspernatur expedita exercitationem
                  perferendis dignissimos, provident itaque explicabo hic nobis
                  maiores repellendus magni neque officiis magnam ipsam dolorum,
                  quis, earum maxime. Labore, mollitia.
                </p>
              </div>
              <button className="bg-primary py-2 px-6 rounded-md text-back font-medium">
                Save
              </button>
            </div>
          </form>

          <div className="basis-[28%] bg-foreground rounded-xl"></div>
        </section>
      </div>
    </>
  );
}
