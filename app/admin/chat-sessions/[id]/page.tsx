import { ChatSessionDetailClient } from "../../../../components/chat-session-detail-client";
import { getAdminChatSessionDetail, type ChatSessionDetailResponse } from "../../../../lib/api";

export default async function ChatSessionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let detail: ChatSessionDetailResponse = {
    id,
    question: "香港保险冷静期是多久？",
    riskType: "NORMAL",
    language: "ZH_HANS",
    source: "MINI_PROGRAM",
    createdAt: "2026-05-20 14:03",
    expiresAt: "2026-11-20",
    messages: [
      { role: "USER", content: "香港保险冷静期是多久？" },
      { role: "ASSISTANT", content: "根据已启用资料，冷静期安排需以对应产品文件为准。" },
    ],
    citations: [
      {
        fileName: "匠心飞越储蓄保险计划产品小册子_v2604（繁中）.pdf",
        sourceLevel: "L2_OFFICIAL_BROCHURE",
        pageNumber: 8,
        version: "2604",
      },
    ],
    riskHandlingRecords: [
      {
        time: "2026-05-20 14:03",
        action: "自动风险识别",
        result: "识别为 NORMAL，允许标准回答流程。",
      },
    ],
  };

  try {
    detail = await getAdminChatSessionDetail(id);
  } catch {
    // Fall back to local detail.
  }

  return <ChatSessionDetailClient initialDetail={detail} />;
}
