"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getNavItems } from "../lib/nav";

export function Sidebar({ scope }: { scope: "platform" | "broker" }) {
  const pathname = usePathname();
  const items = getNavItems(scope);

  return (
    <aside
      style={{
        position: "sticky",
        top: 0,
        height: "100vh",
        overflowY: "auto",
        background: "#121a2d",
        padding: "24px 18px",
        boxSizing: "border-box",
        borderRight: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div style={{ padding: "6px 10px 18px" }}>
        <div style={{ color: "#ffffff", fontWeight: 800, fontSize: 22, letterSpacing: "-0.02em" }}>HK Insurance AI</div>
        <div style={{ color: "#7f92b4", fontSize: 14, marginTop: 6 }}>{scope === "platform" ? "平台管理后台" : "经纪公司后台"}</div>
      </div>

      <nav style={{ display: "grid", gap: 8 }}>
        {items.map((item) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                padding: "14px 18px",
                borderRadius: 18,
                color: active ? "#121a2d" : "#d9e4f3",
                background: active ? "#ffffff" : "transparent",
                boxShadow: active ? "0 10px 28px rgba(16, 25, 43, 0.28)" : "none",
                fontWeight: active ? 700 : 500,
                fontSize: 15,
              }}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
