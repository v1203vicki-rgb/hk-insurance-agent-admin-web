import { PageShell } from "../../../components/page-shell";
import { ToolbarButton } from "../../../components/toolbar-button";

const fieldCardStyle = {
  padding: 24,
  borderRadius: 28,
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
  borderRadius: 16,
  border: "1px solid #dbe5f2",
  background: "#f4f8fe",
  color: "#172036",
  fontSize: 14,
} as const;

export default function BrokerSettingsPage() {
  return (
    <PageShell title="公司设置" description="展示公司名称、联系人、账号状态、数据权限说明与资料共享规则。" actions={<ToolbarButton tone="dark">保存草稿</ToolbarButton>}>
      <section style={{ display: "grid", gap: 18, gridTemplateColumns: "0.95fr 1.05fr" }}>
        <section style={fieldCardStyle}>
          <div style={{ display: "grid", gap: 18 }}>
            <h3 style={{ margin: 0, color: "#172036", fontSize: 18 }}>公司资料</h3>

            {[
              ["公司名称", "港华保险经纪"],
              ["联系人", "Chan Tai Man"],
              ["联系邮箱", "ops@hkbroker.com"],
              ["账号状态", "启用"],
              ["经纪人数", "18"],
            ].map(([label, value]) => (
              <label key={label} style={{ display: "grid", gap: 8 }}>
                <span style={{ color: "#71829f", fontSize: 12 }}>{label}</span>
                <div style={fieldStyle}>{value}</div>
              </label>
            ))}
          </div>
        </section>

        <section style={fieldCardStyle}>
          <div style={{ display: "grid", gap: 14 }}>
            <h3 style={{ margin: 0, color: "#172036", fontSize: 18 }}>数据与权限说明</h3>

            {[
              ["数据权限说明", "当前后台仅展示本公司 mock 数据，不显示其他经纪公司会话与文件。"],
              ["上传资料进入公共知识库说明", "上传并提交审核后，该资料可能进入平台公共知识库，供平台问答服务使用。"],
              ["会话保存说明", "聊天记录默认保存 6 个月。"],
              ["上传文件保存说明", "客户上传文件默认保存 1 个月。"],
            ].map(([title, text]) => (
              <div key={title} style={{ padding: 18, borderRadius: 20, border: "1px solid #dbe5f2", background: "#f4f8fe" }}>
                <strong style={{ display: "block", color: "#172036", fontSize: 16 }}>{title}</strong>
                <div style={{ marginTop: 8, color: "#71829f", lineHeight: 1.7, fontSize: 14 }}>{text}</div>
              </div>
            ))}
          </div>
        </section>
      </section>
    </PageShell>
  );
}
