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
    keywords: ["重疾", "等待期", "90日"],
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
    fileName: "B公司环球医疗小册子.pdf",
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
    fileName: "B公司环球医疗小册子.pdf",
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
    matchedParagraph: "利益说明与非保证红利",
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
  { id: "cross", badge: "港", title: { zhHans: "内地客户赴港投保 FAQ", zhHant: "內地客戶赴港投保 FAQ" }, topics: { zhHans: "赴港签署、缴费、核保、理赔", zhHant: "赴港簽署、繳費、核保、理賠" } },
];

export const miniHotQuestions: LocalizedText[] = [
  { zhHans: "A产品冷静期多久？", zhHant: "A產品冷靜期多久？" },
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
          waitingPeriod: { value: "90日", citationId: "mini_citation_ci_terms_1" },
          coolOffPeriod: { value: "21日", citationId: "mini_citation_ci_terms_1" },
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
          waitingPeriod: { value: "30日", citationId: "mini_citation_medical_a_terms" },
          preExisting: { value: "按核保结果处理", citationId: "mini_citation_medical_a_room" },
          coolOffPeriod: { value: "21日", citationId: "mini_citation_medical_a_terms" },
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
          coverageRegion: { value: "全球", citationId: "mini_citation_medical_a_terms" },
          annualLimit: { value: "HKD 25M", citationId: "mini_citation_medical_a_terms" },
          roomLevel: { value: "半私家房", citationId: "mini_citation_medical_a_room" },
          deductible: { value: "固定档", citationId: "mini_citation_medical_a_room" },
          coinsurance: { value: "10%", citationId: "mini_citation_medical_a_room" },
          waitingPeriod: { value: "30日", citationId: "mini_citation_medical_a_terms" },
          preExisting: { value: "按核保结果处理", citationId: "mini_citation_medical_a_room" },
          coolOffPeriod: { value: "21日", citationId: "mini_citation_medical_a_terms" },
          surrender: { value: "无现金价值", citationId: "mini_citation_medical_a_terms" },
          policyLoan: { value: "不适用", citationId: "mini_citation_medical_a_terms" },
          promotion: { value: "当前无已启用优惠", citationId: "mini_citation_medical_a_terms" },
        },
      },
    ],
  },
  {
    id: "product_3",
    company: { zhHans: "B公司", zhHant: "B公司" },
    name: { zhHans: "环球医疗", zhHant: "環球醫療" },
    productType: { zhHans: "医疗险", zhHant: "醫療險" },
    summary: { zhHans: "亚洲及指定地区保障、半私家房、历史优惠", zhHant: "亞洲及指定地區保障、半私家房、歷史優惠" },
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
          waitingPeriod: { value: "30日", citationId: "mini_citation_medical_b_brochure" },
          preExisting: { value: "按核保结果处理", citationId: "mini_citation_medical_b_rules" },
          coolOffPeriod: { value: "21日", citationId: "mini_citation_medical_b_brochure" },
          surrender: { value: "无现金价值", citationId: "mini_citation_medical_b_brochure" },
          policyLoan: { value: "不适用", citationId: "mini_citation_medical_b_brochure" },
          promotion: { value: "历史优惠至 2026-03-31", citationId: "mini_citation_promo_expired" },
        },
      },
    ],
  },
  {
    id: "product_4",
    company: { zhHans: "保诚", zhHant: "保誠" },
    name: { zhHans: "匠心飞越", zhHant: "匠心飛越" },
    productType: { zhHans: "储蓄 / 分红险", zhHant: "儲蓄 / 分紅險" },
    summary: { zhHans: "现金价值、非保证红利、保单贷款", zhHant: "現金價值、非保證紅利、保單貸款" },
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
          company: { value: "保诚", citationId: "mini_citation_savings_benefit" },
          productName: { value: "匠心飞越", citationId: "mini_citation_savings_benefit" },
          productType: { value: "储蓄 / 分红险", citationId: "mini_citation_savings_benefit" },
          version: { value: "v2604", citationId: "mini_citation_savings_benefit" },
          publishDate: { value: "2026-04-05", citationId: "mini_citation_savings_benefit" },
          effectiveDate: { value: "2026-04-20", citationId: "mini_citation_savings_benefit" },
          waitingPeriod: { value: "不适用", citationId: "mini_citation_savings_benefit" },
          coolOffPeriod: { value: "21日", citationId: "mini_citation_savings_benefit" },
          surrender: { value: "退保价值以现金价值表为准", citationId: "mini_citation_savings_benefit" },
          policyLoan: { value: "支持保单贷款", citationId: "mini_citation_loan_terms" },
          promotion: { value: "当前无已启用优惠", citationId: "mini_citation_savings_benefit" },
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
    riskType: "PRODUCT_DETAIL",
    riskLevel: "LOW",
    clientAnonymousId: "client_ci_1024",
    language: "ZH_HANS",
    createdAt: "2026-05-26 10:24",
    expiresAt: "2026-11-26 10:24",
    uploads: [],
    ruleHits: ["必须有来源", "不得作购买建议"],
    messages: [
      {
        id: "session_1_user_1",
        role: "USER",
        content: { zhHans: "香港重疾险和内地重疾险有什么区别？", zhHant: "香港重疾險和內地重疾險有什麼區別？" },
      },
      {
        id: "session_1_assistant_1",
        role: "ASSISTANT",
        content: { zhHans: "以下是基于已启用资料整理的差异说明。", zhHant: "以下是基於已啟用資料整理的差異說明。" },
        citations: ["mini_citation_ci_terms_1", "mini_citation_ci_faq_1", "mini_citation_cross_faq_1"],
        structuredAnswer: {
          shortConclusion: { zhHans: "香港重疾险通常更强调条款定义和核保口径，赴港投保还需留意签署与理赔流程。", zhHant: "香港重疾險通常更強調條款定義和核保口徑，赴港投保還需留意簽署與理賠流程。" },
          details: [
            { zhHans: "疾病定义和等待期需以官方条款为准，不同产品差异较大。", zhHant: "疾病定義和等待期需以官方條款為準，不同產品差異較大。" },
            { zhHans: "内地客户赴港投保时，还要关注签署地点、核保安排和后续服务流程。", zhHant: "內地客戶赴港投保時，還要關注簽署地點、核保安排和後續服務流程。" },
          ],
          scenarios: [{ zhHans: "适合经纪人先做资料解释，再结合具体产品条款核对。", zhHant: "適合經紀人先做資料解釋，再結合具體產品條款核對。" }],
          cautions: [{ zhHans: "不能仅凭概念差异给出购买推荐，仍需回到具体产品文件。", zhHant: "不能僅憑概念差異給出購買推薦，仍需回到具體產品文件。" }],
          followUps: [
            { zhHans: "和某个具体产品有什么区别？", zhHant: "和某個具體產品有什麼區別？" },
            { zhHans: "等待期和轻症定义怎么查？", zhHant: "等待期和輕症定義怎麼查？" },
            { zhHans: "可以生成客户版说明吗？", zhHant: "可以生成客戶版說明嗎？" },
          ],
        },
      },
    ],
  },
  {
    id: "session_2",
    title: { zhHans: "A公司和B公司的高端医疗险有什么区别？", zhHant: "A公司和B公司的高端醫療險有什麼區別？" },
    category: { zhHans: "产品对比", zhHant: "產品對比" },
    riskLabel: { zhHans: "中", zhHant: "中" },
    riskType: "PRODUCT_COMPARISON",
    riskLevel: "MEDIUM",
    clientAnonymousId: "client_med_1102",
    language: "ZH_HANS",
    createdAt: "2026-05-26 11:02",
    expiresAt: "2026-11-26 11:02",
    uploads: [
      {
        id: "upload_medical_plan",
        fileName: "高端医疗计划书.pdf",
        uploadedAt: "2026-05-26 10:58",
        status: "解析成功",
        expiresAt: "2026-06-26 10:58",
      },
    ],
    ruleHits: ["必须展示来源页码", "不允许推荐产品", "历史优惠需标记已过期"],
    messages: [
      {
        id: "session_2_user_1",
        role: "USER",
        content: { zhHans: "A公司和B公司的高端医疗险有什么区别？", zhHant: "A公司和B公司的高端醫療險有什麼區別？" },
      },
      {
        id: "session_2_assistant_1",
        role: "ASSISTANT",
        content: { zhHans: "以下为两个产品的客观资料差异，不构成购买建议。", zhHant: "以下為兩個產品的客觀資料差異，不構成購買建議。" },
        citations: ["mini_citation_medical_a_terms", "mini_citation_medical_a_room", "mini_citation_medical_b_brochure", "mini_citation_medical_b_rules", "mini_citation_promo_expired"],
        structuredAnswer: {
          shortConclusion: { zhHans: "A公司产品保障地区更广，B公司产品年度限额略低且历史优惠已过期。", zhHant: "A公司產品保障地區更廣，B公司產品年度限額略低且歷史優惠已過期。" },
          details: [
            { zhHans: "A公司为全球保障，B公司主要覆盖亚洲及指定地区。", zhHant: "A公司為全球保障，B公司主要覆蓋亞洲及指定地區。" },
            { zhHans: "A公司病房级别和自付额更灵活，B公司以半私家房和固定档为主。", zhHant: "A公司病房級別和自付額更靈活，B公司以半私家房和固定檔為主。" },
          ],
          comparisonTable: [
            { dimension: { zhHans: "保障地区", zhHant: "保障地區" }, left: "全球", right: "亚洲及指定地区", citationIds: ["mini_citation_medical_a_terms", "mini_citation_medical_b_brochure"] },
            { dimension: { zhHans: "年度限额", zhHant: "年度限額" }, left: "HKD 30M", right: "HKD 25M", citationIds: ["mini_citation_medical_a_terms", "mini_citation_medical_b_brochure"] },
            { dimension: { zhHans: "病房级别", zhHant: "病房級別" }, left: "私家房 / 半私家房", right: "半私家房", citationIds: ["mini_citation_medical_a_room", "mini_citation_medical_b_rules"] },
          ],
          scenarios: [{ zhHans: "适合经纪人先快速核对保障范围、病房级别和优惠状态。", zhHant: "適合經紀人先快速核對保障範圍、病房級別和優惠狀態。" }],
          cautions: [
            { zhHans: "历史优惠不能视为当前有效优惠。", zhHant: "歷史優惠不能視為當前有效優惠。" },
            { zhHans: "最终仍需以官方条款及最新版本文件为准。", zhHant: "最終仍需以官方條款及最新版本文件為準。" },
          ],
          followUps: [
            { zhHans: "还有哪些注意事项？", zhHant: "還有哪些注意事項？" },
            { zhHans: "和其他产品有什么区别？", zhHant: "和其他產品有什麼區別？" },
            { zhHans: "可以生成客户版说明吗？", zhHant: "可以生成客戶版說明嗎？" },
          ],
          riskNotice: { zhHans: "历史优惠已过期，仅可作为资料参考。", zhHant: "歷史優惠已過期，僅可作為資料參考。" },
        },
      },
    ],
  },
  {
    id: "session_3",
    title: { zhHans: "这个储蓄险第几年回本？", zhHant: "這個儲蓄險第幾年回本？" },
    category: { zhHans: "储蓄险", zhHant: "儲蓄險" },
    riskLabel: { zhHans: "高：收益类", zhHant: "高：收益類" },
    riskType: "BENEFIT_OR_RETURN",
    riskLevel: "HIGH",
    clientAnonymousId: "client_save_1133",
    language: "ZH_HANS",
    createdAt: "2026-05-26 11:33",
    expiresAt: "2026-11-26 11:33",
    uploads: [],
    ruleHits: ["收益类必须引用官方文件", "无官方依据时谨慎回答"],
    messages: [
      {
        id: "session_3_user_1",
        role: "USER",
        content: { zhHans: "这个储蓄险第几年回本？", zhHant: "這個儲蓄險第幾年回本？" },
      },
      {
        id: "session_3_assistant_1",
        role: "ASSISTANT",
        content: { zhHans: "回本期需要结合官方利益说明查看，不能仅凭概念回答。", zhHant: "回本期需要結合官方利益說明查看，不能僅憑概念回答。" },
        citations: ["mini_citation_savings_benefit"],
        structuredAnswer: {
          shortConclusion: { zhHans: "现有资料仅说明红利属于非保证利益，回本期需回到官方利益说明表核对。", zhHant: "現有資料僅說明紅利屬於非保證利益，回本期需回到官方利益說明表核對。" },
          details: [
            { zhHans: "现金价值和回本期会随缴费期、保额及红利假设变化。", zhHant: "現金價值和回本期會隨繳費期、保額及紅利假設變化。" },
            { zhHans: "如需对客户解释，建议直接引用对应计划书或利益说明页。", zhHant: "如需對客戶解釋，建議直接引用對應計劃書或利益說明頁。" },
          ],
          scenarios: [{ zhHans: "适合先确认产品版本，再去查对应利益说明表。", zhHant: "適合先確認產品版本，再去查對應利益說明表。" }],
          cautions: [{ zhHans: "没有对应官方利益说明页时，不应直接给出回本年份。", zhHant: "沒有對應官方利益說明頁時，不應直接給出回本年份。" }],
          followUps: [
            { zhHans: "可以帮我整理客户版口径吗？", zhHant: "可以幫我整理客戶版口徑嗎？" },
            { zhHans: "保单贷款会影响红利吗？", zhHant: "保單貸款會影響紅利嗎？" },
            { zhHans: "需要看哪份计划书？", zhHant: "需要看哪份計劃書？" },
          ],
          riskNotice: { zhHans: "收益相关问题必须引用官方利益说明文件。", zhHant: "收益相關問題必須引用官方利益說明文件。" },
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
    clientAnonymousId: "client_loan_1205",
    language: "ZH_HANS",
    createdAt: "2026-05-26 12:05",
    expiresAt: "2026-11-26 12:05",
    uploads: [],
    ruleHits: ["必须引用官方资料", "不能替代条款解释"],
    messages: [
      {
        id: "session_4_user_1",
        role: "USER",
        content: { zhHans: "保单贷款会影响红利吗？", zhHant: "保單貸款會影響紅利嗎？" },
      },
      {
        id: "session_4_assistant_1",
        role: "ASSISTANT",
        content: { zhHans: "通常会影响现金价值及后续红利，需以条款和利益说明为准。", zhHant: "通常會影響現金價值及後續紅利，需以條款和利益說明為準。" },
        citations: ["mini_citation_loan_terms", "mini_citation_savings_benefit"],
        structuredAnswer: {
          shortConclusion: { zhHans: "保单贷款通常会影响保单现金价值及后续红利累积。", zhHant: "保單貸款通常會影響保單現金價值及後續紅利累積。" },
          details: [
            { zhHans: "贷款利息和未偿还金额可能减少可分配红利或影响现金价值。", zhHant: "貸款利息和未償還金額可能減少可分配紅利或影響現金價值。" },
            { zhHans: "具体影响程度要看产品条款、利益说明及当前贷款安排。", zhHant: "具體影響程度要看產品條款、利益說明及當前貸款安排。" },
          ],
          scenarios: [{ zhHans: "适合经纪人先快速解释原则，再回到产品利益说明核对。", zhHant: "適合經紀人先快速解釋原則，再回到產品利益說明核對。" }],
          cautions: [{ zhHans: "不要直接承诺‘不影响红利’或‘一定影响多少’，必须以文件为准。", zhHant: "不要直接承諾『不影響紅利』或『一定影響多少』，必須以文件為準。" }],
          followUps: [
            { zhHans: "这个产品支持保单贷款吗？", zhHant: "這個產品支持保單貸款嗎？" },
            { zhHans: "现金价值怎么查？", zhHant: "現金價值怎麼查？" },
            { zhHans: "可以生成客户版说明吗？", zhHant: "可以生成客戶版說明嗎？" },
          ],
        },
      },
    ],
  },
];

export const miniFallbackStates = [
  {
    id: "fallback_no_source",
    title: { zhHans: "未找到足够依据", zhHant: "未找到足夠依據" },
    message: {
      zhHans: "未在已启用资料中找到足够依据。为避免误导，建议回到保险公司官方文件、最新通告或持牌顾问说明。",
      zhHant: "未在已啟用資料中找到足夠依據。為避免誤導，建議回到保險公司官方文件、最新通告或持牌顧問說明。",
    },
  },
  {
    id: "fallback_personalized",
    title: { zhHans: "个性化建议拒答", zhHant: "個性化建議拒答" },
    message: {
      zhHans: "我可以说明不同产品的资料差异和一般适用场景，但不能基于个人情况作出购买建议。",
      zhHant: "我可以說明不同產品的資料差異和一般適用場景，但不能基於個人情況作出購買建議。",
    },
  },
  {
    id: "fallback_legal",
    title: { zhHans: "法律 / 税务 / 医疗判断", zhHant: "法律 / 稅務 / 醫療判斷" },
    message: {
      zhHans: "涉及法律、税务或医疗判断时，我只能整理资料口径，不能直接下结论，建议咨询专业人士。",
      zhHant: "涉及法律、稅務或醫療判斷時，我只能整理資料口徑，不能直接下結論，建議諮詢專業人士。",
    },
  },
  {
    id: "fallback_benefit",
    title: { zhHans: "收益问题但无官方来源", zhHant: "收益問題但無官方來源" },
    message: {
      zhHans: "收益、回本期、现金价值等问题必须引用官方利益说明或条款；如暂无对应页码，不能直接回答。",
      zhHant: "收益、回本期、現金價值等問題必須引用官方利益說明或條款；如暫無對應頁碼，不能直接回答。",
    },
  },
  {
    id: "fallback_promotion",
    title: { zhHans: "过期优惠提示", zhHant: "過期優惠提示" },
    message: {
      zhHans: "该优惠已过期，仅可作为历史资料参考，不能视为当前有效优惠。",
      zhHant: "該優惠已過期，僅可作為歷史資料參考，不能視為當前有效優惠。",
    },
  },
];

export const miniUploadStates = [
  { id: "pending", label: { zhHans: "等待上传", zhHant: "等待上傳" } },
  { id: "uploading", label: { zhHans: "上传中", zhHant: "上傳中" } },
  { id: "parsing", label: { zhHans: "解析中", zhHant: "解析中" } },
  { id: "parsed", label: { zhHans: "解析成功", zhHant: "解析成功" } },
  { id: "failed", label: { zhHans: "解析失败", zhHant: "解析失敗" } },
  { id: "expired", label: { zhHans: "已过期删除", zhHant: "已過期刪除" } },
];

export const miniKnowledgeItems = [
  {
    id: "knowledge_basic_1",
    categoryId: "basic",
    question: { zhHans: "香港保险冷静期一般多久？", zhHant: "香港保險冷靜期一般多久？" },
    answer: { zhHans: "常见为 21 日，具体以对应产品条款为准。", zhHant: "常見為 21 日，具體以對應產品條款為準。" },
    caution: { zhHans: "不同产品或版本可能有差异。", zhHant: "不同產品或版本可能有差異。" },
    citationIds: ["mini_citation_ci_terms_1"],
    updatedAt: "2026-05-12",
  },
  {
    id: "knowledge_ci_1",
    categoryId: "ci",
    question: { zhHans: "重疾险等待期通常怎么理解？", zhHant: "重疾險等待期通常怎麼理解？" },
    answer: { zhHans: "等待期是保障生效后的一段观察期，等待期内发生相关情况通常不触发标准赔付。", zhHant: "等待期是保障生效後的一段觀察期，等待期內發生相關情況通常不觸發標準賠付。" },
    caution: { zhHans: "具体疾病定义及例外情况要回到条款页。", zhHant: "具體疾病定義及例外情況要回到條款頁。" },
    citationIds: ["mini_citation_ci_terms_1", "mini_citation_ci_faq_1"],
    updatedAt: "2026-05-18",
  },
  {
    id: "knowledge_savings_1",
    categoryId: "savings",
    question: { zhHans: "储蓄险回本期应该怎么看？", zhHant: "儲蓄險回本期應該怎麼看？" },
    answer: { zhHans: "需要结合官方利益说明、缴费期和红利假设查看，不能只看宣传语。", zhHant: "需要結合官方利益說明、繳費期和紅利假設查看，不能只看宣傳語。" },
    caution: { zhHans: "涉及收益时应优先引用官方利益说明。", zhHant: "涉及收益時應優先引用官方利益說明。" },
    citationIds: ["mini_citation_savings_benefit"],
    updatedAt: "2026-05-20",
  },
  {
    id: "knowledge_medical_1",
    categoryId: "medical",
    question: { zhHans: "医疗险垫底费和共同保险有什么区别？", zhHant: "醫療險墊底費和共同保險有什麼區別？" },
    answer: { zhHans: "垫底费通常是固定金额门槛，共同保险则是超过门槛后仍需分担的一定比例费用。", zhHant: "墊底費通常是固定金額門檻，共同保險則是超過門檻後仍需分擔的一定比例費用。" },
    caution: { zhHans: "不同计划的计算方式可能不同。", zhHant: "不同計劃的計算方式可能不同。" },
    citationIds: ["mini_citation_medical_a_room", "mini_citation_medical_b_rules"],
    updatedAt: "2026-05-21",
  },
  {
    id: "knowledge_process_1",
    categoryId: "process",
    question: { zhHans: "赴港投保通常有哪些流程？", zhHant: "赴港投保通常有哪些流程？" },
    answer: { zhHans: "通常包括预约说明、赴港签署、核保补件、缴费及保单生效。", zhHant: "通常包括預約說明、赴港簽署、核保補件、繳費及保單生效。" },
    caution: { zhHans: "经纪人应先确认客户签署和缴费安排。", zhHant: "經紀人應先確認客戶簽署和繳費安排。" },
    citationIds: ["mini_citation_cross_faq_1"],
    updatedAt: "2026-05-22",
  },
  {
    id: "knowledge_claims_1",
    categoryId: "claims",
    question: { zhHans: "理赔资料一般要准备什么？", zhHant: "理賠資料一般要準備什麼？" },
    answer: { zhHans: "通常包括理赔申请表、诊断证明、住院或检查资料及身份核验文件。", zhHant: "通常包括理賠申請表、診斷證明、住院或檢查資料及身份核驗文件。" },
    caution: { zhHans: "实际资料以保险公司理赔通知为准。", zhHant: "實際資料以保險公司理賠通知為準。" },
    citationIds: ["mini_citation_cross_faq_1"],
    updatedAt: "2026-05-10",
  },
  {
    id: "knowledge_loan_1",
    categoryId: "loan",
    question: { zhHans: "保单贷款会影响什么？", zhHant: "保單貸款會影響什麼？" },
    answer: { zhHans: "主要影响现金价值、后续红利及保单持续有效性。", zhHant: "主要影響現金價值、後續紅利及保單持續有效性。" },
    caution: { zhHans: "需结合贷款金额和利息安排一并说明。", zhHant: "需結合貸款金額和利息安排一併說明。" },
    citationIds: ["mini_citation_loan_terms", "mini_citation_savings_benefit"],
    updatedAt: "2026-05-24",
  },
  {
    id: "knowledge_cooloff_1",
    categoryId: "cooloff",
    question: { zhHans: "冷静期内撤单要注意什么？", zhHant: "冷靜期內撤單要注意什麼？" },
    answer: { zhHans: "应确认冷静期截止日期、保单状态及可能扣除的实际费用。", zhHant: "應確認冷靜期截止日期、保單狀態及可能扣除的實際費用。" },
    caution: { zhHans: "不同产品对退费处理可能不同。", zhHant: "不同產品對退費處理可能不同。" },
    citationIds: ["mini_citation_ci_faq_1"],
    updatedAt: "2026-05-16",
  },
  {
    id: "knowledge_uw_1",
    categoryId: "uw",
    question: { zhHans: "核保和体检通常怎么安排？", zhHant: "核保和體檢通常怎麼安排？" },
    answer: { zhHans: "通常先看健康告知，再决定是否补问卷、体检或补件。", zhHant: "通常先看健康告知，再決定是否補問卷、體檢或補件。" },
    caution: { zhHans: "经纪人不应代替核保结论，只能协助整理资料。", zhHant: "經紀人不應代替核保結論，只能協助整理資料。" },
    citationIds: ["mini_citation_cross_faq_1"],
    updatedAt: "2026-05-17",
  },
  {
    id: "knowledge_trust_1",
    categoryId: "trust",
    question: { zhHans: "保单信托一般适合什么场景？", zhHant: "保單信託一般適合什麼場景？" },
    answer: { zhHans: "常见于需要明确受益安排、财富传承或未成年受益人管理的场景。", zhHant: "常見於需要明確受益安排、財富傳承或未成年受益人管理的場景。" },
    caution: { zhHans: "涉及法律文件时应提示客户咨询专业人士。", zhHant: "涉及法律文件時應提示客戶諮詢專業人士。" },
    citationIds: ["mini_citation_cross_faq_1"],
    updatedAt: "2026-05-14",
  },
  {
    id: "knowledge_cross_1",
    categoryId: "cross",
    question: { zhHans: "内地客户赴港投保要注意哪些资料？", zhHant: "內地客戶赴港投保要注意哪些資料？" },
    answer: { zhHans: "需要重点确认签署安排、缴费路径、核保补件及理赔后续服务。", zhHant: "需要重點確認簽署安排、繳費路徑、核保補件及理賠後續服務。" },
    caution: { zhHans: "应提醒客户以官方通知及经纪公司流程为准。", zhHant: "應提醒客戶以官方通知及經紀公司流程為準。" },
    citationIds: ["mini_citation_cross_faq_1"],
    updatedAt: "2026-05-23",
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
  retention: { zhHans: "数据说明", zhHant: "數據說明" },
  chatRetention: { zhHans: "聊天记录保存 6 个月", zhHant: "聊天記錄保存 6 個月" },
  uploadRetention: { zhHans: "上传文件保存 1 个月", zhHant: "上傳文件保存 1 個月" },
  improvement: { zhHans: "脱敏后用于服务质量改进、知识库优化和问答效果评估", zhHant: "脫敏後用於服務質量改進、知識庫優化和問答效果評估" },
  deleteRule: { zhHans: "到期后按规则删除，不做客户留资", zhHant: "到期後按規則刪除，不做客戶留資" },
  privacy: { zhHans: "隐私说明", zhHant: "隱私說明" },
};

export const miniQuickPromptTemplates: Array<{
  id: string;
  label: LocalizedText;
  question: string;
  targetSessionId: string;
}> = [
  { id: "prompt_1", label: { zhHans: "冷静期", zhHant: "冷靜期" }, question: "A产品冷静期多久？", targetSessionId: "session_1" },
  { id: "prompt_2", label: { zhHans: "保单贷款", zhHant: "保單貸款" }, question: "保单贷款会影响红利吗？", targetSessionId: "session_4" },
  { id: "prompt_3", label: { zhHans: "理赔流程", zhHant: "理賠流程" }, question: "理赔流程一般怎么走？", targetSessionId: "session_1" },
  { id: "prompt_4", label: { zhHans: "重疾险对比", zhHant: "重疾險對比" }, question: "香港重疾险和内地重疾险有什么区别？", targetSessionId: "session_1" },
  { id: "prompt_5", label: { zhHans: "储蓄险回本", zhHant: "儲蓄險回本" }, question: "这个储蓄险第几年回本？", targetSessionId: "session_3" },
  { id: "prompt_6", label: { zhHans: "医疗险垫底费", zhHant: "醫療險墊底費" }, question: "医疗险垫底费和共同保险有什么区别？", targetSessionId: "session_2" },
  { id: "prompt_7", label: { zhHans: "内地客户赴港投保", zhHant: "內地客戶赴港投保" }, question: "内地客户赴港投保要注意哪些流程？", targetSessionId: "session_1" },
  { id: "prompt_8", label: { zhHans: "当前优惠是否有效", zhHant: "當前優惠是否有效" }, question: "当前优惠是否还有效？", targetSessionId: "session_2" },
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
  return getMiniProduct(productId)?.versions.find((item) => item.id === versionId);
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
