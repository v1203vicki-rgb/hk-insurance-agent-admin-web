import type { TenantRecord } from "./types";

export const mockTenants: TenantRecord[] = [
  {
    id: "tenant_1",
    name: "港华保险经纪",
    status: "ENABLED",
    contactName: "陈经理",
    contactEmail: "broker-admin@example.com",
    brokerUserCount: 18,
    documentCount: 42,
    askCount: 2431,
    compareCount: 418,
    hotTopics: ["冷静期", "医疗险", "重疾险"],
    topProducts: ["A公司 重疾计划", "尊尚医疗"],
  },
  {
    id: "tenant_2",
    name: "湾区财富顾问",
    status: "ENABLED",
    contactName: "刘总监",
    contactEmail: "liudirector@example.com",
    brokerUserCount: 9,
    documentCount: 24,
    askCount: 914,
    compareCount: 156,
    hotTopics: ["储蓄险", "保单贷款"],
    topProducts: ["匠心飞越", "环球医疗"],
  },
  {
    id: "tenant_3",
    name: "星汇保险服务",
    status: "PENDING_REVIEW",
    contactName: "王主管",
    contactEmail: "wangsupervisor@example.com",
    brokerUserCount: 31,
    documentCount: 55,
    askCount: 3380,
    compareCount: 507,
    hotTopics: ["过期优惠", "核保", "体检"],
    topProducts: ["高端医疗", "重疾尊享"],
  },
];

