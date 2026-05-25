import Link from "next/link";
import { MiniCard, MiniShell } from "../../../../components/mini-shell";

const items = [
  "香港保险冷静期是多久？",
  "香港保单退保价值怎么理解？",
  "保单贷款会不会影响保额和红利？",
  "投保后多久生效？",
];

export default function MiniKnowledgeCategoryPage() {
  return (
    <MiniShell title="香港保险基础" subtitle="监管 / 投保 / 冷静期 / 保费缴付" activeTab="knowledge">
      <MiniCard>
        <div style={{ display: "grid", gap: 12 }}>
          {items.map((item, index) => (
            <Link key={item} href={index === 0 ? "/mini/knowledge/detail" : "/mini/chat"} style={{ padding: 14, borderRadius: 18, background: "#f7faff", color: "#16223b", display: "flex", justifyContent: "space-between", gap: 12 }}>
              <span>{item}</span>
              <span style={{ color: "#9badc9" }}>›</span>
            </Link>
          ))}
        </div>
      </MiniCard>
    </MiniShell>
  );
}
