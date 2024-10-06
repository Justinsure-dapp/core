import React, { useState } from "react";
import { closestTimeUnit } from "../../../utils";
import Icon from "../../../common/Icon";
import { User } from "../../../types";

export default function PolicyHolders({
  holders,
}: {
  holders: User[] | undefined;
}) {
  const [showList, setShowFullList] = useState(5);
  const [searchText, setSearchText] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("Filter");

  const holderDetails = {
    address: "",
  };

  holders?.map((holder) => {
    holderDetails.address = holder.address;
  });

  const filteredPolicyHolders = holders
    ?.filter((holder) => {
      if (selectedFilter === "Ongoing") {
        return holder.status === 1;
      } else if (selectedFilter === "Claim Requested") {
        return holder.status === 2;
      } else if (selectedFilter === "Claimed") {
        return holder.status === 3;
      } else if (selectedFilter === "Expired") {
        return holder.status === 0;
      } else {
        return true;
      }
    })
    .filter((holder) =>
      holder.address.toLowerCase().includes(searchText.toLowerCase()),
    );

  const handleFilterChange = (e: any) => {
    setSelectedFilter(e.target.value);
  };

  return (
    <div className="bg-background p-4 mb-5 rounded-lg border border-front/20">
      <h1 className="text-lg font-bold">Policy Holders</h1>
      <div className="mt-4 w-full flex gap-x-3">
        <input
          type="text"
          placeholder="Search..."
          className="w-full bg-background border border-primary/50 px-4 py-2 rounded-lg focus-within:outline-none"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <select
          className="relative border border-primary/50 rounded-lg pr-2 pl-3 py-2  flex items-center gap-x-2 bg-background"
          value={selectedFilter}
          onChange={handleFilterChange}
        >
          <option value="Filter" disabled>
            Filter
          </option>
          <option value="All">All</option>
          <option value="Ongoing">Ongoing</option>
          <option value="Claim Requested">Claim Requested</option>
          <option value="Claimed">Claimed</option>
          <option value="Expired">Expired</option>
        </select>
      </div>
      <div className="mt-4 flex flex-col gap-y-4"></div>
    </div>
  );
}
