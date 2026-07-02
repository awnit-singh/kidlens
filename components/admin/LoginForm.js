"use client";

import { useState } from "react";

export default function LoginForm({ expired }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null); // {kind: "ok"|"error", message}
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setStatus(null);
    try {
      const res = await fetch("/api/admin/auth/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      setStatus(
        res.ok
          ? { kind: "ok", message: data.message }
          : { kind: "error", message: data.error || "Something went wrong." }
      );
    } catch {
      setStatus({ kind: "error", message: "Network error — try again." });
    } finally {
      setBusy(false);
    }
  }

  return (
    <main
      style={{
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 7vw",
      }}
    >
      <div
        style={{
          background: "#fff",
          border: "2px solid var(--cream-200)",
          borderRadius: 8,
          boxShadow: "var(--shadow-card)",
          padding: "32px 30px",
          width: "100%",
          maxWidth: 400,
        }}
      >
        <h1
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--coral-500)",
            fontSize: 32,
            margin: "0 0 6px",
          }}
        >
          Admin sign-in
        </h1>
        <p style={{ fontSize: 14.5, color: "var(--ink-500)", margin: "0 0 20px" }}>
          Enter the admin email and we&apos;ll send you a sign-in link.
        </p>
        {expired && !status && (
          <p
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: "var(--score-poor)",
              background: "var(--score-poor-tint)",
              borderRadius: 6,
              padding: "10px 12px",
              margin: "0 0 16px",
            }}
          >
            That link expired or was invalid — request a fresh one.
          </p>
        )}
        <form onSubmit={submit}>
          <input
            className="kf-input"
            type="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              fontFamily: "var(--font-body)",
              fontSize: 16,
              color: "var(--ink-900)",
              background: "var(--white)",
              border: "2px solid var(--cream-200)",
              borderRadius: 8,
              padding: "12px 14px",
              outline: "none",
              marginBottom: 14,
              boxSizing: "border-box",
            }}
          />
          <button
            className="btnp"
            type="submit"
            disabled={busy}
            style={{
              width: "100%",
              fontSize: 16,
              background: "var(--coral-500)",
              color: "#fff",
              border: "2px solid var(--coral-500)",
              borderRadius: 999,
              padding: "12px 24px",
              opacity: busy ? 0.6 : 1,
            }}
          >
            {busy ? "Sending…" : "Email me a sign-in link"}
          </button>
        </form>
        {status && (
          <p
            style={{
              fontSize: 14,
              fontWeight: 700,
              color:
                status.kind === "ok" ? "var(--score-great)" : "var(--score-poor)",
              background:
                status.kind === "ok"
                  ? "var(--score-great-tint)"
                  : "var(--score-poor-tint)",
              borderRadius: 6,
              padding: "10px 12px",
              margin: "16px 0 0",
            }}
          >
            {status.message}
          </p>
        )}
      </div>
    </main>
  );
}
