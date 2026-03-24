import { useEffect, useState } from "react";
import Output_Chart from "./components/createChart";
import { ChartCard } from "./chartCard";

export default function Dashboard() {
  interface ChartItem {
    id: number;
    title: string;
    type: string;
    data: Record<string, any>;
  }
  const [data, setData] = useState([]);
  const [chartType, setChartType] = useState("line");
  const [titleData, setTitleData] = useState("");
  const [activeCharts, setActiveCharts] = useState<ChartItem[]>([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/chart-data")
      .then((res) => res.json())
      .then(setData);
  }, []);

  const addChart = () => {
    const newChart = {
      id: Date.now(),
      title: titleData || `New Analysis ${activeCharts.length + 1}`,
      type: chartType,
      data: data,
    };
    setActiveCharts([...activeCharts, newChart]);
    setTitleData("");
  };

  const removeChart = (id: string | number) => {
    setActiveCharts(activeCharts.filter((chart) => chart.id !== id));
  };

  return (
    <>
      <div className="container mt-4">
        <div className="d-flex justify-content-between mb-4">
          <h3>Dashboard</h3>
          <div className="mb-3">
            <input
              className="form-control"
              placeholder="Graph Title"
              value={titleData}
              onChange={(e) => setTitleData(e.target.value)}
            />
          </div>
          <button className="btn btn-success" onClick={addChart}>
            + Add New Chart
          </button>
        </div>
      </div>

      {activeCharts.length === 0 ? (
        <div className="text-center p-5 border rounded bg-light">
          <p className="text-muted">
            No charts yet. Click the button above to start!
          </p>
        </div>
      ) : (
        <div className="row g-3">
          {activeCharts.map((chart) => (
            <ChartCard
              key={chart.id}
              id={chart.id}
              title={chart.title}
              data={chart.data}
              onRemove={removeChart}
              type="line"
            />
          ))}
        </div>
      )}
    </>
  );
}
