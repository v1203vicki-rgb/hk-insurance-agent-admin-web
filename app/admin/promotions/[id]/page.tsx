import { ToolbarButton } from "../../../../components/toolbar-button";
import { PageShell } from "../../../../components/page-shell";
import { type PromotionItem, getPromotionDetail } from "../../../../lib/api";
import { promotionDetails } from "../../../../lib/mock-data";

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
  minHeight: 112,
  padding: "18px 20px",
  borderRadius: 20,
  border: "1px solid #dbe5f2",
  background: "#f4f8fe",
  color: "#172036",
  lineHeight: 1.8,
} as const;

export default async function PromotionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let detail: PromotionItem = promotionDetails.promo_1;

  try {
    detail = await getPromotionDetail(id);
  } catch {
    // Fall back to local detail.
  }

  return (
    <PageShell title="优惠政策详情 / 编辑" description="管理适用产品、条件、有效期和来源文件" actions={<ToolbarButton tone="dark">保存优惠</ToolbarButton>}>
      <section style={formCardStyle}>
        <div style={{ display: "grid", gap: 22 }}>
          <h3 style={{ margin: 0, color: "#172036", fontSize: 24 }}>优惠信息</h3>

          <div style={{ display: "grid", gap: 20, gridTemplateColumns: "1fr 1fr" }}>
            {[
              ["优惠名称", detail.name],
              ["适用保险公司", detail.insuranceCompany ?? "-"],
              ["适用产品", detail.product],
              ["开始日期", detail.startDate],
              ["结束日期", detail.endDate],
              ["是否前端展示", detail.frontendVisible ? "是" : "否"],
              ["来源文件", detail.sourceFile ?? "-"],
              ["来源页码", "P.2"],
            ].map(([label, value]) => (
              <label key={label} style={{ display: "grid", gap: 10 }}>
                <span style={{ color: "#71829f", fontSize: 15 }}>{label}</span>
                <div style={fieldStyle}>{value}</div>
              </label>
            ))}
          </div>

          <div style={{ display: "grid", gap: 20, gridTemplateColumns: "1fr 1fr" }}>
            <label style={{ display: "grid", gap: 10 }}>
              <span style={{ color: "#71829f", fontSize: 15 }}>适用条件</span>
              <div style={textareaStyle}>{detail.applicableCondition ?? "-"}</div>
            </label>
            <label style={{ display: "grid", gap: 10 }}>
              <span style={{ color: "#71829f", fontSize: 15 }}>不适用条件</span>
              <div style={textareaStyle}>{detail.exclusionCondition ?? "-"}</div>
            </label>
          </div>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <span style={{ padding: "8px 16px", borderRadius: 999, background: "#e9fbf2", color: "#0e9f6e", fontWeight: 700 }}>有效期内</span>
            <span style={{ padding: "8px 16px", borderRadius: 999, background: "#eef4ff", color: "#2b5cff", fontWeight: 700 }}>回答时显示开始/结束日期</span>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
