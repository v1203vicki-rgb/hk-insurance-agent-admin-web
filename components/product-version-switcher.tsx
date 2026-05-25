"use client";

import { useMemo, useState, useTransition } from "react";
import { setProductActiveVersion } from "../lib/api";

type VersionRow = {
  id: string;
  version: string;
  publishDate: string;
  effectiveDate: string;
  expiryDate: string;
  status: string;
  documentCount: number;
};

export function ProductVersionSwitcher({
  productId,
  versions,
  initialActiveVersion,
  onUpdated,
}: {
  productId: string;
  versions: VersionRow[];
  initialActiveVersion: string;
  onUpdated?: (update: { activeVersion: string }) => void;
}) {
  const [selectedVersion, setSelectedVersion] = useState(initialActiveVersion);
  const [activeVersion, setActiveVersion] = useState(initialActiveVersion);
  const [logs, setLogs] = useState<string[]>([]);
  const [resultText, setResultText] = useState("");
  const [isPending, startTransition] = useTransition();

  const selectedMeta = useMemo(() => versions.find((item) => item.version === selectedVersion) ?? versions[0], [selectedVersion, versions]);

  return (
    <div style={{ display: "grid", gap: 14 }}>
      <div style={{ display: "grid", gap: 6 }}>
        <strong style={{ fontSize: 15, color: "#172036" }}>版本选择</strong>
        <span style={{ color: "#71829f", lineHeight: 1.7 }}>平台统一控制 Agent 当前使用版本，切换后会同步影响后续问答与产品对比。</span>
      </div>

      <div style={{ display: "grid", gap: 10 }}>
        {versions.map((item) => (
          <label
            key={item.id}
            onClick={() => setSelectedVersion(item.version)}
            style={{
              display: "grid",
              gap: 4,
              padding: 14,
              borderRadius: 16,
              border: item.version === selectedVersion ? "1px solid #aac0f7" : "1px solid #dbe5f2",
              background: item.version === selectedVersion ? "#eef4ff" : "#f7faff",
              cursor: "pointer",
            }}
          >
            <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
              <input type="radio" name={`product-version-${productId}`} checked={item.version === selectedVersion} onChange={() => setSelectedVersion(item.version)} />
              <strong style={{ color: "#172036" }}>{item.version}</strong>
              <span style={{ color: "#71829f", fontSize: 12 }}>状态：{item.status}</span>
            </div>
            <span style={{ color: "#71829f", fontSize: 13 }}>
              发布 {item.publishDate} / 生效 {item.effectiveDate} / 关联文件 {item.documentCount}
            </span>
          </label>
        ))}
      </div>

      {selectedMeta ? <div style={{ color: "#71829f", lineHeight: 1.7 }}>当前选择：{selectedMeta.version}，失效日期：{selectedMeta.expiryDate || "-"}</div> : null}

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
        <button
          type="button"
          disabled={isPending}
          onClick={() => {
            const nextVersion = versions.find((item) => item.version === selectedVersion)?.id;
            if (!nextVersion) return;

            startTransition(async () => {
              try {
                const response = await setProductActiveVersion(productId, nextVersion);
                setActiveVersion(selectedVersion);
                setLogs((current) => [`已将 ${selectedVersion} 设为当前启用版本`, ...current]);
                setResultText(`接口返回 activeVersionId：${response.activeVersionId ?? nextVersion}`);
                onUpdated?.({ activeVersion: selectedVersion });
              } catch {
                setResultText("请求失败，请在接入后端后再次验证版本切换。");
              }
            });
          }}
          style={{ minHeight: 44, padding: "0 18px", borderRadius: 16, border: "none", background: "#111a2d", color: "white", fontWeight: 700, opacity: isPending ? 0.7 : 1 }}
        >
          {isPending ? "提交中..." : "设为当前启用"}
        </button>
        <div style={{ color: "#71829f", fontSize: 13 }}>当前启用版本：{activeVersion}</div>
      </div>

      {resultText ? <div style={{ padding: 12, borderRadius: 14, background: "#f4f8fe", color: "#172036" }}>{resultText}</div> : null}
      {logs.length > 0 ? (
        <div style={{ display: "grid", gap: 8 }}>
          {logs.map((log) => (
            <div key={log} style={{ padding: 12, borderRadius: 14, background: "#f4f8fe", color: "#172036" }}>
              {log}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
