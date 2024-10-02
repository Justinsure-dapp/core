import DocTitle from "../../common/DocTitle";
import { Link, Navigate } from "react-router-dom";
import Icon from "../../common/Icon";
import PolicyCard from "./components/PolicyCard";
import useApiResponse from "../../hooks/useApiResponse";
import api from "../../utils/api";
import { useAccount } from "wagmi";

export default function DashboardPage() {
  const { address } = useAccount();

  const { data: policies, loading } = useApiResponse(
    api.policy.fetchAllPoliciesByCreator,
    address?.toString() || ""
  );

  return (
    <section className="p-page py-4">
      <DocTitle title="Dashboard" />
      <h1 className="text-2xl font-semibold">Your Policies</h1>
      <div className="mt-4 w-full flex gap-x-4">
        <input
          type="text"
          placeholder="Search..."
          className="w-full bg-background border border-primary/50 px-4 py-2 rounded-lg focus-within:outline-none"
        />
        <button className="border border-primary/50 font-medium px-4 rounded-lg">
          Search
        </button>
      </div>
      <div className="mt-3 flex justify-between">
        <button className="border border-primary/50 rounded-lg px-4 py-2  flex items-center gap-x-6">
          Filter <Icon icon="expand_more" className="text-[1.5rem]" />{" "}
        </button>
        <Link
          to="/new-policy"
          className="bg-primary hover:bg-primary/80 transition-all text-back px-6 rounded-lg py-2 font-medium"
        >
          Create New Policy
        </Link>
      </div>
      <div className="flex flex-col gap-y-8 mt-4">
        {!loading && policies && policies?.length > 0 ? (
          <div className="flex flex-col gap-4">
            {policies
              ?.sort(
                (a, b) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime()
              )
              .map((policy, i) => <PolicyCard key={i} policy={policy} />)}
          </div>
        ) : (
          <div className="text-center text-front/60">
            You have not created any policies yet..{" "}
          </div>
        )}
      </div>
    </section>
  );
}
