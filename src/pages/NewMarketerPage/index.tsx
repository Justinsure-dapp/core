import React, { useRef, useState } from "react";
import DocTitle from "../../common/DocTitle";
import { twMerge } from "tailwind-merge";
import api from "../../utils/api";
import { useWallet } from "@tronweb3/tronwallet-adapter-react-hooks";
import DataForm from "../../common/DataForm";

export default function NewMarketerPage() {
  const [loading, setLoading] = useState(false);
  const [logo, setLogo] = useState("");

  const formRef = useRef() as React.MutableRefObject<HTMLFormElement>;

  const { signMessage } = useWallet();

  return (
    <>
      <DocTitle title="Register to sell Policies" />

      <DataForm
        callback={async (data) => {
          setLoading(true);
          const signed = await signMessage(JSON.stringify({ ...data }));
          api.user
            .becomeMarketer(data.name, data.imageUrl, signed)
            .catch((err) => alert(err))
            .then(() => {
              location.replace("/");
            })
            .finally(() => {
              setLoading(false);
            });
        }}
        className="flex flex-col gap-y-4 p-page"
        ref={formRef}
      >
        <div className="flex mt-6 gap-x-16">
          <div className="flex flex-col gap-y-6 basis-3/4">
            <div className="flex flex-col gap-y-1">
              <h1 className="text-sm text-front/80">Marketing Name</h1>
              <input
                className="bg-background focus-within:outline-none px-3 py-3 border border-front/20 rounded-lg"
                placeholder="What name would you want to be known as"
                name="name"
              />
            </div>
            <div className="flex flex-col gap-y-1">
              <h1 className="text-sm text-front/80">Logo</h1>
              <input
                type="url"
                name="imageUrl"
                className="bg-background focus-within:outline-none px-3 py-3 border border-front/20 rounded-lg"
                placeholder="Provide logo url"
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
                e.currentTarget.src = "";
                setLogo(e.currentTarget.src);
              }}
              draggable={false}
              className="rounded-xl object-cover w-full h-full"
            />
          </div>
        </div>

        <div className="">
          <input
            type="submit"
            className="bg-secondary rounded-md py-2 px-6 cursor-pointer disabled:opacity-50 disabled:animate-pulse disabled:cursor-not-allowed"
            disabled={loading}
            value="Confirm"
          />
        </div>
      </DataForm>
    </>
  );
}
