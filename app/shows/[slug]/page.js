import Link from "next/link";
import { notFound } from "next/navigation";
import {
  METRIC_GROUPS,
  SHOWS as SEED_SHOWS,
  getAgeGroup,
  getCategory,
  groupScore,
  metricsByGroup,
  scoreTier,
} from "@/lib/data";
import { getShowBySlug, getShows } from "@/lib/store";
import { Chip, Legend, ScoreBar, ScoreDisc } from "@/components/Score";

/* Prerender the seed shows at build time; shows added later through
   the admin render on demand (dynamicParams default). */
export function generateStaticParams() {
  return SEED_SHOWS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const show = await getShowBySlug(slug);
  if (!show) return {};
  return {
    title: `${show.title} — KidLens rating`,
    description: show.tagline,
  };
}

export default async function ShowPage({ params }) {
  const { slug } = await params;
  const show = await getShowBySlug(slug);
  if (!show) notFound();
  const allShows = await getShows();

  const age = getAgeGroup(show.ageGroup);
  const cat = getCategory(show.category);

  return (
    <main style={{ padding: "36px 7vw 64px" }}>
      <Link
        className="navlink"
        href="/shows"
        style={{
          color: "var(--ink-500)",
          fontWeight: 700,
          fontSize: 14,
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        <i className="ph-fill ph-arrow-left" />
        All shows
      </Link>

      {/* ---- Header ---- */}
      <header
        className="reveal"
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 28,
          flexWrap: "wrap",
          margin: "18px 0 0",
        }}
      >
        <div style={{ maxWidth: 640 }}>
          <h1
            className="kd-hero-title"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--coral-500)",
              fontSize: 48,
              lineHeight: 1.05,
              margin: 0,
            }}
          >
            {show.title}
          </h1>
          <div
            style={{
              color: "var(--ink-500)",
              fontSize: 14.5,
              fontWeight: 700,
              margin: "8px 0 12px",
            }}
          >
            {show.network} · {show.year} · {show.epLength} episodes
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <Chip icon={age.icon} label={`${age.label} ${age.range}`} />
            <Chip icon={cat.icon} label={cat.label} />
          </div>
          <p
            style={{
              fontSize: 16,
              lineHeight: 1.55,
              color: "var(--ink-700)",
              margin: "16px 0 0",
            }}
          >
            {show.overallNote}
          </p>
        </div>
        <ScoreDisc score={show.overall} />
      </header>

      {/* ---- At a glance ---- */}
      <section style={{ margin: "28px 0 0", maxWidth: 880 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            flexWrap: "wrap",
            marginBottom: 12,
          }}
        >
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {METRIC_GROUPS.map((g) => {
              const s = groupScore(show, g.id);
              const tier = scoreTier(s);
              return (
                <a
                  key={g.id}
                  href={`#${g.id}`}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 7,
                    background: tier.tint,
                    border: `2px solid ${tier.color}`,
                    borderRadius: 999,
                    padding: "6px 14px",
                    fontSize: 13.5,
                    fontWeight: 800,
                    color: "var(--ink-900)",
                    textDecoration: "none",
                  }}
                >
                  <i
                    className={g.icon}
                    style={{ color: "var(--ink-500)", fontSize: 15 }}
                  />
                  {g.short}
                  <span style={{ color: tier.color }}>{s}</span>
                </a>
              );
            })}
          </div>
          <Legend />
        </div>
        <div
          style={{
            fontSize: 12.5,
            fontWeight: 700,
            color: "var(--ink-500)",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <i className="ph-fill ph-flask" style={{ fontSize: 14 }} />
          Proof of concept — values are illustrative estimates, not lab
          measurements.
        </div>
      </section>

      {/* ---- Metric groups ---- */}
      <div style={{ display: "grid", gap: 18, maxWidth: 880, marginTop: 24 }}>
        {METRIC_GROUPS.map((group) => (
          <section
            key={group.id}
            id={group.id}
            style={{
              background: "#fff",
              border: "2px solid var(--cream-200)",
              borderRadius: 6,
              padding: "22px 24px 6px",
              boxShadow: "var(--shadow-card)",
              scrollMarginTop: 90,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
                marginBottom: 14,
                flexWrap: "wrap",
              }}
            >
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--ink-900)",
                  fontSize: 25,
                  margin: 0,
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <i
                  className={group.icon}
                  style={{ color: "var(--coral-500)", fontSize: 24 }}
                />
                {group.label}
              </h2>
              <span
                style={{
                  fontSize: 13.5,
                  color: "var(--ink-500)",
                  fontWeight: 600,
                }}
              >
                {group.blurb}
              </span>
            </div>

            {metricsByGroup(group.id).map((metric) => {
              const m = show.metrics[metric.id];
              return (
                <div
                  key={metric.id}
                  className="kd-metric-row"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "200px 1fr",
                    gap: "4px 24px",
                    padding: "12px 0 14px",
                    borderTop: "2px solid var(--cream-200)",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontWeight: 800,
                        fontSize: 15,
                        color: "var(--ink-900)",
                      }}
                    >
                      {metric.label}
                    </div>
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 700,
                        color: "var(--ink-500)",
                        marginTop: 3,
                      }}
                    >
                      {m.value}
                    </div>
                  </div>
                  <div>
                    <ScoreBar score={m.score} />
                    <p
                      style={{
                        fontSize: 13.5,
                        lineHeight: 1.5,
                        color: "var(--ink-500)",
                        margin: "6px 0 0",
                      }}
                    >
                      {m.note}
                    </p>
                  </div>
                </div>
              );
            })}
          </section>
        ))}
      </div>

      {/* ---- More in this band ---- */}
      <section style={{ marginTop: 36, maxWidth: 880 }}>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--ink-900)",
            fontSize: 24,
            margin: "0 0 12px",
          }}
        >
          More for ages {age.range}
        </h2>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {allShows.filter(
            (s) => s.ageGroup === show.ageGroup && s.slug !== show.slug
          ).map((s) => {
            const tier = scoreTier(s.overall);
            return (
              <Link
                key={s.slug}
                className="btnp"
                href={`/shows/${s.slug}`}
                style={{
                  fontSize: 14,
                  background: "var(--white)",
                  color: "var(--ink-700)",
                  border: "2px solid var(--cream-200)",
                  borderRadius: 999,
                  padding: "9px 18px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                {s.title}
                <span style={{ color: tier.color, fontWeight: 800 }}>
                  {s.overall}
                </span>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
