import Link from "next/link";
import {
  AGE_GROUPS,
  METRIC_GROUPS,
  METRICS,
  scoreTier,
} from "@/lib/data";
import { getShows } from "@/lib/store";
import { Legend, ScorePill } from "@/components/Score";

function Hero({ showCount }) {
  return (
    <header
      style={{
        position: "relative",
        padding: "56px 7vw 64px",
        overflow: "hidden",
      }}
    >
      {/* floating organic blobs */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          width: 420,
          height: 360,
          background: "var(--blue-100)",
          borderRadius: "42% 58% 63% 37% / 48% 42% 58% 52%",
          right: -90,
          top: -80,
          animation: "floaty 9s ease-in-out infinite",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          width: 340,
          height: 300,
          background: "var(--coral-100)",
          borderRadius: "55% 45% 38% 62% / 52% 58% 42% 48%",
          left: -120,
          bottom: -120,
          animation: "floaty 11s ease-in-out infinite",
        }}
      />

      <div className="reveal" style={{ position: "relative", maxWidth: 680 }}>
        <div
          style={{
            display: "inline-block",
            fontWeight: 700,
            fontSize: 12,
            letterSpacing: ".08em",
            textTransform: "uppercase",
            color: "var(--ink-500)",
            background: "var(--cream-200)",
            padding: "5px 12px",
            borderRadius: 999,
            marginBottom: 20,
          }}
        >
          Proof of concept · sample data
        </div>
        <h1
          className="kd-hero-title"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--coral-500)",
            fontSize: 64,
            lineHeight: 1.02,
            margin: 0,
          }}
        >
          Know the show before they press play.
        </h1>
        <p
          style={{
            fontSize: 19,
            lineHeight: 1.5,
            color: "var(--ink-700)",
            maxWidth: 540,
            margin: "18px 0 0",
          }}
        >
          We measure kids&apos; TV on 15 signals — pacing, loudness, kindness,
          language — and score how well each show fits its age group.
        </p>
        <div
          style={{
            display: "flex",
            gap: 14,
            alignItems: "center",
            marginTop: 28,
            flexWrap: "wrap",
          }}
        >
          <Link
            className="btnp"
            href="/shows"
            style={{
              fontSize: 17,
              background: "var(--coral-500)",
              color: "#fff",
              border: "2px solid var(--coral-500)",
              borderRadius: 999,
              padding: "13px 30px",
            }}
          >
            Browse rated shows
          </Link>
          <Link
            className="btnp"
            href="/methodology"
            style={{
              fontSize: 17,
              background: "transparent",
              color: "var(--coral-500)",
              border: "2px solid var(--coral-500)",
              borderRadius: 999,
              padding: "13px 26px",
            }}
          >
            How we measure
          </Link>
        </div>
        <div
          style={{
            display: "flex",
            gap: 8,
            alignItems: "center",
            marginTop: 22,
            color: "var(--ink-500)",
            fontSize: 14,
            fontWeight: 700,
          }}
        >
          <i
            className="ph-fill ph-ruler"
            style={{ color: "var(--green-500)", fontSize: 18 }}
          />
          {METRICS.length + 1} signals · {showCount} shows ·{" "}
          {AGE_GROUPS.length} age groups
        </div>
      </div>
    </header>
  );
}

/* Two toddler shows, three signals, one point: content warnings can't
   see the difference — measurement can. */
function Contrast({ allShows }) {
  const shows = [
    allShows.find((s) => s.slug === "ms-rachel"),
    allShows.find((s) => s.slug === "cocomelon"),
  ];
  if (shows.some((s) => !s)) return null;
  const rows = [
    { id: "cuts", label: "Cuts per minute" },
    { id: "loudness", label: "Loudness" },
    { id: "interactivity", label: "Interactivity" },
  ];
  return (
    <section style={{ padding: "24px 7vw 64px", textAlign: "center" }}>
      <h2
        className="kd-h2"
        style={{
          fontFamily: "var(--font-display)",
          color: "var(--coral-500)",
          fontSize: 42,
          margin: 0,
        }}
      >
        Same shelf, different sensory load
      </h2>
      <p
        style={{
          fontSize: 16.5,
          color: "var(--ink-500)",
          margin: "8px auto 12px",
          maxWidth: 560,
          lineHeight: 1.5,
        }}
      >
        Neither toddler favorite has a frame of violence — but one waits for
        your child to answer, and one cuts every three seconds.
      </p>
      <Legend style={{ marginBottom: 28 }} />
      <div
        className="kd-grid-2"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 22,
          maxWidth: 880,
          margin: "0 auto",
        }}
      >
        {shows.map((show) => (
          <Link
            key={show.slug}
            href={`/shows/${show.slug}`}
            className="fcard"
            style={{
              background: "#fff",
              border: "2px solid var(--cream-200)",
              borderRadius: 6,
              padding: "24px",
              textAlign: "left",
              boxShadow: "var(--shadow-card)",
              textDecoration: "none",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 18,
                gap: 12,
              }}
            >
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--ink-900)",
                  fontSize: 24,
                  margin: 0,
                }}
              >
                {show.title}
              </h3>
              <ScorePill score={show.overall} />
            </div>
            {rows.map((r) => {
              const m = show.metrics[r.id];
              const tier = scoreTier(m.score);
              return (
                <div key={r.id} style={{ marginBottom: 14 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: 13.5,
                      fontWeight: 800,
                      color: "var(--ink-700)",
                      marginBottom: 5,
                      gap: 12,
                    }}
                  >
                    <span>{r.label}</span>
                    <span style={{ color: "var(--ink-500)", fontWeight: 700 }}>
                      {m.value}
                    </span>
                  </div>
                  <div className="scorebar-track">
                    <div
                      className="scorebar-fill"
                      style={{
                        width: `${m.score}%`,
                        background: tier.color,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </Link>
        ))}
      </div>
    </section>
  );
}

function WhatWeMeasure() {
  return (
    <section style={{ padding: "56px 7vw", background: "var(--cream-50)" }}>
      <div style={{ textAlign: "center" }}>
        <h2
          className="kd-h2"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--coral-500)",
            fontSize: 42,
            margin: "0 0 36px",
          }}
        >
          What we measure
        </h2>
      </div>
      <div
        className="kd-grid-3"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: 18,
          maxWidth: 1040,
          margin: "0 auto",
        }}
      >
        {METRIC_GROUPS.map((g) => (
          <div
            key={g.id}
            className="fcard"
            style={{
              background: "#fff",
              border: "2px solid var(--cream-200)",
              borderRadius: 6,
              padding: "22px 20px",
              textAlign: "left",
              boxShadow: "var(--shadow-card)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 8,
              }}
            >
              <i
                className={g.icon}
                style={{ color: "var(--coral-500)", fontSize: 28 }}
              />
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--ink-900)",
                  fontSize: 22,
                  margin: 0,
                }}
              >
                {g.label}
              </h3>
            </div>
            <p
              style={{
                fontSize: 14.5,
                lineHeight: 1.5,
                color: "var(--ink-700)",
                margin: "0 0 8px",
              }}
            >
              {g.blurb}
            </p>
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: "var(--ink-500)",
                lineHeight: 1.6,
              }}
            >
              {METRICS.filter((m) => m.group === g.id)
                .map((m) => m.label)
                .join(" · ")}
            </div>
          </div>
        ))}
        <div
          className="fcard"
          style={{
            background: "var(--coral-100)",
            border: "2px solid var(--coral-500)",
            borderRadius: 6,
            padding: "22px 20px",
            textAlign: "left",
            boxShadow: "var(--shadow-card)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 8,
            }}
          >
            <i
              className="ph-fill ph-seal-check"
              style={{ color: "var(--coral-500)", fontSize: 28 }}
            />
            <h3
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--ink-900)",
                fontSize: 22,
                margin: 0,
              }}
            >
              One score per show
            </h3>
          </div>
          <p
            style={{
              fontSize: 14.5,
              lineHeight: 1.5,
              color: "var(--ink-700)",
              margin: 0,
            }}
          >
            Every signal is judged against the show&apos;s target age group,
            then rolled into a single 0–100 score. Not &quot;is it good?&quot;
            — &quot;is it right for this age?&quot;
          </p>
        </div>
      </div>
    </section>
  );
}

function BrowseByAge({ allShows }) {
  return (
    <section style={{ padding: "56px 7vw", textAlign: "center" }}>
      <h2
        className="kd-h2"
        style={{
          fontFamily: "var(--font-display)",
          color: "var(--coral-500)",
          fontSize: 42,
          margin: "0 0 36px",
        }}
      >
        Browse by age
      </h2>
      <div
        className="kd-grid-4"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: 18,
          maxWidth: 1080,
          margin: "0 auto",
        }}
      >
        {AGE_GROUPS.map((a) => (
          <Link
            key={a.id}
            href={`/shows#${a.id}`}
            className="fcard"
            style={{
              background: a.tint,
              border: "2px solid var(--cream-200)",
              borderRadius: 6,
              padding: "22px 20px",
              textAlign: "left",
              boxShadow: "var(--shadow-card)",
              textDecoration: "none",
            }}
          >
            <i className={a.icon} style={{ color: a.color, fontSize: 34 }} />
            <h3
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--ink-900)",
                fontSize: 23,
                margin: "10px 0 2px",
              }}
            >
              {a.label}
            </h3>
            <div
              style={{
                fontWeight: 800,
                fontSize: 13,
                color: "var(--ink-500)",
                marginBottom: 8,
              }}
            >
              Ages {a.range} ·{" "}
              {allShows.filter((s) => s.ageGroup === a.id).length} shows
            </div>
            <p
              style={{
                fontSize: 13.5,
                lineHeight: 1.5,
                color: "var(--ink-700)",
                margin: 0,
              }}
            >
              {a.blurb}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "56px 7vw",
        textAlign: "center",
        background: "var(--green-100)",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          width: 280,
          height: 240,
          background: "var(--cream-100)",
          borderRadius: "42% 58% 63% 37% / 48% 42% 58% 52%",
          right: -80,
          bottom: -80,
          animation: "floaty 10s ease-in-out infinite",
        }}
      />
      <h2
        className="kd-h2"
        style={{
          position: "relative",
          fontFamily: "var(--font-display)",
          color: "var(--coral-500)",
          fontSize: 40,
          margin: 0,
        }}
      >
        Ratings you can argue with
      </h2>
      <p
        style={{
          position: "relative",
          maxWidth: 540,
          margin: "12px auto 24px",
          fontSize: 16.5,
          lineHeight: 1.5,
          color: "var(--ink-700)",
        }}
      >
        Every score traces back to a number someone can check — cuts counted,
        decibels metered, kind acts tallied.
      </p>
      <Link
        className="btnp"
        href="/methodology"
        style={{
          position: "relative",
          fontSize: 17,
          background: "var(--coral-500)",
          color: "#fff",
          border: "2px solid var(--coral-500)",
          borderRadius: 999,
          padding: "13px 30px",
        }}
      >
        Read the methodology
      </Link>
    </section>
  );
}

export default async function Home() {
  const shows = await getShows();
  return (
    <main id="top">
      <Hero showCount={shows.length} />
      <Contrast allShows={shows} />
      <WhatWeMeasure />
      <BrowseByAge allShows={shows} />
      <CTA />
    </main>
  );
}
