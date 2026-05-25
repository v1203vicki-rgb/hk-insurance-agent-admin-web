import { PageShell } from "../../../../components/page-shell";
import { ToolbarButton } from "../../../../components/toolbar-button";

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

export default function BrokerUserEditPage() {
  return (
    <PageShell
      title="经纪人新增 / 编辑"
      description="维护本公司经纪人账号、角色、状态与重置密码设置。"
      actions={
        <>
          <ToolbarButton>保存草稿</ToolbarButton>
          <ToolbarButton tone="dark">提交</ToolbarButton>
        </>
      }
    >
      <section style={{ padding: 24, borderRadius: 28, border: "1px solid #dbe5f2", background: "#ffffff" }}>
        <div style={{ display: "grid", gap: 18 }}>
          <div style={{ display: "grid", gap: 16, gridTemplateColumns: "1fr 1fr" }}>
            {[
              ["姓名", "Agent Wong"],
              ["邮箱", "wong@hkbroker.com"],
              ["角色", "经纪人"],
              ["状态", "启用"],
              ["重置密码", "否"],
              ["禁用账号", "否"],
            ].map(([label, value]) => (
              <label key={label} style={{ display: "grid", gap: 8 }}>
                <span style={{ color: "#71829f", fontSize: 12 }}>{label}</span>
                <div style={fieldStyle}>{value}</div>
              </label>
            ))}
          </div>

          <div style={{ padding: 16, borderRadius: 18, background: "#f4f8fe", color: "#71829f", lineHeight: 1.8 }}>
            权限说明：经纪人只能查看本公司会话、文件状态和数据看板，不能审核资料、不能查看平台后台，也不能查看公司敏感配置。
          </div>
        </div>
      </section>
    </PageShell>
  );
}
