import Link from "next/link";
import { getCategory } from "@/lib/data";
import { Chip, ScorePill } from "@/components/Score";

export default function ShowCard({ show }) {
  const cat = getCategory(show.category);
  return (
    <Link
      href={`/shows/${show.slug}`}
      className="fcard"
      style={{
        display: "block",
        background: "#fff",
        border: "2px solid var(--cream-200)",
        borderRadius: 6,
        padding: "20px 20px 18px",
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
          gap: 12,
        }}
      >
        <div>
          <h3
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--ink-900)",
              fontSize: 24,
              lineHeight: 1.12,
              margin: 0,
            }}
          >
            {show.title}
          </h3>
          <div
            style={{
              color: "var(--ink-500)",
              fontSize: 13,
              fontWeight: 700,
              margin: "4px 0 0",
            }}
          >
            {show.network} · {show.year} · {show.epLength}
          </div>
        </div>
        <ScorePill score={show.overall} />
      </div>
      <div style={{ margin: "12px 0 10px" }}>
        <Chip icon={cat.icon} label={cat.label} />
      </div>
      <p
        className="clamp-2"
        style={{
          fontSize: 14.5,
          lineHeight: 1.5,
          color: "var(--ink-500)",
          margin: 0,
        }}
      >
        {show.tagline}
      </p>
    </Link>
  );
}
