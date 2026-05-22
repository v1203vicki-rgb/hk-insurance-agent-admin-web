import { DataTable, type TableRow } from "../../../components/data-table";
import { InfoCard } from "../../../components/info-card";
import { PageShell } from "../../../components/page-shell";
import { StatusBadge } from "../../../components/status-badge";
import { ToolbarButton } from "../../../components/toolbar-button";
import { getTenants } from "../../../lib/api";
import { tenants } from "../../../lib/mock-data";

export default async function TenantsPage() {
  let rows: TableRow[] = tenants.map(([name, brokers, asks, status]) => [
    name,
    brokers,
    asks,
    <StatusBadge key={`${name}-status`} label={status} />,
  ]);

  try {
    const items = await getTenants();
    rows = items.map((item) => [
      item.name,
      String(item.brokerUserCount ?? 0),
      String(item.askCount ?? 0),
      <StatusBadge key={item.id} label={item.status} />,
    ]);
  } catch {
    // Use mock rows.
  }

  return (
    <PageShell title="租户管理" description="管理经纪公司、经纪人数量、问答量和状态" actions={<ToolbarButton tone="dark">新增租户</ToolbarButton>}>
      <InfoCard title="租户列表" description="平台管理员可启用 / 禁用经纪公司，并查看本公司资料和问答规模。">
        <div style={{ marginBottom: 18, borderRadius: 18, border: "1px solid #dbe5f2", background: "#f7faff", padding: "14px 16px", color: "#9aa9c1" }}>
          搜索经纪公司名称
        </div>
        <DataTable headers={["经纪公司", "经纪人", "问答量", "状态"]} rows={rows} gridTemplateColumns="1.8fr 0.8fr 0.9fr 0.8fr" />
      </InfoCard>
    </PageShell>
  );
}
