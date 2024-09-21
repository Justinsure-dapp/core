import { Navigate, useNavigate, useParams } from "react-router-dom";
import Header from "./components/Header";
import TotalStakes from "./components/TotalStakes";
import PoolDistribution from "./components/PoolDistribution";
import ClaimInfo from "./components/ClaimsInfo";
import InvestmentPolicy from "./components/InvestmentPolicy";
import Functions from "./components/Functions";
import api from "../../utils/api";
import useApiResponse from "../../hooks/useApiResponse";
import DocTitle from "../../common/DocTitle";

export default function PolicyPage() {
  const { address } = useParams();
  if (!address) return <Navigate to="/policies" />;

  const policy = useApiResponse(api.policy.getByAddress, address);

  return (
    <article className="p-page py-8 flex flex-col gap-y-4 w-full">
      {policy && policy.data && (
        <>
          <Header policy={policy.data} />
          <ClaimInfo policy={policy.data} />
          <Functions policy={policy.data} />
          <TotalStakes policy={policy.data} />
          <PoolDistribution policy={policy.data} />
          <InvestmentPolicy />
        </>
      )}
    </article>
  );
}