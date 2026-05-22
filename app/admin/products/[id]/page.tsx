import { ProductDetailClient } from "../../../../components/product-detail-client";
import { getAdminProducts, getProductVersions, type ProductItem, type ProductVersionItem } from "../../../../lib/api";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let product: ProductItem = {
    id,
    insuranceCompany: "周大福人寿",
    name: "匠心飞越储蓄保险计划",
    productType: "SAVINGS",
    status: "ENABLED",
    activeVersion: "v2604",
  };

  let versions: ProductVersionItem[] = [
    {
      id: "version_2604",
      version: "v2604",
      publishDate: "2026-04-15",
      effectiveDate: "2026-05-01",
      expiryDate: "",
      status: "ENABLED",
      documentCount: 4,
    },
    {
      id: "version_2509",
      version: "v2509",
      publishDate: "2025-09-18",
      effectiveDate: "2025-10-01",
      expiryDate: "2026-04-30",
      status: "ARCHIVED",
      documentCount: 3,
    },
  ];

  try {
    const [products, fetchedVersions] = await Promise.all([getAdminProducts(), getProductVersions(id)]);
    const found = products.find((item) => item.id === id);
    if (found) product = found;
    versions = fetchedVersions;
  } catch {
    // Fall back to local detail.
  }

  return <ProductDetailClient initialProduct={product} initialVersions={versions} />;
}
