import { useState } from "react";
import Output_Chart from "./createChart";

export function ChartCard({
  id,
  title,
  type,
  preset,
  data,
  onRemove,
}: {
  // Define the expected data for the chart card
  id: number;
  title: string;
  // Types of charts
  type: "line" | "bar" | "pie" | "polarArea" | "radar" | "doughnut";
  // Data presets
  preset: "primary health" | "recurring revenue" | "debt obligations";
  data: Record<string, any>;
  onRemove: (id: number) => void;
}) {
  // States to manage button functionality
  const [chartType, setChartType] = useState(type);
  const [dataPreset, setDataPreset] = useState(preset);

  return (
    // Basic Bootstrap layout for each card for Jack to improve
    <div className="card shadow-sm">
      <div className="card-header d-flex justify-content-between align-items-center bg-white">
        <h5 className="mb-0 text-primary">{title}</h5>
        {/* Big Jack make this look pretty please */}
        <button
          className={`btn btn-sm ${chartType === "line" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setChartType("line")}
        >
          Line
        </button>
        <button
          className={`btn btn-sm ${chartType === "bar" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setChartType("bar")}
        >
          Bar
        </button>
        <button
          className={`btn btn-sm ${chartType === "pie" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setChartType("pie")}
        >
          Pie
        </button>
        <button
          className={`btn btn-sm ${chartType === "polarArea" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setChartType("polarArea")}
        >
          Polar Area
        </button>
        <button
          className={`btn btn-sm ${chartType === "radar" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setChartType("radar")}
        >
          Radar
        </button>
        <button
          className={`btn btn-sm ${chartType === "doughnut" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setChartType("doughnut")}
        >
          Doughnut
        </button>
        <button className="btn btn-sm btn-danger" onClick={() => onRemove(id)}>
          ×
        </button>
        <div>
          <button
            className={`btn btn-sm ${dataPreset === "primary health" ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setDataPreset("primary health")}
          >
            Primary Health
          </button>
          <button
            className={`btn btn-sm ${dataPreset === "recurring revenue" ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setDataPreset("recurring revenue")}
          >
            Recurring Revenue
          </button>
          <button
            className={`btn btn-sm ${dataPreset === "debt obligations" ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setDataPreset("debt obligations")}
          >
            Debt Obligations
          </button>
        </div>
      </div>
      <div className="card-body" style={{ minHeight: "400px" }}>
        {/* HERE IS WHERE THE ACTUAL CHART IS CREATED BY CALLING createChart.js */}
        <Output_Chart
          chartType={chartType}
          data={data}
          dataPreset={dataPreset}
        />
      </div>
    </div>
  );
}
