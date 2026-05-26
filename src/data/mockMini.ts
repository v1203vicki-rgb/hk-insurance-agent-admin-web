export type MiniLocale = "ZH_HANS" | "ZH_HANT";

export type LocalizedText = {
  zhHans: string;
  zhHant?: string;
};

export type MiniCitation = {
  id: string;
  fileName: string;
  sourceLevel: "L1" | "L2" | "L3" | "L4" | "L5";
  pageNumber: number;
  version: string;
  publishDate: string;
  effectiveDate: string;
  expiryDate?: string;
  quoteText: string;
  matchedParagraph: string;
  keywords: string[];
  sourceLabel: string;
  explanation: string;
  isTrainingMaterial?: boolean;
  isExpiredPromotion?: boolean;
};

export type MiniProductVersion = {
  id: string;
  version: string;
  publishDate: string;
  effectiveDate: string;
  expiryDate?: string;
  isCurrent: boolean;
  compareFields: Record<string, { value: string; citationId: string }>;
};

export type MiniProduct = {
  id: string;
  company: LocalizedText;
  name: LocalizedText;
  productType: LocalizedText;
  summary: LocalizedText;
  status: LocalizedText;
  hasPromotion: boolean;
  updatedAt: string;
  versions: MiniProductVersion[];
};

export type MiniSession = {
  id: string;
  title: LocalizedText;
  category: LocalizedText;
  riskLabel: LocalizedText;
  riskType: string;
  riskLevel: "LOW" | "MEDIUM" | "HIGH";
  clientAnonymousId: string;
  language: "ZH_HANS" | "ZH_HANT";
  createdAt: string;
  expiresAt: string;
  uploads: Array<{
    id: string;
    fileName: string;
    uploadedAt: string;
    status: string;
    expiresAt: string;
  }>;
  ruleHits: string[];
  messages: Array<{
    id: string;
    role: "USER" | "ASSISTANT";
    content: LocalizedText;
    citations?: string[];
    structuredAnswer?: {
      shortConclusion: LocalizedText;
      details: LocalizedText[];
      comparisonTable?: Array<{ dimension: LocalizedText; left: string; right: string; citationIds: string[] }>;
      scenarios: LocalizedText[];
      cautions: LocalizedText[];
      followUps?: LocalizedText[];
      riskNotice?: LocalizedText;
    };
  }>;
};

export const miniSourceLevelMeta: Record<MiniCitation["sourceLevel"], { label: string; description: string }> = {
  L1: { label: "官方条款", description: "优先级最高" },
  L2: { label: "官方小册子", description: "官方产品说明" },
  L3: { label: "费率 / 利益说明", description: "涉及收益需谨慎" },
  L4: { label: "官方通告 / 优惠", description: "需检查有效期" },
  L5: { label: "内部培训资料", description: "需以官方条款为准" },
};

export function getLocalizedText(text: LocalizedText, locale: MiniLocale) {
  if (locale === "ZH_HANT") return text.zhHant ?? text.zhHans;
  return text.zhHans;
}

export function hasLocalizedFallback(text: LocalizedText, locale: MiniLocale) {
  return locale === "ZH_HANT" && !text.zhHant;
}

export const miniCitations: MiniCitation[] = [
  {
    id: "mini_citation_ci_terms_1",
    fileName: "A公司重疾险条款.pdf",
    sourceLevel: "L1",
    pageNumber: 12,
    version: "v2026.03",
    publishDate: "2026-03-01",
    effectiveDate: "2026-03-15",
    quoteText: "严重疾病保障等待期为 90 日，等待期后首次确诊方可触发赔付条件。",
    matchedParagraph: "重疾定义与等待期说明",
    keywords: ["重疾", "等待期", "90 日"],
    sourceLabel: "官方条款",
    explanation: "官方条款，优先级最高。",
  },
  {
    id: "mini_citation_ci_faq_1",
    fileName: "香港重疾险基础FAQ.pdf",
    sourceLevel: "L2",
    pageNumber: 6,
    version: "v2026.01",
    publishDate: "2026-01-12",
    effectiveDate: "2026-01-15",
    quoteText: "香港重疾险通常以官方条款定义疾病及赔付条件，不同公司等待期和早期疾病定义会有差异。",
    matchedParagraph: "香港重疾险常见差异说明",
    keywords: ["香港重疾险", "差异", "定义"],
    sourceLabel: "官方小册子",
    explanation: "官方产品说明。",
  },
  {
    id: "mini_citation_cross_faq_1",
    fileName: "内地客户赴港投保FAQ.pdf",
    sourceLevel: "L2",
    pageNumber: 9,
    version: "v2026.02",
    publishDate: "2026-02-08",
    effectiveDate: "2026-02-10",
    quoteText: "赴港投保需关注签署地点、核保要求及后续理赔资料提交流程。",
    matchedParagraph: "赴港投保流程提示",
    keywords: ["赴港投保", "签署", "核保"],
    sourceLabel: "官方小册子",
    explanation: "官方产品说明。",
  },
  {
    id: "mini_citation_medical_a_terms",
    fileName: "A公司高端医疗条款.pdf",
    sourceLevel: "L1",
    pageNumber: 8,
    version: "v2026.03",
    publishDate: "2026-03-08",
    effectiveDate: "2026-03-20",
    quoteText: "保障地区覆盖全球网络医院，年度赔偿限额最高为 HKD 30M。",
    matchedParagraph: "保障地区与年度限额",
    keywords: ["全球", "年度限额", "HKD 30M"],
    sourceLabel: "官方条款",
    explanation: "官方条款，优先级最高。",
  },
  {
    id: "mini_citation_medical_a_room",
    fileName: "A公司高端医疗条款.pdf",
    sourceLevel: "L1",
    pageNumber: 16,
    version: "v2026.03",
    publishDate: "2026-03-08",
    effectiveDate: "2026-03-20",
    quoteText: "病房级别包括标准私家房及半私家房，并可选择不同自付额方案。",
    matchedParagraph: "病房级别与自付额",
    keywords: ["病房级别", "私家房", "自付额"],
    sourceLabel: "官方条款",
    explanation: "官方条款，优先级最高。",
  },
  {
    id: "mini_citation_medical_b_brochure",
    fileName: "B公司医疗险小册子.pdf",
    sourceLevel: "L2",
    pageNumber: 8,
    version: "v2026.02",
    publishDate: "2026-02-16",
    effectiveDate: "2026-02-28",
    quoteText: "保障地区为亚洲及指定地区，年度限额为 HKD 25M。",
    matchedParagraph: "保障重点摘要",
    keywords: ["亚洲", "指定地区", "HKD 25M"],
    sourceLabel: "官方小册子",
    explanation: "官方产品说明。",
  },
  {
    id: "mini_citation_medical_b_rules",
    fileName: "B公司医疗险小册子.pdf",
    sourceLevel: "L2",
    pageNumber: 12,
    version: "v2026.02",
    publishDate: "2026-02-16",
    effectiveDate: "2026-02-28",
    quoteText: "病房级别以半私家房为主，既往症需按核保结果处理。",
    matchedParagraph: "病房级别与既往症",
    keywords: ["半私家房", "既往症", "核保"],
    sourceLabel: "官方小册子",
    explanation: "官方产品说明。",
  },
  {
    id: "mini_citation_promo_expired",
    fileName: "B公司优惠通告.pdf",
    sourceLevel: "L4",
    pageNumber: 2,
    version: "v2026.02",
    publishDate: "2026-02-10",
    effectiveDate: "2026-02-10",
    expiryDate: "2026-03-31",
    quoteText: "指定投保可享首年保费折扣，优惠有效期至 2026-03-31。",
    matchedParagraph: "历史优惠说明",
    keywords: ["优惠", "折扣", "已过期"],
    sourceLabel: "官方通告 / 优惠",
    explanation: "需检查有效期。",
    isExpiredPromotion: true,
  },
  {
    id: "mini_citation_savings_benefit",
    fileName: "匠心飞越利益说明.pdf",
    sourceLevel: "L3",
    pageNumber: 14,
    version: "v2604",
    publishDate: "2026-04-05",
    effectiveDate: "2026-04-20",
    quoteText: "红利属于非保证利益，现金价值及回本期需以官方利益说明为准。",
    matchedParagraph: "利益说明与非保证利益",
    keywords: ["红利", "非保证利益", "现金价值"],
    sourceLabel: "费率 / 利益说明",
    explanation: "涉及收益需谨慎。",
  },
  {
    id: "mini_citation_loan_terms",
    fileName: "保单贷款条款FAQ.pdf",
    sourceLevel: "L2",
    pageNumber: 11,
    version: "v2026.01",
    publishDate: "2026-01-18",
    effectiveDate: "2026-01-20",
    quoteText: "保单贷款会影响保单现金价值及后续红利累积，具体以条款及利益说明为准。",
    matchedParagraph: "保单贷款影响说明",
    keywords: ["保单贷款", "现金价值", "红利"],
    sourceLabel: "官方小册子",
    explanation: "官方产品说明。",
  },
  {
    id: "mini_citation_training",
    fileName: "医疗险内部培训资料.pdf",
    sourceLevel: "L5",
    pageNumber: 9,
    version: "v2026.01",
    publishDate: "2026-01-05",
    effectiveDate: "2026-01-05",
    quoteText: "培训资料仅用于理解产品卖点，不可替代官方条款、费用或利益说明。",
    matchedParagraph: "内部培训提示",
    keywords: ["培训资料", "官方条款", "不可替代"],
    sourceLabel: "内部培训资料",
    explanation: "需以官方条款为准。",
    isTrainingMaterial: true,
  },
];

export const miniCategories = [
  { id: "basic", badge: "基", title: { zhHans: "香港保险基础", zhHant: "香港保險基礎" }, topics: { zhHans: "监管、投保、冷静期、保费缴付", zhHant: "監管、投保、冷靜期、保費繳付" } },
  { id: "ci", badge: "疾", title: { zhHans: "重疾险", zhHant: "重疾險" }, topics: { zhHans: "疾病定义、多次赔付、等待期", zhHant: "疾病定義、多次賠付、等待期" } },
  { id: "savings", badge: "储", title: { zhHans: "储蓄 / 分红险", zhHant: "儲蓄 / 分紅險" }, topics: { zhHans: "现金价值、红利、回本期、收益说明", zhHant: "現金價值、紅利、回本期、收益說明" } },
  { id: "medical", badge: "医", title: { zhHans: "医疗险", zhHant: "醫療險" }, topics: { zhHans: "住院、垫底费、共同保险、理赔", zhHant: "住院、墊底費、共同保險、理賠" } },
  { id: "process", badge: "投", title: { zhHans: "投保流程", zhHant: "投保流程" }, topics: { zhHans: "签署、核保、缴费、保单生效", zhHant: "簽署、核保、繳費、保單生效" } },
  { id: "claims", badge: "赔", title: { zhHans: "理赔流程", zhHant: "理賠流程" }, topics: { zhHans: "资料准备、时效、常见拒赔点", zhHant: "資料準備、時效、常見拒賠點" } },
  { id: "loan", badge: "贷", title: { zhHans: "保单贷款", zhHant: "保單貸款" }, topics: { zhHans: "贷款、现金价值、利息影响", zhHant: "貸款、現金價值、利息影響" } },
  { id: "cooloff", badge: "退", title: { zhHans: "退保 / 冷静期", zhHant: "退保 / 冷靜期" }, topics: { zhHans: "撤单、退保价值、注意事项", zhHant: "撤單、退保價值、注意事項" } },
  { id: "uw", badge: "核", title: { zhHans: "核保 / 体检", zhHant: "核保 / 體檢" }, topics: { zhHans: "健康告知、核保、体检要求", zhHant: "健康告知、核保、體檢要求" } },
  { id: "trust", badge: "信", title: { zhHans: "受益人 / 信托", zhHant: "受益人 / 信託" }, topics: { zhHans: "受益人、更改、保单信托", zhHant: "受益人、更改、保單信託" } },
  { id: "cross", badge: "赴", title: { zhHans: "内地客户赴港投保 FAQ", zhHant: "內地客戶赴港投保 FAQ" }, topics: { zhHans: "赴港签署、缴费、核保、理赔", zhHant: "赴港簽署、繳費、核保、理賠" } },
];

export const miniHotQuestions: LocalizedText[] = [
  { zhHans: "A 产品冷静期多久？", zhHant: "A 產品冷靜期多久？" },
  { zhHans: "保单贷款会不会影响红利？", zhHant: "保單貸款會不會影響紅利？" },
  { zhHans: "香港重疾险和内地重疾险有什么区别？", zhHant: "香港重疾險和內地重疾險有什麼區別？" },
  { zhHans: "当前优惠是否还有效？", zhHant: "當前優惠是否還有效？" },
];

export const miniProducts: MiniProduct[] = [
  {
    id: "product_1",
    company: { zhHans: "A公司", zhHant: "A公司" },
    name: { zhHans: "A公司重疾计划", zhHant: "A公司重疾計劃" },
    productType: { zhHans: "重疾险", zhHant: "重疾險" },
    summary: { zhHans: "重疾保障、等待期、冷静期", zhHant: "重疾保障、等待期、冷靜期" },
    status: { zhHans: "资料已启用", zhHant: "資料已啟用" },
    hasPromotion: false,
    updatedAt: "2026-03-15",
    versions: [
      {
        id: "product_version_1",
        version: "v2026.03",
        publishDate: "2026-03-01",
        effectiveDate: "2026-03-15",
        isCurrent: true,
        compareFields: {
          company: { value: "A公司", citationId: "mini_citation_ci_terms_1" },
          productName: { value: "A公司重疾计划", citationId: "mini_citation_ci_terms_1" },
          productType: { value: "重疾险", citationId: "mini_citation_ci_terms_1" },
          version: { value: "v2026.03", citationId: "mini_citation_ci_terms_1" },
          publishDate: { value: "2026-03-01", citationId: "mini_citation_ci_terms_1" },
          effectiveDate: { value: "2026-03-15", citationId: "mini_citation_ci_terms_1" },
          waitingPeriod: { value: "90 日", citationId: "mini_citation_ci_terms_1" },
          coolOffPeriod: { value: "21 日", citationId: "mini_citation_ci_terms_1" },
          surrender: { value: "按官方退保规则处理", citationId: "mini_citation_ci_faq_1" },
          policyLoan: { value: "视保单现金价值而定", citationId: "mini_citation_ci_faq_1" },
          promotion: { value: "当前无已启用优惠", citationId: "mini_citation_ci_faq_1" },
        },
      },
    ],
  },
  {
    id: "product_2",
    company: { zhHans: "A公司", zhHant: "A公司" },
    name: { zhHans: "尊尚医疗", zhHant: "尊尚醫療" },
    productType: { zhHans: "医疗险", zhHant: "醫療險" },
    summary: { zhHans: "全球保障、年度限额、病房级别", zhHant: "全球保障、年度限額、病房級別" },
    status: { zhHans: "资料已启用", zhHant: "資料已啟用" },
    hasPromotion: false,
    updatedAt: "2026-03-20",
    versions: [
      {
        id: "product_version_2",
        version: "v2026.03",
        publishDate: "2026-03-08",
        effectiveDate: "2026-03-20",
        isCurrent: true,
        compareFields: {
          company: { value: "A公司", citationId: "mini_citation_medical_a_terms" },
          productName: { value: "尊尚医疗", citationId: "mini_citation_medical_a_terms" },
          productType: { value: "医疗险", citationId: "mini_citation_medical_a_terms" },
          version: { value: "v2026.03", citationId: "mini_citation_medical_a_terms" },
          publishDate: { value: "2026-03-08", citationId: "mini_citation_medical_a_terms" },
          effectiveDate: { value: "2026-03-20", citationId: "mini_citation_medical_a_terms" },
          coverageRegion: { value: "全球", citationId: "mini_citation_medical_a_terms" },
          annualLimit: { value: "HKD 30M", citationId: "mini_citation_medical_a_terms" },
          roomLevel: { value: "私家房 / 半私家房", citationId: "mini_citation_medical_a_room" },
          deductible: { value: "可选", citationId: "mini_citation_medical_a_room" },
          coinsurance: { value: "视计划而定", citationId: "mini_citation_medical_a_room" },
          waitingPeriod: { value: "30 日", citationId: "mini_citation_medical_a_terms" },
          preExisting: { value: "按核保结果处理", citationId: "mini_citation_medical_a_room" },
          coolOffPeriod: { value: "21 日", citationId: "mini_citation_medical_a_terms" },
          surrender: { value: "无现金价值", citationId: "mini_citation_medical_a_terms" },
          policyLoan: { value: "不适用", citationId: "mini_citation_medical_a_terms" },
          promotion: { value: "当前无已启用优惠", citationId: "mini_citation_medical_a_terms" },
        },
      },
      {
        id: "product_version_2_old",
        version: "v2025.09",
        publishDate: "2025-09-01",
        effectiveDate: "2025-09-15",
        expiryDate: "2026-03-19",
        isCurrent: false,
        compareFields: {
          company: { value: "A公司", citationId: "mini_citation_medical_a_terms" },
          productName: { value: "尊尚医疗", citationId: "mini_citation_medical_a_terms" },
          productType: { value: "医疗险", citationId: "mini_citation_medical_a_terms" },
          version: { value: "v2025.09", citationId: "mini_citation_medical_a_terms" },
          publishDate: { value: "2025-09-01", citationId: "mini_citation_medical_a_terms" },
          effectiveDate: { value: "2025-09-15", citationId: "mini_citation_medical_a_terms" },
          coverageRegion: { value: "亚洲及全球转介", citationId: "mini_citation_medical_a_terms" },
          annualLimit: { value: "HKD 25M", citationId: "mini_citation_medical_a_terms" },
          roomLevel: { value: "半私家房", citationId: "mini_citation_medical_a_room" },
          deductible: { value: "固定档", citationId: "mini_citation_medical_a_room" },
          coinsurance: { value: "10%", citationId: "mini_citation_medical_a_room" },
          waitingPeriod: { value: "30 日", citationId: "mini_citation_medical_a_terms" },
          preExisting: { value: "按核保结果处理", citationId: "mini_citation_medical_a_room" },
          coolOffPeriod: { value: "21 日", citationId: "mini_citation_medical_a_terms" },
          surrender: { value: "无现金价值", citationId: "mini_citation_medical_a_terms" },
          policyLoan: { value: "不适用", citationId: "mini_citation_medical_a_terms" },
          promotion: { value: "历史版本无当前优惠", citationId: "mini_citation_medical_a_terms" },
        },
      },
    ],
  },
  {
    id: "product_3",
    company: { zhHans: "B公司", zhHant: "B公司" },
    name: { zhHans: "环球医疗", zhHant: "環球醫療" },
    productType: { zhHans: "医疗险", zhHant: "醫療險" },
    summary: { zhHans: "亚洲保障、历史优惠、既往症核保", zhHant: "亞洲保障、歷史優惠、既往症核保" },
    status: { zhHans: "资料已启用", zhHant: "資料已啟用" },
    hasPromotion: true,
    updatedAt: "2026-02-28",
    versions: [
      {
        id: "product_version_3",
        version: "v2026.02",
        publishDate: "2026-02-16",
        effectiveDate: "2026-02-28",
        isCurrent: true,
        compareFields: {
          company: { value: "B公司", citationId: "mini_citation_medical_b_brochure" },
          productName: { value: "环球医疗", citationId: "mini_citation_medical_b_brochure" },
          productType: { value: "医疗险", citationId: "mini_citation_medical_b_brochure" },
          version: { value: "v2026.02", citationId: "mini_citation_medical_b_brochure" },
          publishDate: { value: "2026-02-16", citationId: "mini_citation_medical_b_brochure" },
          effectiveDate: { value: "2026-02-28", citationId: "mini_citation_medical_b_brochure" },
          coverageRegion: { value: "亚洲及指定地区", citationId: "mini_citation_medical_b_brochure" },
          annualLimit: { value: "HKD 25M", citationId: "mini_citation_medical_b_brochure" },
          roomLevel: { value: "半私家房", citationId: "mini_citation_medical_b_rules" },
          deductible: { value: "固定档", citationId: "mini_citation_medical_b_rules" },
          coinsurance: { value: "10%", citationId: "mini_citation_medical_b_rules" },
          waitingPeriod: { value: "30 日", citationId: "mini_citation_medical_b_brochure" },
          preExisting: { value: "按核保结果处理", citationId: "mini_citation_medical_b_rules" },
          coolOffPeriod: { value: "21 日", citationId: "mini_citation_medical_b_brochure" },
          surrender: { value: "无现金价值", citationId: "mini_citation_medical_b_brochure" },
          policyLoan: { value: "不适用", citationId: "mini_citation_medical_b_brochure" },
          promotion: { value: "该优惠已过期", citationId: "mini_citation_promo_expired" },
        },
      },
    ],
  },
  {
    id: "product_4",
    company: { zhHans: "周大福人寿", zhHant: "周大福人壽" },
    name: { zhHans: "匠心飞越储蓄保险计划", zhHant: "匠心飛越儲蓄保險計劃" },
    productType: { zhHans: "储蓄 / 分红险", zhHant: "儲蓄 / 分紅險" },
    summary: { zhHans: "利益说明、现金价值、保单贷款", zhHant: "利益說明、現金價值、保單貸款" },
    status: { zhHans: "资料已启用", zhHant: "資料已啟用" },
    hasPromotion: false,
    updatedAt: "2026-04-20",
    versions: [
      {
        id: "product_version_4",
        version: "v2604",
        publishDate: "2026-04-05",
        effectiveDate: "2026-04-20",
        isCurrent: true,
        compareFields: {
          company: { value: "周大福人寿", citationId: "mini_citation_savings_benefit" },
          productName: { value: "匠心飞越储蓄保险计划", citationId: "mini_citation_savings_benefit" },
          productType: { value: "储蓄 / 分红险", citationId: "mini_citation_savings_benefit" },
          version: { value: "v2604", citationId: "mini_citation_savings_benefit" },
          publishDate: { value: "2026-04-05", citationId: "mini_citation_savings_benefit" },
          effectiveDate: { value: "2026-04-20", citationId: "mini_citation_savings_benefit" },
          policyLoan: { value: "支持申请", citationId: "mini_citation_loan_terms" },
          promotion: { value: "当前无已启用优惠", citationId: "mini_citation_savings_benefit" },
          surrender: { value: "退保价值需按官方说明核对", citationId: "mini_citation_savings_benefit" },
        },
      },
    ],
  },
];

export const miniCompareFieldMeta: Array<{ key: string; label: LocalizedText }> = [
  { key: "company", label: { zhHans: "保险公司", zhHant: "保險公司" } },
  { key: "productName", label: { zhHans: "产品名称", zhHant: "產品名稱" } },
  { key: "productType", label: { zhHans: "产品类型", zhHant: "產品類型" } },
  { key: "version", label: { zhHans: "当前版本", zhHant: "當前版本" } },
  { key: "publishDate", label: { zhHans: "发布日期", zhHant: "發布日期" } },
  { key: "effectiveDate", label: { zhHans: "生效日期", zhHant: "生效日期" } },
  { key: "coverageRegion", label: { zhHans: "保障地区", zhHant: "保障地區" } },
  { key: "annualLimit", label: { zhHans: "年度限额", zhHant: "年度限額" } },
  { key: "roomLevel", label: { zhHans: "病房级别", zhHant: "病房級別" } },
  { key: "deductible", label: { zhHans: "自付额", zhHant: "自付額" } },
  { key: "coinsurance", label: { zhHans: "共同保险", zhHant: "共同保險" } },
  { key: "waitingPeriod", label: { zhHans: "等待期", zhHant: "等待期" } },
  { key: "preExisting", label: { zhHans: "既往症规则", zhHant: "既往症規則" } },
  { key: "coolOffPeriod", label: { zhHans: "冷静期", zhHant: "冷靜期" } },
  { key: "surrender", label: { zhHans: "退保规则", zhHant: "退保規則" } },
  { key: "policyLoan", label: { zhHans: "保单贷款", zhHant: "保單貸款" } },
  { key: "promotion", label: { zhHans: "优惠政策", zhHant: "優惠政策" } },
];

export const miniHistorySessions: MiniSession[] = [
  {
    id: "session_1",
    title: { zhHans: "香港重疾险和内地重疾险有什么区别？", zhHant: "香港重疾險和內地重疾險有什麼區別？" },
    category: { zhHans: "重疾险", zhHant: "重疾險" },
    riskLabel: { zhHans: "低", zhHant: "低" },
    riskType: "NORMAL",
    riskLevel: "LOW",
    clientAnonymousId: "broker_demo_7Q2A9",
    language: "ZH_HANS",
    createdAt: "2026-05-25 10:24",
    expiresAt: "2026-11-25 10:24",
    uploads: [],
    ruleHits: ["普通知识问答", "必须展示引用来源"],
    messages: [
      {
        id: "m1",
        role: "USER",
        content: { zhHans: "香港重疾险和内地重疾险有什么区别？", zhHant: "香港重疾險和內地重疾險有什麼區別？" },
      },
      {
        id: "m2",
        role: "ASSISTANT",
        content: {
          zhHans: "以下说明基于已启用资料整理，重点从疾病定义、等待期和赴港投保流程做客观说明。",
          zhHant: "以下說明基於已啟用資料整理，重點從疾病定義、等待期和赴港投保流程做客觀說明。",
        },
        citations: ["mini_citation_ci_terms_1", "mini_citation_ci_faq_1", "mini_citation_cross_faq_1"],
        structuredAnswer: {
          shortConclusion: {
            zhHans: "香港重疾险与内地重疾险在条款定义、等待期和投保流程上存在差异。",
            zhHant: "香港重疾險與內地重疾險在條款定義、等待期和投保流程上存在差異。",
          },
          details: [
            { zhHans: "疾病定义、早期疾病及多次赔付规则需按具体官方条款核对。", zhHant: "疾病定義、早期疾病及多次賠付規則需按具體官方條款核對。" },
            { zhHans: "赴港投保时需关注签署地点、核保安排及理赔资料要求。", zhHant: "赴港投保時需關注簽署地點、核保安排及理賠資料要求。" },
          ],
          scenarios: [{ zhHans: "适合先理解重疾定义、等待期和赴港投保基本流程。", zhHant: "適合先理解重疾定義、等待期和赴港投保基本流程。" }],
          cautions: [{ zhHans: "不同公司定义可能不同，应以具体产品文件为准。", zhHant: "不同公司定義可能不同，應以具體產品文件為準。" }],
          followUps: [
            { zhHans: "和内地重疾险赔付定义有什么不同？", zhHant: "和內地重疾險賠付定義有什麼不同？" },
            { zhHans: "赴港投保签署流程要注意什么？", zhHant: "赴港投保簽署流程要注意什麼？" },
            { zhHans: "可以生成客户版说明吗？", zhHant: "可以生成客戶版說明嗎？" },
          ],
        },
      },
    ],
  },
  {
    id: "session_2",
    title: { zhHans: "A公司和B公司的医疗险哪个更适合我？", zhHant: "A公司和B公司的醫療險哪個更適合我？" },
    category: { zhHans: "产品对比", zhHant: "產品對比" },
    riskLabel: { zhHans: "中：个性化倾向", zhHant: "中：個性化傾向" },
    riskType: "PERSONALIZED_ADVICE",
    riskLevel: "MEDIUM",
    clientAnonymousId: "broker_demo_8P1LM",
    language: "ZH_HANS",
    createdAt: "2026-05-25 11:02",
    expiresAt: "2026-11-25 11:02",
    uploads: [{ id: "upload_1", fileName: "医疗计划书.pdf", uploadedAt: "2026-05-25 11:00", status: "解析成功", expiresAt: "2026-06-25 11:00" }],
    ruleHits: ["个性化建议拒答", "产品对比仅列差异"],
    messages: [
      {
        id: "m3",
        role: "USER",
        content: { zhHans: "A公司和B公司的医疗险哪个更适合我？", zhHant: "A公司和B公司的醫療險哪個更適合我？" },
      },
      {
        id: "m4",
        role: "ASSISTANT",
        content: {
          zhHans: "我可以说明资料差异和一般适用场景，但不能基于个人情况给出购买建议。",
          zhHant: "我可以說明資料差異和一般適用場景，但不能基於個人情況給出購買建議。",
        },
        citations: ["mini_citation_medical_a_terms", "mini_citation_medical_a_room", "mini_citation_medical_b_brochure", "mini_citation_medical_b_rules", "mini_citation_promo_expired"],
        structuredAnswer: {
          shortConclusion: { zhHans: "以下仅列资料差异，不构成购买建议。", zhHant: "以下僅列資料差異，不構成購買建議。" },
          details: [
            { zhHans: "A产品保障地区更广，B产品更聚焦亚洲及指定地区。", zhHant: "A產品保障地區更廣，B產品更聚焦亞洲及指定地區。" },
            { zhHans: "B产品历史优惠文件已过期，不能视为当前有效优惠。", zhHant: "B產品歷史優惠文件已過期，不能視為當前有效優惠。" },
          ],
          comparisonTable: [
            { dimension: { zhHans: "保障地区", zhHant: "保障地區" }, left: "全球", right: "亚洲及指定地区", citationIds: ["mini_citation_medical_a_terms", "mini_citation_medical_b_brochure"] },
            { dimension: { zhHans: "年度限额", zhHant: "年度限額" }, left: "HKD 30M", right: "HKD 25M", citationIds: ["mini_citation_medical_a_terms", "mini_citation_medical_b_brochure"] },
            { dimension: { zhHans: "病房级别", zhHant: "病房級別" }, left: "私家房 / 半私家房", right: "半私家房", citationIds: ["mini_citation_medical_a_room", "mini_citation_medical_b_rules"] },
          ],
          scenarios: [{ zhHans: "适合先理解保障地区、病房级别和自付额差异。", zhHant: "適合先理解保障地區、病房級別和自付額差異。" }],
          cautions: [{ zhHans: "涉及个人预算、既有保障和健康状况时，仅做资料解释。", zhHant: "涉及個人預算、既有保障和健康狀況時，僅做資料解釋。" }],
          followUps: [
            { zhHans: "和其他高端医疗产品有什么区别？", zhHant: "和其他高端醫療產品有什麼區別？" },
            { zhHans: "有哪些注意事项？", zhHant: "有哪些注意事項？" },
            { zhHans: "可以生成客户版说明吗？", zhHant: "可以生成客戶版說明嗎？" },
          ],
          riskNotice: { zhHans: "不能输出推荐、排名、评分或“最适合你”。", zhHant: "不能輸出推薦、排名、評分或「最適合你」。" },
        },
      },
    ],
  },
  {
    id: "session_3",
    title: { zhHans: "这个储蓄险第几年回本？", zhHant: "這個儲蓄險第幾年回本？" },
    category: { zhHans: "储蓄 / 分红险", zhHant: "儲蓄 / 分紅險" },
    riskLabel: { zhHans: "高：收益类", zhHant: "高：收益類" },
    riskType: "BENEFIT_OR_RETURN",
    riskLevel: "HIGH",
    clientAnonymousId: "broker_demo_2B7XK",
    language: "ZH_HANS",
    createdAt: "2026-05-25 11:33",
    expiresAt: "2026-11-25 11:33",
    uploads: [],
    ruleHits: ["收益类必须引用官方文件", "无官方来源不返回实质内容"],
    messages: [
      {
        id: "m5",
        role: "USER",
        content: { zhHans: "这个储蓄险第几年回本？", zhHant: "這個儲蓄險第幾年回本？" },
      },
      {
        id: "m6",
        role: "ASSISTANT",
        content: {
          zhHans: "关于回本期、收益、现金价值的问题，必须以官方利益说明为准；当前仅能说明这是非保证利益，不直接给出回本年份。",
          zhHant: "關於回本期、收益、現金價值的問題，必須以官方利益說明為準；當前僅能說明這是非保證利益，不直接給出回本年份。",
        },
        citations: ["mini_citation_savings_benefit"],
        structuredAnswer: {
          shortConclusion: { zhHans: "当前不能直接给出具体回本年份。", zhHant: "當前不能直接給出具體回本年份。" },
          details: [{ zhHans: "红利属于非保证利益，现金价值表现会受实现率影响。", zhHant: "紅利屬於非保證利益，現金價值表現會受實現率影響。" }],
          scenarios: [{ zhHans: "适合先查阅官方利益说明或利益演示。", zhHant: "適合先查閱官方利益說明或利益演示。" }],
          cautions: [{ zhHans: "没有官方收益文件时，不应推断回本时间。", zhHant: "沒有官方收益文件時，不應推斷回本時間。" }],
          followUps: [
            { zhHans: "有哪些利益说明要重点看？", zhHant: "有哪些利益說明要重點看？" },
            { zhHans: "保单贷款会影响红利吗？", zhHant: "保單貸款會影響紅利嗎？" },
            { zhHans: "可以生成客户版说明吗？", zhHant: "可以生成客戶版說明嗎？" },
          ],
          riskNotice: { zhHans: "收益 / 回本类问题需要官方文件支持。", zhHant: "收益 / 回本類問題需要官方文件支持。" },
        },
      },
    ],
  },
  {
    id: "session_4",
    title: { zhHans: "保单贷款会影响红利吗？", zhHant: "保單貸款會影響紅利嗎？" },
    category: { zhHans: "保单贷款", zhHant: "保單貸款" },
    riskLabel: { zhHans: "中", zhHant: "中" },
    riskType: "PRODUCT_DETAIL",
    riskLevel: "MEDIUM",
    clientAnonymousId: "broker_demo_5D2KQ",
    language: "ZH_HANS",
    createdAt: "2026-05-25 12:05",
    expiresAt: "2026-11-25 12:05",
    uploads: [],
    ruleHits: ["产品细节必须引用来源"],
    messages: [
      {
        id: "m7",
        role: "USER",
        content: { zhHans: "保单贷款会影响红利吗？", zhHant: "保單貸款會影響紅利嗎？" },
      },
      {
        id: "m8",
        role: "ASSISTANT",
        content: {
          zhHans: "已启用资料显示，保单贷款可能影响现金价值和后续红利累积，具体影响需以条款和利益说明为准。",
          zhHant: "已啟用資料顯示，保單貸款可能影響現金價值和後續紅利累積，具體影響需以條款和利益說明為準。",
        },
        citations: ["mini_citation_loan_terms", "mini_citation_savings_benefit"],
        structuredAnswer: {
          shortConclusion: { zhHans: "可能会影响。", zhHant: "可能會影響。" },
          details: [{ zhHans: "贷款余额及利息可能影响现金价值及非保证利益累积。", zhHant: "貸款餘額及利息可能影響現金價值及非保證利益累積。" }],
          scenarios: [{ zhHans: "适合在贷款前先查看贷款条款和利益说明。", zhHant: "適合在貸款前先查看貸款條款和利益說明。" }],
          cautions: [{ zhHans: "不同产品的处理方式可能不同。", zhHant: "不同產品的處理方式可能不同。" }],
          followUps: [
            { zhHans: "贷款利息怎么计算？", zhHant: "貸款利息怎麼計算？" },
            { zhHans: "退保时会受影响吗？", zhHant: "退保時會受影響嗎？" },
            { zhHans: "可以生成客户版说明吗？", zhHant: "可以生成客戶版說明嗎？" },
          ],
        },
      },
    ],
  },
];

export const miniFallbackStates = [
  {
    id: "no_source",
    title: { zhHans: "未找到足够依据", zhHant: "未找到足夠依據" },
    message: { zhHans: "未在已启用资料中找到足够依据。为避免误导，建议以保险公司官方文件、最新通告或持牌顾问说明为准。", zhHant: "未在已啟用資料中找到足夠依據。為避免誤導，建議以保險公司官方文件、最新通告或持牌顧問說明為準。" },
  },
  {
    id: "personalized",
    title: { zhHans: "个性化建议拒答", zhHant: "個性化建議拒答" },
    message: { zhHans: "我可以说明不同产品的资料差异和一般适用场景，但不能基于个人情况作出购买建议。", zhHant: "我可以說明不同產品的資料差異和一般適用場景，但不能基於個人情況作出購買建議。" },
  },
  {
    id: "legal",
    title: { zhHans: "法律 / 税务 / 医疗判断拒答", zhHant: "法律 / 稅務 / 醫療判斷拒答" },
    message: { zhHans: "涉及法律、税务或医疗判断时，我可以帮助解释资料内容，但不直接下结论，建议咨询专业人士。", zhHant: "涉及法律、稅務或醫療判斷時，我可以幫助解釋資料內容，但不直接下結論，建議諮詢專業人士。" },
  },
  {
    id: "return_no_official",
    title: { zhHans: "产品收益但无官方来源", zhHant: "產品收益但無官方來源" },
    message: { zhHans: "产品收益、回本期、现金价值类问题必须引用官方文件；当前缺少足够官方依据，不返回实质性结论。", zhHant: "產品收益、回本期、現金價值類問題必須引用官方文件；當前缺少足夠官方依據，不返回實質性結論。" },
  },
  {
    id: "expired_promo",
    title: { zhHans: "过期优惠提示", zhHant: "過期優惠提示" },
    message: { zhHans: "该优惠已过期，仅可作为历史资料参考，不能视为当前有效优惠。", zhHant: "該優惠已過期，僅可作為歷史資料參考，不能視為當前有效優惠。" },
  },
];

export const miniUploadStates = [
  { id: "waiting", label: { zhHans: "等待上传", zhHant: "等待上傳" } },
  { id: "uploading", label: { zhHans: "上传中", zhHant: "上傳中" } },
  { id: "parsing", label: { zhHans: "解析中", zhHant: "解析中" } },
  { id: "success", label: { zhHans: "解析成功", zhHant: "解析成功" } },
  { id: "failed", label: { zhHans: "解析失败", zhHant: "解析失敗" } },
  { id: "expired", label: { zhHans: "已过期删除", zhHant: "已過期刪除" } },
];

export const miniKnowledgeItems = [
  {
    id: "knowledge_basic_1",
    categoryId: "basic",
    updatedAt: "2026-05-18",
    question: { zhHans: "香港保险冷静期是多久？", zhHant: "香港保險冷靜期是多久？" },
    answer: {
      zhHans: "冷静期需以具体产品官方条款为准，不同保险公司和产品可能存在差异。常见做法是在保单签发后的指定天数内可申请撤销。",
    },
    caution: {
      zhHans: "已生效保单、扣费状态和提交流程仍需以官方文件和持牌顾问说明为准。",
      zhHant: "已生效保單、扣費狀態和提交流程仍需以官方文件和持牌顧問說明為準。",
    },
    citationIds: ["mini_citation_ci_terms_1"],
  },
  {
    id: "knowledge_loan_1",
    categoryId: "loan",
    updatedAt: "2026-05-14",
    question: { zhHans: "保单贷款会不会影响现金价值和红利？", zhHant: "保單貸款會不會影響現金價值和紅利？" },
    answer: {
      zhHans: "已启用资料显示，保单贷款可能影响现金价值及后续红利累积。",
      zhHant: "已啟用資料顯示，保單貸款可能影響現金價值及後續紅利累積。",
    },
    caution: {
      zhHans: "不同产品处理方式可能不同，应核对具体条款和利益说明。",
      zhHant: "不同產品處理方式可能不同，應核對具體條款和利益說明。",
    },
    citationIds: ["mini_citation_loan_terms", "mini_citation_savings_benefit"],
  },
  {
    id: "knowledge_cross_1",
    categoryId: "cross",
    updatedAt: "2026-05-20",
    question: { zhHans: "内地客户赴港投保通常要注意什么？", zhHant: "內地客戶赴港投保通常要注意什麼？" },
    answer: {
      zhHans: "需重点关注签署地点、核保要求、缴费安排及理赔资料提交流程。",
      zhHant: "需重點關注簽署地點、核保要求、繳費安排及理賠資料提交流程。",
    },
    caution: {
      zhHans: "不同公司对核保及签署安排的要求可能不同。",
      zhHant: "不同公司對核保及簽署安排的要求可能不同。",
    },
    citationIds: ["mini_citation_cross_faq_1"],
  },
];

export const miniUploadGuides = {
  warning: {
    zhHans: "请勿上传身份证件、通行证、银行资料、医疗报告、体检报告、诊断证明、理赔文件等敏感资料。",
    zhHant: "請勿上傳身份證件、通行證、銀行資料、醫療報告、體檢報告、診斷證明、理賠文件等敏感資料。",
  },
  allowed: [
    { zhHans: "产品小册子", zhHant: "產品小冊子" },
    { zhHans: "计划书", zhHant: "計劃書" },
    { zhHans: "保单摘要", zhHant: "保單摘要" },
    { zhHans: "普通图片问题", zhHant: "普通圖片問題" },
  ],
  blocked: [
    { zhHans: "身份证", zhHant: "身份證" },
    { zhHans: "通行证", zhHant: "通行證" },
    { zhHans: "银行资料", zhHant: "銀行資料" },
    { zhHans: "体检报告", zhHant: "體檢報告" },
    { zhHans: "医疗报告", zhHant: "醫療報告" },
    { zhHans: "理赔诊断文件", zhHant: "理賠診斷文件" },
  ],
};

export const miniSettingsContent = {
  privacy: { zhHans: "隐私说明", zhHant: "隱私說明" },
  retention: { zhHans: "数据说明", zhHant: "數據說明" },
  chatRetention: { zhHans: "聊天记录保存 6 个月", zhHant: "聊天記錄保存 6 個月" },
  uploadRetention: { zhHans: "上传文件保存 1 个月", zhHant: "上傳文件保存 1 個月" },
  improvement: { zhHans: "脱敏后用于服务质量改进、知识库优化和问答效果评估。", zhHant: "脫敏後用於服務質量改進、知識庫優化和問答效果評估。" },
  deleteRule: { zhHans: "到期后自动删除或标记删除。", zhHant: "到期後自動刪除或標記刪除。" },
};

export const miniQuickPromptTemplates: Array<{
  id: string;
  label: LocalizedText;
  question: string;
  targetSessionId?: string;
  fallbackId?: string;
}> = [
  { id: "prompt_cooloff", label: { zhHans: "冷静期", zhHant: "冷靜期" }, question: "A产品冷静期多久？", targetSessionId: "session_1" },
  { id: "prompt_loan", label: { zhHans: "保单贷款", zhHant: "保單貸款" }, question: "保单贷款会影响红利吗？", targetSessionId: "session_4" },
  { id: "prompt_claims", label: { zhHans: "理赔流程", zhHant: "理賠流程" }, question: "赴港投保后的理赔流程要注意什么？", targetSessionId: "session_1" },
  { id: "prompt_ci_compare", label: { zhHans: "重疾险对比", zhHant: "重疾險對比" }, question: "香港重疾险和内地重疾险有什么区别？", targetSessionId: "session_1" },
  { id: "prompt_savings", label: { zhHans: "储蓄险回本", zhHant: "儲蓄險回本" }, question: "这个储蓄险第几年回本？", targetSessionId: "session_3" },
  { id: "prompt_deductible", label: { zhHans: "医疗险垫底费", zhHant: "醫療險墊底費" }, question: "A公司和B公司的医疗险哪个更适合我？", targetSessionId: "session_2" },
  { id: "prompt_cross", label: { zhHans: "内地客户赴港投保", zhHant: "內地客戶赴港投保" }, question: "内地客户赴港投保通常要注意什么？", targetSessionId: "session_1" },
  { id: "prompt_promo", label: { zhHans: "当前优惠是否有效", zhHant: "當前優惠是否有效" }, question: "当前优惠是否还有效？", targetSessionId: "session_2", fallbackId: "expired_promo" },
];

export const miniDefaultCompareSelection = [
  { productId: "product_2", versionId: "product_version_2" },
  { productId: "product_3", versionId: "product_version_3" },
];

export function getMiniCitation(id: string) {
  return miniCitations.find((item) => item.id === id);
}

export function getMiniCategory(id: string) {
  return miniCategories.find((item) => item.id === id);
}

export function getMiniProduct(id: string) {
  return miniProducts.find((item) => item.id === id);
}

export function getMiniSession(id: string) {
  return miniHistorySessions.find((item) => item.id === id);
}

export function getMiniProductVersion(productId: string, versionId: string) {
  return miniProducts.find((product) => product.id === productId)?.versions.find((version) => version.id === versionId);
}

export function getMiniKnowledgeItemsByCategory(categoryId: string) {
  return miniKnowledgeItems.filter((item) => item.categoryId === categoryId);
}

export function getMiniCitationsByFile(fileName: string) {
  return miniCitations.filter((item) => item.fileName === fileName);
}

export function getFriendlySourceLevel(level: MiniCitation["sourceLevel"]) {
  return miniSourceLevelMeta[level];
}
