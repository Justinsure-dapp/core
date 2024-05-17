import { useNavigate, useParams } from "react-router-dom";
import Header from "./components/Header";
import TotalStakes from "./components/TotalStakes";
import PoolDistribution from "./components/PoolDistribution";
import ClaimInfo from "./components/ClaimsInfo";
import InvestmentPolicy from "./components/InvestmentPolicy";
import Functions from "./components/Functions";
import { useEffect, useState } from "react";
import { Policy } from "../../types";
import api from "../../utils/api";

export default function PolicyPage() {
  const { address } = useParams();

  const [policy, setPolicy] = useState<Policy>();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function loadData() {
    setLoading(true);

    if (!address) {
      return navigate("/");
    }

    const policyData = await api.policy.getByAddress(address);
    setPolicy(policyData);
    setLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <article className="p-page py-8 flex flex-col gap-y-4 w-full">
      {!loading && policy && (
        <>
          <Header policy={policy} />
          <ClaimInfo policy={policy} />
          <Functions />
          <TotalStakes />
          <PoolDistribution />
          <InvestmentPolicy />
        </>
      )}
    </article>
  );
}
