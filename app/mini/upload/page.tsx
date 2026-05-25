import type { CSSProperties } from "react";
import { MiniCard, MiniShell } from "../../../components/mini-shell";

export default function MiniUploadPage() {
  return (
    <MiniShell title="上传资料" subtitle="仅支持问答相关资料和普通图片问题" activeTab="chat">
      <MiniCard>
        <div style={{ padding: 16, borderRadius: 18, background: "#fff8e8", color: "#b15f00", lineHeight: 1.8 }}>
          请勿上传身份证件、通行证、银行资料、医疗报告、体检报告、诊断证明、理赔文件等敏感资料。系统仅支持产品资料、计划书、保单摘要及普通图片问题。
        </div>
        <div style={{ marginTop: 18, display: "grid", gap: 12 }}>
          <div style={uploadBoxStyle}>产品小册子.pdf</div>
          <div style={uploadBoxStyle}>计划书.jpg</div>
          <div style={uploadBoxStyle}>保单摘要.png</div>
          <div style={{ padding: 14, borderRadius: 18, background: "#f7faff", color: "#16223b" }}>
            上传进度：2 / 3 已完成，当前文件解析中...
          </div>
        </div>
      </MiniCard>
    </MiniShell>
  );
}

const uploadBoxStyle: CSSProperties = {
  minHeight: 54,
  borderRadius: 18,
  border: "1px dashed #bdd0e7",
  background: "#f7faff",
  display: "grid",
  alignItems: "center",
  padding: "0 16px",
  color: "#6d7f9c",
};
