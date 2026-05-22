import Link from "next/link";
import { DataTable, type TableRow } from "../../../components/data-table";
import { InfoCard } from "../../../components/info-card";
import { PageShell } from "../../../components/page-shell";
import { StatusBadge } from "../../../components/status-badge";
import { ToolbarButton } from "../../../components/toolbar-button";
import { getBrokerDocuments } from "../../../lib/api";
import { brokerDocuments } from "../../../lib/mock-data";

export default async function BrokerDocumentsPage() {
  let rows: TableRow[] = brokerDocuments.map(([fileName, fileType, version, status]) => [
    <Link key={fileName} href="/broker/documents/doc_1" style={{ color: "#1b2740", fontWeight: 700 }}>
      {fileName}
    </Link>,
    fileType,
    version,
    <StatusBadge key={`${fileName}-status`} label={status} />,
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
    ]);
  } catch {
    // Use mock rows.
  }

  return (
    <PageShell
      title="文件状态"
      description="查看本公司上传文件的审核状态、版本和启用情况"
      actions={
        <Link href="/broker/upload">
          <ToolbarButton>继续上传</ToolbarButton>
        </Link>
      }
    >
      <InfoCard title="文件状态列表" description="资料过期不会自动禁用，但会标记“已过期”。">
        <DataTable headers={["文件", "类型", "版本", "状态"]} rows={rows} gridTemplateColumns="2.1fr 1fr 0.8fr 0.8fr" />
      </InfoCard>
    </PageShell>
  );
}
