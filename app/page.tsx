import Link from "next/link";

export default function HomePage() {
  return (
    <main style={{ padding: 32, display: "grid", gap: 16 }}>
      <div style={{ maxWidth: 760 }}>
        <div style={{ color: "#7dd3fc", fontSize: 12, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase" }}>
          hk insurance agent
        </div>
        <h1 style={{ margin: "10px 0 0", fontSize: 42, lineHeight: 1.1 }}>香港保险知识问答后台</h1>
        <p style={{ margin: "12px 0 0", color: "#94a3b8", lineHeight: 1.8 }}>
          这是 monorepo 的入口页，用来快速进入登录、平台后台和经纪公司后台。
        </p>
      </div>

      <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
        <Link href="/login" style={{ padding: 18, borderRadius: 18, border: "1px solid rgba(148,163,184,0.12)", background: "rgba(15,23,42,0.72)" }}>
          登录页
        </Link>
        <Link href="/admin" style={{ padding: 18, borderRadius: 18, border: "1px solid rgba(148,163,184,0.12)", background: "rgba(15,23,42,0.72)" }}>
          平台后台
        </Link>
        <Link href="/broker" style={{ padding: 18, borderRadius: 18, border: "1px solid rgba(148,163,184,0.12)", background: "rgba(15,23,42,0.72)" }}>
          经纪公司后台
        </Link>
      </div>
    </main>
  );
}
