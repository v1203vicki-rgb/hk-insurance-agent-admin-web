import { PageShell } from "../../../../components/page-shell";

const cardStyle = {
  maxWidth: 840,
  margin: "0 auto",
  padding: "56px 48px",
  borderRadius: 32,
  border: "1px solid #dbe5f2",
  background: "#ffffff",
  boxShadow: "0 10px 24px rgba(18, 31, 54, 0.04)",
  display: "grid",
  gap: 28,
  justifyItems: "center",
  textAlign: "center" as const,
};

const stepStyle = {
  padding: "14px 16px",
  borderRadius: 20,
  border: "1px solid #dbe5f2",
  background: "#f4f8fe",
  textAlign: "left" as const,
};

export default function BrokerUploadSuccessPage() {
  return (
    <PageShell title="上传成功 / 审核中" description="上传完成后提醒等待平台审核，审核通过前不会被 Agent 使用。">
      <section style={cardStyle}>
        <div
          style={{
            width: 112,
            height: 112,
            borderRadius: 999,
            background: "#e7faf3",
            color: "#0e9f6e",
            display: "grid",
            placeItems: "center",
            fontSize: 54,
            fontWeight: 700,
          }}
        >
          ✓
        </div>

        <div>
          <h3 style={{ margin: 0, color: "#172036", fontSize: 44, lineHeight: 1.15 }}>文件上传成功</h3>
          <p style={{ margin: "12px 0 0", color: "#71829f", fontSize: 18 }}>AIA_重疾险_产品小册子.pdf 已进入待审核状态</p>
        </div>

        <div style={{ width: "100%", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 18 }}>
          {[
            ["待解析", "系统抽取文本和页码"],
            ["解析成功", "切分并生成引用片段"],
            ["待审核", "等待平台管理员审核"],
            ["已启用", "进入公共知识库，被 Agent 使用"],
          ].map(([title, text]) => (
            <div key={title} style={stepStyle}>
              <strong style={{ display: "block", color: "#172036", fontSize: 18 }}>{title}</strong>
              <div style={{ marginTop: 10, color: "#71829f", lineHeight: 1.7 }}>{text}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: 18, justifyContent: "center" }}>
          <a
            href="/broker/documents"
            style={{
              minWidth: 170,
              minHeight: 52,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 18,
              border: "1px solid #dbe5f2",
              background: "#ffffff",
              color: "#172036",
              textDecoration: "none",
              fontWeight: 700,
            }}
          >
            查看文件状态
          </a>
          <a
            href="/broker/upload"
            style={{
              minWidth: 182,
              minHeight: 52,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 18,
              border: "1px solid #141d33",
              background: "#141d33",
              color: "#ffffff",
              textDecoration: "none",
              fontWeight: 700,
            }}
          >
            继续上传
          </a>
        </div>
      </section>
    </PageShell>
  );
}
