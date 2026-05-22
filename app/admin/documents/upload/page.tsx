import { InfoCard } from "../../../../components/info-card";
import { PageShell } from "../../../../components/page-shell";
import { ToolbarButton } from "../../../../components/toolbar-button";

export default function AdminUploadFormPage() {
  return (
    <PageShell title="上传知识文件" description="上传知识文件并关联产品、版本、来源等级和有效期" actions={<ToolbarButton tone="dark">提交解析</ToolbarButton>}>
      <section style={{ display: "grid", gap: 20, gridTemplateColumns: "1fr 1fr" }}>
        <InfoCard title="上传文件">
          <div style={{ display: "grid", gap: 12 }}>
            {["拖拽或点击上传", "文件类型", "关联产品", "关联版本", "语言与来源等级"].map((item) => (
              <div key={item} style={{ borderRadius: 18, border: "1px solid #dbe5f2", background: "#f7faff", padding: "14px 16px", color: "#6f809d" }}>
                {item}
              </div>
            ))}
          </div>
        </InfoCard>
        <InfoCard title="版本与有效期">
          <div style={{ display: "grid", gap: 12 }}>
            {["版本号", "发布日期", "生效日期", "失效日期", "优惠开始/结束日期", "是否前端可引用"].map((item) => (
              <div key={item} style={{ borderRadius: 18, border: "1px solid #dbe5f2", background: "#f7faff", padding: "14px 16px", color: "#6f809d" }}>
                {item}
              </div>
            ))}
          </div>
        </InfoCard>
      </section>
    </PageShell>
  );
}
