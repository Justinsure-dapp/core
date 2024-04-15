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
      <p className={twMerge("font-bold pb-1 flex gap-x-2", props.className)}>
        {props.children}
        {props.tooltip && <HelpTooltip>{props.tooltip}</HelpTooltip>}
      </p>
    </div>
  );
}
