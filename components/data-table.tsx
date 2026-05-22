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
  const columns = gridTemplateColumns ?? `repeat(${headers.length}, minmax(0, 1fr))`;

  return (
    <div
      style={{
        border: "1px solid #dbe5f2",
        borderRadius: 24,
        overflow: "hidden",
        background: "#ffffff",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: columns,
          background: "#f4f8fe",
          fontSize: 15,
          color: "#71829f",
          fontWeight: 700,
        }}
      >
        {headers.map((header) => (
          <div key={header} style={{ padding: "18px 16px" }}>
            {header}
          </div>
        ))}
      </div>
      {rows.map((row, index) => (
        <div
          key={index}
          style={{
            display: "grid",
            gridTemplateColumns: columns,
            borderTop: "1px solid #e3eaf5",
          }}
        >
          {row.map((cell, cellIndex) => (
            <div key={cellIndex} style={{ padding: "18px 16px", color: "#172036", lineHeight: 1.7, fontSize: 15 }}>
              {cell}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
