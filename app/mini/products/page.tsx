import Link from "next/link";
import { MiniCard, MiniShell } from "../../../components/mini-shell";
import { miniProducts } from "@/src/data";

export default function MiniProductsPage() {
  return (
    <MiniShell title="产品列表" subtitle="仅展示产品资料与版本状态，不作推荐" activeTab="knowledge">
      {miniProducts.map((product) => (
        <Link key={product.id} href={`/mini/products/${product.id}`}>
          <MiniCard>
            <div style={{ display: "grid", gap: 8 }}>
              <div style={{ color: "#4e76df", fontSize: 12, fontWeight: 700 }}>{product.company}</div>
              <div style={{ color: "#16223b", fontSize: 18, fontWeight: 800 }}>{product.name}</div>
              <div style={{ color: "#71829f" }}>{product.type}</div>
              <div style={{ color: "#6d7f9c", fontSize: 12 }}>{product.status}</div>
            </div>
          </MiniCard>
        </Link>
      ))}
    </MiniShell>
  );
}
