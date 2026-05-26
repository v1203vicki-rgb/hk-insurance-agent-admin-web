"use client";

import Link from "next/link";
import { MiniCard, MiniShell } from "../../../../components/mini-shell";
import { useMiniLocale } from "../../../../components/mini-locale";
import { getFriendlySourceLevel, getMiniCitation, getMiniCitationsByFile } from "@/src/data";

export default function MiniCitationDetailPage({ params }: { params: { id: string } }) {
  const { t } = useMiniLocale();
  const citation = getMiniCitation(params.id);

  if (!citation) {
    return (
      <MiniShell title={{ zhHans: "来源详情", zhHant: "來源詳情" }} activeTab="chat">
        <MiniCard>
          <div style={{ color: "#6d7f9c" }}>{t({ zhHans: "未找到对应来源。", zhHant: "未找到對應來源。" })}</div>
        </MiniCard>
      </MiniShell>
    );
  }

  const sameFileItems = getMiniCitationsByFile(citation.fileName).filter((item) => item.id !== citation.id);
  const levelMeta = getFriendlySourceLevel(citation.sourceLevel);

  return (
    <MiniShell
      title={{ zhHans: "来源详情", zhHant: "來源詳情" }}
      subtitle={{ zhHans: "可追溯引用、版本与来源解释", zhHant: "可追溯引用、版本與來源解釋" }}
      activeTab="chat"
    >
      {citation.isExpiredPromotion ? (
        <MiniCard>
          <div style={expiredAlertStyle}>
            {t({ zhHans: "该优惠已过期，仅可作为历史资料参考，不能视为当前有效优惠。", zhHant: "該優惠已過期，僅可作為歷史資料參考，不能視為當前有效優惠。" })}
          </div>
        </MiniCard>
      ) : null}

      {citation.isTrainingMaterial ? (
        <MiniCard>
          <div style={trainingAlertStyle}>
            {t({ zhHans: "该来源为内部培训资料，具体条款、费用、利益及限制应以保险公司官方文件为准。", zhHant: "該來源為內部培訓資料，具體條款、費用、利益及限制應以保險公司官方文件為準。" })}
          </div>
        </MiniCard>
      ) : null}

      <MiniCard>
        <div style={{ display: "grid", gap: 10, color: "#16223b" }}>
          <MetaRow label={t({ zhHans: "文件名称", zhHant: "文件名稱" })} value={citation.fileName} />
          <MetaRow label={t({ zhHans: "来源类型", zhHant: "來源類型" })} value={`${levelMeta.label} (${citation.sourceLevel})`} />
          <MetaRow label={t({ zhHans: "页码", zhHant: "頁碼" })} value={`P.${citation.pageNumber}`} />
          <MetaRow label={t({ zhHans: "版本号", zhHant: "版本號" })} value={citation.version} />
          <MetaRow label={t({ zhHans: "发布日期", zhHant: "發布日期" })} value={citation.publishDate} />
          <MetaRow label={t({ zhHans: "生效日期", zhHant: "生效日期" })} value={citation.effectiveDate} />
          <MetaRow label={t({ zhHans: "失效日期", zhHant: "失效日期" })} value={citation.expiryDate ?? "—"} />
        </div>
      </MiniCard>

      <MiniCard>
        <h3 style={sectionTitleStyle}>{t({ zhHans: "文件预览", zhHant: "文件預覽" })}</h3>
        <div style={previewStyle}>
          {t({ zhHans: `PDF 第 ${citation.pageNumber} 页预览`, zhHant: `PDF 第 ${citation.pageNumber} 頁預覽` })}
        </div>
      </MiniCard>

      <MiniCard>
        <h3 style={sectionTitleStyle}>{t({ zhHans: "引用原文摘录", zhHant: "引用原文摘錄" })}</h3>
        <div style={{ marginTop: 14, display: "grid", gap: 12 }}>
          <div style={quoteStyle}>{citation.quoteText}</div>
          <div style={{ color: "#5d708d", lineHeight: 1.8 }}>
            <strong>{t({ zhHans: "命中段落：", zhHant: "命中段落：" })}</strong>
            {citation.matchedParagraph}
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {citation.keywords.map((keyword) => (
              <span key={keyword} style={keywordStyle}>
                {keyword}
              </span>
            ))}
          </div>
        </div>
      </MiniCard>

      <MiniCard>
        <h3 style={sectionTitleStyle}>{t({ zhHans: "来源可信度解释", zhHant: "來源可信度解釋" })}</h3>
        <div style={{ marginTop: 14, display: "grid", gap: 10 }}>
          {[
            "L1 官方条款：优先级最高",
            "L2 官方小册子：官方产品说明",
            "L3 费率 / 利益说明：涉及收益需谨慎",
            "L4 官方通告 / 优惠：需检查有效期",
            "L5 内部培训资料：需以官方条款为准",
          ].map((line) => (
            <div key={line} style={explainLineStyle}>
              {line}
            </div>
          ))}
        </div>
      </MiniCard>

      <MiniCard>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <Link href="/mini/chat" style={primaryLinkStyle}>
            {t({ zhHans: "返回原答案", zhHant: "返回原答案" })}
          </Link>
          <a href="#same-file" style={secondaryLinkStyle}>
            {t({ zhHans: "查看同文件其他引用", zhHant: "查看同文件其他引用" })}
          </a>
        </div>
      </MiniCard>

      <MiniCard>
        <h3 id="same-file" style={sectionTitleStyle}>
          {t({ zhHans: "同文件其他引用", zhHant: "同文件其他引用" })}
        </h3>
        <div style={{ display: "grid", gap: 12, marginTop: 14 }}>
          {sameFileItems.length ? (
            sameFileItems.map((item) => (
              <Link key={item.id} href={`/mini/citation/${item.id}`} style={sameFileLinkStyle}>
                {item.fileName} · P.{item.pageNumber}
              </Link>
            ))
          ) : (
            <div style={{ color: "#90a1ba" }}>{t({ zhHans: "暂无其他同文件引用。", zhHant: "暫無其他同文件引用。" })}</div>
          )}
        </div>
      </MiniCard>
    </MiniShell>
  );
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", gap: 16 }}>
      <strong>{label}</strong>
      <span style={{ color: "#5d708d", textAlign: "right" }}>{value}</span>
    </div>
  );
}

const sectionTitleStyle = { margin: 0, fontSize: 18, color: "#16223b" };

const expiredAlertStyle = {
  padding: 16,
  borderRadius: 18,
  background: "#fff1f2",
  color: "#dc2626",
  lineHeight: 1.8,
};

const trainingAlertStyle = {
  padding: 16,
  borderRadius: 18,
  background: "#fff8e8",
  color: "#b15f00",
  lineHeight: 1.8,
};

const previewStyle = {
  marginTop: 14,
  minHeight: 170,
  borderRadius: 20,
  background: "linear-gradient(180deg, #f5f8fd 0%, #edf2fa 100%)",
  border: "1px solid #dbe5f2",
  display: "grid",
  placeItems: "center",
  color: "#6d7f9c",
  fontWeight: 700,
};

const quoteStyle = {
  padding: 16,
  borderRadius: 18,
  background: "#f7faff",
  color: "#16223b",
  lineHeight: 1.9,
};

const keywordStyle = {
  minHeight: 30,
  padding: "0 12px",
  borderRadius: 999,
  background: "#eef4ff",
  color: "#4e76df",
  display: "inline-flex",
  alignItems: "center",
  fontSize: 12,
  fontWeight: 700,
};

const explainLineStyle = {
  padding: 12,
  borderRadius: 16,
  background: "#f7faff",
  color: "#4b5c78",
  lineHeight: 1.8,
};

const primaryLinkStyle = {
  minHeight: 42,
  padding: "0 16px",
  borderRadius: 14,
  background: "#111a2d",
  color: "#fff",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  textDecoration: "none",
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
  justifyContent: "center",
  textDecoration: "none",
  fontWeight: 700,
};

const sameFileLinkStyle = {
  padding: "14px 16px",
  borderRadius: 16,
  background: "#f7faff",
  color: "#16223b",
  textDecoration: "none",
};
