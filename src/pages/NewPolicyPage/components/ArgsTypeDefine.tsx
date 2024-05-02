import React, { useEffect, useRef, useState } from "react";
import Heading from "./Heading";
import { twMerge } from "tailwind-merge";
import Icon from "../../../common/Icon";
import useModal from "../../../hooks/useModal";

export type Args = {
  title: string;
  typeTitle: string;
  typeValue: string;
  description: string;
}[];

export default function ArgsTypeDefine(props: {
  args: string[];
  className?: string;
  setter?: React.Dispatch<React.SetStateAction<Args>>;
}) {
  const [res, setRes] = useState<Args>([]);

  useEffect(() => {
    props.setter && props.setter(res);
  }, [res]);

  useEffect(() => {
    const newRes: Args = [];
    props.args.forEach((a) => {
      newRes.push({
        title: a,
        typeTitle: possibleTypes[0].title,
        typeValue: possibleTypes[0].value,
        description: "",
      });
    });

    setRes([...newRes]);
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
            <button
              onClick={() =>
                modal.show(
                  <DescriptionModal args={res} setter={setRes} arg={arg} />
                )
              }
            >
              <Icon icon="edit" />
            </button>
          </div>
          <div className="basis-1/2 flex flex-col">
            <select
              className="bg-background border border-mute/40 rounded p-1"
              onChange={(e) => {
                const newValue = e.currentTarget.value
                const newTitle = possibleTypes.find((a) => a.value === newValue)?.title;
                const newRes = [...res];
                const prev = newRes.find((a) => a.title === arg);
                newTitle && prev && (prev.typeTitle = newTitle);
                prev && (prev.typeValue = newValue);
                
              }}
            >
              {possibleTypes.map((type, key) => (
                <option value={type.value} key={key}>
                  {type.title}
                </option>
              ))}
            </select>
          </div>
        </div>
      ))}
    </div>
  );
}

function DescriptionModal(props: {
  arg: string;
  args: Args;
  setter: React.Dispatch<React.SetStateAction<Args>>;
}) {
  const twInputStyle =
    "text-lg rounded-md p-2 bg-background border border-border shadow shadow-mute/30";

  const modal = useModal();

  const inpRef = useRef() as React.MutableRefObject<HTMLTextAreaElement>;

  const res = [...props.args]
  const prev = res.find((e) => e.title === props.arg);
  const description = prev?.description
 
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
        <textarea className={twMerge(twInputStyle, "h-[20vh]")} ref={inpRef} defaultValue={description} />
      </div>
      <button
        className="bg-primary w-max py-2 px-3 self-center rounded-lg text-back font-bold"
        onClick={() => {
          const newDesc = inpRef.current.value;
          const newRes = [...props.args];
          const prev = newRes.find((e) => e.title === props.arg);
          prev && (prev.description = newDesc);
          modal.hide();
        }}
      >
        Save changes
      </button>
    </div>
  );
}

const possibleTypes = [
  { title: "String", value: "text" },
  { title: "Number", value: "number" },
  { title: "URL", value: "url" },
  { title: "Email", value: "email" },
  { title: "Date", value: "date" },
  { title: "Boolean", value: "checkbox" },
] as const;
