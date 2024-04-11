import StakingStats from "./components/StakingStats";
import SurityInfo from "./components/SurityInfo";

export default function StatisticsSidebar() {
  return (
    <section className="flex relative flex-col border-l border-border max-w-[20vw] h-screen">
      <div className="p-6 flex flex-col gap-y-2">
        <h1 className="text-mute text-base font-bold">SureCoin Balance</h1>
        <div>
          <h2 className="text-xs -mb-1">Wallet</h2>
          <p className="font-mono text-primary text-2xl font-medium">103.00</p>
        </div>
        <div>
          <h2 className="text-xs -mb-1">Pending</h2>
          <p className="font-mono text-primary text-2xl font-medium">84.20</p>
        </div>
      </div>

      <StakingStats />

      <figure role="separator" className="flex-1" />

      <SurityInfo />
    </section>
  );
}
