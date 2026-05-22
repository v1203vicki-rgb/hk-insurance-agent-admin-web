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
    <section style={{ padding: 38, display: "grid", gap: 26 }}>
      <header style={{ display: "flex", gap: 20, justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap" }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 38, lineHeight: 1.08, letterSpacing: "-0.03em", color: "#172036" }}>{title}</h2>
          {description ? <p style={{ margin: "8px 0 0", color: "#71829f", maxWidth: 880, lineHeight: 1.6, fontSize: 17 }}>{description}</p> : null}
        </div>
        {actions ? <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>{actions}</div> : null}
      </header>
      {children}
    </section>
  );
}
