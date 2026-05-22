import { PageShell } from "../../../components/page-shell";
import { getBrokerAuditLogs } from "../../../lib/api";

const cardStyle = {
  padding: 28,
  borderRadius: 30,
  border: "1px solid #dbe5f2",
  background: "#ffffff",
  boxShadow: "0 10px 24px rgba(18, 31, 54, 0.04)",
} as const;

const inputStyle = {
  minHeight: 46,
  display: "flex",
  alignItems: "center",
  padding: "0 18px",
  borderRadius: 18,
  border: "1px solid #dbe5f2",
  background: "#f7faff",
  color: "#9aa8c0",
  fontSize: 15,
} as const;

const cellStyle = {
  padding: "16px 16px",
  borderTop: "1px solid #dbe5f2",
  color: "#172036",
} as const;

const fallbackRows = [
  ["港华 Admin", "上传资料", "AIA_重疾险_产品小册子.pdf", "待审核", "2026-05-21 09:41"],
  ["港华 Admin", "导出会话", "匿名会话记录", "已导出", "2026-05-20 15:33"],
  ["Agent Wong", "查看会话", "匿名客户 #A102", "已查看", "2026-05-20 11:08"],
  ["港华 Admin", "新增经纪人", "Agent Chan", "启用", "2026-05-19 16:20"],
];

export default async function BrokerAuditLogsPage() {
  let rows = fallbackRows;

  try {
    const logs = await getBrokerAuditLogs();
    rows = logs.map((item) => [item.user, item.action, item.targetType, item.result, item.time]);
  } catch {
    // Use fallback rows.
  }

  return (
    <PageShell title="操作日志" description="本公司上传、查看会话、导出和账号操作记录">
      <section style={cardStyle}>
        <div style={{ display: "grid", gap: 28 }}>
          <div style={{ display: "flex", gap: 16, justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ ...inputStyle, flex: 1, maxWidth: 430 }}>搜索操作 / 用户 / 文件</div>
            <div style={{ display: "flex", gap: 12 }}>
              <div style={{ ...inputStyle, minWidth: 100, justifyContent: "center", color: "#5b6e8a" }}>筛选</div>
              <div style={{ ...inputStyle, minWidth: 100, justifyContent: "center", color: "#5b6e8a" }}>导出</div>
            </div>
          </div>

          <div style={{ overflow: "hidden", borderRadius: 24, border: "1px solid #dbe5f2" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1.9fr 0.9fr 1.1fr", background: "#f4f8fe", color: "#71829f", fontWeight: 700 }}>
              <div style={{ padding: "16px 16px" }}>用户</div>
              <div style={{ padding: "16px 16px" }}>操作</div>
              <div style={{ padding: "16px 16px" }}>目标</div>
              <div style={{ padding: "16px 16px" }}>结果</div>
              <div style={{ padding: "16px 16px" }}>时间</div>
            </div>
            {rows.map(([user, action, target, result, time]) => (
              <div key={`${user}-${action}-${time}`} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1.9fr 0.9fr 1.1fr" }}>
                <div style={cellStyle}>{user}</div>
                <div style={cellStyle}>{action}</div>
                <div style={cellStyle}>{target}</div>
                <div style={cellStyle}>{result}</div>
                <div style={cellStyle}>{time}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
