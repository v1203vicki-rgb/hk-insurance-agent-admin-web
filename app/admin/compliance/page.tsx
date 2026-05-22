import { DataTable, type TableRow } from "../../../components/data-table";
import { InfoCard } from "../../../components/info-card";
import { PageShell } from "../../../components/page-shell";
import { StatCard } from "../../../components/stat-card";
import { StatusBadge } from "../../../components/status-badge";
import { ToolbarButton } from "../../../components/toolbar-button";
import { getComplianceOverview } from "../../../lib/api";
import { complianceRows, complianceStats } from "../../../lib/mock-data";

export default async function CompliancePage() {
  let stats = complianceStats;
  let rows: TableRow[] = complianceRows.map(([issue, riskType, status, time, note]) => [
    issue,
    riskType,
    <StatusBadge key={`${issue}-status`} label={status} />,
    time,
    note,
  ]);

  try {
    const overview = await getComplianceOverview();
    stats = overview.stats.map((item) => ({ label: item.label, value: String(item.value) }));
    rows = overview.records.map((item) => [
      item.type,
      item.note,
      <StatusBadge key={`${item.type}-status`} label={item.status} />,
      item.latestAt,
      item.count,
    ]);
  } catch {
    // Use mock rows.
  }

  return (
    <PageShell title="合规审核" description="敏感回答、高风险问题、无来源拦截和过期优惠引用统一追踪" actions={<ToolbarButton tone="dark">查看明细</ToolbarButton>}>
      <section style={{ display: "grid", gap: 20, gridTemplateColumns: "repeat(4, minmax(0, 1fr))" }}>
        {stats.map((stat) => (
          <StatCard key={stat.label} label={stat.label} value={stat.value} />
        ))}
      </section>

      <InfoCard title="合规审核列表" description="系统会记录收益类回答、过期优惠、内部培训资料引用和无来源拦截。">
        <DataTable headers={["问题类型", "规则备注", "状态", "最近时间", "数量"]} rows={rows} gridTemplateColumns="1.4fr 1.8fr 0.8fr 0.9fr 0.6fr" />
      </InfoCard>
    </PageShell>
  );
}
