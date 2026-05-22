import { PageShell } from "../../../../components/page-shell";
import { ToolbarButton } from "../../../../components/toolbar-button";

const cardStyle = {
  padding: 28,
  borderRadius: 30,
  border: "1px solid #dbe5f2",
  background: "#ffffff",
  boxShadow: "0 10px 24px rgba(18, 31, 54, 0.04)",
} as const;

const inputStyle = {
  minHeight: 46,
  display: "flex",
  alignItems: "center",
  padding: "0 18px",
  borderRadius: 18,
  border: "1px solid #dbe5f2",
  background: "#f7faff",
  color: "#9aa8c0",
  fontSize: 15,
} as const;

const cellStyle = {
  padding: "16px 16px",
  borderTop: "1px solid #dbe5f2",
  color: "#172036",
} as const;

export default function InsuranceCompaniesPage() {
  const rows = [
    ["A公司", "A Insurance Limited", "香港", "12", "86", "启用", "#0e9f6e", "#e9fbf2"],
    ["B公司", "B Life Assurance", "香港", "8", "52", "启用", "#0e9f6e", "#e9fbf2"],
    ["C公司", "C Wealth Insurance", "香港", "6", "41", "启用", "#0e9f6e", "#e9fbf2"],
    ["D公司", "D Medical Cover", "香港", "4", "29", "禁用", "#ff4d67", "#fff0f2"],
  ];

  return (
    <PageShell title="保险公司管理" description="维护保险公司名称、地区、状态和关联产品数" actions={<ToolbarButton tone="dark">新增保险公司</ToolbarButton>}>
      <section style={cardStyle}>
        <div style={{ display: "grid", gap: 28 }}>
          <div style={{ display: "flex", gap: 16, justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ ...inputStyle, flex: 1, maxWidth: 430 }}>搜索保险公司</div>
            <div style={{ display: "flex", gap: 12 }}>
              <div style={{ ...inputStyle, minWidth: 100, justifyContent: "center", color: "#5b6e8a" }}>筛选</div>
              <div style={{ ...inputStyle, minWidth: 100, justifyContent: "center", color: "#5b6e8a" }}>导出</div>
            </div>
          </div>

          <div style={{ overflow: "hidden", borderRadius: 24, border: "1px solid #dbe5f2" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr 0.7fr 0.7fr 0.7fr 0.7fr", background: "#f4f8fe", color: "#71829f", fontWeight: 700 }}>
              <div style={{ padding: "16px 16px" }}>中文名</div>
              <div style={{ padding: "16px 16px" }}>英文名</div>
              <div style={{ padding: "16px 16px" }}>地区</div>
              <div style={{ padding: "16px 16px" }}>产品数</div>
              <div style={{ padding: "16px 16px" }}>资料数</div>
              <div style={{ padding: "16px 16px" }}>状态</div>
            </div>
            {rows.map(([zh, en, region, products, documents, status, color, bg]) => (
              <div key={zh} style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr 0.7fr 0.7fr 0.7fr 0.7fr" }}>
                <div style={cellStyle}>{zh}</div>
                <div style={cellStyle}>{en}</div>
                <div style={cellStyle}>{region}</div>
                <div style={cellStyle}>{products}</div>
                <div style={cellStyle}>{documents}</div>
                <div style={cellStyle}>
                  <span style={{ display: "inline-flex", minWidth: 56, justifyContent: "center", padding: "6px 12px", borderRadius: 999, color: color as string, background: bg as string }}>{status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={cardStyle}>
        <div style={{ display: "grid", gap: 22 }}>
          <h3 style={{ margin: 0, color: "#172036", fontSize: 24 }}>保险公司编辑表单预览</h3>
          <div style={{ display: "grid", gap: 20, gridTemplateColumns: "1fr 1fr 1fr" }}>
            {[
              ["中文名称", "A公司"],
              ["繁体名称", "A公司"],
              ["英文名称", "A Insurance Limited"],
              ["地区", "香港"],
              ["状态", "启用"],
              ["备注", "可选"],
            ].map(([label, value]) => (
              <label key={label} style={{ display: "grid", gap: 10 }}>
                <span style={{ color: "#71829f", fontSize: 15 }}>{label}</span>
                <div style={{ ...inputStyle, color: "#172036" }}>{value}</div>
              </label>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
