"use client";

import Link from "next/link";
import { MiniCard, MiniShell } from "../../../../components/mini-shell";
import { useMiniLocale } from "../../../../components/mini-locale";
import { getMiniCategory, getMiniKnowledgeItemsByCategory } from "@/src/data";

export default function MiniKnowledgeCategoryPage({ params }: { params: { category: string } }) {
  const { t } = useMiniLocale();
  const category = getMiniCategory(params.category);

  if (!category) {
    return (
      <MiniShell title={{ zhHans: "分类问题列表", zhHant: "分類問題列表" }} activeTab="knowledge">
        <MiniCard>
          <div style={{ color: "#6d7f9c" }}>未找到对应分类。</div>
        </MiniCard>
      </MiniShell>
    );
  }

  const items = getMiniKnowledgeItemsByCategory(category.id);

  return (
    <MiniShell title={category.title} subtitle={{ zhHans: "点击高频问题直接进入问答页", zhHant: "點擊高頻問題直接進入問答頁" }} activeTab="knowledge">
      <MiniCard>
        {items.length ? (
          <div style={{ display: "grid", gap: 12 }}>
            {items.map((item) => (
              <Link
                key={item.id}
                href={`/mini/chat?question=${encodeURIComponent(item.question.zhHans)}&knowledgeId=${item.id}`}
                style={{
                  padding: "14px 0",
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 12,
                  borderBottom: "1px solid #e7eef8",
                  color: "#16223b",
                  textDecoration: "none",
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, lineHeight: 1.6 }}>{t(item.question)}</div>
                  <div style={{ marginTop: 6, fontSize: 12, color: "#90a1ba" }}>最近更新 {item.updatedAt}</div>
                </div>
                <span style={{ color: "#90a1ba" }}>查看</span>
              </Link>
            ))}
          </div>
        ) : (
          <div style={{ color: "#71829f", lineHeight: 1.8 }}>该分类的高频问题正在整理中，你也可以直接去问答页输入问题。</div>
        )}
      </MiniCard>
    </MiniShell>
  );
}
