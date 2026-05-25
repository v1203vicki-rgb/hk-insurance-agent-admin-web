import Link from "next/link";

export default function ForbiddenPage() {
  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 24 }}>
      <section
        style={{
          maxWidth: 520,
          width: "100%",
          background: "#ffffff",
          borderRadius: 28,
          border: "1px solid #dbe5f2",
          padding: 32,
          textAlign: "center",
          boxShadow: "0 18px 40px rgba(17, 29, 51, 0.08)",
        }}
      >
        <div style={{ fontSize: 44, marginBottom: 12 }}>403</div>
        <h1 style={{ margin: 0, fontSize: 28, color: "#16223b" }}>你当前没有权限访问这个页面</h1>
        <p style={{ margin: "12px 0 0", color: "#71829f", lineHeight: 1.8 }}>
          这是演示版前端 RBAC 拦截页面。平台管理员可访问平台后台，经纪公司管理员和经纪人仅可访问本公司后台。
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 22, flexWrap: "wrap" }}>
          <Link href="/login" style={{ padding: "12px 18px", borderRadius: 16, background: "#111a2d", color: "#fff", fontWeight: 700 }}>
            返回登录
          </Link>
          <Link href="/" style={{ padding: "12px 18px", borderRadius: 16, border: "1px solid #dbe5f2", background: "#fff", color: "#16223b", fontWeight: 700 }}>
            返回入口
          </Link>
        </div>
      </section>
    </main>
  );
}
