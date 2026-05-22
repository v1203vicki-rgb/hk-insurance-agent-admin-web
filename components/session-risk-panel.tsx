"use client";

import { useState, useTransition } from "react";
import { createAdminChatSessionAction } from "../lib/api";

export type SessionRiskRecord = {
  time: string;
  action: string;
  result: string;
};

export function SessionRiskPanel({
  sessionId,
  riskType,
  initialRecords,
  onUpdated,
}: {
  sessionId: string;
  riskType: string;
  initialRecords: SessionRiskRecord[];
  onUpdated?: (records: SessionRiskRecord[]) => void;
}) {
  const [selectedAction, setSelectedAction] = useState("加入合规复核");
  const [note, setNote] = useState("");
  const [records, setRecords] = useState<SessionRiskRecord[]>(initialRecords);
  const [resultText, setResultText] = useState("");
  const [isPending, startTransition] = useTransition();

  return (
    <div style={{ display: "grid", gap: 14 }}>
      <div style={{ display: "grid", gap: 6 }}>
        <strong style={{ fontSize: 15, color: "#172036" }}>会话风险处理</strong>
        <span style={{ color: "#71829f", lineHeight: 1.7 }}>当前风险类型：{riskType}。可加入复核、标记跟进或追加处理备注。</span>
      </div>

      <label style={{ display: "grid", gap: 8 }}>
        <span style={{ color: "#6f809d", fontWeight: 600 }}>处理动作</span>
        <select value={selectedAction} onChange={(event) => setSelectedAction(event.target.value)} style={{ width: "100%", minHeight: 46, borderRadius: 16, border: "1px solid #dbe5f2", background: "#f7faff", color: "#172036", padding: "12px 14px" }}>
          <option>加入合规复核</option>
          <option>标记重点跟进</option>
          <option>导出匿名会话</option>
          <option>追加风险备注</option>
        </select>
      </label>

      <label style={{ display: "grid", gap: 8 }}>
        <span style={{ color: "#6f809d", fontWeight: 600 }}>处理备注</span>
        <textarea
          value={note}
          onChange={(event) => setNote(event.target.value)}
          rows={3}
          style={{ width: "100%", minHeight: 88, borderRadius: 16, border: "1px solid #dbe5f2", background: "#f7faff", color: "#172036", padding: "12px 14px", resize: "vertical" }}
        />
      </label>

      <button
        type="button"
        disabled={isPending}
        onClick={() => {
          startTransition(async () => {
            try {
              const response = await createAdminChatSessionAction(sessionId, {
                action: selectedAction,
                note,
              });
              if (response.record) {
                const nextRecords = [response.record, ...records];
                setRecords(nextRecords);
                onUpdated?.(nextRecords);
              }
              setResultText(`已提交动作：${selectedAction}`);
              setNote("");
            } catch {
              setResultText("请求失败，请稍后连接后端服务再次验证。");
            }
          });
        }}
        style={{ minHeight: 44, padding: "0 18px", borderRadius: 16, border: "none", background: "#111a2d", color: "white", fontWeight: 700, justifySelf: "start", opacity: isPending ? 0.7 : 1 }}
      >
        {isPending ? "提交中..." : "添加处理记录"}
      </button>

      {resultText ? <div style={{ padding: 12, borderRadius: 14, background: "#f4f8fe", color: "#172036" }}>{resultText}</div> : null}

      <div style={{ display: "grid", gap: 10 }}>
        {records.map((record) => (
          <div key={`${record.time}-${record.action}-${record.result}`} style={{ padding: 14, borderRadius: 14, background: "#f4f8fe", color: "#172036", lineHeight: 1.7 }}>
            <strong>{record.action}</strong>
            <div>{record.time}</div>
            <div>{record.result}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
