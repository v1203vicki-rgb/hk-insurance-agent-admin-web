import type { ReactNode } from "react";

export function InfoCard({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <section
      style={{
        display: "grid",
        gap: 18,
        padding: 30,
        borderRadius: 30,
        border: "1px solid #dbe5f2",
        background: "#ffffff",
        boxShadow: "0 10px 24px rgba(18, 31, 54, 0.04)",
      }}
    >
      <div style={{ display: "grid", gap: 6 }}>
        <h3 style={{ margin: 0, fontSize: 24, lineHeight: 1.2, color: "#172036" }}>{title}</h3>
        {description ? <p style={{ margin: 0, color: "#71829f", lineHeight: 1.65, fontSize: 15 }}>{description}</p> : null}
      </div>
      {children}
    </section>
  );
}
