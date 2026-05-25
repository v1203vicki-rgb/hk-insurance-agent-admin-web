import Link from "next/link";
import type { CSSProperties } from "react";
import { MiniCard, MiniShell } from "../../../components/mini-shell";
import { miniCategories } from "@/src/data";

export default function MiniKnowledgePage() {
  return (
    <MiniShell title="分类知识库" subtitle="一期支持简体中文 / 繁体中文" activeTab="knowledge">
      {miniCategories.map((category) => (
        <Link key={category.id} href="/mini/knowledge/category">
          <MiniCard>
            <div style={{ display: "grid", gridTemplateColumns: "60px minmax(0,1fr) 20px", gap: 16, alignItems: "center" }}>
              <div style={{ width: 60, height: 60, borderRadius: "50%", background: "#f0f4fb", display: "grid", placeItems: "center", fontWeight: 800, color: "#16223b" }}>{category.badge}</div>
              <div>
                <div style={{ color: "#16223b", fontWeight: 800, fontSize: 18 }}>{category.title}</div>
                <div style={{ color: "#71829f", marginTop: 6, lineHeight: 1.7 }}>{category.topics}</div>
                <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
                  <span style={tagStyle}>常见问题</span>
                  <span style={{ ...tagStyle, color: "#4e76df", background: "#eef4ff" }}>流程</span>
                </div>
              </div>
              <span style={{ color: "#9badc9", fontSize: 22 }}>›</span>
            </div>
          </MiniCard>
        </Link>
      ))}
    </MiniShell>
  );
}

const tagStyle: CSSProperties = {
  minHeight: 30,
  padding: "0 14px",
  borderRadius: 999,
  background: "#f4f7fc",
  color: "#71829f",
  display: "inline-flex",
  alignItems: "center",
  fontSize: 12,
};
