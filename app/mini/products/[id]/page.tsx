import { notFound } from "next/navigation";
import { CitationCard, MiniCard, MiniShell } from "../../../../components/mini-shell";
import { miniCitations, miniProducts } from "@/src/data";

export default function MiniProductDetailPage({ params }: { params: { id: string } }) {
  const product = miniProducts.find((item) => item.id === params.id);
  if (!product) notFound();

  return (
    <MiniShell title={product.name} subtitle={`${product.company} · ${product.type}`} activeTab="knowledge">
      <MiniCard>
        <div style={{ display: "grid", gap: 10, color: "#16223b" }}>
          <div><strong>产品状态：</strong>{product.status}</div>
          <div><strong>主要保障 / 利益：</strong>{product.id === "product_4" ? "现金价值、红利、保单贷款" : "住院保障、年度限额、病房级别"}</div>
          <div><strong>缴费方式：</strong>{product.id === "product_4" ? "5年 / 10年" : "年缴 / 月缴"}</div>
          <div><strong>冷静期：</strong>以官方条款和计划书为准</div>
          <div><strong>退保规则：</strong>请参考产品条款和保单价值表</div>
          <div><strong>保单贷款规则：</strong>{product.id === "product_4" ? "支持按规则申请" : "不适用"}</div>
          <div><strong>注意事项：</strong>页面仅做资料展示，不构成购买建议。</div>
        </div>
        <h4 style={{ margin: "18px 0 10px", fontSize: 16, color: "#16223b" }}>引用来源</h4>
        <CitationCard
          href="/mini/citation/mini_citation_1"
          fileName={miniCitations[0].fileName}
          sourceLevel={miniCitations[0].sourceLevel}
          pageNumber={miniCitations[0].pageNumber}
          version={miniCitations[0].version}
          publishDate={miniCitations[0].publishDate}
          effectiveDate={miniCitations[0].effectiveDate}
          expiryDate={miniCitations[0].expiryDate}
        />
      </MiniCard>
    </MiniShell>
  );
}
