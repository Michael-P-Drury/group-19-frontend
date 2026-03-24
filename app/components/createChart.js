import { Chart as ChartJS, registerables } from "chart.js";
import { Chart } from "react-chartjs-2";

ChartJS.register(...registerables);

export default function Output_Chart({ data, chartType }) {
  const chartData = {
    labels: data.map((d) => d.date),
    datasets: [
      {
        label: "Actual_income",
        data: data.map((item) => item.actual_income),
        backgroundColor: "#bc509174",
        borderColor: "#bc5090",
        borderWidth: 1,
        tension: 0.1,
      },
      {
        label: "Actual_total_spend",
        data: data.map((item) => item.actual_total_spend),
        backgroundColor: "#003f5c6d",
        borderColor: "#003f5c",
        borderWidth: 1,
        tension: 0.1,
      },
      {
        label: "Actual_net_cashflow",
        data: data.map((item) => item.actual_net_cashflow),
        backgroundColor: "#ffa6007c",
        borderColor: "#ffa600",
        borderWidth: 1,
        tension: 0.1,
      },
    ],
  };

  return <Chart type={chartType} data={chartData} />;
}
