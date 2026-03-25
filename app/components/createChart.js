import { Chart as ChartJS, registerables } from "chart.js";
import { Chart } from "react-chartjs-2";

ChartJS.register(...registerables);

export default function Output_Chart({ data, chartType, dataPreset }) {
  console.log("Data Preset:", dataPreset);

  // Preset columns for some basic data
  const presetColumns = {
    "primary health": [
      "actual_income",
      "actual_total_spend",
      "actual_net_cashflow",
    ],
    "recurring revenue": [
      "recurring_revenue_ratio",
      "client_concentration_risk",
    ],
    "debt obligations": [
      "essential_costs_total",
      "debt_repayment_due",
      "tax_due_next_month",
    ],
  };

  // Colour palette to display different data
  const palette = [
    { border: "#bc5090", bg: "#bc509174" },
    { border: "#003f5c", bg: "#003f5c6d" },
    { border: "#ffa600", bg: "#ffa6007c" },
    { border: "#58508d", bg: "#58508d74" },
    { border: "#ff6361", bg: "#ff636174" },
  ];

  // creates the dataset depending on what data preset is chose
  const dataset = presetColumns[dataPreset].map((columnName, index) => {
    // cycles through the colour palette to assign a colour to each column
    const colors = palette[index % palette.length];
    // Uses the exact column name from the CSV file to select the data from the dictionary
    return {
      label: columnName,
      data: data.map((item) => item[columnName]),
      backgroundColor: colors.bg,
      borderColor: colors.border,
      borderWidth: 1,
      tension: 0.1,
    };
  });

  // Passes dates and dataset to the chart to create the chat.js chart
  const chartData = {
    labels: data.map((d) => d.date),
    datasets: dataset,
  };

  // Uses chart.js to create he chart with the chart type and data
  return <Chart type={chartType} data={chartData} />;
}
