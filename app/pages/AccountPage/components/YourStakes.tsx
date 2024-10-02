import { twMerge } from "tailwind-merge";
import PieChart from "../../../common/PieChart";
import { generateShades } from "../../../utils";

export default function YourStakes() {
  return (
    <div className="flex flex-col gap-x-8 bg-secondary/10 rounded-xl py-12 px-8 my-12 mobile:mx-2 widescreen:mx-8 mobile:py-4">
      <div className="flex justify-between mobile:items-center widescreen:items-start">
        <div>
          <h1 className="text-2xl font-semibold">Policies Staked</h1>
          <h2 className=" text-mute font-semibold">
            Here are the policies you have staked into..
          </h2>
        </div>
        <p className="bg-primary/20 border h-fit border-primary/30 px-4 rounded-xl mobile:w-max">
          Total Staked : <span className="font-mono">890.32</span>
        </p>
      </div>
      <div className="flex pt-6 items-center justify-around mobile:flex-col mobile:items-center mobile:gap-y-6">
        <PieChart data={data} className="w-[20vw] mobile:w-[50vw]" />
        <div className="basis-1/2 flex flex-col gap-y-3 mobile:w-full">
          {data.labels.map((label, i) => (
            <div key={i} className="flex w-full items-center gap-x-4">
              <span className="">{i + 1}</span>
              <div
                className={twMerge(
                  "bg-foreground border border-front/10 w-full py-2 px-4 rounded-xl flex justify-between items-center",
                  `hover:cursor-pointer hover:scale-[102%] duration-150 ease-in`,
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
  bgColor: generateShades("rgb(26, 201, 255)", 8),
};
