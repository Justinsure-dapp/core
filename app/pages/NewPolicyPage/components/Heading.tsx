import React from "react";
import HelpTooltip from "../../../common/HelpTooltip";
import { twMerge } from "tailwind-merge";

export default function Heading(props: {
  children: React.ReactNode;
  className?: string;
  tooltip?: string;
}) {
  return (
    <div>
      <div
        className={twMerge(
          "relative font-bold w-max pb-1 flex gap-x-2",
          props.className,
        )}
      >
        {props.children}
        <div className="absolute left-full translate-x-2">
          {props.tooltip && <HelpTooltip>{props.tooltip}</HelpTooltip>}
        </div>
      </div>
    </div>
  );
}
