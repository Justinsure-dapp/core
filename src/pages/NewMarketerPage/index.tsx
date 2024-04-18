import React, { useRef, useState } from "react";
import DocTitle from "../../common/DocTitle";
import { twMerge } from "tailwind-merge";
import useFormData from "../../hooks/useFormData";
import api from "../../utils/api";
import { useNavigate } from "react-router-dom";

export default function NewMarketerPage() {
  const [loading, setLoading] = useState(false);

  const [logo, setLogo] = useState("");
  const formRef = useRef() as React.MutableRefObject<HTMLFormElement>;

  useFormData(formRef, (data) => {
    setLoading(true);
    api.user
      .becomeMarketer(data.name, data.imageUrl)
      .then(() => {
        location.replace("/");
      })
      .finally(() => {
        setLoading(false);
      });
  });

  return (
    <>
      <DocTitle title="Register to sell Policies" />

      <form className="flex flex-col gap-y-4 p-page" ref={formRef}>
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
      </form>
    </>
  );
}
