import React, { useState } from "react";
import { closestTimeUnit } from "../../../utils";
import Icon from "../../../common/Icon";
import { User } from "../../../types";

export default function PolicyHolders({
  holders,
  policyAddress,
}: {
  holders: User[] | undefined;
  policyAddress: string;
}) {
  const [showList, setShowFullList] = useState(5);
  const [searchText, setSearchText] = useState("");

  return (
    <div>
      <div className="mb-5 border-t border-front/20 pt-3 mt-1">
        <h1 className="text-lg font-bold">Policy Holders</h1>
        <div className="mt-2 w-full flex gap-x-3">
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-background border border-primary/50 px-4 py-1 rounded-md focus-within:outline-none"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}