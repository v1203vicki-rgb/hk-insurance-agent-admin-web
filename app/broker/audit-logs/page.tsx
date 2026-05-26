import { DataTable, type TableRow } from "../../../components/data-table";
import { InfoCard } from "../../../components/info-card";
import { PageShell } from "../../../components/page-shell";
import { TableControls } from "../../../components/table-controls";
import { ToolbarButton } from "../../../components/toolbar-button";
import { getBrokerAuditLogs } from "../../../lib/api";

const fallbackRows: TableRow[] = [
  ["港华 Admin", "上传资料", "AIA_重疾险产品小册子.pdf", "待审核", "2026-05-21 09:41"],
  ["港华 Admin", "导出会话", "匿名会话记录", "已导出", "2026-05-20 15:33"],
  ["Agent Wong", "查看会话", "匿名客户 #A102", "已查看", "2026-05-20 11:08"],
  ["港华 Admin", "新增经纪人", "Agent Chan", "启用", "2026-05-19 16:20"],
];

export default async function BrokerAuditLogsPage() {
  let rows = fallbackRows;

  try {
    const logs = await getBrokerAuditLogs();
    rows = logs.map((item) => [item.user, item.action, item.targetType, item.result, item.time]);
  } catch {
    // Use fallback rows.
  }

  return (
    <PageShell title="操作日志" description="记录本公司上传、查看会话、导出和账号操作。">
      <InfoCard title="日志列表">
        <TableControls
          searchPlaceholder="搜索操作 / 用户 / 文件"
          filters={[
            { label: "事件类型", minWidth: 120 },
            { label: "操作结果", minWidth: 120 },
            { label: "时间范围", minWidth: 130 },
          ]}
          actions={<ToolbarButton>导出</ToolbarButton>}
          selectionLabel="已选择 0 项"
          pageLabel="第 1 页，共 4 页"
        />
        <DataTable headers={["用户", "操作", "目标", "结果", "时间"]} rows={rows} gridTemplateColumns="1fr 1fr 1.9fr 0.9fr 1.1fr" minWidth={1080} />
      </InfoCard>
    </PageShell>
  );
}
