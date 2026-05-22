import Link from "next/link";
import { DataTable, type TableRow } from "../../../components/data-table";
import { InfoCard } from "../../../components/info-card";
import { PageShell } from "../../../components/page-shell";
import { StatusBadge } from "../../../components/status-badge";
import { ToolbarButton } from "../../../components/toolbar-button";
import { getAdminProducts } from "../../../lib/api";
import { products } from "../../../lib/mock-data";

const filterStyle = {
  borderRadius: 18,
  border: "1px solid #dbe5f2",
  background: "#f7faff",
  padding: "14px 16px",
  color: "#6f809d",
} as const;

export default async function ProductsPage() {
  let rows: TableRow[] = products.map(([company, name, type, status, version]) => [
    company,
    <Link key={name} href="/admin/products/product_1" style={{ color: "#1b2740", fontWeight: 700 }}>
      {name}
    </Link>,
    type,
    <StatusBadge key={`${name}-status`} label={status} />,
    version,
  ]);

  try {
    const items = await getAdminProducts();
    rows = items.map((item) => [
      item.insuranceCompany,
      <Link key={item.id} href={`/admin/products/${item.id}`} style={{ color: "#1b2740", fontWeight: 700 }}>
        {item.name}
      </Link>,
      item.productType,
      <StatusBadge key={item.id} label={item.status} />,
      item.activeVersion,
    ]);
  } catch {
    // Use mock data.
  }

  return (
    <PageShell
      title="产品管理"
      description="管理保险公司、产品版本、当前启用版本和关联文件"
      actions={
        <>
          <Link href="/admin/products/companies">
            <ToolbarButton>保险公司管理</ToolbarButton>
          </Link>
          <ToolbarButton tone="dark">新增产品</ToolbarButton>
        </>
      }
    >
      <InfoCard title="产品列表" description="Agent 默认使用当前启用版本；若问题明确指定版本，则按指定版本检索。">
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 0.9fr 0.9fr", gap: 12, marginBottom: 20 }}>
          <div style={{ ...filterStyle, color: "#9aa9c1" }}>搜索产品名 / 保险公司</div>
          <div style={filterStyle}>产品类型</div>
          <div style={filterStyle}>版本状态</div>
        </div>
        <DataTable headers={["保险公司", "产品名称", "类型", "状态", "当前启用版本"]} rows={rows} gridTemplateColumns="1fr 1.7fr 0.9fr 0.8fr 0.9fr" />
      </InfoCard>
    </PageShell>
  );
}
