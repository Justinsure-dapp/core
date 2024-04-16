import React from "react";
import Heading from "./Heading";
import { twMerge } from "tailwind-merge";

export default function ArgsTypeDefine(props: {
  args: string[];
  className?: string;
}) {
  return (
    <div className={twMerge("flex flex-col gap-y-2", props.className)}>
      {props.args.length > 0 && (
        <Heading className="-mb-2 text-mute">Function Arguments</Heading>
      )}

      {props.args.map((arg, key) => (
        <div key={key} className="flex gap-x-1">
          <h1 className="basis-1/2 truncate">{arg}</h1>
          <div className="basis-1/2 flex flex-col">
            <select
              name={arg}
              className="bg-background border border-mute/40 rounded p-1"
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

const possibleTypes = ["String", "Number", "URL", "Email"];
