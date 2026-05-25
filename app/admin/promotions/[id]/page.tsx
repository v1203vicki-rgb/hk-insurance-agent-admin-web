import { notFound } from "next/navigation";
import { ToolbarButton } from "../../../../components/toolbar-button";
import { PageShell } from "../../../../components/page-shell";
import { StatusBadge } from "../../../../components/status-badge";
import { type PromotionItem, getPromotionDetail } from "../../../../lib/api";
import { promotionDetails } from "../../../../lib/mock-data";

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
  minHeight: 108,
  padding: "16px 18px",
  borderRadius: 18,
  border: "1px solid #dbe5f2",
  background: "#f4f8fe",
  color: "#172036",
  lineHeight: 1.8,
  fontSize: 14,
} as const;

export default async function PromotionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let detail: PromotionItem | undefined = promotionDetails[id as keyof typeof promotionDetails];
  if (!detail) notFound();

  try {
    detail = await getPromotionDetail(id);
  } catch {
    // 演示模式沿用本地详情。
  }

  const isExpired = detail.status === "EXPIRED" || detail.status === "已过期";

  return (
    <PageShell
      title="优惠政策详情 / 编辑"
      description="展示适用保险公司、产品、来源文件、来源页码和前端展示状态。"
      actions={
        <>
          <ToolbarButton>保存草稿</ToolbarButton>
          <ToolbarButton tone="dark">提交</ToolbarButton>
        </>
      }
    >
      <section style={{ display: "grid", gap: 18 }}>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <StatusBadge label={isExpired ? "已过期" : "生效中"} tone={isExpired ? "danger" : "success"} />
          <StatusBadge label="引用时展示有效期" tone="info" />
        </div>

        <section style={{ padding: 24, borderRadius: 28, border: "1px solid #dbe5f2", background: "#ffffff" }}>
          <div style={{ display: "grid", gap: 20 }}>
            <div style={{ display: "grid", gap: 16, gridTemplateColumns: "1fr 1fr" }}>
              {[
                ["优惠名称", detail.name],
                ["适用保险公司", detail.insuranceCompany ?? "-"],
                ["适用产品", detail.product],
                ["开始日期", detail.startDate],
                ["结束日期", detail.endDate],
                ["来源文件", detail.sourceFile ?? "-"],
                ["来源页码", "P.2"],
                ["是否前端展示", detail.frontendVisible ? "是" : "否"],
              ].map(([label, value]) => (
                <label key={label} style={{ display: "grid", gap: 8 }}>
                  <span style={{ color: "#71829f", fontSize: 12 }}>{label}</span>
                  <div style={fieldStyle}>{value}</div>
                </label>
              ))}
            </div>

            <div style={{ display: "grid", gap: 16, gridTemplateColumns: "1fr 1fr" }}>
              <label style={{ display: "grid", gap: 8 }}>
                <span style={{ color: "#71829f", fontSize: 12 }}>适用条件</span>
                <div style={textareaStyle}>{detail.applicableCondition ?? "-"}</div>
              </label>
              <label style={{ display: "grid", gap: 8 }}>
                <span style={{ color: "#71829f", fontSize: 12 }}>不适用条件</span>
                <div style={textareaStyle}>{detail.exclusionCondition ?? "-"}</div>
              </label>
            </div>

            <div style={{ padding: 16, borderRadius: 18, background: isExpired ? "#fff1f2" : "#eef5ff", color: isExpired ? "#dc2626" : "#4e76df", lineHeight: 1.8 }}>
              {isExpired ? "该优惠已过期。Agent 引用时必须展示“该优惠已过期”，不可作为当前有效优惠。" : "当前优惠可展示在前端，但回答时仍需显示开始日期、结束日期和适用条件。"}
            </div>
          </div>
        </section>
      </section>
    </PageShell>
  );
}
