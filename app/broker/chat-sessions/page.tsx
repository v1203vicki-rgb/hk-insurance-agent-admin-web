import Link from "next/link";
import { DataTable, type TableRow } from "../../../components/data-table";
import { InfoCard } from "../../../components/info-card";
import { PageShell } from "../../../components/page-shell";
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
    risk,
    time,
  ]);

  try {
    const sessions = await getBrokerChatSessions();
    rows = sessions.map((item) => [
      <Link key={item.id} href={`/broker/chat-sessions/${item.id}`} style={{ color: "#1b2740", fontWeight: 700 }}>
        {item.question}
      </Link>,
      item.riskType,
      `${item.citationCount}个来源`,
      "导出匿名会话",
      item.createdAt ?? "-",
    ]);
  } catch {
    // 演示模式沿用本地数据。
  }

  return (
    <PageShell title="会话记录" description="仅查看本公司会话，支持导出匿名会话，不能看到其他经纪公司数据。" actions={<ToolbarButton tone="dark">导出匿名会话</ToolbarButton>}>
      <InfoCard title="会话列表">
        <DataTable headers={["问题", "风险标签 / 分类", "来源命中", "导出方式", "时间"]} rows={rows} gridTemplateColumns="2.5fr 1fr 0.8fr 1fr 0.8fr" />
      </InfoCard>
    </PageShell>
  );
}
