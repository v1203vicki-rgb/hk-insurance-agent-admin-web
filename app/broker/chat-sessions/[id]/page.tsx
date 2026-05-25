import { notFound } from "next/navigation";
import { PageShell } from "../../../../components/page-shell";
import { StatusBadge } from "../../../../components/status-badge";

const details: Record<string, { question: string; answer: string; risk: string; citations: string[]; note: string }> = {
  session_1: {
    question: "香港重疾险和内地重疾险有什么区别？",
    answer: "以下说明基于已启用资料整理，重点从监管、条款定义和等待期角度做客观说明。",
    risk: "低",
    citations: ["A公司重疾计划条款.pdf · P.5", "A公司重疾计划条款.pdf · P.12"],
    note: "正常知识问答，可匿名导出。",
  },
  session_2: {
    question: "A公司和B公司的医疗险哪个更适合我？",
    answer: "我可以说明资料差异和一般适用场景，但不能基于个人情况作出购买建议。",
    risk: "中：个性化倾向",
    citations: ["A公司高端医疗条款.pdf · P.12", "B公司医疗险小册子.pdf · P.8", "B公司优惠通告.pdf · 已过期"],
    note: "涉及个性化建议倾向，已触发拒答模板。",
  },
};

const cardStyle = {
  padding: 28,
  borderRadius: 28,
  border: "1px solid #dbe5f2",
  background: "#ffffff",
} as const;

export default async function BrokerChatSessionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const detail = details[id];
  if (!detail) notFound();

  return (
    <PageShell title="本公司会话详情" description="展示完整问答、来源命中、风险提示和匿名导出说明。">
      <section style={{ display: "grid", gap: 20, gridTemplateColumns: "1fr 1fr" }}>
        <section style={cardStyle}>
          <div style={{ display: "grid", gap: 14 }}>
            <h3 style={{ margin: 0, color: "#172036", fontSize: 18 }}>会话信息</h3>
            <div style={{ padding: 16, borderRadius: 18, background: "#f4f8fe", lineHeight: 1.8, color: "#172036" }}>
              <strong>问题：</strong>{detail.question}
            </div>
            <div style={{ padding: 16, borderRadius: 18, background: "#f4f8fe", lineHeight: 1.8, color: "#172036" }}>
              <strong>回答：</strong>{detail.answer}
            </div>
            <StatusBadge label={detail.risk} tone={detail.risk.startsWith("中") ? "warning" : "success"} />
          </div>
        </section>

        <section style={cardStyle}>
          <div style={{ display: "grid", gap: 14 }}>
            <h3 style={{ margin: 0, color: "#172036", fontSize: 18 }}>来源命中与说明</h3>
            {detail.citations.map((item) => (
              <div key={item} style={{ padding: 16, borderRadius: 18, background: "#f4f8fe", color: "#172036" }}>
                {item}
              </div>
            ))}
            <div style={{ padding: 16, borderRadius: 18, background: "#f4f8fe", color: "#71829f", lineHeight: 1.8 }}>{detail.note}</div>
          </div>
        </section>
      </section>
    </PageShell>
  );
}
