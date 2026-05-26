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
        <h3 style={titleStyle}>语言设置</h3>
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
          <div>不要上传身份证、银行资料、医疗报告、体检报告、诊断证明、理赔文件。</div>
          <div>不采集客户姓名、电话、微信。</div>
          <div>不做客户留资。</div>
        </div>
      </MiniCard>

      <MiniCard>
        <h3 style={titleStyle}>版本信息</h3>
        <div style={{ marginTop: 14, color: "#16223b", lineHeight: 1.8 }}>当前为演示版 / MVP</div>
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
