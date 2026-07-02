import Link from "next/link";
import { getAgeGroup, getCategory, scoreColor } from "@/lib/data";
import { Chip } from "@/components/Score";

export default function ShowCard({ show }) {
  const age = getAgeGroup(show.ageGroup);
  const cat = getCategory(show.category);
  return (
    <Link
      href={`/shows/${show.slug}`}
      className="fcard"
      style={{
        display: "block",
        background: "#fff",
        border: `2px solid ${age.color}`,
        borderRadius: 6,
        padding: "28px 26px",
        textAlign: "left",
        boxShadow: "var(--shadow-card)",
        textDecoration: "none",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 14,
        }}
      >
        <h3
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--ink-900)",
            fontSize: 26,
            lineHeight: 1.15,
            margin: 0,
          }}
        >
          {show.title}
        </h3>
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: "50%",
            border: `3px solid ${scoreColor(show.overall)}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "var(--font-display)",
            fontSize: 22,
            color: "var(--ink-900)",
            flexShrink: 0,
            background: "var(--cream-50)",
          }}
        >
          {show.overall}
        </div>
      </div>
      <div
        style={{
          color: "var(--ink-500)",
          fontSize: 14,
          fontWeight: 700,
          margin: "4px 0 14px",
        }}
      >
        {show.network} · {show.year} · {show.epLength}
      </div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 14 }}>
        <Chip
          icon={age.icon}
          label={`${age.label} ${age.range}`}
          color={age.color}
          tint={age.tint}
        />
        <Chip icon={cat.icon} label={cat.label} color="var(--ink-500)" />
      </div>
      <p
        style={{
          fontSize: 15.5,
          lineHeight: 1.55,
          color: "var(--ink-500)",
          margin: 0,
        }}
      >
        {show.tagline}
      </p>
    </Link>
  );
}
