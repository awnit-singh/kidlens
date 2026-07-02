import { METRIC_GROUPS, metricsByGroup } from "@/lib/data";
import { Legend } from "@/components/Score";

export const metadata = {
  title: "Methodology — KidLens",
  description:
    "How KidLens measures children's TV: automated video and audio analysis plus human coding, scored against each show's target age.",
};

const steps = [
  {
    icon: "ph-fill ph-waveform",
    title: "1 · Measure",
    body: "Software extracts shot boundaries, motion, color, and loudness from full episodes. Objective and reproducible.",
  },
  {
    icon: "ph-fill ph-users-three",
    title: "2 · Code",
    body: "Trained coders tally what machines can't judge: kindness, violence and its consequences, scariness, representation, and teaching moves — against a written codebook.",
  },
  {
    icon: "ph-fill ph-target",
    title: "3 · Score",
    body: "Each measurement is scored 0–100 against the target age, then rolled into one score per show. Fast cutting costs a toddler show dearly and a tween show barely at all.",
  },
];

export default function MethodologyPage() {
  return (
    <main style={{ padding: "44px 7vw 64px" }}>
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
          How KidLens measures
        </h1>
        <p
          style={{
            fontSize: 16.5,
            lineHeight: 1.55,
            color: "var(--ink-700)",
            margin: "14px 0 0",
          }}
        >
          Most ratings tell you what a show is <em>about</em>. KidLens
          measures what it <em>does</em> — how fast it cuts, how loud it
          sits, how often anyone is kind, and whether it ever waits for your
          child to answer.
        </p>
      </div>

      {/* ---- Pipeline ---- */}
      <div
        className="kd-grid-3"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: 18,
          maxWidth: 1040,
          margin: "32px 0 40px",
        }}
      >
        {steps.map((s) => (
          <div
            key={s.title}
            className="fcard"
            style={{
              background: "#fff",
              border: "2px solid var(--cream-200)",
              borderRadius: 6,
              padding: "22px 20px",
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
                className={s.icon}
                style={{ color: "var(--coral-500)", fontSize: 28 }}
              />
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--ink-900)",
                  fontSize: 22,
                  margin: 0,
                }}
              >
                {s.title}
              </h2>
            </div>
            <p
              style={{
                fontSize: 14.5,
                lineHeight: 1.55,
                color: "var(--ink-500)",
                margin: 0,
              }}
            >
              {s.body}
            </p>
          </div>
        ))}
      </div>

      {/* ---- Score scale ---- */}
      <section
        style={{
          background: "#fff",
          border: "2px solid var(--cream-200)",
          borderRadius: 6,
          padding: "22px 24px",
          boxShadow: "var(--shadow-card)",
          maxWidth: 880,
          marginBottom: 40,
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--ink-900)",
            fontSize: 25,
            margin: "0 0 8px",
          }}
        >
          Reading the score
        </h2>
        <p
          style={{
            fontSize: 15,
            lineHeight: 1.55,
            color: "var(--ink-700)",
            margin: "0 0 12px",
          }}
        >
          Every score — per signal and per show — is 0–100 and means one
          thing: <strong>how well this fits the target age</strong>. The show
          score weights the signals by what matters most at each age: pacing
          and loudness for toddlers, consequences and curriculum for big
          kids.
        </p>
        <Legend />
      </section>

      {/* ---- The 15 signals ---- */}
      <h2
        className="kd-h2"
        style={{
          fontFamily: "var(--font-display)",
          color: "var(--coral-500)",
          fontSize: 38,
          margin: "0 0 20px",
        }}
      >
        The fifteen signals
      </h2>

      <div style={{ display: "grid", gap: 18, maxWidth: 880 }}>
        {METRIC_GROUPS.map((group) => (
          <section
            key={group.id}
            style={{
              background: "#fff",
              border: "2px solid var(--cream-200)",
              borderRadius: 6,
              padding: "22px 24px 6px",
              boxShadow: "var(--shadow-card)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
                marginBottom: 12,
                flexWrap: "wrap",
              }}
            >
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--ink-900)",
                  fontSize: 24,
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
              </h3>
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
            {metricsByGroup(group.id).map((m) => (
              <div
                key={m.id}
                style={{
                  padding: "12px 0 14px",
                  borderTop: "2px solid var(--cream-200)",
                }}
              >
                <div
                  style={{
                    fontWeight: 800,
                    fontSize: 15,
                    color: "var(--ink-900)",
                    marginBottom: 4,
                  }}
                >
                  {m.label}
                </div>
                <p
                  style={{
                    fontSize: 14.5,
                    lineHeight: 1.55,
                    color: "var(--ink-700)",
                    margin: "0 0 4px",
                  }}
                >
                  {m.desc}
                </p>
                <p
                  style={{
                    fontSize: 13.5,
                    lineHeight: 1.5,
                    color: "var(--ink-500)",
                    margin: 0,
                  }}
                >
                  <strong style={{ color: "var(--ink-700)" }}>
                    Measured by:
                  </strong>{" "}
                  {m.how}
                </p>
              </div>
            ))}
          </section>
        ))}

        {/* The 15th signal + limitations, one compact card */}
        <section
          style={{
            background: "var(--yellow-100)",
            border: "2px solid var(--yellow-500)",
            borderRadius: 6,
            padding: "22px 24px",
            boxShadow: "var(--shadow-card)",
          }}
        >
          <h3
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--ink-900)",
              fontSize: 24,
              margin: "0 0 8px",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <i
              className="ph-fill ph-flask"
              style={{ color: "var(--yellow-500)", fontSize: 24 }}
            />
            Proof-of-concept limitations
          </h3>
          <p
            style={{
              fontSize: 14.5,
              lineHeight: 1.55,
              color: "var(--ink-700)",
              margin: 0,
            }}
          >
            This site demonstrates the model with a small sample; the values
            are illustrative estimates informed by published research, not
            pipeline output. A production version would publish per-episode
            data, coder-agreement statistics, and confidence ranges. And no
            measurement replaces watching an episode with your kid.
          </p>
        </section>
      </div>
    </main>
  );
}
