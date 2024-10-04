import React, { useState } from "react";
import { closestTimeUnit } from "../../../utils";
import Icon from "../../../common/Icon";

export default function PolicyHolders({
  holders,
}: {
  holders: string[] | undefined;
}) {
  const [showList, setShowFullList] = useState(5);
  const [searchText, setSearchText] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("Filter");

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
    <div className="bg-background p-4 rounded-lg border border-front/20">
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
      <div className="mt-4 flex flex-col gap-y-4">
        <div className="flex flex-col gap-y-4 max-h-[55vh] overflow-y-scroll scrollbar-primary">
          {/* Display filtered policy holders */}
          {filteredPolicyHolders
            ?.slice(0, showList)
            .map((policyHolder, key) => (
              <div
                key={key}
                className="flex  items-center justify-between bg-secondary/10 border-secondary/20 border px-2 py-3 rounded-lg mobile:flex-col gap-y-2"
              >
                {/* Display policy holder details */}
                <div className="flex gap-x-2 w-1/3 mobile:w-full mobile:self-start">
                  <p className="bg-back text-center flex items-center px-2 rounded-md aspect-square">
                    {key + 1}
                  </p>
                  <h1 className="truncate">{policyHolder.address}</h1>
                </div>

                {policyHolder.status === 0 && (
                  <div className="bg-red-500/40 text-sm w-max px-4 rounded-2xl mobile:self-end">
                    Policy Expired:{" "}
                    <span className="font-bold underline">
                      {closestTimeUnit(-policyHolder.timeleft)}{" "}
                    </span>{" "}
                    ago
                  </div>
                )}
                {policyHolder.status === 1 && (
                  <div className="bg-green-500/40 text-sm px-4 rounded-2xl mobile:self-end">
                    Policy Ongoing for{" "}
                    <span className="font-bold underline">
                      {closestTimeUnit(policyHolder.timeleft)}{" "}
                    </span>{" "}
                    more
                  </div>
                )}

                {policyHolder.status === 2 && (
                  <div className="bg-red-700 text-sm px-4 rounded-2xl flex items-center gap-x-2 mobile:self-end">
                    <span className="whitespace-nowrap">Requires Action</span>
                    <Icon icon="info" />
                  </div>
                )}

                {policyHolder.status === 2 && (
                  <div className="bg-orange-500/40 text-sm px-4 rounded-2xl whitespace-nowrap mobile:self-end">
                    Requested Claim{" "}
                    <span className="font-bold underline">
                      {closestTimeUnit(policyHolder.timeleft)}{" "}
                    </span>{" "}
                    ago
                  </div>
                )}

                {policyHolder.status === 3 && (
                  <div className="bg-blue-500/40 text-sm px-4 rounded-2xl mobile:self-end">
                    Claimed{" "}
                    <span className="font-bold underline">
                      {closestTimeUnit(policyHolder.timeleft)}{" "}
                    </span>{" "}
                    ago
                  </div>
                )}
              </div>
            ))}
        </div>
        {showList <= 5 && (
          <button
            className="self-end py-2 px-3 rounded-lg text-back font-bold text-sm bg-primary"
            onClick={() => setShowFullList(filteredPolicyHolders?.length || 0)}
          >
            View More
          </button>
        )}
        {showList > 5 && (
          <button
            className="self-end py-2 px-3 rounded-lg text-back font-bold text-sm bg-primary"
            onClick={() => setShowFullList(5)}
          >
            View Less
          </button>
        )}
      </div>
    </div>
  );
}
