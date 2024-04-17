import PieChart from "../../../common/PieChart";

export default function PoolDistribution() {
    return (
        <div className="flex justify-around mt-8 gap-x-8">
        <PieChart data={data} className="self-center" />
        <div className="flex flex-col">
          <h1>This issomethin</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint fugit
            iste molestiae nesciunt eveniet cupiditate quos labore maiores,
            repellendus ut!
          </p>
          <div className="flex flex-col gap-y-2 text-sm items-end mt-4">
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
      </div>
    )
}

const data = {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    values: [1, 2, 3, 4, 5, 6],
  };
  