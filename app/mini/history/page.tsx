import Link from "next/link";
import type { CSSProperties } from "react";
import { MiniCard, MiniShell } from "../../../components/mini-shell";
import { miniHistoryItems } from "@/src/data";

export default function MiniHistoryPage() {
  return (
    <MiniShell title="咨询记录" subtitle="聊天保存 6 个月，上传文件保存 1 个月" activeTab="history">
      {miniHistoryItems.map((item) => (
        <Link key={item.id} href={`/mini/history/${item.id}`}>
          <MiniCard>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
              <strong style={{ color: "#16223b", fontSize: 18, lineHeight: 1.5 }}>{item.title}</strong>
              <span style={{ color: "#6d7f9c" }}>{item.time}</span>
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 18 }}>
              <span style={chipStyle}>{item.category}</span>
              <span style={{ ...chipStyle, color: "#2563eb", background: "#eef4ff" }}>{item.citationCount}个来源</span>
              <span style={{ ...chipStyle, color: item.risk.startsWith("高") ? "#dc2626" : item.risk.startsWith("中") ? "#c47a00" : "#0f9f6e", background: item.risk.startsWith("高") ? "#fff1f2" : item.risk.startsWith("中") ? "#fff7dd" : "#e8fbf0" }}>{item.risk}</span>
            </div>
          </MiniCard>
        </Link>
      ))}
    </MiniShell>
  );
}

const chipStyle: CSSProperties = {
  minHeight: 30,
  padding: "0 14px",
  borderRadius: 999,
  background: "#f4f7fc",
  color: "#71829f",
  display: "inline-flex",
  alignItems: "center",
  fontSize: 12,
};
