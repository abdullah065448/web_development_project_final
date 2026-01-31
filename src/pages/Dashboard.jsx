import { useEffect, useState } from "react";
import axios from "axios";
import StatCard from "../ui/StatCard.jsx";
import Timeline from "../ui/Timeline.jsx";

const api = axios.create({ baseURL: "/api", withCredentials: true });

export default function Dashboard() {
  const [data, setData] = useState({ totalProducts: 0, totalQuantity: 0, lowStock: [], recent: [] });

  useEffect(() => {
    api.get("/dashboard").then((res) => setData(res.data));
  }, []);

  return (
    <>
      <h1>Inventory Overview</h1>
      <div className="grid">
        <StatCard label="Total Products" value={data.totalProducts} />
        <StatCard label="Total Quantity" value={data.totalQuantity} />
        <StatCard label="Low Stock" value={data.lowStock.length} tone="warn" />
      </div>
      <div style={{ marginTop: 20 }} className="grid">
        <div className="card">
          <h3>Low Stock Alerts</h3>
          {data.lowStock.map((p) => (
            <div key={p._id} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0" }}>
              <span>{p.name}</span>
              <span>{p.quantity}</span>
            </div>
          ))}
          {data.lowStock.length === 0 && <p style={{ opacity: 0.7 }}>All good!</p>}
        </div>
        <div className="card">
          <h3>Recent Activity</h3>
          <Timeline items={data.recent} />
        </div>
      </div>
    </>
  );
}
