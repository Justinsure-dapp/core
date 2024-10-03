import Icon from "../../common/Icon";
import DocTitle from "../../common/DocTitle";
import PolicyCard from "./components/PolicyCard";
import useWeb3 from "../../contexts/web3context";

export default function PoliciesPage() {
  const { policies } = useWeb3();

  return (
    <>
      <DocTitle title="Policies on JustInsure" />
      <article className="p-page w-full">
        <div className="flex py-6 gap-x-4 items-center">
          <input
            className="bg-foreground px-4 py-2 rounded-md w-full focus-within:outline-none focus-within:bg-background border-2 border-primary focus-within:border-opacity-80 border-opacity-0 duration-300 ease-in-out"
            placeholder="Search..."
          />
          <div className="flex items-center gap-x-2 border-2 px-4 py-2 border-foreground rounded-md">
            <Icon icon="filter" className="text-2xl text-mute" />
            <span className="text-mute">Filter</span>
          </div>
        </div>
        <div className="grid gap-6 mb-8 w-full widescreen:grid-cols-2">
          {policies &&
            policies.map((policy: any) => (
              <PolicyCard key={policy.address} policy={policy} />
            ))}
        </div>
      </article>
    </>
  );
}
