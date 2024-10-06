import Icon from "../../common/Icon";
import DocTitle from "../../common/DocTitle";
import PolicyCard from "./components/PolicyCard";
import useWeb3 from "../../contexts/web3context";
import useSearchHook from "../../hooks/useSearchHook";

export default function PoliciesPage() {
  const { policies } = useWeb3();
  const searchHook = useSearchHook(policies || [], [
    "name",
    "address",
    "description",
    "category",
    "tags",
  ]);

  return (
    <>
      <DocTitle title="All Policies" />
      <article className="p-page w-full">
        <div className="flex py-6 gap-x-4 items-center">
          <input
            className="bg-foreground px-4 py-2 rounded-md w-full focus-within:outline-none focus-within:bg-background border-2 border-primary focus-within:border-opacity-80 border-opacity-0 duration-300 ease-in-out"
            placeholder="Search..."
            value={searchHook.searchQuery}
            onChange={(e) => searchHook.setSearchQuery(e.target.value)}
          />
          <div className="flex items-center gap-x-2 border-2 px-4 py-2 border-foreground rounded-md">
            <Icon icon="filter" className="text-2xl text-mute" />
            <span className="text-mute">Filter</span>
          </div>
        </div>
        <div className="grid gap-6 mb-8 w-full widescreen:grid-cols-2">
          {searchHook.fuse.search(searchHook.debouncedSearchQuery).length == 0
            ? policies &&
              policies.map((policy: any) => (
                <PolicyCard key={policy.address} policy={policy} />
              ))
            : searchHook.fuse
                .search(searchHook.debouncedSearchQuery)
                .map((policy: any) => (
                  <PolicyCard key={policy.item.address} policy={policy.item} />
                ))}
        </div>
      </article>
    </>
  );
}
