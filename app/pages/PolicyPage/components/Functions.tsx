import { Policy } from "../../../types";

export default function Functions(props: { policy: Policy }) {
  const { policy } = props;
  return (
    <div className="flex flex-col py-6 gap-y-8">
      <div className="flex flex-col basis-1/2">
        <h1 className="text-xl border-b border-front/20 pb-1">
          Premium validation function
        </h1>
        <p className="mt-1 text-front/40 text-sm">{policy.premiumFuncDescription}</p>
        <div className="flex flex-col border border-border p-2  duration-300 text-front/80 bg-foreground rounded-md w-max mt-4">
          <pre className="text-xs font-mono">{policy.premiumFunc}</pre>
        </div>
      </div>

      <div className="flex flex-col basis-1/2">
        <h1 className="text-xl border-b border-front/20 pb-1">
          Claim validation function
        </h1>
        <p className="mt-1 text-sm text-front/40">{policy.claimFuncDescription}</p>
        <div className="flex flex-col border border-border p-2 duration-300 text-front/80 bg-foreground rounded-md w-max mt-4">
          <pre className="text-xs font-mono">{policy.claimFunc}</pre>
        </div>
      </div>
    </div>
  );
}
