"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { MiniCard, MiniShell } from "../../../components/mini-shell";
import { useMiniLocale } from "../../../components/mini-locale";
import { getMiniCitation, miniCompareFieldMeta } from "@/src/data";
import { MINI_COMPARE_STORAGE_KEY, getDefaultMiniCompareSelection, resolveMiniCompareSelection, type MiniCompareSelection } from "../../../lib/mini-preview";

export default function MiniComparePage() {
  const { t } = useMiniLocale();
  const [selection, setSelection] = useState<MiniCompareSelection[]>(getDefaultMiniCompareSelection());

  useEffect(() => {
    const raw = window.localStorage.getItem(MINI_COMPARE_STORAGE_KEY);
    if (!raw) return;
    try {
      setSelection(JSON.parse(raw) as MiniCompareSelection[]);
    } catch {
      setSelection(getDefaultMiniCompareSelection());
    }
  }, []);

  const products = useMemo(() => resolveMiniCompareSelection(selection).slice(0, 4), [selection]);

  const rows = miniCompareFieldMeta.map((field) => {
    const values = products.map(({ product, version }) => {
      const fixedFieldValue =
        field.key === "company"
          ? { value: t(product.company), citationId: version.compareFields.company?.citationId ?? Object.values(version.compareFields)[0]?.citationId }
          : field.key === "productName"
            ? { value: t(product.name), citationId: version.compareFields.productName?.citationId ?? Object.values(version.compareFields)[0]?.citationId }
            : field.key === "productType"
              ? { value: t(product.productType), citationId: version.compareFields.productType?.citationId ?? Object.values(version.compareFields)[0]?.citationId }
              : field.key === "version"
                ? { value: version.version, citationId: version.compareFields.version?.citationId ?? Object.values(version.compareFields)[0]?.citationId }
                : field.key === "publishDate"
                  ? { value: version.publishDate, citationId: version.compareFields.publishDate?.citationId ?? Object.values(version.compareFields)[0]?.citationId }
                  : field.key === "effectiveDate"
                    ? { value: version.effectiveDate, citationId: version.compareFields.effectiveDate?.citationId ?? Object.values(version.compareFields)[0]?.citationId }
                    : version.compareFields[field.key];

      return fixedFieldValue
        ? {
            value: fixedFieldValue.value,
            citation: getMiniCitation(fixedFieldValue.citationId),
          }
        : { value: "不适用", citation: undefined };
    });

    return { field, values };
  });

  return (
    <MiniShell
      title={{ zhHans: "产品对比结果", zhHant: "產品對比結果" }}
      subtitle={{ zhHans: "只展示资料差异，不排名、不打分、不推荐", zhHant: "只展示資料差異，不排名、不打分、不推薦" }}
      activeTab="products"
    >
      <MiniCard>
        <h3 style={sectionTitleStyle}>已选产品</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 14 }}>
          {products.map(({ product, version }) => (
            <div key={`${product.id}-${version.id}`} style={selectedPillStyle}>
              {t(product.company)} · {t(product.name)} · {version.version}
            </div>
          ))}
        </div>
      </MiniCard>

      <MiniCard>
        <h3 style={sectionTitleStyle}>客观对比表</h3>
        <div style={{ display: "grid", gap: 12, marginTop: 14 }}>
          {rows.map((row) => (
            <div key={row.field.key} style={rowCardStyle}>
              <div style={{ color: "#16223b", fontWeight: 800 }}>{t(row.field.label)}</div>
              <div style={{ display: "grid", gap: 10, marginTop: 12 }}>
                {row.values.map((item, index) => {
                  const label = products[index] ? `${t(products[index].product.company)} · ${t(products[index].product.name)}` : `产品 ${index + 1}`;
                  return (
                    <div key={`${row.field.key}-${label}`} style={cellCardStyle}>
                      <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                        <strong style={{ color: "#4e76df", fontSize: 12 }}>{label}</strong>
                        {item.citation ? (
                          <Link href={`/mini/citation/${item.citation.id}`} style={citationLinkStyle}>
                            查看来源
                          </Link>
                        ) : null}
                      </div>
                      <div style={{ marginTop: 8, color: "#16223b", lineHeight: 1.6 }}>{item.value}</div>
                      {item.citation ? <div style={{ marginTop: 6, color: "#90a1ba", fontSize: 12 }}>页码 P.{item.citation.pageNumber}</div> : null}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </MiniCard>

      <MiniCard>
        <h3 style={sectionTitleStyle}>差异说明</h3>
        <ul style={{ margin: "14px 0 0", paddingLeft: 18, color: "#4b5c78", lineHeight: 1.9 }}>
          <li>A公司产品保障地区更广，B公司产品更聚焦亚洲及指定地区。</li>
          <li>病房级别、自付额和共同保险的设计存在差异，适合先核对计划书及官方条款。</li>
          <li>历史优惠已过期时，仅可作为历史资料参考。</li>
        </ul>
        <div style={noticeStyle}>仅列资料差异，不构成购买建议。具体以官方文件及持牌顾问说明为准。</div>
      </MiniCard>
    </MiniShell>
  );
}

const sectionTitleStyle = { margin: 0, fontSize: 18, color: "#16223b" };

const selectedPillStyle = {
  minHeight: 34,
  padding: "0 12px",
  borderRadius: 999,
  background: "#eef4ff",
  color: "#4e76df",
  display: "inline-flex",
  alignItems: "center",
  fontSize: 12,
  fontWeight: 700,
};

const rowCardStyle = {
  padding: 16,
  borderRadius: 18,
  background: "#f8fbff",
  border: "1px solid #dbe5f2",
};

const cellCardStyle = {
  padding: 14,
  borderRadius: 16,
  background: "#ffffff",
  border: "1px solid #e5edf8",
};

const citationLinkStyle = {
  color: "#4e76df",
  fontSize: 12,
  fontWeight: 700,
  textDecoration: "none",
};

const noticeStyle = {
  marginTop: 16,
  padding: 16,
  borderRadius: 16,
  background: "#fff8e8",
  color: "#b15f00",
  lineHeight: 1.8,
};
