import DocTitle from "../../common/DocTitle";
import YourPolicies from "./components/YourPolicies";

export default function AccountPage() {
  return (
    <article className="p-page relative">
      <DocTitle title="My Account" />
      <YourPolicies />
    </article>
  );
}
