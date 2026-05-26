"use client";

import { MiniCard, MiniShell } from "../../../components/mini-shell";
import { useMiniLocale } from "../../../components/mini-locale";
import { miniSettingsContent } from "@/src/data";

export default function MiniSettingsPage() {
  const { t, locale, setLocale } = useMiniLocale();

  return (
    <MiniShell
      title={{ zhHans: "设置与隐私", zhHant: "設置與隱私" }}
      subtitle={{ zhHans: "语言、数据说明与演示版信息", zhHant: "語言、數據說明與演示版信息" }}
      activeTab="history"
    >
      <MiniCard>
        <h3 style={titleStyle}>{t({ zhHans: "语言设置", zhHant: "語言設置" })}</h3>
        <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
          <button onClick={() => setLocale("ZH_HANS")} style={localeButtonStyle(locale === "ZH_HANS")}>
            简体中文
          </button>
          <button onClick={() => setLocale("ZH_HANT")} style={localeButtonStyle(locale === "ZH_HANT")}>
            繁體中文
          </button>
        </div>
      </MiniCard>

      <MiniCard>
        <h3 style={titleStyle}>{t(miniSettingsContent.retention)}</h3>
        <div style={{ display: "grid", gap: 10, marginTop: 14, color: "#16223b", lineHeight: 1.8 }}>
          <div>{t(miniSettingsContent.chatRetention)}</div>
          <div>{t(miniSettingsContent.uploadRetention)}</div>
          <div>{t(miniSettingsContent.improvement)}</div>
          <div>{t(miniSettingsContent.deleteRule)}</div>
        </div>
      </MiniCard>

      <MiniCard>
        <h3 style={titleStyle}>{t(miniSettingsContent.privacy)}</h3>
        <div style={{ display: "grid", gap: 10, marginTop: 14, color: "#16223b", lineHeight: 1.8 }}>
          <div>{t({ zhHans: "不要上传身份证、银行资料、医疗报告、体检报告、诊断证明、理赔文件。", zhHant: "不要上傳身份證、銀行資料、醫療報告、體檢報告、診斷證明、理賠文件。" })}</div>
          <div>{t({ zhHans: "不采集客户姓名、电话、微信。", zhHant: "不採集客戶姓名、電話、微信。" })}</div>
          <div>{t({ zhHans: "不做客户留资。", zhHant: "不做客戶留資。" })}</div>
        </div>
      </MiniCard>

      <MiniCard>
        <h3 style={titleStyle}>{t({ zhHans: "版本信息", zhHant: "版本信息" })}</h3>
        <div style={{ marginTop: 14, color: "#16223b", lineHeight: 1.8 }}>
          {t({ zhHans: "当前为演示版 / MVP", zhHant: "當前為演示版 / MVP" })}
        </div>
      </MiniCard>
    </MiniShell>
  );
}

const titleStyle = { margin: 0, fontSize: 18, color: "#16223b" };

const localeButtonStyle = (active: boolean) => ({
  border: active ? 0 : "1px solid #dbe5f2",
  minHeight: 40,
  padding: "0 16px",
  borderRadius: 14,
  background: active ? "#111a2d" : "#f7faff",
  color: active ? "#fff" : "#16223b",
  fontWeight: 700,
});
