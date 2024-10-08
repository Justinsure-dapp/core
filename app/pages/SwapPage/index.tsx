import Chart from "./components/Chart";
import Swap from "./components/Swap";
import Heading from "../NewPolicyPage/components/Heading";

export default function () {
  return (
    <div className="p-page mt-4 flex flex-col gap-4">
      <section className="mb-8 mt-4 flex w-1/2 flex-col gap-2">
        <Swap />
      </section>
      <section className="mb-8 flex flex-col gap-2">
        <Chart />
      </section>
    </div>
  );
}
