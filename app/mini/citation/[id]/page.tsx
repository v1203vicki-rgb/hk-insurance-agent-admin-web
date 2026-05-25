import { notFound } from "next/navigation";
import { MiniCard, MiniShell } from "../../../../components/mini-shell";
import { miniCitations } from "@/src/data";

export default function MiniCitationDetailPage({ params }: { params: { id: string } }) {
  const citation = miniCitations.find((item) => item.id === params.id);
  if (!citation) notFound();

  return (
    <MiniShell title="引用来源详情" subtitle="来源可追溯与版本可核对" activeTab="chat">
      <MiniCard>
        <div style={{ display: "grid", gap: 10, color: "#16223b" }}>
          <div><strong>文件名称：</strong>{citation.fileName}</div>
          <div><strong>来源等级：</strong>{citation.sourceLevel}</div>
          <div><strong>页码：</strong>P.{citation.pageNumber}</div>
          <div><strong>版本号：</strong>{citation.version}</div>
          <div><strong>发布日期：</strong>{citation.publishDate}</div>
          <div><strong>生效日期：</strong>{citation.effectiveDate}</div>
          <div><strong>失效日期：</strong>{citation.expiryDate || "无"}</div>
          <div><strong>内部培训资料：</strong>{citation.isTrainingMaterial ? "是，需以官方条款为准" : "否"}</div>
          <div><strong>过期优惠：</strong>{citation.isExpiredPromotion ? "是，该优惠已过期" : "否"}</div>
        </div>
      </MiniCard>
    </MiniShell>
  );
}
