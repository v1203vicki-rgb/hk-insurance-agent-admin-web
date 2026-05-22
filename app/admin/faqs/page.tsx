import Link from "next/link";
import { DataTable, type TableRow } from "../../../components/data-table";
import { InfoCard } from "../../../components/info-card";
import { PageShell } from "../../../components/page-shell";
import { StatusBadge } from "../../../components/status-badge";
import { ToolbarButton } from "../../../components/toolbar-button";
import { getFaqs } from "../../../lib/api";
import { faqDetails } from "../../../lib/mock-data";

export default async function FaqsPage() {
  let rows: TableRow[] = [
    [
      faqDetails.faq_1.category,
      <Link key="faq_1" href="/admin/faqs/faq_1" style={{ color: "#1b2740", fontWeight: 700 }}>
        {faqDetails.faq_1.question}
      </Link>,
      faqDetails.faq_1.sourceFile ?? "-",
      String(faqDetails.faq_1.sourcePage ?? "-"),
      <StatusBadge key="faq_1-status" label="启用" />,
    ],
  ];

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
    // Keep mock rows.
  }

  return (
    <PageShell title="FAQ 管理" description="管理标准问答、来源页码、热门排序和启用状态" actions={<ToolbarButton tone="dark">新增 FAQ</ToolbarButton>}>
      <InfoCard title="FAQ 列表" description="FAQ 详情也必须展示来源文件和页码，且支持简体 / 繁体字段扩展。">
        <DataTable headers={["分类", "问题", "来源文件", "页码", "状态"]} rows={rows} gridTemplateColumns="0.9fr 2fr 1.4fr 0.6fr 0.8fr" />
      </InfoCard>
    </PageShell>
  );
}
