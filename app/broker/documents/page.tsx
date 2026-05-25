import Link from "next/link";
import { DataTable, type TableRow } from "../../../components/data-table";
import { InfoCard } from "../../../components/info-card";
import { PageShell } from "../../../components/page-shell";
import { StatusBadge } from "../../../components/status-badge";
import { ToolbarButton } from "../../../components/toolbar-button";
import { getBrokerDocuments } from "../../../lib/api";
import { brokerDocuments } from "../../../lib/mock-data";

export default async function BrokerDocumentsPage() {
  let rows: TableRow[] = brokerDocuments.map(([fileName, fileType, version, status], index) => [
    <Link key={fileName} href={`/broker/documents/doc_${index + 1}`} style={{ color: "#1b2740", fontWeight: 700 }}>
      {fileName}
    </Link>,
    fileType,
    version,
    <StatusBadge key={`${fileName}-status`} label={status} />,
    index === 0 ? "资料清晰，待平台审核" : index === 2 ? "已过期，前端仍需标红" : "已通过平台审核",
  ]);

  try {
    const response = await getBrokerDocuments();
    rows = response.items.map((item) => [
      <Link key={item.id} href={`/broker/documents/${item.id}`} style={{ color: "#1b2740", fontWeight: 700 }}>
        {item.fileName}
      </Link>,
      item.sourceLevel ?? "产品资料",
      item.version ?? "-",
      <StatusBadge key={item.id} label={item.status} />,
      item.reviewComment ?? "暂无审核意见",
    ]);
  } catch {
    // 演示模式沿用本地数据。
  }

  return (
    <PageShell
      title="文件状态"
      description="只查看本公司文件，支持按审核状态、文件类型、时间范围筛选。"
      actions={
        <Link href="/broker/upload">
          <ToolbarButton>继续上传</ToolbarButton>
        </Link>
      }
    >
      <InfoCard title="文件状态列表" description="资料过期不会自动删除，但会保留历史查询并标红显示。">
        <DataTable headers={["文件", "文件类型 / 来源等级", "版本", "审核状态", "审核意见"]} rows={rows} gridTemplateColumns="2.1fr 1fr 0.8fr 0.8fr 1.5fr" />
      </InfoCard>
    </PageShell>
  );
}
