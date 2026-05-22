import Link from "next/link";
import { DataTable, type TableRow } from "../../components/data-table";
import { InfoCard } from "../../components/info-card";
import { PageShell } from "../../components/page-shell";
import { StatCard } from "../../components/stat-card";
import { StatusBadge } from "../../components/status-badge";
import { ToolbarButton } from "../../components/toolbar-button";
import { getBrokerAnalytics, getBrokerDocuments } from "../../lib/api";
import { brokerDocuments, brokerStats, brokerChatSessions } from "../../lib/mock-data";

export default async function BrokerPage() {
  let stats = brokerStats;
  let documents: TableRow[] = brokerDocuments.map(([fileName, fileType, version, status]) => [
    fileName,
    fileType,
    version,
    <StatusBadge key={`${fileName}-status`} label={status} />,
  ]);

  try {
    const [analytics, documentResponse] = await Promise.all([getBrokerAnalytics(), getBrokerDocuments()]);

    stats = [
      { label: "本月问答", value: String(analytics.askCount).replace(/\B(?=(\d{3})+(?!\d))/g, ","), note: "较上月 +12%" },
      { label: "上传文件", value: "126", note: "待审核 14" },
      { label: "无答案问题", value: String(analytics.unansweredCount), note: "需补充 FAQ" },
      { label: "产品对比", value: String(analytics.compareCount), note: "高频：医疗险" },
    ];

    documents = documentResponse.items.map((item) => [
      item.fileName,
      item.sourceLevel ?? "产品资料",
      item.version ?? "-",
      <StatusBadge key={`${item.id}-status`} label={item.status} />,
    ]);
  } catch {
    // Keep mock view.
  }

  return (
    <PageShell
      title="经纪公司工作台"
      description="上传资料需平台审核后进入公共知识库；本后台仅查看本公司数据"
      actions={
        <Link href="/broker/upload">
          <ToolbarButton tone="dark">上传资料</ToolbarButton>
        </Link>
      }
    >
      <section style={{ display: "grid", gap: 20, gridTemplateColumns: "repeat(4, minmax(0, 1fr))" }}>
        {stats.map((stat) => (
          <StatCard key={stat.label} label={stat.label} value={stat.value} note={stat.note} />
        ))}
      </section>

      <section style={{ display: "grid", gap: 20, gridTemplateColumns: "1.45fr 0.72fr" }}>
        <InfoCard title="文件状态" description="经纪公司只能查看自身上传文件状态">
          <DataTable headers={["文件", "类型", "版本", "状态"]} rows={documents} gridTemplateColumns="2fr 1fr 0.8fr 0.8fr" />
        </InfoCard>

        <InfoCard title="上传限制提示">
          <div style={{ display: "grid", gap: 12 }}>
            <div style={{ padding: 16, borderRadius: 18, background: "#f4f8fe" }}>
              <strong>允许上传</strong>
              <div style={{ marginTop: 6, color: "#71829f" }}>产品小册子、计划书、保单摘要、普通图片</div>
            </div>
            <div style={{ padding: 16, borderRadius: 18, background: "#f4f8fe" }}>
              <strong>禁止上传</strong>
              <div style={{ marginTop: 6, color: "#71829f" }}>身份证、银行资料、医疗报告、诊断文件</div>
            </div>
            <div style={{ padding: 16, borderRadius: 18, background: "#f4f8fe" }}>
              <strong>保存期限</strong>
              <div style={{ marginTop: 6, color: "#71829f" }}>客户上传文件默认保存 1 个月</div>
            </div>
          </div>
        </InfoCard>
      </section>

      <InfoCard title="本公司咨询记录">
        <DataTable headers={["问题", "分类", "来源命中", "风险", "时间"]} rows={brokerChatSessions} gridTemplateColumns="2.6fr 0.8fr 0.8fr 1.1fr 0.7fr" />
      </InfoCard>
    </PageShell>
  );
}
