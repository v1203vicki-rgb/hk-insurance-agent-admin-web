"use client";

import { useState, useTransition } from "react";
import { updateAgentRuleGroup } from "../lib/api";

type RuleGroup = {
  id: string;
  title: string;
  description: string;
  rules: string[];
};

export function RuleGroupEditor({ group }: { group: RuleGroup }) {
  const [title, setTitle] = useState(group.title);
  const [description, setDescription] = useState(group.description);
  const [rules, setRules] = useState(group.rules);
  const [draftRule, setDraftRule] = useState("");
  const [savedAt, setSavedAt] = useState("");
  const [resultText, setResultText] = useState("");
  const [isPending, startTransition] = useTransition();

  return (
    <div style={{ display: "grid", gap: 14 }}>
      <label style={{ display: "grid", gap: 8 }}>
        <span style={{ color: "#6f809d", fontWeight: 600 }}>规则组名称</span>
        <input value={title} onChange={(event) => setTitle(event.target.value)} style={{ width: "100%", minHeight: 46, borderRadius: 16, border: "1px solid #dbe5f2", background: "#f7faff", color: "#172036", padding: "12px 14px" }} />
      </label>

      <label style={{ display: "grid", gap: 8 }}>
        <span style={{ color: "#6f809d", fontWeight: 600 }}>规则组说明</span>
        <textarea value={description} onChange={(event) => setDescription(event.target.value)} rows={3} style={{ width: "100%", minHeight: 88, borderRadius: 16, border: "1px solid #dbe5f2", background: "#f7faff", color: "#172036", padding: "12px 14px", resize: "vertical" }} />
      </label>

      <div style={{ display: "grid", gap: 10 }}>
        {rules.map((rule, index) => (
          <div key={`${group.id}-${index}-${rule}`} style={{ padding: 14, borderRadius: 14, background: "#f4f8fe", color: "#172036", lineHeight: 1.7 }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
              <span>{rule}</span>
              <button type="button" onClick={() => setRules((current) => current.filter((_, currentIndex) => currentIndex !== index))} style={{ border: "none", background: "transparent", color: "#ef476f", cursor: "pointer" }}>
                删除
              </button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <input
          value={draftRule}
          onChange={(event) => setDraftRule(event.target.value)}
          placeholder="新增一条规则"
          style={{ flex: "1 1 280px", minHeight: 46, borderRadius: 16, border: "1px solid #dbe5f2", background: "#f7faff", color: "#172036", padding: "12px 14px" }}
        />
        <button
          type="button"
          onClick={() => {
            if (!draftRule.trim()) return;
            setRules((current) => [...current, draftRule.trim()]);
            setDraftRule("");
          }}
          style={{ minHeight: 46, padding: "0 16px", borderRadius: 16, border: "1px solid #dbe5f2", background: "#ffffff", color: "#172036", fontWeight: 700 }}
        >
          添加规则
        </button>
      </div>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
        <button
          type="button"
          disabled={isPending}
          onClick={() => {
            startTransition(async () => {
              try {
                const response = await updateAgentRuleGroup(group.id, {
                  title,
                  description,
                  rules,
                });
                setSavedAt(response.savedAt ?? new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" }));
                setResultText(`已保存规则组：${response.id ?? group.id}`);
              } catch {
                setResultText("请求失败，请稍后连接后端服务再次验证。");
              }
            });
          }}
          style={{ minHeight: 44, padding: "0 18px", borderRadius: 16, border: "none", background: "#111a2d", color: "white", fontWeight: 700, opacity: isPending ? 0.7 : 1 }}
        >
          {isPending ? "保存中..." : "保存本组草稿"}
        </button>
        {savedAt ? <span style={{ color: "#71829f", fontSize: 13 }}>最近保存：{savedAt}</span> : null}
      </div>

      {resultText ? <div style={{ padding: 12, borderRadius: 14, background: "#f4f8fe", color: "#172036" }}>{resultText}</div> : null}
    </div>
  );
}
