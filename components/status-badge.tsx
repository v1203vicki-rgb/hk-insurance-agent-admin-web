const normalizedToneMap: Record<string, { background: string; color: string }> = {
  ENABLED: { background: "#e8fbf0", color: "#0f9f6e" },
  ACTIVE: { background: "#e8fbf0", color: "#0f9f6e" },
  APPROVED: { background: "#e8fbf0", color: "#0f9f6e" },
  READY: { background: "#e8fbf0", color: "#0f9f6e" },
  已启用: { background: "#e8fbf0", color: "#0f9f6e" },
  已通过: { background: "#e8fbf0", color: "#0f9f6e" },
  已完成: { background: "#e8fbf0", color: "#0f9f6e" },
  待审核: { background: "#fff7dd", color: "#cf8a00" },
  审核中: { background: "#fff7dd", color: "#cf8a00" },
  PENDING_REVIEW: { background: "#fff7dd", color: "#cf8a00" },
  PENDING_PARSE: { background: "#eef5ff", color: "#4e76df" },
  PARSED: { background: "#eef5ff", color: "#4e76df" },
  VECTOR_READY: { background: "#eef5ff", color: "#4e76df" },
  信息: { background: "#eef5ff", color: "#4e76df" },
  已过期: { background: "#fff1f2", color: "#dc2626" },
  高风险: { background: "#fff1f2", color: "#dc2626" },
  EXPIRED: { background: "#fff1f2", color: "#dc2626" },
  DISABLED: { background: "#f2f4f7", color: "#6b7280" },
  ARCHIVED: { background: "#f2f4f7", color: "#6b7280" },
  REJECTED: { background: "#f2f4f7", color: "#6b7280" },
  禁用: { background: "#f2f4f7", color: "#6b7280" },
  已归档: { background: "#f2f4f7", color: "#6b7280" },
  已驳回: { background: "#f2f4f7", color: "#6b7280" },
  L1: { background: "#eef5ff", color: "#4e76df" },
  L2: { background: "#eef5ff", color: "#4e76df" },
  L3: { background: "#eef5ff", color: "#4e76df" },
  L4: { background: "#eef5ff", color: "#4e76df" },
  L5: { background: "#fff7dd", color: "#cf8a00" },
  平台管理员: { background: "#eef5ff", color: "#4e76df" },
  经纪公司管理员: { background: "#e8fbf0", color: "#0f9f6e" },
  经纪人: { background: "#fff7dd", color: "#cf8a00" },
};

export function StatusBadge({
  label,
  tone,
}: {
  label: string;
  tone?: "success" | "warning" | "danger" | "muted" | "info";
}) {
  const palette =
    tone === "success"
      ? { background: "#e8fbf0", color: "#0f9f6e" }
      : tone === "warning"
        ? { background: "#fff7dd", color: "#cf8a00" }
        : tone === "danger"
          ? { background: "#fff1f2", color: "#dc2626" }
          : tone === "muted"
            ? { background: "#f2f4f7", color: "#6b7280" }
            : tone === "info"
              ? { background: "#eef5ff", color: "#4e76df" }
              : normalizedToneMap[label] ?? { background: "#f4f7fb", color: "#71829f" };

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: 28,
        padding: "0 12px",
        borderRadius: 999,
        background: palette.background,
        color: palette.color,
        fontSize: 12,
        fontWeight: 700,
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </span>
  );
}
