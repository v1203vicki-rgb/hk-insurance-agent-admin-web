import { CitationCard, MiniCard, MiniShell } from "../../../components/mini-shell";
import { miniCitations } from "@/src/data";

const rows = [
  ["保障地区", "全球", "亚洲及指定地区"],
  ["年度限额", "HKD 30M", "HKD 25M"],
  ["病房级别", "私家/半私家", "半私家"],
  ["既往症", "按核保结果", "按核保结果"],
  ["优惠政策", "有效至 6/30", "已过期"],
];

export default function MiniComparePage() {
  return (
    <MiniShell title="产品客观对比" subtitle="不排名、不打分、不推荐；每项都要来源" activeTab="chat">
      <MiniCard>
        <h3 style={{ margin: 0, fontSize: 18, color: "#16223b" }}>对比结果</h3>
        <p style={{ margin: "8px 0 0", color: "#71829f", lineHeight: 1.8 }}>以下仅列资料差异，不构成购买建议。</p>
        <div style={{ marginTop: 16, overflow: "hidden", borderRadius: 18, border: "1px solid #dbe5f2" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", background: "#f7faff", color: "#71829f", fontWeight: 700, fontSize: 14 }}>
            {["维度", "A产品", "B产品"].map((header) => (
              <div key={header} style={{ padding: 14 }}>{header}</div>
            ))}
          </div>
          {rows.map((row) => (
            <div key={row[0]} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", borderTop: "1px solid #e6edf7", color: "#16223b", fontSize: 14 }}>
              {row.map((cell) => (
                <div key={cell} style={{ padding: 14 }}>{cell}</div>
              ))}
            </div>
          ))}
        </div>
      </MiniCard>

      <MiniCard>
        <h3 style={{ margin: 0, fontSize: 18, color: "#16223b" }}>差异说明</h3>
        <ul style={{ margin: "12px 0 0", paddingLeft: 18, color: "#4b5c78", lineHeight: 1.9 }}>
          <li>A 产品保障地区更广，B 产品年度限额略低。</li>
          <li>B 产品的历史优惠文件已过期，不能作为当前有效优惠理解。</li>
          <li>页面仅展示客观资料，不对优劣做判断。</li>
        </ul>
        <div style={{ marginTop: 16, padding: 16, borderRadius: 18, background: "#fff8e8", color: "#b15f00" }}>
          注意事项：不构成购买建议，实际适用性需结合个人情况，以官方条款和最新文件为准。
        </div>
        <h4 style={{ margin: "18px 0 10px", fontSize: 16, color: "#16223b" }}>引用来源</h4>
        <div style={{ display: "grid", gap: 12 }}>
          {miniCitations.slice(0, 3).map((citation) => (
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
