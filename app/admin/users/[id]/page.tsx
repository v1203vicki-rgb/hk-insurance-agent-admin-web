import { PageShell } from "../../../../components/page-shell";
import { ToolbarButton } from "../../../../components/toolbar-button";

const formCardStyle = {
  padding: 28,
  borderRadius: 30,
  border: "1px solid #dbe5f2",
  background: "#ffffff",
  boxShadow: "0 10px 24px rgba(18, 31, 54, 0.04)",
} as const;

const fieldStyle = {
  width: "100%",
  minHeight: 46,
  display: "flex",
  alignItems: "center",
  padding: "0 16px",
  borderRadius: 18,
  border: "1px solid #dbe5f2",
  background: "#f4f8fe",
  color: "#172036",
  fontSize: 15,
} as const;

const tagBaseStyle = {
  display: "inline-flex",
  alignItems: "center",
  padding: "8px 16px",
  borderRadius: 999,
  fontWeight: 700,
} as const;

export default function UserEditPage() {
  return (
    <PageShell title="用户新增 / 编辑" description="创建后台用户、分配角色和所属租户" actions={<ToolbarButton tone="dark">保存用户</ToolbarButton>}>
      <section style={formCardStyle}>
        <div style={{ display: "grid", gap: 24 }}>
          <h3 style={{ margin: 0, color: "#172036", fontSize: 24 }}>用户信息</h3>

          <div style={{ display: "grid", gap: 20, gridTemplateColumns: "1fr 1fr" }}>
            {[
              ["姓名", "Agent Wong"],
              ["邮箱", "wong@hkbroker.com"],
              ["角色", "BROKER_USER"],
              ["所属租户", "港华保险经纪"],
              ["状态", "启用"],
              ["是否重置密码", "否"],
            ].map(([label, value]) => (
              <label key={label} style={{ display: "grid", gap: 10 }}>
                <span style={{ color: "#71829f", fontSize: 15 }}>{label}</span>
                <div style={fieldStyle}>{value}</div>
              </label>
            ))}
          </div>

          <div style={{ display: "grid", gap: 14 }}>
            <h4 style={{ margin: 0, color: "#172036", fontSize: 22 }}>权限预览</h4>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <span style={{ ...tagBaseStyle, background: "#e9fbf2", color: "#0e9f6e" }}>查看本公司会话记录</span>
              <span style={{ ...tagBaseStyle, background: "#e9fbf2", color: "#0e9f6e" }}>查看本公司数据看板</span>
              <span style={{ ...tagBaseStyle, background: "#fff0f2", color: "#ff4d67" }}>不能审核资料</span>
              <span style={{ ...tagBaseStyle, background: "#fff0f2", color: "#ff4d67" }}>不能修改 Agent 规则</span>
              <span style={{ ...tagBaseStyle, background: "#fff0f2", color: "#ff4d67" }}>不能查看其他租户数据</span>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
