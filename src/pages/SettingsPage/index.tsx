import DocTitle from "../../common/DocTitle";
import { Link } from "react-router-dom";
import useWeb3 from "../../contexts/web3context";

export default function SettingsPage() {
  const { user } = useWeb3();

  return (
    <>
      <DocTitle title="Settings" />
      <div className="flex flex-col gap-y-2 py-4 p-page">
        {!user?.marketer && (
          <div className="flex gap-x-3">
            <p>Do you wish to become a marketer on JustInsure?</p>
            <Link
              to="/new-marketer"
              className="text-primary underline hover:no-underline"
            >
              Click here
            </Link>
          </div>
        )}

        {user?.marketer && (
          <div className="bg-secondary/40 w-full rounded-md p-3 text-sm">
            <b>Note : </b> Marketer mode is enabled, you can list your own
            policies on the platform.
          </div>
        )}
      </div>
    </>
  );
}
