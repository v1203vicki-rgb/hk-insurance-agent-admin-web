import { notFound } from "next/navigation";
import { PageShell } from "../../../../components/page-shell";
import { StatusBadge } from "../../../../components/status-badge";

const details: Record<string, { fileName: string; status: string; reviewComment: string; sourceLevel: string; version: string; parseStatus: string; vectorStatus: string; frontendCitable: string; inPublicKb: string; uploadedAt: string }> = {
  doc_1: {
    fileName: "A公司重疾计划条款.pdf",
    status: "待审核",
    reviewComment: "资料清晰，可进入公共知识库。需确认页码引用是否完整。",
    sourceLevel: "L1 官方条款",
    version: "v2026.03",
    parseStatus: "解析成功",
    vectorStatus: "已向量化",
    frontendCitable: "是",
    inPublicKb: "待审核通过后进入",
    uploadedAt: "2026-05-02 14:32",
  },
  doc_4: {
    fileName: "匠心飞越产品小册子.pdf",
    status: "待审核",
    reviewComment: "需确认红利示例页码。",
    sourceLevel: "L2 官方小册子",
    version: "v2604",
    parseStatus: "解析成功",
    vectorStatus: "待向量化",
    frontendCitable: "否",
    inPublicKb: "待审核通过后进入",
    uploadedAt: "2026-05-08 11:20",
  },
};

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

export default async function BrokerDocumentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const detail = details[id];
  if (!detail) notFound();

  return (
    <PageShell title="文件详情" description="查看本公司文件的上传时间、审核意见、解析状态、向量状态与引用范围。">
      <section style={{ display: "grid", gap: 20, gridTemplateColumns: "1fr 1fr" }}>
        <section style={cardStyle}>
          <div style={{ display: "grid", gap: 14 }}>
            <h3 style={{ margin: 0, color: "#172036", fontSize: 18 }}>文件信息</h3>
            <div style={boxStyle}>
              <strong style={{ color: "#172036" }}>{detail.fileName}</strong>
              <div style={{ marginTop: 10 }}>
                <StatusBadge label={detail.status} tone="warning" />
              </div>
            </div>
            {[
              ["上传时间", detail.uploadedAt],
              ["来源等级", detail.sourceLevel],
              ["版本信息", detail.version],
              ["是否进入公共知识库", detail.inPublicKb],
              ["是否前端可引用", detail.frontendCitable],
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
            <h3 style={{ margin: 0, color: "#172036", fontSize: 18 }}>审核与处理</h3>
            <div style={boxStyle}>
              <strong style={{ color: "#172036" }}>审核意见</strong>
              <div style={{ marginTop: 8, color: "#71829f", lineHeight: 1.8 }}>{detail.reviewComment}</div>
            </div>
            <div style={boxStyle}>
              <strong style={{ color: "#172036" }}>解析状态</strong>
              <div style={{ marginTop: 8, color: "#71829f" }}>{detail.parseStatus}</div>
            </div>
            <div style={boxStyle}>
              <strong style={{ color: "#172036" }}>向量状态</strong>
              <div style={{ marginTop: 8, color: "#71829f" }}>{detail.vectorStatus}</div>
            </div>
          </div>
        </section>
      </section>
    </PageShell>
  );
}
