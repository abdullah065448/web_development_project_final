export default function StatCard({ label, value, tone = "info" }) {
  const colors = {
    info: ["#38bdf8", "#0ea5e9"],
    warn: ["#f97316", "#f59e0b"],
    ok: ["#22c55e", "#16a34a"],
  };
  const [start, end] = colors[tone] || colors.info;
  return (
    <div
      className="card"
      style={{
        background: `linear-gradient(120deg, ${start}22, ${end}18)`,
        border: `1px solid ${start}55`,
      }}
    >
      <div style={{ fontSize: 14, opacity: 0.8 }}>{label}</div>
      <div style={{ fontSize: 32, fontWeight: 700 }}>{value}</div>
    </div>
  );
}
