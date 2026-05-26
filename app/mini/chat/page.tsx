"use client";

import Link from "next/link";
import { Suspense, type ReactNode, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CitationCard, MiniCard, MiniShell } from "../../../components/mini-shell";
import { useMiniLocale } from "../../../components/mini-locale";
import {
  type MiniCitation,
  type MiniSession,
  getMiniCitation,
  getMiniProduct,
  getMiniSession,
  miniFallbackStates,
  miniHistorySessions,
  miniKnowledgeItems,
  miniQuickPromptTemplates,
  miniUploadGuides,
} from "@/src/data";
import { generateClientFriendlyAnswer } from "../../../lib/generate-client-friendly-answer";

type AttachmentItem = {
  id: string;
  fileName: string;
  status: string;
  expiresText: string;
};

type StructuredAnswer = NonNullable<MiniSession["messages"][number]["structuredAnswer"]>;

export default function MiniChatPage() {
  return (
    <Suspense fallback={<MiniChatPageFallback />}>
      <MiniChatPageClient />
    </Suspense>
  );
}

function MiniChatPageClient() {
  const searchParams = useSearchParams();
  const { t, locale } = useMiniLocale();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [input, setInput] = useState("");
  const [toast, setToast] = useState("");
  const [attachments, setAttachments] = useState<AttachmentItem[]>([]);
  const [activeSessionId, setActiveSessionId] = useState("session_2");
  const productId = searchParams.get("productId");
  const queryQuestion = searchParams.get("question");
  const knowledgeId = searchParams.get("knowledgeId");
  const sessionId = searchParams.get("sessionId");

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 1800);
    return () => window.clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    if (sessionId) {
      setActiveSessionId(sessionId);
      return;
    }
    if (!queryQuestion) return;
    setInput(queryQuestion);
    const matched =
      miniHistorySessions.find((session) => session.title.zhHans === queryQuestion) ??
      miniHistorySessions.find((session) => queryQuestion.includes(session.title.zhHans.slice(0, 4)));
    if (matched) setActiveSessionId(matched.id);
  }, [queryQuestion]);

  const currentProduct = productId ? getMiniProduct(productId) : undefined;
  const activeSession = getMiniSession(activeSessionId) ?? getMiniSession("session_2")!;
  const knowledgeItem = knowledgeId ? miniKnowledgeItems.find((item) => item.id === knowledgeId) : undefined;

  const derivedAnswer: { structuredAnswer: StructuredAnswer; citations: string[] } | null = knowledgeItem
    ? {
        structuredAnswer: {
          shortConclusion: knowledgeItem.answer,
          details: [knowledgeItem.answer],
          scenarios: [{ zhHans: "适合先作为经纪人快速解释口径。", zhHant: "適合作為經紀人快速解釋口徑。" }],
          cautions: [knowledgeItem.caution],
          followUps: [
            { zhHans: "和其他产品有什么区别？", zhHant: "和其他產品有什麼區別？" },
            { zhHans: "有哪些注意事项？", zhHant: "有哪些注意事項？" },
            { zhHans: "可以生成客户版说明吗？", zhHant: "可以生成客戶版說明嗎？" },
          ],
        },
        citations: knowledgeItem.citationIds,
      }
    : null;

  const productDerivedAnswer: { structuredAnswer: StructuredAnswer; citations: string[] } | null =
    !knowledgeItem && currentProduct
      ? {
          structuredAnswer: {
            shortConclusion: { zhHans: `以下为 ${t(currentProduct.name)} 的资料摘要，方便经纪人快速查条款。`, zhHant: `以下為 ${t(currentProduct.name)} 的資料摘要，方便經紀人快速查條款。` },
            details: [currentProduct.summary],
            scenarios: [{ zhHans: "适合用于查冷静期、等待期、优惠和保单贷款。", zhHant: "適合用於查冷靜期、等待期、優惠和保單貸款。" }],
            cautions: [{ zhHans: "仅作资料解释，不构成推荐或购买建议。", zhHant: "僅作資料解釋，不構成推薦或購買建議。" }],
            followUps: [
              { zhHans: "该产品冷静期多久？", zhHant: "該產品冷靜期多久？" },
              { zhHans: "当前优惠是否有效？", zhHant: "當前優惠是否有效？" },
              { zhHans: "可以生成客户版说明吗？", zhHant: "可以生成客戶版說明嗎？" },
            ],
          },
          citations: currentProduct.versions[0] ? Object.values(currentProduct.versions[0].compareFields).slice(0, 3).map((item) => item.citationId) : [],
        }
      : null;

  const assistantMessage = [...activeSession.messages].reverse().find((message) => message.role === "ASSISTANT");
  const answer = derivedAnswer?.structuredAnswer ?? productDerivedAnswer?.structuredAnswer ?? assistantMessage?.structuredAnswer;
  const citations = (derivedAnswer?.citations ?? productDerivedAnswer?.citations ?? assistantMessage?.citations ?? [])
    .map((item) => getMiniCitation(item))
    .filter(Boolean) as MiniCitation[];

  const trustSummary = useMemo(() => {
    const hasOfficialTerms = citations.some((item) => item.sourceLevel === "L1");
    const hasLatest = citations.some((item) => item.version.includes("2026") || item.version.includes("2604"));
    const hasTraining = citations.some((item) => item.isTrainingMaterial);
    return {
      hasOfficialTerms,
      hasLatest,
      hasTraining,
      sourceCount: citations.length,
    };
  }, [citations]);

  const customerAnswer = answer ? generateClientFriendlyAnswer(answer, locale) : "";

  const copyText = async (text: string, successText: string) => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setToast(successText);
    } catch {
      setToast(t({ zhHans: "复制失败，请手动复制", zhHant: "複製失敗，請手動複製" }));
    }
  };

  const fullAnswerText = answer
    ? [
        t(answer.shortConclusion),
        ...answer.details.map((item) => `- ${t(item)}`),
        ...answer.cautions.map((item) => `注意：${t(item)}`),
      ].join("\n")
    : "";

  const quickPrompts = miniQuickPromptTemplates.map((item) => ({
    ...item,
    text: t(item.label),
  }));

  const attachDemoFile = (fileName: string, status: string) => {
    setAttachments((prev) => [
      ...prev,
      {
        id: `${prev.length + 1}`,
        fileName,
        status,
        expiresText: t({ zhHans: "文件将在 1 个月后删除", zhHant: "文件將在 1 個月後刪除" }),
      },
    ]);
    setDrawerOpen(false);
    setToast(t({ zhHans: "附件已加入当前问答", zhHant: "附件已加入當前問答" }));
  };

  return (
    <MiniShell
      title={{ zhHans: "香港保险知识助手", zhHant: "香港保險知識助手" }}
      subtitle={{ zhHans: "经纪人移动端知识问答", zhHant: "經紀人移動端知識問答" }}
      activeTab="chat"
      action={
        <Link href="/mini/settings" style={settingsButtonStyle}>
          {t({ zhHans: "设置", zhHant: "設置" })}
        </Link>
      }
    >
      {toast ? <Toast text={toast} /> : null}

      <MiniCard>
        <div style={{ display: "grid", gap: 12 }}>
          <div style={inputShellStyle}>
            {currentProduct ? (
              <div style={contextPillStyle}>
                {t({ zhHans: `当前上下文：${t(currentProduct.name)}`, zhHant: `當前上下文：${t(currentProduct.name)}` })}
              </div>
            ) : null}
            {attachments.length ? (
              <div style={{ display: "grid", gap: 10 }}>
                {attachments.map((attachment) => (
                  <div key={attachment.id} style={attachmentCardStyle}>
                    <div>
                      <strong style={{ color: "#16223b", display: "block" }}>{attachment.fileName}</strong>
                      <span style={{ color: "#6d7f9c", fontSize: 12 }}>{attachment.status}</span>
                      <span style={{ display: "block", color: "#90a1ba", fontSize: 12, marginTop: 4 }}>{attachment.expiresText}</span>
                    </div>
                    <button onClick={() => setAttachments((prev) => prev.filter((item) => item.id !== attachment.id))} style={deleteAttachmentStyle}>
                      {t({ zhHans: "删除附件", zhHant: "刪除附件" })}
                    </button>
                  </div>
                ))}
              </div>
            ) : null}
            <textarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder={t({ zhHans: "输入保险问题，例如：A产品冷静期多久？", zhHant: "輸入保險問題，例如：A產品冷靜期多久？" })}
              style={textareaStyle}
            />
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setDrawerOpen(true)} style={secondaryActionStyle}>
                {t({ zhHans: "附件", zhHant: "附件" })}
              </button>
              <button
                onClick={() => {
                  const matched =
                    miniQuickPromptTemplates.find((item) => item.question === input) ??
                    miniQuickPromptTemplates.find((item) => input.includes(item.question.slice(0, 4)));
                  if (matched?.targetSessionId) setActiveSessionId(matched.targetSessionId);
                  setToast(t({ zhHans: "已生成演示回答", zhHant: "已生成演示回答" }));
                }}
                style={primaryActionStyle}
              >
                {t({ zhHans: "发送", zhHant: "發送" })}
              </button>
            </div>
          </div>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {quickPrompts.map((prompt) => (
              <button
                key={prompt.id}
                onClick={() => {
                  setInput(prompt.question);
                  if (prompt.targetSessionId) setActiveSessionId(prompt.targetSessionId);
                }}
                style={promptChipStyle}
              >
                {prompt.text}
              </button>
            ))}
          </div>
        </div>
      </MiniCard>

      <MiniCard>
        <div style={{ display: "grid", gap: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
            <div>
              <div style={{ color: "#16223b", fontSize: 18, fontWeight: 800 }}>{t({ zhHans: "回答卡片", zhHant: "回答卡片" })}</div>
              <div style={{ marginTop: 6, color: "#6d7f9c", fontSize: 12 }}>
                {trustSummary.sourceCount > 0
                  ? t({ zhHans: `已找到 ${trustSummary.sourceCount} 个来源`, zhHant: `已找到 ${trustSummary.sourceCount} 個來源` })
                  : t({ zhHans: "未找到足够依据", zhHant: "未找到足夠依據" })}
              </div>
            </div>
            <span style={trustBadgeStyle}>{trustSummary.hasOfficialTerms ? t({ zhHans: "含官方条款", zhHant: "含官方條款" }) : t({ zhHans: "来源一般", zhHant: "來源一般" })}</span>
          </div>

          {trustSummary.hasLatest ? <div style={hintGoodStyle}>{t({ zhHans: "含最新版本", zhHant: "含最新版本" })}</div> : null}
          {trustSummary.hasTraining ? <div style={hintWarnStyle}>{t({ zhHans: "含内部培训资料，需以官方文件为准", zhHant: "含內部培訓資料，需以官方文件為準" })}</div> : null}

          {answer ? (
            <>
              <Section title={t({ zhHans: "简短结论", zhHant: "簡短結論" })}>
                <p style={bodyTextStyle}>{t(answer.shortConclusion)}</p>
              </Section>

              <Section title={t({ zhHans: "重点说明", zhHant: "重點說明" })}>
                <ul style={listStyle}>
                  {answer.details.map((item) => (
                    <li key={item.zhHans}>{t(item)}</li>
                  ))}
                </ul>
              </Section>

                    {answer.comparisonTable?.length ? (
                <Section title={t({ zhHans: "对比表", zhHant: "對比表" })}>
                  <div style={{ display: "grid", gap: 8 }}>
                    {answer.comparisonTable.map((row: NonNullable<StructuredAnswer["comparisonTable"]>[number]) => (
                      <div key={row.dimension.zhHans} style={comparisonRowStyle}>
                        <div style={{ color: "#16223b", fontWeight: 700 }}>{t(row.dimension)}</div>
                        <div style={{ color: "#5f7390", fontSize: 13 }}>{row.left}</div>
                        <div style={{ color: "#5f7390", fontSize: 13 }}>{row.right}</div>
                      </div>
                    ))}
                  </div>
                </Section>
              ) : null}

              <Section title={t({ zhHans: "注意事项", zhHant: "注意事項" })}>
                <ul style={listStyle}>
                  {answer.cautions.map((item) => (
                    <li key={item.zhHans}>{t(item)}</li>
                  ))}
                </ul>
              </Section>

              {answer.riskNotice ? (
                <div style={hintWarnStyle}>{t(answer.riskNotice)}</div>
              ) : null}

              <Section title={t({ zhHans: "引用来源", zhHant: "引用來源" })}>
                <div style={{ display: "grid", gap: 12 }}>
                  {citations.map((citation) => (
                    <CitationCard key={citation.id} href={`/mini/citation/${citation.id}`} citation={citation} />
                  ))}
                </div>
              </Section>

              <Section title={t({ zhHans: "追问建议", zhHant: "追問建議" })}>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {(answer.followUps ?? []).map((item) => (
                    <button key={item.zhHans} onClick={() => setInput(t(item))} style={followUpButtonStyle}>
                      {t(item)}
                    </button>
                  ))}
                </div>
              </Section>
            </>
          ) : null}

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 8 }}>
            <button onClick={() => copyText(fullAnswerText, t({ zhHans: "已复制完整回答", zhHant: "已複製完整回答" }))} style={secondaryActionStyle}>
              {t({ zhHans: "复制完整回答", zhHant: "複製完整回答" })}
            </button>
            <button onClick={() => copyText(customerAnswer, t({ zhHans: "已复制客户版回答", zhHant: "已複製客戶版回答" }))} style={primaryActionStyle}>
              {t({ zhHans: "复制客户版回答", zhHant: "複製客戶版回答" })}
            </button>
            <Link href={citations[0] ? `/mini/citation/${citations[0].id}` : "/mini/settings"} style={linkButtonStyle}>
              {t({ zhHans: "查看来源", zhHant: "查看來源" })}
            </Link>
            <button onClick={() => setInput(t({ zhHans: "可以生成客户版说明吗？", zhHant: "可以生成客戶版說明嗎？" }))} style={linkActionStyle}>
              {t({ zhHans: "继续追问", zhHant: "繼續追問" })}
            </button>
          </div>
        </div>
      </MiniCard>

      <MiniCard>
        <h3 style={{ margin: 0, fontSize: 18, color: "#16223b" }}>{t({ zhHans: "问答兜底演示", zhHant: "問答兜底演示" })}</h3>
        <div style={{ display: "grid", gap: 10, marginTop: 14 }}>
          {miniFallbackStates.map((item) => (
            <div key={item.id} style={{ padding: 14, borderRadius: 16, background: "#f7faff" }}>
              <strong style={{ display: "block", color: "#16223b" }}>{t(item.title)}</strong>
              <span style={{ display: "block", marginTop: 6, color: "#6e809c", fontSize: 13, lineHeight: 1.8 }}>{t(item.message)}</span>
            </div>
          ))}
        </div>
      </MiniCard>

      {drawerOpen ? (
        <div style={sheetBackdropStyle} onClick={() => setDrawerOpen(false)}>
          <div style={sheetStyle} onClick={(event) => event.stopPropagation()}>
            <div style={{ width: 48, height: 4, borderRadius: 999, background: "#d8e2f1", margin: "0 auto 14px" }} />
            <div style={{ color: "#16223b", fontSize: 18, fontWeight: 800 }}>{t({ zhHans: "上传问答文件", zhHant: "上傳問答文件" })}</div>
            <div style={{ marginTop: 6, color: "#71829f", fontSize: 12, lineHeight: 1.6 }}>
              {t({ zhHans: "仅用于本次咨询问答，上传文件保存 1 个月", zhHant: "僅用於本次諮詢問答，上傳文件保存 1 個月" })}
            </div>
            <div style={{ marginTop: 14, padding: 14, borderRadius: 16, background: "#fff8e8", color: "#b15f00", lineHeight: 1.8 }}>
              {t(miniUploadGuides.warning)}
            </div>

            <div style={{ display: "grid", gap: 10, marginTop: 16 }}>
              <div>
                <div style={{ color: "#16223b", fontWeight: 700, marginBottom: 8 }}>{t({ zhHans: "允许上传", zhHant: "允許上傳" })}</div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {miniUploadGuides.allowed.map((item) => (
                    <span key={item.zhHans} style={uploadGuideTagStyle(true)}>
                      {t(item)}
                    </span>
                  ))}
                </div>
              </div>

              <button onClick={() => attachDemoFile("医疗计划书.pdf", t({ zhHans: "解析成功", zhHant: "解析成功" }))} style={primaryActionStyle}>
                {t({ zhHans: "上传示例计划书", zhHant: "上傳示例計劃書" })}
              </button>
              <button onClick={() => attachDemoFile("产品小册子.pdf", t({ zhHans: "解析中", zhHant: "解析中" }))} style={secondaryActionStyle}>
                {t({ zhHans: "上传示例小册子", zhHant: "上傳示例小冊子" })}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </MiniShell>
  );
}

function MiniChatPageFallback() {
  return (
    <MiniShell
      title={{ zhHans: "香港保险知识助手", zhHant: "香港保險知識助手" }}
      subtitle={{ zhHans: "经纪人移动端知识问答", zhHant: "經紀人移動端知識問答" }}
      activeTab="chat"
    >
      <MiniCard>
        <div style={{ display: "grid", gap: 12 }}>
          <div style={{ ...inputShellStyle, minHeight: 180 }}>
            <div style={{ width: "100%", height: 20, borderRadius: 999, background: "#e8eef8" }} />
            <div style={{ width: "100%", height: 88, borderRadius: 18, background: "#eef4ff" }} />
            <div style={{ display: "flex", gap: 10 }}>
              <div style={{ flex: 1, height: 42, borderRadius: 14, background: "#eef4ff" }} />
              <div style={{ width: 92, height: 42, borderRadius: 14, background: "#111a2d" }} />
            </div>
          </div>
        </div>
      </MiniCard>
    </MiniShell>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h4 style={{ margin: "6px 0 8px", fontSize: 16, color: "#16223b" }}>{title}</h4>
      {children}
    </section>
  );
}

function Toast({ text }: { text: string }) {
  return (
    <div style={{ position: "sticky", top: 10, zIndex: 4, display: "grid", justifyItems: "center" }}>
      <div style={{ background: "#111a2d", color: "#fff", borderRadius: 999, padding: "10px 16px", fontSize: 12 }}>{text}</div>
    </div>
  );
}

const settingsButtonStyle = {
  minHeight: 34,
  padding: "0 12px",
  borderRadius: 999,
  background: "#f3f7fd",
  color: "#4e76df",
  display: "inline-flex",
  alignItems: "center",
  textDecoration: "none",
  fontSize: 12,
  fontWeight: 700,
};

const inputShellStyle = {
  display: "grid",
  gap: 12,
  padding: 16,
  borderRadius: 22,
  background: "#f8fbff",
  border: "1px solid #dbe5f2",
};

const contextPillStyle = {
  minHeight: 32,
  padding: "0 12px",
  borderRadius: 999,
  background: "#eef4ff",
  color: "#4e76df",
  display: "inline-flex",
  alignItems: "center",
  fontSize: 12,
  fontWeight: 700,
};

const attachmentCardStyle = {
  display: "flex",
  justifyContent: "space-between",
  gap: 12,
  padding: 12,
  borderRadius: 16,
  background: "#ffffff",
  border: "1px solid #e4edf8",
};

const deleteAttachmentStyle = {
  border: 0,
  minHeight: 32,
  padding: "0 12px",
  borderRadius: 999,
  background: "#fff1f2",
  color: "#dc2626",
  fontWeight: 700,
  fontSize: 12,
};

const textareaStyle = {
  minHeight: 112,
  borderRadius: 18,
  border: "1px solid #dbe5f2",
  background: "#ffffff",
  padding: 16,
  color: "#16223b",
  fontSize: 14,
  lineHeight: 1.7,
  resize: "none" as const,
  outline: "none",
};

const promptChipStyle = {
  border: 0,
  minHeight: 34,
  padding: "0 14px",
  borderRadius: 999,
  background: "#eef4ff",
  color: "#4e76df",
  fontSize: 12,
  fontWeight: 700,
};

const primaryActionStyle = {
  border: 0,
  minHeight: 42,
  padding: "0 16px",
  borderRadius: 14,
  background: "#111a2d",
  color: "#fff",
  fontWeight: 800,
  fontSize: 13,
};

const secondaryActionStyle = {
  border: "1px solid #dbe5f2",
  minHeight: 42,
  padding: "0 16px",
  borderRadius: 14,
  background: "#ffffff",
  color: "#16223b",
  fontWeight: 700,
  fontSize: 13,
};

const trustBadgeStyle = {
  minHeight: 30,
  padding: "0 12px",
  borderRadius: 999,
  background: "#e8fbf0",
  color: "#0f9f6e",
  display: "inline-flex",
  alignItems: "center",
  fontSize: 12,
  fontWeight: 700,
};

const hintGoodStyle = {
  padding: 12,
  borderRadius: 16,
  background: "#eef7ff",
  color: "#2563eb",
  fontSize: 12,
};

const hintWarnStyle = {
  padding: 12,
  borderRadius: 16,
  background: "#fff8e8",
  color: "#b15f00",
  fontSize: 12,
  lineHeight: 1.8,
};

const bodyTextStyle = {
  margin: 0,
  color: "#16223b",
  lineHeight: 1.8,
};

const listStyle = {
  margin: 0,
  paddingLeft: 18,
  color: "#4b5c78",
  lineHeight: 1.9,
};

const comparisonRowStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  gap: 10,
  padding: 14,
  borderRadius: 16,
  background: "#f7faff",
};

const followUpButtonStyle = {
  border: "1px solid #dbe5f2",
  minHeight: 36,
  padding: "0 12px",
  borderRadius: 14,
  background: "#f7faff",
  color: "#16223b",
  fontSize: 12,
  fontWeight: 700,
};

const linkButtonStyle = {
  minHeight: 42,
  padding: "0 16px",
  borderRadius: 14,
  background: "#eef4ff",
  color: "#4e76df",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  textDecoration: "none",
  fontWeight: 700,
};

const linkActionStyle = {
  border: "1px solid #dbe5f2",
  minHeight: 42,
  padding: "0 16px",
  borderRadius: 14,
  background: "#f7faff",
  color: "#16223b",
  fontWeight: 700,
};

const sheetBackdropStyle = {
  position: "fixed" as const,
  inset: 0,
  background: "rgba(16, 25, 43, 0.36)",
  display: "grid",
  alignItems: "end",
  zIndex: 8,
};

const sheetStyle = {
  background: "#ffffff",
  borderTopLeftRadius: 28,
  borderTopRightRadius: 28,
  padding: 20,
};

const uploadGuideTagStyle = (allowed: boolean) => ({
  minHeight: 32,
  padding: "0 12px",
  borderRadius: 999,
  background: allowed ? "#eef7ff" : "#fff1f2",
  color: allowed ? "#2563eb" : "#dc2626",
  display: "inline-flex",
  alignItems: "center",
  fontSize: 12,
  fontWeight: 700,
});
