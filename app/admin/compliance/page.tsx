import Link from "next/link";
import { DataTable, type TableRow } from "../../../components/data-table";
import { InfoCard } from "../../../components/info-card";
import { PageShell } from "../../../components/page-shell";
import { StatCard } from "../../../components/stat-card";
import { StatusBadge } from "../../../components/status-badge";
import { TableControls } from "../../../components/table-controls";
import { ToolbarButton } from "../../../components/toolbar-button";
import { getComplianceOverview } from "../../../lib/api";
import { complianceRows, complianceStats } from "../../../lib/mock-data";

export default async function CompliancePage() {
  let stats = complianceStats;
  let rows: TableRow[] = complianceRows.map(([issue, riskType, status, time, note], index) => [
    <Link key={issue} href={`/admin/compliance/risk_${index + 1}`} style={{ color: "#1b2740", fontWeight: 700 }}>
      {issue}
    </Link>,
    riskType,
    <StatusBadge key={`${issue}-status`} label={status} tone={status === "通过" ? "success" : status === "待复核" ? "warning" : "info"} />,
    time,
    note,
  ]);

  try {
    const overview = await getComplianceOverview();
    stats = overview.stats.map((item) => ({ label: item.label, value: String(item.value) }));
    rows = overview.records.map((item, index) => [
      <Link key={item.type} href={`/admin/compliance/risk_${index + 1}`} style={{ color: "#1b2740", fontWeight: 700 }}>
        {item.type}
      </Link>,
      item.note,
      <StatusBadge key={`${item.type}-status`} label={item.status} />,
      item.latestAt,
      String(item.count),
    ]);
  } catch {
    // 演示模式沿用本地数据。
  }

  return (
    <PageShell title="合规审核" description="统一追踪敏感回答、高风险问题、无来源拦截、内部培训资料引用和过期优惠引用。">
      <section style={{ display: "grid", gap: 18, gridTemplateColumns: "repeat(4, minmax(0, 1fr))" }}>
        {stats.map((stat) => (
          <StatCard key={stat.label} label={stat.label} value={stat.value} />
        ))}
      </section>

      <InfoCard title="合规记录列表" description="可进入详情页查看命中规则、引用来源和审核结论。">
        <TableControls
          searchPlaceholder="搜索问题 / 风险类型 / 命中规则"
          filters={[
            { label: "风险类型", minWidth: 120 },
            { label: "审核结论", minWidth: 120 },
            { label: "官方文件", minWidth: 120 },
            { label: "时间范围", minWidth: 130 },
          ]}
          selectionLabel="已选择 1 项"
          batchActions={
            <>
              <ToolbarButton>加入禁答规则</ToolbarButton>
              <ToolbarButton>补充 FAQ</ToolbarButton>
            </>
          }
          pageLabel="第 1 页，共 4 页"
        />
        <DataTable headers={["记录", "风险类型 / 命中说明", "当前状态", "最近时间", "建议动作"]} rows={rows} gridTemplateColumns="1.6fr 1.8fr 0.8fr 0.9fr 1fr" minWidth={1180} />
      </InfoCard>
    </PageShell>
  );
}
