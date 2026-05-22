import { PageShell } from "../../../components/page-shell";
import { ToolbarButton } from "../../../components/toolbar-button";

const fieldCardStyle = {
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

export default function BrokerSettingsPage() {
  return (
    <PageShell title="公司设置" description="公司资料、联系人、数据说明和公共知识库共享说明" actions={<ToolbarButton tone="dark">保存设置</ToolbarButton>}>
      <section style={{ display: "grid", gap: 22, gridTemplateColumns: "0.95fr 1.05fr" }}>
        <section style={fieldCardStyle}>
          <div style={{ display: "grid", gap: 22 }}>
            <div>
              <h3 style={{ margin: 0, color: "#172036", fontSize: 24 }}>公司资料</h3>
            </div>

            {[
              ["公司名称", "港华保险经纪"],
              ["联系人", "Chan Tai Man"],
              ["联系邮箱", "ops@hkbroker.com"],
              ["账号状态", "启用"],
              ["经纪人数", "18"],
            ].map(([label, value]) => (
              <label key={label} style={{ display: "grid", gap: 10 }}>
                <span style={{ color: "#71829f", fontSize: 15 }}>{label}</span>
                <div style={fieldStyle}>{value}</div>
              </label>
            ))}
          </div>
        </section>

        <section style={fieldCardStyle}>
          <div style={{ display: "grid", gap: 18 }}>
            <div>
              <h3 style={{ margin: 0, color: "#172036", fontSize: 24 }}>数据与资料说明</h3>
            </div>

            {[
              ["资料共享", "上传并提交审核后，资料可能被纳入平台公共知识库。"],
              ["会话权限", "只能查看本公司客户咨询记录。"],
              ["匿名导出", "导出内容不包含姓名、电话、微信等字段。"],
              ["保存期限", "聊天记录 6 个月；客户上传文件 1 个月。"],
            ].map(([title, text]) => (
              <div key={title} style={{ padding: 20, borderRadius: 24, border: "1px solid #dbe5f2", background: "#f4f8fe" }}>
                <strong style={{ display: "block", color: "#172036", fontSize: 18 }}>{title}</strong>
                <div style={{ marginTop: 8, color: "#71829f", lineHeight: 1.7 }}>{text}</div>
              </div>
            ))}
          </div>
        </section>
      </section>
    </PageShell>
  );
}
