import { Policy } from "../../../types";
import { closestTimeUnit } from "../../../utils";

export default function ClaimInfo(props: { policy: Policy }) {
  const { policy } = props;

  return (
    <>
      <div className="flex flex-wrap w-full justify-around gap-y-7 mt-4 mobile:gap-x-4 p-page">
        {claimInfoData.map((data, i) => (
          <div
            className="w-[28%] mobile:w-[30%] text-center justify-center duration-200 ease-in-out bg-background border-2 border-border px-4 py-8 rounded-xl flex flex-col items-center gap-y-2"
            key={i}
          >
            <h1 className="text-lg tracking-wide">{data.title}</h1>
            <p className="text-3xl font-mono">{data.value}</p>
          </div>
        ))}
        <div className="w-[45.3%] mobile:w-full duration-200 ease-in-out bg-background border-2 border-border px-8 py-6 justify-center rounded-xl flex flex-col text-secondary">
          {" "}
          <h1 className="text-lg tracking-wide text-white border-foreground border-b-2">
            Required duration for the policy
          </h1>
          <div className=" mt-2">
            Minimum:{" "}
            <span className=" font-bold">
              {closestTimeUnit(Number(policy.minimumDuration))}
            </span>
          </div>
          <div className=" mt-1">
            Maximum:{" "}
            <span className="font-bold">
              {closestTimeUnit(Number(policy.maximumDuration))}
            </span>
          </div>
        </div>
        <div className="w-[45.3%] mobile:w-full duration-200 ease-in-out bg-background border-2 border-border px-8 py-6 justify-center rounded-xl flex flex-col text-secondary">
          {" "}
          <h1 className="text-lg tracking-wide text-white border-foreground border-b-2">Limit of the claim</h1>
          <div className="mt-2">
            Minimum:{" "}
            <span className="font-bold">
              ${policy.minimumClaim}
            </span>
          </div>
          <div className="mt-1">
            Maximum:{" "}
            <span className="font-bold">
              ${policy.maximumClaim}
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
    value: 0,
  },
  {
    title: "Claims requested",
    value: 0,
  },
  {
    title: "Claim Ratio",
    value: 1.0,
  },
];
