import Link from "next/link";
import { DataTable, type TableRow } from "../../../components/data-table";
import { InfoCard } from "../../../components/info-card";
import { PageShell } from "../../../components/page-shell";
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
    risk,
    time,
  ]);

  try {
    const sessions = await getAdminChatSessions();
    rows = sessions.map((item) => [
      <Link key={item.id} href={`/admin/chat-sessions/${item.id}`} style={{ color: "#1b2740", fontWeight: 700 }}>
        {item.question}
      </Link>,
      item.riskType,
      `${item.citationCount}个来源`,
      item.language ?? "ZH_HANS",
      item.createdAt ?? "-",
    ]);
  } catch {
    // Use mock rows.
  }

  return (
    <PageShell title="会话管理" description="查看客户问题、Agent 回答、命中文件与风险标签" actions={<ToolbarButton tone="dark">导出匿名会话</ToolbarButton>}>
      <InfoCard title="会话列表" description="MVP 不做客户留资，后台不展示真实身份字段。">
        <DataTable headers={["问题", "分类 / 风险", "来源命中", "语言", "时间"]} rows={rows} gridTemplateColumns="2.5fr 1fr 0.8fr 0.8fr 0.7fr" />
      </InfoCard>
    </PageShell>
  );
}
