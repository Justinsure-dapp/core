import { useContractRead } from "wagmi";
import Icon from "../../../common/Icon";
import { Policy } from "../../../types";
import contractDefinitions from "../../../contracts";
import { isAddress } from "viem";

export default function TotalStakes({ policy }: { policy: Policy }) {
  if (!policy.address || !policy.creator) return null;
  if (!isAddress(policy.creator)) return null;
  if (!isAddress(policy.address)) return null;

  const { data: totalStake } = useContractRead({
    ...contractDefinitions.insuranceController,
    address: isAddress(policy.address) ? policy.address : undefined,
    functionName: "totalStake",
  });

  const { data: ownerStake } = useContractRead({
    ...contractDefinitions.stakeToken,
    address: isAddress(policy.stakeToken) ? policy.stakeToken : undefined,
    functionName: "balanceOf",
    args: [policy.address],
  });

  const ownerStakePercentage =
    ownerStake && totalStake ? (ownerStake / totalStake) * BigInt(100) : 0;

  return (
    <div className="w-full flex-col flex gap-y-2 pt-4 pb-16 p-page">
      <div className="flex justify-between mobile:gap-y-2">
        <h1 className="text-xl">Staked Amount</h1>
        <div className="bg-primary/20 border border-primary/40 rounded-xl px-4 mobile:w-max mobile:self-end">
          SureCoin: <span className="font-mono">{totalStake?.toString()}</span>
        </div>
      </div>
      <div className="w-full bg-primary/20 h-[1vh] rounded-xl relative mt-3">
        <div
          className="bg-primary h-[1vh] rounded-xl flex items-center justify-end"
          style={{ width: `${ownerStakePercentage}%` }}
        >
          <div className="p-1 bg-background rounded-full border border-primary">
            <Icon icon="shield_person" className="text-[1.5rem] text-primary" />
          </div>
        </div>

        <div
          className="mobile:whitespace-nowrap mt-4"
          style={{ left: `${ownerStakePercentage}%` }}
        >
          By owner: {ownerStakePercentage.toString()}%
        </div>
      </div>
      <div className="flex w-full justify-between mt-2 relative"></div>
    </div>
  );
}
