import Link from "next/link";
import { InfoCard } from "../../../components/info-card";
import { PageShell } from "../../../components/page-shell";
import { ToolbarButton } from "../../../components/toolbar-button";
import { RuleGroupEditor } from "../../../components/rule-group-editor";
import { getAgentRuleGroups } from "../../../lib/api";
import { ruleGroups } from "../../../lib/mock-data";

export default async function AgentRulesPage() {
  let groups = ruleGroups;

  try {
    groups = await getAgentRuleGroups();
  } catch {
    // Keep mock groups.
  }

  return (
    <PageShell
      title="Agent 配置"
      description="系统提示词、禁答规则、引用规则和高风险控制统一在此编辑"
      actions={
        <>
          <Link href="/admin/agent-rules/test">
            <ToolbarButton>规则测试</ToolbarButton>
          </Link>
          <ToolbarButton tone="dark">保存配置</ToolbarButton>
        </>
      }
    >
      <section style={{ display: "grid", gap: 20, gridTemplateColumns: "1.1fr 1fr" }}>
        <InfoCard title="系统规则摘要" description="所有关键结论必须引用来源；没有 citations 的答案不能返回实质性内容。">
          <div style={{ display: "grid", gap: 12 }}>
            {["系统提示词", "禁答 / 拒答规则", "产品收益规则", "引用展示规则", "免责声明"].map((item) => (
              <div key={item} style={{ padding: "14px 16px", borderRadius: 18, background: "#f4f8fe", color: "#172036" }}>
                {item}
              </div>
            ))}
          </div>
        </InfoCard>

        <div style={{ display: "grid", gap: 20 }}>
          {groups.map((group) => (
            <InfoCard key={group.id} title={group.title} description={group.description}>
              <RuleGroupEditor group={group} />
            </InfoCard>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
