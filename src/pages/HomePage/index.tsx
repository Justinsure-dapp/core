import React from "react";
import { Helmet } from "react-helmet";
import DocTitle from "../../common/DocTitle";

export default function HomePage() {
  return (
    <>
      <DocTitle title="Home" />

      <div className="p-page py-8">
        <div className="flex gap-6">
          <article className="flex flex-col w-1/4 bg-pink-200 rounded-lg h-[60vh]"></article>
          <div className="flex flex-col w-3/4 gap-6">
            <article className="bg-secondary rounded-lg overflow-b-hidden flex">
              <img
                src="/images/soparu.webp"
                alt="sopo mascot"
                className="w-1/4 scale-125 -translate-y-3"
              />
              <div className="py-4 flex flex-col gap-y-5 px-4">
                <p className="flex items-start font-medium text-3xl">
                  Surity Early Access
                  <span className="text-sm pl-1 font-normal">* testnet</span>
                </p>

                <p className="text-sm">
                  You are one of the earliest people to have arrived here
                  <br />
                  We would really appreciate if you could take out some time to
                  fill out a survey
                </p>

                <figure className="flex-1" role="separator" />

                <div className="flex">
                  <button className="bg-background px-6 py-2 rounded-md font-medium">
                    Take Survey
                  </button>
                </div>
              </div>
            </article>

            <article className="bg-gradient-to-br relative from-violet-400 via-blue-800-200 to-green-600 flex-1 w-full rounded-lg flex justify-center items-center">
              <div className="absolute-cover z-1 bg-gradient-to-bl from-white/30 to-white/40 via-transparent" />

              <div className="relative z-10 bg-red-100 rounded-full flex items-center gap-x-1 text-tron-red px-5">
                Powered By
                <img src="/icons/tron.svg" alt="tron" className="h-[2em]" />
                Tron
              </div>
            </article>
          </div>
        </div>
      </div>
    </>
  );
}
