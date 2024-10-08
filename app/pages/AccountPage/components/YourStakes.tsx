import { twMerge } from "tailwind-merge";
import PieChart from "../../../common/PieChart";
import { generateShades } from "../../../utils";
import { StakedInCard } from "../../../common/StatisticsSidebar/components/StakingStats";
import useWeb3 from "../../../contexts/web3context";
import { useState } from "react";
import { useAccount } from "wagmi";

export default function YourStakes() {
  const { policies } = useWeb3();
  const [totalStake, setTotalStake] = useState(0);
  const [stakes, setStakes] = useState<
    {
      name: string;
      address: string;
      value: number;
    }[]
  >([]);
  const { address } = useAccount();

  const policiesStakedIn =
    policies?.filter((p) => p.stakers?.includes(address as string)) || [];

  const chartData = {
    labels: stakes.map((s) => s.name),
    values: stakes.map((s) => s.value),
    bgColor: generateShades("rgb(26, 201, 255)", stakes.length),
  };

  return (
    <div className="flex flex-col gap-x-8 bg-mute/5 rounded-xl my-10 mobile:mx-2 p-2">
      <div className="flex flex-col mobile:items-center p-2">
        <div className="flex justify-between">
          <h1 className="text-2xl font-semibold">Policies Staked</h1>
          <p className="bg-mute/10 border h-fit border-primary/30 px-4 py-1 rounded-md mobile:w-max whitespace-nowrap">
            Total Staked :{" "}
            <span className="font-mono">{totalStake.toFixed(1)}</span>
          </p>
        </div>
        <h2 className=" text-mute text-sm mt-2">
          These are the policies in which you have staked. This pie chart displays the distribution of your staked amount across various policies. It provides a visual breakdown of how much you've staked in each policy, helping you track and manage your investments easily.
        </h2>
      </div>
      {policiesStakedIn.length > 0 ? (
        <div className="flex pt-6 justify-between mobile:flex-col items-center gap-10 mobile:gap-6 h-full">
          <PieChart data={chartData} className="w-[20vw] mobile:w-[50vw]" />
          <div className="w-full flex p-1 rounded-xl flex-col gap-y-3 mobile:w-full h-full max-h-[50vh] widescreen:h-[35vh] overflow-auto scrollbar-primary">
            {policiesStakedIn.map((policy, i) => (
              <StakedInCard
                key={i}
                setStakes={setStakes}
                setTotalStake={setTotalStake}
                policy={policy}
                withdrawable={true}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-[20vh]">
          <h1 className="text-2xl font-semibold text-mute">
            Nothing to show..
          </h1>
        </div>
      )}
    </div>
  );
}
