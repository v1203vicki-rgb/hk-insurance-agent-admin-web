import Link from "next/link";
import type { CSSProperties } from "react";
import { DataTable, type TableRow } from "../../../components/data-table";
import { InfoCard } from "../../../components/info-card";
import { PageShell } from "../../../components/page-shell";
import { StatusBadge } from "../../../components/status-badge";
import { ToolbarButton } from "../../../components/toolbar-button";
import { getDocuments } from "../../../lib/api";
import { platformDocuments } from "../../../lib/mock-data";

export default async function DocumentsPage() {
  let rows: TableRow[] = platformDocuments.map(([fileName, company, level, status, action], index) => [
    <Link key={fileName} href={`/admin/documents/doc_${index + 1}`} style={{ color: "#1b2740", fontWeight: 700 }}>
      {fileName}
    </Link>,
    company,
    "产品小册子",
    level,
    "繁体中文 / 简体中文",
    `v2026.0${index + 1}`,
    "2026-03-01",
    "2026-03-15",
    index === 2 ? "2026-03-31" : "-",
    index === 2 ? "已过期" : "已启用",
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
      "产品资料",
      item.sourceLevel ?? "L2 官方小册子",
      item.language ?? "简体中文",
      item.version ?? "-",
      item.publishDate ?? "-",
      item.publishDate ?? "-",
      "-",
      item.isExpired ? "已过期" : item.isEnabled ? "已启用" : "待处理",
      <StatusBadge key={`${item.id}-status`} label={item.status} />,
      item.suggestedAction ?? "查看",
    ]);
  } catch {
    // 演示模式使用本地数据。
  }

  return (
    <PageShell
      title="公共知识库"
      description="统一查看文件名称、来源等级、版本日期、解析状态、向量状态、审核状态与前端引用能力。"
      actions={
        <>
          <ToolbarButton>导出</ToolbarButton>
          <Link href="/admin/documents/upload">
            <ToolbarButton tone="dark">新增</ToolbarButton>
          </Link>
        </>
      }
    >
      <InfoCard title="知识文件列表" description="表格支持搜索、筛选、横向滚动与批量操作预留。">
        <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr 1fr 160px", gap: 12, marginBottom: 18 }}>
          <div style={filterFieldStyle}>搜索文件名称 / 来源公司 / 产品</div>
          <div style={filterFieldStyle}>文件类型筛选</div>
          <div style={filterFieldStyle}>状态筛选</div>
          <div style={filterFieldStyle}>时间范围</div>
          <div style={{ display: "flex", gap: 8 }}>
            <ToolbarButton>批量启用</ToolbarButton>
          </div>
        </div>
        <DataTable
          headers={["文件名称", "来源公司", "文件类型", "来源等级", "语言", "版本号", "发布日期", "生效日期", "失效日期", "当前状态", "审核状态", "操作"]}
          rows={rows}
          gridTemplateColumns="2fr 1.2fr 1fr 1fr 1.1fr 0.9fr 1fr 1fr 1fr 0.9fr 0.9fr 0.7fr"
        />
      </InfoCard>
    </PageShell>
  );
}

const filterFieldStyle: CSSProperties = {
  minHeight: 46,
  borderRadius: 16,
  border: "1px solid #dbe5f2",
  background: "#f7faff",
  display: "grid",
  alignItems: "center",
  padding: "0 14px",
  color: "#6f809d",
  fontSize: 14,
};
