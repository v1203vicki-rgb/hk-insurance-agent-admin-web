"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { MiniCard, MiniShell } from "../../../components/mini-shell";
import { useMiniLocale } from "../../../components/mini-locale";
import { miniHistorySessions } from "@/src/data";

export default function MiniHistoryPage() {
  const { t } = useMiniLocale();
  const [keyword, setKeyword] = useState("");
  const [filters, setFilters] = useState<string[]>([]);

  const records = useMemo(() => {
    return miniHistorySessions.filter((item) => {
      const text = `${t(item.title)} ${t(item.category)} ${item.createdAt}`.toLowerCase();
      const matchedKeyword = !keyword.trim() || text.includes(keyword.trim().toLowerCase());
      const date = new Date(item.createdAt.replace(" ", "T"));
      const reference = new Date("2026-05-26T23:59:59");
      const diffDays = Math.floor((reference.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
      const matchedToday = !filters.includes("today") || diffDays === 0;
      const matched7d = !filters.includes("7d") || diffDays <= 7;
      const matched30d = !filters.includes("30d") || diffDays <= 30;
      const matchedCompare = !filters.includes("compare") || t(item.category).includes("对比");
      const matchedUpload = !filters.includes("upload") || item.uploads.length > 0;
      const matchedNoAnswer = !filters.includes("no-answer") || item.riskType === "BENEFIT_OR_RETURN";
      const matchedRisk = !filters.includes("risk") || item.riskLevel !== "LOW";
      return matchedKeyword && matchedToday && matched7d && matched30d && matchedCompare && matchedUpload && matchedNoAnswer && matchedRisk;
    });
  }, [filters, keyword, t]);

  return (
    <MiniShell
      title={{ zhHans: "历史记录", zhHant: "歷史記錄" }}
      subtitle={{ zhHans: "快速找回可复制回答和引用来源", zhHant: "快速找回可複製回答和引用來源" }}
      activeTab="history"
      action={
        <Link href="/mini/settings" style={settingsButtonStyle}>
          设置与隐私
        </Link>
      }
    >
      <MiniCard>
        <div style={searchBoxStyle}>
          <input value={keyword} onChange={(event) => setKeyword(event.target.value)} placeholder="搜索历史问题" style={searchInputStyle} />
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 14 }}>
          {[
            { id: "today", label: "今天" },
            { id: "7d", label: "7天" },
            { id: "30d", label: "30天" },
            { id: "compare", label: "产品对比" },
            { id: "upload", label: "上传文件" },
            { id: "no-answer", label: "无答案" },
            { id: "risk", label: "高风险" },
          ].map(({ id, label }) => {
            const active = filters.includes(id);
            return (
              <button key={id} onClick={() => setFilters((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))} style={chipStyle(active)}>
                {label}
              </button>
            );
          })}
        </div>
      </MiniCard>

      {records.map((item) => {
        const assistant = item.messages.find((message) => message.role === "ASSISTANT");
        return (
          <Link key={item.id} href={`/mini/history/${item.id}`} style={{ textDecoration: "none" }}>
            <MiniCard>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                <div>
                  <strong style={{ color: "#16223b", fontSize: 17, lineHeight: 1.5 }}>{t(item.title)}</strong>
                  <div style={{ marginTop: 8, display: "flex", gap: 8, flexWrap: "wrap" }}>
                    <span style={tagStyle}>{t(item.category)}</span>
                    <span style={{ ...tagStyle, color: "#2563eb", background: "#eef4ff" }}>{assistant?.citations?.length ?? 0} 个引用</span>
                    {item.uploads.length > 0 ? <span style={{ ...tagStyle, color: "#4e76df" }}>含上传文件</span> : null}
                    <span style={{ ...tagStyle, color: "#0f9f6e", background: "#e8fbf0" }}>已生成客户版回答</span>
                  </div>
                </div>
                <span style={{ color: "#6d7f9c", fontSize: 13 }}>{item.createdAt.slice(11, 16)}</span>
              </div>
            </MiniCard>
          </Link>
        );
      })}
    </MiniShell>
  );
}

const settingsButtonStyle = {
  minHeight: 34,
  padding: "0 12px",
  borderRadius: 999,
  background: "#f3f7fd",
  color: "#4e76df",
  display: "inline-flex",
  alignItems: "center",
  textDecoration: "none",
  fontSize: 12,
  fontWeight: 700,
};

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

const chipStyle = (active: boolean) => ({
  border: 0,
  minHeight: 32,
  padding: "0 14px",
  borderRadius: 999,
  background: active ? "#111a2d" : "#eef4ff",
  color: active ? "#fff" : "#4e76df",
  fontSize: 12,
  fontWeight: 700,
});

const tagStyle = {
  minHeight: 30,
  padding: "0 12px",
  borderRadius: 999,
  background: "#f4f7fc",
  color: "#71829f",
  display: "inline-flex",
  alignItems: "center",
  fontSize: 12,
};
