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
          <div style={{ color: "#6d7f9c" }}>{t({ zhHans: "未找到对应产品。", zhHant: "未找到對應產品。" })}</div>
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
      setToast(t({ zhHans: "该产品已在对比列表中", zhHant: "該產品已在對比列表中" }));
      return;
    }
    if (parsed.length >= 4) {
      setToast(t({ zhHans: "一次最多选择 4 个产品", zhHant: "一次最多選擇 4 個產品" }));
      return;
    }

    const next = [...parsed, { productId: product.id, versionId: version.id }];
    window.localStorage.setItem(MINI_COMPARE_STORAGE_KEY, JSON.stringify(next));
    setToast(t({ zhHans: "已加入对比", zhHant: "已加入對比" }));
  };

  return (
    <MiniShell
      title={product.name}
      subtitle={{ zhHans: `${t(product.company)} · ${t(product.productType)}`, zhHant: `${t(product.company)} · ${t(product.productType)}` }}
      activeTab="products"
    >
      {toast ? <Toast text={toast} /> : null}

      <MiniCard>
        <div style={{ display: "grid", gap: 10, color: "#16223b" }}>
          <Row label={t({ zhHans: "产品名称", zhHant: "產品名稱" })} value={t(product.name)} />
          <Row label={t({ zhHans: "保险公司", zhHant: "保險公司" })} value={t(product.company)} />
          <Row label={t({ zhHans: "产品类型", zhHant: "產品類型" })} value={t(product.productType)} />
          <Row label={t({ zhHans: "当前版本", zhHant: "當前版本" })} value={version.version} />
          <Row label={t({ zhHans: "生效日期", zhHant: "生效日期" })} value={version.effectiveDate} />
          <Row label={t({ zhHans: "资料状态", zhHant: "資料狀態" })} value={t(product.status)} />
        </div>
      </MiniCard>

      <MiniCard>
        <h3 style={cardTitleStyle}>{t({ zhHans: "核心信息摘要", zhHant: "核心信息摘要" })}</h3>
        <div style={{ display: "grid", gap: 10, marginTop: 14, color: "#16223b" }}>
          <Row label={t({ zhHans: "保障范围 / 主要利益", zhHant: "保障範圍 / 主要利益" })} value={t(product.summary)} />
          <Row label={t({ zhHans: "等待期", zhHant: "等待期" })} value={version.compareFields.waitingPeriod?.value ?? "—"} />
          <Row label={t({ zhHans: "冷静期", zhHant: "冷靜期" })} value={version.compareFields.coolOffPeriod?.value ?? "—"} />
          <Row label={t({ zhHans: "退保规则", zhHant: "退保規則" })} value={version.compareFields.surrender?.value ?? "—"} />
          <Row label={t({ zhHans: "保单贷款", zhHant: "保單貸款" })} value={version.compareFields.policyLoan?.value ?? "—"} />
          <Row label={t({ zhHans: "优惠政策", zhHant: "優惠政策" })} value={version.compareFields.promotion?.value ?? "—"} />
        </div>
      </MiniCard>

      <MiniCard>
        <h3 style={cardTitleStyle}>{t({ zhHans: "常见问题", zhHant: "常見問題" })}</h3>
        <div style={{ display: "grid", gap: 10, marginTop: 14 }}>
          {[
            `请解释 ${t(product.name)} 的冷静期`,
            `请解释 ${t(product.name)} 是否支持保单贷款`,
            `请解释 ${t(product.name)} 的退保影响`,
            `请解释 ${t(product.name)} 当前优惠是否有效`,
          ].map((question) => (
            <Link key={question} href={`/mini/chat?productId=${product.id}&question=${encodeURIComponent(question)}`} style={faqLinkStyle}>
              {question}
            </Link>
          ))}
        </div>
      </MiniCard>

      <MiniCard>
        <h3 style={cardTitleStyle}>{t({ zhHans: "关联资料", zhHant: "關聯資料" })}</h3>
        <div style={{ display: "grid", gap: 12, marginTop: 14 }}>
          {citations.map((citation) => (
            <CitationCard key={citation!.id} href={`/mini/citation/${citation!.id}`} citation={citation!} />
          ))}
        </div>
      </MiniCard>

      <MiniCard>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Link href={`/mini/chat?productId=${product.id}&question=${encodeURIComponent(`请解释 ${t(product.name)} 的核心条款`)}`} style={primaryButtonStyle}>
            {t({ zhHans: "问这个产品", zhHant: "問這個產品" })}
          </Link>
          <button onClick={addToCompare} style={secondaryButtonStyle}>
            {t({ zhHans: "加入对比", zhHant: "加入對比" })}
          </button>
          <Link href={citations[0] ? `/mini/citation/${citations[0].id}` : "/mini/products"} style={secondaryLinkStyle}>
            {t({ zhHans: "查看来源", zhHant: "查看來源" })}
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
