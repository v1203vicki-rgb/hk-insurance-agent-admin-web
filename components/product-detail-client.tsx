"use client";

import { useState } from "react";
import Link from "next/link";
import { DataTable, type TableRow } from "./data-table";
import { InfoCard } from "./info-card";
import { PageShell } from "./page-shell";
import { ProductVersionSwitcher } from "./product-version-switcher";
import { StatusBadge } from "./status-badge";
import type { ProductItem, ProductVersionItem } from "../lib/api";

function toRows(versions: ProductVersionItem[]): TableRow[] {
  return versions.map((item) => [
    item.version,
    item.publishDate,
    item.effectiveDate,
    item.expiryDate || "-",
    <StatusBadge key={`${item.id}-status`} label={item.status === "ENABLED" ? "已启用" : item.status === "ARCHIVED" ? "已归档" : item.status} />,
    String(item.documentCount),
  ]);
}

const metaItemStyle = {
  padding: "16px 18px",
  borderRadius: 18,
  background: "#f4f8fe",
} as const;

export function ProductDetailClient({
  initialProduct,
  initialVersions,
}: {
  initialProduct: ProductItem;
  initialVersions: ProductVersionItem[];
}) {
  const [product, setProduct] = useState(initialProduct);
  const [versions, setVersions] = useState(initialVersions);

  return (
    <PageShell
      title="产品详情 / 版本管理"
      description="查看当前启用版本、历史版本、关联文件、产品关键字段、优惠政策和被问次数。"
      actions={
        <Link href="/admin/products" style={{ color: "#1b2740", fontWeight: 700 }}>
          返回产品列表
        </Link>
      }
    >
      <section style={{ display: "grid", gap: 20, gridTemplateColumns: "0.95fr 1.05fr" }}>
        <InfoCard title="产品摘要" description={`${product.insuranceCompany} / ${product.name}`}>
          <div style={{ display: "grid", gap: 12 }}>
            {[
              ["产品类型", product.productType],
              ["当前启用版本", product.activeVersion],
              ["产品状态", product.status === "ENABLED" ? "启用" : product.status],
              ["产品 ID", product.id],
              ["被问次数", product.id === "product_2" ? "686" : product.id === "product_3" ? "517" : product.id === "product_4" ? "389" : "421"],
              ["优惠政策", product.id === "product_3" ? "1 条，含过期优惠" : product.id === "product_4" ? "1 条" : "暂无"],
            ].map(([label, value]) => (
              <div key={label} style={metaItemStyle}>
                <strong style={{ color: "#172036" }}>{label}</strong>
                <div style={{ marginTop: 6, color: "#71829f" }}>{value}</div>
              </div>
            ))}
          </div>
        </InfoCard>

        <InfoCard title="切换启用版本" description="切换后会同步更新摘要区、版本状态和后续问答引用版本。">
          <ProductVersionSwitcher
            productId={product.id}
            versions={versions}
            initialActiveVersion={product.activeVersion}
            onUpdated={({ activeVersion }) => {
              setProduct((current) => ({ ...current, activeVersion }));
              setVersions((current) =>
                current.map((item) =>
                  item.version === activeVersion
                    ? { ...item, status: "ENABLED" }
                    : item.status === "ENABLED"
                      ? { ...item, status: "ARCHIVED" }
                      : item,
                ),
              );
            }}
          />
        </InfoCard>
      </section>

      <section style={{ display: "grid", gap: 20, gridTemplateColumns: "1fr 1fr" }}>
        <InfoCard title="产品关键字段">
          <div style={{ display: "grid", gap: 12 }}>
            {product.id === "product_4"
              ? [
                  ["缴费方式", "5年 / 10年"],
                  ["主要利益", "现金价值、红利、保单贷款"],
                  ["注意事项", "红利属于非保证利益，需以官方文件为准"],
                ].map(([label, value]) => (
                  <div key={label} style={metaItemStyle}>
                    <strong>{label}</strong>
                    <div style={{ marginTop: 6, color: "#71829f" }}>{value}</div>
                  </div>
                ))
              : [
                  ["保障地区", product.id === "product_2" ? "全球" : "亚洲及指定地区"],
                  ["年度限额", product.id === "product_2" ? "HKD 30M" : "HKD 25M"],
                  ["病房级别", product.id === "product_2" ? "私家 / 半私家" : "半私家"],
                ].map(([label, value]) => (
                  <div key={label} style={metaItemStyle}>
                    <strong>{label}</strong>
                    <div style={{ marginTop: 6, color: "#71829f" }}>{value}</div>
                  </div>
                ))}
          </div>
        </InfoCard>

        <InfoCard title="关联文件">
          <div style={{ display: "grid", gap: 12 }}>
            {(product.id === "product_2"
              ? ["A公司高端医疗条款.pdf", "A公司高端医疗产品小册子.pdf"]
              : product.id === "product_3"
                ? ["B公司医疗险小册子.pdf", "B公司优惠通告.pdf"]
                : ["匠心飞越产品小册子.pdf", "储蓄计划利益说明.pdf"]
            ).map((file) => (
              <div key={file} style={metaItemStyle}>
                <strong>{file}</strong>
                <div style={{ marginTop: 6, color: "#71829f" }}>用于产品详情、产品对比和 FAQ 引用。</div>
              </div>
            ))}
          </div>
        </InfoCard>
      </section>

      <InfoCard title="版本历史">
        <DataTable headers={["版本号", "发布日期", "生效日期", "失效日期", "状态", "关联文件数"]} rows={toRows(versions)} gridTemplateColumns="0.8fr 1fr 1fr 1fr 0.8fr 0.9fr" />
      </InfoCard>
    </PageShell>
  );
}
