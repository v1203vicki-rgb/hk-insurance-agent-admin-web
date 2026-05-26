import Link from "next/link";
import { DataTable, type TableRow } from "../../../components/data-table";
import { InfoCard } from "../../../components/info-card";
import { PageShell } from "../../../components/page-shell";
import { StatusBadge } from "../../../components/status-badge";
import { TableControls } from "../../../components/table-controls";
import { ToolbarButton } from "../../../components/toolbar-button";
import { getAdminProducts } from "../../../lib/api";
import { products } from "../../../lib/mock-data";

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
        <TableControls
          searchPlaceholder="搜索产品名称 / 保险公司 / 产品类型"
          filters={[
            { label: "产品类型", minWidth: 120 },
            { label: "当前状态", minWidth: 120 },
            { label: "启用版本", minWidth: 120 },
            { label: "时间范围", minWidth: 130 },
          ]}
          selectionLabel="已选择 2 项"
          batchActions={
            <>
              <ToolbarButton>批量导出</ToolbarButton>
              <ToolbarButton>批量设为启用</ToolbarButton>
            </>
          }
          pageLabel="第 1 页，共 4 页"
        />
        <DataTable headers={["保险公司", "产品名称", "产品类型", "当前状态", "当前启用版本", "优惠政策"]} rows={rows} gridTemplateColumns="1fr 1.8fr 1fr 0.8fr 0.9fr 1fr" minWidth={1120} />
      </InfoCard>
    </PageShell>
  );
}
