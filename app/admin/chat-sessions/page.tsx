import Link from "next/link";
import { DataTable, type TableRow } from "../../../components/data-table";
import { InfoCard } from "../../../components/info-card";
import { PageShell } from "../../../components/page-shell";
import { StatusBadge } from "../../../components/status-badge";
import { TableControls } from "../../../components/table-controls";
import { ToolbarButton } from "../../../components/toolbar-button";
import { getAdminChatSessions } from "../../../lib/api";
import { adminChatSessions } from "../../../lib/mock-data";

export default async function AdminChatSessionsPage() {
  let rows: TableRow[] = adminChatSessions.map(([question, category, citations, risk, time], index) => [
    <Link key={question} href={`/admin/chat-sessions/session_${index + 1}`} style={{ color: "#1b2740", fontWeight: 700 }}>
      {question}
    </Link>,
    category,
    citations,
    <StatusBadge key={`${question}-risk`} label={risk} tone={risk.includes("高") ? "danger" : risk.includes("中") ? "warning" : "info"} />,
    time,
  ]);

  try {
    const sessions = await getAdminChatSessions();
    rows = sessions.map((item) => [
      <Link key={item.id} href={`/admin/chat-sessions/${item.id}`} style={{ color: "#1b2740", fontWeight: 700 }}>
        {item.question}
      </Link>,
      item.riskType,
      `${item.citationCount} 个来源`,
      <StatusBadge key={`${item.id}-risk`} label={item.riskType} tone={item.riskType.includes("HIGH") ? "danger" : item.riskType.includes("PERSONAL") ? "warning" : "info"} />,
      item.createdAt ?? "-",
    ]);
  } catch {
    // 演示模式沿用本地数据。
  }

  return (
    <PageShell title="会话管理" description="查看匿名客户问题、Assistant 回答、风险标签、上传文件和引用来源。" actions={<ToolbarButton tone="dark">导出匿名会话</ToolbarButton>}>
      <InfoCard title="会话列表" description="MVP 不展示客户真实身份字段。">
        <TableControls
          searchPlaceholder="搜索问题 / 匿名客户 ID / 租户"
          filters={[
            { label: "风险类型", minWidth: 120 },
            { label: "语言", minWidth: 110 },
            { label: "时间范围", minWidth: 130 },
          ]}
          selectionLabel="已选择 2 项"
          batchActions={
            <>
              <ToolbarButton>导出匿名会话</ToolbarButton>
              <ToolbarButton>加入复核</ToolbarButton>
            </>
          }
          pageLabel="第 1 页，共 5 页"
        />
        <DataTable headers={["问题", "分类 / 风险", "来源命中", "风险状态", "时间"]} rows={rows} gridTemplateColumns="2.6fr 1.1fr 0.9fr 0.9fr 0.9fr" minWidth={1120} />
      </InfoCard>
    </PageShell>
  );
}
