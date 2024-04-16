import { useParams } from "react-router-dom";
import StarRating from "../../common/StarRating";
import PieChart from "../../common/PieChart";

export default function PolicyPage() {
  const { id } = useParams();

  return (
    <article className="p-page py-8">
      <div className="flex w-full gap-x-4 justify-between">
        <div className="flex gap-x-4">
          <img
            src="https://i.pinimg.com/736x/26/7f/6c/267f6c91848164e2dd570d67fab5cb96.jpg"
            className="w-[4vw] rounded-full aspect-square h-max"
          />
          <div className="flex flex-col gap-y-1">
            <div className="flex items-center gap-x-2">
              <h1 className="text-2xl font-semibold">Car insurance Policy</h1> -
              <h2 className="text-2xl text-primary font-bold">SureCar</h2>
            </div>
            <div className="flex gap-x-1 items-center">
              <p>2.7</p>
              <StarRating rating={2.7} />
              <p className="text-xs">(5 reviews) {" "} (1 expert rating)</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-y-2 text-sm items-end">
          <p className="bg-primary/5 border border-primary/30 px-4 py-1 rounded-2xl w-max">
            Current Stake :{" "}
            <span className="font-mono text-primary">23.12</span>
          </p>
          <p className="bg-primary/5 border border-primary/30 px-4 py-1 rounded-2xl">
            Staking till date :{" "}
            <span className="font-mono text-primary">792.23</span>
          </p>
        </div>
      </div>
      <PieChart />
    </article>
  );
}
