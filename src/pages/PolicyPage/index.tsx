import { useParams } from "react-router-dom";
import Header from "./components/Header";
import TotalStakes from "./components/TotalStakes";
import PoolDistribution from "./components/PoolDistribution";

export default function PolicyPage() {
  const { id } = useParams();

  return (
    <article className="p-page py-8 flex flex-col gap-y-4 w-full">
     <Header />
     <TotalStakes />
     {/* <PoolDistribution />   */}
    </article>
  );
}

