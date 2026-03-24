import { useState } from "react";
import Output_Chart from "./components/createChart";

export function ChartCard({
  id,
  title,
  type,
  data,
  onRemove,
}: {
  id: string | number;
  title: string;
  type: "line" | "bar" | "pie" | "polarArea" | "radar" | "doughnut";
  data: Record<string, any>;
  onRemove: (id: string | number) => void;
}) {
  const [chartType, setChartType] = useState(type);

  const chartOptions = ["line", "bar", "pie", "polarArea", "radar", "doughnut"];
  return (
    <div className="card shadow-sm">
      <div className="card-header d-flex justify-content-between align-items-center bg-white">
        <h5 className="mb-0 text-primary">{title}</h5>

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
      </div>
      <div className="card-body" style={{ minHeight: "400px" }}>
        <Output_Chart chartType={chartType} data={data} />
      </div>
    </div>
  );
}
