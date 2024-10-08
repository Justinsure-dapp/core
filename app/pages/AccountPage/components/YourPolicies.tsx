import { useState } from "react";
import useModal from "../../../hooks/useModal";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useAccount, useReadContract } from "wagmi";
import useWeb3 from "../../../contexts/web3context";
import { Holder, Policy } from "../../../types";
import contractDefinitions from "../../../contracts";
import { Address } from "viem";
import moment from "moment";
import RequestClaimModal from "./RequestClaimModal";
import ClipboardWrapper from "../../../common/ClipboardWrapper";
import { formatEvmAddress } from "../../../utils";
import Icon from "../../../common/Icon";
import { toast } from "react-toastify";

export default function YourPolicies() {
  const [parent] = useAutoAnimate();
  const { address } = useAccount();
  const { policies } = useWeb3();
  const [viewMoreActive, setViewMoreActive] = useState(false);
  const [viewMoreClaimed, setViewMoreClaimed] = useState(false);

  const activePolicies: any[] = [];
  const claimedPolicies: any[] = [];

  policies?.map((p) => {
    p.holders.some((h) => {
      if (address === h.address) {
        activePolicies.push({
          ...p,
          holderDetails: h,
        });
      }
    });

    p.claims.some((c) => {
      if (address === c.address) {
        claimedPolicies.push({
          ...p,
          claimDetails: c,
        });
      }
    });
  });

  console.log({
    activePolicies,
    claimedPolicies,
  });

  return (
    <div className="flex flex-col">
      <div
        ref={parent}
        className="flex mt-10 gap-y-2 flex-col p-2 rounded-lg bg-mute/5 border border-border/20"
      >
        <div className="flex justify-between p-2 items-center">
          <div>
            <h1 className="text-2xl font-semibold">Active Policies</h1>
            <p className=" text-mute text-sm mt-1">
              These are your currently active policies, providing ongoing
              coverage based on the terms you selected. You can review their
              details and manage them as needed throughout the coverage period.
            </p>
          </div>
        </div>

        {activePolicies.length === 0 ? (
          <div className="flex justify-center items-center h-[20vh]">
            <h1 className="text-2xl font-semibold text-mute">
              Nothing to show..
            </h1>
          </div>
        ) : (
          activePolicies.map((policy, key) => {
            console.log(policy);

            return (
              (viewMoreActive || key < 2) && (
                <PolicyCard policy={policy} active={true} key={key} />
              )
            );
          })
        )}

        {activePolicies.length > 2 && (
          <button
            className="bg-background mr-2 hover:bg-zinc-900 border transition-all border-border w-max px-4 py-2 self-end text-front font-bold rounded-lg"
            onClick={() => setViewMoreActive(!viewMoreActive)}
          >
            {viewMoreActive ? "View Less" : "View More"}{" "}
          </button>
        )}
      </div>

      {/* Policies Claimed */}
      <div
        ref={parent}
        className="flex mt-10  gap-y-2 flex-col p-2 bg-mute/5 border border-border/20 rounded-lg"
      >
        <div className="flex justify-between p-2 items-center">
          <div>
            <h1 className="text-2xl font-semibold">Inactive Policies</h1>
            <h2 className=" text-mute text-sm mt-1">
              These are your inactive policies, which are no longer providing
              coverage as it might have expired or you have claimed it. You can
              review their details here.
            </h2>
          </div>
        </div>

        {claimedPolicies.length === 0 ? (
          <div className="flex justify-center items-center h-[20vh]">
            <h1 className="text-2xl font-semibold text-mute">
              Nothing to show..
            </h1>
          </div>
        ) : (
          claimedPolicies.map((policy, key) => {
            return (
              (viewMoreClaimed || key < 2) && (
                <PolicyCard policy={policy} key={key} active={false} />
              )
            );
          })
        )}

        {claimedPolicies.length > 2 && (
          <button
            className="bg-background mr-2 hover:bg-zinc-900 border transition-all border-border w-max px-4 py-2 self-end text-front font-bold rounded-lg"
            onClick={() => setViewMoreClaimed(!viewMoreClaimed)}
          >
            {viewMoreClaimed ? "View Less" : "View More"}{" "}
          </button>
        )}
      </div>
    </div>
  );
}

function PolicyCard({ policy, active }: { policy: any; active: boolean }) {
  const modal = useModal();
  const { address } = useAccount();

  const { data: isPolicyOwner } = useReadContract({
    ...contractDefinitions.insuranceController,
    address: policy.address as Address,
    functionName: "isPolicyOwner",
    args: [address as Address],
  });

  async function requestClaim() {
    const requestClaimData = {
      premiumFunctionDetails: {
        function: policy.premiumFunc,
        desc: policy.premiumFuncDescription,
        args: policy.premiumFuncArgs,
      },

      policyDetails: {
        address: policy.address,
        premium: policy.holderDetails.premium,
        status: policy.holderDetails.status,
        claimExpiry: policy.holderDetails.claimExpiry,
        args: policy.holderDetails.args,
      },

      claimFuctionDetails: {
        function: policy.claimFunc,
        desc: policy.claimFuncDescription,
        args: policy.claimFuncArgs,
      },
    };

    try {
      modal.show(<RequestClaimModal claimData={requestClaimData} />);
    } catch (error) {
      console.error(error);
      toast.error("Failed to request claim..");
    }
  }

  console.log({
    holderDetails: policy.holderDetails,
    claimDetails: policy.claimDetails,
  });

  return (
    <div className="bg-background m-2 rounded-lg flex flex-col p-4">
      <div className="flex gap-x-4">
        <img
          src={policy.image}
          className="border border-border/60 w-24 h-24 p-1 object-cover rounded-md"
        />
        <div className="flex flex-col w-full justify-between">
          <div className="flex justify-between gap-4 items-start w-full">
            <div>
              <h1 className="text-xl font-bold tracking-wide capitalize">
                {policy.name}
              </h1>
              <ClipboardWrapper
                textToBeCopied={policy.address}
                className="text-xs text-mute"
              >
                <p className="flex items-center gap-x-1 mt-1">
                  {formatEvmAddress(policy.address)}
                  <Icon icon="contentCopy" />
                </p>
              </ClipboardWrapper>
            </div>

            {active &&
              isPolicyOwner &&
              policy.holderDetails.status === "ongoing" && (
                <button
                  className="bg-background hover:bg-mute/5 border transition-all border-border px-4 py-2 text-front font-bold rounded-lg text-sm"
                  onClick={requestClaim}
                >
                  Request Claim
                </button>
              )}
          </div>

          {isPolicyOwner && active ? (
            <div className="flex gap-x-2 text-sm">
              <p className="border border-border px-3 py-1 rounded-2xl">
                Status:{" "}
                <span className="text-green-600 font-semibold">Ongoing</span>
              </p>
              {policy.holderDetails.claimExpiry && (
                <p className="border border-border px-3 py-1 rounded-2xl">
                  Expires:{" "}
                  <span className="text-red-500 font-semibold">
                    {moment(policy.holderDetails.claimExpiry).fromNow()}
                  </span>
                </p>
              )}
            </div>
          ) : (
            <div className="mt-2 text-sm">
              {policy.claimDetails &&
                policy.claimDetails?.status === "approved" && (
                  <div className="flex gap-x-2">
                    <p className="border border-border px-3 py-1 rounded-2xl">
                      Status:{" "}
                      <span className="text-green-600 font-bold">Claimed</span>
                    </p>
                    <p className="border border-border px-3 py-1 rounded-2xl">
                      Claimed:{" "}
                      <span className="font-bold text-yellow-700">
                        {moment(policy.claimDetails.approvedAt).fromNow()}
                      </span>
                    </p>
                    <p className="border border-border px-3 py-1 rounded-2xl">
                      Amount:{" "}
                      <span className="font-bold text-secondary">
                        ${policy.claimDetails.amount}
                      </span>
                    </p>
                  </div>
                )}

              {policy.claimDetails &&
                policy.holderDetails?.status === "expired" && (
                  <div className="flex gap-x-2">
                    <div className="border border-border px-3 py-1 rounded-2xl">
                      Status:{" "}
                      <span className="text-red-600 font-semibold">
                        Expired
                      </span>
                    </div>
                    <div className="border border-border px-3 py-1 rounded-2xl">
                      Expired:{" "}
                      <span className="font-bold text-yellow-700">
                        {moment(policy.holderDetails.claimExpiry).fromNow()}
                      </span>
                    </div>
                  </div>
                )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
