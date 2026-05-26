import Link from "next/link";
import { DataTable, type TableRow } from "../../../components/data-table";
import { InfoCard } from "../../../components/info-card";
import { PageShell } from "../../../components/page-shell";
import { StatusBadge } from "../../../components/status-badge";
import { TableControls } from "../../../components/table-controls";
import { ToolbarButton } from "../../../components/toolbar-button";
import { getPromotions } from "../../../lib/api";
import { promotionDetails } from "../../../lib/mock-data";

export default async function PromotionsPage() {
  let rows: TableRow[] = Object.values(promotionDetails).map((item) => [
    <Link key={item.id} href={`/admin/promotions/${item.id}`} style={{ color: "#1b2740", fontWeight: 700 }}>
      {item.name}
    </Link>,
    item.insuranceCompany ?? "-",
    item.product,
    item.startDate,
    item.endDate,
    <StatusBadge key={`${item.id}-status`} label={item.status} tone={item.status === "已过期" ? "danger" : item.status === "生效中" ? "success" : "warning"} />,
    item.frontendVisible ? "是" : "否",
  ]);

  try {
    const items = await getPromotions();
    rows = items.map((item) => [
      <Link key={item.id} href={`/admin/promotions/${item.id}`} style={{ color: "#1b2740", fontWeight: 700 }}>
        {item.name}
      </Link>,
      item.insuranceCompany ?? "-",
      item.product,
      item.startDate,
      item.endDate,
      <StatusBadge key={`${item.id}-status`} label={item.status} tone={item.status === "EXPIRED" ? "danger" : item.status === "ACTIVE" ? "success" : "warning"} />,
      item.frontendVisible ? "是" : "否",
    ]);
  } catch {
    // 演示模式沿用本地数据。
  }

  return (
    <PageShell title="优惠政策管理" description="过期优惠不自动删除，过期状态会标红显示，状态不明的优惠不能作为当前有效优惠。" actions={<ToolbarButton tone="dark">新增</ToolbarButton>}>
      <InfoCard title="优惠列表" description="可查看适用产品、有效期、来源文件和前端展示状态。">
        <TableControls
          searchPlaceholder="搜索优惠名称 / 适用产品 / 来源文件"
          filters={[
            { label: "保险公司", minWidth: 120 },
            { label: "当前状态", minWidth: 120 },
            { label: "前端展示", minWidth: 120 },
            { label: "时间范围", minWidth: 130 },
          ]}
          selectionLabel="已选择 1 项"
          batchActions={
            <>
              <ToolbarButton>批量导出</ToolbarButton>
              <ToolbarButton>批量禁用</ToolbarButton>
            </>
          }
          pageLabel="第 1 页，共 3 页"
        />
        <DataTable headers={["优惠名称", "保险公司", "适用产品", "开始日期", "结束日期", "当前状态", "前端展示"]} rows={rows} gridTemplateColumns="1.4fr 1fr 1.5fr 0.9fr 0.9fr 0.9fr 0.8fr" minWidth={1180} />
      </InfoCard>
    </PageShell>
  );
}
