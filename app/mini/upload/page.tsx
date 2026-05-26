"use client";

import { MiniCard, MiniShell } from "../../../components/mini-shell";
import { useMiniLocale } from "../../../components/mini-locale";
import { miniUploadGuides, miniUploadStates } from "@/src/data";

export default function MiniUploadPage() {
  const { t } = useMiniLocale();

  return (
    <MiniShell
      title={{ zhHans: "上传问答文件", zhHant: "上傳問答文件" }}
      subtitle={{ zhHans: "仅用于本次咨询问答，上传文件保存 1 个月", zhHant: "僅用於本次諮詢問答，上傳文件保存 1 個月" }}
      activeTab="chat"
    >
      <MiniCard>
        <div style={warningStyle}>{t(miniUploadGuides.warning)}</div>

        <div style={{ display: "grid", gap: 16, marginTop: 18 }}>
          <div>
            <div style={sectionTitleStyle}>{t({ zhHans: "允许上传类型", zhHant: "允許上傳類型" })}</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 10 }}>
              {miniUploadGuides.allowed.map((item) => (
                <span key={item.zhHans} style={tagStyle(true)}>
                  {t(item)}
                </span>
              ))}
            </div>
          </div>

          <div>
            <div style={sectionTitleStyle}>{t({ zhHans: "禁止上传类型", zhHant: "禁止上傳類型" })}</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 10 }}>
              {miniUploadGuides.blocked.map((item) => (
                <span key={item.zhHans} style={tagStyle(false)}>
                  {t(item)}
                </span>
              ))}
            </div>
          </div>

          <div>
            <div style={sectionTitleStyle}>{t({ zhHans: "上传状态示例", zhHant: "上傳狀態示例" })}</div>
            <div style={{ display: "grid", gap: 10, marginTop: 10 }}>
              {miniUploadStates.map((item) => (
                <div key={item.id} style={stateCardStyle}>
                  <strong style={{ color: "#16223b" }}>{t(item.label)}</strong>
                  {item.id === "failed" ? (
                    <div style={{ marginTop: 6, color: "#dc2626", fontSize: 12, lineHeight: 1.7 }}>
                      {t({ zhHans: "文件暂无法解析，请尝试上传更清晰的 PDF 或图片。", zhHant: "文件暫無法解析，請嘗試上傳更清晰的 PDF 或圖片。" })}
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      </MiniCard>
    </MiniShell>
  );
}

const warningStyle = {
  padding: 16,
  borderRadius: 18,
  background: "#fff8e8",
  color: "#b15f00",
  lineHeight: 1.8,
};

const sectionTitleStyle = {
  color: "#16223b",
  fontSize: 16,
  fontWeight: 800,
};

const tagStyle = (allowed: boolean) => ({
  minHeight: 32,
  padding: "0 12px",
  borderRadius: 999,
  background: allowed ? "#eef7ff" : "#fff1f2",
  color: allowed ? "#2563eb" : "#dc2626",
  display: "inline-flex",
  alignItems: "center",
  fontSize: 12,
  fontWeight: 700,
});

const stateCardStyle = {
  padding: 14,
  borderRadius: 16,
  background: "#f7faff",
  border: "1px solid #dbe5f2",
};
