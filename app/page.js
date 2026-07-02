import Link from "next/link";
import {
  AGE_GROUPS,
  METRIC_GROUPS,
  METRICS,
  SHOWS,
  getShow,
  showsByAgeGroup,
  scoreColor,
} from "@/lib/data";

function Hero() {
  return (
    <header
      style={{
        position: "relative",
        padding: "90px 7vw 100px",
        overflow: "hidden",
      }}
    >
      {/* floating organic blobs */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          width: 440,
          height: 380,
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
          width: 360,
          height: 320,
          background: "var(--coral-100)",
          borderRadius: "55% 45% 38% 62% / 52% 58% 42% 48%",
          left: -120,
          bottom: -120,
          animation: "floaty 11s ease-in-out infinite",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          right: 160,
          top: 120,
          width: 160,
          height: 160,
          border: "3px solid var(--green-500)",
          borderRadius: "50%",
          opacity: 0.55,
          animation: "floaty 7s ease-in-out infinite",
        }}
      />

      <div className="reveal" style={{ position: "relative", maxWidth: 700 }}>
        <div
          style={{
            display: "inline-block",
            fontWeight: 700,
            fontSize: 13,
            letterSpacing: ".08em",
            textTransform: "uppercase",
            color: "var(--green-500)",
            background: "var(--green-100)",
            padding: "6px 14px",
            borderRadius: 999,
            marginBottom: 26,
          }}
        >
          Proof of concept · sample data
        </div>
        <h1
          className="kd-hero-title"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--coral-500)",
            fontSize: 80,
            lineHeight: 1.02,
            margin: 0,
          }}
        >
          Know the show before they press play.
        </h1>
        <p
          style={{
            fontSize: 21,
            lineHeight: 1.55,
            color: "var(--ink-700)",
            maxWidth: 560,
            margin: "26px 0 0",
          }}
        >
          KidLens measures children&apos;s TV on 15 signals — cuts per minute,
          loudness, prosocial acts, language cues, and more — so you can see
          what a show actually does to a young brain, not just what it&apos;s
          about.
        </p>
        <div
          style={{
            display: "flex",
            gap: 16,
            alignItems: "center",
            marginTop: 38,
            flexWrap: "wrap",
          }}
        >
          <Link
            className="btnp"
            href="/shows"
            style={{
              fontSize: 18,
              background: "var(--coral-500)",
              color: "#fff",
              border: "2px solid var(--coral-500)",
              borderRadius: 999,
              padding: "15px 34px",
            }}
          >
            Browse rated shows
          </Link>
          <Link
            className="btnp"
            href="/methodology"
            style={{
              fontSize: 18,
              background: "transparent",
              color: "var(--coral-500)",
              border: "2px solid var(--coral-500)",
              borderRadius: 999,
              padding: "15px 30px",
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
            marginTop: 26,
            color: "var(--ink-500)",
            fontSize: 15,
            fontWeight: 600,
          }}
        >
          <i
            className="ph-fill ph-ruler"
            style={{ color: "var(--green-500)", fontSize: 20 }}
          />
          {METRICS.length + 1} signals · {SHOWS.length} shows ·{" "}
          {AGE_GROUPS.length} age bands · measured, not vibes
        </div>
      </div>
    </header>
  );
}

/* Two shows aimed at the same age can have wildly different sensory
   profiles — the founding observation behind KidLens. */
function Contrast() {
  const a = getShow("ms-rachel");
  const b = getShow("cocomelon");
  const rows = [
    { id: "cuts", label: "Cuts per minute" },
    { id: "loudness", label: "Loudness" },
    { id: "interactivity", label: "Interactivity" },
  ];
  return (
    <section style={{ padding: "40px 7vw 96px", textAlign: "center" }}>
      <h2
        className="kd-h2"
        style={{
          fontFamily: "var(--font-display)",
          color: "var(--coral-500)",
          fontSize: 52,
          margin: 0,
        }}
      >
        Same shelf, different sensory load
      </h2>
      <p
        style={{
          fontFamily: "var(--font-display)",
          color: "var(--green-500)",
          fontSize: 28,
          margin: "8px 0 48px",
        }}
      >
        Two toddler favorites, measured side by side
      </p>
      <div
        className="kd-grid-2"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 30,
          maxWidth: 940,
          margin: "0 auto",
        }}
      >
        {[a, b].map((show) => (
          <Link
            key={show.slug}
            href={`/shows/${show.slug}`}
            className="fcard"
            style={{
              background: "#fff",
              border: `2px solid ${scoreColor(show.overall)}`,
              borderRadius: 6,
              padding: "30px 28px",
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
                marginBottom: 20,
              }}
            >
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--ink-900)",
                  fontSize: 26,
                  margin: 0,
                }}
              >
                {show.title}
              </h3>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 30,
                  color: scoreColor(show.overall),
                }}
              >
                {show.overall}
              </span>
            </div>
            {rows.map((r) => {
              const m = show.metrics[r.id];
              return (
                <div key={r.id} style={{ marginBottom: 16 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: 14,
                      fontWeight: 800,
                      color: "var(--ink-700)",
                      marginBottom: 6,
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
                        background: scoreColor(m.score),
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </Link>
        ))}
      </div>
      <p
        style={{
          maxWidth: 640,
          margin: "36px auto 0",
          fontSize: 17,
          lineHeight: 1.6,
          color: "var(--ink-500)",
        }}
      >
        Neither show has a frame of violence. But one holds a shot for ten
        seconds and waits for your toddler to answer — the other cuts every
        three seconds and never pauses. That difference doesn&apos;t show up on
        a content warning. It shows up here.
      </p>
    </section>
  );
}

function WhatWeMeasure() {
  return (
    <section style={{ padding: "96px 7vw", background: "var(--cream-50)" }}>
      <div style={{ textAlign: "center" }}>
        <h2
          className="kd-h2"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--coral-500)",
            fontSize: 52,
            margin: 0,
          }}
        >
          What we measure
        </h2>
        <p
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--green-500)",
            fontSize: 28,
            margin: "8px 0 60px",
          }}
        >
          Fifteen signals in five families, rolled into one age-fit score
        </p>
      </div>
      <div
        className="kd-grid-3"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: 30,
          maxWidth: 1080,
          margin: "0 auto",
        }}
      >
        {METRIC_GROUPS.map((g) => (
          <div
            key={g.id}
            className="fcard"
            style={{
              background: "#fff",
              border: `2px solid ${g.color}`,
              borderRadius: 6,
              padding: "34px 28px",
              textAlign: "left",
              boxShadow: "var(--shadow-card)",
            }}
          >
            <i className={g.icon} style={{ color: g.color, fontSize: 46 }} />
            <h3
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--ink-900)",
                fontSize: 27,
                margin: "18px 0 10px",
              }}
            >
              {g.label}
            </h3>
            <p
              style={{
                fontSize: 16,
                lineHeight: 1.55,
                color: "var(--ink-500)",
                margin: "0 0 14px",
              }}
            >
              {g.blurb}
            </p>
            <div
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: "var(--ink-700)",
                lineHeight: 1.7,
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
            padding: "34px 28px",
            textAlign: "left",
            boxShadow: "var(--shadow-card)",
          }}
        >
          <i
            className="ph-fill ph-seal-check"
            style={{ color: "var(--coral-500)", fontSize: 46 }}
          />
          <h3
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--ink-900)",
              fontSize: 27,
              margin: "18px 0 10px",
            }}
          >
            Age-appropriateness
          </h3>
          <p
            style={{
              fontSize: 16,
              lineHeight: 1.55,
              color: "var(--ink-700)",
              margin: 0,
            }}
          >
            The fifteenth signal is the headline: every measurement is judged
            against the target age band and rolled into one age-fit score. Not
            &quot;is this show good?&quot; — &quot;is this show right for this
            brain, right now?&quot;
          </p>
        </div>
      </div>
    </section>
  );
}

function BrowseByAge() {
  return (
    <section style={{ padding: "96px 7vw", textAlign: "center" }}>
      <h2
        className="kd-h2"
        style={{
          fontFamily: "var(--font-display)",
          color: "var(--coral-500)",
          fontSize: 52,
          margin: 0,
        }}
      >
        Browse by age
      </h2>
      <p
        style={{
          fontFamily: "var(--font-display)",
          color: "var(--green-500)",
          fontSize: 28,
          margin: "8px 0 60px",
        }}
      >
        The same show can be perfect at eight and overwhelming at three
      </p>
      <div
        className="kd-grid-4"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: 24,
          maxWidth: 1120,
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
              border: `2px solid ${a.color}`,
              borderRadius: 6,
              padding: "32px 24px",
              textAlign: "left",
              boxShadow: "var(--shadow-card)",
              textDecoration: "none",
            }}
          >
            <i className={a.icon} style={{ color: a.color, fontSize: 44 }} />
            <h3
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--ink-900)",
                fontSize: 26,
                margin: "16px 0 2px",
              }}
            >
              {a.label}
            </h3>
            <div
              style={{
                fontWeight: 800,
                fontSize: 14,
                color: "var(--ink-500)",
                marginBottom: 12,
              }}
            >
              Ages {a.range} · {showsByAgeGroup(a.id).length} shows rated
            </div>
            <p
              style={{
                fontSize: 15,
                lineHeight: 1.55,
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
        padding: "96px 7vw",
        textAlign: "center",
        background: "var(--green-100)",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          width: 300,
          height: 260,
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
          fontSize: 48,
          margin: 0,
        }}
      >
        Ratings you can argue with
      </h2>
      <p
        style={{
          position: "relative",
          maxWidth: 620,
          margin: "18px auto 34px",
          fontSize: 18,
          lineHeight: 1.6,
          color: "var(--ink-700)",
        }}
      >
        Every score on KidLens traces back to a number someone can check —
        cuts counted, decibels metered, kind acts tallied. Read the
        methodology and disagree with us precisely.
      </p>
      <Link
        className="btnp"
        href="/methodology"
        style={{
          position: "relative",
          fontSize: 18,
          background: "var(--coral-500)",
          color: "#fff",
          border: "2px solid var(--coral-500)",
          borderRadius: 999,
          padding: "15px 34px",
        }}
      >
        Read the methodology
      </Link>
    </section>
  );
}

export default function Home() {
  return (
    <main id="top">
      <Hero />
      <Contrast />
      <WhatWeMeasure />
      <BrowseByAge />
      <CTA />
    </main>
  );
}
