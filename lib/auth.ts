"use client";

import { demoAccountByRole, mockTenants, mockUsers, type Role } from "@/src/data";

export type DemoSession = {
  id: string;
  name: string;
  email: string;
  role: Role;
  tenantId: null | string;
  tenantName?: string;
};

const STORAGE_KEY = "hk-insurance-agent-demo-session";

export function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function getDemoSession(): DemoSession | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as DemoSession;
  } catch {
    return null;
  }
}

export function saveDemoSession(session: DemoSession) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
}

export function clearDemoSession() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
}

export function getRoleHome(role: Role) {
  return role === "PLATFORM_ADMIN" ? "/admin" : "/broker";
}

export function canAccessPath(role: Role, pathname: string) {
  if (pathname.startsWith("/admin")) return role === "PLATFORM_ADMIN";
  if (pathname.startsWith("/broker")) return role === "BROKER_ADMIN" || role === "BROKER_USER";
  return true;
}

export function isSensitiveBrokerPath(pathname: string) {
  return pathname.startsWith("/broker/settings");
}

export function loginDemo(email: string, password: string) {
  const normalizedEmail = email.trim().toLowerCase();
  const user = mockUsers.find((item) => item.email.toLowerCase() === normalizedEmail);

  if (!user || password.trim() !== "password") {
    return { ok: false as const, message: "邮箱或密码错误，请使用演示账号或默认密码 password。" };
  }

  const tenant = mockTenants.find((item) => item.id === user.tenantId);
  const session: DemoSession = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    tenantId: user.tenantId,
    tenantName: tenant?.name,
  };

  return { ok: true as const, session };
}

export const demoRoleCards = [
  { role: "PLATFORM_ADMIN" as Role, label: "平台管理员", description: "查看全局租户、审核、知识库与合规流程", ...demoAccountByRole.PLATFORM_ADMIN },
  { role: "BROKER_ADMIN" as Role, label: "经纪公司管理员", description: "查看本公司上传、审核状态与会话记录", ...demoAccountByRole.BROKER_ADMIN },
  { role: "BROKER_USER" as Role, label: "经纪人", description: "只读查看本公司数据，不能查看敏感公司设置", ...demoAccountByRole.BROKER_USER },
];
