import React, { useEffect, useRef, useState } from "react";
import Heading from "./Heading";
import { twMerge } from "tailwind-merge";

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

  useEffect(()=>{
    props.args.forEach(a => setRes(p => ({...p, [a] : possibleTypes[0]})))
  },[])

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

const possibleTypes = ["String", "Number", "URL", "Email", "Date"] as const;
