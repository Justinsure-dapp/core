import { twMerge } from "tailwind-merge";
import PieChart from "../../../common/PieChart";
import { Policy } from "../../../types";
import useIdleScrollbar from "../../../hooks/useIdleScrollbar";
import React, { useRef } from "react";
import { generateShades } from "../../../utils";

export default function PoolDistribution({ policy }: { policy: Policy }) {
  const accountRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  useIdleScrollbar(accountRef);

  return (
    <div className="flex flex-col gap-x-8 mx-4 bg-secondary/5 rounded-xl py-12 px-8 mobile:py-6 border border-secondary/20">
      <div className="flex justify-between mobile:flex-col mobile:gap-y-2">
        <h1 className="text-xl">Total money & distribution of pool</h1>
        <p className="bg-primary/20 border border-primary/30 px-4 rounded-xl mobile:w-max mobile:self-end">
          Total Sure coints : <span className="font-mono">890.32</span>
        </p>
      </div>
      <div className="flex pt-6 justify-around mobile:flex-col mobile:gap-y-4">
        <PieChart
          data={data}
          className="self-center w-[20vw] mobile:w-[40vw]"
        />
        <div
          className="basis-1/2 flex flex-col gap-y-3 border border-border p-4 rounded-xl max-h-[240px] overflow-y-scroll scrollbar-primary"
          ref={accountRef}
        >
          {data.labels.map((label, i) => (
            <div key={i} className="flex w-full items-center gap-x-4">
              <span className="">{i + 1}</span>
              <div
                className={twMerge(
                  "bg-front/5 border border-front/10 w-full py-2 px-4 rounded-xl flex justify-between items-center",
                  `hover:cursor-pointer hover:scale-[102%] duration-150 ease-in`
                )}
              >
                <h1 className="">{label}</h1>
                <p className="font-mono">{data.values[i]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const data = {
  labels: [
    "0x1234567890abcdef1234567890abcdef12345678",
    "0xabcdef1234567890abcdef1234567890abcdef12",
    "0x7890abcdef1234567890abcdef1234567890abcd",
    "0x4567890abcdef1234567890abcdef1234567890a",
    "0x90abcdef1234567890abcdef1234567890abcdef",
    "0x567890abcdef1234567890abcdef1234567890ab",
    "0xef1234567890abcdef1234567890abcdef1234",
    "0x34567890abcdef1234567890abcdef1234567890",
  ],
  values: [42, 17, 93, 58, 76, 34, 89, 21],
  bgColor: generateShades("rgb(26, 201, 255)", 8),
};
