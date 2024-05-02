import DocTitle from "../../common/DocTitle";
import YourPolicies from "./components/YourPolicies";

export default function AccountPage() {
  return (
    <article className="relative p-page">
      <DocTitle title="My Account" />
      <YourPolicies />
    </article>
  );
}
