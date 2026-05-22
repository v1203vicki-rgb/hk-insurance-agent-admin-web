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
    <StatusBadge key={`${item.id}-status`} label={item.status} />,
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
      description="查看当前启用版本、版本历史和关联文件数量，统一控制 Agent 使用版本。"
      actions={
        <Link href="/admin/products" style={{ color: "#1b2740", fontWeight: 700 }}>
          返回产品列表
        </Link>
      }
    >
      <section style={{ display: "grid", gap: 20, gridTemplateColumns: "0.9fr 1.1fr" }}>
        <InfoCard title="产品基础信息" description={`${product.insuranceCompany} / ${product.name}`}>
          <div style={{ display: "grid", gap: 12 }}>
            {[
              ["产品类型", product.productType],
              ["当前启用版本", product.activeVersion],
              ["产品状态", product.status],
              ["产品 ID", product.id],
            ].map(([label, value]) => (
              <div key={label} style={metaItemStyle}>
                <strong style={{ color: "#172036" }}>{label}</strong>
                <div style={{ marginTop: 6, color: "#71829f" }}>{value}</div>
              </div>
            ))}
          </div>
        </InfoCard>

        <InfoCard title="切换启用版本" description="切换后会同步更新摘要区、版本状态和后续问答使用版本。">
          <ProductVersionSwitcher
            productId={product.id}
            versions={versions}
            initialActiveVersion={product.activeVersion}
            onUpdated={({ activeVersion }) => {
              setProduct((current) => ({ ...current, activeVersion }));
              setVersions((current) =>
                current.map((item) =>
                  item.version === activeVersion ? { ...item, status: "ENABLED" } : item.status === "ENABLED" ? { ...item, status: "ARCHIVED" } : item,
                ),
              );
            }}
          />
        </InfoCard>
      </section>

      <InfoCard title="版本历史">
        <DataTable
          headers={["版本号", "发布日期", "生效日期", "失效日期", "状态", "关联文件数"]}
          rows={toRows(versions)}
          gridTemplateColumns="0.8fr 1fr 1fr 1fr 0.8fr 0.9fr"
        />
      </InfoCard>
    </PageShell>
  );
}
