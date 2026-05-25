import type { AuditLogRecord } from "./types";

export const mockAuditLogs: AuditLogRecord[] = [
  {
    id: "audit_1",
    time: "2026-05-25 09:10",
    actor: "张晓敏",
    role: "PLATFORM_ADMIN",
    tenantId: null,
    action: "审核通过",
    targetType: "知识文件",
    targetName: "A公司重疾计划条款.pdf",
    result: "已启用",
  },
  {
    id: "audit_2",
    time: "2026-05-25 09:18",
    actor: "陈经理",
    role: "BROKER_ADMIN",
    tenantId: "tenant_1",
    tenantName: "港华保险经纪",
    action: "提交审核",
    targetType: "知识文件",
    targetName: "匠心飞越产品小册子.pdf",
    result: "待平台审核",
  },
  {
    id: "audit_3",
    time: "2026-05-25 10:05",
    actor: "李顾问",
    role: "BROKER_USER",
    tenantId: "tenant_1",
    tenantName: "港华保险经纪",
    action: "导出匿名会话",
    targetType: "会话记录",
    targetName: "2026-05-25 会话导出",
    result: "成功",
  },
];

