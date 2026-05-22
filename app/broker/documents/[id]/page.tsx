import { PageShell } from "../../../../components/page-shell";
import { StatusBadge } from "../../../../components/status-badge";

const boxStyle = {
  padding: "18px 20px",
  borderRadius: 22,
  border: "1px solid #dbe5f2",
  background: "#f4f8fe",
} as const;

const cardStyle = {
  padding: 28,
  borderRadius: 28,
  border: "1px solid #dbe5f2",
  background: "#ffffff",
} as const;

export default function BrokerDocumentDetailPage() {
  return (
    <PageShell title="文件详情" description="查看本公司上传文件的审核意见、状态变化和前端引用范围。">
      <section style={{ display: "grid", gap: 20, gridTemplateColumns: "1fr 1fr" }}>
        <section style={cardStyle}>
          <div style={{ display: "grid", gap: 14 }}>
            <h3 style={{ margin: 0, color: "#172036", fontSize: 24 }}>文件信息</h3>
            <div style={boxStyle}>
              <strong style={{ color: "#172036" }}>AIA_重疾险_产品小册子.pdf</strong>
              <div style={{ marginTop: 10 }}>
                <StatusBadge label="PENDING_REVIEW" />
              </div>
            </div>
            {[
              ["文件类型", "产品小册子"],
              ["版本号", "v2026.03"],
              ["来源等级", "L2 官方产品小册子"],
              ["语言", "繁体中文 / 简体中文"],
              ["是否前端引用", "是"],
            ].map(([label, value]) => (
              <div key={label} style={boxStyle}>
                <strong style={{ color: "#172036" }}>{label}</strong>
                <div style={{ marginTop: 6, color: "#71829f" }}>{value}</div>
              </div>
            ))}
          </div>
        </section>

        <section style={cardStyle}>
          <div style={{ display: "grid", gap: 14 }}>
            <h3 style={{ margin: 0, color: "#172036", fontSize: 24 }}>审核意见</h3>
            <div style={boxStyle}>
              <strong style={{ color: "#172036" }}>平台审核说明</strong>
              <div style={{ marginTop: 8, color: "#71829f", lineHeight: 1.8 }}>
                资料清晰，可进入公共知识库。需确认页码引用是否完整，并保持产品版本与发布日期一致。
              </div>
            </div>
            <div style={boxStyle}>
              <strong style={{ color: "#172036" }}>处理流程</strong>
              <div style={{ marginTop: 8, color: "#71829f", lineHeight: 1.8 }}>
                上传成功后依次经历待解析、解析成功、待审核、已启用四个状态。经纪公司不可自审。
              </div>
            </div>
          </div>
        </section>
      </section>
    </PageShell>
  );
}
