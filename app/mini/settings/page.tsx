import type { CSSProperties } from "react";
import { MiniCard, MiniShell } from "../../../components/mini-shell";

export default function MiniSettingsPage() {
  return (
    <MiniShell title="我的 / 设置" subtitle="语言、隐私政策与数据保存说明" activeTab="history">
      <MiniCard>
        <div style={{ display: "grid", gap: 16, color: "#16223b" }}>
          <div style={rowStyle}><strong>语言</strong><span>简体中文 / 繁体中文</span></div>
          <div style={rowStyle}><strong>隐私政策</strong><span>查看说明</span></div>
          <div style={rowStyle}><strong>数据保存说明</strong><span>查看详情</span></div>
          <div style={rowStyle}><strong>聊天记录保存</strong><span>6 个月</span></div>
          <div style={rowStyle}><strong>上传文件保存</strong><span>1 个月</span></div>
          <div style={rowStyle}><strong>删除记录说明</strong><span>到期后自动删除或标记删除</span></div>
        </div>
      </MiniCard>
    </MiniShell>
  );
}

const rowStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  gap: 16,
  paddingBottom: 14,
  borderBottom: "1px solid #e6edf7",
};
