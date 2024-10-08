import React from "react";
import { Policy } from "../../../types";
import useApiResponse from "../../../hooks/useApiResponse";
import api from "../../../utils/api";
import marketer from "../../../utils/api/marketer";
import { formatEvmAddress } from "../../../utils";
import { Link } from "react-router-dom";
import useModal from "../../../hooks/useModal";
import StakeModal from "./StakeModal";

export default function Header1({ policy }: { policy: Policy }) {
  const { data: user } = useApiResponse(api.user.get, policy.creator);
  const modal = useModal();

  return (
    <div className="flex flex-col gap-1 bg-foreground/50 px-6 py-4 relative justify-between">
      <div className="w-full  gap-4 rounded-md flex ">
        <div className="max-w-[10rem] w-full">
          <img
            src={policy.image}
            className="border border-border aspect-square object-cover rounded-md"
            alt="Policy"
          />
        </div>
        <div className="flex flex-col w-full justify-between">
          <p className="border border-mute w-max px-3 mt-2 rounded-xl text-sm h-max absolute top-4 right-4 ">
            Category: {policy.category}
          </p>
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold tracking-wider truncate whitespace-nowrap">
              {policy.name}
            </h1>
            <p className="text-sm text-front/60 mt-1">
              {`${policy.description.slice(0, 200)}${policy.description.length > 200 ? "..." : ""}`}
            </p>
          </div>

          <div className="flex gap-x-4 mt-2">
            <img
              src={user?.marketer?.image}
              className="w-12 shadow-sm rounded-full aspect-square object-cover"
            />
            <div className="text-sm flex flex-col gap-y-1">
              <p>Marketer: {user?.marketer?.name}</p>
              <p className="text-xs">
                {user && formatEvmAddress(user?.address)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 right-4 flex gap-x-2">
        <Link
          to={`/buy-policy/${policy.address}`}
          className="bg-front hover:bg-front/80 transition-all text-back px-4 rounded-2xl border border-border py-1 font-semibold"
        >
          Buy Policy
        </Link>
        <button
          className="bg-primary border border-border hover:bg-primary/80 transition-all text-front px-6 rounded-2xl py-1 font-semibold"
          onClick={() => {
            modal.show(<StakeModal policy={policy} />);
          }}
        >
          Stake
        </button>
      </div>
    </div>
  );
}
