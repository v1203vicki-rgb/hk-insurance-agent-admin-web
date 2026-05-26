"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { buildBreadcrumbs } from "../lib/nav";
import { canAccessPath, clearDemoSession, getDemoSession, isSensitiveBrokerPath, type DemoSession } from "../lib/auth";
import { ConsoleLoadingShell } from "./console-loading-shell";
import { Sidebar } from "./sidebar";
import { StatusBadge } from "./status-badge";

const roleLabelMap = {
  PLATFORM_ADMIN: "平台管理员",
  BROKER_ADMIN: "经纪公司管理员",
  BROKER_USER: "经纪人",
} as const;

type AuthState = "checking" | "redirecting-login" | "redirecting-forbidden" | "ready";

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
  const [authState, setAuthState] = useState<AuthState>("checking");

  const breadcrumbs = useMemo(() => buildBreadcrumbs(pathname), [pathname]);
  const currentTitle = breadcrumbs[breadcrumbs.length - 1]?.label ?? (scope === "platform" ? "平台管理后台" : "经纪公司后台");

  useEffect(() => {
    const current = getDemoSession();

    if (!current) {
      setAuthState("redirecting-login");
      const timer = window.setTimeout(() => router.replace("/login"), 900);
      return () => window.clearTimeout(timer);
    }

    if (!canAccessPath(current.role, pathname) || (current.role === "BROKER_USER" && isSensitiveBrokerPath(pathname))) {
      setAuthState("redirecting-forbidden");
      const timer = window.setTimeout(() => router.replace("/forbidden"), 900);
      return () => window.clearTimeout(timer);
    }

    setSession(current);
    setAuthState("ready");
  }, [pathname, router]);

  if (authState !== "ready" || !session) {
    return (
      <>
        <ConsoleLoadingShell
          scope={scope}
          title={currentTitle}
          message={
            authState === "redirecting-login"
              ? `正在进入${scope === "platform" ? "平台管理后台" : "经纪公司后台"}演示模式。如未自动跳转，请返回登录页选择演示角色。`
              : authState === "redirecting-forbidden"
                ? "当前角色没有该页面权限。如未自动跳转，请返回登录页选择可访问的演示角色。"
                : `正在进入${scope === "platform" ? "平台管理后台" : "经纪公司后台"}演示模式，请稍候。`
          }
        />
        <noscript>
          <div style={{ padding: 24, background: "#fff8e8", color: "#8a5a00", lineHeight: 1.8 }}>
            当前页面需要启用 JavaScript 才能加载演示后台。请返回
            <a href="/login" style={{ margin: "0 6px" }}>登录页</a>
            或
            <a href="/" style={{ marginLeft: 6 }}>入口页</a>。
          </div>
        </noscript>
      </>
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
          <div style={{ display: "grid", gap: 10 }}>
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
            <h1 style={{ margin: 0, fontSize: 24, lineHeight: 1.2, color: "#172036" }}>{currentTitle}</h1>
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
