import React from "react";
import { twMerge } from "tailwind-merge";

export default function HelpTooltip(props: {
  className?: string;
  symbol?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative group cursor-pointer">
      <figure
        className={twMerge(
          props.className,
          "bg-mute/40 text-front p-1 rounded-full aspect-square h-[1.4em] flex justify-center items-center text-base font-medium"
        )}
      >
        {props.symbol || "?"}
      </figure>
      <div className="min-w-[20vw] border-front/20 max-w-[30vw] absolute duration-500 translate-y-2 top-full left-0 opacity-0 group-hover:opacity-100 bg-foreground border border-border 
      p-2 rounded-lg text-base font-normal pointer-events-none select-none">
        {props.children}
      </div>
    </div>
  );
}
