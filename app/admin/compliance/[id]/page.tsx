import { PageShell } from "../../../../components/page-shell";
import { ToolbarButton } from "../../../../components/toolbar-button";

const panelStyle = {
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

export default function ComplianceDetailPage() {
  return (
    <PageShell title="合规审核详情" description="查看原始问题、回答、风险类型、引用和审核结论" actions={<ToolbarButton tone="dark">加入规则</ToolbarButton>}>
      <section style={{ display: "grid", gap: 20, gridTemplateColumns: "0.95fr 1.05fr" }}>
        <section style={panelStyle}>
          <div style={{ display: "grid", gap: 18 }}>
            <h3 style={{ margin: 0, color: "#172036", fontSize: 24 }}>原始问题</h3>
            <div style={{ color: "#172036", fontSize: 20, lineHeight: 1.7 }}>这个储蓄险第几年回本？收益是不是保证的？</div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <span style={{ padding: "8px 16px", borderRadius: 999, background: "#fff0f2", color: "#ff4d67", fontWeight: 700 }}>BENEFIT_OR_RETURN</span>
              <span style={{ padding: "8px 16px", borderRadius: 999, background: "#fff0f2", color: "#ff4d67", fontWeight: 700 }}>高风险</span>
            </div>

            <div>
              <h4 style={{ margin: "16px 0 8px", color: "#172036", fontSize: 22 }}>Agent 回答摘要</h4>
              <div style={{ color: "#71829f", lineHeight: 1.8, fontSize: 17 }}>系统基于官方利益说明解释现金价值和非保证利益，不作收益承诺，并显示来源页码。</div>
            </div>
          </div>
        </section>

        <section style={panelStyle}>
          <div style={{ display: "grid", gap: 16 }}>
            <h3 style={{ margin: 0, color: "#172036", fontSize: 24 }}>审核结论</h3>
            <div style={{ display: "grid", gap: 14 }}>
              {[
                ["C 公司储蓄计划利益说明", "L3 · P.6 · v2026.01"],
                ["C 公司产品条款", "L1 · P.18 · v2026.01"],
              ].map(([title, text]) => (
                <div key={title} style={{ padding: "14px 18px", borderRadius: 18, border: "1px solid #dbe5f2", background: "#f4f8fe" }}>
                  <strong style={{ display: "block", color: "#172036", fontSize: 18 }}>{title}</strong>
                  <div style={{ marginTop: 6, color: "#71829f" }}>{text}</div>
                </div>
              ))}
            </div>

            {[
              ["处理状态", "已通过"],
              ["审核人", "Vicki"],
              ["结论", "回答合规，已引用官方文件"],
              ["后续动作", "保留观察"],
            ].map(([label, value]) => (
              <label key={label} style={{ display: "grid", gap: 10 }}>
                <span style={{ color: "#71829f", fontSize: 15 }}>{label}</span>
                <div style={fieldStyle}>{value}</div>
              </label>
            ))}
          </div>
        </section>
      </section>
    </PageShell>
  );
}
