import React from "react";
import { Policy } from "../../../types";
import useApiResponse from "../../../hooks/useApiResponse";
import api from "../../../utils/api";
import marketer from "../../../utils/api/marketer";
import { formatEvmAddress } from "../../../utils";
import { Link } from "react-router-dom";
import useModal from "../../../hooks/useModal";
import StakeModal from "./StakeModal";

export default function Header({ policy }: { policy: Policy }) {
  const { data: user } = useApiResponse(api.user.get, policy.creator);
  const modal = useModal();

  return (
    <div className="relative flex flex-col justify-between gap-1 bg-foreground/50 px-6 py-4">
      <div className="flex w-full gap-4 rounded-md">
        <div className="w-full max-w-[10rem]">
          <img
            src={policy.image}
            className="aspect-square rounded-md object-cover"
            alt="Policy"
          />
        </div>
        <div className="flex w-full flex-col justify-between">
          <p className="absolute right-4 top-4 mt-2 h-max w-max rounded-xl border border-mute px-3 text-sm">
            Category: {policy.category}
          </p>
          <div className="flex flex-col">
            <h1 className="truncate whitespace-nowrap text-3xl font-bold tracking-wider">
              {policy.name}
            </h1>
            <p className="mt-1 text-sm text-front/60">
              {`${policy.description.slice(0, 200)}${policy.description.length > 200 ? "..." : ""}`}
            </p>
          </div>

          <div className="mt-2 flex gap-x-4">
            <img
              src={user?.marketer?.image}
              className="aspect-square w-12 rounded-full object-cover shadow-sm"
            />
            <div className="flex flex-col gap-y-1 text-sm">
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
          className="rounded-2xl border border-border bg-front px-4 py-1 font-semibold text-back transition-all hover:bg-front/80"
        >
          Buy Policy
        </Link>
        <button
          className="rounded-2xl border border-border bg-primary px-6 py-1 font-semibold text-front transition-all hover:bg-primary/80"
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
