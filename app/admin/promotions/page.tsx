import Link from "next/link";
import { DataTable, type TableRow } from "../../../components/data-table";
import { InfoCard } from "../../../components/info-card";
import { PageShell } from "../../../components/page-shell";
import { StatusBadge } from "../../../components/status-badge";
import { ToolbarButton } from "../../../components/toolbar-button";
import { getPromotions } from "../../../lib/api";
import { promotionDetails } from "../../../lib/mock-data";

export default async function PromotionsPage() {
  let rows: TableRow[] = [
    [
      <Link key="promo_1" href="/admin/promotions/promo_1" style={{ color: "#1b2740", fontWeight: 700 }}>
        {promotionDetails.promo_1.name}
      </Link>,
      promotionDetails.promo_1.product,
      promotionDetails.promo_1.startDate,
      promotionDetails.promo_1.endDate,
      <StatusBadge key="promo_1-status" label="启用" />,
    ],
  ];

  try {
    const items = await getPromotions();
    rows = items.map((item) => [
      <Link key={item.id} href={`/admin/promotions/${item.id}`} style={{ color: "#1b2740", fontWeight: 700 }}>
        {item.name}
      </Link>,
      item.product,
      item.startDate,
      item.endDate,
      <StatusBadge key={`${item.id}-status`} label={item.status} />,
    ]);
  } catch {
    // Keep mock rows.
  }

  return (
    <PageShell title="优惠政策管理" description="管理有效期、适用条件、来源文件与前端展示状态" actions={<ToolbarButton tone="dark">新增优惠</ToolbarButton>}>
      <InfoCard title="优惠列表" description="过期优惠不自动下架，但前端与回答中必须明确标记“已过期”。">
        <DataTable headers={["优惠名称", "适用产品", "开始日期", "结束日期", "状态"]} rows={rows} gridTemplateColumns="1.3fr 1.8fr 0.9fr 0.9fr 0.8fr" />
      </InfoCard>
    </PageShell>
  );
}
