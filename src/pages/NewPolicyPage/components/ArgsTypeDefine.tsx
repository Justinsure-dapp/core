import React, { useEffect, useRef, useState } from "react";
import Heading from "./Heading";
import { twMerge } from "tailwind-merge";
import Icon from "../../../common/Icon";
import useModal from "../../../hooks/useModal";

type Args = Record<string, string>;

export default function ArgsTypeDefine(props: {
  args: string[];
  className?: string;
  setter?: React.Dispatch<React.SetStateAction<Args>>;
}) {
  const [res, setRes] = useState<Args>({});

  useEffect(() => {
    props.setter && props.setter(res);
  }, [res]);

  useEffect(() => {
    props.args.forEach((a) => setRes((p) => ({ ...p, [a]: possibleTypes[0] })));
  }, []);

  const modal = useModal();
  return (
    <div className={twMerge("flex flex-col gap-y-2", props.className)}>
      {props.args.length > 0 && (
        <Heading className="-mb-2 text-mute">Function Arguments</Heading>
      )}

      {props.args.map((arg, key) => (
        <div key={key} className="flex gap-x-1">
          <div className="w-1/2 flex gap-x-1 items-center">
            <h1 className="truncate">{arg}</h1>
            <button onClick={() => modal.show(<DescriptionModal arg={arg} />)}>
              <Icon icon="edit" />
            </button>
          </div>
          <div className="basis-1/2 flex flex-col">
            <select
              className="bg-background border border-mute/40 rounded p-1"
              onChange={(e) => {
                const newType = e.currentTarget.value;
                setRes((p) => ({ ...p, [arg]: newType }));
              }}
            >
              {possibleTypes.map((type, key) => (
                <option value={type} key={key}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>
      ))}
    </div>
  );
}

function DescriptionModal(props: { arg: string }) {
  const twInputStyle =
    "text-lg rounded-md p-2 bg-background border border-border shadow shadow-mute/30";
  const modal = useModal();
  console.log(props.arg);
  return (
    <div className="relative flex flex-col gap-y-7 bg-background w-[40vw] p-8 rounded-xl border border-front/40">
      <button
        className="text-[1.6rem] text-red-500 right-2 absolute top-2"
        onClick={() => modal.hide()}
      >
        <Icon icon="close" />
      </button>
      <div className="flex flex-col">
        <h1>Argument Name</h1>
        <input className={twMerge(twInputStyle)} value={props.arg} readOnly />
      </div>
      <div className="flex flex-col">
        <h1>Argument Description</h1>
        <textarea className={twMerge(twInputStyle, "h-[20vh]")} />
      </div>
      <button className="bg-primary w-max py-2 px-3 self-center rounded-lg text-back font-bold" onClick={() => modal.hide()}>
        Save changes
      </button>
    </div>
  );
}

const possibleTypes = ["String", "Number", "URL", "Email", "Date"] as const;
