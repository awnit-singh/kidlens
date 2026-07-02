import { AGE_GROUPS, showsByAgeGroup } from "@/lib/data";
import ShowCard from "@/components/ShowCard";

export const metadata = {
  title: "Rated shows — KidLens",
  description:
    "Children's TV shows rated on 15 measured signals, grouped by age band.",
};

export default function ShowsPage() {
  return (
    <main style={{ padding: "60px 7vw 40px" }}>
      <div className="reveal" style={{ maxWidth: 720 }}>
        <h1
          className="kd-hero-title"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--coral-500)",
            fontSize: 64,
            lineHeight: 1.05,
            margin: 0,
          }}
        >
          Rated shows
        </h1>
        <p
          style={{
            fontSize: 19,
            lineHeight: 1.55,
            color: "var(--ink-700)",
            margin: "18px 0 0",
          }}
        >
          One or two shows per category in each age band — enough to show how
          the rating model works. Scores are <strong>age-fit</strong>, judged
          against the needs of each show&apos;s target audience.
        </p>
      </div>

      {AGE_GROUPS.map((age) => {
        const shows = showsByAgeGroup(age.id);
        return (
          <section
            key={age.id}
            id={age.id}
            style={{ padding: "64px 0 8px", scrollMarginTop: 90 }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                marginBottom: 6,
              }}
            >
              <span
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: "50%",
                  background: age.tint,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <i
                  className={age.icon}
                  style={{ color: age.color, fontSize: 28 }}
                />
              </span>
              <h2
                className="kd-h2"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--ink-900)",
                  fontSize: 42,
                  margin: 0,
                }}
              >
                {age.label}{" "}
                <span style={{ color: age.color }}>· ages {age.range}</span>
              </h2>
            </div>
            <p
              style={{
                maxWidth: 680,
                fontSize: 16.5,
                lineHeight: 1.55,
                color: "var(--ink-500)",
                margin: "6px 0 30px",
              }}
            >
              {age.blurb}
            </p>
            <div
              className="kd-grid-3"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3,1fr)",
                gap: 26,
              }}
            >
              {shows.map((show) => (
                <ShowCard key={show.slug} show={show} />
              ))}
            </div>
          </section>
        );
      })}
    </main>
  );
}
