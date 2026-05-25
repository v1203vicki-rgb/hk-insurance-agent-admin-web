import {
  mockAuditLogs,
  mockChatSessions,
  mockCompliance,
  mockDocuments,
  mockFaqs,
  mockInsuranceCompanies,
  mockProductVersions,
  mockProducts,
  mockPromotions,
  mockTenants,
  mockUsers,
} from "@/src/data";

export type TableRow = string[];

const tenantStatusLabelMap = {
  ENABLED: "启用",
  PENDING_REVIEW: "审核中",
  DISABLED: "禁用",
} as const;

const userStatusLabelMap = {
  ENABLED: "启用",
  DISABLED: "禁用",
} as const;

const userRoleLabelMap = {
  PLATFORM_ADMIN: "平台管理员",
  BROKER_ADMIN: "经纪公司管理员",
  BROKER_USER: "经纪人",
} as const;

const reviewStatusLabelMap = {
  PENDING_REVIEW: "待审核",
  APPROVED: "已通过",
  REJECTED: "已驳回",
  DISABLED: "禁用",
  ARCHIVED: "已归档",
  EXPIRED: "已过期",
} as const;

const parseStatusLabelMap = {
  PENDING_PARSE: "待解析",
  PARSED: "解析成功",
  PARSE_FAILED: "解析失败",
} as const;

const vectorStatusLabelMap = {
  PENDING: "待向量化",
  READY: "已向量化",
  FAILED: "向量失败",
} as const;

const fileTypeLabelMap: Record<string, string> = {
  POLICY_TERMS: "产品条款",
  PRODUCT_BROCHURE: "产品小册子",
  PROMOTION_NOTICE: "优惠政策",
  TRAINING_MATERIAL: "内部培训",
};

const productTypeLabelMap: Record<string, string> = {
  CRITICAL_ILLNESS: "重疾险",
  MEDICAL: "医疗险",
  SAVINGS: "储蓄险 / 分红险",
};

const companyNameById: Record<string, string> = {
  company_1: "A公司",
  company_2: "B公司",
  company_3: "周大福人寿",
};

const productNameById: Record<string, string> = {
  product_1: "A公司 重疾计划",
  product_2: "尊尚医疗",
  product_3: "环球医疗",
  product_4: "匠心飞越储蓄保险计划",
};

const documentNameById: Record<string, string> = {
  doc_1: "A公司重疾计划条款.pdf",
  doc_1_old: "A公司重疾计划条款_旧版.pdf",
  doc_2: "A公司高端医疗条款.pdf",
  doc_3: "B公司医疗险小册子.pdf",
  doc_4: "匠心飞越产品小册子.pdf",
  doc_5: "B公司优惠通告.pdf",
  doc_6: "重疾险销售培训.pptx",
};

const sessionTitleById: Record<string, string> = {
  session_1: "香港重疾险和内地重疾险有什么区别？",
  session_2: "A公司和B公司的医疗险哪个更适合我？",
  session_3: "这个储蓄险第几年回本？",
};

const sessionCategoryById: Record<string, string> = {
  session_1: "重疾险",
  session_2: "产品对比",
  session_3: "储蓄险 / 分红险",
};

const sessionRiskLabelById: Record<string, string> = {
  session_1: "低",
  session_2: "中：个性化倾向",
  session_3: "高：收益类",
};

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

export const platformDocuments: TableRow[] = mockDocuments.map((document) => [
  documentNameById[document.id] ?? document.fileName,
  document.sourceCompanyName || "平台上传",
  document.sourceLevel.replace(" 官方", "").replace("官方", "L"),
  reviewStatusLabelMap[document.reviewStatus],
  document.reviewStatus === "PENDING_REVIEW" ? "审核" : "查看",
]);

export const brokerDocuments: TableRow[] = mockDocuments
  .filter((document) => document.tenantId === "tenant_1")
  .map((document) => [
    documentNameById[document.id] ?? document.fileName,
    fileTypeLabelMap[document.fileType] ?? document.fileType,
    document.version,
    reviewStatusLabelMap[document.reviewStatus],
  ]);

export const adminChatSessions: TableRow[] = mockChatSessions.map((session) => [
  sessionTitleById[session.id] ?? "咨询记录",
  sessionCategoryById[session.id] ?? "问答",
  `${session.citationIds.length}个来源`,
  sessionRiskLabelById[session.id] ?? session.riskType,
  session.createdAt.slice(11, 16),
]);

export const brokerChatSessions: TableRow[] = mockChatSessions
  .filter((session) => session.tenantId === "tenant_1")
  .map((session) => [
    sessionTitleById[session.id] ?? "咨询记录",
    sessionCategoryById[session.id] ?? "问答",
    `${session.citationIds.length}个来源`,
    sessionRiskLabelById[session.id] ?? session.riskType,
    session.createdAt.slice(11, 16),
  ]);

export const brokerUsers: TableRow[] = mockUsers
  .filter((user) => user.tenantId === "tenant_1" && user.role !== "BROKER_ADMIN")
  .map((user) => [user.name, user.email, userStatusLabelMap[user.status], String(user.askCount), "医疗险 / 储蓄险"]);

export const tenants: TableRow[] = mockTenants.map((tenant) => [
  tenant.name,
  String(tenant.brokerUserCount),
  String(tenant.askCount),
  tenantStatusLabelMap[tenant.status],
]);

export const adminUsers: TableRow[] = mockUsers.map((user) => [
  user.name,
  user.email,
  userRoleLabelMap[user.role],
  userStatusLabelMap[user.status],
  user.tenantId ? mockTenants.find((tenant) => tenant.id === user.tenantId)?.name ?? "-" : "平台",
]);

export const products: TableRow[] = mockProducts.map((product) => [
  companyNameById[product.insuranceCompanyId] ?? product.insuranceCompanyId,
  productNameById[product.id] ?? product.nameZhHans,
  productTypeLabelMap[product.productType] ?? product.productType,
  product.status === "ENABLED" ? "启用" : "禁用",
  mockProductVersions.find((version) => version.id === product.activeVersionId)?.version ?? "-",
]);

export const auditDocuments: TableRow[] = mockDocuments
  .filter((document) => document.reviewStatus === "PENDING_REVIEW")
  .map((document) => [
    documentNameById[document.id] ?? document.fileName,
    fileTypeLabelMap[document.fileType] ?? document.fileType,
    document.version,
    reviewStatusLabelMap[document.reviewStatus],
  ]);

export const complianceStats = [
  { label: "敏感回答记录", value: "17" },
  { label: "高风险问题", value: "42" },
  { label: "无来源拦截", value: "23" },
  { label: "过期优惠引用", value: "6" },
];

export const complianceRows: TableRow[] = mockCompliance.map((record, index) => [
  `合规记录 ${index + 1}`,
  record.riskType,
  record.status === "APPROVED" ? "通过" : record.status === "PENDING_REVIEW" ? "待复核" : "误判",
  record.createdAt,
  record.suggestion === "ADD_RULE" ? "加入禁答规则" : record.suggestion === "ADD_FAQ" ? "补充 FAQ" : record.suggestion === "ADD_DOCUMENT" ? "补充知识库" : "仅记录",
]);

export const faqDetails = Object.fromEntries(
  mockFaqs.map((faq) => [
    faq.id,
    {
      id: faq.id,
      category: faq.category,
      question: faq.questionZhHans,
      status: faq.status === "ENABLED" ? "启用" : "禁用",
      sourcePage: faq.sourcePage,
      isHot: faq.isHot,
      shortAnswer: faq.answerZhHans,
      details: faq.answerZhHans,
      caution: "FAQ 详情也必须展示来源文件和页码。",
      relatedQuestions: ["查看同类 FAQ", "进入智能问答继续提问"],
      sourceFile: documentNameById[faq.sourceDocumentId] ?? faq.sourceDocumentId,
    },
  ]),
);

export const promotionDetails = Object.fromEntries(
  mockPromotions.map((promotion) => [
    promotion.id,
    {
      id: promotion.id,
      name: promotion.nameZhHans,
      product: productNameById[promotion.productId] ?? promotion.productId,
      insuranceCompany: companyNameById[promotion.insuranceCompanyId] ?? promotion.insuranceCompanyId,
      status: promotion.status === "ACTIVE" ? "生效中" : promotion.status === "EXPIRED" ? "已过期" : promotion.status === "PENDING_REVIEW" ? "待审核" : "已驳回",
      startDate: promotion.startDate,
      endDate: promotion.endDate,
      applicableCondition: promotion.applicableCondition,
      exclusionCondition: promotion.exclusionCondition,
      sourceFile: documentNameById[promotion.sourceDocumentId] ?? promotion.sourceDocumentId,
      reviewStatus: promotion.status === "ACTIVE" ? "已通过" : promotion.status === "PENDING_REVIEW" ? "待审核" : "已过期",
      frontendVisible: promotion.isFrontendVisible,
    },
  ]),
);

export const documentDetails = Object.fromEntries(
  mockDocuments.map((document) => [
    document.id,
    {
      id: document.id,
      fileName: documentNameById[document.id] ?? document.fileName,
      status: reviewStatusLabelMap[document.reviewStatus],
      sourceLevel: document.sourceLevel,
      language: document.language,
      version: document.version,
      publishDate: document.publishDate,
      effectiveDate: document.effectiveDate,
      expiryDate: document.expiryDate ?? "",
      frontendCitable: document.isFrontendCitable,
      isPublic: document.isPublic,
      reviewComment: document.reviewComment ?? "",
      parseStatus: parseStatusLabelMap[document.parseStatus],
      vectorStatus: vectorStatusLabelMap[document.vectorStatus],
      productName: productNameById[document.productId ?? ""] ?? "-",
      uploadedBy: document.sourceCompanyName || "平台上传",
    },
  ]),
);

export const searchCollections = {
  companies: mockInsuranceCompanies,
  products: mockProducts,
  documents: mockDocuments,
  tenants: mockTenants,
  users: mockUsers,
  promotions: mockPromotions,
  faqs: mockFaqs,
  sessions: mockChatSessions,
  compliance: mockCompliance,
  auditLogs: mockAuditLogs,
};

export const ruleGroups = [
  {
    id: "system_prompt",
    title: "系统提示词",
    description: "限定回答边界、知识来源与产品对比原则。",
    rules: [
      "所有答案必须显示来源页码",
      "个性化投保建议不直接回答",
      "法律/税务/医疗判断不直接下结论",
    ],
  },
  {
    id: "risk_control",
    title: "高风险规则",
    description: "控制收益类问题、过期优惠和内部培训资料引用。",
    rules: [
      "产品收益必须引用官方文件",
      "过期优惠必须明确标记已过期",
      "内部培训资料必须提示以官方条款为准",
    ],
  },
  {
    id: "citation",
    title: "引用展示规则",
    description: "统一来源卡片的字段和结构。",
    rules: [
      "引用卡片必须显示文件名称、来源等级、页码、版本号",
      "无 citations 时不返回实质性答案",
      "产品对比每个字段均需来源",
    ],
  },
];
