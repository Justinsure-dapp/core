import React, { useState } from "react";
import { closestTimeUnit } from "../../../utils";
import Icon from "../../../common/Icon";
import { Holder, User } from "../../../types";
import useUsdjHook from "../../../hooks/useUsdj";
import moment from "moment";

export default function PolicyHolders({
  holders,
}: {
  holders: Holder[];
}) {
  const [showList, setShowFullList] = useState(2);
  const [searchText, setSearchText] = useState("");
  const usdjHook = useUsdjHook();

  return (
    <div className="mb-8">
      <div className="border-t mb-4 border-front/20 pt-3 mt-1">
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

      {holders.slice(0, showList).map((holder, key) => (
        <div key={key}>
          <div className="border border-border p-4 rounded-xl text-sm">
            <p className="mb-2"><strong>Address:</strong> {holder.address}</p>
            <p className="mb-2"><strong>Premium:</strong> ${usdjHook.divideByDecimals(BigInt(holder.premium))}</p>
            <p className=""><strong>Expiry:</strong> {moment(holder.claimExpiry).format("DD/MM/YYYY")}</p>
          </div>
        </div>
      ))}

      {showList < holders.length && (
        <button
          className="mt-4 px-4 py-2 bg-primary text-white rounded-md"
          onClick={() => setShowFullList((prev) => prev + 2)}
        >
          View More
        </button>
      )}
    </div>
  );
}