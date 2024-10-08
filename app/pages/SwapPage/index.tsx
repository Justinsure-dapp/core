import Chart from "./components/Chart";
import Swap from "./components/Swap";
import DocTitle from "../../common/DocTitle";

export default function () {
  return (
    <div className="flex flex-col gap-4 mt-4 p-page">
      <DocTitle title="Swap" />
      <section className="mt-4 mb-8 flex flex-col gap-2">
        <Swap />
      </section>
      <section className="mb-8 flex flex-col gap-2">
        <Chart />
      </section>
    </div>
  );
}
