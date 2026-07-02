import { scoreColor } from "@/lib/data";

/* Horizontal age-fit score bar with the score number alongside. */
export function ScoreBar({ score }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <div className="scorebar-track" style={{ flex: 1 }}>
        <div
          className="scorebar-fill"
          style={{ width: `${score}%`, background: scoreColor(score) }}
        />
      </div>
      <span
        style={{
          fontWeight: 800,
          fontSize: 15,
          color: "var(--ink-900)",
          width: 28,
          textAlign: "right",
        }}
      >
        {score}
      </span>
    </div>
  );
}

/* Big circular headline score — the age-appropriateness roll-up. */
export function ScoreDisc({ score, size = 96 }) {
  const color = scoreColor(score);
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        border: `4px solid ${color}`,
        background: "var(--white)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "var(--shadow-card)",
        flexShrink: 0,
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontSize: size * 0.4,
          lineHeight: 1,
          color: "var(--ink-900)",
        }}
      >
        {score}
      </span>
      <span
        style={{
          fontSize: size * 0.11,
          fontWeight: 800,
          letterSpacing: ".06em",
          textTransform: "uppercase",
          color: "var(--ink-500)",
        }}
      >
        age fit
      </span>
    </div>
  );
}

/* Small pill chip, used for age bands and content categories. */
export function Chip({ icon, label, color, tint }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        fontWeight: 800,
        fontSize: 13,
        color: "var(--ink-700)",
        background: tint || "var(--cream-200)",
        padding: "5px 12px",
        borderRadius: 999,
        whiteSpace: "nowrap",
      }}
    >
      {icon ? <i className={icon} style={{ color, fontSize: 15 }} /> : null}
      {label}
    </span>
  );
}
