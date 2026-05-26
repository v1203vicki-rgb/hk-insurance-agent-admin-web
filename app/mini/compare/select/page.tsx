"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { MiniCard, MiniShell } from "../../../../components/mini-shell";
import { useMiniLocale } from "../../../../components/mini-locale";
import { getMiniProduct, miniProducts } from "@/src/data";
import { MINI_COMPARE_STORAGE_KEY, getDefaultMiniCompareSelection, type MiniCompareSelection } from "../../../../lib/mini-preview";

export default function MiniCompareSelectPage() {
  const { t } = useMiniLocale();
  const [selection, setSelection] = useState<MiniCompareSelection[]>([]);
  const [company, setCompany] = useState(miniProducts[0]?.company.zhHans ?? "");
  const [productId, setProductId] = useState(miniProducts[0]?.id ?? "");
  const [versionId, setVersionId] = useState(miniProducts[0]?.versions[0]?.id ?? "");
  const [toast, setToast] = useState("");

  useEffect(() => {
    const raw = window.localStorage.getItem(MINI_COMPARE_STORAGE_KEY);
    if (!raw) {
      const defaults = getDefaultMiniCompareSelection();
      setSelection(defaults);
      window.localStorage.setItem(MINI_COMPARE_STORAGE_KEY, JSON.stringify(defaults));
      return;
    }
    try {
      setSelection(JSON.parse(raw) as MiniCompareSelection[]);
    } catch {
      const defaults = getDefaultMiniCompareSelection();
      setSelection(defaults);
      window.localStorage.setItem(MINI_COMPARE_STORAGE_KEY, JSON.stringify(defaults));
    }
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 1800);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const companyOptions = useMemo(() => Array.from(new Set(miniProducts.map((item) => item.company.zhHans))), []);
  const productOptions = useMemo(() => miniProducts.filter((item) => item.company.zhHans === company), [company]);
  const versionOptions = useMemo(() => getMiniProduct(productId)?.versions ?? [], [productId]);
  const currentVersion = versionOptions.find((item) => item.id === versionId) ?? versionOptions[0];

  useEffect(() => {
    if (!productOptions.length) return;
    const nextProduct = productOptions.find((item) => item.id === productId) ?? productOptions[0];
    setProductId(nextProduct.id);
    const nextVersion = nextProduct.versions.find((item) => item.id === versionId) ?? nextProduct.versions[0];
    setVersionId(nextVersion.id);
  }, [company]);

  const persist = (next: MiniCompareSelection[]) => {
    setSelection(next);
    window.localStorage.setItem(MINI_COMPARE_STORAGE_KEY, JSON.stringify(next));
  };

  const addProduct = () => {
    if (!currentVersion) return;
    const exists = selection.some((item) => item.productId === productId && item.versionId === currentVersion.id);
    if (exists) {
      setToast(t({ zhHans: "这个版本已在对比列表中", zhHant: "這個版本已在對比列表中" }));
      return;
    }
    if (selection.length >= 4) {
      setToast(t({ zhHans: "不建议一次对比超过 4 个产品", zhHant: "不建議一次對比超過 4 個產品" }));
      return;
    }
    persist([...selection, { productId, versionId: currentVersion.id }]);
  };

  const removeProduct = (item: MiniCompareSelection) => {
    persist(selection.filter((current) => !(current.productId === item.productId && current.versionId === item.versionId)));
  };

  return (
    <MiniShell
      title={{ zhHans: "选择产品", zhHant: "選擇產品" }}
      subtitle={{ zhHans: "选择保险公司、产品和版本后生成客观对比", zhHant: "選擇保險公司、產品和版本後生成客觀對比" }}
      activeTab="products"
    >
      {toast ? <Toast text={toast} /> : null}

      <MiniCard>
        <h3 style={sectionTitleStyle}>{t({ zhHans: "已选产品", zhHant: "已選產品" })}</h3>
        <div style={{ display: "grid", gap: 12, marginTop: 14 }}>
          {selection.map((item) => {
            const product = getMiniProduct(item.productId);
            const version = product?.versions.find((current) => current.id === item.versionId);
            if (!product || !version) return null;

            return (
              <div key={`${item.productId}-${item.versionId}`} style={selectedCardStyle}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                  <div>
                    <div style={{ color: "#4e76df", fontSize: 12, fontWeight: 700 }}>{t(product.company)}</div>
                    <div style={{ marginTop: 6, color: "#16223b", fontSize: 16, fontWeight: 800 }}>{t(product.name)}</div>
                  </div>
                  <button onClick={() => removeProduct(item)} style={removeButtonStyle}>
                    {t({ zhHans: "删除", zhHant: "刪除" })}
                  </button>
                </div>
                <div style={{ display: "grid", gap: 4, marginTop: 10, color: "#6d7f9c", fontSize: 12, lineHeight: 1.7 }}>
                  <span>{t(product.productType)}</span>
                  <span>{t({ zhHans: `版本号：${version.version}`, zhHant: `版本號：${version.version}` })}</span>
                  <span>{t({ zhHans: `生效日期：${version.effectiveDate}`, zhHant: `生效日期：${version.effectiveDate}` })}</span>
                  {version.isCurrent ? <span style={{ color: "#0f9f6e" }}>{t({ zhHans: "当前启用版本", zhHant: "當前啟用版本" })}</span> : null}
                </div>
              </div>
            );
          })}
        </div>

        {selection.length < 2 ? (
          <div style={hintStyle}>{t({ zhHans: "至少选择两个产品", zhHant: "至少選擇兩個產品" })}</div>
        ) : null}
        {selection.length > 4 ? <div style={{ ...hintStyle, background: "#fff7dd", color: "#b47800" }}>{t({ zhHans: "不建议一次对比超过 4 个产品", zhHant: "不建議一次對比超過 4 個產品" })}</div> : null}
      </MiniCard>

      <MiniCard>
        <h3 style={sectionTitleStyle}>{t({ zhHans: "添加产品", zhHant: "添加產品" })}</h3>
        <div style={{ display: "grid", gap: 12, marginTop: 14 }}>
          <SelectField label={t({ zhHans: "选择保险公司", zhHant: "選擇保險公司" })} value={company} onChange={setCompany} options={companyOptions} />
          <SelectField
            label={t({ zhHans: "选择产品", zhHant: "選擇產品" })}
            value={productId}
            onChange={setProductId}
            options={productOptions.map((item) => ({ label: t(item.name), value: item.id }))}
          />
          <SelectField
            label={t({ zhHans: "选择版本", zhHant: "選擇版本" })}
            value={versionId}
            onChange={setVersionId}
            options={versionOptions.map((item) => ({
              label: `${item.version}${item.isCurrent ? ` · ${t({ zhHans: "当前", zhHant: "當前" })}` : ""}`,
              value: item.id,
            }))}
          />
        </div>

        {currentVersion && !currentVersion.isCurrent ? (
          <div style={{ ...hintStyle, marginTop: 14, background: "#fff7dd", color: "#b47800" }}>
            {t({ zhHans: "当前选择为历史版本，请确认是否继续对比。", zhHant: "當前選擇為歷史版本，請確認是否繼續對比。" })}
          </div>
        ) : null}

        <button onClick={addProduct} style={{ ...confirmButtonStyle, marginTop: 16 }}>
          {t({ zhHans: "添加产品", zhHant: "添加產品" })}
        </button>
      </MiniCard>

      <Link
        href={selection.length >= 2 ? "/mini/compare" : "#"}
        onClick={(event) => {
          if (selection.length < 2) event.preventDefault();
        }}
        style={{
          ...compareButtonStyle,
          opacity: selection.length >= 2 ? 1 : 0.45,
          pointerEvents: selection.length >= 2 ? "auto" : "none",
        }}
      >
        {t({ zhHans: "生成对比", zhHant: "生成對比" })}
      </Link>
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

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<string> | Array<{ label: string; value: string }>;
}) {
  const normalized = options.map((item) => (typeof item === "string" ? { label: item, value: item } : item));
  return (
    <label style={{ display: "grid", gap: 8 }}>
      <span style={{ color: "#71829f", fontSize: 12 }}>{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)} style={selectStyle}>
        {normalized.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

const sectionTitleStyle = { margin: 0, fontSize: 18, color: "#16223b" };

const selectedCardStyle = {
  padding: 16,
  borderRadius: 18,
  background: "#f7faff",
  border: "1px solid #dbe5f2",
};

const removeButtonStyle = {
  border: 0,
  minHeight: 32,
  padding: "0 12px",
  borderRadius: 999,
  background: "#fff1f2",
  color: "#dc2626",
  fontWeight: 700,
  fontSize: 12,
};

const hintStyle = {
  marginTop: 14,
  padding: 12,
  borderRadius: 16,
  background: "#eef4ff",
  color: "#4e76df",
  fontSize: 12,
  lineHeight: 1.7,
};

const selectStyle = {
  minHeight: 50,
  borderRadius: 16,
  border: "1px solid #dbe5f2",
  background: "#f7faff",
  padding: "0 14px",
  color: "#16223b",
  fontSize: 14,
};

const confirmButtonStyle = {
  width: "100%",
  minHeight: 48,
  borderRadius: 16,
  border: 0,
  background: "#111a2d",
  color: "#fff",
  fontWeight: 800,
};

const compareButtonStyle = {
  minHeight: 52,
  borderRadius: 18,
  background: "#111a2d",
  color: "#fff",
  display: "grid",
  placeItems: "center",
  fontWeight: 800,
  textDecoration: "none",
};
