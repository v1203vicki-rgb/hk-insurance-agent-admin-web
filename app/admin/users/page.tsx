import { DataTable, type TableRow } from "../../../components/data-table";
import { InfoCard } from "../../../components/info-card";
import { PageShell } from "../../../components/page-shell";
import { StatusBadge } from "../../../components/status-badge";
import { ToolbarButton } from "../../../components/toolbar-button";
import { getUsers } from "../../../lib/api";
import { adminUsers } from "../../../lib/mock-data";

export default async function UsersPage() {
  let rows: TableRow[] = adminUsers.map(([name, email, role, status, tenant]) => [
    name,
    email,
    role,
    <StatusBadge key={`${name}-status`} label={status} />,
    tenant,
  ]);

  try {
    const items = await getUsers();
    rows = items.map((item) => [item.name, item.email, item.role, <StatusBadge key={item.id} label={item.status} />, item.tenantName ?? "平台"]);
  } catch {
    // Keep mock rows.
  }

  return (
    <PageShell
      title="用户与权限"
      description="平台管理员、经纪公司管理员和经纪人账号统一在此管理"
      actions={<ToolbarButton tone="dark">新增账号</ToolbarButton>}
    >
      <InfoCard title="账号列表" description="支持角色分配、状态管理、重置密码和租户归属查看。">
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 0.8fr", gap: 12, marginBottom: 18 }}>
          <div style={{ borderRadius: 18, border: "1px solid #dbe5f2", background: "#f7faff", padding: "14px 16px", color: "#9aa9c1" }}>搜索姓名 / 邮箱</div>
          <div style={{ borderRadius: 18, border: "1px solid #dbe5f2", background: "#f7faff", padding: "14px 16px", color: "#6f809d" }}>角色筛选</div>
          <div style={{ borderRadius: 18, border: "1px solid #dbe5f2", background: "#f7faff", padding: "14px 16px", color: "#6f809d" }}>状态筛选</div>
        </div>
        <DataTable headers={["姓名", "邮箱", "角色", "状态", "归属"]} rows={rows} gridTemplateColumns="1fr 1.5fr 1fr 0.8fr 1fr" />
      </InfoCard>
    </PageShell>
  );
}
