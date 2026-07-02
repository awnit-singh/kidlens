"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AGE_GROUPS, getAgeGroup, getCategory, scoreTier } from "@/lib/data";

const btn = {
  fontSize: 14,
  fontWeight: 700,
  fontFamily: "var(--font-body)",
  borderRadius: 999,
  padding: "9px 18px",
  cursor: "pointer",
  textDecoration: "none",
  display: "inline-block",
};
const solidBtn = {
  ...btn,
  background: "var(--coral-500)",
  color: "#fff",
  border: "2px solid var(--coral-500)",
};
const outlineBtn = {
  ...btn,
  background: "#fff",
  color: "var(--ink-700)",
  border: "2px solid var(--cream-200)",
};

export default function AdminDashboard({ shows, email }) {
  const router = useRouter();
  const fileRef = useRef(null);
  const [importResult, setImportResult] = useState(null);
  const [busy, setBusy] = useState(false);

  async function handleImport(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    setImportResult(null);
    try {
      const csv = await file.text();
      const res = await fetch("/api/admin/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ csv }),
      });
      const data = await res.json();
      if (res.ok) {
        setImportResult({
          kind: "ok",
          message: `Imported: ${data.created} created, ${data.updated} updated.`,
        });
        router.refresh();
      } else {
        setImportResult({
          kind: "error",
          message: "Import rejected (nothing was changed):",
          errors: data.errors || [data.error || "Unknown error"],
        });
      }
    } catch {
      setImportResult({ kind: "error", message: "Network error — try again." });
    } finally {
      setBusy(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  async function handleDelete(show) {
    if (!window.confirm(`Delete "${show.title}"? This can't be undone from the UI.`))
      return;
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/shows/${show.slug}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        window.alert((data.errors || [data.error]).join("\n") || "Delete failed.");
      }
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  return (
    <main style={{ padding: "36px 7vw 64px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          flexWrap: "wrap",
          marginBottom: 6,
        }}
      >
        <h1
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--coral-500)",
            fontSize: 40,
            margin: 0,
          }}
        >
          Admin
        </h1>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontSize: 13.5,
            fontWeight: 700,
            color: "var(--ink-500)",
          }}
        >
          {email}
          <form action="/api/admin/auth/logout" method="POST" style={{ margin: 0 }}>
            <button className="btnp" type="submit" style={outlineBtn}>
              Sign out
            </button>
          </form>
        </div>
      </div>
      <p style={{ fontSize: 14.5, color: "var(--ink-500)", margin: "0 0 22px" }}>
        {shows.length} shows · changes go live within seconds of saving.
      </p>

      {/* ---- Actions ---- */}
      <div
        style={{
          display: "flex",
          gap: 10,
          flexWrap: "wrap",
          alignItems: "center",
          marginBottom: 14,
        }}
      >
        <Link href="/admin/shows/new" className="btnp" style={solidBtn}>
          + Add show
        </Link>
        <a href="/api/admin/export" className="btnp" style={outlineBtn}>
          Export CSV
        </a>
        <button
          className="btnp"
          style={{ ...outlineBtn, opacity: busy ? 0.6 : 1 }}
          disabled={busy}
          onClick={() => fileRef.current?.click()}
        >
          {busy ? "Working…" : "Import CSV"}
        </button>
        <input
          ref={fileRef}
          type="file"
          accept=".csv,text/csv"
          onChange={handleImport}
          style={{ display: "none" }}
        />
        <span style={{ fontSize: 13, color: "var(--ink-500)", fontWeight: 600 }}>
          Batch edit: export → tweak in a spreadsheet → import (matches by slug).
        </span>
      </div>

      {importResult && (
        <div
          style={{
            fontSize: 14,
            fontWeight: 700,
            color:
              importResult.kind === "ok"
                ? "var(--score-great)"
                : "var(--score-poor)",
            background:
              importResult.kind === "ok"
                ? "var(--score-great-tint)"
                : "var(--score-poor-tint)",
            borderRadius: 6,
            padding: "12px 14px",
            marginBottom: 16,
            maxWidth: 720,
          }}
        >
          {importResult.message}
          {importResult.errors && (
            <ul style={{ margin: "8px 0 0", paddingLeft: 18, fontWeight: 600 }}>
              {importResult.errors.slice(0, 10).map((err, i) => (
                <li key={i}>{err}</li>
              ))}
              {importResult.errors.length > 10 && (
                <li>…and {importResult.errors.length - 10} more</li>
              )}
            </ul>
          )}
        </div>
      )}

      {/* ---- Shows table ---- */}
      <div
        style={{
          background: "#fff",
          border: "2px solid var(--cream-200)",
          borderRadius: 8,
          boxShadow: "var(--shadow-card)",
          overflowX: "auto",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr
              style={{
                textAlign: "left",
                color: "var(--ink-500)",
                fontSize: 12.5,
                textTransform: "uppercase",
                letterSpacing: ".05em",
              }}
            >
              {["Show", "Ages", "Category", "Score", ""].map((h) => (
                <th
                  key={h}
                  style={{
                    padding: "12px 16px",
                    borderBottom: "2px solid var(--cream-200)",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...shows]
              .sort(
                (a, b) =>
                  AGE_GROUPS.findIndex((g) => g.id === a.ageGroup) -
                    AGE_GROUPS.findIndex((g) => g.id === b.ageGroup) ||
                  b.overall - a.overall
              )
              .map((show) => {
                const age = getAgeGroup(show.ageGroup);
                const cat = getCategory(show.category);
                const tier = scoreTier(show.overall);
                return (
                  <tr key={show.slug}>
                    <td
                      style={{
                        padding: "10px 16px",
                        borderBottom: "2px solid var(--cream-100)",
                        fontWeight: 800,
                        color: "var(--ink-900)",
                      }}
                    >
                      {show.title}
                      <span
                        style={{
                          color: "var(--ink-500)",
                          fontWeight: 600,
                          fontSize: 12.5,
                          marginLeft: 8,
                        }}
                      >
                        /{show.slug}
                      </span>
                    </td>
                    <td
                      style={{
                        padding: "10px 16px",
                        borderBottom: "2px solid var(--cream-100)",
                        color: "var(--ink-700)",
                        fontWeight: 700,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {age ? age.range : show.ageGroup}
                    </td>
                    <td
                      style={{
                        padding: "10px 16px",
                        borderBottom: "2px solid var(--cream-100)",
                        color: "var(--ink-700)",
                        fontWeight: 700,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {cat ? cat.label : show.category}
                    </td>
                    <td
                      style={{
                        padding: "10px 16px",
                        borderBottom: "2px solid var(--cream-100)",
                      }}
                    >
                      <span
                        style={{
                          background: tier.color,
                          color: "#fff",
                          fontWeight: 800,
                          borderRadius: 999,
                          padding: "3px 12px",
                          fontSize: 13.5,
                        }}
                      >
                        {show.overall}
                      </span>
                    </td>
                    <td
                      style={{
                        padding: "10px 16px",
                        borderBottom: "2px solid var(--cream-100)",
                        textAlign: "right",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <Link
                        href={`/shows/${show.slug}`}
                        className="navlink"
                        style={{
                          color: "var(--ink-500)",
                          fontWeight: 700,
                          marginRight: 14,
                        }}
                      >
                        View
                      </Link>
                      <Link
                        href={`/admin/shows/${show.slug}/edit`}
                        className="navlink"
                        style={{
                          color: "var(--blue-500)",
                          fontWeight: 800,
                          marginRight: 14,
                        }}
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(show)}
                        disabled={busy}
                        style={{
                          background: "none",
                          border: "none",
                          color: "var(--score-poor)",
                          fontWeight: 800,
                          fontSize: 14,
                          fontFamily: "var(--font-body)",
                          cursor: "pointer",
                          padding: 0,
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </main>
  );
}
