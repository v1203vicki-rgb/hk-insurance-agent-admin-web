import Link from "next/link";
import { DataTable, type TableRow } from "../../../components/data-table";
import { InfoCard } from "../../../components/info-card";
import { PageShell } from "../../../components/page-shell";
import { StatusBadge } from "../../../components/status-badge";
import { ToolbarButton } from "../../../components/toolbar-button";
import { getDocuments } from "../../../lib/api";
import { platformDocuments } from "../../../lib/mock-data";

export default async function DocumentsPage() {
  let rows: TableRow[] = platformDocuments.map(([fileName, company, level, status, action]) => [
    <Link key={fileName} href="/admin/documents/doc_1" style={{ color: "#1b2740", fontWeight: 700 }}>
      {fileName}
    </Link>,
    company,
    <StatusBadge key={`${fileName}-level`} label={level} />,
    <StatusBadge key={`${fileName}-status`} label={status} />,
    action,
  ]);

  try {
    const response = await getDocuments();
    rows = response.items.map((item) => [
      <Link key={item.id} href={`/admin/documents/${item.id}`} style={{ color: "#1b2740", fontWeight: 700 }}>
        {item.fileName}
      </Link>,
      item.reviewComment ?? "平台上传",
      <StatusBadge key={`${item.id}-level`} label={(item.sourceLevel ?? "L2").replace("_OFFICIAL_BROCHURE", "")} />,
      <StatusBadge key={`${item.id}-status`} label={item.status} />,
      item.suggestedAction ?? "查看",
    ]);
  } catch {
    // Keep mock rows.
  }

  return (
    <PageShell title="公共知识库" description="文件名称、来源等级、版本状态和前端可引用能力统一在此管理" actions={<ToolbarButton tone="dark">上传资料</ToolbarButton>}>
      <InfoCard title="知识文件列表" description="点击文件名查看解析状态、审核意见、切片结果和前端引用设置。">
        <div style={{ display: "grid", gridTemplateColumns: "1.6fr 0.8fr 0.8fr", gap: 12, marginBottom: 18 }}>
          <div style={{ borderRadius: 18, border: "1px solid #dbe5f2", background: "#f7faff", padding: "14px 16px", color: "#9aa9c1" }}>搜索文件名 / 产品名</div>
          <div style={{ borderRadius: 18, border: "1px solid #dbe5f2", background: "#f7faff", padding: "14px 16px", color: "#6f809d" }}>来源等级</div>
          <div style={{ borderRadius: 18, border: "1px solid #dbe5f2", background: "#f7faff", padding: "14px 16px", color: "#6f809d" }}>状态</div>
        </div>
        <DataTable headers={["文件", "来源公司", "可信度", "状态", "操作"]} rows={rows} gridTemplateColumns="2.2fr 1.2fr 0.8fr 0.8fr 0.7fr" />
      </InfoCard>
    </PageShell>
  );
}
