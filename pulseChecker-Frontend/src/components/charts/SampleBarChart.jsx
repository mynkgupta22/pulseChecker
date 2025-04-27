import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { chartColors, getChartColors } from "../../lib/chartColors";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const SampleBarChart = () => {
  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const datasets = [
    {
      label: "Team A",
      data: [65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56],
      backgroundColor: chartColors.blue,
    },
    {
      label: "Team B",
      data: [28, 48, 40, 19, 86, 27, 90, 28, 48, 40, 19, 86],
      backgroundColor: chartColors.pink,
    },
    {
      label: "Team C",
      data: [45, 25, 16, 36, 67, 18, 76, 45, 25, 16, 36, 67],
      backgroundColor: chartColors.green,
    },
    {
      label: "Team D",
      data: [82, 35, 72, 54, 23, 45, 32, 82, 35, 72, 54, 23],
      backgroundColor: chartColors.orange,
    },
    {
      label: "Team E",
      data: [19, 62, 45, 28, 73, 64, 52, 19, 62, 45, 28, 73],
      backgroundColor: chartColors.purple,
    },
  ];

  const data = {
    labels,
    datasets: datasets.map((dataset, index) => ({
      ...dataset,
      backgroundColor: getChartColors(datasets.length)[index],
    })),
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#fff", // Light theme text color
          font: {
            size: 12,
          },
        },
      },
      title: {
        display: true,
        text: "Monthly Team Performance",
        color: "#fff", // Light theme text color
        font: {
          size: 16,
          weight: "bold",
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: "rgba(255, 255, 255, 0.1)", // Light grid lines
        },
        ticks: {
          color: "#fff", // Light theme text color
        },
      },
      y: {
        grid: {
          color: "rgba(255, 255, 255, 0.1)", // Light grid lines
        },
        ticks: {
          color: "#fff", // Light theme text color
        },
      },
    },
  };

  return (
    <div className="w-full h-[400px] p-4 bg-card rounded-lg">
      <Bar data={data} options={options} />
    </div>
  );
};

export default SampleBarChart;
