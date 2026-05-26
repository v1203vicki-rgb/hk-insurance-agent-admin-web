import Link from "next/link";

const entries = [
  {
    href: "/login",
    title: "登录页",
    description: "支持平台管理员、经纪公司管理员、经纪人三种演示角色快速进入。",
  },
  {
    href: "/admin",
    title: "平台后台",
    description: "查看公共知识库、资料审核、合规审核、会话管理和数据看板。",
  },
  {
    href: "/broker",
    title: "经纪公司后台",
    description: "查看本公司文件上传、文件状态、会话记录、数据看板与公司设置。",
  },
  {
    href: "/mini/chat",
    title: "小程序端预览",
    description: "查看经纪人移动端知识问答、产品搜索、产品对比、历史记录与来源详情。",
  },
];

export default function HomePage() {
  return (
    <main style={{ minHeight: "100vh", padding: "48px 32px", background: "linear-gradient(180deg, #eef3fb 0%, #e9eff9 100%)" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", display: "grid", gap: 24 }}>
        <section
          style={{
            background: "#111a2d",
            color: "#ffffff",
            borderRadius: 32,
            padding: "34px 32px",
            boxShadow: "0 28px 60px rgba(17, 26, 45, 0.18)",
          }}
        >
          <div style={{ color: "#89a8ff", fontSize: 12, fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase" }}>hk insurance agent</div>
          <h1 style={{ margin: "14px 0 0", fontSize: 42, lineHeight: 1.08 }}>香港保险知识问答 Agent 演示入口</h1>
          <p style={{ margin: "12px 0 0", color: "#b6c5df", lineHeight: 1.8, maxWidth: 860 }}>
            当前为前端演示数据模式，重点展示平台管理后台、经纪公司后台，以及经纪人移动端知识问答助手的小程序 Web 预览。
          </p>
        </section>

        <section style={{ display: "grid", gap: 18, gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
          {entries.map((entry) => (
            <Link
              key={entry.href}
              href={entry.href}
              style={{
                background: "#ffffff",
                borderRadius: 28,
                padding: "24px 22px",
                border: "1px solid #dbe5f2",
                boxShadow: "0 14px 34px rgba(17, 26, 45, 0.06)",
                display: "grid",
                gap: 12,
                textDecoration: "none",
              }}
            >
              <strong style={{ color: "#172036", fontSize: 20 }}>{entry.title}</strong>
              <p style={{ margin: 0, color: "#71829f", lineHeight: 1.8, fontSize: 14 }}>{entry.description}</p>
              <span style={{ color: "#111a2d", fontWeight: 700, fontSize: 14 }}>进入预览</span>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
