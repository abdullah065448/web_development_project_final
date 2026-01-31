import { useEffect, useState } from "react";
import { Link, Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchMe, logout } from "./state/authSlice.js";
import { useAuth } from "./hooks/useAuth.js";
import Dashboard from "./pages/Dashboard.jsx";
import Products from "./pages/Products.jsx";
import Suppliers from "./pages/Suppliers.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import AuthModal from "./components/AuthModal.jsx";

function Nav() {
  return (
    <nav className="sidebar">
      <h2>Warehouse</h2>
      <Link className="nav-link" to="/">Dashboard</Link>
      <Link className="nav-link" to="/products">Products</Link>
      <Link className="nav-link" to="/suppliers">Suppliers</Link>
    </nav>
  );
}

function Topbar({ onAuthOpen }) {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, marginBottom: 18 }}>
      {!user && (
        <button className="cta" onClick={() => onAuthOpen("login")}>
          Login / Register
        </button>
      )}
      {user && (
        <>
          <div className="card" style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div>
              <div style={{ fontWeight: 700 }}>{user.name}</div>
              <div style={{ fontSize: 12, opacity: 0.7 }}>{user.role}</div>
            </div>
          </div>
          <button
            className="cta"
            onClick={() => {
              dispatch(logout());
              navigate("/login");
            }}
          >
            Logout
          </button>
        </>
      )}
    </div>
  );
}

function LoginPage({ onAuthOpen }) {
  const { user } = useAuth();
  if (user) return <Navigate to="/" replace />;
  return (
    <div style={{ display: "grid", placeItems: "center", minHeight: "80vh" }}>
      <div className="card" style={{ maxWidth: 520 }}>
        <h1>Modern Warehouse Control</h1>
        <p style={{ opacity: 0.8 }}>
          Animated, professional dashboard with secure JWT auth. Log in or create your team account to start tracking stock in real time.
        </p>
        <button className="cta" onClick={() => onAuthOpen("login")}>Login</button>
        <button className="cta" style={{ marginLeft: 10 }} onClick={() => onAuthOpen("register")}>Register</button>
      </div>
    </div>
  );
}

export default function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [authMode, setAuthMode] = useState(null);

  useEffect(() => {
    dispatch(fetchMe());
  }, [dispatch]);

  return (
    <div className="app-shell">
      <Nav />
      <main className="content">
        <Topbar onAuthOpen={(mode) => setAuthMode(mode)} />
        <Routes>
          <Route path="/login" element={<LoginPage onAuthOpen={(mode) => setAuthMode(mode)} />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/suppliers" element={<Suppliers />} />
          </Route>
          <Route path="*" element={<Navigate to={location.pathname === "/login" ? "/login" : "/"} />} />
        </Routes>
      </main>
      {authMode && <AuthModal mode={authMode} onClose={() => setAuthMode(null)} />}
    </div>
  );
}
