import { Policy } from "../../../types";
import { closestTimeUnit } from "../../../utils";

export default function ClaimInfo(props: { policy: Policy }) {
  const { policy } = props;

  return (
    <div>

      <div className="flex w-full gap-y-7 mt-4 mobile:gap-x-4 gap-x-4">
        <div className="flex flex-col w-1/3 gap-y-2">
          {claimInfoData.map((data, i) => (
            <div
              className="mobile:w-[30%] hover:bg-front/5 text-center justify-center duration-200 ease-in-out bg-background border border-border rounded-md py-1 flex items-center gap-x-2"
              key={i}
            >
              <h1 className="tracking-wide">{data.title}:</h1>
              <p className="font-mono">{data.value}</p>
            </div>
          ))}
        </div>
        <div className="flex gap-x-4 w-2/3">
          <div className="mobile:w-full w-1/2 duration-200  px-3 ease-in-out bg-background border border-border justify-center rounded-md flex flex-col text-secondary">
            {" "}
            <h1 className="text-lg tracking-wide text-white border-foreground border-b-2">
              Duration for the policy
            </h1>
            <div className="mt-2">
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
          <div className="mobile:w-full w-1/2 duration-200 ease-in-out px-3 bg-background border border-border justify-center rounded-md flex flex-col text-secondary">
            {" "}
            <h1 className="text-lg tracking-wide text-white border-foreground border-b-2">
              Limit of the claim
            </h1>
            <div className="mt-2">
              Minimum: <span className="font-extrabold">${policy.minimumClaim}</span>
            </div>
            <div className="mt-1">
              Maximum: <span className="font-extrabold">${policy.maximumClaim}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
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
