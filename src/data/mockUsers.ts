import type { Role, UserRecord } from "./types";

export const mockUsers: UserRecord[] = [
  {
    id: "user_platform_admin",
    tenantId: null,
    name: "张晓敏",
    email: "admin@example.com",
    role: "PLATFORM_ADMIN",
    status: "ENABLED",
    lastLoginAt: "2026-05-25 09:18",
    askCount: 0,
  },
  {
    id: "user_broker_admin",
    tenantId: "tenant_1",
    name: "陈经理",
    email: "broker-admin@example.com",
    role: "BROKER_ADMIN",
    status: "ENABLED",
    lastLoginAt: "2026-05-25 08:52",
    askCount: 280,
  },
  {
    id: "user_broker_user",
    tenantId: "tenant_1",
    name: "李顾问",
    email: "broker-user@example.com",
    role: "BROKER_USER",
    status: "ENABLED",
    lastLoginAt: "2026-05-25 08:21",
    askCount: 154,
  },
  {
    id: "user_broker_user_2",
    tenantId: "tenant_2",
    name: "王顾问",
    email: "wang@example.com",
    role: "BROKER_USER",
    status: "DISABLED",
    lastLoginAt: "2026-05-21 19:02",
    askCount: 0,
  },
];

export const demoAccountByRole: Record<Role, { email: string; password: string; home: string }> = {
  PLATFORM_ADMIN: { email: "admin@example.com", password: "password", home: "/admin" },
  BROKER_ADMIN: { email: "broker-admin@example.com", password: "password", home: "/broker" },
  BROKER_USER: { email: "broker-user@example.com", password: "password", home: "/broker" },
};

