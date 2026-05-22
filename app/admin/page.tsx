import Link from "next/link";
import { DataTable, type TableRow } from "../../components/data-table";
import { InfoCard } from "../../components/info-card";
import { PageShell } from "../../components/page-shell";
import { StatCard } from "../../components/stat-card";
import { StatusBadge } from "../../components/status-badge";
import { ToolbarButton } from "../../components/toolbar-button";
import { getDocuments, getPlatformAnalytics } from "../../lib/api";
import { platformDocuments, platformStats, tenants } from "../../lib/mock-data";

export default async function AdminPage() {
  let stats = platformStats;
  let reviewRows: TableRow[] = platformDocuments.map(([fileName, sourceCompany, sourceLevel, status, action]) => [
    fileName,
    sourceCompany,
    <StatusBadge key={`${fileName}-source`} label={sourceLevel} />,
    <StatusBadge key={`${fileName}-status`} label={status} />,
    action,
  ]);

  try {
    const [analytics, documentResponse] = await Promise.all([getPlatformAnalytics(), getDocuments()]);

    stats = [
      { label: "租户数量", value: String(analytics.tenantCount ?? 42), note: "启用 39" },
      { label: "公共知识文件", value: String(analytics.publicDocumentCount ?? 1286), note: `待审核 ${analytics.pendingReviewCount ?? 31}` },
      { label: "高风险回答", value: String(analytics.riskAnswerCount ?? 17), note: "今日拦截" },
      { label: "引用覆盖率", value: `${Math.round((analytics.citationCoverage ?? 1) * 100)}%`, note: "强制页码引用" },
    ];

    reviewRows = documentResponse.items.map((item) => [
      item.fileName,
      item.reviewComment ?? "平台上传",
      <StatusBadge key={`${item.id}-level`} label={(item.sourceLevel ?? "L2").replace("_OFFICIAL_BROCHURE", "")} />,
      <StatusBadge key={`${item.id}-status`} label={item.status} />,
      item.suggestedAction ?? "查看",
    ]);
  } catch {
    // Keep local mock layout when API is unavailable.
  }

  return (
    <PageShell
      title="平台管理后台"
      description="公共知识库、资料审核、Agent 规则与合规控制"
      actions={
        <>
          <Link href="/admin/agent-rules">
            <ToolbarButton>禁答规则</ToolbarButton>
          </Link>
          <Link href="/admin/audit">
            <ToolbarButton tone="dark">新增审核任务</ToolbarButton>
          </Link>
        </>
      }
    >
      <section style={{ display: "grid", gap: 20, gridTemplateColumns: "repeat(4, minmax(0, 1fr))" }}>
        {stats.map((stat) => (
          <StatCard key={stat.label} label={stat.label} value={stat.value} note={stat.note} />
        ))}
      </section>

      <section style={{ display: "grid", gap: 20, gridTemplateColumns: "1.38fr 0.92fr" }}>
        <InfoCard title="资料审核队列" description="审核通过后进入平台公共知识库">
          <DataTable headers={["文件", "来源公司", "可信度", "状态", "操作"]} rows={reviewRows} gridTemplateColumns="2fr 1.1fr 0.8fr 0.8fr 0.7fr" />
        </InfoCard>

        <InfoCard title="Agent 合规规则">
          <div style={{ display: "grid", gap: 12 }}>
            {[
              "所有答案强制显示来源页码",
              "个性化投保建议：不直接回答",
              "法律 / 税务 / 医疗判断：不下结论",
              "产品收益：必须引用官方文件",
              "过期优惠：必须标记已过期",
            ].map((rule) => (
              <div key={rule} style={{ padding: "15px 16px", borderRadius: 18, background: "#f4f8fe", color: "#172036" }}>
                {rule}
              </div>
            ))}
          </div>
        </InfoCard>
      </section>

      <section style={{ display: "grid", gap: 20, gridTemplateColumns: "1fr 1fr" }}>
        <InfoCard title="租户管理">
          <DataTable
            headers={["经纪公司", "经纪人", "问答量", "状态"]}
            rows={tenants.map(([name, brokers, asks, status]) => [name, brokers, asks, <StatusBadge key={`${name}-status`} label={status} />])}
            gridTemplateColumns="1.8fr 0.8fr 0.8fr 0.8fr"
          />
        </InfoCard>

        <InfoCard title="来源可信度">
          <div style={{ display: "grid", gap: 12 }}>
            {[
              ["L1 官方条款", "最高优先级"],
              ["L2 官方小册子", "高优先级"],
              ["L3 费率 / 利益说明", "收益类需强提示"],
              ["L4 官方通告 / 优惠", "需检查有效期"],
              ["L5 内部培训资料", "需提示以官方为准"],
            ].map(([title, desc]) => (
              <div
                key={title}
                style={{
                  padding: "15px 16px",
                  borderRadius: 18,
                  background: "#f4f8fe",
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 16,
                  color: "#172036",
                }}
              >
                <strong>{title}</strong>
                <span style={{ color: "#71829f" }}>{desc}</span>
              </div>
            ))}
          </div>
        </InfoCard>
      </section>
    </PageShell>
  );
}
