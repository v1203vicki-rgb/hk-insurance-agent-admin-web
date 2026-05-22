import type { ReactNode } from "react";

export function ToolbarButton({
  children,
  tone = "light",
}: {
  children: ReactNode;
  tone?: "light" | "dark";
}) {
  const isDark = tone === "dark";

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: 46,
        padding: "0 22px",
        borderRadius: 18,
        border: isDark ? "1px solid #141d33" : "1px solid #d7e1ee",
        background: isDark ? "#141d33" : "#ffffff",
        color: isDark ? "#ffffff" : "#1a2540",
        fontWeight: 700,
        fontSize: 15,
        whiteSpace: "nowrap",
        boxShadow: isDark ? "0 10px 18px rgba(20, 29, 51, 0.12)" : "none",
      }}
    >
      {children}
    </span>
  );
}
