import { notFound } from "next/navigation";
import { ChatSessionDetailClient } from "../../../../components/chat-session-detail-client";
import { getAdminChatSessionDetail, type ChatSessionDetailResponse } from "../../../../lib/api";

const fallbackDetails: Record<string, ChatSessionDetailResponse> = {
  session_1: {
    id: "session_1",
    question: "香港重疾险和内地重疾险有什么区别？",
    riskType: "NORMAL",
    language: "ZH_HANS",
    source: "MINI_PROGRAM",
    createdAt: "2026-05-25 10:24",
    expiresAt: "2026-11-25 10:24",
    messages: [
      { role: "USER", content: "香港重疾险和内地重疾险有什么区别？" },
      { role: "ASSISTANT", content: "以下说明基于已启用资料整理，重点从监管、条款定义和等待期角度做客观说明。" },
    ],
    citations: [{ fileName: "A公司重疾计划条款.pdf", sourceLevel: "L1 官方条款", pageNumber: 12, version: "v2026.03" }],
    riskHandlingRecords: [{ time: "2026-05-25 10:26", action: "系统判定", result: "低风险" }],
  },
  session_2: {
    id: "session_2",
    question: "A公司和B公司的医疗险哪个更适合我？",
    riskType: "PERSONALIZED_ADVICE",
    language: "ZH_HANS",
    source: "MINI_PROGRAM",
    createdAt: "2026-05-25 11:02",
    expiresAt: "2026-11-25 11:02",
    messages: [
      { role: "USER", content: "A公司和B公司的医疗险哪个更适合我？" },
      { role: "ASSISTANT", content: "我可以说明资料差异和一般适用场景，但不能基于个人情况作出购买建议。" },
    ],
    citations: [
      { fileName: "A公司高端医疗条款.pdf", sourceLevel: "L1 官方条款", pageNumber: 12, version: "v2026.03" },
      { fileName: "B公司医疗险小册子.pdf", sourceLevel: "L2 官方小册子", pageNumber: 8, version: "v2026.02" },
    ],
    riskHandlingRecords: [{ time: "2026-05-25 11:05", action: "人工复核", result: "保留提示" }],
  },
  session_3: {
    id: "session_3",
    question: "这个储蓄险第几年回本？",
    riskType: "BENEFIT_OR_RETURN",
    language: "ZH_HANS",
    source: "MINI_PROGRAM",
    createdAt: "2026-05-25 11:33",
    expiresAt: "2026-11-25 11:33",
    messages: [
      { role: "USER", content: "这个储蓄险第几年回本？" },
      { role: "ASSISTANT", content: "收益/回本类问题必须引用官方文件；当前仅能确认包含非保证利益，不能据此推断具体回本年期。" },
    ],
    citations: [{ fileName: "匠心飞越产品小册子.pdf", sourceLevel: "L2 官方小册子", pageNumber: 14, version: "v2604" }],
    riskHandlingRecords: [{ time: "2026-05-25 11:35", action: "系统判定", result: "高风险" }],
  },
};

export default async function ChatSessionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let detail = fallbackDetails[id];
  if (!detail) notFound();

  try {
    detail = await getAdminChatSessionDetail(id);
  } catch {
    // 演示模式沿用本地详情。
  }

  return <ChatSessionDetailClient initialDetail={detail} />;
}
