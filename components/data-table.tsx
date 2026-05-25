import type { ReactNode } from "react";

export type TableRow = Array<string | ReactNode>;

export function DataTable({
  headers,
  rows,
  gridTemplateColumns,
}: {
  headers: string[];
  rows: TableRow[];
  gridTemplateColumns?: string;
}) {
  const columns = gridTemplateColumns ?? `repeat(${headers.length}, minmax(140px, 1fr))`;

  return (
    <div style={{ overflowX: "auto", borderRadius: 24, border: "1px solid #dbe5f2", background: "#ffffff" }}>
      <div style={{ minWidth: 900 }}>
        <div
          style={{
            position: "sticky",
            top: 0,
            zIndex: 1,
            display: "grid",
            gridTemplateColumns: columns,
            background: "#f4f8fe",
            color: "#71829f",
            fontSize: 14,
            fontWeight: 700,
          }}
        >
          {headers.map((header) => (
            <div key={header} style={{ padding: "16px 16px" }}>
              {header}
            </div>
          ))}
        </div>

        {rows.length === 0 ? (
          <div style={{ padding: 24, color: "#71829f", fontSize: 14 }}>暂无数据</div>
        ) : (
          rows.map((row, index) => (
            <div key={index} style={{ display: "grid", gridTemplateColumns: columns, borderTop: "1px solid #e3eaf5" }}>
              {row.map((cell, cellIndex) => (
                <div key={cellIndex} style={{ padding: "16px 16px", color: "#172036", lineHeight: 1.7, fontSize: 14 }}>
                  {cell}
                </div>
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
