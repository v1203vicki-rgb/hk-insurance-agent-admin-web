import { InfoCard } from "../../../components/info-card";
import { PageShell } from "../../../components/page-shell";
import { StatCard } from "../../../components/stat-card";
import { getBrokerAnalytics } from "../../../lib/api";

export default async function BrokerAnalyticsPage() {
  let asks = "2,431";
  let compare = "418";
  let unanswered = "38";
  let topics = "14";

  try {
    const analytics = await getBrokerAnalytics();
    asks = String(analytics.askCount).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    compare = String(analytics.compareCount);
    unanswered = String(analytics.unansweredCount);
    topics = String(analytics.hotTopics?.length ?? 14);
  } catch {
    // Use mock values.
  }

  return (
    <PageShell title="本公司数据看板" description="本公司问答量、产品对比、热门问题和关注产品分析">
      <section style={{ display: "grid", gap: 20, gridTemplateColumns: "repeat(4, minmax(0, 1fr))" }}>
        <StatCard label="本月问答量" value={asks} />
        <StatCard label="产品对比次数" value={compare} />
        <StatCard label="无答案问题" value={unanswered} />
        <StatCard label="热门主题" value={topics} />
      </section>

      <section style={{ display: "grid", gap: 20, gridTemplateColumns: "1fr 1fr" }}>
        <InfoCard title="本公司热门问题">
          <div style={{ display: "grid", gap: 12 }}>
            {["香港保险冷静期是多久？", "高端医疗险差异怎么看？", "储蓄险回本期是否能直接回答？", "保单贷款影响红利吗？"].map((item) => (
              <div key={item} style={{ padding: "14px 16px", borderRadius: 18, background: "#f4f8fe", color: "#172036" }}>
                {item}
              </div>
            ))}
          </div>
        </InfoCard>
        <InfoCard title="产品关注度">
          <div style={{ display: "grid", gap: 14 }}>
            {[
              ["AIA 重疾系列", "28%"],
              ["CGL 储蓄系列", "24%"],
              ["高端医疗险系列", "21%"],
              ["分红险资料", "17%"],
            ].map(([label, width]) => (
              <div key={label} style={{ display: "grid", gap: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "#172036" }}>{label}</span>
                  <span style={{ color: "#71829f" }}>{width}</span>
                </div>
                <div style={{ height: 10, borderRadius: 999, background: "#edf3fc" }}>
                  <div style={{ width, height: "100%", borderRadius: 999, background: "#4b73e3" }} />
                </div>
              </div>
            ))}
          </div>
        </InfoCard>
      </section>
    </PageShell>
  );
}
