import { scoreTier } from "@/lib/data";

/* Horizontal score bar with the number alongside, colored by tier. */
export function ScoreBar({ score }) {
  const tier = scoreTier(score);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div className="scorebar-track" style={{ flex: 1 }}>
        <div
          className="scorebar-fill"
          style={{ width: `${score}%`, background: tier.color }}
        />
      </div>
      <span
        style={{
          fontWeight: 800,
          fontSize: 14,
          color: tier.color,
          width: 26,
          textAlign: "right",
        }}
      >
        {score}
      </span>
    </div>
  );
}

/* Solid circular badge for cards — color alone says good/okay/poor. */
export function ScorePill({ score, size = 46 }) {
  const tier = scoreTier(score);
  return (
    <div
      title={`Score ${score} — ${tier.label}`}
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: tier.color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "var(--font-display)",
        fontSize: size * 0.44,
        color: "#fff",
        flexShrink: 0,
      }}
    >
      {score}
    </div>
  );
}

/* Big headline score for show pages: disc + Great/Okay/Poor pill. */
export function ScoreDisc({ score, size = 110 }) {
  const tier = scoreTier(score);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 10,
        flexShrink: 0,
      }}
    >
      <div
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          border: `4px solid ${tier.color}`,
          background: tier.tint,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "var(--shadow-card)",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: size * 0.42,
            lineHeight: 1,
            color: "var(--ink-900)",
          }}
        >
          {score}
        </span>
        <span
          style={{
            fontSize: size * 0.1,
            fontWeight: 800,
            letterSpacing: ".08em",
            textTransform: "uppercase",
            color: "var(--ink-500)",
          }}
        >
          score
        </span>
      </div>
      <span
        style={{
          background: tier.color,
          color: "#fff",
          fontWeight: 800,
          fontSize: 13,
          padding: "4px 14px",
          borderRadius: 999,
        }}
      >
        {tier.label} fit
      </span>
    </div>
  );
}

/* Small neutral pill chip for age bands and categories. */
export function Chip({ icon, label }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        fontWeight: 800,
        fontSize: 13,
        color: "var(--ink-700)",
        background: "var(--cream-200)",
        padding: "5px 12px",
        borderRadius: 999,
        whiteSpace: "nowrap",
      }}
    >
      {icon ? (
        <i className={icon} style={{ color: "var(--ink-500)", fontSize: 15 }} />
      ) : null}
      {label}
    </span>
  );
}

/* One-line key for the traffic-light scale. */
export function Legend({ style }) {
  const tiers = [
    { label: "80+ great", color: "var(--score-great)" },
    { label: "60–79 okay", color: "var(--score-okay)" },
    { label: "below 60 poor", color: "var(--score-poor)" },
  ];
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 16,
        fontSize: 13,
        fontWeight: 700,
        color: "var(--ink-500)",
        ...style,
      }}
    >
      {tiers.map((t) => (
        <span
          key={t.label}
          style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
        >
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: t.color,
            }}
          />
          {t.label}
        </span>
      ))}
    </div>
  );
}
