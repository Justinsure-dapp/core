import DocTitle from "../../common/DocTitle";
import { Link } from "react-router-dom";
import Icon from "../../common/Icon";
import PolicyCard from "./components/PolicyCard";
import useApiResponse from "../../hooks/useApiResponse";
import api from "../../utils/api";
import { useAccount } from "wagmi";
import useSearchHook from "../../hooks/useSearchHook";

export default function DashboardPage() {
  const { address } = useAccount();

  const { data: policies, loading } = useApiResponse(
    api.policy.fetchAllPoliciesByCreator,
    address?.toString() || "",
  );

  const searchHook = useSearchHook(policies || [], ["name", "address", "description", "category", "tags"]);

  return (
    <section className="p-page py-4">

      <DocTitle title="Marketer Dashboard" />

      <h1 className="text-2xl font-semibold">Policies Created</h1>
      <h2 className=" text-mute font-semibold">
        Here are the policies created by you..
      </h2>
      <div className="mt-4 w-full flex gap-x-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchHook.searchQuery}
          onChange={(e) => searchHook.setSearchQuery(e.target.value)}
          className="w-full bg-background border border-primary/50 px-4 py-2 rounded-lg focus-within:outline-none"
        />
      </div>
      <div className="mt-3 flex justify-between">
        <button className="border border-primary/50 rounded-lg px-4 py-2  flex items-center gap-x-6">
          Filter <Icon icon="expand_more" className="text-[1.5rem]" />{" "}
        </button>
        <Link
          to="/new-policy"
          className="bg-primary hover:bg-primary/80 transition-all text-front px-6 rounded-lg py-2 font-medium"
        >
          Create New Policy
        </Link>
      </div>
      <div className="flex flex-col gap-y-8 mt-4">
        {searchHook.fuse.search(searchHook.debouncedSearchQuery).length == 0 ? (
          policies && policies.map((policy: any) => (
            <PolicyCard key={policy.address} policy={policy} />
          ))
        ) : (
          searchHook.fuse.search(searchHook.debouncedSearchQuery).map((policy: any) => (
            <PolicyCard key={policy.item.address} policy={policy.item} />
          ))
        )}
      </div>
    </section>
  );
}
