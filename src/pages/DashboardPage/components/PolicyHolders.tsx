import React, { useState } from "react";
import { closestTimeUnit } from "../../../utils";
import Icon from "../../../common/Icon";

export default function PolicyHolders() {
  const [showList, setShowFullList] = useState(5);
  const [searchText, setSearchText] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("Filter");

  const filteredPolicyHolders = policyHolders
    .filter((policyHolder) => {
      if (selectedFilter === "Ongoing") {
        return policyHolder.status === 1;
      } else if (selectedFilter === "Claim Requested") {
        return policyHolder.status === 2;
      } else if (selectedFilter === "Claimed") {
        return policyHolder.status === 3;
      } else if (selectedFilter === "Expired") {
        return policyHolder.status === 0;
      } else {
        return true;
      }
    })
    .filter((policyHolder) =>
      policyHolder.address.toLowerCase().includes(searchText.toLowerCase())
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
          {filteredPolicyHolders.slice(0, showList).map((policyHolder, key) => (
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
            onClick={() => setShowFullList(filteredPolicyHolders.length)}
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

const policyHolders = [
  {
    address: "0x7a9F84bF36b3953e2cB2a589F874dAB9d3E9b7aC",
    status: 2,
    timeleft: 82468751,
  },
  {
    address: "0x5Cf12dA9B13a421628a8f8f4eF69B6e99E4b24E1",
    status: 0,
    timeleft: -52163792,
  },
  {
    address: "0x32dFfC1A2e31a2dAFAdcE978ac4651d07689b7f2",
    status: 1,
    timeleft: 39284766,
  },
  {
    address: "0xB20A5816f28F7D4461C4Fd641F35e6125dCd52A7",
    status: 3,
    timeleft: 96712843,
  },
  {
    address: "0x9a7f8B52f125d5E87a23DE7E1117d6c41Fe9513c",
    status: 0,
    timeleft: -70948219,
  },
  {
    address: "0xE71f6C1D82A1522e8C7d3C1Fa3E1F6F08Fb41d74",
    status: 2,
    timeleft: 63019428,
  },
  {
    address: "0xD54A7C0Aa3a33F1b327178d64B2F9B67e4C62312",
    status: 1,
    timeleft: 18739204,
  },
  {
    address: "0x2c0f97cfa6F3429EF9B5Dee11851C34C62151D30",
    status: 3,
    timeleft: 54123987,
  },
  {
    address: "0xA3b6D4e3E3a7C0B1DeB1eB363f80172973EdD709",
    status: 0,
    timeleft: -39817263,
  },
  {
    address: "0x6e54b5Ce8C31b90F6b2cF8478676Bf92AdF4eA14",
    status: 2,
    timeleft: 34872619,
  },
  {
    address: "0x4b9813e682693c6E548B32F5cD4B0A4B8D973324",
    status: 1,
    timeleft: 92837204,
  },
  {
    address: "0x3aD724d2901Af36E12523cC98B44a8EF8Daa5e95",
    status: 0,
    timeleft: -27183924,
  },
  {
    address: "0xfA62c817AD8B249122A3453C9fC0ea8fC4aFC02A",
    status: 3,
    timeleft: 63218493,
  },
  {
    address: "0x9f87cD781c56dA27Ba43A7f8F8E45FbB27B5Df3B",
    status: 0,
    timeleft: -61329482,
  },
  {
    address: "0x8bEa71Ab1E88e186F0B320ED47fC4a7e78C68F13",
    status: 2,
    timeleft: 74182904,
  },
  {
    address: "0x7d6Ec99a17E9bD51a69CD1C2Ec7AD13551f8723D",
    status: 1,
    timeleft: 50943284,
  },
  {
    address: "0x5Dd56a12321fCA9A412649a30D4f125F9279cBc2",
    status: 3,
    timeleft: 92384217,
  },
  {
    address: "0x4e83267A5a1a641Fc4C1C95Dd1d4FEB3E6525cB8",
    status: 0,
    timeleft: -80236194,
  },
  {
    address: "0xEc4d91a416A6C9Ee7C29c8187691056EddA2B514",
    status: 2,
    timeleft: 62749185,
  },
  {
    address: "0x23fD938d1d2fA68aF3Db79B2aDfA6d36Ff3e5D4f",
    status: 1,
    timeleft: 80263948,
  },
];
