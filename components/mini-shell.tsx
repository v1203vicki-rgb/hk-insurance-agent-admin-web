"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { getFriendlySourceLevel, type LocalizedText, type MiniCitation } from "@/src/data";
import { useMiniLocale } from "./mini-locale";
import { getNavItems } from "../lib/nav";

type MiniTab = "chat" | "products" | "knowledge" | "history";

export function MiniShell({
  title,
  subtitle,
  activeTab,
  action,
  children,
}: {
  title: LocalizedText | string;
  subtitle?: LocalizedText | string;
  activeTab: MiniTab;
  action?: ReactNode;
  children: ReactNode;
}) {
  const tabs = getNavItems("mini");
  const { locale, setLocale, t } = useMiniLocale();
  const tabLabelMap: Record<MiniTab, LocalizedText> = {
    chat: { zhHans: "问答", zhHant: "問答" },
    products: { zhHans: "产品", zhHant: "產品" },
    knowledge: { zhHans: "知识库", zhHant: "知識庫" },
    history: { zhHans: "记录", zhHant: "記錄" },
  };

  const resolvedTitle = typeof title === "string" ? title : t(title);
  const resolvedSubtitle = typeof subtitle === "string" ? subtitle : subtitle ? t(subtitle) : undefined;

  return (
    <div style={{ minHeight: "100vh", padding: "28px 20px", background: "linear-gradient(180deg, #edf3fb 0%, #e8eef8 100%)" }}>
      <div
        style={{
          width: 390,
          margin: "0 auto",
          background: "#10192b",
          borderRadius: 42,
          padding: 12,
          boxShadow: "0 28px 70px rgba(16, 25, 43, 0.18)",
        }}
      >
        <div style={{ background: "#eef3fb", minHeight: "88vh", borderRadius: 34, overflow: "hidden", position: "relative" }}>
          <div style={{ padding: "14px 0 0", display: "grid", placeItems: "center" }}>
            <div style={{ width: 124, height: 18, borderRadius: 999, background: "#121a2d" }} />
          </div>

          <div style={{ padding: 18, paddingBottom: 114 }}>
            <section
              style={{
                background: "#ffffff",
                borderRadius: 30,
                padding: "22px 22px 20px",
                border: "1px solid rgba(213, 224, 239, 0.9)",
                boxShadow: "0 8px 24px rgba(20, 34, 56, 0.05)",
                marginBottom: 18,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start" }}>
                <div style={{ minWidth: 0 }}>
                  <h1 style={{ margin: 0, fontSize: 24, lineHeight: 1.2, color: "#16223b" }}>{resolvedTitle}</h1>
                  {resolvedSubtitle ? (
                    <p style={{ margin: "8px 0 0", color: "#71829f", fontSize: 12, lineHeight: 1.6 }}>{resolvedSubtitle}</p>
                  ) : null}
                </div>
                <div style={{ display: "grid", gap: 8, justifyItems: "end" }}>
                  {action}
                  <div style={{ display: "flex", gap: 6, padding: 4, borderRadius: 999, background: "#eef4ff" }}>
                    <button onClick={() => setLocale("ZH_HANS")} style={localeButtonStyle(locale === "ZH_HANS")}>
                      简体中文
                    </button>
                    <button onClick={() => setLocale("ZH_HANT")} style={localeButtonStyle(locale === "ZH_HANT")}>
                      繁體中文
                    </button>
                  </div>
                </div>
              </div>
            </section>

            <div style={{ display: "grid", gap: 18 }}>{children}</div>
          </div>

          <nav
            style={{
              position: "absolute",
              left: 18,
              right: 18,
              bottom: 14,
              background: "#ffffff",
              borderRadius: 26,
              padding: "10px 8px",
              border: "1px solid #d7e2f1",
              display: "grid",
              gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
              boxShadow: "0 -6px 18px rgba(18, 26, 45, 0.05)",
            }}
          >
            {tabs.map((item) => {
              const tabKey = item.href.split("/").pop() as MiniTab;
              const active = tabKey === activeTab;
              const iconMap: Record<MiniTab, string> = {
                chat: "问",
                products: "产",
                knowledge: "知",
                history: "记",
              };

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    display: "grid",
                    gap: 8,
                    placeItems: "center",
                    minHeight: 62,
                    borderRadius: 18,
                    color: active ? "#16223b" : "#8ea0bd",
                    fontSize: 12,
                    fontWeight: active ? 700 : 500,
                    background: active ? "#f5f8fd" : "transparent",
                    textDecoration: "none",
                  }}
                >
                  <span
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: 999,
                      display: "grid",
                      placeItems: "center",
                      background: active ? "#111a2d" : "#eef3fb",
                      color: active ? "#ffffff" : "#7d8daa",
                      fontSize: 12,
                      lineHeight: 1,
                    }}
                  >
                    {iconMap[tabKey]}
                  </span>
                  <span>{t(tabLabelMap[tabKey] ?? { zhHans: item.label, zhHant: item.label })}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}

export function MiniCard({ children }: { children: ReactNode }) {
  return (
    <section
      style={{
        background: "#ffffff",
        borderRadius: 26,
        border: "1px solid rgba(213, 224, 239, 0.9)",
        boxShadow: "0 8px 24px rgba(20, 34, 56, 0.04)",
        padding: 22,
      }}
    >
      {children}
    </section>
  );
}

export function CitationCard({ href, citation }: { href: string; citation: MiniCitation }) {
  const { locale, t } = useMiniLocale();
  const meta = getFriendlySourceLevel(citation.sourceLevel);
  const sourceLevelText =
    locale === "ZH_HANT"
      ? {
          source: "來源",
          page: "頁碼",
          version: "版本",
          effective: "生效",
          level: "等級",
          training: "含內部培訓資料，需以官方文件為準",
          expired: "該優惠已過期，僅可作為歷史資料參考",
        }
      : {
          source: "来源",
          page: "页码",
          version: "版本",
          effective: "生效",
          level: "等级",
          training: "含内部培训资料，需以官方文件为准",
          expired: "该优惠已过期，仅可作为历史资料参考",
        };
  const localizedMetaLabel =
    locale === "ZH_HANT"
      ? {
          "官方条款": "官方條款",
          "官方小册子": "官方小冊子",
          "费率 / 利益说明": "費率 / 利益說明",
          "官方通告 / 优惠": "官方通告 / 優惠",
          "内部培训资料": "內部培訓資料",
        }[meta.label] ?? meta.label
      : meta.label;

  return (
    <Link
      href={href}
      style={{
        display: "grid",
        gap: 8,
        padding: 16,
        borderRadius: 18,
        background: citation.isExpiredPromotion ? "#fff2f2" : "#f6f9fe",
        border: `1px solid ${citation.isExpiredPromotion ? "#ffd7d7" : "#d9e5f3"}`,
        textDecoration: "none",
      }}
    >
      <strong style={{ color: "#16223b", lineHeight: 1.45 }}>{citation.fileName}</strong>
      <div style={{ display: "grid", gap: 4, color: "#6e809c", fontSize: 12, lineHeight: 1.7 }}>
        <span>{sourceLevelText.source}：{localizedMetaLabel}</span>
        <span>{sourceLevelText.page}：P.{citation.pageNumber}</span>
        <span>{sourceLevelText.version}：{citation.version}</span>
        <span>{sourceLevelText.effective}：{citation.effectiveDate}</span>
      </div>
      <div style={{ color: "#90a1ba", fontSize: 11 }}>{sourceLevelText.level} {citation.sourceLevel}</div>
      {citation.isTrainingMaterial ? (
        <span style={{ color: "#c47a00", fontSize: 12 }}>{sourceLevelText.training}</span>
      ) : null}
      {citation.isExpiredPromotion ? (
        <span style={{ color: "#dc2626", fontSize: 12 }}>{sourceLevelText.expired}</span>
      ) : null}
    </Link>
  );
}

const localeButtonStyle = (active: boolean) => ({
  border: 0,
  minHeight: 28,
  padding: "0 10px",
  borderRadius: 999,
  background: active ? "#ffffff" : "transparent",
  color: active ? "#1b2740" : "#4e76df",
  fontSize: 12,
  fontWeight: 700,
  cursor: "pointer",
});
