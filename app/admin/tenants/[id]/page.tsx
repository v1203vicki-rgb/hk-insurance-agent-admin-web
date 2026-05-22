import { PageShell } from "../../../../components/page-shell";
import { ToolbarButton } from "../../../../components/toolbar-button";

const cardStyle = {
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

const tableCellStyle = {
  padding: "14px 16px",
  borderTop: "1px solid #dbe5f2",
  color: "#172036",
} as const;

export default function TenantDetailPage() {
  return (
    <PageShell title="租户详情" description="经纪公司资料、经纪人账号、上传文件和会话统计" actions={<ToolbarButton tone="dark">禁用租户</ToolbarButton>}>
      <section style={{ display: "grid", gap: 20, gridTemplateColumns: "0.9fr 1.1fr" }}>
        <section style={cardStyle}>
          <div style={{ display: "grid", gap: 18 }}>
            <h3 style={{ margin: 0, color: "#172036", fontSize: 24 }}>公司资料</h3>
            {[
              ["公司名称", "港华保险经纪"],
              ["联系人", "Chan Tai Man"],
              ["联系邮箱", "ops@broker.hk"],
              ["账号状态", "启用"],
              ["经纪人数", "18"],
              ["资料共享", "审核后进入公共知识库"],
            ].map(([label, value]) => (
              <label key={label} style={{ display: "grid", gap: 10 }}>
                <span style={{ color: "#71829f", fontSize: 15 }}>{label}</span>
                <div style={fieldStyle}>{value}</div>
              </label>
            ))}
          </div>
        </section>

        <div style={{ display: "grid", gap: 20 }}>
          <section style={cardStyle}>
            <div style={{ display: "grid", gap: 16 }}>
              <h3 style={{ margin: 0, color: "#172036", fontSize: 24 }}>数据统计</h3>
              <div style={{ overflow: "hidden", borderRadius: 20, border: "1px solid #dbe5f2" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 160px", background: "#f4f8fe", fontWeight: 700, color: "#71829f" }}>
                  <div style={{ padding: "14px 16px" }}>指标</div>
                  <div style={{ padding: "14px 16px" }}>数值</div>
                </div>
                {[
                  ["上传文件", "126"],
                  ["待审核", "14"],
                  ["本月问答", "2,431"],
                  ["产品对比", "418"],
                ].map(([label, value]) => (
                  <div key={label} style={{ display: "grid", gridTemplateColumns: "1fr 160px" }}>
                    <div style={tableCellStyle}>{label}</div>
                    <div style={tableCellStyle}>{value}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section style={cardStyle}>
            <div style={{ display: "grid", gap: 16 }}>
              <h3 style={{ margin: 0, color: "#172036", fontSize: 24 }}>经纪人账号</h3>
              <div style={{ overflow: "hidden", borderRadius: 20, border: "1px solid #dbe5f2" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr 140px", background: "#f4f8fe", fontWeight: 700, color: "#71829f" }}>
                  <div style={{ padding: "14px 16px" }}>姓名</div>
                  <div style={{ padding: "14px 16px" }}>邮箱</div>
                  <div style={{ padding: "14px 16px" }}>状态</div>
                </div>
                {[
                  ["Agent Wong", "wong@hkbroker.com", "启用", "#0e9f6e", "#e9fbf2"],
                  ["Agent Chan", "chan@hkbroker.com", "启用", "#0e9f6e", "#e9fbf2"],
                  ["Agent Lee", "lee@hkbroker.com", "禁用", "#ff4d67", "#fff0f2"],
                ].map(([name, email, status, color, bg]) => (
                  <div key={name} style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr 140px" }}>
                    <div style={tableCellStyle}>{name}</div>
                    <div style={tableCellStyle}>{email}</div>
                    <div style={tableCellStyle}>
                      <span style={{ display: "inline-flex", minWidth: 56, justifyContent: "center", padding: "6px 12px", borderRadius: 999, color, background: bg as string }}>{status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </section>
    </PageShell>
  );
}
