# KidLens

**Measured ratings for children's TV.** KidLens rates kids' shows on what they *do*, not just what they're about — 15 measurable signals per show, judged against the developmental needs of the target age band.

Built with the [Klik](https://github.com/awnit-singh/klik-landing) design system: cream surfaces, coral/green/blue/yellow accents, Patrick Hand + Nunito, floating blobs, and Phosphor icons.

> **Proof of concept.** All measurements in the sample dataset are illustrative estimates written to demonstrate the rating model — they are not lab measurements. See the [Methodology](./app/methodology/page.js) page for what a production pipeline would look like.

## The 15 signals

| Family | Signals |
| --- | --- |
| **Pacing & Editing** | Cuts per minute / shot-length distribution · Motion intensity (% active motion) |
| **Visual Intensity** | Saturation, luminance, contrast, hue/warmth |
| **Sound & Music** | Loudness (LUFS) + loudness range · Auditory change rate; music/SFX vs. speech ratio |
| **Content & Themes** | Fantasy/impossible-event density · Violence (+ consequences shown?) · Prosocial acts · Scariness/threat · Representation & role balance |
| **Language & Learning** | Dialogue density, vocabulary, readability · Language-modeling cues · Interactivity (direct address, pauses) · Curriculum-standard alignment |
| **Roll-up** | Age-appropriateness — one weighted score (0–100) per show, with weights set per age band |

A score says how well a show fits its target age — not whether it's good TV. A fast, loud show can be fine for a nine-year-old and wrong for a toddler, so the same measurement scores differently in different bands. Scores use a traffic-light scale: green (80+), amber (60–79), red (below 60) — judgment colors are reserved for scores and never used decoratively.

## Sample dataset

15 shows across 4 age bands (Toddlers 0–2, Preschoolers 2–5, Early Elementary 5–8, Big Kids 8–12), with one or two shows per content category (Calm & Cozy, Social & Feelings, Learning & Curiosity, Adventure & Action, Comedy & Energy) in each band. All data lives in [`lib/data.js`](./lib/data.js).

## Admin

`/admin` is a private editor for the show data — add shows, edit scores/copy, delete, and batch import/export via CSV (export the current data, tweak it in a spreadsheet, re-import; rows match by `slug`, all-or-nothing on validation errors).

- **Auth**: passwordless magic link. Enter an allowlisted email at `/admin/login`; a 15-minute sign-in link is emailed via Resend. Sessions are 30-day signed httpOnly cookies. No account system — the `ADMIN_EMAILS` env var *is* the allowlist.
- **Storage**: shows live in Vercel Blob as versioned JSON snapshots (last 20 kept). Public pages read through a cache tag and revalidate instantly on save. With no blob configured or written, the seed data in `lib/data.js` serves the site.

Environment variables (all set in Vercel; `vercel env pull` for local dev):

| Var | Purpose |
| --- | --- |
| `ADMIN_EMAILS` | Comma-separated allowlist for admin sign-in |
| `AUTH_SECRET` | HMAC key for login/session tokens |
| `RESEND_API_KEY` | Sends magic-link emails |
| `SITE_URL` | Canonical origin used in emailed links (production) |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob access (auto-added by the store link) |

## Running locally

```bash
npm install
vercel env pull .env.local   # gets blob token + auth secrets
npm run dev
```

Then open http://localhost:3000.

## Stack

- [Next.js 15](https://nextjs.org) (App Router, static pages, plain JavaScript)
- React 19
- No CSS framework — design tokens and primitives in [`app/globals.css`](./app/globals.css), inline styles in components (matching the Klik house style)

## Structure

```
app/
  page.js                  # Home — hero, side-by-side contrast, metric families, age bands
  shows/page.js            # All rated shows, grouped by age band
  shows/[slug]/page.js     # Per-show rating: all 15 signals with values, scores, and notes
  methodology/page.js      # How measurement works + the full codebook
  admin/                   # Private editor (magic-link auth): dashboard, show forms
  api/admin/               # Auth (request/callback/logout) + show CRUD, CSV import/export
components/                # Nav, Footer, ShowCard, score primitives, admin UI
lib/data.js                # Age bands, categories, metric definitions, and the seed dataset
lib/store.js               # Blob-backed show store with cache-tag revalidation
lib/auth.js                # HMAC tokens, session cookie, admin allowlist
lib/shows-io.js            # CSV mapping + validation for import/export
```
