import type { AgentRuleGroup, FaqItem, PromotionItem } from "./api";

type TableRow = string[];

export const platformStats = [
  { label: "租户数量", value: "42", note: "启用 39" },
  { label: "公共知识文件", value: "1,286", note: "待审核 31" },
  { label: "高风险回答", value: "17", note: "今日拦截" },
  { label: "引用覆盖率", value: "100%", note: "强制页码引用" },
];

export const brokerStats = [
  { label: "本月问答", value: "2,431", note: "较上月 +12%" },
  { label: "上传文件", value: "126", note: "待审核 14" },
  { label: "无答案问题", value: "38", note: "需补充 FAQ" },
  { label: "产品对比", value: "418", note: "高频：医疗险" },
];

export const platformDocuments: TableRow[] = [
  ["AIA_重疾险_产品小册子.pdf", "港华保险经纪", "L2", "待审核", "审核"],
  ["Prudential_储蓄计划_利益说明.xlsx", "湾区财富顾问", "L3", "已启用", "查看"],
  ["Manulife_限时优惠.pdf", "星汇保险服务", "L4", "已过期", "查看"],
  ["重疾险销售培训.pptx", "港华保险经纪", "L5", "待审核", "审核"],
];

export const brokerDocuments: TableRow[] = [
  ["AIA_重疾险_产品小册子.pdf", "产品小册子", "v2026.03", "待审核"],
  ["Prudential_储蓄计划_利益说明.xlsx", "费率/利益说明", "v2026.02", "已启用"],
  ["Manulife_限时优惠.pdf", "优惠政策", "v2026.05", "已过期"],
  ["重疾险销售培训.pptx", "内部培训", "v2026.01", "待审核"],
];

export const adminChatSessions: TableRow[] = [
  ["香港重疾险和内地重疾险有什么区别？", "重疾险", "3个来源", "低", "10:24"],
  ["A公司和B公司的医疗险哪个更适合我？", "产品对比", "5个来源", "中：个性化倾向", "11:02"],
  ["这个储蓄险第几年回本？", "分红险", "2个来源", "高：收益类", "11:33"],
];

export const brokerChatSessions: TableRow[] = [
  ["香港重疾险和内地重疾险有什么区别？", "重疾险", "3个来源", "低", "10:24"],
  ["A公司和B公司的医疗险哪个更适合我？", "产品对比", "5个来源", "中：个性化倾向", "11:02"],
  ["这个储蓄险第几年回本？", "分红险", "2个来源", "高：收益类", "11:33"],
];

export const brokerUsers: TableRow[] = [
  ["李顾问", "li@example.com", "启用", "280", "重疾险专题"],
  ["陈顾问", "chen@example.com", "启用", "154", "储蓄险专题"],
  ["王顾问", "wang@example.com", "停用", "0", "待重新分配"],
];

export const tenants: TableRow[] = [
  ["港华保险经纪", "18", "2,431", "启用"],
  ["湾区财富顾问", "9", "914", "启用"],
  ["星汇保险服务", "31", "3,380", "审核中"],
];

export const adminUsers: TableRow[] = [
  ["张晓敏", "admin@example.com", "平台管理员", "启用", "平台"],
  ["陈经理", "broker-admin@example.com", "经纪公司管理员", "启用", "港华保险经纪"],
  ["李顾问", "broker-user@example.com", "经纪人", "停用", "湾区财富顾问"],
];

export const products: TableRow[] = [
  ["周大福人寿", "匠心飞越储蓄保险计划", "储蓄险", "启用", "v2604"],
  ["A公司", "尊尚医疗", "医疗险", "启用", "v2026.03"],
  ["B公司", "环球医疗", "医疗险", "启用", "v2026.02"],
];

export const auditDocuments: TableRow[] = [
  ["AIA_重疾险_产品小册子.pdf", "产品小册子", "v2026.03", "待审核"],
  ["重疾险销售培训.pptx", "内部培训", "v2026.01", "待审核"],
];

export const complianceStats = [
  { label: "敏感回答记录", value: "17" },
  { label: "高风险问题", value: "42" },
  { label: "无来源拦截", value: "23" },
  { label: "过期优惠引用", value: "6" },
];

export const complianceRows: TableRow[] = [
  ["收益类问题未充分引用", "PRODUCT_RETURN", "待复核", "11:24", "补充官方利益说明页码"],
  ["个性化建议倾向", "PERSONALIZED_ADVICE", "已拦截", "10:18", "返回需求澄清模板"],
  ["过期优惠引用", "PROMOTION", "已标记", "09:36", "前端显示“已过期”"],
];

export const faqDetails: Record<string, FaqItem> = {
  faq_1: {
    id: "faq_1",
    category: "冷静期",
    question: "香港保险冷静期是多久？",
    status: "ENABLED",
    sourcePage: 12,
    isHot: true,
    shortAnswer: "冷静期需以具体产品官方条款和计划书为准，不同保险公司与产品可能存在差异。",
    details:
      "FAQ 详情页也必须展示来源文件、来源等级、页码、版本号、发布日期和生效日期，确保客户可以追溯依据。",
    caution: "若涉及已生效保单，请以保险公司最新官方文件及持牌顾问说明为准。",
    relatedQuestions: ["退保流程怎么理解？", "保单贷款会影响冷静期吗？"],
    sourceFile: "官方条款摘要_冷静期说明.pdf",
  },
};

export const promotionDetails: Record<string, PromotionItem> = {
  promo_1: {
    id: "promo_1",
    name: "投保礼遇",
    product: "匠心飞越储蓄保险计划",
    insuranceCompany: "周大福人寿",
    status: "ACTIVE",
    startDate: "2026-04-15",
    endDate: "2026-06-30",
    applicableCondition: "适用于指定缴费期及指定保费门槛。",
    exclusionCondition: "不适用于补发申请、逾期保费折扣及未通过审核的计划书。",
    sourceFile: "投保礼遇通告_2026Q2.pdf",
    reviewStatus: "APPROVED",
    frontendVisible: true,
  },
};

export const documentDetails = {
  doc_1: {
    id: "doc_1",
    fileName: "AIA_重疾险_产品小册子.pdf",
    status: "ENABLED",
    sourceLevel: "L2_OFFICIAL_BROCHURE",
    language: "繁体中文 / 简体中文",
    version: "v2026.03",
    publishDate: "2026-03-01",
    effectiveDate: "2026-03-15",
    expiryDate: "",
    frontendCitable: true,
    isPublic: true,
    reviewComment: "资料清晰，可进入公共知识库。需确认页码引用是否完整。",
    parseStatus: "PARSED",
    vectorStatus: "READY",
    productName: "A公司 重疾计划",
    uploadedBy: "港华保险经纪",
  },
};

export const ruleGroups: AgentRuleGroup[] = [
  {
    id: "system_prompt",
    title: "系统提示词",
    description: "限定回答边界、知识来源与产品对比原则。",
    rules: ["所有答案强制显示来源页码", "个性化投保建议：不直接回答", "法律/税务/医疗判断：不下结论"],
  },
  {
    id: "risk_control",
    title: "高风险规则",
    description: "控制收益类问题、过期优惠和内部培训资料引用。",
    rules: ["产品收益：必须引用官方文件", "过期优惠：必须标记已过期", "内部培训：需提示以官方为准"],
  },
  {
    id: "citation",
    title: "引用展示规则",
    description: "统一来源字段、页码和版本展示结构。",
    rules: ["引用卡需显示文件名、来源等级、页码、版本号", "没有 citations 不返回实质答案", "产品对比每项字段都要来源"],
  },
];
