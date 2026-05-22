import type { ReactNode } from "react";

export function ActionChip({ children }: { children: ReactNode }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "11px 18px",
        borderRadius: 999,
        border: "1px solid #dbe5f2",
        background: "#ffffff",
        color: "#5f7394",
        fontSize: 15,
        lineHeight: 1,
        fontWeight: 500,
      }}
    >
      {children}
    </span>
  );
}
