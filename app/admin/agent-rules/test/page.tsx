import { PageShell } from "../../../../components/page-shell";
import { StatusBadge } from "../../../../components/status-badge";
import { ToolbarButton } from "../../../../components/toolbar-button";

const panelStyle = {
  padding: 24,
  borderRadius: 28,
  border: "1px solid #dbe5f2",
  background: "#ffffff",
} as const;

const boxStyle = {
  padding: "14px 18px",
  borderRadius: 18,
  border: "1px solid #dbe5f2",
  background: "#f4f8fe",
} as const;

export default function AgentTestPage() {
  return (
    <PageShell title="规则测试" description="输入测试问题，选择测试场景，模拟查看风险类型、命中规则、引用来源和拒答结果。" actions={<ToolbarButton tone="dark">模拟回答</ToolbarButton>}>
      <section style={{ display: "grid", gap: 20, gridTemplateColumns: "0.95fr 1.05fr" }}>
        <section style={panelStyle}>
          <div style={{ display: "grid", gap: 18 }}>
            <h3 style={{ margin: 0, fontSize: 18, color: "#172036" }}>测试问题</h3>
            <div style={{ ...boxStyle, minHeight: 86, lineHeight: 1.8, color: "#172036" }}>A公司和B公司的医疗险有什么区别？</div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {["普通知识", "产品对比", "收益/回本", "个性化建议", "法律/税务/医疗", "过期优惠", "内部培训资料"].map((item, index) => (
                <StatusBadge key={item} label={item} tone={index === 1 ? "info" : "muted"} />
              ))}
            </div>
            <div style={boxStyle}>
              <strong>命中规则</strong>
              <div style={{ marginTop: 8, color: "#71829f", lineHeight: 1.8 }}>
                不输出推荐、不排序、不评分；个性化投保建议不直接回答；所有关键结论必须带 citations。
              </div>
            </div>
          </div>
        </section>

        <section style={panelStyle}>
          <div style={{ display: "grid", gap: 14 }}>
            <h3 style={{ margin: 0, fontSize: 18, color: "#172036" }}>模拟结果</h3>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <StatusBadge label="命中风险：产品对比" tone="info" />
              <StatusBadge label="有来源检查：通过" tone="success" />
              <StatusBadge label="拒答模板：未触发" tone="muted" />
            </div>
            <div style={boxStyle}>
              <strong>模拟回答</strong>
              <div style={{ marginTop: 8, color: "#71829f", lineHeight: 1.8 }}>
                以下仅总结产品资料差异，不构成购买建议。可从保障地区、年度限额、自付额、病房级别和优惠状态做客观比较。
              </div>
            </div>
            <div style={boxStyle}>
              <strong>citations</strong>
              <div style={{ marginTop: 8, color: "#71829f", lineHeight: 1.8 }}>
                A公司高端医疗条款 · L1 官方条款 · P.12 · v2026.03
                <br />
                B公司医疗险小册子 · L2 官方小册子 · P.8 · v2026.02
              </div>
            </div>
          </div>
        </section>
      </section>
    </PageShell>
  );
}
