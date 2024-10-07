import { useReadContract } from "wagmi";
import Icon from "../../../common/Icon";
import { Policy } from "../../../types";
import contractDefinitions from "../../../contracts";
import { isAddress, zeroAddress } from "viem";
import useUsdjHook from "../../../hooks/useUsdj";
import useApiResponse from "../../../hooks/useApiResponse";
import api from "../../../utils/api";

export default function TotalStakes({ policy }: { policy: Policy }) {
  const creatorAddress = isAddress(policy.creator)
    ? policy.creator
    : zeroAddress;
  const policyAddress = isAddress(policy.address)
    ? policy.address
    : zeroAddress;
  const { divideByDecimals } = useUsdjHook();

  const { data } = useReadContract({
    ...contractDefinitions.insuranceController,
    address: policyAddress,
    functionName: "totalStake",
  });

  const totalStake = data ? divideByDecimals(data) : 0;

  const { data: data2 } = useReadContract({
    ...contractDefinitions.insuranceController,
    address: policyAddress,
    functionName: "stakedAmountOfAddress",
    args: [creatorAddress],
  });

  const ownerStake = data2 ? divideByDecimals(data2) : 0;

  
  if (!isAddress(policy.address)) return <></>

  const feed = useApiResponse(api.policy.getStakeHistory, policy.address)

  console.log(feed)


  const ownerStakePercentage =
    ownerStake && totalStake
      ? (Number(ownerStake) / Number(totalStake)) * 100
      : 0;

  if (creatorAddress === zeroAddress || policyAddress === zeroAddress)
    return null;
  return (
    <div className="w-full flex-col flex gap-y-2 pb-16">
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
          By owner: {ownerStakePercentage.toFixed(2).toString()}%
        </div>
      </div>
      <div className="flex w-full justify-between mt-2 relative"></div>
    </div>
  );
}
