import { PageShell } from "../../../../components/page-shell";
import { StatusBadge } from "../../../../components/status-badge";
import { ToolbarButton } from "../../../../components/toolbar-button";

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

export default function ComplianceDetailPage() {
  return (
    <PageShell
      title="合规审核详情"
      description="查看原始问题、Agent 回答、命中规则、引用来源和审核结论。"
      actions={
        <>
          <ToolbarButton>补充 FAQ</ToolbarButton>
          <ToolbarButton tone="dark">加入禁答规则</ToolbarButton>
        </>
      }
    >
      <section style={{ display: "grid", gap: 18, gridTemplateColumns: "1fr 1fr" }}>
        <section style={{ padding: 24, borderRadius: 28, border: "1px solid #dbe5f2", background: "#ffffff" }}>
          <div style={{ display: "grid", gap: 14 }}>
            <h3 style={{ margin: 0, fontSize: 18, color: "#172036" }}>原始问题与回答</h3>
            <div style={{ padding: 16, borderRadius: 18, background: "#f4f8fe", lineHeight: 1.8, color: "#172036" }}>
              <strong>原始问题：</strong>这个储蓄险第几年回本？收益是不是保证的？
            </div>
            <div style={{ padding: 16, borderRadius: 18, background: "#f4f8fe", lineHeight: 1.8, color: "#172036" }}>
              <strong>Agent 回答：</strong>当前仅能确认产品包含非保证利益，不能据此推断具体回本年期；收益/回本类问题必须引用官方文件。
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <StatusBadge label="高：收益类" tone="danger" />
              <StatusBadge label="有官方文件" tone="success" />
              <StatusBadge label="无过期优惠" tone="info" />
            </div>
          </div>
        </section>

        <section style={{ padding: 24, borderRadius: 28, border: "1px solid #dbe5f2", background: "#ffffff" }}>
          <div style={{ display: "grid", gap: 12 }}>
            <h3 style={{ margin: 0, fontSize: 18, color: "#172036" }}>命中规则与引用来源</h3>
            <div style={{ padding: 16, borderRadius: 18, background: "#f4f8fe", color: "#172036" }}>
              命中规则：产品收益必须引用官方文件；无 citations 不返回实质性答案。
            </div>
            <div style={{ padding: 16, borderRadius: 18, background: "#f4f8fe", color: "#172036" }}>
              引用来源：C 公司储蓄计划利益说明 · L3 费率 / 利益说明 · P.6 · v2026.01
            </div>
            <label style={{ display: "grid", gap: 8 }}>
              <span style={{ color: "#71829f", fontSize: 12 }}>审核结论</span>
              <div style={fieldStyle}>通过</div>
            </label>
            <label style={{ display: "grid", gap: 8 }}>
              <span style={{ color: "#71829f", fontSize: 12 }}>后续动作</span>
              <div style={fieldStyle}>保留观察</div>
            </label>
          </div>
        </section>
      </section>
    </PageShell>
  );
}
