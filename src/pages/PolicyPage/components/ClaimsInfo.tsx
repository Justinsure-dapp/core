import { closestTimeUnit } from "../../../utils";

export default function ClaimInfo() {

  return (
    <>
      <div className="flex flex-wrap w-full justify-around pt-12 gap-y-7  mobile:gap-x-4 p-page">
        {claimInfoData.map((data, i) => (
          <div
            className="w-[28%] mobile:w-[30%] text-center justify-center duration-200 ease-in-out bg-foreground/40 border-2 border-foreground px-4 py-8 rounded-xl flex flex-col items-center gap-y-2"
            key={i}
          >
            <h1 className="text-lg tracking-wide">{data.title}</h1>
            <p className="text-3xl font-mono">{data.value}</p>
          </div>
        ))}
      <div className="w-[40%] mobile:w-full duration-200 ease-in-out bg-foreground/40 border-2 border-foreground px-8 py-6 justify-center rounded-xl flex flex-col">
        {" "}
        <h1 className="text-lg tracking-wide">Required duration for the policy</h1>
        <div className="text-sm mt-2">
          Minimum:{" "}
          <span className="text-primary font-bold">
            {closestTimeUnit(34324349)}
          </span>
        </div>
        <div className="text-sm mt-1">
          Maximum:{" "}
          <span className="text-primary font-bold">
            {closestTimeUnit(734034329)}
          </span>
        </div>
      </div>
      <div className="w-[40%] mobile:w-full duration-200 ease-in-out bg-foreground/40 border-2 border-foreground px-8 py-6 justify-center rounded-xl flex flex-col">
        {" "}
        <h1 className="text-lg tracking-wide">Limit of the claim</h1>
        <div className="text-sm mt-2">
          Minimum:{" "}
          <span className="text-primary font-bold">
            $1000
          </span>
        </div>
        <div className="text-sm mt-1">
          Maximum:{" "}
          <span className="text-primary font-bold">
            $2000
          </span>
        </div>
      </div>
      </div>
    </>
  );
}

const claimInfoData = [
  {
    title: "Claims settled",
    value: 20,
  },
  {
    title: "Claims requested",
    value: 25,
  },
  {
    title: "Claim Ratio",
    value: 0.8,
  },
];
