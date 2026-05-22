const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL?.trim() ?? "";
export const hasRemoteApiConfigured = API_BASE_URL.length > 0;

export type LoginResponse = {
  token: string;
  user: {
    id: string;
    email: string;
    role: string;
    tenantId: string | null;
  };
};

export type AnalyticsResponse = {
  tenantCount?: number;
  publicDocumentCount?: number;
  pendingReviewCount?: number;
  riskAnswerCount?: number;
  expiredPromotionCount?: number;
  askCount: number;
  compareCount: number;
  unansweredCount: number;
  citationCoverage?: number;
  hotTopics?: string[];
};

export type TenantItem = {
  id: string;
  name: string;
  status: string;
  brokerUserCount?: number;
  documentCount?: number;
  askCount?: number;
};

export type UserItem = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  tenantName?: string;
};

export type DocumentListItem = {
  id: string;
  fileName: string;
  sourceLevel?: string;
  status: string;
  language?: string;
  version?: string;
  publishDate?: string;
  reviewComment?: string;
  isEnabled?: boolean;
  isExpired?: boolean;
  suggestedAction?: string;
  reviewResult?: string;
};

export type DocumentListResponse = {
  items: DocumentListItem[];
};

export type DocumentDetail = {
  id: string;
  fileName: string;
  status: string;
  sourceLevel: string;
  language: string;
  version: string;
  publishDate: string;
  effectiveDate: string;
  expiryDate: string;
  frontendCitable: boolean;
  isPublic: boolean;
  reviewComment: string;
  parseStatus: string;
  vectorStatus: string;
  productName: string;
  uploadedBy: string;
};

export type ProductItem = {
  id: string;
  insuranceCompany: string;
  name: string;
  productType: string;
  status: string;
  activeVersion: string;
};

export type PromotionItem = {
  id: string;
  name: string;
  product: string;
  insuranceCompany?: string;
  status: string;
  startDate: string;
  endDate: string;
  applicableCondition?: string;
  exclusionCondition?: string;
  sourceFile?: string;
  reviewStatus?: string;
  frontendVisible?: boolean;
};

export type FaqItem = {
  id: string;
  category: string;
  question: string;
  status: string;
  sourcePage?: number;
  isHot?: boolean;
  shortAnswer?: string;
  details?: string;
  caution?: string;
  relatedQuestions?: string[];
  sourceFile?: string;
};

export type AuditLogItem = {
  time: string;
  user: string;
  action: string;
  targetType: string;
  result: string;
};

export type ChatSessionItem = {
  id: string;
  question: string;
  riskType: string;
  citationCount: number;
  language?: string;
  exportMode?: string;
  createdAt?: string;
  expiresAt?: string;
};

export type ComplianceResponse = {
  stats: Array<{
    label: string;
    value: number;
  }>;
  records: Array<{
    type: string;
    count: number;
    latestAt: string;
    status: string;
    note: string;
  }>;
};

export type ChatSessionDetailResponse = {
  id: string;
  question: string;
  riskType: string;
  language: string;
  source: string;
  createdAt: string;
  expiresAt: string;
  messages: Array<{
    role: string;
    content: string;
  }>;
  citations: Array<{
    fileName: string;
    sourceLevel: string;
    pageNumber: number;
    version: string;
  }>;
  riskHandlingRecords?: Array<{
    time: string;
    action: string;
    result: string;
  }>;
};

export type ProductVersionItem = {
  id: string;
  version: string;
  publishDate: string;
  effectiveDate: string;
  expiryDate: string;
  status: string;
  documentCount: number;
};

export type AgentRuleGroup = {
  id: string;
  title: string;
  description: string;
  rules: string[];
};

export type MutationResult = {
  ok?: boolean;
  status?: string;
  action?: string;
  comment?: string;
  activeVersionId?: string;
  savedAt?: string;
  id?: string;
  received?: Record<string, unknown>;
  record?: {
    time: string;
    action: string;
    result: string;
  };
};

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  if (!hasRemoteApiConfigured) {
    throw new Error("API_BASE_URL_NOT_CONFIGURED");
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      "content-type": "application/json",
      ...(init?.headers ?? {}),
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export function login(email: string, password: string) {
  return request<LoginResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export function getCurrentUser() {
  return request<LoginResponse["user"]>("/auth/me");
}

export function getPlatformAnalytics() {
  return request<AnalyticsResponse>("/admin/analytics");
}

export function getBrokerAnalytics() {
  return request<AnalyticsResponse>("/broker/analytics");
}

export function getDocuments() {
  return request<DocumentListResponse>("/admin/documents");
}

export function getDocumentDetail(documentId: string) {
  return request<DocumentDetail>(`/admin/documents/${documentId}`);
}

export function reviewDocument(
  documentId: string,
  payload: { action: string; comment: string; status: string },
) {
  return request<MutationResult>(`/admin/documents/${documentId}/review`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function disableDocument(documentId: string) {
  return request<MutationResult>(`/admin/documents/${documentId}/disable`, {
    method: "POST",
  });
}

export function archiveDocument(documentId: string) {
  return request<MutationResult>(`/admin/documents/${documentId}/archive`, {
    method: "POST",
  });
}

export function getTenants() {
  return request<TenantItem[]>("/admin/tenants");
}

export function getUsers() {
  return request<UserItem[]>("/admin/users");
}

export function getAdminProducts() {
  return request<ProductItem[]>("/admin/products");
}

export function getProductVersions(productId: string) {
  return request<ProductVersionItem[]>(`/admin/products/${productId}/versions`);
}

export function setProductActiveVersion(productId: string, versionId: string) {
  return request<MutationResult>(`/admin/products/${productId}/active-version`, {
    method: "POST",
    body: JSON.stringify({ versionId }),
  });
}

export function getBrokerDocuments() {
  return request<DocumentListResponse>("/broker/documents");
}

export function getPromotions() {
  return request<PromotionItem[]>("/admin/promotions");
}

export function getPromotionDetail(id: string) {
  return request<PromotionItem>(`/admin/promotions/${id}`);
}

export function getFaqs() {
  return request<FaqItem[]>("/admin/faqs");
}

export function getFaqDetail(id: string) {
  return request<FaqItem>(`/admin/faqs/${id}`);
}

export function getAgentRules() {
  return request<string[]>("/admin/agent-rules");
}

export function getAgentRuleGroups() {
  return request<AgentRuleGroup[]>("/admin/agent-rules/groups");
}

export function updateAgentRuleGroup(
  id: string,
  payload: { title: string; description: string; rules: string[] },
) {
  return request<MutationResult>(`/admin/agent-rules/groups/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

export function getAuditLogs() {
  return request<AuditLogItem[]>("/admin/audit-logs");
}

export function getComplianceOverview() {
  return request<ComplianceResponse>("/admin/compliance");
}

export function getBrokerAuditLogs() {
  return request<AuditLogItem[]>("/broker/audit-logs");
}

export function getAdminChatSessions() {
  return request<ChatSessionItem[]>("/admin/chat-sessions");
}

export function getAdminChatSessionDetail(sessionId: string) {
  return request<ChatSessionDetailResponse>(`/admin/chat-sessions/${sessionId}`);
}

export function createAdminChatSessionAction(
  sessionId: string,
  payload: { action: string; note: string },
) {
  return request<MutationResult>(`/admin/chat-sessions/${sessionId}/actions`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function getBrokerChatSessions() {
  return request<ChatSessionItem[]>("/broker/chat-sessions");
}
