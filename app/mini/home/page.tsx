import Link from "next/link";
import { MiniCard, MiniShell } from "../../../components/mini-shell";
import { miniCategories, miniHotQuestions } from "@/src/data";

export default function MiniHomePage() {
  return (
    <MiniShell title="保险知识助手" subtitle="可查条款、流程、产品资料差异；所有答案都带来源。" activeTab="home" action={<span style={{ padding: "10px 14px", borderRadius: 999, background: "#eef4ff", color: "#4e76df", fontSize: 12 }}>简 / 繁</span>}>
      <div style={{ background: "#111a2d", color: "#fff", borderRadius: 32, padding: 20 }}>
        <div style={{ fontSize: 13, color: "#c6d3ea" }}>香港保险知识问答</div>
        <div style={{ marginTop: 10, borderRadius: 22, background: "#fff", color: "#7b8cab", padding: "16px 18px", fontSize: 14 }}>
          搜索：冷静期、保单贷款、A/B产品对比...
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        {miniCategories.slice(0, 4).map((category) => (
          <Link key={category.id} href="/mini/knowledge/category">
            <MiniCard>
              <div style={{ width: 52, height: 52, borderRadius: "50%", background: "#eef3ff", display: "grid", placeItems: "center", fontWeight: 800, color: "#16223b" }}>{category.badge}</div>
              <h3 style={{ margin: "18px 0 8px", fontSize: 18, color: "#16223b" }}>{category.title}</h3>
              <div style={{ color: "#71829f", fontSize: 14 }}>{category.topics}</div>
            </MiniCard>
          </Link>
        ))}
      </div>

      <MiniCard>
        <h3 style={{ margin: 0, fontSize: 18, color: "#16223b" }}>热门问题</h3>
        <div style={{ marginTop: 12, display: "grid" }}>
          {miniHotQuestions.map((question) => (
            <Link key={question} href="/mini/chat" style={{ padding: "14px 0", borderBottom: "1px solid #e7eef8", display: "flex", justifyContent: "space-between", gap: 12, color: "#16223b" }}>
              <span>{question}</span>
              <span style={{ color: "#9badc9" }}>›</span>
            </Link>
          ))}
        </div>
      </MiniCard>

      <MiniCard>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 14 }}>
          <div>
            <div style={{ fontSize: 20, fontWeight: 800, color: "#16223b" }}>产品客观对比</div>
            <div style={{ marginTop: 6, color: "#71829f", fontSize: 14 }}>只列资料差异，不做打分、排序或推荐</div>
          </div>
          <Link href="/mini/compare/select" style={{ minWidth: 94, minHeight: 52, borderRadius: 18, background: "#111a2d", color: "#fff", display: "grid", placeItems: "center", fontWeight: 700 }}>
            开始
          </Link>
        </div>
      </MiniCard>
    </MiniShell>
  );
}
