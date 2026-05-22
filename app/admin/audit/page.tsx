import { DataTable, type TableRow } from "../../../components/data-table";
import { PageShell } from "../../../components/page-shell";
import { StatusBadge } from "../../../components/status-badge";
import { getDocuments } from "../../../lib/api";
import { auditDocuments, documentDetails } from "../../../lib/mock-data";

function AuditField({ label, value }: { label: string; value: string }) {
  return (
    <label style={{ display: "grid", gap: 8 }}>
      <span style={{ color: "#6f809d", fontWeight: 600 }}>{label}</span>
      <div style={{ minHeight: 54, borderRadius: 18, border: "1px solid #dbe5f2", background: "#f7faff", padding: "14px 16px", color: "#172036" }}>{value}</div>
    </label>
  );
}

export default async function AuditPage() {
  let rows: TableRow[] = auditDocuments.map(([fileName, fileType, version, status]) => [
    fileName,
    fileType,
    version,
    <StatusBadge key={`${fileName}-status`} label={status} />,
  ]);

  try {
    const response = await getDocuments();
    rows = response.items
      .filter((item) => item.status === "PENDING_REVIEW" || item.status === "待审核" || item.status === "ENABLED")
      .map((item) => [
        item.fileName,
        item.sourceLevel ?? "产品资料",
        item.version ?? "-",
        <StatusBadge key={`${item.id}-status`} label={item.status} />,
      ]);
  } catch {
    // Use local rows.
  }

  const detail = documentDetails.doc_1;

  return (
    <PageShell title="资料审核" description="审核上传文件并设置是否进入公共知识库">
      <section style={{ display: "grid", gap: 0, gridTemplateColumns: "1.32fr 0.92fr" }}>
        <div style={{ paddingRight: 24 }}>
          <div style={{ background: "#ffffff", border: "1px solid #dbe5f2", borderRadius: 30, padding: 30, minHeight: 720 }}>
            <h3 style={{ margin: 0, fontSize: 26, color: "#172036" }}>待审核资料列表</h3>
            <div style={{ marginTop: 18 }}>
              <DataTable headers={["文件", "类型", "版本", "状态"]} rows={rows} gridTemplateColumns="2.2fr 1fr 0.8fr 0.8fr" />
            </div>
          </div>
        </div>

        <aside style={{ borderLeft: "1px solid #dbe5f2", paddingLeft: 36 }}>
          <div style={{ display: "grid", gap: 18 }}>
            <div>
              <h3 style={{ margin: 0, fontSize: 30, color: "#172036" }}>审核详情</h3>
              <div style={{ marginTop: 8, color: "#71829f", fontSize: 18 }}>{detail.fileName}</div>
            </div>
            <AuditField label="文件类型" value="产品小册子" />
            <AuditField label="来源等级" value="L2 官方产品小册子" />
            <AuditField label="语言" value={detail.language} />
            <AuditField label="版本号" value={detail.version} />
            <AuditField label="发布日期" value={detail.publishDate} />
            <AuditField label="生效日期" value={detail.effectiveDate} />
            <AuditField label="关联产品" value="A公司 重疾计划" />
            <AuditField label="是否前端引用" value="是" />
            <label style={{ display: "grid", gap: 8 }}>
              <span style={{ color: "#6f809d", fontWeight: 600 }}>审核意见</span>
              <div
                style={{
                  minHeight: 92,
                  borderRadius: 18,
                  border: "1px solid #dbe5f2",
                  background: "#f7faff",
                  padding: "14px 16px",
                  color: "#172036",
                  lineHeight: 1.7,
                }}
              >
                资料清晰，可进入公共知识库。需确认页码引用是否完整。
              </div>
            </label>
          </div>
        </aside>
      </section>
    </PageShell>
  );
}
