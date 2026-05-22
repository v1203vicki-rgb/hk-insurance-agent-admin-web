import { PageShell } from "../../../components/page-shell";

const cardStyle = {
  padding: 36,
  borderRadius: 30,
  border: "1px solid #dbe5f2",
  background: "#ffffff",
  boxShadow: "0 10px 24px rgba(18, 31, 54, 0.04)",
  display: "grid",
  gap: 18,
} as const;

const iconStyle = {
  width: 84,
  height: 84,
  borderRadius: 999,
  background: "#f4f8fe",
  color: "#71829f",
  display: "grid",
  placeItems: "center",
  fontSize: 46,
  fontWeight: 700,
} as const;

const buttonStyle = {
  minWidth: 152,
  minHeight: 52,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 18,
  border: "1px solid #141d33",
  background: "#141d33",
  color: "#ffffff",
  fontWeight: 700,
} as const;

export default function CommonStatesPage() {
  return (
    <PageShell title="通用状态页 / 弹窗样式" description="403、404、空状态、加载中、危险操作确认弹窗">
      <section style={{ display: "grid", gap: 22, gridTemplateColumns: "1fr 1fr" }}>
        {[
          ["403 无权限", "你没有权限访问该页面，请联系管理员。", "返回首页"],
          ["404 页面不存在", "页面可能已删除或地址错误。", "返回上一页"],
          ["暂无数据", "当前筛选条件下暂无记录。", "清空筛选"],
          ["处理中", "正在解析文件，请稍后查看状态。", "刷新状态"],
        ].map(([title, text, action]) => (
          <section key={title} style={cardStyle}>
            <div style={iconStyle}>!</div>
            <div>
              <h3 style={{ margin: 0, color: "#172036", fontSize: 24 }}>{title}</h3>
              <div style={{ marginTop: 10, color: "#71829f", lineHeight: 1.8, fontSize: 17 }}>{text}</div>
            </div>
            <div style={buttonStyle}>{action}</div>
          </section>
        ))}
      </section>

      <section style={{ ...cardStyle, maxWidth: 600, margin: "18px auto 0" }}>
        <div>
          <h3 style={{ margin: 0, color: "#172036", fontSize: 24 }}>确认禁用该资料？</h3>
          <div style={{ marginTop: 8, color: "#71829f", lineHeight: 1.8, fontSize: 17 }}>禁用后 Agent 不再检索或引用该资料，历史引用仍保留。</div>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
          <div style={{ ...buttonStyle, minWidth: 120, background: "#ffffff", color: "#5b6e8a", border: "1px solid #dbe5f2" }}>取消</div>
          <div style={{ ...buttonStyle, minWidth: 120, background: "#e81f4f", border: "1px solid #e81f4f" }}>确认禁用</div>
        </div>
      </section>
    </PageShell>
  );
}
