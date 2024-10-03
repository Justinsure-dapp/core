import { useReadContract } from "wagmi";
import Icon from "../../../common/Icon";
import { Policy } from "../../../types";
import contractDefinitions from "../../../contracts";
import { isAddress, zeroAddress } from "viem";

export default function TotalStakes({ policy }: { policy: Policy }) {
  const creatorAddress = isAddress(policy.creator)
    ? policy.creator
    : zeroAddress;
  const policyAddress = isAddress(policy.address)
    ? policy.address
    : zeroAddress;

  const { data: totalStake } = useReadContract({
    ...contractDefinitions.insuranceController,
    address: policyAddress,
    functionName: "totalStake",
  });

  const { data: ownerStake } = useReadContract({
    ...contractDefinitions.insuranceController,
    address: policyAddress,
    functionName: "stakedAmountOfAddress",
    args: [creatorAddress],
  });

  const ownerStakePercentage =
    ownerStake && totalStake
      ? (Number(ownerStake) / Number(totalStake)) * 100
      : 0;

  if (creatorAddress === zeroAddress || policyAddress === zeroAddress)
    return null;
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
          className="bg-secondary h-[1vh] rounded-xl flex items-center justify-end"
          style={{ width: `${ownerStakePercentage}%` }}
        >
          <div className="p-1 bg-background rounded-full border border-secondary">
            <Icon
              icon="shield_person"
              className="text-[1.5rem] text-secondary"
            />
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
