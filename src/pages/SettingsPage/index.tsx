import React from "react";
import DocTitle from "../../common/DocTitle";
import { Link } from "react-router-dom";

export default function SettingsPage() {
  return (
    <>
      <DocTitle title="Settings" />
      <div className="flex flex-col gap-y-2 py-4 p-page">
        <div className="flex gap-x-3">
          <p>Do you wish to become a marketer on Surity?</p>
          <Link
            to="/new-marketer"
            className="text-primary underline hover:no-underline"
          >
            Click here
          </Link>
        </div>
      </div>
    </>
  );
}
