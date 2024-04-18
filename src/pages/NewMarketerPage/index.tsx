import React, { useState } from "react";
import DocTitle from "../../common/DocTitle";
import { twMerge } from "tailwind-merge";

export default function NewMarketerPage() {
  const [logo, setLogo] = useState("");
  return (
    <>
      <DocTitle title="Register to sell Policies" />

      <div className="flex p-page mt-6 gap-x-16">
        <div className="flex flex-col gap-y-6 basis-3/4">
          <div className="flex flex-col gap-y-1">
            <h1 className="text-sm text-front/80">Company Name</h1>
            <input
              className="bg-background focus-within:outline-none px-3 py-3 border border-front/20 rounded-lg"
              placeholder="Provide your Company'ss name"
            />
          </div>
          <div className="flex flex-col gap-y-1">
            <h1 className="text-sm text-front/80">Company Logo</h1>
            <input
              type="url"
              className="bg-background focus-within:outline-none px-3 py-3 border border-front/20 rounded-lg"
              placeholder="Provide Company's logo url"
              onChange={(e) => setLogo(e.target.value)}
            />
          </div>
        </div>
        <div
          className={twMerge(
            "bg-secondary/20 rounded-xl basis-1/4 flex items-center justify-center aspect-square",
            !logo && "animate-pulse"
          )}
        >
          <img
            src={logo}
            onError={(e) => {
              e.currentTarget.src =
                "";
              setLogo(e.currentTarget.src);
            }}
            draggable={false}
            className="rounded-xl object-cover w-full"
          />
        </div>
      </div>
    </>
  );
}
