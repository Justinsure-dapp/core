import { useState } from "react";
import useModal from "../../../hooks/useModal";
import RequestClaimModal from "./RequestClaimModal";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useAccount, useReadContract } from "wagmi";
import useWeb3 from "../../../contexts/web3context";
import { Policy } from "../../../types";
import contractDefinitions from "../../../contracts";
import { Address } from "viem";
import moment from "moment";
import ClaimCalculationModal from "./ClaimCalculationModal";

export default function YourPolicies() {
  const [viewMore, setViewMore] = useState(false);
  const [parent] = useAutoAnimate();
  const { address } = useAccount();
  const { policies } = useWeb3();

  const ownedPolicies = policies?.filter((p) => p.holders.includes(address as string)) || [];

  return (
    <div className="flex flex-col p-page">
      <div
        ref={parent}
        className="flex mt-10 gap-y-2 flex-col p-2 rounded-lg bg-secondary/10 border border-border/20"
      >
        <div className="flex justify-between m-2 mx-4 items-center">
          <div>
            <h1 className="text-2xl font-semibold">Policies Owned</h1>
            <h2 className=" text-mute font-semibold">
              Here are the policies owned by you..
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <p className="font-mono font-semibold">
              {/* SureCoin: {balance?.toString()} */}
            </p>
            <button className="bg-primary text-back text-sm opacity-80 hover:opacity-100 duration-100 ease-in px-4 border border-border py-2 font-bold rounded-lg">
              Withdraw
            </button>
          </div>
        </div>

        {ownedPolicies.length === 0 && (
          <div className="flex justify-center items-center h-[20vh]">
            <h1 className="text-2xl font-semibold text-mute">Nothing to show..</h1>
          </div>
        )}

        {ownedPolicies.map(
          (policy, key) =>
            (viewMore || key < 2) && (
              <PolicyCard policy={policy} key={key} />
            ),
        )}
        {ownedPolicies.length > 2 && (
          <button
            className="bg-background mr-2 hover:bg-zinc-900 border transition-all border-border w-max px-4 py-2 self-end text-back font-bold rounded-lg"
            onClick={() => setViewMore(!viewMore)}
          >
            {viewMore ? "View Less" : "View More"}{" "}
          </button>
        )}
      </div>
    </div>
  );
}

function PolicyCard({ policy }: { policy: Policy }) {
  const modal = useModal();
  const { address } = useAccount();
  const { user } = useWeb3();

  const { data: isPolicyOwner } = useReadContract({
    ...contractDefinitions.insuranceController,
    address: policy.address as Address,
    functionName: "isPolicyOwner",
    args: [address as Address],
  });

  const details = user?.policiesOwned.find(
    (p) => p.address === policy.address,
  )

  if (!isPolicyOwner) return null;

  async function handleSubmit() {
    const claimData = {
      premiumFunctionDetails: {
        function: policy.premiumFunc,
        desc: policy.premiumFuncDescription,
        args: policy.premiumFuncArgs,
      },

      policyDetails: {
        premium: details?.premium,
        status: details?.status,
        claimExpiry: details?.claimExpiry,
        args: details?.args,
      },

      claimFuctionDetails: {
        function: policy.claimFunc,
        desc: policy.claimFuncDescription,
        args: policy.claimFuncArgs,
      }
    };

    try {
      modal.show(<ClaimCalculationModal data={claimData} />);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div
      className="bg-background m-2 rounded-lg flex flex-col p-4 border border-border/50"
    >
      <div className="flex gap-x-4">
        <img
          src={policy.image}
          className="w-[5vw] border border-border p-2 rounded-full h-max mobile:w-[15vw]"
        />
        <div className="flex flex-col w-full">
          <div className="flex justify-between gap-4 items-start w-full">
            <div>
              <h1 className="text-xl font-bold tracking-wide">
                {policy.name}
              </h1>
              <p className="text-sm mt-1 font-light text-front/90">
                {policy.description}
              </p>
            </div>

            <button
              className="bg-background hover:bg-zinc-900 border transition-all border-border px-4 py-2 text-back font-bold rounded-lg text-sm"
              onClick={handleSubmit}
            >
              Request Claim
            </button>
          </div>

          {details?.status !== "Ongoing" ? (
            <div className="mt-2 text-sm">
              <p className="">
                {" "}
                Status:{" "}
                {details?.status === "Claimed" ? (
                  <span className="text-green-600">claimed</span>
                ) : (
                  <span className="text-red-600">expired</span>
                )}
              </p>

              {details?.claimExpiry && (
                <p className="mt-1">
                  Expired: {" "}
                  <span className="text-cyan-500">
                    {moment(details?.claimExpiry).format("DD/MM/YYYY")}
                  </span>
                </p>
              )}
            </div>
          ) : (
            <div className="flex flex-col mt-2 text-sm">
              <p className="">
                Status:{" "}
                <span className="text-green-600 font-bold">ongoing</span>
              </p>
              {details?.claimExpiry && (
                <p className="mt-1">
                  Expires:{" "}
                  <span className="text-cyan-500 font-bold">
                    {moment(details?.claimExpiry).fromNow()}
                  </span>
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}