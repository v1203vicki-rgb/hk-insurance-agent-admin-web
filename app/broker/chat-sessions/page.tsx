import { DataTable, type TableRow } from "../../../components/data-table";
import { InfoCard } from "../../../components/info-card";
import { PageShell } from "../../../components/page-shell";
import { ToolbarButton } from "../../../components/toolbar-button";
import { getBrokerChatSessions } from "../../../lib/api";
import { brokerChatSessions } from "../../../lib/mock-data";

export default async function BrokerChatSessionsPage() {
  let rows: TableRow[] = brokerChatSessions;

  try {
    const sessions = await getBrokerChatSessions();
    rows = sessions.map((item) => [item.question, item.riskType, `${item.citationCount}个来源`, item.exportMode ?? "匿名导出", item.createdAt ?? "-"]);
  } catch {
    // Keep mock rows.
  }

  return (
    <PageShell title="会话记录" description="仅查看本公司客户咨询记录，并支持匿名导出" actions={<ToolbarButton tone="dark">导出匿名会话</ToolbarButton>}>
      <InfoCard title="会话列表">
        <DataTable headers={["问题", "风险标签", "来源命中", "导出方式", "时间"]} rows={rows} gridTemplateColumns="2.5fr 1fr 0.8fr 1fr 0.7fr" />
      </InfoCard>
    </PageShell>
  );
}
