const toneMap: Record<string, { background: string; color: string }> = {
  ENABLED: { background: "#e9fbf2", color: "#0e9f6e" },
  ACTIVE: { background: "#e9fbf2", color: "#0e9f6e" },
  已启用: { background: "#e9fbf2", color: "#0e9f6e" },
  启用: { background: "#e9fbf2", color: "#0e9f6e" },
  待审核: { background: "#fff6de", color: "#d98500" },
  PENDING_REVIEW: { background: "#fff6de", color: "#d98500" },
  审核中: { background: "#fff6de", color: "#d98500" },
  已过期: { background: "#fff0f2", color: "#ef476f" },
  EXPIRED: { background: "#fff0f2", color: "#ef476f" },
  停用: { background: "#fff0f2", color: "#ef476f" },
  DISABLED: { background: "#fff0f2", color: "#ef476f" },
  L1: { background: "#eef4ff", color: "#4872df" },
  L2: { background: "#eef4ff", color: "#4872df" },
  L3: { background: "#eef4ff", color: "#4872df" },
  L4: { background: "#eef4ff", color: "#4872df" },
  L5: { background: "#fff6de", color: "#d98500" },
};

export function StatusBadge({ label }: { label: string }) {
  const tone = toneMap[label] ?? { background: "#f3f6fb", color: "#6d809f" };

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: 32,
        padding: "0 14px",
        borderRadius: 999,
        background: tone.background,
        color: tone.color,
        fontSize: 14,
        fontWeight: 700,
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </span>
  );
}
