import Link from "next/link";

export default function NotFoundPage() {
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
        <div style={{ fontSize: 44, marginBottom: 12 }}>404</div>
        <h1 style={{ margin: 0, fontSize: 28, color: "#16223b" }}>页面不存在或演示数据未命中</h1>
        <p style={{ margin: "12px 0 0", color: "#71829f", lineHeight: 1.8 }}>
          当前 ID 没有对应 mock 数据时，会显示这个页面。你可以返回入口页，或直接进入小程序问答首页继续查看。
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 22, flexWrap: "wrap" }}>
          <Link href="/" style={{ padding: "12px 18px", borderRadius: 16, background: "#111a2d", color: "#fff", fontWeight: 700, textDecoration: "none" }}>
            返回入口
          </Link>
          <Link href="/mini/chat" style={{ padding: "12px 18px", borderRadius: 16, border: "1px solid #dbe5f2", background: "#fff", color: "#16223b", fontWeight: 700, textDecoration: "none" }}>
            查看小程序预览
          </Link>
        </div>
      </section>
    </main>
  );
}
