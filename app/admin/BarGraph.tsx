"use client";
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  Tooltip,
  LinearScale,
  Legend,
} from "chart.js";

interface BarGraphProps {
  data?: GraphData[];
}
type GraphData = {
  day: string;
  date: string;
  totalAmount: number;
};

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function BarGraph({ data }: BarGraphProps) {
  const labels = data?.map((item) => item.day);
  const amounts = data?.map((item) => item.totalAmount);
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Sale Amount",
        data: amounts,
        backgroundColor: "rgba(75,192,192,0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  console.table(data);
  return (
    <div>
      <Bar data={chartData} options={options} />
    </div>
  );
}
