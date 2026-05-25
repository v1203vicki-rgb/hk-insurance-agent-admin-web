import { notFound } from "next/navigation";
import { ToolbarButton } from "../../../../components/toolbar-button";
import { PageShell } from "../../../../components/page-shell";
import { type FaqItem, getFaqDetail } from "../../../../lib/api";
import { faqDetails } from "../../../../lib/mock-data";

const fieldStyle = {
  width: "100%",
  minHeight: 46,
  display: "flex",
  alignItems: "center",
  padding: "0 16px",
  borderRadius: 16,
  border: "1px solid #dbe5f2",
  background: "#f4f8fe",
  color: "#172036",
  fontSize: 14,
} as const;

const textareaStyle = {
  width: "100%",
  minHeight: 150,
  padding: "16px 18px",
  borderRadius: 18,
  border: "1px solid #dbe5f2",
  background: "#f4f8fe",
  color: "#172036",
  lineHeight: 1.8,
  fontSize: 14,
} as const;

export default async function FaqDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let detail: FaqItem | undefined = faqDetails[id as keyof typeof faqDetails];
  if (!detail) notFound();

  try {
    detail = await getFaqDetail(id);
  } catch {
    // 演示模式沿用本地详情。
  }

  return (
    <PageShell
      title="FAQ 新增 / 编辑"
      description="支持简体、繁体、来源等级、版本日期和小程序展示效果预览。"
      actions={
        <>
          <ToolbarButton>保存草稿</ToolbarButton>
          <ToolbarButton tone="dark">提交</ToolbarButton>
        </>
      }
    >
      <section style={{ display: "grid", gap: 18, gridTemplateColumns: "1.1fr 0.9fr" }}>
        <section style={{ padding: 24, borderRadius: 28, border: "1px solid #dbe5f2", background: "#ffffff" }}>
          <div style={{ display: "grid", gap: 18 }}>
            <div style={{ display: "grid", gap: 16, gridTemplateColumns: "1fr 1fr" }}>
              {[
                ["分类", detail.category],
                ["是否热门", detail.isHot ? "是" : "否"],
                ["关联来源文件", detail.sourceFile ?? "-"],
                ["来源页码", `P.${detail.sourcePage ?? "-"}`],
                ["来源等级", "L1 官方条款"],
                ["版本号", "v2026.03"],
                ["发布日期", "2026-03-01"],
                ["生效日期", "2026-03-15"],
              ].map(([label, value]) => (
                <label key={label} style={{ display: "grid", gap: 8 }}>
                  <span style={{ color: "#71829f", fontSize: 12 }}>{label}</span>
                  <div style={fieldStyle}>{value}</div>
                </label>
              ))}
            </div>

            <div style={{ display: "grid", gap: 16, gridTemplateColumns: "1fr 1fr" }}>
              <label style={{ display: "grid", gap: 8 }}>
                <span style={{ color: "#71829f", fontSize: 12 }}>标准问题：简体</span>
                <div style={fieldStyle}>{detail.question}</div>
              </label>
              <label style={{ display: "grid", gap: 8 }}>
                <span style={{ color: "#71829f", fontSize: 12 }}>标准问题：繁体</span>
                <div style={fieldStyle}>香港保险冷静期是多久？</div>
              </label>
              <label style={{ display: "grid", gap: 8 }}>
                <span style={{ color: "#71829f", fontSize: 12 }}>标准答案：简体</span>
                <div style={textareaStyle}>{detail.details ?? detail.shortAnswer ?? "-"}</div>
              </label>
              <label style={{ display: "grid", gap: 8 }}>
                <span style={{ color: "#71829f", fontSize: 12 }}>标准答案：繁体</span>
                <div style={textareaStyle}>冷静期需以具体产品官方条款为准，不同保险公司和产品可能存在差异。</div>
              </label>
            </div>
          </div>
        </section>

        <section style={{ padding: 24, borderRadius: 28, border: "1px solid #dbe5f2", background: "#ffffff" }}>
          <h3 style={{ margin: 0, fontSize: 18, color: "#172036" }}>小程序展示预览</h3>
          <div style={{ marginTop: 16, padding: 18, borderRadius: 24, background: "#f7faff", border: "1px solid #dbe5f2" }}>
            <strong style={{ display: "block", color: "#172036", fontSize: 18 }}>{detail.question}</strong>
            <div style={{ marginTop: 10, color: "#172036", lineHeight: 1.8 }}>{detail.details ?? detail.shortAnswer}</div>
            <div style={{ marginTop: 16, color: "#71829f", fontSize: 12 }}>引用来源：{detail.sourceFile} · P.{detail.sourcePage}</div>
          </div>
        </section>
      </section>
    </PageShell>
  );
}
