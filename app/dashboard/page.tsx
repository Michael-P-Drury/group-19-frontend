import { useEffect, useState } from "react";
import { ChartCard } from "../components/chartCard";

export default function Dashboard() {
  // Interface to define data types
  interface ChartItem {
    id: number;
    title: string;
    type: string;
    data: Record<string, any>;
  }

  // Setting different variables that are used to dynamically create the charts
  const [data, setData] = useState([]);
  const [chartType, setChartType] = useState("line");
  const [dataPreset, setDataPreset] = useState("primary health");
  const [titleData, setTitleData] = useState("");
  const [activeCharts, setActiveCharts] = useState<ChartItem[]>([]);

  // Fetches the data from the charts router in the backend
  useEffect(() => {
    fetch("http://localhost:8000/api/chart-data")
      .then((res) => res.json())
      .then(setData);
  }, []);

  // Adds a new chart to the list of charts
  const addChart = () => {
    const newChart = {
      id: Date.now(),
      title: titleData || `New Analysis ${activeCharts.length + 1}`,
      type: chartType,
      data: data,
      preset: dataPreset,
    };

    setActiveCharts([...activeCharts, newChart]);
    setTitleData("");
  };

  // Removes a chart from the list of charts using its id
  const removeChart = (id: string | number) => {
    setActiveCharts(activeCharts.filter((chart) => chart.id !== id));
  };

  return (
    <>
      {/* Rough html layout for Jack to Improve */}
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

      {/* If there are no charts in the activeCharts array then display the message */}
      {activeCharts.length === 0 ? (
        <div className="text-center p-5 border rounded bg-light">
          <p className="text-muted">
            No charts yet. Click the button above to start!
          </p>
        </div>
      ) : (
        // Otherwise map through the activecharts creating a chart card for each one
        <div className="row g-3">
          {activeCharts.map((chart) => (
            <ChartCard
              key={chart.id}
              id={chart.id}
              title={chart.title}
              data={chart.data}
              onRemove={removeChart}
              type="line"
              preset="primary health"
            />
          ))}
        </div>
      )}
    </>
  );
}
