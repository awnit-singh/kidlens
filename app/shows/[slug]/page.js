import Link from "next/link";
import { notFound } from "next/navigation";
import {
  METRIC_GROUPS,
  SHOWS,
  getAgeGroup,
  getCategory,
  getShow,
  metricsByGroup,
} from "@/lib/data";
import { Chip, ScoreBar, ScoreDisc } from "@/components/Score";

export function generateStaticParams() {
  return SHOWS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const show = getShow(slug);
  if (!show) return {};
  return {
    title: `${show.title} — KidLens rating`,
    description: show.tagline,
  };
}

export default async function ShowPage({ params }) {
  const { slug } = await params;
  const show = getShow(slug);
  if (!show) notFound();

  const age = getAgeGroup(show.ageGroup);
  const cat = getCategory(show.category);

  return (
    <main style={{ padding: "48px 7vw 80px" }}>
      <Link
        className="navlink"
        href="/shows"
        style={{
          color: "var(--ink-500)",
          fontWeight: 700,
          fontSize: 15,
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
          alignItems: "center",
          justifyContent: "space-between",
          gap: 32,
          flexWrap: "wrap",
          margin: "26px 0 14px",
        }}
      >
        <div style={{ maxWidth: 680 }}>
          <h1
            className="kd-hero-title"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--coral-500)",
              fontSize: 58,
              lineHeight: 1.05,
              margin: 0,
            }}
          >
            {show.title}
          </h1>
          <div
            style={{
              color: "var(--ink-500)",
              fontSize: 16,
              fontWeight: 700,
              margin: "10px 0 16px",
            }}
          >
            {show.network} · {show.year} · {show.epLength} episodes
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Chip
              icon={age.icon}
              label={`${age.label} ${age.range}`}
              color={age.color}
              tint={age.tint}
            />
            <Chip icon={cat.icon} label={cat.label} color="var(--ink-500)" />
          </div>
        </div>
        <ScoreDisc score={show.overall} size={120} />
      </header>

      <p
        style={{
          fontSize: 19,
          lineHeight: 1.6,
          color: "var(--ink-700)",
          maxWidth: 760,
          margin: "0 0 10px",
        }}
      >
        {show.tagline}
      </p>
      <p
        style={{
          fontSize: 16.5,
          lineHeight: 1.6,
          color: "var(--ink-500)",
          maxWidth: 760,
          margin: "0 0 28px",
        }}
      >
        <strong style={{ color: "var(--ink-700)" }}>The verdict:</strong>{" "}
        {show.overallNote}
      </p>

      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          fontSize: 13.5,
          fontWeight: 700,
          color: "var(--ink-500)",
          background: "var(--yellow-100)",
          border: "2px solid var(--yellow-500)",
          borderRadius: 999,
          padding: "7px 16px",
          marginBottom: 44,
        }}
      >
        <i
          className="ph-fill ph-flask"
          style={{ color: "var(--yellow-500)", fontSize: 17 }}
        />
        Proof of concept — values below are illustrative estimates, not lab
        measurements.
      </div>

      {/* ---- Metric groups ---- */}
      <div style={{ display: "grid", gap: 26, maxWidth: 880 }}>
        {METRIC_GROUPS.map((group) => (
          <section
            key={group.id}
            style={{
              background: "#fff",
              border: `2px solid ${group.color}`,
              borderRadius: 6,
              padding: "30px 30px 12px",
              boxShadow: "var(--shadow-card)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 22,
              }}
            >
              <i
                className={group.icon}
                style={{ color: group.color, fontSize: 32 }}
              />
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--ink-900)",
                  fontSize: 30,
                  margin: 0,
                }}
              >
                {group.label}
              </h2>
            </div>

            {metricsByGroup(group.id).map((metric) => {
              const m = show.metrics[metric.id];
              return (
                <div
                  key={metric.id}
                  className="kd-metric-row"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "220px 1fr",
                    gap: "6px 28px",
                    padding: "16px 0 18px",
                    borderTop: "2px solid var(--cream-200)",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontWeight: 800,
                        fontSize: 16,
                        color: "var(--ink-900)",
                      }}
                    >
                      {metric.label}
                    </div>
                    <div
                      style={{
                        fontSize: 14,
                        fontWeight: 700,
                        color: "var(--ink-500)",
                        marginTop: 4,
                      }}
                    >
                      {m.value}
                    </div>
                  </div>
                  <div>
                    <ScoreBar score={m.score} />
                    <p
                      style={{
                        fontSize: 15,
                        lineHeight: 1.55,
                        color: "var(--ink-500)",
                        margin: "8px 0 0",
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
      <section style={{ marginTop: 56, maxWidth: 880 }}>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--ink-900)",
            fontSize: 28,
            margin: "0 0 16px",
          }}
        >
          More for {age.label.toLowerCase()} ({age.range})
        </h2>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {SHOWS.filter(
            (s) => s.ageGroup === show.ageGroup && s.slug !== show.slug
          ).map((s) => (
            <Link
              key={s.slug}
              className="btnp"
              href={`/shows/${s.slug}`}
              style={{
                fontSize: 15,
                background: "var(--white)",
                color: "var(--ink-700)",
                border: `2px solid ${age.color}`,
                borderRadius: 999,
                padding: "10px 20px",
              }}
            >
              {s.title} · {s.overall}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
