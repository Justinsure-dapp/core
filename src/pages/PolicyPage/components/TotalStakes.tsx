import Icon from "../../../common/Icon";

export default function TotalStakes() {
  const ownerStakePercentage = 80;
  return (
    <div className="w-ful flex-col flex gap-y-2 pt-8 pb-16 p-page">
      <div className="flex justify-between mobile:flex-col mobile:gap-y-2">
        <h1 className="text-xl">Total Stakes in the pool</h1>
        <div className="bg-primary/20 border border-primary/40 rounded-xl px-4 mobile:w-max mobile:self-end">
          Total Sure coins: <span className="font-mono">124.34</span>
        </div>
      </div>
      <div className="w-full bg-primary/20 h-[1vh] rounded-xl relative mt-3">
        <p
          className="-translate-x-1/2 absolute top-full translate-y-1/2 mobile:whitespace-nowrap"
          style={{ left: `${ownerStakePercentage}%` }}
        >
          {ownerStakePercentage}% staked by owner
        </p>

        <div
          className="bg-primary h-[1vh] rounded-xl flex items-center justify-end"
          style={{ width: `${ownerStakePercentage}%` }}
        >
          <div className="p-1 bg-background rounded-full border border-primary">
            <Icon icon="shield_person" className="text-[1.5rem] text-primary" />
          </div>
        </div>
      </div>
      <div className="flex w-full justify-between mt-2 relative"></div>
    </div>
  );
}
