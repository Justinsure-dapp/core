import React, { useEffect, useState } from "react";
import DocTitle from "../../common/DocTitle";
import { twMerge } from "tailwind-merge";

export default function () {
  const [accessibility, setAccessibility] = useState({
    colorBlind: "None",
    magnifier: "Z 0",
  });

  const colorBlindSolutions = [
    "None",
    "Protanopia",
    "Deuteranopia",
    "Tritanopia",
    "Achromatopsia",
  ];
  const zSolutions = [
    "Z 0",
    "Z 1",
    "Z -1",
    "Z 2",
    "Z -2",
    "Z 3",
    "Z -3",
    "Z 4",
    "Z -4",
    "Z 5",
  ];

  useEffect(() => {
    const cnm = `${accessibility.colorBlind}`;

    const magnifier = Number(accessibility.magnifier.slice(1));
    //@ts-ignore
    document.body.style.zoom = String(1 + Number(magnifier) / 25);

    document.body.className = cnm;
  }, [accessibility]);

  return (
    <div>
      <DocTitle>Accessibility Settings</DocTitle>

      <section className="p-page mt-8">
        <h1 className="bg-yellow-200 px-3 py-1 rounded-sm text-yellow-800 font-medium">
          JustInsure is all about making policies accessible—so tweak your
          expereince and make it accessible to your needs !
        </h1>

        <h2 className="font-semibold mt-8 text-2xl">Color Blind Filters</h2>
        <div className="flex mt-4 border w-max border-red-200/30">
          {colorBlindSolutions.map((val, key) => (
            <button
              className={twMerge(
                "py-2 px-4 duration-200",
                accessibility.colorBlind == val &&
                  "duration-500 bg-orange-300 text-black",
              )}
              onClick={() => {
                setAccessibility((p) => ({ ...p, colorBlind: val }));
              }}
              key={key}
            >
              {val}
            </button>
          ))}
        </div>

        <h2 className="font-semibold mt-10 text-2xl">Magnifier</h2>
        <div className="flex mt-4 border w-max border-red-200/30">
          {zSolutions.map((val, key) => (
            <button
              className={twMerge(
                "py-2 px-4 duration-200",
                accessibility.magnifier == val &&
                  "duration-500 bg-orange-300 text-black",
              )}
              onClick={() => {
                setAccessibility((p) => ({ ...p, magnifier: val }));
              }}
              key={key}
            >
              {val}
            </button>
          ))}
        </div>

        <h2 className="font-semibold mt-10 text-2xl">Language</h2>
        <div className="relative w-full">
          <div id="google_translate_element" className="w-full" />
          <figure className="absolute bottom-0 w-full bg-background h-12" />
        </div>
      </section>
    </div>
  );
}
