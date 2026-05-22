import { ToolbarButton } from "../../../../components/toolbar-button";
import { PageShell } from "../../../../components/page-shell";
import { type FaqItem, getFaqDetail } from "../../../../lib/api";
import { faqDetails } from "../../../../lib/mock-data";

const formCardStyle = {
  padding: 28,
  borderRadius: 30,
  border: "1px solid #dbe5f2",
  background: "#ffffff",
  boxShadow: "0 10px 24px rgba(18, 31, 54, 0.04)",
} as const;

const fieldStyle = {
  width: "100%",
  minHeight: 46,
  display: "flex",
  alignItems: "center",
  padding: "0 16px",
  borderRadius: 18,
  border: "1px solid #dbe5f2",
  background: "#f4f8fe",
  color: "#172036",
  fontSize: 15,
} as const;

const textareaStyle = {
  width: "100%",
  minHeight: 168,
  padding: "18px 20px",
  borderRadius: 20,
  border: "1px solid #dbe5f2",
  background: "#f4f8fe",
  color: "#172036",
  lineHeight: 1.8,
} as const;

export default async function FaqDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let detail: FaqItem = faqDetails.faq_1;

  try {
    detail = await getFaqDetail(id);
  } catch {
    // Use local detail.
  }

  return (
    <PageShell title="FAQ 新增 / 编辑" description="维护简体、繁体标准问答并绑定来源页码" actions={<ToolbarButton tone="dark">保存 FAQ</ToolbarButton>}>
      <section style={formCardStyle}>
        <div style={{ display: "grid", gap: 22 }}>
          <h3 style={{ margin: 0, color: "#172036", fontSize: 24 }}>FAQ 内容</h3>

          <div style={{ display: "grid", gap: 20, gridTemplateColumns: "1fr 1fr" }}>
            {[
              ["分类", detail.category],
              ["是否热门", detail.isHot ? "是" : "否"],
              ["标准问题（简体）", detail.question],
              ["标准问题（繁体）", "香港保險冷靜期是多久？"],
            ].map(([label, value]) => (
              <label key={label} style={{ display: "grid", gap: 10 }}>
                <span style={{ color: "#71829f", fontSize: 15 }}>{label}</span>
                <div style={fieldStyle}>{value}</div>
              </label>
            ))}
          </div>

          <div style={{ display: "grid", gap: 20, gridTemplateColumns: "1fr 1fr" }}>
            <label style={{ display: "grid", gap: 10 }}>
              <span style={{ color: "#71829f", fontSize: 15 }}>标准答案（简体）</span>
              <div style={textareaStyle}>{detail.details ?? detail.shortAnswer ?? "-"}</div>
            </label>
            <label style={{ display: "grid", gap: 10 }}>
              <span style={{ color: "#71829f", fontSize: 15 }}>标准答案（繁体）</span>
              <div style={textareaStyle}>冷靜期通常指客戶收到保單或冷靜期通知書後的指定期間。具體以官方文件為準。</div>
            </label>
          </div>

          <div style={{ display: "grid", gap: 20, gridTemplateColumns: "1fr 1fr" }}>
            <label style={{ display: "grid", gap: 10 }}>
              <span style={{ color: "#71829f", fontSize: 15 }}>关联来源文件</span>
              <div style={fieldStyle}>{detail.sourceFile ?? "-"}</div>
            </label>
            <label style={{ display: "grid", gap: 10 }}>
              <span style={{ color: "#71829f", fontSize: 15 }}>来源页码</span>
              <div style={fieldStyle}>P.{detail.sourcePage ?? "-"}</div>
            </label>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
