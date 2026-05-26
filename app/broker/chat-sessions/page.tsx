import Link from "next/link";
import { DataTable, type TableRow } from "../../../components/data-table";
import { InfoCard } from "../../../components/info-card";
import { PageShell } from "../../../components/page-shell";
import { StatusBadge } from "../../../components/status-badge";
import { TableControls } from "../../../components/table-controls";
import { ToolbarButton } from "../../../components/toolbar-button";
import { getBrokerChatSessions } from "../../../lib/api";
import { brokerChatSessions } from "../../../lib/mock-data";

export default async function BrokerChatSessionsPage() {
  let rows: TableRow[] = brokerChatSessions.map(([question, category, hits, risk, time], index) => [
    <Link key={question} href={`/broker/chat-sessions/session_${index + 1}`} style={{ color: "#1b2740", fontWeight: 700 }}>
      {question}
    </Link>,
    category,
    hits,
    <StatusBadge key={`${question}-risk`} label={risk} tone={risk.includes("高") ? "danger" : risk.includes("中") ? "warning" : "info"} />,
    time,
  ]);

  try {
    const sessions = await getBrokerChatSessions();
    rows = sessions.map((item) => [
      <Link key={item.id} href={`/broker/chat-sessions/${item.id}`} style={{ color: "#1b2740", fontWeight: 700 }}>
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
    <PageShell title="会话记录" description="仅查看本公司会话，支持导出匿名会话，不能看到其他经纪公司数据。" actions={<ToolbarButton tone="dark">导出匿名会话</ToolbarButton>}>
      <InfoCard title="会话列表">
        <TableControls
          searchPlaceholder="搜索问题 / 风险标签 / 匿名客户 ID"
          filters={[
            { label: "风险类型", minWidth: 120 },
            { label: "来源命中", minWidth: 120 },
            { label: "时间范围", minWidth: 130 },
          ]}
          selectionLabel="已选择 2 项"
          batchActions={
            <>
              <ToolbarButton>导出匿名会话</ToolbarButton>
              <ToolbarButton>查看详情</ToolbarButton>
            </>
          }
          pageLabel="第 1 页，共 3 页"
        />
        <DataTable headers={["问题", "风险标签 / 分类", "来源命中", "风险状态", "时间"]} rows={rows} gridTemplateColumns="2.6fr 1.1fr 0.9fr 0.9fr 0.9fr" minWidth={1120} />
      </InfoCard>
    </PageShell>
  );
}
