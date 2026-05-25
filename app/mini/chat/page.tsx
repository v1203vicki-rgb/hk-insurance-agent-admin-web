import Link from "next/link";
import type { CSSProperties } from "react";
import { CitationCard, MiniCard, MiniShell } from "../../../components/mini-shell";
import { miniCitations, miniFallbackStates } from "@/src/data";

const compareRows = [
  ["年度限额", "HKD 30M", "HKD 25M"],
  ["自付额", "可选", "固定档"],
  ["网络医院", "全球网络", "亚洲优先"],
  ["病房级别", "私家/半私家", "半私家"],
];

export default function MiniChatPage() {
  return (
    <MiniShell title="智能问答" subtitle="答案均展示来源页码" activeTab="chat" action={<span style={{ padding: "10px 14px", borderRadius: 999, background: "#e8fbf0", color: "#0f9f6e", fontSize: 12 }}>强制引用</span>}>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <div style={{ maxWidth: 250, background: "#111a2d", color: "#fff", padding: "16px 18px", borderRadius: 24, fontSize: 14, lineHeight: 1.7 }}>
          A公司和B公司的高端医疗险有什么区别？
        </div>
      </div>

      <MiniCard>
        <h3 style={{ margin: 0, fontSize: 18, color: "#16223b" }}>简短结论</h3>
        <p style={{ margin: "10px 0 0", color: "#16223b", lineHeight: 1.8 }}>
          以下为两个产品的客观资料差异，不构成购买建议。可从保障地区、年度限额、自付额、病房级别、既往症规则比较。
        </p>

        <h4 style={{ margin: "20px 0 10px", fontSize: 16, color: "#16223b" }}>详细说明</h4>
        <ul style={{ margin: 0, paddingLeft: 18, color: "#4b5c78", lineHeight: 1.9 }}>
          <li>A 产品年度限额更高，保障地区更广。</li>
          <li>B 产品对亚洲网络更聚焦，历史优惠文件已过期。</li>
          <li>两者都需要结合预算、既有保障和就医习惯理解适用性。</li>
        </ul>

        <h4 style={{ margin: "20px 0 10px", fontSize: 16, color: "#16223b" }}>对比表</h4>
        <div style={{ overflow: "hidden", borderRadius: 18, border: "1px solid #dbe5f2" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", background: "#f7faff", color: "#71829f", fontWeight: 700, fontSize: 14 }}>
            {["维度", "A产品", "B产品"].map((header) => (
              <div key={header} style={{ padding: 14 }}>{header}</div>
            ))}
          </div>
          {compareRows.map((row) => (
            <div key={row[0]} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", borderTop: "1px solid #e6edf7", color: "#16223b", fontSize: 14 }}>
              {row.map((cell) => (
                <div key={cell} style={{ padding: 14 }}>{cell}</div>
              ))}
            </div>
          ))}
        </div>

        <div style={{ marginTop: 18, padding: 16, borderRadius: 18, background: "#fff8e8", color: "#b15f00", lineHeight: 1.8 }}>
          <strong>注意事项</strong>
          <div>涉及个人健康状况、预算或已有保障时，仅做需求澄清，不输出个性化建议。</div>
        </div>

        <h4 style={{ margin: "20px 0 10px", fontSize: 16, color: "#16223b" }}>适用场景</h4>
        <ul style={{ margin: 0, paddingLeft: 18, color: "#4b5c78", lineHeight: 1.9 }}>
          <li>适合先理解保障地区、病房级别和网络医院差异。</li>
          <li>适合对比年度限额、费用结构和优惠状态。</li>
        </ul>

        <h4 style={{ margin: "20px 0 10px", fontSize: 16, color: "#16223b" }}>引用来源</h4>
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

      <MiniCard>
        <h3 style={{ margin: 0, fontSize: 18, color: "#16223b" }}>问答兜底状态演示</h3>
        <div style={{ display: "grid", gap: 10, marginTop: 12 }}>
          {miniFallbackStates.map((item) => (
            <div key={item.id} style={{ padding: 14, borderRadius: 16, background: "#f7faff" }}>
              <strong style={{ display: "block", color: "#16223b" }}>{item.title}</strong>
              <span style={{ display: "block", marginTop: 6, color: "#6e809c", fontSize: 13, lineHeight: 1.8 }}>{item.message}</span>
            </div>
          ))}
        </div>
      </MiniCard>

      <MiniCard>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 12 }}>
          <Link href="/mini/upload" style={pillButtonStyle}>上传PDF/图片</Link>
          <Link href="/mini/compare/select" style={pillButtonStyle}>产品对比</Link>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 86px", gap: 10 }}>
          <div style={{ minHeight: 56, borderRadius: 18, background: "#f4f8fe", display: "grid", alignItems: "center", padding: "0 16px", color: "#9badc9" }}>输入问题...</div>
          <button style={{ border: 0, borderRadius: 18, background: "#111a2d", color: "#fff", fontWeight: 700 }}>发送</button>
        </div>
      </MiniCard>
    </MiniShell>
  );
}

const pillButtonStyle: CSSProperties = {
  minHeight: 38,
  padding: "0 16px",
  borderRadius: 999,
  background: "#f3f7fd",
  color: "#6d7f9c",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 13,
};
