"use client";

import { useState } from "react";
import Link from "next/link";
import { ActionChip } from "./action-chip";
import { InfoCard } from "./info-card";
import { PageShell } from "./page-shell";
import { SessionRiskPanel, type SessionRiskRecord } from "./session-risk-panel";
import type { ChatSessionDetailResponse } from "../lib/api";

const blockStyle = {
  padding: "14px 16px",
  borderRadius: 18,
  background: "#f4f8fe",
} as const;

export function ChatSessionDetailClient({ initialDetail }: { initialDetail: ChatSessionDetailResponse }) {
  const [detail, setDetail] = useState(initialDetail);
  const [records, setRecords] = useState<SessionRiskRecord[]>(initialDetail.riskHandlingRecords ?? []);

  return (
    <PageShell
      title="会话详情"
      description="查看客户问题、Agent 回答、引用来源和风险处理记录。"
      actions={
        <Link href="/admin/chat-sessions" style={{ color: "#1b2740", fontWeight: 700 }}>
          返回会话列表
        </Link>
      }
    >
      <InfoCard title="会话摘要" description={detail.question}>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <ActionChip>风险类型：{detail.riskType}</ActionChip>
          <ActionChip>语言：{detail.language}</ActionChip>
          <ActionChip>来源：{detail.source}</ActionChip>
          <ActionChip>创建时间：{detail.createdAt}</ActionChip>
          <ActionChip>过期时间：{detail.expiresAt}</ActionChip>
          <ActionChip>处理记录：{records.length}</ActionChip>
        </div>
      </InfoCard>

      <section style={{ display: "grid", gap: 20, gridTemplateColumns: "0.95fr 1.05fr" }}>
        <InfoCard title="风险处理记录" description="展示系统识别与管理员处理动作。">
          <div style={{ display: "grid", gap: 10 }}>
            {records.map((record) => (
              <div key={`${record.time}-${record.action}-${record.result}`} style={blockStyle}>
                <strong style={{ color: "#172036" }}>{record.action}</strong>
                <div style={{ marginTop: 6, color: "#71829f" }}>{record.time}</div>
                <div style={{ marginTop: 6, color: "#71829f" }}>{record.result}</div>
              </div>
            ))}
          </div>
        </InfoCard>

        <InfoCard title="处理动作面板" description="新增复核、跟进或风险备注后，右侧摘要与记录会同步更新。">
          <SessionRiskPanel
            sessionId={detail.id}
            riskType={detail.riskType}
            initialRecords={records}
            onUpdated={(nextRecords) => {
              setRecords(nextRecords);
              setDetail((current) => ({ ...current, riskHandlingRecords: nextRecords }));
            }}
          />
        </InfoCard>
      </section>

      <section style={{ display: "grid", gap: 20, gridTemplateColumns: "1fr 1fr" }}>
        {detail.messages.map((message, index) => (
          <InfoCard key={`${message.role}-${index}`} title={message.role === "USER" ? "用户问题" : "Agent 回答"} description={message.content} />
        ))}
      </section>

      <InfoCard title="引用来源" description="所有关键结论都应可追溯到具体文件与页码。">
        <div style={{ display: "grid", gap: 10 }}>
          {detail.citations.map((citation) => (
            <div key={`${citation.fileName}-${citation.pageNumber}`} style={blockStyle}>
              <strong style={{ color: "#172036" }}>{citation.fileName}</strong>
              <div style={{ marginTop: 6, color: "#71829f" }}>来源等级：{citation.sourceLevel}</div>
              <div style={{ marginTop: 6, color: "#71829f" }}>页码：P.{citation.pageNumber}</div>
              <div style={{ marginTop: 6, color: "#71829f" }}>版本号：{citation.version}</div>
            </div>
          ))}
        </div>
      </InfoCard>
    </PageShell>
  );
}
