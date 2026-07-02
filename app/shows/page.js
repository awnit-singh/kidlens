import { AGE_GROUPS } from "@/lib/data";
import { getShows } from "@/lib/store";
import ShowCard from "@/components/ShowCard";
import { Legend } from "@/components/Score";

export const metadata = {
  title: "Rated shows — KidLens",
  description:
    "Children's TV shows scored on 15 measured signals, grouped by age.",
};

export default async function ShowsPage() {
  const allShows = await getShows();
  return (
    <main style={{ padding: "44px 7vw 56px" }}>
      <div className="reveal" style={{ maxWidth: 720 }}>
        <h1
          className="kd-hero-title"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--coral-500)",
            fontSize: 52,
            lineHeight: 1.05,
            margin: 0,
          }}
        >
          Rated shows
        </h1>
        <p
          style={{
            fontSize: 16.5,
            lineHeight: 1.5,
            color: "var(--ink-700)",
            margin: "12px 0 10px",
          }}
        >
          Scores say how well a show fits its target age — not whether
          it&apos;s good TV.
        </p>
        <Legend />
      </div>

      {AGE_GROUPS.map((age) => {
        const shows = allShows.filter((s) => s.ageGroup === age.id);
        if (!shows.length) return null;
        return (
          <section
            key={age.id}
            id={age.id}
            style={{ padding: "40px 0 4px", scrollMarginTop: 90 }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 12,
                flexWrap: "wrap",
                marginBottom: 18,
              }}
            >
              <h2
                className="kd-h2"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--ink-900)",
                  fontSize: 34,
                  margin: 0,
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <i
                  className={age.icon}
                  style={{ color: age.color, fontSize: 28 }}
                />
                {age.label}
                <span style={{ color: "var(--ink-500)", fontSize: 26 }}>
                  ages {age.range}
                </span>
              </h2>
              <span
                style={{
                  fontSize: 14,
                  color: "var(--ink-500)",
                  fontWeight: 600,
                }}
              >
                {age.blurb}
              </span>
            </div>
            <div
              className="kd-grid-3"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3,1fr)",
                gap: 18,
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
