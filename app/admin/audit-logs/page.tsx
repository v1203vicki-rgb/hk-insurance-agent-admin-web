import { DataTable, type TableRow } from "../../../components/data-table";
import { InfoCard } from "../../../components/info-card";
import { PageShell } from "../../../components/page-shell";
import { TableControls } from "../../../components/table-controls";
import { ToolbarButton } from "../../../components/toolbar-button";
import { getAuditLogs } from "../../../lib/api";

const fallbackRows: TableRow[] = [
  ["张晓敏", "资料审核", "AIA_重疾险产品小册子.pdf", "启用", "2026-05-20 10:28"],
  ["陈经理", "修改 Agent 规则", "高风险规则组", "成功", "2026-05-20 09:31"],
  ["Admin", "导出匿名会话", "session_2", "成功", "2026-05-20 08:46"],
];

export default async function AdminAuditLogsPage() {
  let rows = fallbackRows;

  try {
    const logs = await getAuditLogs();
    rows = logs.map((item) => [item.user, item.action, item.targetType, item.result, item.time]);
  } catch {
    // Use local rows.
  }

  return (
    <PageShell title="操作日志" description="记录登录、审核、启用、禁用、导出和权限变更等关键事件。">
      <InfoCard title="日志列表" description="MVP 阶段先保留 1 年审计日志，后续可接入更细粒度字段。">
        <TableControls
          searchPlaceholder="搜索操作人 / 动作 / 目标"
          filters={[
            { label: "事件类型", minWidth: 120 },
            { label: "操作结果", minWidth: 120 },
            { label: "时间范围", minWidth: 130 },
          ]}
          actions={<ToolbarButton>导出</ToolbarButton>}
          selectionLabel="已选择 0 项"
          pageLabel="第 1 页，共 7 页"
        />
        <DataTable headers={["操作人", "动作", "目标", "结果", "时间"]} rows={rows} gridTemplateColumns="0.9fr 1.2fr 1.5fr 0.7fr 1fr" minWidth={980} />
      </InfoCard>
    </PageShell>
  );
}
