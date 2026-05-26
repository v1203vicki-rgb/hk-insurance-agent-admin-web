import Link from "next/link";
import { DataTable, type TableRow } from "../../../components/data-table";
import { InfoCard } from "../../../components/info-card";
import { PageShell } from "../../../components/page-shell";
import { StatusBadge } from "../../../components/status-badge";
import { TableControls } from "../../../components/table-controls";
import { ToolbarButton } from "../../../components/toolbar-button";
import { getFaqs } from "../../../lib/api";
import { faqDetails } from "../../../lib/mock-data";

export default async function FaqsPage() {
  let rows: TableRow[] = Object.values(faqDetails).map((item) => [
    item.category,
    <Link key={item.id} href={`/admin/faqs/${item.id}`} style={{ color: "#1b2740", fontWeight: 700 }}>
      {item.question}
    </Link>,
    item.sourceFile ?? "-",
    String(item.sourcePage ?? "-"),
    <StatusBadge key={`${item.id}-status`} label={item.status} tone={item.status === "启用" ? "success" : "muted"} />,
  ]);

  try {
    const faqs = await getFaqs();
    rows = faqs.map((item) => [
      item.category,
      <Link key={item.id} href={`/admin/faqs/${item.id}`} style={{ color: "#1b2740", fontWeight: 700 }}>
        {item.question}
      </Link>,
      item.sourceFile ?? "-",
      String(item.sourcePage ?? "-"),
      <StatusBadge key={`${item.id}-status`} label={item.status} />,
    ]);
  } catch {
    // 演示模式沿用本地数据。
  }

  return (
    <PageShell title="FAQ 管理" description="管理标准问答、来源页码、繁简体内容和前端展示效果预览。" actions={<ToolbarButton tone="dark">新增</ToolbarButton>}>
      <InfoCard title="FAQ 列表" description="FAQ 详情页也必须展示来源文件和页码。">
        <TableControls
          searchPlaceholder="搜索分类 / 标准问题 / 来源文件"
          filters={[
            { label: "FAQ 分类", minWidth: 120 },
            { label: "是否热门", minWidth: 120 },
            { label: "当前状态", minWidth: 120 },
            { label: "时间范围", minWidth: 130 },
          ]}
          selectionLabel="已选择 4 项"
          batchActions={
            <>
              <ToolbarButton>批量启用</ToolbarButton>
              <ToolbarButton>批量下线</ToolbarButton>
            </>
          }
          pageLabel="第 1 页，共 6 页"
        />
        <DataTable headers={["分类", "标准问题", "来源文件", "页码", "状态"]} rows={rows} gridTemplateColumns="0.9fr 2fr 1.4fr 0.6fr 0.8fr" minWidth={1040} />
      </InfoCard>
    </PageShell>
  );
}
