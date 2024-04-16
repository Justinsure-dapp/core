import React, { HTMLInputTypeAttribute, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

export default function ToastsInput(props: { className?: string }) {
  const [res, setRes] = useState<Array<string>>([]);

  const inpRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  return (
    <div
      className={twMerge("flex flex-wrap gap-2 items-center", props.className)}
    >
      {res.map((item, key) => (
        <div
          key={key}
          className="py-1 px-4 rounded-full bg-foreground border text-sm border-mute truncate"
        >
          {item}
        </div>
      ))}

      <input
        type="text"
        className="flex-1 outline-none bg-transparent"
        ref={inpRef}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === ",") {
            if (inpRef.current && inpRef.current.value)
              setRes((p) => [...p, inpRef.current.value]);
            setTimeout(() => {
              inpRef.current.value = "";
            }, 10);
          }
        }}
      />
    </div>
  );
}
