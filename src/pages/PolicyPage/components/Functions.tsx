import { Policy } from "../../../types";

export default function Functions(props: { policy: Policy }) {
  const { policy } = props;
  return (
    <div className="flex flex-col pt-12 pb-8 gap-y-8 p-page">
      <div className="flex flex-col basis-1/2">
        <h1 className="text-xl border-b border-front/20 pb-1">
          Premium validation function
        </h1>
        <p className="mt-2 text-front/60">
          {policy.premiumCalculationFunction.description}
        </p>
        <div className="flex flex-col border border-front/40 p-4 hover:bg-foreground/30 duration-300 text-primary rounded-xl w-max mt-4">
          <pre className="text-xs font-mono">
            {policy.premiumCalculationFunction.function}
          </pre>
        </div>
      </div>

      <div className="flex flex-col basis-1/2">
        <h1 className="text-xl border-b border-front/20 pb-1">
          Claim validation function
        </h1>
        <p className="mt-2 text-front/60">
          {policy.claimValidationFunction.description}
        </p>
        <div className="flex flex-col border border-front/40 p-4 hover:bg-foreground/30 duration-300 text-primary rounded-xl w-max mt-4">
          <pre className="text-xs font-mono">
            {policy.claimValidationFunction.function}
          </pre>
          {/* <button className="text-sm self-end px-3 py-1 rounded-md font-bold mt-4 bg-primary text-back w-max">
            Read More
          </button> */}
        </div>
      </div>
    </div>
  );
}
