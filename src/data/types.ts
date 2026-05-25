export type Role = "PLATFORM_ADMIN" | "BROKER_ADMIN" | "BROKER_USER";

export type StatusTone =
  | "enabled"
  | "pending"
  | "expired"
  | "disabled"
  | "info"
  | "risk";

export type TenantStatus = "ENABLED" | "PENDING_REVIEW" | "DISABLED";
export type UserStatus = "ENABLED" | "DISABLED";
export type ReviewStatus = "PENDING_REVIEW" | "APPROVED" | "REJECTED" | "DISABLED" | "ARCHIVED" | "EXPIRED";
export type ParseStatus = "PENDING_PARSE" | "PARSED" | "PARSE_FAILED";
export type VectorStatus = "PENDING" | "READY" | "FAILED";

export type TenantRecord = {
  id: string;
  name: string;
  status: TenantStatus;
  contactName: string;
  contactEmail: string;
  brokerUserCount: number;
  documentCount: number;
  askCount: number;
  compareCount: number;
  hotTopics: string[];
  topProducts: string[];
};

export type UserRecord = {
  id: string;
  tenantId: null | string;
  name: string;
  email: string;
  role: Role;
  status: UserStatus;
  lastLoginAt: string;
  askCount: number;
};

export type InsuranceCompanyRecord = {
  id: string;
  nameZhHans: string;
  nameZhHant: string;
  region: string;
  status: "ENABLED" | "DISABLED";
};

export type ProductVersionRecord = {
  id: string;
  productId: string;
  version: string;
  publishDate: string;
  effectiveDate: string;
  expiryDate?: string;
  status: "CURRENT" | "HISTORY" | "DRAFT";
  documentIds: string[];
};

export type ProductRecord = {
  id: string;
  insuranceCompanyId: string;
  nameZhHans: string;
  nameZhHant: string;
  productType: string;
  status: "ENABLED" | "DISABLED";
  activeVersionId: string;
  keyFields: Array<{ label: string; value: string; citationId?: string }>;
  promotionIds: string[];
  askCount: number;
};

export type DocumentCitation = {
  id: string;
  fileName: string;
  sourceLevel: string;
  pageNumber: number;
  version: string;
  publishDate: string;
  effectiveDate: string;
  expiryDate?: string;
  quoteText: string;
  isTrainingMaterial?: boolean;
  isExpiredPromotion?: boolean;
};

export type DocumentChunkRecord = {
  id: string;
  documentId: string;
  chunkIndex: number;
  sectionTitle: string;
  pageNumber: number;
  chunkText: string;
};

export type ReviewTimelineRecord = {
  id: string;
  actor: string;
  action: string;
  time: string;
  comment: string;
};

export type DocumentRecord = {
  id: string;
  tenantId: null | string;
  uploadedByUserId: string;
  sourceCompanyName: string;
  fileName: string;
  fileType: string;
  sourceLevel: string;
  language: string;
  version: string;
  publishDate: string;
  effectiveDate: string;
  expiryDate?: string;
  promotionStartDate?: string;
  promotionEndDate?: string;
  reviewStatus: ReviewStatus;
  parseStatus: ParseStatus;
  vectorStatus: VectorStatus;
  isPublic: boolean;
  isFrontendCitable: boolean;
  isCurrentVersion: boolean;
  productId?: string;
  productVersionId?: string;
  isTrainingMaterial?: boolean;
  isPromotionPolicy?: boolean;
  reviewComment?: string;
  auditTimeline: ReviewTimelineRecord[];
  chunkIds: string[];
  citationsPreview: DocumentCitation[];
};

export type PromotionRecord = {
  id: string;
  nameZhHans: string;
  insuranceCompanyId: string;
  productId: string;
  startDate: string;
  endDate: string;
  applicableCondition: string;
  exclusionCondition: string;
  sourceDocumentId: string;
  sourcePage: number;
  isFrontendVisible: boolean;
  status: "ACTIVE" | "EXPIRED" | "PENDING_REVIEW" | "REJECTED";
};

export type FaqRecord = {
  id: string;
  category: string;
  isHot: boolean;
  questionZhHans: string;
  answerZhHans: string;
  questionZhHant: string;
  answerZhHant: string;
  sourceDocumentId: string;
  sourcePage: number;
  sourceLevel: string;
  version: string;
  publishDate: string;
  effectiveDate: string;
  status: "ENABLED" | "DISABLED";
};

export type SessionMessage = {
  id: string;
  role: "USER" | "ASSISTANT" | "SYSTEM";
  content: string;
  structuredAnswer?: {
    shortConclusion: string;
    details: string[];
    comparisonTable?: Array<{
      dimension: string;
      left: string;
      right: string;
    }>;
    scenarios: string[];
    cautions: string[];
    riskNotice?: string;
  };
  citationIds?: string[];
  riskType?: string;
};

export type UploadRecord = {
  id: string;
  fileName: string;
  fileType: string;
  status: string;
  expiresAt: string;
};

export type ChatSessionRecord = {
  id: string;
  tenantId: string;
  tenantName: string;
  clientAnonymousId: string;
  language: "ZH_HANS" | "ZH_HANT";
  source: "MINI_PROGRAM" | "ADMIN_TEST";
  createdAt: string;
  expiresAt: string;
  category: string;
  riskType: string;
  citationIds: string[];
  messages: SessionMessage[];
  uploads: UploadRecord[];
  riskHandlingRecords: Array<{
    time: string;
    action: string;
    result: string;
    note: string;
  }>;
};

export type ComplianceRecord = {
  id: string;
  question: string;
  answer: string;
  riskType: string;
  ruleHits: string[];
  citationIds: string[];
  hasOfficialSource: boolean;
  hasExpiredPromotion: boolean;
  hasTrainingMaterial: boolean;
  status: "APPROVED" | "PENDING_REVIEW" | "FALSE_POSITIVE";
  suggestion: "ADD_RULE" | "ADD_FAQ" | "ADD_DOCUMENT" | "NONE";
  createdAt: string;
};

export type AuditLogRecord = {
  id: string;
  time: string;
  actor: string;
  role: Role;
  tenantId: null | string;
  tenantName?: string;
  action: string;
  targetType: string;
  targetName: string;
  result: string;
};

