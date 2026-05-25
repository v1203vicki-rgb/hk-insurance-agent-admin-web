import { notFound } from "next/navigation";
import { CitationCard, MiniCard, MiniShell } from "../../../../components/mini-shell";
import { miniCitations, miniHistoryItems } from "@/src/data";

export default function MiniHistoryDetailPage({ params }: { params: { id: string } }) {
  const item = miniHistoryItems.find((record) => record.id === params.id);
  if (!item) notFound();

  return (
    <MiniShell title="咨询记录详情" subtitle={`${item.time} · 风险标签 ${item.risk}`} activeTab="history">
      <MiniCard>
        <div style={{ color: "#16223b", lineHeight: 1.9 }}>
          <div><strong>问题：</strong>{item.title}</div>
          <div><strong>分类：</strong>{item.category}</div>
          <div><strong>来源命中：</strong>{item.citationCount} 个</div>
          <div><strong>风险标签：</strong>{item.risk}</div>
        </div>
      </MiniCard>

      <MiniCard>
        <h3 style={{ margin: 0, fontSize: 18, color: "#16223b" }}>Assistant 回答引用</h3>
        <div style={{ display: "grid", gap: 12, marginTop: 14 }}>
          {miniCitations.slice(0, 2).map((citation) => (
            <CitationCard
              key={citation.id}
              href={`/mini/citation/${citation.id}`}
              fileName={citation.fileName}
              sourceLevel={citation.sourceLevel}
              pageNumber={citation.pageNumber}
              version={citation.version}
              publishDate={citation.publishDate}
              effectiveDate={citation.effectiveDate}
              expiryDate={citation.expiryDate}
              isTraining={citation.isTrainingMaterial}
              isExpiredPromotion={citation.isExpiredPromotion}
            />
          ))}
        </div>
      </MiniCard>
    </MiniShell>
  );
}
