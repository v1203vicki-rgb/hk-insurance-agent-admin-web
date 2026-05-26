import type { ReactNode } from "react";

type FilterItem = {
  label: string;
  minWidth?: number;
};

export function TableControls({
  searchPlaceholder,
  filters = [],
  actions,
  selectionLabel = "已选择 0 项",
  batchActions,
  pageLabel = "第 1 页，共 6 页",
  pageSizeLabel = "每页 10 条",
}: {
  searchPlaceholder: string;
  filters?: FilterItem[];
  actions?: ReactNode;
  selectionLabel?: string;
  batchActions?: ReactNode;
  pageLabel?: string;
  pageSizeLabel?: string;
}) {
  return (
    <div style={{ display: "grid", gap: 14 }}>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "stretch" }}>
        <div style={{ ...fieldStyle, flex: "1 1 320px", minWidth: 280 }}>{searchPlaceholder}</div>
        {filters.map((filter) => (
          <div key={filter.label} style={{ ...fieldStyle, minWidth: filter.minWidth ?? 148 }}>
            {filter.label}
          </div>
        ))}
        {actions ? <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginLeft: "auto" }}>{actions}</div> : null}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 12,
          flexWrap: "wrap",
          alignItems: "center",
          padding: "14px 16px",
          borderRadius: 18,
          border: "1px solid #dbe5f2",
          background: "#f9fbff",
        }}
      >
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
          <span style={{ color: "#6f809d", fontSize: 13, fontWeight: 700 }}>{selectionLabel}</span>
          {batchActions ? <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>{batchActions}</div> : null}
        </div>

        <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
          <span style={pageMetaStyle}>{pageSizeLabel}</span>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <span style={pagerButtonStyle}>上一页</span>
            <span style={pageMetaStyle}>{pageLabel}</span>
            <span style={pagerButtonStyle}>下一页</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const fieldStyle = {
  minHeight: 46,
  borderRadius: 16,
  border: "1px solid #dbe5f2",
  background: "#f7faff",
  display: "grid",
  alignItems: "center",
  padding: "0 14px",
  color: "#6f809d",
  fontSize: 14,
  whiteSpace: "nowrap" as const,
};

const pageMetaStyle = {
  color: "#6f809d",
  fontSize: 13,
  fontWeight: 600,
};

const pagerButtonStyle = {
  minHeight: 34,
  padding: "0 12px",
  borderRadius: 12,
  border: "1px solid #dbe5f2",
  background: "#ffffff",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#1b2740",
  fontSize: 13,
  fontWeight: 700,
};
