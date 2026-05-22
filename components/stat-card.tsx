export function StatCard({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note?: string;
}) {
  return (
    <div
      style={{
        padding: 24,
        border: "1px solid #dbe5f2",
        borderRadius: 28,
        background: "#ffffff",
        boxShadow: "0 10px 24px rgba(18, 31, 54, 0.04)",
      }}
    >
      <div style={{ fontSize: 15, color: "#71829f", lineHeight: 1.4 }}>{label}</div>
      <div style={{ fontSize: 42, lineHeight: 1.02, fontWeight: 800, marginTop: 14, letterSpacing: "-0.03em", color: "#162036" }}>{value}</div>
      {note ? <div style={{ marginTop: 6, fontSize: 15, color: "#71829f", lineHeight: 1.4 }}>{note}</div> : null}
    </div>
  );
}
