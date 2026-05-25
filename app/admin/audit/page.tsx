import type { CSSProperties } from "react";
import { DataTable, type TableRow } from "../../../components/data-table";
import { PageShell } from "../../../components/page-shell";
import { StatusBadge } from "../../../components/status-badge";
import { getDocuments } from "../../../lib/api";
import { auditDocuments, documentDetails } from "../../../lib/mock-data";

function AuditField({ label, value }: { label: string; value: string }) {
  return (
    <label style={{ display: "grid", gap: 8 }}>
      <span style={{ color: "#6f809d", fontWeight: 600, fontSize: 12 }}>{label}</span>
      <div style={{ minHeight: 50, borderRadius: 16, border: "1px solid #dbe5f2", background: "#f7faff", padding: "14px 16px", color: "#172036", fontSize: 14 }}>{value}</div>
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
      .filter((item) => item.status === "PENDING_REVIEW" || item.status === "ENABLED")
      .map((item) => [item.fileName, item.sourceLevel ?? "产品资料", item.version ?? "-", <StatusBadge key={`${item.id}-status`} label={item.status} />]);
  } catch {
    // 演示模式使用本地数据。
  }

  const detail = documentDetails.doc_1;

  return (
    <PageShell title="资料审核" description="左侧查看待审核队列，右侧模拟审核详情抽屉。">
      <section style={{ display: "grid", gap: 18, gridTemplateColumns: "1.25fr 0.95fr" }}>
        <div style={{ background: "#ffffff", border: "1px solid #dbe5f2", borderRadius: 28, padding: 24, minHeight: 720 }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginBottom: 18, flexWrap: "wrap" }}>
            <strong style={{ fontSize: 18, color: "#172036" }}>审核队列</strong>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <div style={filterFieldStyle}>状态筛选</div>
              <div style={filterFieldStyle}>时间范围</div>
            </div>
          </div>
          <DataTable headers={["文件", "类型", "版本", "状态"]} rows={rows} gridTemplateColumns="2.2fr 1fr 0.8fr 0.8fr" />
        </div>

        <aside style={{ background: "#ffffff", border: "1px solid #dbe5f2", borderRadius: 28, padding: 24 }}>
          <div style={{ display: "grid", gap: 16 }}>
            <div>
              <h3 style={{ margin: 0, fontSize: 24, color: "#172036" }}>审核详情抽屉</h3>
              <div style={{ marginTop: 6, color: "#71829f" }}>{detail.fileName}</div>
            </div>

            <AuditField label="文件类型" value="产品条款" />
            <AuditField label="来源等级" value="L1 官方条款" />
            <AuditField label="解析状态" value={detail.parseStatus} />
            <AuditField label="向量状态" value={detail.vectorStatus} />
            <AuditField label="版本日期" value={`${detail.publishDate} / ${detail.effectiveDate}`} />
            <AuditField label="是否内部培训" value="否" />
            <AuditField label="是否优惠政策" value="否" />
            <AuditField label="切片预览" value="冷静期 21 日；等待期 90 日；保障范围 120 种严重疾病" />

            <label style={{ display: "grid", gap: 8 }}>
              <span style={{ color: "#6f809d", fontWeight: 600, fontSize: 12 }}>审核意见</span>
              <textarea style={{ minHeight: 96, borderRadius: 16, border: "1px solid #dbe5f2", background: "#f7faff", padding: 14, resize: "vertical", font: "inherit" }} defaultValue="资料清晰，可进入公共知识库。需确认页码引用是否完整。" />
            </label>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <button style={lightButtonStyle}>驳回</button>
              <button style={primaryButtonStyle}>审核通过</button>
            </div>
          </div>
        </aside>
      </section>
    </PageShell>
  );
}

const filterFieldStyle: CSSProperties = {
  minWidth: 120,
  minHeight: 42,
  borderRadius: 14,
  border: "1px solid #dbe5f2",
  background: "#f7faff",
  display: "grid",
  alignItems: "center",
  padding: "0 14px",
  color: "#6f809d",
  fontSize: 13,
};

const lightButtonStyle: CSSProperties = {
  minHeight: 46,
  borderRadius: 16,
  border: "1px solid #dbe5f2",
  background: "#ffffff",
  color: "#16223b",
  fontWeight: 700,
};

const primaryButtonStyle: CSSProperties = {
  minHeight: 46,
  borderRadius: 16,
  border: 0,
  background: "#111a2d",
  color: "#ffffff",
  fontWeight: 700,
};
