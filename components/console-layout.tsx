"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { buildBreadcrumbs } from "../lib/nav";
import { canAccessPath, clearDemoSession, getDemoSession, isSensitiveBrokerPath, type DemoSession } from "../lib/auth";
import { Sidebar } from "./sidebar";
import { StatusBadge } from "./status-badge";

const roleLabelMap = {
  PLATFORM_ADMIN: "平台管理员",
  BROKER_ADMIN: "经纪公司管理员",
  BROKER_USER: "经纪人",
} as const;

export function ConsoleLayout({
  scope,
  children,
}: {
  scope: "platform" | "broker";
  children: ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [session, setSession] = useState<DemoSession | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const current = getDemoSession();
    if (!current) {
      router.replace("/login");
      return;
    }

    if (!canAccessPath(current.role, pathname) || (current.role === "BROKER_USER" && isSensitiveBrokerPath(pathname))) {
      router.replace("/forbidden");
      return;
    }

    setSession(current);
    setReady(true);
  }, [pathname, router]);

  const breadcrumbs = useMemo(() => buildBreadcrumbs(pathname), [pathname]);

  if (!ready || !session) {
    return (
      <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", color: "#6d7f9c" }}>
        正在进入演示后台...
      </div>
    );
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "280px minmax(0, 1fr)", minHeight: "100vh" }}>
      <Sidebar scope={scope} />
      <div style={{ minWidth: 0, minHeight: "100vh", display: "grid", gridTemplateRows: "auto minmax(0, 1fr)" }}>
        <header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 10,
            background: "rgba(238, 243, 251, 0.92)",
            backdropFilter: "blur(18px)",
            borderBottom: "1px solid #dbe5f2",
            padding: "18px 32px",
            display: "flex",
            justifyContent: "space-between",
            gap: 24,
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap", color: "#6d7f9c", fontSize: 12 }}>
            {breadcrumbs.map((item, index) => (
              <div key={`${item.href}-${index}`} style={{ display: "flex", gap: 10, alignItems: "center" }}>
                {index > 0 ? <span style={{ color: "#9cafc8" }}>/</span> : null}
                <Link href={item.href} style={{ color: index === breadcrumbs.length - 1 ? "#19253d" : "#6d7f9c", fontWeight: index === breadcrumbs.length - 1 ? 700 : 600 }}>
                  {item.label}
                </Link>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
            <StatusBadge label={roleLabelMap[session.role]} tone="info" />
            {session.tenantName ? <span style={{ color: "#6d7f9c", fontSize: 13 }}>{session.tenantName}</span> : null}
            <button
              onClick={() => {
                clearDemoSession();
                router.replace("/login");
              }}
              style={{
                height: 40,
                padding: "0 16px",
                borderRadius: 999,
                border: "1px solid #dbe5f2",
                background: "#ffffff",
                color: "#19253d",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              退出
            </button>
          </div>
        </header>

        <div style={{ minWidth: 0, overflowX: "hidden", overflowY: "auto" }}>{children}</div>
      </div>
    </div>
  );
}
