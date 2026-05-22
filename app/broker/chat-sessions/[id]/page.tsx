import { PageShell } from "../../../../components/page-shell";

const cardStyle = {
  padding: 28,
  borderRadius: 28,
  border: "1px solid #dbe5f2",
  background: "#ffffff",
} as const;

const innerStyle = {
  padding: "16px 18px",
  borderRadius: 18,
  background: "#f4f8fe",
} as const;

export default function BrokerChatSessionDetailPage() {
  return (
    <PageShell title="本公司会话详情" description="查看会话内容、来源命中和风险提示，不展示客户真实身份信息。">
      <section style={{ display: "grid", gap: 20, gridTemplateColumns: "1fr 1fr" }}>
        <section style={cardStyle}>
          <div style={{ display: "grid", gap: 14 }}>
            <h3 style={{ margin: 0, color: "#172036", fontSize: 24 }}>会话信息</h3>
            <div style={innerStyle}>
              <strong style={{ color: "#172036" }}>客户问题</strong>
              <div style={{ marginTop: 8, color: "#71829f", lineHeight: 1.8 }}>A 公司和 B 公司的医疗险哪个更适合我？</div>
            </div>
            <div style={innerStyle}>
              <strong style={{ color: "#172036" }}>Agent 回答摘要</strong>
              <div style={{ marginTop: 8, color: "#71829f", lineHeight: 1.8 }}>
                以下仅展示资料差异，不构成购买建议。可从保障地区、年度限额、自付额和病房级别比较。
              </div>
            </div>
          </div>
        </section>

        <section style={cardStyle}>
          <div style={{ display: "grid", gap: 14 }}>
            <h3 style={{ margin: 0, color: "#172036", fontSize: 24 }}>风险说明</h3>
            <div style={innerStyle}>
              <strong style={{ color: "#172036" }}>风险标签</strong>
              <div style={{ marginTop: 8, color: "#ff8a00" }}>中：个性化倾向</div>
            </div>
            <div style={innerStyle}>
              <strong style={{ color: "#172036" }}>来源命中</strong>
              <div style={{ marginTop: 8, color: "#71829f", lineHeight: 1.8 }}>共命中 5 个来源，其中 2 个为官方条款，1 个优惠通告已过期。</div>
            </div>
          </div>
        </section>
      </section>
    </PageShell>
  );
}
