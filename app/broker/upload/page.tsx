import Link from "next/link";
import type { CSSProperties } from "react";
import { InfoCard } from "../../../components/info-card";
import { PageShell } from "../../../components/page-shell";
import { ToolbarButton } from "../../../components/toolbar-button";

const steps = [
  "Step 1：上传文件",
  "Step 2：填写资料信息",
  "Step 3：确认共享与审核规则",
  "Step 4：提交审核",
];

export default function BrokerUploadPage() {
  return (
    <PageShell
      title="文件上传"
      description="请按步骤填写文件信息并提交审核。平台审核通过后，资料才可被 Agent 检索和引用。"
      actions={
        <>
          <Link href="/broker/upload/success">
            <ToolbarButton>查看成功页</ToolbarButton>
          </Link>
          <ToolbarButton tone="dark">提交审核</ToolbarButton>
        </>
      }
    >
      <div style={{ padding: 18, borderRadius: 22, background: "#fff8e6", color: "#b45c12", lineHeight: 1.8, border: "1px solid #f1ddb6" }}>
        上传并提交审核后，该资料可能被纳入平台公共知识库，供平台内问答服务使用。资料需经平台管理员审核后才会被 Agent 检索和引用。
      </div>

      <section style={{ display: "grid", gap: 18, gridTemplateColumns: "1fr 0.9fr" }}>
        <InfoCard title="上传向导" description="分步骤录入资料信息，便于后续审核与版本管理。">
          <div style={{ display: "grid", gap: 14 }}>
            {steps.map((step, index) => (
              <div key={step} style={{ padding: 16, borderRadius: 18, background: index === 0 ? "#111a2d" : "#f7faff", color: index === 0 ? "#fff" : "#16223b", fontWeight: 700 }}>
                {step}
              </div>
            ))}
          </div>

          <div style={{ display: "grid", gap: 12, marginTop: 18 }}>
            {["文件类型", "来源等级", "语言", "关联产品", "版本号", "发布日期", "生效日期", "失效日期", "优惠开始日期", "优惠结束日期", "是否内部培训资料", "备注"].map((label) => (
              <label key={label} style={{ display: "grid", gap: 8 }}>
                <span style={{ color: "#6f809d", fontSize: 12 }}>{label}</span>
                <div style={fieldStyle}>{label === "备注" ? "填写补充说明" : `请选择${label}`}</div>
              </label>
            ))}
          </div>
        </InfoCard>

        <InfoCard title="共享与审核规则">
          <div style={{ display: "grid", gap: 12 }}>
            <div style={{ padding: 16, borderRadius: 18, background: "#f4f8fe" }}>经纪公司不能自审，需平台管理员审核。</div>
            <div style={{ padding: 16, borderRadius: 18, background: "#f4f8fe" }}>审核通过后才会进入公共知识库并允许 Agent 使用。</div>
            <div style={{ padding: 16, borderRadius: 18, background: "#fff8e6", color: "#b45c12" }}>内部培训资料若被引用，前端必须提示“以官方条款为准”。</div>
          </div>
        </InfoCard>
      </section>
    </PageShell>
  );
}

const fieldStyle: CSSProperties = {
  minHeight: 46,
  borderRadius: 16,
  border: "1px solid #dbe5f2",
  background: "#f7faff",
  display: "grid",
  alignItems: "center",
  padding: "0 14px",
  color: "#6f809d",
};
