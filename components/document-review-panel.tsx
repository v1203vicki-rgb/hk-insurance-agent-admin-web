"use client";

import { useMemo, useState, useTransition } from "react";
import { archiveDocument, disableDocument, reviewDocument } from "../lib/api";

type ReviewAction = "APPROVE" | "REJECT" | "DISABLE" | "ARCHIVE";

type ReviewUpdate = {
  status: string;
  comment: string;
  frontendCitable: boolean;
  historyEntry: {
    label: string;
    result: string;
  };
};

const fieldStyle = {
  width: "100%",
  minHeight: 46,
  borderRadius: 16,
  border: "1px solid #dbe5f2",
  background: "#f7faff",
  color: "#172036",
  padding: "12px 14px",
} as const;

export function DocumentReviewPanel({
  documentId,
  initialStatus,
  initialComment,
  initialFrontendCitable,
  onUpdated,
}: {
  documentId: string;
  initialStatus: string;
  initialComment: string;
  initialFrontendCitable: boolean;
  onUpdated?: (update: ReviewUpdate) => void;
}) {
  const [action, setAction] = useState<ReviewAction>("APPROVE");
  const [comment, setComment] = useState(initialComment);
  const [frontendCitable, setFrontendCitable] = useState(initialFrontendCitable);
  const [status, setStatus] = useState(initialStatus);
  const [history, setHistory] = useState<Array<{ label: string; result: string }>>([]);
  const [resultText, setResultText] = useState("");
  const [isPending, startTransition] = useTransition();

  const actionDescription = useMemo(() => {
    switch (action) {
      case "APPROVE":
        return "审核通过后，资料可进入已启用知识库，并允许 Agent 检索引用。";
      case "REJECT":
        return "驳回后保留记录，但不会进入前端问答引用范围。";
      case "DISABLE":
        return "禁用后文件仍保留在后台，但 Agent 不再使用该文件。";
      case "ARCHIVE":
        return "归档适用于历史版本，保留追溯信息但不参与当前回答。";
    }
  }, [action]);

  return (
    <div style={{ display: "grid", gap: 14 }}>
      <div style={{ display: "grid", gap: 6 }}>
        <strong style={{ fontSize: 15, color: "#172036" }}>审核动作</strong>
        <span style={{ color: "#71829f", lineHeight: 1.7 }}>{actionDescription}</span>
      </div>

      <label style={{ display: "grid", gap: 8 }}>
        <span style={{ color: "#6f809d", fontWeight: 600 }}>处理类型</span>
        <select value={action} onChange={(event) => setAction(event.target.value as ReviewAction)} style={fieldStyle}>
          <option value="APPROVE">审核通过</option>
          <option value="REJECT">驳回</option>
          <option value="DISABLE">设为禁用</option>
          <option value="ARCHIVE">归档旧版本</option>
        </select>
      </label>

      <label style={{ display: "grid", gap: 8 }}>
        <span style={{ color: "#6f809d", fontWeight: 600 }}>审核意见</span>
        <textarea value={comment} onChange={(event) => setComment(event.target.value)} rows={4} style={{ ...fieldStyle, minHeight: 110, resize: "vertical" }} />
      </label>

      <label style={{ display: "flex", gap: 10, alignItems: "center", color: "#172036" }}>
        <input type="checkbox" checked={frontendCitable} onChange={(event) => setFrontendCitable(event.target.checked)} />
        允许前端引用该文件
      </label>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
        <button
          type="button"
          disabled={isPending}
          onClick={() => {
            startTransition(async () => {
              try {
                const response =
                  action === "DISABLE"
                    ? await disableDocument(documentId)
                    : action === "ARCHIVE"
                      ? await archiveDocument(documentId)
                      : await reviewDocument(documentId, {
                          action,
                          comment,
                          status: action === "APPROVE" ? "ENABLED" : "REJECTED",
                        });

                const nextStatus =
                  response.status ??
                  (action === "APPROVE" ? "ENABLED" : action === "REJECT" ? "REJECTED" : action === "DISABLE" ? "DISABLED" : "ARCHIVED");

                const historyEntry = {
                  label: `${action} / ${new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" })}`,
                  result: comment || "未填写备注",
                };

                setStatus(nextStatus);
                setHistory((current) => [historyEntry, ...current]);
                setResultText(`请求已提交：${response.action ?? action}，当前状态：${nextStatus}`);
                onUpdated?.({
                  status: nextStatus,
                  comment,
                  frontendCitable,
                  historyEntry,
                });
              } catch {
                setResultText("请求失败，请稍后连接后端服务再次验证。");
              }
            });
          }}
          style={{
            minHeight: 44,
            padding: "0 18px",
            borderRadius: 16,
            border: "none",
            background: "#111a2d",
            color: "white",
            fontWeight: 700,
            opacity: isPending ? 0.7 : 1,
          }}
        >
          {isPending ? "提交中..." : "应用动作"}
        </button>
        <div style={{ color: "#71829f", fontSize: 13 }}>当前状态：{status}</div>
      </div>

      <div style={{ display: "grid", gap: 8 }}>
        <div style={{ color: "#71829f", lineHeight: 1.7 }}>前端可引用：{frontendCitable ? "是" : "否"}</div>
        {resultText ? <div style={{ padding: 12, borderRadius: 14, background: "#f4f8fe", color: "#172036" }}>{resultText}</div> : null}
        {history.length > 0 ? (
          <div style={{ display: "grid", gap: 8 }}>
            {history.map((item) => (
              <div key={`${item.label}-${item.result}`} style={{ padding: 12, borderRadius: 14, background: "#f4f8fe" }}>
                <strong style={{ color: "#172036" }}>{item.label}</strong>
                <div style={{ marginTop: 4, color: "#71829f" }}>{item.result}</div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
