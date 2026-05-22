import Link from "next/link";
import { InfoCard } from "../../../components/info-card";
import { PageShell } from "../../../components/page-shell";
import { ToolbarButton } from "../../../components/toolbar-button";

export default function BrokerUploadPage() {
  return (
    <PageShell
      title="文件上传"
      description="上传并提交审核后，资料可能进入平台公共知识库，供平台内问答服务使用。"
      actions={
        <>
          <Link href="/broker/upload/success">
            <ToolbarButton>查看成功页</ToolbarButton>
          </Link>
          <ToolbarButton tone="dark">提交审核</ToolbarButton>
        </>
      }
    >
      <section style={{ display: "grid", gap: 20, gridTemplateColumns: "1fr 0.95fr" }}>
        <InfoCard title="上传资料" description="支持产品小册子、条款 PDF、费率表、内部培训材料和优惠政策。">
          <div style={{ display: "grid", gap: 14 }}>
            {["拖拽或点击上传", "产品 / 版本关联", "资料类型选择", "语言和来源等级", "发布日期 / 生效日期 / 失效日期"].map((item) => (
              <div key={item} style={{ borderRadius: 18, border: "1px solid #dbe5f2", background: "#f7faff", padding: "14px 16px", color: "#6f809d" }}>
                {item}
              </div>
            ))}
          </div>
        </InfoCard>
        <InfoCard title="上传规则">
          <div style={{ display: "grid", gap: 12 }}>
            <div style={{ padding: 16, borderRadius: 18, background: "#f4f8fe" }}>审核通过后，Agent 才可以检索和引用。</div>
            <div style={{ padding: 16, borderRadius: 18, background: "#f4f8fe" }}>经纪公司不能自审；平台管理员审核后生效。</div>
            <div style={{ padding: 16, borderRadius: 18, background: "#fff8e6", color: "#b45c12" }}>内部培训资料可引用，但必须提示“以官方条款为准”。</div>
          </div>
        </InfoCard>
      </section>
    </PageShell>
  );
}
