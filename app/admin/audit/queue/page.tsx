import { DataTable } from "../../../../components/data-table";
import { InfoCard } from "../../../../components/info-card";
import { PageShell } from "../../../../components/page-shell";
import { StatusBadge } from "../../../../components/status-badge";
import { ToolbarButton } from "../../../../components/toolbar-button";
import { platformDocuments } from "../../../../lib/mock-data";

export default function ReviewQueuePage() {
  return (
    <PageShell title="资料审核队列" description="集中查看待审核列表、来源等级和审核建议" actions={<ToolbarButton tone="dark">批量审核</ToolbarButton>}>
      <InfoCard title="待审核列表" description="审核通过后可进入平台公共知识库。">
        <DataTable
          headers={["文件", "来源公司", "可信度", "状态", "审核建议"]}
          rows={platformDocuments.map(([fileName, company, level, status, action]) => [fileName, company, <StatusBadge key={`${fileName}-level`} label={level} />, <StatusBadge key={`${fileName}-status`} label={status} />, action])}
          gridTemplateColumns="2.1fr 1.2fr 0.8fr 0.8fr 0.8fr"
        />
      </InfoCard>
    </PageShell>
  );
}
