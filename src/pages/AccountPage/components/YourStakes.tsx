import { twMerge } from "tailwind-merge";
import PieChart from "../../../common/PieChart";

export default function YourStakes() {
  return (
    <div className="flex flex-col gap-x-8 bg-secondary/10 rounded-xl py-12 px-8 my-12 mobile:py-6">
      <div className="flex justify-between mobile:flex-col mobile:gap-y-2">
        <h1 className="text-xl mobile:whitespace-nowrap">Total money & distribution of pool</h1>
        <p className="bg-primary/20 border border-primary/30 px-4 rounded-xl mobile:w-max mobile:self-end">
          Total Staked : <span className="font-mono">890.32</span>
        </p>
      </div>
      <div className="flex pt-6 justify-around mobile:flex-col mobile:items-center mobile:gap-y-6">
        <PieChart data={data} className="w-[20vw] mobile:w-[50vw]" />
        <div className="basis-1/2 flex flex-col gap-y-3 mobile:w-full">
          {data.labels.map((label, i) => (
            <div className="flex w-full items-center gap-x-4">
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
    "Car Insurance - CarSure",
    "HouseSure - Housing",
    "LifeSue - LifeSurity",
    "HealthIn - Healthify",
    "Car Insurance - CarSure",
    "HouseSure - Housing",
    "LifeSue - LifeSurity",
    "HealthIn - Healthify",
  ],
  values: [23, 19, 15, 3, 23, 19, 15, 12],
  bgColor: [
    "rgb(220, 31, 255, 0.4)",
    "rgb(55, 91, 210, 0.4)",
    "rgb(232, 65, 66, 0.4)",
    "rgb(243, 186, 47, 0.4)",
  ],
};
