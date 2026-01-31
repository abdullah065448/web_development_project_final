import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth.js";

const api = axios.create({ baseURL: "/api", withCredentials: true });

export default function Suppliers() {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "" });
  const canEdit = user?.role === "admin" || user?.role === "manager";

  const load = () => api.get("/suppliers").then((res) => setItems(res.data));

  useEffect(() => {
    load();
  }, []);

  const submit = (e) => {
    e.preventDefault();
    api.post("/suppliers", form).then(() => {
      setForm({ name: "", email: "", phone: "", address: "" });
      load();
    });
  };

  return (
    <div>
      <h1>Suppliers</h1>
      {canEdit && (
        <form onSubmit={submit} className="card" style={{ marginBottom: 16 }}>
          <div className="grid">
            <input className="input" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input className="input" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <input className="input" placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            <input className="input" placeholder="Address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
          </div>
          <button className="cta" style={{ marginTop: 10 }}>Add Supplier</button>
        </form>
      )}
      <div className="card">
        {items.map((s) => (
          <div key={s._id} style={{ padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
            <strong>{s.name}</strong>
            <div style={{ opacity: 0.7, fontSize: 12 }}>{s.email} · {s.phone}</div>
            <div>{s.address}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
