"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { MiniCard, MiniShell } from "../../../components/mini-shell";
import { useMiniLocale } from "../../../components/mini-locale";
import { miniCategories, miniKnowledgeItems } from "@/src/data";

export default function MiniKnowledgePage() {
  const { t } = useMiniLocale();
  const [keyword, setKeyword] = useState("");

  const categories = useMemo(() => {
    if (!keyword.trim()) return miniCategories;
    return miniCategories.filter((category) => {
      const text = `${t(category.title)} ${t(category.topics)}`.toLowerCase();
      return text.includes(keyword.trim().toLowerCase());
    });
  }, [keyword, t]);

  return (
    <MiniShell
      title={{ zhHans: "知识库", zhHant: "知識庫" }}
      subtitle={{ zhHans: "快速进入高频知识分类，不做内容门户", zhHant: "快速進入高頻知識分類，不做內容門戶" }}
      activeTab="knowledge"
    >
      <MiniCard>
        <div style={searchBoxStyle}>
          <input
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            placeholder={t({ zhHans: "搜索知识点，例如：冷静期、核保、保单贷款", zhHant: "搜索知識點，例如：冷靜期、核保、保單貸款" })}
            style={searchInputStyle}
          />
        </div>
      </MiniCard>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        {categories.map((category) => {
          const count = miniKnowledgeItems.filter((item) => item.categoryId === category.id).length || 1;
          return (
            <Link key={category.id} href={`/mini/knowledge/${category.id}`} style={{ textDecoration: "none" }}>
              <MiniCard>
                <div style={{ display: "grid", gap: 12 }}>
                  <div style={badgeStyle}>{category.badge}</div>
                  <div style={{ color: "#16223b", fontWeight: 800, fontSize: 16, lineHeight: 1.4 }}>{t(category.title)}</div>
                  <div style={{ color: "#71829f", fontSize: 13, lineHeight: 1.7 }}>{t(category.topics)}</div>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 12, color: "#90a1ba", fontSize: 12 }}>
                    <span>{count} 个高频问题</span>
                    <span>最近更新 5 月</span>
                  </div>
                </div>
              </MiniCard>
            </Link>
          );
        })}
      </div>
    </MiniShell>
  );
}

const searchBoxStyle = {
  minHeight: 54,
  borderRadius: 18,
  background: "#f4f8fe",
  border: "1px solid #dbe5f2",
  display: "grid",
  alignItems: "center",
  padding: "0 16px",
};

const searchInputStyle = {
  border: 0,
  outline: "none",
  background: "transparent",
  fontSize: 14,
  color: "#16223b",
};

const badgeStyle = {
  width: 44,
  height: 44,
  borderRadius: 999,
  background: "#eef3ff",
  display: "grid",
  placeItems: "center",
  fontWeight: 800,
  color: "#16223b",
};
