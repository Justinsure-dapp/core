import { Doughnut } from 'react-chartjs-2';
// import twConf from "../utils/tailwindConf";


export default function PieChart() {
    return (
        <Doughnut data={data} />
    )
}


const data = {
    labels: [
        'Red',
        'Yellow',
        'Blue'
    ],
    datasets: [
      {
        data: [10, 20, 30],
        // backgroundColor: twConf.theme.colors.primary,
        // borderColor: twConf.theme.colors.primary + "44",
      },
    ],
  };
