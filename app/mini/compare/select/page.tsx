import Link from "next/link";
import { MiniCard, MiniShell } from "../../../../components/mini-shell";

export default function MiniCompareSelectPage() {
  return (
    <MiniShell title="选择产品" subtitle="选择保险公司、产品和版本后生成客观对比" activeTab="chat">
      <MiniCard>
        <div style={{ display: "grid", gap: 12 }}>
          {["选择保险公司", "选择产品", "选择版本", "添加第二个产品"].map((label, index) => (
            <div key={label}>
              <div style={{ color: "#71829f", fontSize: 12, marginBottom: 8 }}>{label}</div>
              <div style={{ minHeight: 50, borderRadius: 18, background: "#f7faff", border: "1px solid #dbe5f2", display: "grid", alignItems: "center", padding: "0 16px", color: "#16223b" }}>
                {index === 0 ? "A公司 / B公司" : index === 1 ? "尊尚医疗 / 环球医疗" : index === 2 ? "v2026.03 / v2026.02" : "已添加第二个产品"}
              </div>
            </div>
          ))}
        </div>
        <Link href="/mini/compare" style={{ marginTop: 18, minHeight: 52, borderRadius: 18, background: "#111a2d", color: "#fff", display: "grid", placeItems: "center", fontWeight: 700 }}>
          生成对比
        </Link>
      </MiniCard>
    </MiniShell>
  );
}
