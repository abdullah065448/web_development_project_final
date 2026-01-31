import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth.js";

const api = axios.create({ baseURL: "/api", withCredentials: true });

export default function Products() {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: "", sku: "", category: "", quantity: 0, cost: 0, warehouseLocation: "" });

  const load = () => api.get("/products").then((res) => setItems(res.data));

  useEffect(() => {
    load();
  }, []);

  const canEdit = user?.role === "admin" || user?.role === "manager";

  const submit = (e) => {
    e.preventDefault();
    api.post("/products", form).then(load);
  };

  return (
    <div>
      <h1>Products</h1>
      {canEdit && (
        <form onSubmit={submit} className="card" style={{ marginBottom: 16 }}>
          <div className="grid">
            <input className="input" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input className="input" placeholder="SKU" value={form.sku} onChange={(e) => setForm({ ...form, sku: e.target.value })} />
            <input className="input" placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
            <input className="input" type="number" placeholder="Quantity" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: Number(e.target.value) })} />
            <input className="input" type="number" placeholder="Cost" value={form.cost} onChange={(e) => setForm({ ...form, cost: Number(e.target.value) })} />
            <input
              className="input"
              placeholder="Warehouse Location"
              value={form.warehouseLocation}
              onChange={(e) => setForm({ ...form, warehouseLocation: e.target.value })}
            />
          </div>
          <button className="cta" style={{ marginTop: 10, alignSelf: "flex-end" }}>
            Add Product
          </button>
        </form>
      )}
      <div className="card">
        {items.map((p) => (
          <div key={p._id} style={{ display: "grid", gridTemplateColumns: "1fr 120px 120px 120px", padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
            <div>
              <strong>{p.name}</strong>
              <div style={{ opacity: 0.7, fontSize: 12 }}>{p.sku}</div>
            </div>
            <div>Qty: {p.quantity}</div>
            <div>${p.cost}</div>
            <div>{p.warehouseLocation}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
