import { notFound } from "next/navigation";
import { ProductDetailClient } from "../../../../components/product-detail-client";
import { getAdminProducts, getProductVersions, type ProductItem, type ProductVersionItem } from "../../../../lib/api";

const fallbackProducts: Record<string, ProductItem> = {
  product_1: { id: "product_1", insuranceCompany: "A公司", name: "A公司 重疾计划", productType: "重疾险", status: "ENABLED", activeVersion: "v2026.03" },
  product_2: { id: "product_2", insuranceCompany: "A公司", name: "尊尚医疗", productType: "医疗险", status: "ENABLED", activeVersion: "v2026.03" },
  product_3: { id: "product_3", insuranceCompany: "B公司", name: "环球医疗", productType: "医疗险", status: "ENABLED", activeVersion: "v2026.02" },
  product_4: { id: "product_4", insuranceCompany: "周大福人寿", name: "匠心飞越储蓄保险计划", productType: "储蓄险 / 分红险", status: "ENABLED", activeVersion: "v2604" },
};

const fallbackVersions: Record<string, ProductVersionItem[]> = {
  product_1: [
    { id: "product_version_1", version: "v2026.03", publishDate: "2026-03-01", effectiveDate: "2026-03-15", expiryDate: "", status: "ENABLED", documentCount: 1 },
    { id: "product_version_1_old", version: "v2025.09", publishDate: "2025-09-02", effectiveDate: "2025-09-15", expiryDate: "2026-03-14", status: "ARCHIVED", documentCount: 1 },
  ],
  product_2: [{ id: "product_version_2", version: "v2026.03", publishDate: "2026-03-08", effectiveDate: "2026-03-20", expiryDate: "", status: "ENABLED", documentCount: 2 }],
  product_3: [{ id: "product_version_3", version: "v2026.02", publishDate: "2026-02-16", effectiveDate: "2026-02-28", expiryDate: "", status: "ENABLED", documentCount: 2 }],
  product_4: [
    { id: "product_version_4", version: "v2604", publishDate: "2026-04-05", effectiveDate: "2026-04-20", expiryDate: "", status: "ENABLED", documentCount: 1 },
    { id: "version_2509", version: "v2509", publishDate: "2025-09-18", effectiveDate: "2025-10-01", expiryDate: "2026-04-30", status: "ARCHIVED", documentCount: 3 },
  ],
};

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let product = fallbackProducts[id];
  let versions = fallbackVersions[id];

  if (!product || !versions) notFound();

  try {
    const [products, fetchedVersions] = await Promise.all([getAdminProducts(), getProductVersions(id)]);
    const found = products.find((item) => item.id === id);
    if (found) product = found;
    if (fetchedVersions.length > 0) versions = fetchedVersions;
  } catch {
    // 演示模式沿用本地数据。
  }

  return <ProductDetailClient initialProduct={product} initialVersions={versions} />;
}
