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
      title="文件详情"
      description="左侧查看文件基础信息、版本日期、关联产品和状态；右侧查看审核时间线与动作面板。"
      actions={
        <Link href="/admin/documents" style={{ color: "#1b2740", fontWeight: 700 }}>
          返回知识库列表
        </Link>
      }
    >
      <section style={{ display: "grid", gap: 20, gridTemplateColumns: "0.95fr 1.05fr" }}>
        <div style={{ display: "grid", gap: 20 }}>
          <InfoCard title="文件基础信息" description={detail.fileName}>
            <div style={{ display: "grid", gap: 12 }}>
              {[
                ["来源等级", detail.sourceLevel],
                ["版本号", detail.version],
                ["发布日期", detail.publishDate],
                ["生效日期", detail.effectiveDate],
                ["失效日期", detail.expiryDate || "未设置"],
                ["关联产品", detail.productName],
                ["上传主体", detail.uploadedBy],
                ["当前状态", detail.status],
              ].map(([label, value]) => (
                <div key={label} style={metaItemStyle}>
                  <strong style={{ color: "#172036" }}>{label}</strong>
                  <div style={{ marginTop: 6, color: "#71829f" }}>{value}</div>
                </div>
              ))}
            </div>
          </InfoCard>

          <InfoCard title="文件预览 / 解析信息" description="预留 PDF 预览、切片列表和引用预览区域。">
            <div style={{ display: "grid", gap: 12 }}>
              <div style={{ ...metaItemStyle, minHeight: 180, display: "grid", placeItems: "center", color: "#71829f" }}>PDF / 文件预览占位区</div>
              <div style={{ ...metaItemStyle, color: "#71829f" }}>切片预览：冷静期 21 日、等待期 90 日、保障范围 120 种严重疾病。</div>
              <div style={{ ...metaItemStyle, color: "#71829f" }}>引用预览：前端回答时将显示文件名、来源等级、页码、版本号、发布日期和生效日期。</div>
            </div>
          </InfoCard>
        </div>

        <div style={{ display: "grid", gap: 20 }}>
          <InfoCard title="引用与状态" description="前端可引用、解析状态与向量状态在此统一展示。">
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <StatusBadge label={detail.status} />
              <ActionChip>语言：{detail.language}</ActionChip>
              <ActionChip>解析状态：{detail.parseStatus}</ActionChip>
              <ActionChip>向量状态：{detail.vectorStatus}</ActionChip>
              <ActionChip>前端引用：{detail.frontendCitable ? "允许" : "禁止"}</ActionChip>
              <ActionChip>公共知识库：{detail.isPublic ? "是" : "否"}</ActionChip>
            </div>
          </InfoCard>

          <InfoCard title="审核时间线" description={detail.reviewComment || "当前暂无补充审核意见。"}>
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
              <div style={{ ...metaItemStyle, color: "#71829f" }}>审核动作会在这里持续记录，包括审核通过、驳回、禁用和归档。</div>
            )}
          </InfoCard>

          <InfoCard title="审核动作面板" description="支持审核通过、驳回、禁用、归档，并设置是否允许前端引用。">
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
