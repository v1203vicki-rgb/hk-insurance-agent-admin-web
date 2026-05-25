import type { ReactNode } from "react";

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div
      style={{
        borderRadius: 24,
        border: "1px dashed #c9d8ea",
        background: "#f7faff",
        padding: "40px 24px",
        textAlign: "center",
        display: "grid",
        gap: 10,
        placeItems: "center",
      }}
    >
      <div style={{ fontSize: 36 }}>◌</div>
      <strong style={{ fontSize: 18, color: "#19253d" }}>{title}</strong>
      <p style={{ margin: 0, color: "#6d7f9c", maxWidth: 420, lineHeight: 1.7 }}>{description}</p>
      {action}
    </div>
  );
}
