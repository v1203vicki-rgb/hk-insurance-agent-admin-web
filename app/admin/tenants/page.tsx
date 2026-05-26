import { DataTable, type TableRow } from "../../../components/data-table";
import { InfoCard } from "../../../components/info-card";
import { PageShell } from "../../../components/page-shell";
import { StatusBadge } from "../../../components/status-badge";
import { TableControls } from "../../../components/table-controls";
import { ToolbarButton } from "../../../components/toolbar-button";
import { getTenants } from "../../../lib/api";
import { tenants } from "../../../lib/mock-data";

export default async function TenantsPage() {
  let rows: TableRow[] = tenants.map(([name, brokers, asks, status]) => [name, brokers, asks, <StatusBadge key={`${name}-status`} label={status} />]);

  try {
    const items = await getTenants();
    rows = items.map((item) => [item.name, String(item.brokerUserCount ?? 0), String(item.askCount ?? 0), <StatusBadge key={item.id} label={item.status} />]);
  } catch {
    // Use mock rows.
  }

  return (
    <PageShell title="租户管理" description="管理经纪公司、经纪人数量、问答量和状态。" actions={<ToolbarButton tone="dark">新增</ToolbarButton>}>
      <InfoCard title="租户列表" description="平台管理员可启用 / 禁用经纪公司，并查看本公司资料和问答规模。">
        <TableControls
          searchPlaceholder="搜索经纪公司名称 / 联系人 / 邮箱"
          filters={[
            { label: "租户状态", minWidth: 120 },
            { label: "经纪人规模", minWidth: 120 },
            { label: "时间范围", minWidth: 130 },
          ]}
          selectionLabel="已选择 2 项"
          batchActions={
            <>
              <ToolbarButton>批量启用</ToolbarButton>
              <ToolbarButton>批量禁用</ToolbarButton>
            </>
          }
          pageLabel="第 1 页，共 5 页"
        />
        <DataTable headers={["经纪公司", "经纪人", "问答量", "状态"]} rows={rows} gridTemplateColumns="1.8fr 0.8fr 0.9fr 0.8fr" minWidth={960} />
      </InfoCard>
    </PageShell>
  );
}
