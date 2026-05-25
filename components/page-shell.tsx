import type { ReactNode } from "react";

export function PageShell({
  title,
  description,
  actions,
  children,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section style={{ padding: "28px 32px 40px", display: "grid", gap: 22 }}>
      <header style={{ display: "flex", justifyContent: "space-between", gap: 20, alignItems: "flex-start", flexWrap: "wrap" }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 24, lineHeight: 1.2, color: "#172036" }}>{title}</h1>
          {description ? <p style={{ margin: "8px 0 0", color: "#71829f", fontSize: 12, lineHeight: 1.7, maxWidth: 900 }}>{description}</p> : null}
        </div>
        {actions ? <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>{actions}</div> : null}
      </header>
      {children}
    </section>
  );
}
