export default function Timeline({ items = [] }) {
  return (
    <div>
      {items.map((item) => (
        <div
          key={item._id}
          style={{
            display: "grid",
            gridTemplateColumns: "80px 1fr",
            gap: 12,
            padding: "10px 0",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <div style={{ opacity: 0.7, fontSize: 12 }}>{new Date(item.createdAt).toLocaleString()}</div>
          <div>
            <strong>{item.type}</strong> {item.qty} × {item.product?.name || "Product"}
          </div>
        </div>
      ))}
      {items.length === 0 && <p style={{ opacity: 0.7 }}>No activity yet.</p>}
    </div>
  );
}
