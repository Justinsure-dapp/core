import DocTitle from "../../common/DocTitle";
import PieChart from "../../common/PieChart";
import { generateShades } from "../../utils";
import Heading from "../NewPolicyPage/components/Heading";

export default function (props: {}) {
  return (
    <div className="m-8 border border-border/50 p-4 text-sm rounded-xl">
      <DocTitle title="SureCoin" />

      <div>
        <Heading className="text-2xl">SureCoin</Heading>
        <p className="mt-1 text-mute">
          SureCoin is a token that you earn by staking your policies. You can
          use SureCoin to pay for your policies.
        </p>
      </div>

      <img src="/images/tokenomics.png" className="w-1/2 mx-auto" />
    </div>
  );
}
