import { useEffect, useState } from "react";
import Output_Chart from "./components/createChart";

export default function Dashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/chart-data")
      .then((res) => res.json())
      .then(setData);
  }, []);

  return <Output_Chart data={data} />;
}
