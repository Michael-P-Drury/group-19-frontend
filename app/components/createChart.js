import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

export default function Output_Chart({ data }) {
  const chartData = {
    labels: data.map((d) => d.date),
    datasets: [
      {
        label: "Actual_income",
        data: data.map((item) => item.actual_income),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "#bc5090",
        borderWidth: 1,
        tension: 0.1,
      },
      {
        label: "Actual_total_spend",
        data: data.map((item) => item.actual_total_spend),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "#003f5c",
        borderWidth: 1,
        tension: 0.1,
      },
      {
        label: "Actual_net_cashflow",
        data: data.map((item) => item.actual_net_cashflow),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "#ffa600",
        borderWidth: 1,
        tension: 0.1,
      },
    ],
  };

  return <Line data={chartData} />;
}
