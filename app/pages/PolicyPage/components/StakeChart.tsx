import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import useApiResponse from "../../../hooks/useApiResponse";
import api from "../../../utils/api";
import { Policy } from "../../../types";
import { isAddress } from "viem";
import { ApexOptions } from "apexcharts"; // Importing correct types
import useUsdjHook from "../../../hooks/useUsdj";

export default function StakeChart({ policy }: { policy: Policy }) {
  if (!isAddress(policy.address)) return <></>;

  const feed = useApiResponse(api.policy.getStakeHistory, policy.address);
  const usdj = useUsdjHook();

  console.log(feed.data);

  const [chartData, setChartData] = useState<{
    series: { name: string; data: { x: Date; y: number }[] }[];
    options: ApexOptions;
  }>({
    series: [{ name: "Stake", data: [] }],
    options: {
      chart: {
        type: "area",
        stacked: false,
        height: 350,
        zoom: {
          type: "x",
          enabled: true,
          autoScaleYaxis: true,
        },
        toolbar: {
          autoSelected: "zoom",
        },
      },
      dataLabels: {
        enabled: false,
      },
      markers: {
        size: 5, // Increased marker size for better visibility
        colors: ["#FF4560"], // Highlight color for transaction points
      },
      stroke: {
        curve: "smooth",
        width: 3, // Thicker line for better visibility
      },
      title: {
        text: "Stake History",
        align: "left",
        style: {
          color: "#fff", // White text for better contrast on dark background
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          inverseColors: false,
          opacityFrom: 0.7, // Make the fill slightly more visible
          opacityTo: 1,
          stops: [0, 90, 100],
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: "#fff", // White y-axis labels for better visibility
          },
          formatter: function (val) {
            return val.toFixed(0);
          },
        },
        title: {
          text: "Stake Amount",
          style: {
            color: "#fff", // White text for the y-axis title
          },
        },
      },
      xaxis: {
        type: "datetime",
        labels: {
          datetimeFormatter: {
            hour: "HH:mm", // Only show minutes and hours, no seconds
          },
          style: {
            colors: "#fff", // White x-axis labels
          },
        },
      },
      tooltip: {
        shared: false,
        y: {
          formatter: function (val) {
            return val + "M";
          },
        },
      },
      annotations: {
        points: [], // Will be filled dynamically
      },
    },
  });

  useEffect(() => {
    if (feed.data) {
      const baseTimestamp = new Date("1970-01-01").getTime();

      const seriesData = feed.data.feed
        .filter((entry: { amount: number | null }) => entry.amount !== null)
        .map((entry: { amount: number; timestamp: number }) => ({
          x: new Date(baseTimestamp + entry.timestamp * 1000),
          y: entry.amount / Math.pow(10, Number(usdj.decimals)) || 0,
        }));

      const transactionPoints = seriesData.map(
        (point: { x: number; y: number }) => ({
          x: point.x,
          y: point.y,
          marker: {
            size: 6, // Increased marker size for transaction points
            fillColor: "#FF4560", // Red marker for transactions
            strokeColor: "#fff", // White border for contrast
            radius: 2,
          },
          label: {
            text: "Transaction", // Label for each transaction
            style: {
              color: "#fff", // White text for the label
              background: "#FF4560", // Red background for visibility
            },
          },
        }),
      );

      setChartData((prevData) => ({
        ...prevData,
        series: [{ name: "Stake", data: seriesData }],
        options: {
          ...prevData.options,
          annotations: {
            points: transactionPoints, // Adding annotations for transactions
          },
        },
      }));
      console.log(seriesData, "Series");
    }
  }, [feed.data]);

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          height={350}
        />
      </div>
    </div>
  );
}
