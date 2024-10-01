import { Doughnut } from "react-chartjs-2";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { twMerge } from "tailwind-merge";
// import twConf from "../utils/tailwindConf";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart(props: {
  className?: string;
  data: { labels: string[]; values: number[], bgColor: string[]; };
}) {
  const options = {
    responsive: true,
    plugins: { legend: { display: false } },
  };

  const data = {
    labels: props.data.labels,
    datasets: [
      {
        data: props.data.values,
        backgroundColor: props.data.bgColor,
        hoverOffset: 8,
        borderColor: "rgb(200, 200, 200)"
        // backgroundColor: twConf.theme.colors.primary,
      },
    ],
  };

  return (
    <div className={twMerge("", props.className)}>
      <Doughnut data={data} options={options} />
    </div>
  );
}
