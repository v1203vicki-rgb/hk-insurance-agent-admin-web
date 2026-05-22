"use client";

import { useState } from "react";
import Link from "next/link";
import { ActionChip } from "./action-chip";
import { DocumentReviewPanel } from "./document-review-panel";
import { InfoCard } from "./info-card";
import { PageShell } from "./page-shell";
import { StatusBadge } from "./status-badge";
import type { DocumentDetail } from "../lib/api";

const metaItemStyle = {
  padding: "16px 18px",
  borderRadius: 18,
  background: "#f4f8fe",
} as const;

export function DocumentDetailClient({ initialDetail }: { initialDetail: DocumentDetail }) {
  const [detail, setDetail] = useState(initialDetail);
  const [reviewLog, setReviewLog] = useState<Array<{ label: string; result: string }>>([]);

  return (
    <PageShell
      title="知识文件详情"
      description="查看文件版本、来源等级、解析状态、引用范围和审核处理结果。"
      actions={
        <Link href="/admin/documents" style={{ color: "#1b2740", fontWeight: 700 }}>
          返回知识库列表
        </Link>
      }
    >
      <section style={{ display: "grid", gap: 20, gridTemplateColumns: "0.95fr 1.05fr" }}>
        <div style={{ display: "grid", gap: 20 }}>
          <InfoCard title="文件信息" description={detail.fileName}>
            <div style={{ display: "grid", gap: 12 }}>
              {[
                ["来源等级", detail.sourceLevel],
                ["版本号", detail.version],
                ["发布日期", detail.publishDate],
                ["生效日期", detail.effectiveDate],
                ["失效日期", detail.expiryDate || "未设置"],
                ["关联产品", detail.productName],
                ["上传主体", detail.uploadedBy],
              ].map(([label, value]) => (
                <div key={label} style={metaItemStyle}>
                  <strong style={{ color: "#172036" }}>{label}</strong>
                  <div style={{ marginTop: 6, color: "#71829f" }}>{value}</div>
                </div>
              ))}
            </div>
          </InfoCard>

          <InfoCard title="引用与状态" description="前端可引用、解析状态与向量状态统一在此查看。">
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <StatusBadge label={detail.status} />
              <ActionChip>语言：{detail.language}</ActionChip>
              <ActionChip>解析：{detail.parseStatus}</ActionChip>
              <ActionChip>向量：{detail.vectorStatus}</ActionChip>
              <ActionChip>前端引用：{detail.frontendCitable ? "是" : "否"}</ActionChip>
              <ActionChip>公共知识库：{detail.isPublic ? "是" : "否"}</ActionChip>
            </div>
          </InfoCard>
        </div>

        <div style={{ display: "grid", gap: 20 }}>
          <InfoCard title="审核摘要" description={detail.reviewComment || "当前暂无补充审核意见。"}>
            {reviewLog.length > 0 ? (
              <div style={{ display: "grid", gap: 10 }}>
                {reviewLog.map((item) => (
                  <div key={`${item.label}-${item.result}`} style={metaItemStyle}>
                    <strong style={{ color: "#172036" }}>{item.label}</strong>
                    <div style={{ marginTop: 6, color: "#71829f" }}>{item.result}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ ...metaItemStyle, color: "#71829f" }}>审核通过后，这里会持续记录状态变化和处理意见。</div>
            )}
          </InfoCard>

          <InfoCard title="审核动作面板" description="平台管理员可在此执行通过、驳回、禁用和归档。">
            <DocumentReviewPanel
              documentId={detail.id}
              initialStatus={detail.status}
              initialComment={detail.reviewComment}
              initialFrontendCitable={detail.frontendCitable}
              onUpdated={(update) => {
                setDetail((current) => ({
                  ...current,
                  status: update.status,
                  reviewComment: update.comment,
                  frontendCitable: update.frontendCitable,
                }));
                setReviewLog((current) => [update.historyEntry, ...current]);
              }}
            />
          </InfoCard>
        </div>
      </section>
    </PageShell>
  );
}
