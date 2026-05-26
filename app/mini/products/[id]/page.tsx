"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CitationCard, MiniCard, MiniShell } from "../../../../components/mini-shell";
import { useMiniLocale } from "../../../../components/mini-locale";
import { getMiniCitation, getMiniProduct } from "@/src/data";
import { MINI_COMPARE_STORAGE_KEY, type MiniCompareSelection } from "../../../../lib/mini-preview";

export default function MiniProductDetailPage({ params }: { params: { id: string } }) {
  const { t } = useMiniLocale();
  const product = getMiniProduct(params.id);
  const [toast, setToast] = useState("");

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 1800);
    return () => window.clearTimeout(timer);
  }, [toast]);

  if (!product) {
    return (
      <MiniShell title={{ zhHans: "产品详情", zhHant: "產品詳情" }} activeTab="products">
        <MiniCard>
          <div style={{ color: "#6d7f9c" }}>未找到对应产品。</div>
        </MiniCard>
      </MiniShell>
    );
  }

  const version = product.versions.find((item) => item.isCurrent) ?? product.versions[0];
  const citations = Object.values(version.compareFields)
    .map((item) => getMiniCitation(item.citationId))
    .filter((item, index, array) => item && array.findIndex((candidate) => candidate?.id === item.id) === index);

  const addToCompare = () => {
    const raw = window.localStorage.getItem(MINI_COMPARE_STORAGE_KEY);
    let parsed: MiniCompareSelection[] = [];
    try {
      parsed = raw ? (JSON.parse(raw) as MiniCompareSelection[]) : [];
    } catch {
      parsed = [];
    }

    const exists = parsed.some((item) => item.productId === product.id && item.versionId === version.id);
    if (exists) {
      setToast("该产品已在对比列表中");
      return;
    }
    if (parsed.length >= 4) {
      setToast("一次最多选择 4 个产品");
      return;
    }

    const next = [...parsed, { productId: product.id, versionId: version.id }];
    window.localStorage.setItem(MINI_COMPARE_STORAGE_KEY, JSON.stringify(next));
    setToast("已加入对比");
  };

  const faqQuestions = [
    `请解释 ${t(product.name)} 的冷静期`,
    `请解释 ${t(product.name)} 是否支持保单贷款`,
    `请解释 ${t(product.name)} 的退保影响`,
    `请解释 ${t(product.name)} 当前优惠是否有效`,
  ];

  return (
    <MiniShell
      title={product.name}
      subtitle={{ zhHans: `${t(product.company)} · ${t(product.productType)}`, zhHant: `${t(product.company)} · ${t(product.productType)}` }}
      activeTab="products"
    >
      {toast ? <Toast text={toast} /> : null}

      <MiniCard>
        <div style={{ display: "grid", gap: 10, color: "#16223b" }}>
          <Row label="产品名称" value={t(product.name)} />
          <Row label="保险公司" value={t(product.company)} />
          <Row label="产品类型" value={t(product.productType)} />
          <Row label="当前版本" value={version.version} />
          <Row label="生效日期" value={version.effectiveDate} />
          <Row label="资料状态" value={t(product.status)} />
        </div>
      </MiniCard>

      <MiniCard>
        <h3 style={cardTitleStyle}>核心信息摘要</h3>
        <div style={{ display: "grid", gap: 10, marginTop: 14, color: "#16223b" }}>
          <Row label="保障范围 / 主要利益" value={t(product.summary)} />
          <Row label="等待期" value={version.compareFields.waitingPeriod?.value ?? "不适用"} />
          <Row label="冷静期" value={version.compareFields.coolOffPeriod?.value ?? "不适用"} />
          <Row label="退保规则" value={version.compareFields.surrender?.value ?? "不适用"} />
          <Row label="保单贷款" value={version.compareFields.policyLoan?.value ?? "不适用"} />
          <Row label="优惠政策" value={version.compareFields.promotion?.value ?? "当前无已启用优惠"} />
        </div>
      </MiniCard>

      <MiniCard>
        <h3 style={cardTitleStyle}>常见问题</h3>
        <div style={{ display: "grid", gap: 10, marginTop: 14 }}>
          {faqQuestions.map((question) => (
            <Link key={question} href={`/mini/chat?productId=${product.id}&question=${encodeURIComponent(question)}`} style={faqLinkStyle}>
              {question}
            </Link>
          ))}
        </div>
      </MiniCard>

      <MiniCard>
        <h3 style={cardTitleStyle}>关联资料</h3>
        <div style={{ display: "grid", gap: 12, marginTop: 14 }}>
          {citations.map((citation) => (
            <CitationCard key={citation!.id} href={`/mini/citation/${citation!.id}`} citation={citation!} />
          ))}
        </div>
      </MiniCard>

      <MiniCard>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Link href={`/mini/chat?productId=${product.id}&question=${encodeURIComponent(`请解释 ${t(product.name)} 的核心条款`)}`} style={primaryButtonStyle}>
            问这个产品
          </Link>
          <button onClick={addToCompare} style={secondaryButtonStyle}>
            加入对比
          </button>
          <Link href={citations[0] ? `/mini/citation/${citations[0].id}` : "/mini/products"} style={secondaryLinkStyle}>
            查看来源
          </Link>
        </div>
      </MiniCard>
    </MiniShell>
  );
}

function Toast({ text }: { text: string }) {
  return (
    <div style={{ position: "sticky", top: 10, zIndex: 4, display: "grid", justifyItems: "center" }}>
      <div style={{ background: "#111a2d", color: "#fff", borderRadius: 999, padding: "10px 16px", fontSize: 12 }}>{text}</div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", gap: 16, fontSize: 14, lineHeight: 1.7 }}>
      <strong style={{ minWidth: 92 }}>{label}</strong>
      <span style={{ color: "#5d708d", textAlign: "right" }}>{value}</span>
    </div>
  );
}

const cardTitleStyle = { margin: 0, fontSize: 18, color: "#16223b" };

const faqLinkStyle = {
  display: "block",
  padding: "14px 16px",
  borderRadius: 16,
  background: "#f7faff",
  color: "#16223b",
  textDecoration: "none",
  lineHeight: 1.6,
};

const primaryButtonStyle = {
  minHeight: 42,
  padding: "0 16px",
  borderRadius: 14,
  background: "#111a2d",
  color: "#fff",
  display: "inline-flex",
  alignItems: "center",
  textDecoration: "none",
  fontWeight: 700,
};

const secondaryButtonStyle = {
  border: "1px solid #dbe5f2",
  minHeight: 42,
  padding: "0 16px",
  borderRadius: 14,
  background: "#f7faff",
  color: "#16223b",
  fontWeight: 700,
};

const secondaryLinkStyle = {
  minHeight: 42,
  padding: "0 16px",
  borderRadius: 14,
  background: "#eef4ff",
  color: "#4e76df",
  display: "inline-flex",
  alignItems: "center",
  textDecoration: "none",
  fontWeight: 700,
};
