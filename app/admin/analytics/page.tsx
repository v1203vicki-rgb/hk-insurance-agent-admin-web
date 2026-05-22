import { InfoCard } from "../../../components/info-card";
import { PageShell } from "../../../components/page-shell";
import { StatCard } from "../../../components/stat-card";
import { getPlatformAnalytics } from "../../../lib/api";

export default async function AdminAnalyticsPage() {
  let asks = "28,431";
  let compare = "4,218";
  let unanswered = "386";
  let coverage = "100%";

  try {
    const analytics = await getPlatformAnalytics();
    asks = String(analytics.askCount).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    compare = String(analytics.compareCount).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    unanswered = String(analytics.unansweredCount);
    coverage = `${Math.round((analytics.citationCoverage ?? 1) * 100)}%`;
  } catch {
    // Use mock numbers.
  }

  return (
    <PageShell title="数据看板" description="问答量、热门问题、无答案问题、产品对比次数和引用覆盖率总览">
      <section style={{ display: "grid", gap: 20, gridTemplateColumns: "repeat(4, minmax(0, 1fr))" }}>
        <StatCard label="问答量" value={asks} />
        <StatCard label="产品对比次数" value={compare} />
        <StatCard label="无答案问题" value={unanswered} />
        <StatCard label="引用覆盖率" value={coverage} />
      </section>

      <section style={{ display: "grid", gap: 20, gridTemplateColumns: "1fr 1fr" }}>
        <InfoCard title="热门问题 Top 5">
          <div style={{ display: "grid", gap: 14 }}>
            {[
              ["香港保险冷静期是多久？", "1,294"],
              ["储蓄险保证与非保证利益有什么区别？", "1,108"],
              ["重疾险多次赔付如何理解？", "876"],
              ["保单贷款会影响红利吗？", "524"],
              ["医疗险共同保险如何理解？", "471"],
            ].map(([label, count]) => (
              <div key={label} style={{ display: "flex", justifyContent: "space-between", gap: 16 }}>
                <span style={{ color: "#172036" }}>{label}</span>
                <span style={{ color: "#71829f" }}>{count}</span>
              </div>
            ))}
          </div>
        </InfoCard>

        <InfoCard title="无答案问题明细">
          <div style={{ display: "grid", gap: 14 }}>
            {[
              ["保单贷款是否会影响红利发放？", "27%"],
              ["内地客户投保需要哪些赴港材料？", "23%"],
              ["哪些优惠已过期但仍被咨询？", "19%"],
              ["重疾险定义差异怎么解释？", "17%"],
            ].map(([label, value]) => (
              <div key={label} style={{ display: "grid", gap: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 16 }}>
                  <span style={{ color: "#172036" }}>{label}</span>
                  <span style={{ color: "#71829f" }}>{value}</span>
                </div>
                <div style={{ height: 10, borderRadius: 999, background: "#edf3fc" }}>
                  <div style={{ width: value, height: "100%", borderRadius: 999, background: "#4b73e3" }} />
                </div>
              </div>
            ))}
          </div>
        </InfoCard>
      </section>
    </PageShell>
  );
}
