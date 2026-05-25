import type { InsuranceCompanyRecord, ProductRecord, ProductVersionRecord } from "./types";

export const mockInsuranceCompanies: InsuranceCompanyRecord[] = [
  { id: "company_1", nameZhHans: "A公司", nameZhHant: "A公司", region: "香港", status: "ENABLED" },
  { id: "company_2", nameZhHans: "B公司", nameZhHant: "B公司", region: "香港", status: "ENABLED" },
  { id: "company_3", nameZhHans: "周大福人寿", nameZhHant: "周大福人壽", region: "香港", status: "ENABLED" },
];

export const mockProducts: ProductRecord[] = [
  {
    id: "product_1",
    insuranceCompanyId: "company_1",
    nameZhHans: "A公司 重疾计划",
    nameZhHant: "A公司 重疾計劃",
    productType: "CRITICAL_ILLNESS",
    status: "ENABLED",
    activeVersionId: "product_version_1",
    keyFields: [
      { label: "等待期", value: "90日", citationId: "citation_doc_1_p12" },
      { label: "冷静期", value: "21日", citationId: "citation_doc_1_p5" },
      { label: "主要保障", value: "120种严重疾病，60种早期疾病", citationId: "citation_doc_1_p18" },
    ],
    promotionIds: ["promo_1"],
    askCount: 421,
  },
  {
    id: "product_2",
    insuranceCompanyId: "company_1",
    nameZhHans: "尊尚医疗",
    nameZhHant: "尊尚醫療",
    productType: "MEDICAL",
    status: "ENABLED",
    activeVersionId: "product_version_2",
    keyFields: [
      { label: "保障地区", value: "全球", citationId: "citation_doc_2_p8" },
      { label: "年度限额", value: "HKD 30M", citationId: "citation_doc_2_p12" },
      { label: "病房级别", value: "私家 / 半私家", citationId: "citation_doc_2_p16" },
    ],
    promotionIds: [],
    askCount: 686,
  },
  {
    id: "product_3",
    insuranceCompanyId: "company_2",
    nameZhHans: "环球医疗",
    nameZhHant: "環球醫療",
    productType: "MEDICAL",
    status: "ENABLED",
    activeVersionId: "product_version_3",
    keyFields: [
      { label: "保障地区", value: "亚洲及指定地区", citationId: "citation_doc_3_p8" },
      { label: "年度限额", value: "HKD 25M", citationId: "citation_doc_3_p12" },
      { label: "病房级别", value: "半私家", citationId: "citation_doc_3_p16" },
    ],
    promotionIds: ["promo_2"],
    askCount: 517,
  },
  {
    id: "product_4",
    insuranceCompanyId: "company_3",
    nameZhHans: "匠心飞越储蓄保险计划",
    nameZhHant: "匠心飛越儲蓄保險計劃",
    productType: "SAVINGS",
    status: "ENABLED",
    activeVersionId: "product_version_4",
    keyFields: [
      { label: "缴费期", value: "5 / 10年", citationId: "citation_doc_4_p6" },
      { label: "保单贷款", value: "可申请", citationId: "citation_doc_4_p22" },
      { label: "红利性质", value: "包含非保证利益", citationId: "citation_doc_4_p14" },
    ],
    promotionIds: ["promo_3"],
    askCount: 389,
  },
];

export const mockProductVersions: ProductVersionRecord[] = [
  {
    id: "product_version_1",
    productId: "product_1",
    version: "v2026.03",
    publishDate: "2026-03-01",
    effectiveDate: "2026-03-15",
    status: "CURRENT",
    documentIds: ["doc_1"],
  },
  {
    id: "product_version_1_old",
    productId: "product_1",
    version: "v2025.09",
    publishDate: "2025-09-02",
    effectiveDate: "2025-09-15",
    expiryDate: "2026-03-14",
    status: "HISTORY",
    documentIds: ["doc_1_old"],
  },
  {
    id: "product_version_2",
    productId: "product_2",
    version: "v2026.03",
    publishDate: "2026-03-08",
    effectiveDate: "2026-03-20",
    status: "CURRENT",
    documentIds: ["doc_2"],
  },
  {
    id: "product_version_3",
    productId: "product_3",
    version: "v2026.02",
    publishDate: "2026-02-16",
    effectiveDate: "2026-02-28",
    status: "CURRENT",
    documentIds: ["doc_3", "doc_5"],
  },
  {
    id: "product_version_4",
    productId: "product_4",
    version: "v2604",
    publishDate: "2026-04-05",
    effectiveDate: "2026-04-20",
    status: "CURRENT",
    documentIds: ["doc_4"],
  },
];

