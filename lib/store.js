import { list, put, del } from "@vercel/blob";
import { unstable_cache, revalidateTag } from "next/cache";
import { SHOWS as SEED_SHOWS } from "./data";

/* Shows live in Vercel Blob as versioned JSON snapshots. Every save
   writes a new timestamped blob; reads pick the newest. Old snapshots
   are pruned but the last KEEP_VERSIONS are retained as history.
   With no blob configured (or none written yet), the seed dataset in
   lib/data.js serves the site unchanged. */

const PREFIX = "data/shows-";
const KEEP_VERSIONS = 20;

async function readLatest() {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return null;
  try {
    const { blobs } = await list({ prefix: PREFIX });
    if (!blobs.length) return null;
    const latest = blobs.sort(
      (a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt)
    )[0];
    const res = await fetch(latest.url, { cache: "no-store" });
    if (!res.ok) return null;
    const data = await res.json();
    return Array.isArray(data.shows) ? data.shows : null;
  } catch (err) {
    console.error("Blob read failed, falling back to seed data:", err);
    return null;
  }
}

const cachedShows = unstable_cache(
  async () => (await readLatest()) ?? SEED_SHOWS,
  ["kidlens-shows"],
  { tags: ["shows"] }
);

export async function getShows() {
  return cachedShows();
}

export async function getShowBySlug(slug) {
  const shows = await getShows();
  return shows.find((s) => s.slug === slug) || null;
}

export async function saveShows(shows) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    throw new Error(
      "Blob storage is not configured (BLOB_READ_WRITE_TOKEN missing)."
    );
  }
  await put(
    `${PREFIX}${Date.now()}.json`,
    JSON.stringify({ shows, updatedAt: new Date().toISOString() }),
    { access: "public", contentType: "application/json" }
  );
  try {
    const { blobs } = await list({ prefix: PREFIX });
    const stale = blobs
      .sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt))
      .slice(KEEP_VERSIONS);
    await Promise.all(stale.map((b) => del(b.url)));
  } catch (err) {
    console.error("Blob prune failed (non-fatal):", err);
  }
  revalidateTag("shows");
}
