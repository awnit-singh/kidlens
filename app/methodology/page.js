import { METRIC_GROUPS, METRICS, metricsByGroup } from "@/lib/data";

export const metadata = {
  title: "Methodology — KidLens",
  description:
    "How KidLens measures children's TV: automated video and audio analysis plus human coding, judged against each show's target age band.",
};

const steps = [
  {
    icon: "ph-fill ph-waveform",
    color: "var(--blue-500)",
    title: "1 · Automated signal extraction",
    body: "Shot boundaries, motion, color statistics, and loudness are extracted from full episodes by software. These numbers are objective — anyone running the same tools on the same episodes gets the same values.",
  },
  {
    icon: "ph-fill ph-users-three",
    color: "var(--green-500)",
    title: "2 · Human content coding",
    body: "Trained coders watch complete episodes and tally what machines can't judge: prosocial acts, violence and its consequences, scariness, representation, and language-teaching moves. Every variable uses a written codebook, and disagreements are resolved by a second coder.",
  },
  {
    icon: "ph-fill ph-target",
    color: "var(--coral-500)",
    title: "3 · Age-fit scoring",
    body: "Each measurement is scored 0–100 against the developmental needs of the show's target age band — not against a universal ideal. Rapid cutting costs a toddler show dearly and a tween show barely at all. The 15th signal, age-appropriateness, is the weighted roll-up.",
  },
];

export default function MethodologyPage() {
  return (
    <main style={{ padding: "60px 7vw 90px" }}>
      <div className="reveal" style={{ maxWidth: 760 }}>
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
          How KidLens measures
        </h1>
        <p
          style={{
            fontSize: 19,
            lineHeight: 1.6,
            color: "var(--ink-700)",
            margin: "20px 0 0",
          }}
        >
          Most ratings tell you what a show is <em>about</em>. KidLens tells
          you what a show <em>does</em>: how fast it cuts, how loud it sits,
          how often anyone on screen is kind, and whether it ever waits for
          your child to answer. Content matters — but so does form, and form
          is measurable.
        </p>
      </div>

      {/* ---- Pipeline ---- */}
      <div
        className="kd-grid-3"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: 26,
          maxWidth: 1080,
          margin: "56px 0",
        }}
      >
        {steps.map((s) => (
          <div
            key={s.title}
            className="fcard"
            style={{
              background: "#fff",
              border: `2px solid ${s.color}`,
              borderRadius: 6,
              padding: "32px 28px",
              boxShadow: "var(--shadow-card)",
            }}
          >
            <i className={s.icon} style={{ color: s.color, fontSize: 44 }} />
            <h2
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--ink-900)",
                fontSize: 25,
                margin: "16px 0 10px",
              }}
            >
              {s.title}
            </h2>
            <p
              style={{
                fontSize: 15.5,
                lineHeight: 1.6,
                color: "var(--ink-500)",
                margin: 0,
              }}
            >
              {s.body}
            </p>
          </div>
        ))}
      </div>

      {/* ---- The 15 variables ---- */}
      <h2
        className="kd-h2"
        style={{
          fontFamily: "var(--font-display)",
          color: "var(--coral-500)",
          fontSize: 44,
          margin: "0 0 8px",
        }}
      >
        The fifteen signals
      </h2>
      <p
        style={{
          maxWidth: 700,
          fontSize: 16.5,
          lineHeight: 1.6,
          color: "var(--ink-500)",
          margin: "0 0 40px",
        }}
      >
        Fourteen measured signals in five families, plus the age-fit roll-up
        that headlines every show page.
      </p>

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
                marginBottom: 8,
              }}
            >
              <i
                className={group.icon}
                style={{ color: group.color, fontSize: 32 }}
              />
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--ink-900)",
                  fontSize: 28,
                  margin: 0,
                }}
              >
                {group.label}
              </h3>
            </div>
            <p
              style={{
                fontSize: 15.5,
                color: "var(--ink-500)",
                margin: "0 0 18px",
              }}
            >
              {group.blurb}
            </p>
            {metricsByGroup(group.id).map((m) => (
              <div
                key={m.id}
                style={{
                  padding: "16px 0 18px",
                  borderTop: "2px solid var(--cream-200)",
                }}
              >
                <div
                  style={{
                    fontWeight: 800,
                    fontSize: 16.5,
                    color: "var(--ink-900)",
                    marginBottom: 6,
                  }}
                >
                  {m.label}
                </div>
                <p
                  style={{
                    fontSize: 15.5,
                    lineHeight: 1.6,
                    color: "var(--ink-700)",
                    margin: "0 0 6px",
                  }}
                >
                  {m.desc}
                </p>
                <p
                  style={{
                    fontSize: 14.5,
                    lineHeight: 1.55,
                    color: "var(--ink-500)",
                    margin: 0,
                  }}
                >
                  <strong style={{ color: "var(--ink-700)" }}>
                    How it&apos;s measured:
                  </strong>{" "}
                  {m.how}
                </p>
              </div>
            ))}
          </section>
        ))}

        {/* Age-appropriateness roll-up */}
        <section
          style={{
            background: "var(--coral-100)",
            border: "2px solid var(--coral-500)",
            borderRadius: 6,
            padding: "30px",
            boxShadow: "var(--shadow-card)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 8,
            }}
          >
            <i
              className="ph-fill ph-seal-check"
              style={{ color: "var(--coral-500)", fontSize: 32 }}
            />
            <h3
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--ink-900)",
                fontSize: 28,
                margin: 0,
              }}
            >
              Age-appropriateness — the roll-up
            </h3>
          </div>
          <p
            style={{
              fontSize: 15.5,
              lineHeight: 1.6,
              color: "var(--ink-700)",
              margin: 0,
            }}
          >
            The headline score on every show page is a weighted average of the
            fourteen signals above, with weights set per age band: pacing,
            loudness, and interactivity weigh heaviest for toddlers;
            consequences, representation, and curriculum weigh heaviest for
            big kids. A high score doesn&apos;t mean a show is art — it means
            the show&apos;s measurable behavior fits the audience it claims to
            serve.
          </p>
        </section>

        {/* Limitations */}
        <section
          style={{
            background: "var(--yellow-100)",
            border: "2px solid var(--yellow-500)",
            borderRadius: 6,
            padding: "30px",
            boxShadow: "var(--shadow-card)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 8,
            }}
          >
            <i
              className="ph-fill ph-flask"
              style={{ color: "var(--yellow-500)", fontSize: 32 }}
            />
            <h3
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--ink-900)",
                fontSize: 28,
                margin: 0,
              }}
            >
              Proof-of-concept limitations
            </h3>
          </div>
          <p
            style={{
              fontSize: 15.5,
              lineHeight: 1.6,
              color: "var(--ink-700)",
              margin: 0,
            }}
          >
            This site demonstrates the rating model with a small sample —
            one or two shows per category in each age band. The values shown
            are illustrative estimates informed by published research and
            reporting, not the output of the measurement pipeline described
            above. A production version would publish per-episode data,
            coder-agreement statistics, and confidence ranges alongside every
            score. And no measurement replaces the oldest instrument in the
            field: watching an episode with your kid.
          </p>
        </section>
      </div>
    </main>
  );
}
