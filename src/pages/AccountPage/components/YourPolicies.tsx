import React, { useState } from "react";
import { closestTimeUnit } from "../../../utils";

export default function YourPolicies() {
  const [viewMore, setViewMore] = useState(false);

  return (
    <div className="py-4 flex flex-col gap-y-8">
      <div className="flex justify-between items-end">
        <h1 className="text-xl font-bold tracking-wide">Your Policies</h1>
        <div className="flex flex-col gap-y-2 items-end">
          <p className="font-mono">SureCoin: 103.00</p>
          <button className="bg-primary text-back text-sm opacity-90 hover:opacity-100 duration-200 ease-in px-4 py-1 font-bold rounded-lg">
            Withdraw
          </button>
        </div>
      </div>
      <div className="flex gap-y-8 flex-col p-6 rounded-lg bg-primary/5">
        {policies.map(
          (policy, key) =>
            (viewMore || key < 2) && (
              <div
                className="bg-background rounded-lg flex flex-col p-4 border border-primary/25"
                key={key}
              >
                <div className="flex gap-x-4">
                  <img
                    src={policy.logoUrl}
                    className="w-[5vw] rounded-full h-max"
                  />
                  <div className="flex flex-col">
                    <h1 className="text-xl font-bold tracking-wide">
                      {policy.name}
                    </h1>
                    <p className="text-sm mt-1 font-light text-front/90">
                      {policy.description}
                    </p>
                    <div className="mt-2 self-end text-end w-full">
                      {policy.boughtAt + policy.duration - Date.now() < 0 ? (
                        <>
                          <p>
                            {" "}
                            Status:{" "}
                            {policy.claimed ? (
                              <span className="text-green-500">Claimed</span>
                            ) : (
                              <span className="text-red-500">Expired</span>
                            )}
                          </p>

                          <p className="">
                            Policy expired{" "}
                            <span className="text-red-500">
                              {closestTimeUnit(
                                Date.now() - policy.duration - policy.boughtAt
                              )}{" "}
                            </span>
                            ago{" "}
                          </p>
                        </>
                      ) : (
                        <div className="flex justify-between">
                          <button className="mt-2 bg-primary px-4 py-2 text-back font-bold rounded-lg text-sm">
                            Request Claim
                          </button>
                          <div className="flex flex-col">
                            <p className="text-sm">
                              Status:{" "}
                              <span className="text-orange-500">Ongoing</span>
                            </p>
                            <p className="text-sm">
                              Time Left:{" "}
                              {closestTimeUnit(
                                policy.boughtAt + policy.duration - Date.now()
                              )}{" "}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
        )}
        {policies.length > 2 &&
          <button
            className="bg-primary w-max px-4 py-2 self-end text-back font-bold rounded-lg -translate-y-2"
            onClick={() => setViewMore(!viewMore)}
          >
            {viewMore ? "View Less" : "View More"}{" "}
          </button>
        }
      </div>
    </div>
  );
}

const policies = [
  {
    name: "Home Insurance",
    marketer: "Insure",
    logoUrl:
      "https://png.pngtree.com/element_our/png/20181214/real-estate-house-logo-graphic-design-template-vector-illustration-png_269514.jpg",
    description:
      "Protect your home sweet home with our comprehensive home insurance coverage. From fire and theft to natural disasters and liability protection, our policies offer peace of mind knowing that your biggest investment is safeguarded. With customizable coverage options and dedicated customer support, we're here to ensure that your home remains a safe haven for you and your family.",
    boughtAt: 1029710000000,
    duration: 6848420000010,
    claimApproved: false,
    claimed: true,
  },
  {
    name: "Home Insurance",
    marketer: "Insure",
    logoUrl:
      "https://png.pngtree.com/element_our/png/20181214/real-estate-house-logo-graphic-design-template-vector-illustration-png_269514.jpg",
    description:
      "Protect your home sweet home with our comprehensive home insurance coverage. From fire and theft to natural disasters and liability protection, our policies offer peace of mind knowing that your biggest investment is safeguarded. With customizable coverage options and dedicated customer support, we're here to ensure that your home remains a safe haven for you and your family.",
    boughtAt: 1029710000000,
    duration: 68484200000,
    claimApproved: false,
    claimed: true,
  },
  {
    name: "Home Insurance",
    marketer: "Insure",
    logoUrl:
      "https://png.pngtree.com/element_our/png/20181214/real-estate-house-logo-graphic-design-template-vector-illustration-png_269514.jpg",
    description:
      "Protect your home sweet home with our comprehensive home insurance coverage. From fire and theft to natural disasters and liability protection, our policies offer peace of mind knowing that your biggest investment is safeguarded. With customizable coverage options and dedicated customer support, we're here to ensure that your home remains a safe haven for you and your family.",
    boughtAt: 1029710000000,
    duration: 6848420000010,
    claimApproved: false,
    claimed: true,
  },
];
