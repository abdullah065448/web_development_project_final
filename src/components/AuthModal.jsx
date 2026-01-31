import { useState } from "react";
import { useDispatch } from "react-redux";
import { login, register } from "../state/authSlice.js";

export default function AuthModal({ mode = "login", onClose }) {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "staff" });
  const [current, setCurrent] = useState(mode);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (current === "login") {
      dispatch(login({ email: form.email, password: form.password })).then((res) => {
        if (!res.error) onClose();
      });
    } else {
      dispatch(register(form)).then((res) => {
        if (!res.error) onClose();
      });
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ margin: 0 }}>{current === "login" ? "Welcome back" : "Create account"}</h3>
          <button className="cta" onClick={onClose}>
            Close
          </button>
        </div>
        <p style={{ opacity: 0.7, marginBottom: 16 }}>
          Manage your warehouse in real time with smooth animations.
        </p>
        <form onSubmit={handleSubmit}>
          {current === "register" && (
            <>
              <input
                className="input"
                placeholder="Full name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <select
                className="input"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
              >
                <option value="staff">Staff</option>
                <option value="manager">Manager</option>
                <option value="admin">Admin</option>
              </select>
            </>
          )}
          <input
            className="input"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            className="input"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <button className="cta" style={{ width: "100%", marginTop: 4 }}>
            {current === "login" ? "Login" : "Register"}
          </button>
        </form>
        <div style={{ marginTop: 12, textAlign: "center" }}>
          {current === "login" ? (
            <span>
              No account?{" "}
              <button className="nav-link" style={{ display: "inline", padding: 4 }} onClick={() => setCurrent("register")}>
                Register
              </button>
            </span>
          ) : (
            <span>
              Have an account?{" "}
              <button className="nav-link" style={{ display: "inline", padding: 4 }} onClick={() => setCurrent("login")}>
                Login
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
