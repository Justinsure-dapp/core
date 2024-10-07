import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import Icon from "../../../common/Icon";
import TradingViewOverview from "../../../common/TradingViewOverview";

export default function Chart() {
  const [chartType, setChartType] = useState<"candlesticks" | "area">("area");

  return (
    <div className="h-full border border-mute/30 rounded-md overflow-hidden relative w-2/3">
      <div className="absolute top-2 right-4">
        <div className="relative text-2xl flex border border-secondary/50 rounded bg-foreground p-1 overflow-hidden gap-x-2">
          <figure
            className={twMerge(
              "absolute z-1 bg-secondary mix-blend-difference h-full w-1/2 top-0 duration-300",
              chartType === "area" && "left-0 translate-x-0",
              chartType === "candlesticks" && "left-full -translate-x-full"
            )}
          />

          <button
            onClick={() => {
              setChartType("area");
            }}
          >
            <Icon icon="showChart" />
          </button>

          <button
            onClick={() => {
              setChartType("candlesticks");
            }}
          >
            <Icon icon="candlestickChart" />
          </button>
        </div>
      </div>

      <TradingViewOverview
        className="aspect-video translate-y-[8%]"
        symbol="BINANCE:BTTCUSDT|1M"
        chartType={chartType}
        key={chartType}
      />
    </div>
  );
}
