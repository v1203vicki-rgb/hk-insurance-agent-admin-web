import { DataTable, type TableRow } from "../../../components/data-table";
import { InfoCard } from "../../../components/info-card";
import { PageShell } from "../../../components/page-shell";
import { StatusBadge } from "../../../components/status-badge";
import { TableControls } from "../../../components/table-controls";
import { ToolbarButton } from "../../../components/toolbar-button";
import { getUsers } from "../../../lib/api";
import { adminUsers } from "../../../lib/mock-data";

export default async function UsersPage() {
  let rows: TableRow[] = adminUsers.map(([name, email, role, status, tenant]) => [name, email, role, <StatusBadge key={`${name}-status`} label={status} />, tenant]);

  try {
    const items = await getUsers();
    rows = items.map((item) => [item.name, item.email, item.role, <StatusBadge key={item.id} label={item.status} />, item.tenantName ?? "平台"]);
  } catch {
    // Keep mock rows.
  }

  return (
    <PageShell title="用户与权限" description="平台管理员、经纪公司管理员和经纪人账号统一在此管理。" actions={<ToolbarButton tone="dark">新增</ToolbarButton>}>
      <InfoCard title="账号列表" description="支持角色分配、状态管理、重置密码和租户归属查看。">
        <TableControls
          searchPlaceholder="搜索姓名 / 邮箱 / 角色"
          filters={[
            { label: "角色筛选", minWidth: 120 },
            { label: "状态筛选", minWidth: 120 },
            { label: "所属租户", minWidth: 120 },
            { label: "时间范围", minWidth: 130 },
          ]}
          selectionLabel="已选择 3 项"
          batchActions={
            <>
              <ToolbarButton>批量启用</ToolbarButton>
              <ToolbarButton>批量重置密码</ToolbarButton>
            </>
          }
          pageLabel="第 1 页，共 5 页"
        />
        <DataTable headers={["姓名", "邮箱", "角色", "状态", "归属"]} rows={rows} gridTemplateColumns="1fr 1.5fr 1fr 0.8fr 1fr" minWidth={980} />
      </InfoCard>
    </PageShell>
  );
}
