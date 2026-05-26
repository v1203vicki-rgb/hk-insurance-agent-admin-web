"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { CitationCard, MiniCard, MiniShell } from "../../../../components/mini-shell";
import { useMiniLocale } from "../../../../components/mini-locale";
import { getMiniCitation, getMiniSession } from "@/src/data";
import { generateClientFriendlyAnswer } from "../../../../lib/generate-client-friendly-answer";

export default function MiniHistoryDetailPage({ params }: { params: { id: string } }) {
  const { t, locale } = useMiniLocale();
  const session = getMiniSession(params.id);
  const [toast, setToast] = useState("");

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 1800);
    return () => window.clearTimeout(timer);
  }, [toast]);

  if (!session) {
    return (
      <MiniShell title={{ zhHans: "历史详情", zhHant: "歷史詳情" }} activeTab="history">
        <MiniCard>
          <div style={{ color: "#6d7f9c" }}>未找到对应历史记录。</div>
        </MiniCard>
      </MiniShell>
    );
  }

  const assistantMessages = session.messages.filter((item) => item.role === "ASSISTANT");
  const latestStructuredAnswer = [...assistantMessages].reverse().find((item) => item.structuredAnswer)?.structuredAnswer;

  const latestCitations = useMemo(() => {
    const ids = assistantMessages.flatMap((item) => item.citations ?? []);
    return ids
      .map((item) => getMiniCitation(item))
      .filter((item, index, array) => item && array.findIndex((candidate) => candidate?.id === item.id) === index);
  }, [assistantMessages]) as NonNullable<ReturnType<typeof getMiniCitation>>[];

  const fullAnswerText = latestStructuredAnswer
    ? [t(latestStructuredAnswer.shortConclusion), ...latestStructuredAnswer.details.map((item) => `- ${t(item)}`), ...latestStructuredAnswer.cautions.map((item) => `注意：${t(item)}`)].join("\n")
    : "";
  const clientAnswerText = latestStructuredAnswer ? generateClientFriendlyAnswer(latestStructuredAnswer, locale) : "";

  const copyText = async (text: string, success: string) => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setToast(success);
    } catch {
      setToast("复制失败，请手动复制");
    }
  };

  return (
    <MiniShell
      title={{ zhHans: "历史详情", zhHant: "歷史詳情" }}
      subtitle={{ zhHans: "完整问答、引用来源与可复制回答", zhHant: "完整問答、引用來源與可複製回答" }}
      activeTab="history"
    >
      {toast ? <Toast text={toast} /> : null}

      <MiniCard>
        <div style={{ display: "grid", gap: 10, color: "#16223b" }}>
          <MetaRow label="匿名客户 ID" value={session.clientAnonymousId} />
          <MetaRow label="创建时间" value={session.createdAt} />
          <MetaRow label="过期时间" value={session.expiresAt} />
          <MetaRow label="语言" value={session.language === "ZH_HANT" ? "繁體中文" : "简体中文"} />
          <MetaRow label="风险标签" value={t(session.riskLabel)} />
        </div>
      </MiniCard>

      <MiniCard>
        <h3 style={sectionTitleStyle}>完整对话</h3>
        <div style={{ display: "grid", gap: 14, marginTop: 14 }}>
          {session.messages.map((message) => (
            <div key={message.id} style={{ display: "grid", justifyItems: message.role === "USER" ? "end" : "start" }}>
              <div
                style={{
                  maxWidth: 280,
                  padding: "14px 16px",
                  borderRadius: 22,
                  background: message.role === "USER" ? "#111a2d" : "#f7faff",
                  color: message.role === "USER" ? "#fff" : "#16223b",
                  lineHeight: 1.8,
                }}
              >
                {t(message.content)}
              </div>
              {message.structuredAnswer ? (
                <div style={{ width: "100%", marginTop: 10, display: "grid", gap: 10 }}>
                  <div style={answerPanelStyle}>
                    <strong style={{ color: "#16223b" }}>简短结论</strong>
                    <div style={{ marginTop: 8, color: "#4b5c78", lineHeight: 1.8 }}>{t(message.structuredAnswer.shortConclusion)}</div>
                  </div>
                  {message.citations?.length ? (
                    <div style={{ display: "grid", gap: 10 }}>
                      {message.citations.map((citationId) => {
                        const citation = getMiniCitation(citationId);
                        return citation ? <CitationCard key={citation.id} href={`/mini/citation/${citation.id}`} citation={citation} /> : null;
                      })}
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </MiniCard>

      <MiniCard>
        <h3 style={sectionTitleStyle}>上传文件记录</h3>
        <div style={{ display: "grid", gap: 10, marginTop: 14 }}>
          {session.uploads.length ? (
            session.uploads.map((upload) => (
              <div key={upload.id} style={uploadCardStyle}>
                <strong style={{ color: "#16223b" }}>{upload.fileName}</strong>
                <div style={{ marginTop: 6, color: "#6d7f9c", fontSize: 12, lineHeight: 1.8 }}>
                  <div>上传时间：{upload.uploadedAt}</div>
                  <div>解析状态：{upload.status}</div>
                  <div>文件过期：{upload.expiresAt}</div>
                </div>
              </div>
            ))
          ) : (
            <div style={{ color: "#90a1ba" }}>本次会话没有上传文件。</div>
          )}
        </div>
      </MiniCard>

      <MiniCard>
        <h3 style={sectionTitleStyle}>风险判断记录</h3>
        <div style={{ display: "grid", gap: 10, marginTop: 14, color: "#16223b" }}>
          <MetaRow label="riskType" value={session.riskType} />
          <MetaRow label="riskLevel" value={session.riskLevel} />
          <MetaRow label="命中规则" value={session.ruleHits.join(" / ")} />
        </div>
      </MiniCard>

      <MiniCard>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <button onClick={() => copyText(fullAnswerText, "已复制完整回答")} style={secondaryButtonStyle}>
            复制完整回答
          </button>
          <button onClick={() => copyText(clientAnswerText, "已复制客户版回答")} style={primaryButtonStyle}>
            复制客户版回答
          </button>
          <Link href={`/mini/chat?sessionId=${session.id}&question=${encodeURIComponent(session.title.zhHans)}`} style={linkButtonStyle}>
            再问一次
          </Link>
          <Link href="/mini/history" style={ghostLinkStyle}>
            返回记录列表
          </Link>
        </div>
      </MiniCard>

      {latestCitations.length ? (
        <MiniCard>
          <h3 style={sectionTitleStyle}>集中查看引用来源</h3>
          <div style={{ display: "grid", gap: 12, marginTop: 14 }}>
            {latestCitations.map((citation) => (
              <CitationCard key={citation.id} href={`/mini/citation/${citation.id}`} citation={citation} />
            ))}
          </div>
        </MiniCard>
      ) : null}
    </MiniShell>
  );
}

function Toast({ text }: { text: string }) {
  return (
    <div style={{ position: "sticky", top: 10, zIndex: 4, display: "grid", justifyItems: "center" }}>
      <div style={{ background: "#111a2d", color: "#fff", borderRadius: 999, padding: "10px 16px", fontSize: 12 }}>{text}</div>
    </div>
  );
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", gap: 16 }}>
      <strong>{label}</strong>
      <span style={{ color: "#5d708d", textAlign: "right" }}>{value}</span>
    </div>
  );
}

const sectionTitleStyle = { margin: 0, fontSize: 18, color: "#16223b" };

const answerPanelStyle = {
  padding: 14,
  borderRadius: 16,
  background: "#f7faff",
};

const uploadCardStyle = {
  padding: 14,
  borderRadius: 16,
  background: "#f7faff",
  border: "1px solid #dbe5f2",
};

const primaryButtonStyle = {
  border: 0,
  minHeight: 42,
  padding: "0 16px",
  borderRadius: 14,
  background: "#111a2d",
  color: "#fff",
  fontWeight: 800,
  fontSize: 13,
};

const secondaryButtonStyle = {
  border: "1px solid #dbe5f2",
  minHeight: 42,
  padding: "0 16px",
  borderRadius: 14,
  background: "#ffffff",
  color: "#16223b",
  fontWeight: 700,
  fontSize: 13,
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

const ghostLinkStyle = {
  minHeight: 42,
  padding: "0 16px",
  borderRadius: 14,
  background: "#f7faff",
  color: "#16223b",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  textDecoration: "none",
  fontWeight: 700,
};
