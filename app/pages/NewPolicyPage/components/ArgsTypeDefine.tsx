import React, { useEffect, useRef, useState } from "react";
import Heading from "./Heading";
import { twMerge } from "tailwind-merge";
import Icon from "../../../common/Icon";
import useModal from "../../../hooks/useModal";
import { Arg } from "../../../types";

export default function ArgTypeDefine(props: {
  args: string[];
  className?: string;
  setter?: React.Dispatch<React.SetStateAction<Arg[]>>;
}) {
  const [res, setRes] = useState<Arg[]>([]);

  useEffect(() => {
    props.setter && props.setter([...res]);
  }, [res]);

  useEffect(() => {
    const newRes: Arg[] = [];
    props.args.forEach((a) => {
      newRes.push({
        name: a,
        typeName: possibleTypes[0].name,
        htmlType: possibleTypes[0].value,
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
              type="button"
              onClick={() =>
                modal.show(
                  <DescriptionModal args={res} setter={setRes} arg={arg} />,
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
                const newValue = e.currentTarget.value;
                const newName = possibleTypes.find(
                  (a) => a.value === newValue,
                )?.name;
                const newRes = [...res];
                const prev = newRes.find((a) => a.name === arg);
                newName && prev && (prev.typeName = newName);
                prev && (prev.htmlType = newValue);
              }}
            >
              {possibleTypes.map((type, key) => (
                <option value={type.value} key={key}>
                  {type.name}
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
  Arg: Arg;
  setter: React.Dispatch<React.SetStateAction<Arg>>;
}) {
  const twInputStyle =
    "text-lg rounded-md p-2 bg-background border border-border shadow shadow-mute/30";

  const modal = useModal();

  const inpRef = useRef() as React.MutableRefObject<HTMLTextAreaElement>;

  const res = [...props.args];
  const prev = res.find((e) => e.name === props.arg);
  const description = prev?.description;

  return (
    <div className="relative flex flex-col gap-y-7 bg-background w-[40vw] p-8 rounded-xl border border-front/40">
      <button
        type="button"
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
        <textarea
          className={twMerge(twInputStyle, "h-[20vh]")}
          ref={inpRef}
          defaultValue={description}
        />
      </div>
      <button
        type="button"
        className="bg-primary w-max py-2 px-3 self-center rounded-lg text-front font-bold"
        onClick={() => {
          const newDesc = inpRef.current.value;
          const newRes = [...props.args];
          const prev = newRes.find((e) => e.name === props.arg);
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
  { name: "String", value: "text" },
  { name: "Number", value: "number" },
  { name: "URL", value: "url" },
  { name: "Email", value: "email" },
  { name: "Date", value: "date" },
  { name: "Boolean", value: "checkbox" },
] as const;
