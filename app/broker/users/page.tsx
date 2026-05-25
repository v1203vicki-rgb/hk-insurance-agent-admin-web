import Link from "next/link";
import { DataTable } from "../../../components/data-table";
import { InfoCard } from "../../../components/info-card";
import { PageShell } from "../../../components/page-shell";
import { StatusBadge } from "../../../components/status-badge";
import { ToolbarButton } from "../../../components/toolbar-button";
import { brokerUsers } from "../../../lib/mock-data";

export default function BrokerUsersPage() {
  return (
    <PageShell
      title="经纪人账号"
      description="支持新增、编辑、禁用账号、重置密码，并查看本公司经纪人的问答数据。"
      actions={
        <Link href="/broker/users/user_1">
          <ToolbarButton tone="dark">新增</ToolbarButton>
        </Link>
      }
    >
      <InfoCard title="经纪人列表">
        <DataTable
          headers={["姓名", "邮箱", "状态", "问答量", "关注方向"]}
          rows={brokerUsers.map(([name, email, status, asks, focus], index) => [
            <Link key={name} href={`/broker/users/user_${index + 1}`} style={{ color: "#1b2740", fontWeight: 700 }}>
              {name}
            </Link>,
            email,
            <StatusBadge key={`${name}-status`} label={status} />,
            asks,
            focus,
          ])}
          gridTemplateColumns="0.9fr 1.5fr 0.8fr 0.8fr 1fr"
        />
      </InfoCard>
    </PageShell>
  );
}
