import Link from "next/link";
import type { ReactNode } from "react";
import { getNavItems } from "../lib/nav";

export function MiniShell({
  title,
  subtitle,
  activeTab,
  action,
  children,
}: {
  title: string;
  subtitle?: string;
  activeTab: "home" | "chat" | "knowledge" | "history";
  action?: ReactNode;
  children: ReactNode;
}) {
  const tabs = getNavItems("mini");
  const activePathMap = {
    home: "/mini/home",
    chat: "/mini/chat",
    knowledge: "/mini/knowledge",
    history: "/mini/history",
  } as const;

  return (
    <div style={{ minHeight: "100vh", padding: "32px 24px", background: "linear-gradient(180deg, #eef3fb 0%, #e8eef8 100%)" }}>
      <div
        style={{
          width: 390,
          margin: "0 auto",
          background: "#10192b",
          borderRadius: 44,
          padding: 12,
          boxShadow: "0 28px 70px rgba(16, 25, 43, 0.18)",
        }}
      >
        <div style={{ background: "#eef3fb", minHeight: "88vh", borderRadius: 34, overflow: "hidden", position: "relative" }}>
          <div style={{ padding: "14px 0 0", display: "grid", placeItems: "center" }}>
            <div style={{ width: 124, height: 18, borderRadius: 999, background: "#121a2d" }} />
          </div>

          <div style={{ padding: 18, paddingBottom: 118 }}>
            <section
              style={{
                background: "#ffffff",
                borderRadius: 32,
                padding: "24px 22px",
                border: "1px solid rgba(213, 224, 239, 0.9)",
                boxShadow: "0 8px 24px rgba(20, 34, 56, 0.05)",
                marginBottom: 18,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start" }}>
                <div>
                  <h1 style={{ margin: 0, fontSize: 24, lineHeight: 1.15, color: "#16223b" }}>{title}</h1>
                  {subtitle ? <p style={{ margin: "6px 0 0", color: "#71829f", fontSize: 12, lineHeight: 1.5 }}>{subtitle}</p> : null}
                </div>
                {action}
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
              const active = item.href === activePathMap[activeTab];
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
                  }}
                >
                  <span style={{ fontSize: 22, lineHeight: 1 }}>{item.label === "首页" ? "⌂" : item.label === "问答" ? "?" : item.label === "知识库" ? "▤" : "☷" }</span>
                  <span>{item.label}</span>
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
        borderRadius: 28,
        border: "1px solid rgba(213, 224, 239, 0.9)",
        boxShadow: "0 8px 24px rgba(20, 34, 56, 0.04)",
        padding: 22,
      }}
    >
      {children}
    </section>
  );
}

export function CitationCard({
  href,
  fileName,
  sourceLevel,
  pageNumber,
  version,
  publishDate,
  effectiveDate,
  expiryDate,
  isTraining,
  isExpiredPromotion,
}: {
  href: string;
  fileName: string;
  sourceLevel: string;
  pageNumber: number;
  version: string;
  publishDate?: string;
  effectiveDate?: string;
  expiryDate?: string | null;
  isTraining?: boolean;
  isExpiredPromotion?: boolean;
}) {
  return (
    <Link
      href={href}
      style={{
        display: "grid",
        gap: 8,
        padding: 16,
        borderRadius: 18,
        background: isExpiredPromotion ? "#fff2f2" : "#f6f9fe",
        border: `1px solid ${isExpiredPromotion ? "#ffd7d7" : "#d9e5f3"}`,
      }}
    >
      <strong style={{ color: "#16223b", lineHeight: 1.4 }}>{fileName}</strong>
      <div style={{ color: "#6e809c", fontSize: 12, lineHeight: 1.7 }}>
        {sourceLevel} · P.{pageNumber} · {version}
        {publishDate ? ` · 发布 ${publishDate}` : ""}
        {effectiveDate ? ` · 生效 ${effectiveDate}` : ""}
        {expiryDate ? ` · 失效 ${expiryDate}` : ""}
      </div>
      {isTraining ? <span style={{ color: "#c47a00", fontSize: 12 }}>内部培训资料，具体以官方条款为准</span> : null}
      {isExpiredPromotion ? <span style={{ color: "#dc2626", fontSize: 12 }}>该优惠已过期</span> : null}
    </Link>
  );
}
