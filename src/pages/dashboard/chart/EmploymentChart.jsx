import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const EmploymentChart = ({ data }) => {
  const chartData = {
    labels: ["Ishli (Bitiruvchilar)", "Ishsiz (Bitiruvchilar emas)"],
    datasets: [
      {
        label: "Talabalar soni",
        data: [data.graduates, data.non_graduates],
        backgroundColor: ["#36A2EB", "#FF6384"],
        borderColor: ["#36A2EB", "#FF6384"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default EmploymentChart;