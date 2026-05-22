import { DataTable } from "../../../components/data-table";
import { InfoCard } from "../../../components/info-card";
import { PageShell } from "../../../components/page-shell";
import { StatusBadge } from "../../../components/status-badge";
import { ToolbarButton } from "../../../components/toolbar-button";
import { brokerUsers } from "../../../lib/mock-data";

export default function BrokerUsersPage() {
  return (
    <PageShell title="经纪人账号" description="新增、编辑、停用经纪人，并查看本公司顾问问答数据" actions={<ToolbarButton tone="dark">新增经纪人</ToolbarButton>}>
      <InfoCard title="经纪人列表">
        <DataTable
          headers={["姓名", "邮箱", "状态", "问答量", "专长"]}
          rows={brokerUsers.map(([name, email, status, asks, focus]) => [name, email, <StatusBadge key={`${name}-status`} label={status} />, asks, focus])}
          gridTemplateColumns="0.9fr 1.5fr 0.8fr 0.8fr 1fr"
        />
      </InfoCard>
    </PageShell>
  );
}
