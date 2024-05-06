import { twMerge } from "tailwind-merge";
import PieChart from "../../../common/PieChart";

export default function StakeDistribution(props: {
  data: { labels: string[]; values: number[]; bgColor: string[] };
}) {
  return (
    <div className="flex flex-col gap-x-8 bg-background rounded-xl py-6 px-6 my-5 mobile:px-4 mobile:py-3">
      <div className="flex justify-between mobile:flex-col mobile:gap-y-1">
        <h1 className="text-xl">Total money & distribution of pool</h1>
        <p className="bg-primary/20 border border-primary/30 px-4 rounded-xl mobile:w-max mobile:self-end mobile:text-sm">
          Total Staked : <span className="font-mono">890.32</span>
        </p>
      </div>
      <div className="flex pt-6 justify-around mobile:flex-col mobile:w-full mobile:items-center mobile:gap-y-4">
        <PieChart data={props.data} className="w-[20vw] mobile:w-[40vw]" />
        <div className="basis-1/2 flex flex-col gap-y-3 mobile:w-full">
          {props.data.labels.map((label, i) => (
            <div className="flex w-full items-center gap-x-4">
              <span className="">{i + 1}</span>
              <div
                className={twMerge(
                  "bg-front/5 border border-front/10 w-full py-2 px-4 rounded-xl flex justify-between items-center",
                  `hover:cursor-pointer hover:scale-[102%] duration-150 ease-in`
                )}
              >
                <h1 className="">{label}</h1>
                <p className="font-mono">{props.data.values[i]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
