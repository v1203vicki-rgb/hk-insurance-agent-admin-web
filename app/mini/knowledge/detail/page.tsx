import { CitationCard, MiniCard, MiniShell } from "../../../../components/mini-shell";
import { miniCitations } from "@/src/data";

export default function MiniKnowledgeDetailPage() {
  return (
    <MiniShell title="FAQ 详情" subtitle="答案与来源页码同步展示" activeTab="knowledge">
      <MiniCard>
        <h3 style={{ margin: 0, fontSize: 18, color: "#16223b" }}>香港保险冷静期是多久？</h3>
        <p style={{ margin: "12px 0 0", color: "#16223b", lineHeight: 1.8 }}>
          冷静期需以具体产品官方条款为准，不同保险公司和产品可能存在差异。常见做法是以保单签发后的指定天数内可申请撤销。
        </p>
        <div style={{ marginTop: 18, padding: 16, borderRadius: 18, background: "#fff8e8", color: "#b15f00" }}>
          注意事项：已生效保单、保费扣费状态和提交方式仍需以官方文件和持牌顾问说明为准。
        </div>
        <h4 style={{ margin: "20px 0 10px", fontSize: 16, color: "#16223b" }}>引用来源</h4>
        <CitationCard
          href="/mini/citation/mini_citation_1"
          fileName={miniCitations[0].fileName}
          sourceLevel={miniCitations[0].sourceLevel}
          pageNumber={miniCitations[0].pageNumber}
          version={miniCitations[0].version}
          publishDate={miniCitations[0].publishDate}
          effectiveDate={miniCitations[0].effectiveDate}
          expiryDate={miniCitations[0].expiryDate}
        />
      </MiniCard>
    </MiniShell>
  );
}
