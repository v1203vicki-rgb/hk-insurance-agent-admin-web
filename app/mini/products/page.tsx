"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { MiniCard, MiniShell } from "../../../components/mini-shell";
import { useMiniLocale } from "../../../components/mini-locale";
import { type MiniProduct, miniProducts } from "@/src/data";
import { MINI_COMPARE_STORAGE_KEY, type MiniCompareSelection } from "../../../lib/mini-preview";

const filterMap = {
  ci: "重疾险",
  savings: "储蓄 / 分红险",
  medical: "医疗险",
} as const;

export default function MiniProductsPage() {
  const { t } = useMiniLocale();
  const [keyword, setKeyword] = useState("");
  const [filters, setFilters] = useState<string[]>([]);
  const [selected, setSelected] = useState<MiniCompareSelection[]>([]);
  const [toast, setToast] = useState("");

  useEffect(() => {
    const raw = window.localStorage.getItem(MINI_COMPARE_STORAGE_KEY);
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw) as MiniCompareSelection[];
      setSelected(parsed);
    } catch {
      setSelected([]);
    }
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 1800);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const filteredProducts = useMemo(() => {
    return miniProducts.filter((product) => {
      const text = `${t(product.name)} ${t(product.company)} ${t(product.productType)}`.toLowerCase();
      const matchedKeyword = !keyword.trim() || text.includes(keyword.trim().toLowerCase());
      const matchedType =
        filters.filter((item) => item in filterMap).length === 0 ||
        filters
          .filter((item): item is keyof typeof filterMap => item in filterMap)
          .some((filter) => product.productType.zhHans.includes(filterMap[filter]) || (product.productType.zhHant ?? "").includes(filterMap[filter]));
      const matchedPromotion = !filters.includes("promotion") || product.hasPromotion;
      const matchedStatus = !filters.includes("enabled") || product.status.zhHans.includes("启用");
      const matchedLatest = !filters.includes("latest") || product.versions.some((item) => item.isCurrent);
      return matchedKeyword && matchedType && matchedPromotion && matchedStatus && matchedLatest;
    });
  }, [filters, keyword, t]);

  const toggleCompare = (product: MiniProduct) => {
    const currentVersion = product.versions.find((item) => item.isCurrent) ?? product.versions[0];
    setSelected((prev) => {
      const exists = prev.some((item) => item.productId === product.id && item.versionId === currentVersion.id);
      let next = prev;
      if (exists) {
        next = prev.filter((item) => !(item.productId === product.id && item.versionId === currentVersion.id));
      } else {
        if (prev.length >= 4) {
          setToast(t({ zhHans: "一次最多选择 4 个产品", zhHant: "一次最多選擇 4 個產品" }));
          return prev;
        }
        next = [...prev, { productId: product.id, versionId: currentVersion.id }];
      }
      window.localStorage.setItem(MINI_COMPARE_STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  const clearSelected = () => {
    setSelected([]);
    window.localStorage.setItem(MINI_COMPARE_STORAGE_KEY, JSON.stringify([]));
  };

  return (
    <MiniShell
      title={{ zhHans: "产品页", zhHant: "產品頁" }}
      subtitle={{ zhHans: "快速查产品、问产品、加入对比", zhHant: "快速查產品、問產品、加入對比" }}
      activeTab="products"
    >
      {toast ? <Toast text={toast} /> : null}

      <MiniCard>
        <div style={searchBoxStyle}>
          <input
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            placeholder={t({ zhHans: "搜索产品名、保险公司、产品类型", zhHant: "搜索產品名、保險公司、產品類型" })}
            style={searchInputStyle}
          />
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 14 }}>
          {[
            { id: "ci", label: { zhHans: "重疾险", zhHant: "重疾險" } },
            { id: "savings", label: { zhHans: "储蓄险", zhHant: "儲蓄險" } },
            { id: "medical", label: { zhHans: "医疗险", zhHant: "醫療險" } },
            { id: "enabled", label: { zhHans: "在售", zhHant: "在售" } },
            { id: "promotion", label: { zhHans: "有优惠", zhHant: "有優惠" } },
            { id: "latest", label: { zhHans: "最新版本", zhHant: "最新版本" } },
          ].map(({ id, label }) => {
            const active = filters.includes(id);
            return (
              <button key={id} onClick={() => setFilters((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))} style={chipStyle(active)}>
                {t(label)}
              </button>
            );
          })}
        </div>
      </MiniCard>

      {filteredProducts.map((product) => {
        const currentVersion = product.versions.find((item) => item.isCurrent) ?? product.versions[0];
        const selectedNow = selected.some((item) => item.productId === product.id && item.versionId === currentVersion.id);
        return (
          <MiniCard key={product.id}>
            <div style={{ display: "grid", gap: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start" }}>
                <div>
                  <div style={{ color: "#4e76df", fontSize: 12, fontWeight: 700 }}>{t(product.company)}</div>
                  <div style={{ marginTop: 6, color: "#16223b", fontSize: 18, fontWeight: 800 }}>{t(product.name)}</div>
                </div>
                <span style={statusStyle(product.hasPromotion)}>{product.hasPromotion ? t({ zhHans: "有优惠", zhHant: "有優惠" }) : t(product.status)}</span>
              </div>
              <div style={{ color: "#71829f", fontSize: 14 }}>{t(product.productType)}</div>
              <div style={{ display: "grid", gap: 6, color: "#6d7f9c", fontSize: 12, lineHeight: 1.7 }}>
                <span>{t({ zhHans: `当前版本：${currentVersion.version}`, zhHant: `當前版本：${currentVersion.version}` })}</span>
                <span>{t({ zhHans: `生效日期：${currentVersion.effectiveDate}`, zhHant: `生效日期：${currentVersion.effectiveDate}` })}</span>
                <span>{t({ zhHans: `最近更新：${product.updatedAt}`, zhHant: `最近更新：${product.updatedAt}` })}</span>
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 4 }}>
                <Link href={`/mini/products/${product.id}`} style={ghostButtonStyle}>
                  {t({ zhHans: "查看详情", zhHant: "查看詳情" })}
                </Link>
                <Link href={`/mini/chat?productId=${product.id}&question=${encodeURIComponent(`请解释 ${t(product.name)} 的核心条款`)}`} style={ghostButtonStyle}>
                  {t({ zhHans: "问这个产品", zhHant: "問這個產品" })}
                </Link>
                <button onClick={() => toggleCompare(product)} style={solidButtonStyle(selectedNow)}>
                  {selectedNow ? t({ zhHans: "已加入对比", zhHant: "已加入對比" }) : t({ zhHans: "加入对比", zhHant: "加入對比" })}
                </button>
              </div>
            </div>
          </MiniCard>
        );
      })}

      {selected.length > 0 ? (
        <div
          style={{
            position: "sticky",
            bottom: 92,
            zIndex: 3,
            background: "#111a2d",
            color: "#fff",
            borderRadius: 22,
            padding: "14px 16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 12,
            boxShadow: "0 18px 40px rgba(17, 26, 45, 0.24)",
          }}
        >
          <div style={{ display: "grid", gap: 4 }}>
            <strong>{t({ zhHans: `已选 ${selected.length} 个产品`, zhHant: `已選 ${selected.length} 個產品` })}</strong>
            <span style={{ color: "#c7d2e6", fontSize: 12 }}>
              {selected.length < 2
                ? t({ zhHans: "至少选择 2 个产品后才能开始对比", zhHant: "至少選擇 2 個產品後才能開始對比" })
                : t({ zhHans: "可进入对比页查看资料差异", zhHant: "可進入對比頁查看資料差異" })}
            </span>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={clearSelected} style={clearButtonStyle}>
              {t({ zhHans: "清空", zhHant: "清空" })}
            </button>
            <Link
              href={selected.length >= 2 ? "/mini/compare" : "#"}
              onClick={(event) => {
                if (selected.length < 2) event.preventDefault();
              }}
              style={{
                ...startCompareButtonStyle,
                opacity: selected.length >= 2 ? 1 : 0.45,
                pointerEvents: selected.length >= 2 ? "auto" : "none",
              }}
            >
              {t({ zhHans: "开始对比", zhHant: "開始對比" })}
            </Link>
          </div>
        </div>
      ) : null}
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

const searchBoxStyle = {
  minHeight: 54,
  borderRadius: 18,
  background: "#f4f8fe",
  border: "1px solid #dbe5f2",
  display: "grid",
  alignItems: "center",
  padding: "0 16px",
};

const searchInputStyle = {
  border: 0,
  outline: "none",
  background: "transparent",
  fontSize: 14,
  color: "#16223b",
};

const chipStyle = (active: boolean) => ({
  border: 0,
  minHeight: 32,
  padding: "0 14px",
  borderRadius: 999,
  background: active ? "#111a2d" : "#eef4ff",
  color: active ? "#fff" : "#4e76df",
  fontSize: 12,
  fontWeight: 700,
});

const ghostButtonStyle = {
  minHeight: 38,
  padding: "0 14px",
  borderRadius: 14,
  border: "1px solid #dbe5f2",
  background: "#f7faff",
  color: "#16223b",
  display: "inline-flex",
  alignItems: "center",
  textDecoration: "none",
  fontWeight: 700,
  fontSize: 13,
};

const solidButtonStyle = (active: boolean) => ({
  border: 0,
  minHeight: 38,
  padding: "0 14px",
  borderRadius: 14,
  background: active ? "#dfe9ff" : "#111a2d",
  color: active ? "#214cb8" : "#fff",
  fontWeight: 700,
  fontSize: 13,
});

const clearButtonStyle = {
  border: "1px solid rgba(255,255,255,0.2)",
  minHeight: 38,
  padding: "0 14px",
  borderRadius: 14,
  background: "transparent",
  color: "#fff",
  fontWeight: 700,
};

const startCompareButtonStyle = {
  minHeight: 38,
  padding: "0 14px",
  borderRadius: 14,
  background: "#ffffff",
  color: "#16223b",
  display: "inline-flex",
  alignItems: "center",
  textDecoration: "none",
  fontWeight: 800,
};

const statusStyle = (promotion: boolean) => ({
  minHeight: 28,
  padding: "0 12px",
  borderRadius: 999,
  background: promotion ? "#fff7dd" : "#e8fbf0",
  color: promotion ? "#b47800" : "#0f9f6e",
  display: "inline-flex",
  alignItems: "center",
  fontSize: 12,
  fontWeight: 700,
});
