import { InfoCard } from "../../../components/info-card";
import { PageShell } from "../../../components/page-shell";
import { StatCard } from "../../../components/stat-card";
import { ToolbarButton } from "../../../components/toolbar-button";
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
    // 演示模式使用 mock 数字。
  }

  return (
    <PageShell title="数据看板" description="支持时间范围筛选、趋势图占位、Top 问题、风险分布和租户排行预览。" actions={<ToolbarButton>今日 / 7日 / 30日 / 自定义</ToolbarButton>}>
      <section style={{ display: "grid", gap: 18, gridTemplateColumns: "repeat(4, minmax(0, 1fr))" }}>
        <StatCard label="问答量" value={asks} />
        <StatCard label="产品对比次数" value={compare} />
        <StatCard label="无答案问题" value={unanswered} />
        <StatCard label="引用覆盖率" value={coverage} />
      </section>

      <section style={{ display: "grid", gap: 18, gridTemplateColumns: "1.3fr 1fr" }}>
        <InfoCard title="问答量趋势图">
          <div style={{ minHeight: 220, borderRadius: 22, background: "linear-gradient(180deg, #f7faff 0%, #eef4ff 100%)", border: "1px dashed #c9d8ea", display: "grid", placeItems: "center", color: "#71829f" }}>
            趋势图占位区
          </div>
        </InfoCard>
        <InfoCard title="高风险问题分布">
          <div style={{ minHeight: 220, borderRadius: 22, background: "linear-gradient(180deg, #fff8f8 0%, #fff1f2 100%)", border: "1px dashed #f0c4cb", display: "grid", placeItems: "center", color: "#b35f6c" }}>
            分布图占位区
          </div>
        </InfoCard>
      </section>

      <section style={{ display: "grid", gap: 18, gridTemplateColumns: "1fr 1fr 1fr" }}>
        <InfoCard title="热门问题 Top 10">
          <List items={["香港保险冷静期是多久？", "储蓄险保证与非保证利益有什么区别？", "重疾险多次赔付如何理解？", "医疗险垫底费和共同保险有什么不同？"]} />
        </InfoCard>
        <InfoCard title="无答案问题 Top 10">
          <List items={["保单贷款是否会影响红利？", "赴港投保具体签署流程？", "哪些优惠已过期但仍常被问到？", "不同公司重疾定义如何比较？"]} />
        </InfoCard>
        <InfoCard title="各租户问答量排行">
          <List items={["港华保险经纪 · 2431", "湾区财富顾问 · 914", "星汇保险服务 · 3380", "南区保险服务 · 801"]} />
        </InfoCard>
      </section>
    </PageShell>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <div style={{ display: "grid", gap: 12 }}>
      {items.map((item) => (
        <div key={item} style={{ padding: "12px 14px", borderRadius: 16, background: "#f4f8fe", color: "#172036", lineHeight: 1.7 }}>
          {item}
        </div>
      ))}
    </div>
  );
}
