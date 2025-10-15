import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChart = ({ data, type }) => {
  let labels = [];
  let values = [];

  if (type === "gender") {
    labels = data.map((item) => item.gender__name);
    values = data.map((item) => item.count);
  } else if (type === "age") {
    labels = Object.keys(data).filter((key) => key !== "unknown" && data[key] > 0);
    values = Object.values(data).filter((_, index) => labels[index]);
  }

  const chartData = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
        borderColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
      },
    },
  };

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Doughnut data={chartData} options={options} />
    </div>
  );
};

export default DonutChart;