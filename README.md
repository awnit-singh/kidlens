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
| **Roll-up** | Age-appropriateness — a weighted age-fit score (0–100), with weights set per age band |

Scores are **age-fit**, not quality grades: a fast, loud show can be fine for a nine-year-old and wrong for a toddler. The same measurement scores differently in different bands.

## Sample dataset

15 shows across 4 age bands (Toddlers 0–2, Preschoolers 2–5, Early Elementary 5–8, Big Kids 8–12), with one or two shows per content category (Calm & Cozy, Social & Feelings, Learning & Curiosity, Adventure & Action, Comedy & Energy) in each band. All data lives in [`lib/data.js`](./lib/data.js).

## Running locally

```bash
npm install
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
components/                # Nav, Footer, ShowCard, score primitives
lib/data.js                # Age bands, categories, metric definitions, and the sample dataset
```
