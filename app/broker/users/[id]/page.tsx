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

export default function BrokerUserEditPage() {
  return (
    <PageShell title="经纪人新增 / 编辑" description="经纪公司管理员维护本公司经纪人账号" actions={<ToolbarButton tone="dark">保存经纪人</ToolbarButton>}>
      <section style={formCardStyle}>
        <div style={{ display: "grid", gap: 24 }}>
          <h3 style={{ margin: 0, color: "#172036", fontSize: 24 }}>经纪人信息</h3>

          <div style={{ display: "grid", gap: 20, gridTemplateColumns: "1fr 1fr" }}>
            {[
              ["姓名", "Agent Wong"],
              ["邮箱", "wong@hkbroker.com"],
              ["角色", "经纪人"],
              ["状态", "启用"],
              ["是否重置密码", "否"],
              ["数据权限", "仅本公司只读"],
            ].map(([label, value]) => (
              <label key={label} style={{ display: "grid", gap: 10 }}>
                <span style={{ color: "#71829f", fontSize: 15 }}>{label}</span>
                <div style={fieldStyle}>{value}</div>
              </label>
            ))}
          </div>

          <div style={{ display: "grid", gap: 10 }}>
            <h4 style={{ margin: "8px 0 0", color: "#172036", fontSize: 22 }}>权限说明</h4>
            <div style={{ color: "#172036", fontSize: 18, lineHeight: 1.8 }}>
              经纪人只能查看本公司客户咨询记录和数据看板，不能审核资料，不能修改 Agent 规则，不能查看其他公司数据。
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
