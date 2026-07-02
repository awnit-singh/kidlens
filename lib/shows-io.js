import { AGE_GROUPS, CONTENT_CATEGORIES, METRICS } from "./data";
import { parseCSV, toCSV } from "./csv";

/* One row per show. Base columns, then value/score/note per metric. */

export const BASE_COLUMNS = [
  "slug",
  "title",
  "network",
  "year",
  "epLength",
  "ageGroup",
  "category",
  "overall",
  "tagline",
  "overallNote",
];

export function csvColumns() {
  const cols = [...BASE_COLUMNS];
  for (const m of METRICS) {
    cols.push(`${m.id}_value`, `${m.id}_score`, `${m.id}_note`);
  }
  return cols;
}

export function showsToCSV(shows) {
  const cols = csvColumns();
  const rows = [cols];
  for (const s of shows) {
    const row = [
      s.slug,
      s.title,
      s.network,
      s.year,
      s.epLength,
      s.ageGroup,
      s.category,
      s.overall,
      s.tagline,
      s.overallNote,
    ];
    for (const m of METRICS) {
      const metric = s.metrics?.[m.id] || {};
      row.push(metric.value ?? "", metric.score ?? "", metric.note ?? "");
    }
    rows.push(row);
  }
  return toCSV(rows);
}

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function intInRange(v, min, max) {
  const n = Number(v);
  return Number.isInteger(n) && n >= min && n <= max;
}

/* Validate a show object; returns an array of error strings (empty = valid). */
export function validateShow(show) {
  const errors = [];
  if (!SLUG_RE.test(show.slug || ""))
    errors.push("slug must be lowercase letters/numbers/hyphens (e.g. wild-kratts)");
  if (!show.title?.trim()) errors.push("title is required");
  if (!AGE_GROUPS.some((a) => a.id === show.ageGroup))
    errors.push(
      `ageGroup must be one of: ${AGE_GROUPS.map((a) => a.id).join(", ")}`
    );
  if (!CONTENT_CATEGORIES.some((c) => c.id === show.category))
    errors.push(
      `category must be one of: ${CONTENT_CATEGORIES.map((c) => c.id).join(", ")}`
    );
  if (!intInRange(show.year, 1950, 2100)) errors.push("year must be a number");
  if (!intInRange(show.overall, 0, 100))
    errors.push("overall must be an integer 0–100");
  for (const m of METRICS) {
    const metric = show.metrics?.[m.id];
    if (!metric || !intInRange(metric.score, 0, 100))
      errors.push(`${m.id}_score must be an integer 0–100`);
  }
  return errors;
}

/* Coerce a raw object (form or CSV row) into a clean show record. */
export function normalizeShow(raw) {
  const metrics = {};
  for (const m of METRICS) {
    const src = raw.metrics?.[m.id] || {};
    metrics[m.id] = {
      value: String(src.value ?? "").trim(),
      score: Number(src.score),
      note: String(src.note ?? "").trim(),
    };
  }
  return {
    slug: String(raw.slug ?? "").trim().toLowerCase(),
    title: String(raw.title ?? "").trim(),
    network: String(raw.network ?? "").trim(),
    year: Number(raw.year),
    epLength: String(raw.epLength ?? "").trim(),
    ageGroup: String(raw.ageGroup ?? "").trim(),
    category: String(raw.category ?? "").trim(),
    overall: Number(raw.overall),
    tagline: String(raw.tagline ?? "").trim(),
    overallNote: String(raw.overallNote ?? "").trim(),
    metrics,
  };
}

/* Parse a CSV export back into shows. Returns { shows, errors } where
   errors are per-row messages keyed by CSV line number. */
export function showsFromCSV(text) {
  const rows = parseCSV(text);
  if (!rows.length) return { shows: [], errors: ["CSV is empty"] };

  const header = rows[0].map((h) => h.trim());
  const missing = BASE_COLUMNS.filter((c) => !header.includes(c));
  if (missing.length)
    return {
      shows: [],
      errors: [`Missing required columns: ${missing.join(", ")}`],
    };

  const shows = [];
  const errors = [];
  const seen = new Set();

  for (let r = 1; r < rows.length; r++) {
    const line = r + 1;
    const cells = rows[r];
    const get = (col) => {
      const idx = header.indexOf(col);
      return idx === -1 ? "" : (cells[idx] ?? "").trim();
    };
    const raw = {
      slug: get("slug"),
      title: get("title"),
      network: get("network"),
      year: get("year"),
      epLength: get("epLength"),
      ageGroup: get("ageGroup"),
      category: get("category"),
      overall: get("overall"),
      tagline: get("tagline"),
      overallNote: get("overallNote"),
      metrics: {},
    };
    for (const m of METRICS) {
      raw.metrics[m.id] = {
        value: get(`${m.id}_value`),
        score: get(`${m.id}_score`),
        note: get(`${m.id}_note`),
      };
    }
    const show = normalizeShow(raw);
    const rowErrors = validateShow(show);
    if (seen.has(show.slug)) rowErrors.push(`duplicate slug "${show.slug}" in file`);
    seen.add(show.slug);
    if (rowErrors.length) {
      errors.push(`Line ${line} (${show.slug || "no slug"}): ${rowErrors.join("; ")}`);
    } else {
      shows.push(show);
    }
  }
  return { shows, errors };
}
