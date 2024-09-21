import React, { useEffect, useState } from "react";
import Icon from "../../common/Icon";
import StarRating from "../../common/StarRating";
import { Link } from "react-router-dom";
import DocTitle from "../../common/DocTitle";
import useApiResponse from "../../hooks/useApiResponse";
import api from "../../utils/api";
import PolicyCard from "./components/PolicyCard";

export default function PoliciesPage() {
  const policies = useApiResponse(api.policy.fetchAllPolicies);

  return (
    <>
      <DocTitle title="Policies on JustInsure" />
      <article className="p-page w-full">
        <div className="flex py-6 gap-x-4 items-center">
          <input
            className="bg-foreground px-4 py-2 rounded-md w-full focus-within:outline-none focus-within:bg-background border-2 border-primary focus-within:border-opacity-80 border-opacity-0 duration-300 ease-in-out"
            placeholder="Search..."
          />
          <div className="flex items-center gap-x-2 border-2 px-4 py-2 border-foreground rounded-md">
            <Icon icon="filter" className="text-2xl text-mute" />
            <span className="text-mute">Filter</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-6 w-full">
          {!policies.loading &&
            policies.data &&
            policies.data.map((policy, key) => (
              <PolicyCard policy={policy} className="w-[calc(50%_-_7px)]" />
            ))}
        </div>
      </article>
    </>
  );
}
