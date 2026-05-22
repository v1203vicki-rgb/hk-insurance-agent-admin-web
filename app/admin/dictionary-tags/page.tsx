import { PageShell } from "../../../components/page-shell";
import { ToolbarButton } from "../../../components/toolbar-button";

const cardStyle = {
  padding: 28,
  borderRadius: 30,
  border: "1px solid #dbe5f2",
  background: "#ffffff",
  boxShadow: "0 10px 24px rgba(18, 31, 54, 0.04)",
} as const;

const chipStyle = (active = false) =>
  ({
    display: "inline-flex",
    padding: "8px 16px",
    borderRadius: 999,
    background: active ? "#eef4ff" : "#f1f6fd",
    color: active ? "#2b5cff" : "#6f809d",
    fontWeight: active ? 700 : 500,
  }) as const;

export default function DictionaryTagsPage() {
  return (
    <PageShell title="字典 / 标签管理" description="统一维护知识分类、产品类型、文件类型、风险类型和状态枚举" actions={<ToolbarButton tone="dark">新增标签</ToolbarButton>}>
      <section style={{ display: "grid", gap: 20, gridTemplateColumns: "1fr 1fr" }}>
        <section style={cardStyle}>
          <h3 style={{ margin: 0, color: "#172036", fontSize: 24 }}>知识分类</h3>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 18 }}>
            {["香港保险基础", "重疾险", "储蓄/分红险", "医疗险", "保单贷款", "理赔流程"].map((item) => (
              <div key={item} style={chipStyle()}>{item}</div>
            ))}
          </div>
        </section>

        <section style={cardStyle}>
          <h3 style={{ margin: 0, color: "#172036", fontSize: 24 }}>产品类型</h3>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 18 }}>
            {["CRITICAL_ILLNESS", "SAVINGS", "PARTICIPATING", "MEDICAL", "LIFE"].map((item) => (
              <div key={item} style={chipStyle()}>{item}</div>
            ))}
          </div>
        </section>

        <section style={cardStyle}>
          <h3 style={{ margin: 0, color: "#172036", fontSize: 24 }}>文件类型</h3>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 18 }}>
            {["产品小册子", "官方条款", "费率表", "利益说明", "内部培训", "优惠通告"].map((item) => (
              <div key={item} style={chipStyle()}>{item}</div>
            ))}
          </div>
        </section>

        <section style={cardStyle}>
          <h3 style={{ margin: 0, color: "#172036", fontSize: 24 }}>风险类型</h3>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 18 }}>
            {["普通知识", "产品对比", "收益/回本", "个性化建议", "法律/税务/医疗"].map((item) => (
              <div key={item} style={chipStyle(true)}>{item}</div>
            ))}
          </div>
        </section>
      </section>
    </PageShell>
  );
}
