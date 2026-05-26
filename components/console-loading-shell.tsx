import Link from "next/link";

export function ConsoleLoadingShell({
  scope,
  title,
  message,
}: {
  scope: "platform" | "broker";
  title: string;
  message: string;
}) {
  const scopeLabel = scope === "platform" ? "平台管理后台" : "经纪公司后台";

  return (
    <div style={{ display: "grid", gridTemplateColumns: "280px minmax(0, 1fr)", minHeight: "100vh", background: "#eef3fb" }}>
      <aside style={{ background: "#10192b", color: "#fff", padding: "28px 22px", display: "grid", gridTemplateRows: "auto auto 1fr", gap: 24 }}>
        <div>
          <div style={{ fontSize: 16, color: "#d5e0f0" }}>HK Insurance AI</div>
          <h1 style={{ margin: "10px 0 0", fontSize: 28, lineHeight: 1.15 }}>{scopeLabel}</h1>
        </div>
        <div style={{ display: "grid", gap: 10 }}>
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} style={{ height: 20, borderRadius: 999, background: index === 0 ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.08)" }} />
          ))}
        </div>
      </aside>

      <div style={{ minWidth: 0, display: "grid", gridTemplateRows: "auto minmax(0, 1fr)" }}>
        <header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 10,
            background: "rgba(238, 243, 251, 0.92)",
            backdropFilter: "blur(18px)",
            borderBottom: "1px solid #dbe5f2",
            padding: "18px 32px",
            display: "grid",
            gap: 10,
          }}
        >
          <div style={{ color: "#6d7f9c", fontSize: 12 }}>{scopeLabel} / {title}</div>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
            <div>
              <h2 style={{ margin: 0, fontSize: 24, lineHeight: 1.2, color: "#172036" }}>{title}</h2>
              <p style={{ margin: "8px 0 0", fontSize: 13, color: "#6d7f9c", lineHeight: 1.7 }}>{message}</p>
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <Link href="/login" style={linkStyle}>返回登录页</Link>
              <Link href="/" style={linkStyle}>返回入口页</Link>
            </div>
          </div>
        </header>

        <main style={{ padding: "28px 32px 40px", display: "grid", gap: 22 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 18 }}>
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} style={{ minHeight: 124, borderRadius: 28, border: "1px solid #dbe5f2", background: "#fff", boxShadow: "0 10px 24px rgba(18, 31, 54, 0.04)", padding: 24, display: "grid", gap: 12 }}>
                <div style={{ width: "42%", height: 16, borderRadius: 999, background: "#edf3fb" }} />
                <div style={{ width: "30%", height: 34, borderRadius: 14, background: "#e6eef8" }} />
                <div style={{ width: "55%", height: 12, borderRadius: 999, background: "#f0f5fb" }} />
              </div>
            ))}
          </div>

          <div style={{ minHeight: 460, borderRadius: 30, border: "1px solid #dbe5f2", background: "#fff", boxShadow: "0 10px 24px rgba(18, 31, 54, 0.04)", padding: 28, display: "grid", gap: 18 }}>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <div style={{ flex: "1 1 320px", minHeight: 46, borderRadius: 16, background: "#f7faff", border: "1px solid #dbe5f2" }} />
              <div style={{ width: 140, minHeight: 46, borderRadius: 16, background: "#f7faff", border: "1px solid #dbe5f2" }} />
              <div style={{ width: 140, minHeight: 46, borderRadius: 16, background: "#f7faff", border: "1px solid #dbe5f2" }} />
              <div style={{ width: 140, minHeight: 46, borderRadius: 16, background: "#f7faff", border: "1px solid #dbe5f2" }} />
            </div>

            <div style={{ overflow: "hidden", borderRadius: 24, border: "1px solid #dbe5f2" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1.8fr 1fr 1fr 1fr 1fr", background: "#f4f8fe" }}>
                {Array.from({ length: 5 }).map((_, index) => (
                  <div key={index} style={{ padding: 16 }}>
                    <div style={{ height: 14, borderRadius: 999, background: "#dbe5f2" }} />
                  </div>
                ))}
              </div>
              {Array.from({ length: 6 }).map((_, rowIndex) => (
                <div key={rowIndex} style={{ display: "grid", gridTemplateColumns: "1.8fr 1fr 1fr 1fr 1fr", borderTop: "1px solid #e3eaf5" }}>
                  {Array.from({ length: 5 }).map((_, columnIndex) => (
                    <div key={columnIndex} style={{ padding: 16 }}>
                      <div style={{ height: 14, borderRadius: 999, background: columnIndex === 0 ? "#e8eef7" : "#f1f5fb" }} />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

const linkStyle = {
  minHeight: 42,
  padding: "0 16px",
  borderRadius: 999,
  border: "1px solid #dbe5f2",
  background: "#ffffff",
  color: "#19253d",
  fontWeight: 700,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  textDecoration: "none",
};
