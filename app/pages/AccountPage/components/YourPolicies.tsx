import { useState } from "react";
import useModal from "../../../hooks/useModal";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useAccount, useReadContract } from "wagmi";
import useWeb3 from "../../../contexts/web3context";
import { Policy } from "../../../types";
import contractDefinitions from "../../../contracts";
import { Address } from "viem";
import moment from "moment";
import RequestClaimModal from "./RequestClaimModal";
import ClipboardWrapper from "../../../common/ClipboardWrapper";
import { formatEvmAddress } from "../../../utils";
import Icon from "../../../common/Icon";

export default function YourPolicies() {
  const [parent] = useAutoAnimate();
  const { address } = useAccount();
  const { policies } = useWeb3();
  const [viewMoreActive, setViewMoreActive] = useState(false);
  const [viewMoreClaimed, setViewMoreClaimed] = useState(false);

  const activePolicies: object[] = [];
  const claimedPolicies: object[] = [];

  const data = []

  policies?.map(p => {
    p.holders.some(h => {
      if (address === h.address) {
        data.push(h);
      }
    })
  })

  return (
    <div className="flex flex-col p-page">
      {/* Policies Owned */}
      <div ref={parent}
        className="flex mt-10 gap-y-2 flex-col p-2 rounded-lg bg-secondary/10 border border-border/20">
        <div className="flex justify-between m-2 mx-4 items-center">
          <div>
            <h1 className="text-2xl font-semibold">Active Policies</h1>
            <h2 className=" text-mute font-semibold">
              Here are the policies currently active..
            </h2>
          </div>
        </div>

        {(activePolicies.length === 0) ? (
          <div className="flex justify-center items-center h-[20vh]">
            <h1 className="text-2xl font-semibold text-mute">
              Nothing to show..
            </h1>
          </div>
        ) : (activePolicies.map(
          (policy, key) => {
            const details = user?.policiesOwned.find((p) =>
              (p.address === policy.address) && (p.status !== "Claimed"));

            return (
              (viewMoreActive || key < 2) && (
                <PolicyCard policy={policy} details={details} active={true} key={key} />
              )
            )
          }
        ))}

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
        className="flex mt-10 gap-y-2 flex-col p-2 rounded-lg bg-secondary/10 border border-border/20"
      >
        <div className="flex justify-between m-2 mx-4 items-center">
          <div>
            <h1 className="text-2xl font-semibold">Inactive Policies</h1>
            <h2 className=" text-mute font-semibold">
              Here are the policies from the past..
            </h2>
          </div>
        </div>

        {(claimedPolicies.length === 0) ? (
          <div className="flex justify-center items-center h-[20vh]">
            <h1 className="text-2xl font-semibold text-mute">
              Nothing to show..
            </h1>
          </div>
        ) : claimedPolicies.map(
          (policy, key) => {
            const details = user?.policiesOwned.find((p) =>
              (p.address === policy.address) && (p.status === "Claimed"));

            return (
              (viewMoreClaimed || key < 2) && (
                <PolicyCard policy={policy} key={key} details={details} active={false} />
              )
            )
          }
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

function PolicyCard({ policy, details, active }: {
  policy: Policy, details: {
    address: string;
    premium: number;
    claimExpiry: Date;
    args: object;
    status: string;
  } | undefined;
  active: boolean;
}) {
  const modal = useModal();
  const { address } = useAccount();

  const { data: isPolicyOwner } = useReadContract({
    ...contractDefinitions.insuranceController,
    address: policy.address as Address,
    functionName: "isPolicyOwner",
    args: [address as Address],
  });

  const claimData = policy.claims.find((claim) => claim.address === address);

  async function handleSubmit() {
    const claimData = {
      premiumFunctionDetails: {
        function: policy.premiumFunc,
        desc: policy.premiumFuncDescription,
        args: policy.premiumFuncArgs,
      },

      policyDetails: {
        address: details?.address,
        premium: details?.premium,
        status: details?.status,
        claimExpiry: details?.claimExpiry,
        args: details?.args,
      },

      claimFuctionDetails: {
        function: policy.claimFunc,
        desc: policy.claimFuncDescription,
        args: policy.claimFuncArgs,
      },
    };

    try {
      modal.show(<RequestClaimModal claimData={claimData} />);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="bg-background m-2 rounded-lg flex flex-col p-4 border border-border/50">
      <div className="flex gap-x-4">
        <img
          src={policy.image}
          className="border border-border w-24 h-24 p-2 object-cover rounded-full"
        />
        <div className="flex flex-col w-full">
          <div className="flex justify-between gap-4 items-start w-full">
            <div>
              <h1 className="text-xl font-bold tracking-wide">{policy.name}</h1>
              <ClipboardWrapper
                textToBeCopied={policy.address}
                className="text-xs text-mute"
              >
                <p className="flex items-center gap-x-1">
                  {formatEvmAddress(policy.address)}
                  <Icon icon="contentCopy" />
                </p>
              </ClipboardWrapper>
            </div>

            {(isPolicyOwner && details?.status !== "Claimed") && (
              <button
                className="bg-background hover:bg-zinc-900 border transition-all border-border px-4 py-2 text-front font-bold rounded-lg text-sm"
                onClick={handleSubmit}
              >
                Request Claim
              </button>
            )}
          </div>

          {(isPolicyOwner && active) ? (
            <div className="flex flex-col mt-2 text-sm">
              <p className="">
                Status:{" "}
                <span className="text-cyan-500 font-semibold">ongoing</span>
              </p>
              {details?.claimExpiry && (
                <p className="mt-1">
                  Expires:{" "}
                  <span className="text-red-500 font-semibold">
                    {moment(details?.claimExpiry).fromNow()}
                  </span>
                </p>
              )}
            </div>
          ) : (
            <div className="mt-2 text-sm">
              {details?.status === "Claimed" && (
                <div>
                  <p className="">
                    Status: {" "}<span className="text-green-600 font-semibold">claimed</span>
                  </p>

                  <p className="">
                    Amount: {" "}<span className="text-green-600 font-semibold">{claimData?.amount}</span>
                  </p>
                </div>
              )}

              {details?.status === "Expired" && (
                <p className="">
                  Status: {" "}<span className="text-red-600 font-semibold">expired</span>
                </p>
              )}
            </div>
          )}

          <p className="text-sm mt-1 font-light text-front/90">
            <span>Description:</span>{" "}
            <span className="font-semibold">{policy.description}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
