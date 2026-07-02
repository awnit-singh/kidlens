"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  AGE_GROUPS,
  CONTENT_CATEGORIES,
  METRICS,
  METRIC_GROUPS,
  scoreTier,
} from "@/lib/data";

const inputStyle = {
  width: "100%",
  fontFamily: "var(--font-body)",
  fontSize: 14.5,
  color: "var(--ink-900)",
  background: "var(--white)",
  border: "2px solid var(--cream-200)",
  borderRadius: 6,
  padding: "9px 12px",
  outline: "none",
  boxSizing: "border-box",
};
const labelStyle = {
  display: "block",
  fontSize: 12.5,
  fontWeight: 800,
  color: "var(--ink-700)",
  textTransform: "uppercase",
  letterSpacing: ".04em",
  margin: "0 0 5px",
};

function emptyShow() {
  const metrics = {};
  for (const m of METRICS) metrics[m.id] = { value: "", score: "", note: "" };
  return {
    slug: "",
    title: "",
    network: "",
    year: new Date().getFullYear(),
    epLength: "",
    ageGroup: AGE_GROUPS[0].id,
    category: CONTENT_CATEGORIES[0].id,
    overall: "",
    tagline: "",
    overallNote: "",
    metrics,
  };
}

export default function ShowForm({ mode, show }) {
  const router = useRouter();
  const [form, setForm] = useState(show || emptyShow());
  const [errors, setErrors] = useState(null);
  const [busy, setBusy] = useState(false);

  const set = (field, value) => setForm((f) => ({ ...f, [field]: value }));
  const setMetric = (id, field, value) =>
    setForm((f) => ({
      ...f,
      metrics: { ...f.metrics, [id]: { ...f.metrics[id], [field]: value } },
    }));

  function suggestOverall() {
    const scores = METRICS.map((m) => Number(form.metrics[m.id]?.score)).filter(
      (n) => Number.isFinite(n)
    );
    if (scores.length)
      set("overall", Math.round(scores.reduce((a, b) => a + b, 0) / scores.length));
  }

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setErrors(null);
    try {
      const res = await fetch(
        mode === "edit" ? `/api/admin/shows/${show.slug}` : "/api/admin/shows",
        {
          method: mode === "edit" ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );
      const data = await res.json();
      if (res.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        setErrors(data.errors || [data.error || "Save failed."]);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch {
      setErrors(["Network error — try again."]);
    } finally {
      setBusy(false);
    }
  }

  const overallTier = Number.isFinite(Number(form.overall)) && form.overall !== ""
    ? scoreTier(Number(form.overall))
    : null;

  return (
    <main style={{ padding: "36px 7vw 64px", maxWidth: 980 }}>
      <Link
        className="navlink"
        href="/admin"
        style={{ color: "var(--ink-500)", fontWeight: 700, fontSize: 14 }}
      >
        ← Admin
      </Link>
      <h1
        style={{
          fontFamily: "var(--font-display)",
          color: "var(--coral-500)",
          fontSize: 38,
          margin: "12px 0 20px",
        }}
      >
        {mode === "edit" ? `Edit: ${show.title}` : "Add a show"}
      </h1>

      {errors && (
        <div
          style={{
            fontSize: 14,
            fontWeight: 700,
            color: "var(--score-poor)",
            background: "var(--score-poor-tint)",
            borderRadius: 6,
            padding: "12px 14px",
            marginBottom: 18,
          }}
        >
          Not saved:
          <ul style={{ margin: "6px 0 0", paddingLeft: 18, fontWeight: 600 }}>
            {errors.map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={submit}>
        {/* ---- Basics ---- */}
        <section
          style={{
            background: "#fff",
            border: "2px solid var(--cream-200)",
            borderRadius: 8,
            boxShadow: "var(--shadow-card)",
            padding: "22px 24px",
            marginBottom: 18,
          }}
        >
          <div
            className="kd-grid-3"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 14,
            }}
          >
            <div>
              <label style={labelStyle}>Title</label>
              <input
                style={inputStyle}
                required
                value={form.title}
                onChange={(e) => set("title", e.target.value)}
              />
            </div>
            <div>
              <label style={labelStyle}>Slug (URL)</label>
              <input
                style={{
                  ...inputStyle,
                  background: mode === "edit" ? "var(--cream-100)" : "#fff",
                }}
                required
                disabled={mode === "edit"}
                placeholder="wild-kratts"
                value={form.slug}
                onChange={(e) => set("slug", e.target.value)}
              />
            </div>
            <div>
              <label style={labelStyle}>Network</label>
              <input
                style={inputStyle}
                value={form.network}
                onChange={(e) => set("network", e.target.value)}
              />
            </div>
            <div>
              <label style={labelStyle}>Year</label>
              <input
                style={inputStyle}
                type="number"
                required
                value={form.year}
                onChange={(e) => set("year", e.target.value)}
              />
            </div>
            <div>
              <label style={labelStyle}>Episode length</label>
              <input
                style={inputStyle}
                placeholder="~22 min"
                value={form.epLength}
                onChange={(e) => set("epLength", e.target.value)}
              />
            </div>
            <div>
              <label style={labelStyle}>Age group</label>
              <select
                style={inputStyle}
                value={form.ageGroup}
                onChange={(e) => set("ageGroup", e.target.value)}
              >
                {AGE_GROUPS.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.label} ({a.range})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Category</label>
              <select
                style={inputStyle}
                value={form.category}
                onChange={(e) => set("category", e.target.value)}
              >
                {CONTENT_CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label style={labelStyle}>
                Overall score{" "}
                {overallTier && (
                  <span style={{ color: overallTier.color }}>
                    · {overallTier.label}
                  </span>
                )}
              </label>
              <div style={{ display: "flex", gap: 8 }}>
                <input
                  style={{ ...inputStyle, width: 90 }}
                  type="number"
                  min={0}
                  max={100}
                  required
                  value={form.overall}
                  onChange={(e) => set("overall", e.target.value)}
                />
                <button
                  type="button"
                  onClick={suggestOverall}
                  className="btnp"
                  style={{
                    fontSize: 12.5,
                    fontWeight: 700,
                    background: "#fff",
                    color: "var(--ink-700)",
                    border: "2px solid var(--cream-200)",
                    borderRadius: 999,
                    padding: "0 14px",
                  }}
                >
                  Use average
                </button>
              </div>
            </div>
          </div>
          <div style={{ marginTop: 14 }}>
            <label style={labelStyle}>Tagline (shown on cards)</label>
            <textarea
              style={{ ...inputStyle, minHeight: 54, resize: "vertical" }}
              value={form.tagline}
              onChange={(e) => set("tagline", e.target.value)}
            />
          </div>
          <div style={{ marginTop: 14 }}>
            <label style={labelStyle}>Verdict (shown on the show page)</label>
            <textarea
              style={{ ...inputStyle, minHeight: 54, resize: "vertical" }}
              value={form.overallNote}
              onChange={(e) => set("overallNote", e.target.value)}
            />
          </div>
        </section>

        {/* ---- Metrics ---- */}
        {METRIC_GROUPS.map((group) => (
          <section
            key={group.id}
            style={{
              background: "#fff",
              border: "2px solid var(--cream-200)",
              borderRadius: 8,
              boxShadow: "var(--shadow-card)",
              padding: "20px 24px",
              marginBottom: 18,
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--ink-900)",
                fontSize: 23,
                margin: "0 0 14px",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <i
                className={group.icon}
                style={{ color: "var(--coral-500)", fontSize: 20 }}
              />
              {group.label}
            </h2>
            {METRICS.filter((m) => m.group === group.id).map((m) => {
              const metric = form.metrics[m.id] || {};
              const tier =
                metric.score !== "" && Number.isFinite(Number(metric.score))
                  ? scoreTier(Number(metric.score))
                  : null;
              return (
                <div
                  key={m.id}
                  style={{
                    borderTop: "2px solid var(--cream-100)",
                    padding: "12px 0",
                  }}
                >
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 800,
                      color: "var(--ink-900)",
                      marginBottom: 8,
                    }}
                  >
                    {m.label}
                  </div>
                  <div
                    className="kd-grid-3"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 110px 1.4fr",
                      gap: 10,
                    }}
                  >
                    <div>
                      <label style={labelStyle}>Measured value</label>
                      <input
                        style={inputStyle}
                        placeholder="e.g. 6.8 cuts/min"
                        value={metric.value ?? ""}
                        onChange={(e) => setMetric(m.id, "value", e.target.value)}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>
                        Score{" "}
                        {tier && (
                          <span style={{ color: tier.color }}>· {tier.label}</span>
                        )}
                      </label>
                      <input
                        style={inputStyle}
                        type="number"
                        min={0}
                        max={100}
                        required
                        value={metric.score ?? ""}
                        onChange={(e) => setMetric(m.id, "score", e.target.value)}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Note</label>
                      <input
                        style={inputStyle}
                        value={metric.note ?? ""}
                        onChange={(e) => setMetric(m.id, "note", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </section>
        ))}

        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <button
            className="btnp"
            type="submit"
            disabled={busy}
            style={{
              fontSize: 16,
              background: "var(--coral-500)",
              color: "#fff",
              border: "2px solid var(--coral-500)",
              borderRadius: 999,
              padding: "12px 30px",
              opacity: busy ? 0.6 : 1,
            }}
          >
            {busy ? "Saving…" : mode === "edit" ? "Save changes" : "Create show"}
          </button>
          <Link
            href="/admin"
            className="navlink"
            style={{ color: "var(--ink-500)", fontWeight: 700, fontSize: 15 }}
          >
            Cancel
          </Link>
        </div>
      </form>
    </main>
  );
}
