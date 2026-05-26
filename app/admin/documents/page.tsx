import Link from "next/link";
import { DataTable, type TableRow } from "../../../components/data-table";
import { InfoCard } from "../../../components/info-card";
import { PageShell } from "../../../components/page-shell";
import { StatusBadge } from "../../../components/status-badge";
import { TableControls } from "../../../components/table-controls";
import { ToolbarButton } from "../../../components/toolbar-button";
import { getDocuments } from "../../../lib/api";
import { platformDocuments } from "../../../lib/mock-data";

export default async function DocumentsPage() {
  let rows: TableRow[] = platformDocuments.map(([fileName, company, level, status, action], index) => [
    <Link key={fileName} href={`/admin/documents/doc_${index + 1}`} style={{ color: "#1b2740", fontWeight: 700 }}>
      {fileName}
    </Link>,
    company,
    index === 2 ? "优惠通告" : "产品资料",
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
      item.sourceLevel?.startsWith("L4") ? "优惠通告" : "产品资料",
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
      <InfoCard title="知识文件列表" description="列表已统一提供搜索、筛选、时间范围、分页和批量操作区。">
        <TableControls
          searchPlaceholder="搜索文件名称 / 来源公司 / 关联产品"
          filters={[
            { label: "文件类型", minWidth: 130 },
            { label: "来源等级", minWidth: 130 },
            { label: "审核状态", minWidth: 130 },
            { label: "时间范围", minWidth: 130 },
          ]}
          selectionLabel="已选择 3 项"
          batchActions={
            <>
              <ToolbarButton>批量启用</ToolbarButton>
              <ToolbarButton>批量归档</ToolbarButton>
            </>
          }
          pageLabel="第 1 页，共 8 页"
        />
        <DataTable
          headers={["文件名称", "来源公司", "文件类型", "来源等级", "语言", "版本号", "发布日期", "生效日期", "失效日期", "当前启用状态", "审核状态", "操作"]}
          rows={rows}
          gridTemplateColumns="2fr 1.2fr 1fr 1fr 1.1fr 0.9fr 1fr 1fr 1fr 0.9fr 0.9fr 0.8fr"
          minWidth={1500}
        />
      </InfoCard>
    </PageShell>
  );
}
