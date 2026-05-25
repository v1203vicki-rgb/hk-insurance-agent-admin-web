import Link from "next/link";
import type { CSSProperties } from "react";
import { DataTable, type TableRow } from "../../../components/data-table";
import { InfoCard } from "../../../components/info-card";
import { PageShell } from "../../../components/page-shell";
import { StatusBadge } from "../../../components/status-badge";
import { ToolbarButton } from "../../../components/toolbar-button";
import { getAdminProducts } from "../../../lib/api";
import { products } from "../../../lib/mock-data";

const filterStyle: CSSProperties = {
  borderRadius: 16,
  border: "1px solid #dbe5f2",
  background: "#f7faff",
  padding: "12px 14px",
  color: "#6f809d",
  minHeight: 44,
  display: "grid",
  alignItems: "center",
};

export default async function ProductsPage() {
  let rows: TableRow[] = products.map(([company, name, type, status, version], index) => [
    company,
    <Link key={name} href={`/admin/products/product_${index + 1}`} style={{ color: "#1b2740", fontWeight: 700 }}>
      {name}
    </Link>,
    type,
    <StatusBadge key={`${name}-status`} label={status} />,
    version,
    index === 2 ? "1 条，已过期" : index === 1 ? "0 条" : "1 条",
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
      item.id === "product_3" ? "1 条，已过期" : item.id === "product_4" ? "1 条" : "0 条",
    ]);
  } catch {
    // 演示模式保留本地数据。
  }

  return (
    <PageShell
      title="产品管理"
      description="拆分为保险公司管理、产品列表与产品详情 / 版本管理，统一控制当前启用版本与关联文件。"
      actions={
        <>
          <Link href="/admin/products/companies">
            <ToolbarButton>保险公司管理</ToolbarButton>
          </Link>
          <ToolbarButton tone="dark">新增</ToolbarButton>
        </>
      }
    >
      <InfoCard title="产品列表" description="支持按保险公司、产品类型、版本状态和时间范围筛选。">
        <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr 1fr auto", gap: 12, marginBottom: 18 }}>
          <div style={filterStyle}>搜索产品名称 / 保险公司</div>
          <div style={filterStyle}>产品类型</div>
          <div style={filterStyle}>状态筛选</div>
          <div style={filterStyle}>时间范围</div>
          <ToolbarButton>批量导出</ToolbarButton>
        </div>
        <DataTable headers={["保险公司", "产品名称", "产品类型", "状态", "当前启用版本", "优惠政策"]} rows={rows} gridTemplateColumns="1fr 1.8fr 1fr 0.8fr 0.9fr 1fr" />
      </InfoCard>
    </PageShell>
  );
}
