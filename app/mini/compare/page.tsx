"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { MiniCard, MiniShell } from "../../../components/mini-shell";
import { useMiniLocale } from "../../../components/mini-locale";
import { getMiniCitation, miniCompareFieldMeta } from "@/src/data";
import { MINI_COMPARE_STORAGE_KEY, getDefaultMiniCompareSelection, resolveMiniCompareSelection, type MiniCompareSelection } from "../../../lib/mini-preview";

export default function MiniComparePage() {
  const { locale, t } = useMiniLocale();
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
            value: localizeCompareValue(fixedFieldValue.value, locale),
            citation: getMiniCitation(fixedFieldValue.citationId),
          }
        : { value: locale === "ZH_HANT" ? "不適用" : "不适用", citation: undefined };
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
        <div style={heroStripStyle}>
          <div>
            <div style={{ color: "#16223b", fontSize: 18, fontWeight: 800 }}>{t({ zhHans: "对比概览", zhHant: "對比概覽" })}</div>
            <div style={{ marginTop: 6, color: "#71829f", fontSize: 12 }}>{t({ zhHans: `当前展示 ${products.length} 个产品的资料差异`, zhHant: `當前展示 ${products.length} 個產品的資料差異` })}</div>
          </div>
          <Link href="/mini/compare/select" style={backSelectStyle}>
            {t({ zhHans: "重新选择", zhHant: "重新選擇" })}
          </Link>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 14 }}>
          {products.map(({ product, version }) => (
            <div key={`${product.id}-${version.id}`} style={selectedPillStyle}>
              {t(product.company)} · {t(product.name)} · {version.version}
            </div>
          ))}
        </div>
      </MiniCard>

      <MiniCard>
        <h3 style={sectionTitleStyle}>{t({ zhHans: "客观对比表", zhHant: "客觀對比表" })}</h3>
        <div style={{ display: "grid", gap: 12, marginTop: 14 }}>
          {rows.map((row) => (
            <div key={row.field.key} style={rowCardStyle}>
              <div style={{ color: "#16223b", fontWeight: 800 }}>{t(row.field.label)}</div>
              <div style={{ display: "grid", gap: 10, marginTop: 12 }}>
                {row.values.map((item, index) => {
                  const label = products[index] ? `${t(products[index].product.company)} · ${t(products[index].product.name)}` : t({ zhHans: `产品 ${index + 1}`, zhHant: `產品 ${index + 1}` });
                  return (
                    <div key={`${row.field.key}-${label}`} style={cellCardStyle}>
                      <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                        <strong style={{ color: "#4e76df", fontSize: 12 }}>{label}</strong>
                        {item.citation ? (
                          <Link href={`/mini/citation/${item.citation.id}`} style={citationLinkStyle}>
                            {t({ zhHans: "查看来源", zhHant: "查看來源" })}
                          </Link>
                        ) : null}
                      </div>
                      <div style={{ marginTop: 8, color: "#16223b", lineHeight: 1.6 }}>{item.value}</div>
                      {item.citation ? <div style={{ marginTop: 6, color: "#90a1ba", fontSize: 12 }}>{t({ zhHans: `页码 P.${item.citation.pageNumber}`, zhHant: `頁碼 P.${item.citation.pageNumber}` })}</div> : null}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </MiniCard>

      <MiniCard>
        <h3 style={sectionTitleStyle}>{t({ zhHans: "差异说明", zhHant: "差異說明" })}</h3>
        <ul style={{ margin: "14px 0 0", paddingLeft: 18, color: "#4b5c78", lineHeight: 1.9 }}>
          <li>{t({ zhHans: "A公司产品保障地区更广，B公司产品更聚焦亚洲及指定地区。", zhHant: "A公司產品保障地區更廣，B公司產品更聚焦亞洲及指定地區。" })}</li>
          <li>{t({ zhHans: "病房级别、自付额和共同保险设计不同，适合经纪人先核对计划书及条款页。", zhHant: "病房級別、自付額和共同保險設計不同，適合經紀人先核對計劃書及條款頁。" })}</li>
          <li>{t({ zhHans: "若出现历史优惠，只能作为历史资料参考，不能直接沿用为当前口径。", zhHant: "若出現歷史優惠，只能作為歷史資料參考，不能直接沿用為當前口徑。" })}</li>
        </ul>
        <div style={noticeStyle}>{t({ zhHans: "仅列资料差异，不构成购买建议。具体以官方文件及持牌顾问说明为准。", zhHant: "僅列資料差異，不構成購買建議。具體以官方文件及持牌顧問說明為準。" })}</div>
      </MiniCard>
    </MiniShell>
  );
}

function localizeCompareValue(value: string, locale: "ZH_HANS" | "ZH_HANT") {
  if (locale === "ZH_HANS") return value;

  const dictionary: Record<string, string> = {
    全球: "全球",
    "亚洲及指定地区": "亞洲及指定地區",
    "私家房 / 半私家房": "私家房 / 半私家房",
    半私家房: "半私家房",
    可选: "可選",
    固定档: "固定檔",
    "视计划而定": "視計劃而定",
    "30日": "30日",
    "21日": "21日",
    "按核保结果处理": "按核保結果處理",
    "无现金价值": "無現金價值",
    不适用: "不適用",
    "当前无已启用优惠": "當前無已啟用優惠",
    "历史优惠至 2026-03-31": "歷史優惠至 2026-03-31",
  };

  return dictionary[value] ?? value;
}

const sectionTitleStyle = { margin: 0, fontSize: 18, color: "#16223b" };

const heroStripStyle = {
  display: "flex",
  justifyContent: "space-between",
  gap: 12,
  alignItems: "center",
  padding: 14,
  borderRadius: 18,
  background: "#f8fbff",
  border: "1px solid #dbe5f2",
};

const backSelectStyle = {
  minHeight: 36,
  padding: "0 14px",
  borderRadius: 999,
  background: "#eef4ff",
  color: "#4e76df",
  textDecoration: "none",
  display: "inline-flex",
  alignItems: "center",
  fontSize: 12,
  fontWeight: 700,
};

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
