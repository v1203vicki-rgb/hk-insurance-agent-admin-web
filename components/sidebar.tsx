"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const platformLinks = [
  ["/admin", "工作台"],
  ["/admin/tenants", "租户管理"],
  ["/admin/users", "用户权限"],
  ["/admin/documents", "公共知识库"],
  ["/admin/audit", "资料审核"],
  ["/admin/products", "产品/优惠"],
  ["/admin/faqs", "FAQ管理"],
  ["/admin/agent-rules", "Agent配置"],
  ["/admin/compliance", "合规审核"],
  ["/admin/chat-sessions", "会话管理"],
  ["/admin/analytics", "数据看板"],
  ["/admin/audit-logs", "操作日志"],
  ["/admin/dictionary-tags", "字典标签"],
] as const;

const brokerLinks = [
  ["/broker", "公司工作台"],
  ["/broker/users", "经纪人账号"],
  ["/broker/upload", "文件上传"],
  ["/broker/documents", "文件状态"],
  ["/broker/chat-sessions", "会话记录"],
  ["/broker/analytics", "数据看板"],
  ["/broker/audit-logs", "操作日志"],
  ["/broker/settings", "公司设置"],
] as const;

export function Sidebar({ scope }: { scope: "platform" | "broker" }) {
  const items = scope === "platform" ? platformLinks : brokerLinks;
  const pathname = usePathname();

  return (
    <aside
      style={{
        width: 262,
        padding: 22,
        background: "#121a2a",
        display: "grid",
        gap: 24,
        minHeight: "100vh",
        boxSizing: "border-box",
      }}
    >
      <div style={{ padding: "6px 8px 0" }}>
        <div style={{ fontSize: 22, fontWeight: 800, color: "#ffffff", letterSpacing: "-0.02em" }}>HK Insurance AI</div>
        <div style={{ color: "#7f92b4", marginTop: 4, fontSize: 15 }}>{scope === "platform" ? "平台管理后台" : "经纪公司后台"}</div>
      </div>

      <nav style={{ display: "grid", gap: 8 }}>
        {items.map(([href, label]) => {
          const active = pathname === href || pathname.startsWith(`${href}/`);

          return (
            <Link
              key={href}
              href={href}
              style={{
                padding: "13px 18px",
                borderRadius: 18,
                background: active ? "#ffffff" : "transparent",
                color: active ? "#121a2a" : "#d9e4f3",
                fontSize: 15,
                lineHeight: 1.25,
                fontWeight: active ? 700 : 500,
                boxShadow: active ? "0 6px 18px rgba(13, 20, 34, 0.16)" : "none",
              }}
            >
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
