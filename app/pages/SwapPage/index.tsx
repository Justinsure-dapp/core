import React from "react";
import Chart from "./components/Chart";
import Swap from "./components/Swap";

export default function () {
  return (
    <div className="flex gap-x-2 p-2">
      <Chart />
      <Swap />
    </div>
  );
}
