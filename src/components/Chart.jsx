import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Chart({chartArray,currencySymbol,days}) {
  const prices = [];
  const time = [];
  for(let i=0;i<chartArray.length;i++){
        if(days==='24h'){
            time.push(new Date(chartArray[i][0]).toLocaleTimeString());
        }else{
            time.push(new Date(chartArray[i][0]).toLocaleDateString());
        }
        prices.push(chartArray[i][1])
  }

  const data = {
    labels:time,
    datasets: [
      {
        label: `Price in ${currencySymbol}`,
        data:prices,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <>
      <Line options={{ responsive: true }} data={data} />
    </>
  );
}

export default Chart;
