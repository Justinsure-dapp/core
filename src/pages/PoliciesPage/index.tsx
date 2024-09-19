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
      <article className="p-page">
        <div className="flex py-6 gap-x-4 items-center">
          <input
            className="bg-foreground p-4 rounded-xl w-full focus-within:outline-none focus-within:bg-background border-2 border-primary focus-within:border-opacity-80 border-opacity-0 duration-300 ease-in-out"
            placeholder="Search..."
          />
          <div className="flex items-center gap-x-2 border-2 p-4 border-foreground rounded-xl">
            <Icon icon="filter" className="text-2xl" />
            <span className="">Filter</span>
          </div>
        </div>
        <div className="flex flex-wrap justify-between gap-6">
          {!policies.loading &&
            policies.data &&
            policies.data.map((policy, key) => <PolicyCard policy={policy} />)}
        </div>
      </article>
    </>
  );
}
