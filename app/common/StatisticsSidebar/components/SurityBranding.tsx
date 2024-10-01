import React from "react";

export default function SurityBranding() {
  return (
    <div className="flex flex-col items-center my-10 opacity-20">
      {[
        "J",
        "U",
        "S",
        "T",
        "I",
        "N",
        "S",
        "U",
        "R",
        "E",
        " ",
        " ",
        " ",
        " ",
        "J",
        "U",
        "S",
        "T",
        "I",
        "N",
        "S",
        "U",
        "R",
        "E",
        " ",
        " ",
        " ",
        " ",
        "J",
        "U",
        "S",
        "T",
        "I",
        "N",
        "S",
        "U",
        "R",
        "E",
      ]
        .toReversed()
        .map((word, key) => (
          <div className="-rotate-90 text-[1.26vw] -my-1 font-bold" key={key}>
            {word}
          </div>
        ))}
    </div>
  );
}
