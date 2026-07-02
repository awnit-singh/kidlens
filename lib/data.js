/* ============================================================
   KidLens sample dataset — PROOF OF CONCEPT
   All measurements below are illustrative estimates written to
   demonstrate the rating model. They are not lab measurements.
   ============================================================

   Scoring model: every metric gets an AGE-FIT SCORE (0–100) —
   how well the measured signal suits the show's target age band.
   It is not a quality grade; a fast, loud show can be a fine
   choice for a nine-year-old and a poor one for a toddler.
*/

export const AGE_GROUPS = [
  {
    id: "toddler",
    label: "Toddlers",
    range: "0–2",
    icon: "ph-fill ph-baby",
    color: "var(--green-500)",
    tint: "var(--green-100)",
    blurb:
      "Slow pacing, real faces, direct speech, and pauses that wait for an answer.",
  },
  {
    id: "preschool",
    label: "Preschoolers",
    range: "2–5",
    icon: "ph-fill ph-puzzle-piece",
    color: "var(--coral-500)",
    tint: "var(--coral-100)",
    blurb:
      "Big feelings arrive — social-emotional modeling and gentle pacing matter most.",
  },
  {
    id: "early-elementary",
    label: "Early Elementary",
    range: "5–8",
    icon: "ph-fill ph-backpack",
    color: "var(--blue-500)",
    tint: "var(--blue-100)",
    blurb:
      "Faster stories and richer vocabulary are fine now; how conflict resolves matters more than raw pace.",
  },
  {
    id: "big-kids",
    label: "Big Kids",
    range: "8–12",
    icon: "ph-fill ph-rocket-launch",
    color: "var(--yellow-500)",
    tint: "var(--yellow-100)",
    blurb:
      "Complex plots and real stakes are useful now — if consequences are shown.",
  },
];

export const CONTENT_CATEGORIES = [
  { id: "calm", label: "Calm & Cozy", icon: "ph-fill ph-cloud" },
  { id: "social", label: "Social & Feelings", icon: "ph-fill ph-heart" },
  { id: "learning", label: "Learning & Curiosity", icon: "ph-fill ph-lightbulb" },
  { id: "adventure", label: "Adventure & Action", icon: "ph-fill ph-compass" },
  { id: "comedy", label: "Comedy & Energy", icon: "ph-fill ph-smiley" },
];

export const METRIC_GROUPS = [
  {
    id: "pacing",
    label: "Pacing & Editing",
    short: "Pacing",
    icon: "ph-fill ph-film-slate",
    blurb: "How fast the picture changes, and how much of it is moving.",
  },
  {
    id: "visual",
    label: "Visual Intensity",
    short: "Visuals",
    icon: "ph-fill ph-palette",
    blurb: "How hard the image works on young eyes.",
  },
  {
    id: "audio",
    label: "Sound & Music",
    short: "Sound",
    icon: "ph-fill ph-speaker-high",
    blurb: "How loud, how compressed, and how busy the soundtrack is.",
  },
  {
    id: "content",
    label: "Content & Themes",
    short: "Content",
    icon: "ph-fill ph-book-open-text",
    blurb: "What actually happens on screen — and what it teaches.",
  },
  {
    id: "language",
    label: "Language & Learning",
    short: "Language",
    icon: "ph-fill ph-chat-circle-text",
    blurb: "Whether the show talks with your child or just at them.",
  },
];

export const METRICS = [
  {
    id: "cuts",
    group: "pacing",
    label: "Cuts per minute",
    desc: "Average shot changes per minute, plus the shot-length distribution across an episode. Rapid cutting outpaces what very young viewers can process.",
    how: "Automated shot-boundary detection over three full episodes; we report the mean rate and median shot length.",
  },
  {
    id: "motion",
    group: "pacing",
    label: "Motion intensity",
    desc: "Percentage of screen time with active motion — camera moves, character action, background churn.",
    how: "Optical-flow analysis on sampled frames; a frame counts as 'active' above a fixed flow threshold.",
  },
  {
    id: "color",
    group: "visual",
    label: "Color & light",
    desc: "Mean saturation, luminance, contrast, and hue warmth. Maxed-out palettes hold attention through arousal rather than interest.",
    how: "Frame sampling at 1 fps, converted to HSL; we report averages against age-band reference ranges.",
  },
  {
    id: "loudness",
    group: "audio",
    label: "Loudness",
    desc: "Integrated loudness (LUFS) and loudness range (LRA). Heavily compressed audio never gives little ears a rest.",
    how: "EBU R128 loudness measurement over full episodes, reported as integrated LUFS plus loudness range.",
  },
  {
    id: "audioChange",
    group: "audio",
    label: "Auditory change rate",
    desc: "How often the soundscape changes (new music cue, SFX burst, speaker change), and the balance of music and effects versus speech.",
    how: "Audio event segmentation, then classification into speech / music / SFX; we report events per minute and the mix.",
  },
  {
    id: "fantasy",
    group: "content",
    label: "Fantasy density",
    desc: "How often physically impossible events occur, and whether the show's world keeps consistent rules. Dense, rule-breaking fantasy taxes young executive function.",
    how: "Human coders tally impossible events per episode and rate world-rule consistency.",
  },
  {
    id: "violence",
    group: "content",
    label: "Violence & consequences",
    desc: "Frequency and style of violence — and crucially, whether consequences are shown or the harm simply vanishes for the next gag.",
    how: "Human coding of violent acts per episode, tagged for realism, tone, and whether consequences are depicted.",
  },
  {
    id: "prosocial",
    group: "content",
    label: "Prosocial acts",
    desc: "On-screen helping, sharing, comforting, and empathy — the behaviors preschoolers demonstrably imitate.",
    how: "Human coders count distinct prosocial acts per episode and note whether they are central or incidental to the plot.",
  },
  {
    id: "scariness",
    group: "content",
    label: "Scariness & threat",
    desc: "Peril, menace, and imagery likely to frighten the target age — including how quickly and clearly threats resolve.",
    how: "Human rating of threat intensity, duration, and resolution against age-band fear-response norms.",
  },
  {
    id: "representation",
    group: "content",
    label: "Representation & roles",
    desc: "Who appears, who leads, and who solves the problems — gender balance, cultural diversity, and disability representation.",
    how: "Cast census across a season: speaking roles, protagonist share, and problem-solver share by group.",
  },
  {
    id: "dialogue",
    group: "language",
    label: "Dialogue & vocabulary",
    desc: "Words per minute, vocabulary range, and readability of the dialogue relative to the target age.",
    how: "Transcript analysis: speech rate, type-token ratio, and grade-level readability of dialogue.",
  },
  {
    id: "langCues",
    group: "language",
    label: "Language-modeling cues",
    desc: "The teaching moves hidden in dialogue — labeling objects, expanding on ideas, asking real questions.",
    how: "Human coders count labeling, expansion, and question cues per minute in sampled episodes.",
  },
  {
    id: "interactivity",
    group: "language",
    label: "Interactivity",
    desc: "Direct address to the viewer and genuine pauses that leave room to answer — the 'Blue's Clues effect.'",
    how: "Count of direct-address prompts per minute and whether a response pause (≥2s) follows.",
  },
  {
    id: "curriculum",
    group: "language",
    label: "Curriculum alignment",
    desc: "Whether the show maps to a recognized learning framework — early-language milestones, CASEL, NGSS, Common Core — or just gestures at 'educational.'",
    how: "Expert review of a season against published standards; scored on coverage and accuracy.",
  },
];

/* The 15th variable — age-appropriateness — is the headline score on
   every show: a weighted roll-up of the 14 signals above, judged
   against the needs of the show's target age band. */

export const SHOWS = [
  /* ---------------- Toddlers (0–2) ---------------- */
  {
    slug: "ms-rachel",
    title: "Ms. Rachel — Songs for Littles",
    network: "YouTube",
    year: 2019,
    epLength: "~30 min",
    ageGroup: "toddler",
    category: "learning",
    overall: 93,
    tagline:
      "A speech-therapy-informed language show that behaves almost exactly the way the toddler research says a screen should.",
    metrics: {
      cuts: {
        value: "4.8 cuts/min · median shot 10s",
        score: 90,
        note: "Long, steady shots hold on Rachel's face — exactly where toddlers look for language cues.",
      },
      motion: {
        value: "22% active motion",
        score: 88,
        note: "Mostly a still frame with deliberate, exaggerated gestures.",
      },
      color: {
        value: "Moderate saturation · bright, warm palette",
        score: 85,
        note: "Cheerful but not saturated to the ceiling; the visual focus stays on faces and objects.",
      },
      loudness: {
        value: "-19 LUFS · LRA 7",
        score: 82,
        note: "Songs sit louder than speech, but dynamics stay gentle with real quiet moments.",
      },
      audioChange: {
        value: "9 events/min · 55% speech / 40% music / 5% SFX",
        score: 86,
        note: "Speech-forward mix; music supports the words instead of burying them.",
      },
      fantasy: {
        value: "0.2 impossible events/ep",
        score: 95,
        note: "Real objects, real rooms, real faces — nothing for a toddler brain to untangle.",
      },
      violence: {
        value: "None observed",
        score: 100,
        note: "No violence of any kind across the coded sample.",
      },
      prosocial: {
        value: "3.1 acts/ep",
        score: 84,
        note: "Modeled sharing and gentle turn-taking, usually narrated as it happens.",
      },
      scariness: {
        value: "None observed",
        score: 100,
        note: "Nothing coded as threatening for the age band.",
      },
      representation: {
        value: "Female lead · mixed guest cast",
        score: 80,
        note: "Rotating guests add variety, though the format centers a single host.",
      },
      dialogue: {
        value: "84 words/min · 'parentese' register",
        score: 95,
        note: "Slow, high-pitched, repetitive infant-directed speech — the register babies learn from best.",
      },
      langCues: {
        value: "11.4 cues/min — labeling, expansion, wh-questions",
        score: 98,
        note: "The densest language-cue rate in our sample; this is the show's entire design.",
      },
      interactivity: {
        value: "2.9 direct-address prompts/min with real pauses",
        score: 97,
        note: "Asks, then actually waits — the pause is long enough for a toddler to answer.",
      },
      curriculum: {
        value: "Early-language milestones (babble → first words)",
        score: 92,
        note: "Built with a speech-language pathologist around documented milestones.",
      },
    },
    overallNote:
      "Purpose-built language modeling with almost every sensory dial set where toddler research suggests. Loses a few points for song segments that run louder than speech.",
  },
  {
    slug: "teletubbies",
    title: "Teletubbies",
    network: "BBC / CBeebies",
    year: 1997,
    epLength: "~25 min",
    ageGroup: "toddler",
    category: "calm",
    overall: 84,
    tagline:
      "The slowest mainstream show ever made for this age — strange to adults precisely because it is paced for one-year-olds.",
    metrics: {
      cuts: {
        value: "3.1 cuts/min · median shot 14s",
        score: 95,
        note: "Glacial by adult standards; ideal for an audience that needs seconds to parse each frame.",
      },
      motion: {
        value: "18% active motion",
        score: 92,
        note: "Long stretches of near-stillness with one clear moving subject.",
      },
      color: {
        value: "High saturation · soft contrast · warm",
        score: 78,
        note: "Vivid character colors, but soft edges and gentle lighting keep arousal low.",
      },
      loudness: {
        value: "-24 LUFS · LRA 9",
        score: 90,
        note: "Quiet mix with generous dynamic range and real silences.",
      },
      audioChange: {
        value: "5 events/min · 30% speech / 45% music / 25% SFX",
        score: 80,
        note: "Sparse soundscape; giggles and simple cues rather than wall-to-wall score.",
      },
      fantasy: {
        value: "1.8 impossible events/ep, gentle and repeated",
        score: 75,
        note: "Magical elements recur identically every episode, so they become predictable rather than confusing.",
      },
      violence: {
        value: "None observed",
        score: 100,
        note: "No violence of any kind.",
      },
      prosocial: {
        value: "2.2 acts/ep — big hugs, turn-taking",
        score: 82,
        note: "Affection and sharing modeled constantly, if wordlessly.",
      },
      scariness: {
        value: "Minimal",
        score: 96,
        note: "Nothing coded as threatening; the lion-and-bear segment was famously cut for being too much.",
      },
      representation: {
        value: "Non-gendered lead characters",
        score: 74,
        note: "The Tubbies read as largely gender-neutral; human inserts show varied children.",
      },
      dialogue: {
        value: "31 words/min · proto-speech",
        score: 62,
        note: "Deliberate baby-talk was controversial; it models very little real vocabulary.",
      },
      langCues: {
        value: "2.1 cues/min",
        score: 55,
        note: "Narrator labels occasionally, but teaching moves are sparse.",
      },
      interactivity: {
        value: "0.8 prompts/min",
        score: 60,
        note: "'Again, again!' invites response, but pauses are inconsistent.",
      },
      curriculum: {
        value: "Sensory & routine familiarity only",
        score: 58,
        note: "Designed around comfort and repetition rather than a learning framework.",
      },
    },
    overallNote:
      "A sensory profile almost perfectly tuned to the youngest viewers. It simply doesn't teach much language — calm is the product.",
  },
  {
    slug: "cocomelon",
    title: "CoComelon",
    network: "YouTube / Netflix",
    year: 2018,
    epLength: "3–60 min",
    ageGroup: "toddler",
    category: "comedy",
    overall: 41,
    tagline:
      "Beloved, ubiquitous, and measurably relentless — nearly every sensory dial is turned to maximum for the age band least equipped to handle it.",
    metrics: {
      cuts: {
        value: "13.9 cuts/min · median shot 2.9s",
        score: 22,
        note: "A cut roughly every three seconds — far above the pace toddlers can actively process.",
      },
      motion: {
        value: "64% active motion",
        score: 28,
        note: "Something is always moving, bouncing, or zooming; there is nowhere for attention to rest.",
      },
      color: {
        value: "Very high saturation · very high luminance",
        score: 35,
        note: "Palette pinned near maximum — engineered salience rather than visual interest.",
      },
      loudness: {
        value: "-14 LUFS · LRA 3",
        score: 25,
        note: "Loud and heavily compressed; the mix almost never drops below full energy.",
      },
      audioChange: {
        value: "19 events/min · 15% speech / 70% music / 15% SFX",
        score: 30,
        note: "Wall-to-wall music with sound effects layered on top; conversational speech is rare.",
      },
      fantasy: {
        value: "2.4 impossible events/ep",
        score: 70,
        note: "Mild cartoon physics; the world itself is domestic and familiar.",
      },
      violence: {
        value: "None observed",
        score: 100,
        note: "No violence of any kind.",
      },
      prosocial: {
        value: "1.6 acts/ep",
        score: 66,
        note: "Sharing and helping appear in lyrics more than in modeled behavior.",
      },
      scariness: {
        value: "None observed",
        score: 98,
        note: "Nothing threatening for the age band.",
      },
      representation: {
        value: "Family ensemble, modest variety",
        score: 62,
        note: "A multiracial friend group orbits the central family, mostly in background roles.",
      },
      dialogue: {
        value: "58 words/min · repetitive song lyrics",
        score: 55,
        note: "Vocabulary is nursery-rhyme simple and almost entirely sung.",
      },
      langCues: {
        value: "3.3 cues/min, mostly sung labels",
        score: 48,
        note: "Labels arrive inside songs at a pace that leaves no room to respond.",
      },
      interactivity: {
        value: "0.2 prompts/min",
        score: 25,
        note: "Essentially no direct address and no pauses — the feed never waits for the child.",
      },
      curriculum: {
        value: "Nursery-rhyme familiarity only",
        score: 45,
        note: "Songs kids will recognize, but no structured learning goals behind them.",
      },
    },
    overallNote:
      "The clearest illustration of why KidLens measures instead of vibes: zero violence and zero scariness, yet the pacing, loudness, and interactivity numbers all point the wrong way for toddlers.",
  },

  /* ---------------- Preschoolers (2–5) ---------------- */
  {
    slug: "bluey",
    title: "Bluey",
    network: "ABC Kids / Disney+",
    year: 2018,
    epLength: "7 min",
    ageGroup: "preschool",
    category: "social",
    overall: 96,
    tagline:
      "Seven-minute masterclasses in imaginative play, family repair, and letting kids be kids — with a sensory profile to match.",
    metrics: {
      cuts: {
        value: "6.8 cuts/min · median shot 7s",
        score: 85,
        note: "Lively but readable; shots linger long enough to follow the play.",
      },
      motion: {
        value: "38% active motion",
        score: 80,
        note: "Energetic bursts of play balanced by genuinely quiet beats.",
      },
      color: {
        value: "Mid-high saturation · warm pastel palette",
        score: 88,
        note: "Distinctive heeler palette that stays warm and easy on the eyes.",
      },
      loudness: {
        value: "-21 LUFS · LRA 8",
        score: 88,
        note: "Dynamic mix — Joff Bush's score swells and actually recedes.",
      },
      audioChange: {
        value: "8 events/min · 60% speech / 30% music / 10% SFX",
        score: 85,
        note: "Conversation-led; music underlines feelings rather than replacing them.",
      },
      fantasy: {
        value: "Imaginative play, clearly signposted",
        score: 92,
        note: "Pretend games are framed as pretend — modeling exactly how preschool imagination works.",
      },
      violence: {
        value: "None · rough-and-tumble play only",
        score: 97,
        note: "Physical play with boundaries negotiated out loud.",
      },
      prosocial: {
        value: "4.7 acts/ep",
        score: 96,
        note: "Helping, comforting, and apology-and-repair are the plot, not the garnish.",
      },
      scariness: {
        value: "Rare and mild",
        score: 94,
        note: "Occasional big feelings, virtually no threat.",
      },
      representation: {
        value: "Female lead · deeply involved father · varied families",
        score: 93,
        note: "Bandit reset the bar for TV dads; side characters show single parents and different family shapes.",
      },
      dialogue: {
        value: "96 words/min · natural family register",
        score: 90,
        note: "Real conversational Australian English, idioms and all — rich input for this age.",
      },
      langCues: {
        value: "5.8 cues/min",
        score: 82,
        note: "Parents narrate, expand, and question inside play constantly.",
      },
      interactivity: {
        value: "Low direct address",
        score: 60,
        note: "A narrative show — it models conversation rather than inviting it.",
      },
      curriculum: {
        value: "Strong social-emotional alignment (CASEL-mapped)",
        score: 90,
        note: "Self-regulation, perspective-taking, and resilience in nearly every episode.",
      },
    },
    overallNote:
      "The rare show that scores at the top of both the sensory and the content ledgers. Only real gap is interactivity, which its format doesn't attempt.",
  },
  {
    slug: "daniel-tiger",
    title: "Daniel Tiger's Neighborhood",
    network: "PBS Kids",
    year: 2012,
    epLength: "~25 min",
    ageGroup: "preschool",
    category: "social",
    overall: 94,
    tagline:
      "Mister Rogers' research legacy in animated form — every episode is a rehearsal for one specific feeling, with a strategy song to take home.",
    metrics: {
      cuts: {
        value: "5.4 cuts/min · median shot 9s",
        score: 90,
        note: "Deliberately slow, inherited straight from the Rogers playbook.",
      },
      motion: {
        value: "30% active motion",
        score: 86,
        note: "Calm staging; the camera sits still while feelings happen.",
      },
      color: {
        value: "Warm mid saturation",
        score: 86,
        note: "Soft neighborhood palette, low visual noise.",
      },
      loudness: {
        value: "-23 LUFS · LRA 7",
        score: 92,
        note: "Broadcast-gentle mix; strategy songs stay conversational in volume.",
      },
      audioChange: {
        value: "7 events/min · 55% speech / 35% music / 10% SFX",
        score: 86,
        note: "Speech-led with musical refrains that repeat by design.",
      },
      fantasy: {
        value: "Fantasy neighborhood with consistent rules",
        score: 85,
        note: "Trolley and tiger aside, the world runs on completely familiar preschool logic.",
      },
      violence: {
        value: "None observed",
        score: 100,
        note: "Conflict is emotional, never physical.",
      },
      prosocial: {
        value: "5.2 acts/ep + explicit strategy songs",
        score: 97,
        note: "The highest prosocial density in our sample, with each strategy named and sung.",
      },
      scariness: {
        value: "Minimal",
        score: 96,
        note: "Doctor visits and thunderstorms are as scary as it gets — and that's the point.",
      },
      representation: {
        value: "Diverse neighbors · disability representation",
        score: 90,
        note: "Chrissie's leg braces are simply part of the neighborhood, never a Very Special Episode.",
      },
      dialogue: {
        value: "78 words/min · emotion vocabulary",
        score: 88,
        note: "Deliberately teaches feeling-words: frustrated, disappointed, proud.",
      },
      langCues: {
        value: "6.9 cues/min",
        score: 88,
        note: "Labeling and expansion built into the scripts by child-development advisors.",
      },
      interactivity: {
        value: "1.4 direct-address prompts/min",
        score: 85,
        note: "Daniel turns to camera and asks, then waits — the Rogers signature.",
      },
      curriculum: {
        value: "Explicit SEL curriculum from the Fred Rogers Company",
        score: 96,
        note: "Each episode targets one documented preschool challenge with a tested strategy.",
      },
    },
    overallNote:
      "The most deliberately engineered show in the preschool band, and the numbers show it — top-tier on prosocial content, curriculum, and calm.",
  },
  {
    slug: "sesame-street",
    title: "Sesame Street",
    network: "PBS / Max",
    year: 1969,
    epLength: "~30 min",
    ageGroup: "preschool",
    category: "learning",
    overall: 92,
    tagline:
      "Fifty-plus years of formative research behind every segment — the founding proof that television can teach.",
    metrics: {
      cuts: {
        value: "7.9 cuts/min (magazine format)",
        score: 74,
        note: "The segment structure means pace varies widely — parodies cut fast, street scenes breathe.",
      },
      motion: {
        value: "42% active motion",
        score: 76,
        note: "Muppet energy, moderated by long conversational street segments.",
      },
      color: {
        value: "High saturation, varied by segment",
        score: 78,
        note: "Bright by design; the format's variety keeps it from feeling relentless.",
      },
      loudness: {
        value: "-20 LUFS · LRA 9",
        score: 84,
        note: "Wide dynamic range — songs get big, conversations get quiet.",
      },
      audioChange: {
        value: "11 events/min · 50% speech / 35% music / 15% SFX",
        score: 72,
        note: "Busy soundscape, though speech keeps the lead.",
      },
      fantasy: {
        value: "Muppets in a real neighborhood",
        score: 84,
        note: "Fantastical characters, but the world's social rules are entirely real.",
      },
      violence: {
        value: "Rare slapstick, consequences discussed",
        score: 90,
        note: "The occasional pratfall comes with a check-in afterward.",
      },
      prosocial: {
        value: "4.1 acts/ep",
        score: 92,
        note: "Cooperation and kindness modeled across every segment type.",
      },
      scariness: {
        value: "Minimal",
        score: 95,
        note: "Even the monsters are furry and friendly.",
      },
      representation: {
        value: "Landmark diversity · autism representation",
        score: 97,
        note: "Integrated casting since 1969; Julia brought autistic representation done with expert care.",
      },
      dialogue: {
        value: "88 words/min · deliberate vocabulary curriculum",
        score: 92,
        note: "Target words are chosen per season and repeated across segments.",
      },
      langCues: {
        value: "7.7 cues/min",
        score: 90,
        note: "Letters, numbers, and words labeled, expanded, and revisited relentlessly.",
      },
      interactivity: {
        value: "1.8 prompts/min",
        score: 88,
        note: "Elmo and friends ask the audience directly and leave answer-space.",
      },
      curriculum: {
        value: "Literacy + numeracy standards, tested for 50 years",
        score: 98,
        note: "The most-researched children's program ever made; effects replicated across decades.",
      },
    },
    overallNote:
      "The gold standard for curriculum on television. Its magazine pacing is busier than modern calm-first shows, which costs it a little in the sensory columns.",
  },
  {
    slug: "puffin-rock",
    title: "Puffin Rock",
    network: "Netflix / RTÉjr",
    year: 2015,
    epLength: "7 min",
    ageGroup: "preschool",
    category: "calm",
    overall: 90,
    tagline:
      "Watercolor Irish island life, narrated like a bedtime story — the quietest show in the preschool band.",
    metrics: {
      cuts: {
        value: "4.2 cuts/min · median shot 11s",
        score: 94,
        note: "Unhurried editing that lets kids study every frame.",
      },
      motion: {
        value: "24% active motion",
        score: 90,
        note: "Waves, wings, and weather — motion is natural and gentle.",
      },
      color: {
        value: "Soft watercolor palette · low contrast",
        score: 92,
        note: "Muted seaside hues; the visual opposite of engineered salience.",
      },
      loudness: {
        value: "-24 LUFS · LRA 10",
        score: 93,
        note: "Whisper-quiet mix with real silence between sounds.",
      },
      audioChange: {
        value: "4 events/min · 45% speech / 35% music / 20% SFX",
        score: 90,
        note: "A narrator, soft score, and seabird calls — that's the whole soundscape.",
      },
      fantasy: {
        value: "Naturalistic — none observed",
        score: 93,
        note: "Real island ecology throughout.",
      },
      violence: {
        value: "None observed",
        score: 100,
        note: "No violence of any kind.",
      },
      prosocial: {
        value: "3.4 acts/ep — sibling care",
        score: 88,
        note: "Oona looking after Baba is the emotional spine of the series.",
      },
      scariness: {
        value: "Mild weather peril, quickly resolved",
        score: 90,
        note: "Storms pass fast and someone is always nearby.",
      },
      representation: {
        value: "Animal cast · gentle narrator",
        score: 72,
        note: "Limited human representation by format; sibling pair splits the lead evenly.",
      },
      dialogue: {
        value: "64 words/min · gentle narration",
        score: 80,
        note: "Simple sentences delivered slowly, with nature words repeated.",
      },
      langCues: {
        value: "4.6 cues/min — nature labeling",
        score: 75,
        note: "The narrator names species, sounds, and weather as they appear.",
      },
      interactivity: {
        value: "0.5 prompts/min",
        score: 55,
        note: "Occasional rhetorical questions; not the format's aim.",
      },
      curriculum: {
        value: "Light nature-science content",
        score: 70,
        note: "Genuine ecology (tides, puffling development) without formal standards.",
      },
    },
    overallNote:
      "The wind-down show: measured sensory calm with honest nature content. Choose it for the hour before bed.",
  },
  {
    slug: "paw-patrol",
    title: "PAW Patrol",
    network: "Nickelodeon",
    year: 2013,
    epLength: "~22 min",
    ageGroup: "preschool",
    category: "adventure",
    overall: 62,
    tagline:
      "The rescue-team juggernaut: strong teamwork modeling wrapped in a faster, louder package than its audience needs.",
    metrics: {
      cuts: {
        value: "10.6 cuts/min · median shot 4s",
        score: 45,
        note: "Action-show editing applied to a preschool audience.",
      },
      motion: {
        value: "58% active motion",
        score: 42,
        note: "Vehicles, chases, and gadget deployments keep the screen churning.",
      },
      color: {
        value: "High saturation · high contrast",
        score: 55,
        note: "Toyetic palette tuned for shelf recognition as much as storytelling.",
      },
      loudness: {
        value: "-17 LUFS · LRA 5",
        score: 48,
        note: "Loud, compressed mix with near-constant score.",
      },
      audioChange: {
        value: "14 events/min · 45% speech / 30% music / 25% SFX",
        score: 46,
        note: "Sirens, barks, and gadget sounds stack on top of the music bed.",
      },
      fantasy: {
        value: "Tech-fantasy rescues, consistent world",
        score: 72,
        note: "Implausible, but the world's rules never change mid-episode.",
      },
      violence: {
        value: "Peril without injury · villain slapstick",
        score: 74,
        note: "No one is ever hurt; Mayor Humdinger's schemes fail harmlessly.",
      },
      prosocial: {
        value: "3.8 acts/ep — teamwork core",
        score: 85,
        note: "'No job is too big, no pup is too small' is genuinely the operating thesis.",
      },
      scariness: {
        value: "Frequent mild peril, always resolved",
        score: 70,
        note: "Cliffhangers literal and figurative, but rescue always arrives.",
      },
      representation: {
        value: "1 of 6 core pups female at launch",
        score: 48,
        note: "Skye carried the entire gender balance for years; Everest and Liberty arrived later.",
      },
      dialogue: {
        value: "92 words/min · formulaic scripts",
        score: 62,
        note: "Serviceable vocabulary locked into a rigid episode template.",
      },
      langCues: {
        value: "2.4 cues/min",
        score: 45,
        note: "Little labeling or questioning; dialogue exists to advance the rescue.",
      },
      interactivity: {
        value: "0.1 prompts/min",
        score: 22,
        note: "No direct address; the viewer watches the team rather than joining it.",
      },
      curriculum: {
        value: "Teamwork themes, no explicit framework",
        score: 40,
        note: "Prosocial themes are real but unstructured — no standard behind them.",
      },
    },
    overallNote:
      "A genuinely decent content ledger (teamwork, harmless conflict) undercut by sensory numbers that look more like an action show than a preschool one.",
  },

  /* ---------------- Early Elementary (5–8) ---------------- */
  {
    slug: "wild-kratts",
    title: "Wild Kratts",
    network: "PBS Kids",
    year: 2011,
    epLength: "~25 min",
    ageGroup: "early-elementary",
    category: "learning",
    overall: 89,
    tagline:
      "Real zoology smuggled inside creature-power adventures — the rare science show kids ask for by name.",
    metrics: {
      cuts: {
        value: "8.8 cuts/min",
        score: 78,
        note: "Adventure pacing, appropriate for an audience that can now follow it.",
      },
      motion: {
        value: "52% active motion",
        score: 68,
        note: "Chase-heavy animation balanced by live-action nature segments.",
      },
      color: {
        value: "Bright, naturalistic habitats",
        score: 80,
        note: "Saturated but grounded in real habitat palettes.",
      },
      loudness: {
        value: "-19 LUFS · LRA 7",
        score: 78,
        note: "Energetic mix that still leaves room for narration.",
      },
      audioChange: {
        value: "10 events/min · 55% speech / 25% music / 20% SFX",
        score: 74,
        note: "Speech keeps the lead even during action beats.",
      },
      fantasy: {
        value: "Creature-power suits, clearly framed as tech",
        score: 82,
        note: "One fantastical device; every animal ability it copies is real and explained.",
      },
      violence: {
        value: "Predation shown factually · villains foiled non-violently",
        score: 84,
        note: "Nature is honest about eating and being eaten; human conflict stays bloodless.",
      },
      prosocial: {
        value: "2.9 acts/ep + conservation ethic",
        score: 84,
        note: "Rescue-and-release plots model stewardship over dominion.",
      },
      scariness: {
        value: "Mild predator tension",
        score: 82,
        note: "Real predators create real but brief tension.",
      },
      representation: {
        value: "Aviva leads engineering · diverse core team",
        score: 86,
        note: "The inventor the plot depends on is a Latina engineer.",
      },
      dialogue: {
        value: "104 words/min · rich biology vocabulary",
        score: 90,
        note: "Tier-3 words — nictitating membrane, echolocation — used and re-used correctly.",
      },
      langCues: {
        value: "5.2 cues/min — define-then-use pattern",
        score: 82,
        note: "New terms get defined, demonstrated, then deployed in the plot.",
      },
      interactivity: {
        value: "0.6 prompts/min",
        score: 58,
        note: "Occasional 'what do you think?' moments, mostly rhetorical.",
      },
      curriculum: {
        value: "NGSS life-science alignment",
        score: 94,
        note: "Structure-and-function content maps cleanly onto elementary science standards.",
      },
    },
    overallNote:
      "The strongest science-vocabulary numbers in our sample, carried by an adventure format fast enough to compete with pure entertainment.",
  },
  {
    slug: "odd-squad",
    title: "Odd Squad",
    network: "PBS Kids",
    year: 2014,
    epLength: "~22 min",
    ageGroup: "early-elementary",
    category: "learning",
    overall: 87,
    tagline:
      "A kid-run agency solves absurd problems with actual math — deadpan comedy with Common Core underneath.",
    metrics: {
      cuts: {
        value: "9.4 cuts/min",
        score: 72,
        note: "Sitcom-quick, softened by dialogue-driven scenes.",
      },
      motion: {
        value: "44% active motion",
        score: 72,
        note: "Live action keeps motion naturally lower than animation.",
      },
      color: {
        value: "Mid saturation · office palette",
        score: 82,
        note: "The bureaucratic look is a visual joke that happens to be easy on the eyes.",
      },
      loudness: {
        value: "-20 LUFS · LRA 8",
        score: 82,
        note: "Comfortable broadcast mix with dynamic comedic beats.",
      },
      audioChange: {
        value: "9 events/min · 65% speech / 20% music / 15% SFX",
        score: 78,
        note: "Dialogue-first; the score stays out of the way of the jokes.",
      },
      fantasy: {
        value: "Absurdist gadgets with strict internal logic",
        score: 78,
        note: "Ridiculous premises that obey their own stated rules — good fuel for hypothetical thinking.",
      },
      violence: {
        value: "None — conflict is puzzles",
        score: 95,
        note: "Villains cause oddness, not harm; solutions are computed, not fought.",
      },
      prosocial: {
        value: "2.6 acts/ep — partner cooperation",
        score: 80,
        note: "Every case is solved by a pair who disagree, then collaborate.",
      },
      scariness: {
        value: "Comic villains only",
        score: 92,
        note: "Nothing coded above 'silly menace.'",
      },
      representation: {
        value: "Kids of color in lead roles · female director",
        score: 92,
        note: "The agency is run and staffed by a diverse kid cast without comment.",
      },
      dialogue: {
        value: "118 words/min · math talk",
        score: 85,
        note: "Fast, witty scripts that use precise mathematical language.",
      },
      langCues: {
        value: "4.8 cues/min — think-aloud problem solving",
        score: 80,
        note: "Agents narrate their reasoning step by step before acting.",
      },
      interactivity: {
        value: "0.9 prompts/min — viewer asked to solve",
        score: 72,
        note: "Puzzles are posed to camera with genuine solve-time before the reveal.",
      },
      curriculum: {
        value: "Common Core math-practice alignment",
        score: 95,
        note: "Pattern-finding, place value, and data plots embedded in every case.",
      },
    },
    overallNote:
      "Proof that curriculum and comedy aren't rivals: math practices drive the plots and the jokes simultaneously.",
  },
  {
    slug: "spongebob",
    title: "SpongeBob SquarePants",
    network: "Nickelodeon",
    year: 1999,
    epLength: "~22 min",
    ageGroup: "early-elementary",
    category: "comedy",
    overall: 48,
    tagline:
      "A comedy institution whose sensory and content numbers sit almost exactly where the executive-function research points its warnings.",
    metrics: {
      cuts: {
        value: "12.7 cuts/min · median shot 3.2s",
        score: 30,
        note: "The fast-pacing benchmark: this is the show the 2011 executive-function study used.",
      },
      motion: {
        value: "66% active motion",
        score: 32,
        note: "Squash-and-stretch everything, all the time.",
      },
      color: {
        value: "Very high saturation and contrast",
        score: 42,
        note: "Bikini Bottom is lit like a sign that wants you to look at it.",
      },
      loudness: {
        value: "-15 LUFS · LRA 4",
        score: 34,
        note: "Loud, compressed, and punctuated by screams as punchlines.",
      },
      audioChange: {
        value: "17 events/min · 40% speech / 25% music / 35% SFX",
        score: 32,
        note: "The highest SFX share in our sample — foley is a main character.",
      },
      fantasy: {
        value: "4.9 impossible events/ep",
        score: 45,
        note: "Dense, rule-free cartoon physics — the combination research flags for young viewers.",
      },
      violence: {
        value: "Frequent consequence-free slapstick",
        score: 40,
        note: "Injuries vanish by the next shot; harm is a rhythm device.",
      },
      prosocial: {
        value: "1.4 acts/ep, often undercut by the gag",
        score: 45,
        note: "Kind moments exist but usually collapse into the joke.",
      },
      scariness: {
        value: "Grotesque close-ups, mild threat",
        score: 62,
        note: "More gross-out than fear; occasional nightmare-fuel stills.",
      },
      representation: {
        value: "Male-dominated core cast",
        score: 42,
        note: "Sandy is the lone recurring female lead in Bikini Bottom's inner circle.",
      },
      dialogue: {
        value: "110 words/min · ironic register",
        score: 60,
        note: "Genuinely clever wordplay pitched above the age band — much of it lands only for adults.",
      },
      langCues: {
        value: "1.2 cues/min",
        score: 30,
        note: "No teaching moves; language is for jokes.",
      },
      interactivity: {
        value: "Essentially none",
        score: 45,
        note: "No direct address; less critical at this age, but nothing here either.",
      },
      curriculum: {
        value: "None",
        score: 12,
        note: "No learning framework, stated or implied.",
      },
    },
    overallNote:
      "Not a moral panic — a measurement. As an occasional treat for 7-year-olds it's fine; as a daily default its numbers argue against it.",
  },
  {
    slug: "hilda",
    title: "Hilda",
    network: "Netflix",
    year: 2018,
    epLength: "~24 min",
    ageGroup: "early-elementary",
    category: "adventure",
    overall: 88,
    tagline:
      "Scandinavian folklore rendered in twilight blues — adventurous, occasionally genuinely eerie, and deeply kind.",
    metrics: {
      cuts: {
        value: "7.6 cuts/min",
        score: 80,
        note: "Patient editing that trusts kids to sit in an atmosphere.",
      },
      motion: {
        value: "40% active motion",
        score: 76,
        note: "Action set-pieces bracketed by long walks through quiet landscapes.",
      },
      color: {
        value: "Muted Scandinavian palette · twilight blues",
        score: 90,
        note: "One of the most restrained palettes in children's animation.",
      },
      loudness: {
        value: "-22 LUFS · LRA 9",
        score: 86,
        note: "Soft mix with real dynamic swells reserved for the big moments.",
      },
      audioChange: {
        value: "7 events/min · 55% speech / 35% music / 10% SFX",
        score: 82,
        note: "Score-led atmosphere that never crowds the dialogue.",
      },
      fantasy: {
        value: "Dense folklore with consistent rules",
        score: 74,
        note: "Trolls, giants, and spirits everywhere — but the mythology keeps its own law.",
      },
      violence: {
        value: "Occasional peril · consequences and repair shown",
        score: 80,
        note: "When Hilda's recklessness hurts someone, the next episode deals with it.",
      },
      prosocial: {
        value: "3.2 acts/ep — befriending the 'monster'",
        score: 90,
        note: "The structural lesson of nearly every episode: the frightening thing has a point of view.",
      },
      scariness: {
        value: "Real tension — trolls, spirits, the Marra",
        score: 68,
        note: "Genuinely eerie by design; sensitive 5-year-olds may need company.",
      },
      representation: {
        value: "Female lead · single mother · diverse friends",
        score: 90,
        note: "A girl adventurer whose single mum is a full character, not a backdrop.",
      },
      dialogue: {
        value: "86 words/min · literary vocabulary",
        score: 84,
        note: "Words like 'phenomenon' and 'covenant' used naturally in context.",
      },
      langCues: {
        value: "2.8 cues/min",
        score: 55,
        note: "Not a teaching show; vocabulary arrives by immersion.",
      },
      interactivity: {
        value: "None — narrative format",
        score: 55,
        note: "No direct address; expected for the genre and age.",
      },
      curriculum: {
        value: "Folklore literacy · SEL threads",
        score: 62,
        note: "No formal standards, but rich material for talking about fear and empathy.",
      },
    },
    overallNote:
      "The strongest 'gateway to chapter books' profile in the band: calm sensory numbers, real stakes, and repair shown on screen. Mind the scariness score for younger siblings.",
  },

  /* ---------------- Big Kids (8–12) ---------------- */
  {
    slug: "avatar-the-last-airbender",
    title: "Avatar: The Last Airbender",
    network: "Nickelodeon",
    year: 2005,
    epLength: "~23 min",
    ageGroup: "big-kids",
    category: "adventure",
    overall: 91,
    tagline:
      "A war story for ten-year-olds that takes consequences seriously — still the benchmark for morally serious kids' TV.",
    metrics: {
      cuts: {
        value: "9.1 cuts/min · action peaks ~16",
        score: 74,
        note: "Measured editing for the genre; fight scenes spike, dialogue scenes rest.",
      },
      motion: {
        value: "55% active motion",
        score: 66,
        note: "Bending choreography keeps motion high — appropriate for the band.",
      },
      color: {
        value: "Naturalistic earth tones by nation",
        score: 85,
        note: "Palette is worldbuilding: each nation gets its own restrained scheme.",
      },
      loudness: {
        value: "-18 LUFS · LRA 10",
        score: 80,
        note: "Wide dynamics — battles are big because quiet scenes are actually quiet.",
      },
      audioChange: {
        value: "10 events/min · 55% speech / 30% music / 15% SFX",
        score: 78,
        note: "The Track Team's score breathes with the drama rather than over it.",
      },
      fantasy: {
        value: "Elemental bending under strict rules",
        score: 85,
        note: "A hard magic system: powers have limits, costs, and training arcs.",
      },
      violence: {
        value: "Martial combat · injury, loss, and war shown seriously",
        score: 78,
        note: "Violence has weight — characters grieve, scar, and change because of it.",
      },
      prosocial: {
        value: "3.6 acts/ep · redemption as thesis",
        score: 94,
        note: "Zuko's three-season redemption arc is the most sustained empathy lesson on this list.",
      },
      scariness: {
        value: "War themes · genocide backstory · real stakes",
        score: 65,
        note: "Heavy material handled honestly; right for 9+, a lot for 7.",
      },
      representation: {
        value: "Asian & Inuit-inspired world · Toph · Katara",
        score: 95,
        note: "Non-Western world as default, female fighters as peers, and a blind girl as the strongest earthbender.",
      },
      dialogue: {
        value: "94 words/min · moral reasoning out loud",
        score: 90,
        note: "Characters argue ethics — mercy, duty, revenge — in language kids can actually use.",
      },
      langCues: {
        value: "Rhetorical questions in dialogue",
        score: 60,
        note: "No explicit teaching moves; reflection is modeled, not prompted.",
      },
      interactivity: {
        value: "None — narrative format",
        score: 55,
        note: "As expected for serialized drama at this age.",
      },
      curriculum: {
        value: "Ethics, geography-analogues, media literacy",
        score: 68,
        note: "No formal standard, but endlessly mineable for classroom discussion.",
      },
    },
    overallNote:
      "The content ledger carries it: consequences, representation, and moral reasoning near the top of the entire sample. Sensory scores are honest action-show numbers.",
  },
  {
    slug: "gravity-falls",
    title: "Gravity Falls",
    network: "Disney Channel",
    year: 2012,
    epLength: "~22 min",
    ageGroup: "big-kids",
    category: "comedy",
    overall: 84,
    tagline:
      "A mystery-comedy that hides ciphers in its credits — television that assumes its audience wants to work.",
    metrics: {
      cuts: {
        value: "10.8 cuts/min",
        score: 62,
        note: "Fast comedic editing, within range for the age band.",
      },
      motion: {
        value: "58% active motion",
        score: 60,
        note: "Gag density keeps the frame busy.",
      },
      color: {
        value: "Saturated forest palette",
        score: 78,
        note: "Rich but coherent; the Oregon woods anchor every scene.",
      },
      loudness: {
        value: "-16 LUFS · LRA 6",
        score: 60,
        note: "Modern-cable loud, moderately compressed.",
      },
      audioChange: {
        value: "13 events/min · 55% speech / 25% music / 20% SFX",
        score: 62,
        note: "Joke-a-beat rhythm keeps the soundscape churning.",
      },
      fantasy: {
        value: "High density, mystery-coded",
        score: 80,
        note: "Anomalies are the point — and the show teaches you to catalog them like a researcher.",
      },
      violence: {
        value: "Cartoon peril + occasional real menace",
        score: 68,
        note: "Mostly slapstick, but Bill Cipher arcs carry genuine threat with lasting stakes.",
      },
      prosocial: {
        value: "2.8 acts/ep — sibling loyalty core",
        score: 86,
        note: "Dipper and Mabel's relationship survives being tested, which is the series' real plot.",
      },
      scariness: {
        value: "Deliberately creepy arcs",
        score: 58,
        note: "Horror-adjacent by design; exactly why 10-year-olds love it and 6-year-olds shouldn't watch it.",
      },
      representation: {
        value: "Boy-girl twin co-leads",
        score: 72,
        note: "Equal-billing siblings; the wider cast skews male.",
      },
      dialogue: {
        value: "128 words/min · wordplay and irony",
        score: 82,
        note: "Dense, literate scripts that reward rewatching.",
      },
      langCues: {
        value: "1.8 cues/min · puzzle-solving modeled",
        score: 55,
        note: "No teaching moves, but investigative thinking is constantly demonstrated.",
      },
      interactivity: {
        value: "Cryptograms in credits and backgrounds",
        score: 74,
        note: "A rare off-screen interactivity model: kids pause, decode, and compare notes.",
      },
      curriculum: {
        value: "No formal standard · cryptography hooks",
        score: 50,
        note: "Caesar and Vigenère ciphers smuggled into a comedy — unstructured but real.",
      },
    },
    overallNote:
      "Scores like an entertainment show with a hidden enrichment layer. The decode-it-yourself interactivity is unique in our sample.",
  },
  {
    slug: "horrible-histories",
    title: "Horrible Histories",
    network: "CBBC",
    year: 2009,
    epLength: "~28 min",
    ageGroup: "big-kids",
    category: "learning",
    overall: 86,
    tagline:
      "Sketch comedy where the punchlines are footnoted — history taught through exactly the gross bits kids remember.",
    metrics: {
      cuts: {
        value: "11.2 cuts/min (sketch format)",
        score: 60,
        note: "Sketch turnover keeps the cut rate high by construction.",
      },
      motion: {
        value: "46% active motion",
        score: 68,
        note: "Live-action staging keeps motion moderate between musical numbers.",
      },
      color: {
        value: "Naturalistic costume-drama lighting",
        score: 82,
        note: "Period sets and costumes, not cartoon salience.",
      },
      loudness: {
        value: "-18 LUFS · LRA 8",
        score: 76,
        note: "Song parodies get loud; sketches sit at conversational levels.",
      },
      audioChange: {
        value: "14 events/min · 60% speech / 30% music / 10% SFX",
        score: 64,
        note: "Busy by format, but speech-dominant throughout.",
      },
      fantasy: {
        value: "Comedic anachronism, clearly flagged",
        score: 80,
        note: "Rat narrators and pop-song pastiches — kids reliably parse the joke frame.",
      },
      violence: {
        value: "Historical violence, factual and played for comedy",
        score: 66,
        note: "Executions and plagues are real history; the comedy frame softens but doesn't hide them.",
      },
      prosocial: {
        value: "1.9 acts/ep",
        score: 60,
        note: "Not the format's goal; sketches skewer cruelty rather than modeling kindness.",
      },
      scariness: {
        value: "Gore jokes — plagues, surgeons, executioners",
        score: 60,
        note: "Gross-out history that delights most 9-year-olds and haunts some 7-year-olds.",
      },
      representation: {
        value: "Ensemble across eras · improving diversity",
        score: 74,
        note: "The reboot casts far more inclusively than the 2009 run.",
      },
      dialogue: {
        value: "142 words/min · dense historical vocabulary",
        score: 84,
        note: "The fastest speech in our sample, thick with period terms defined mid-joke.",
      },
      langCues: {
        value: "3.4 cues/min — definitions inside sketches",
        score: 72,
        note: "'That's a trebuchet — a giant catapult' — labeling survives the comedy.",
      },
      interactivity: {
        value: "Direct-address host segments",
        score: 76,
        note: "Rattus and historical hosts speak straight to camera between sketches.",
      },
      curriculum: {
        value: "UK Key Stage 2 history alignment",
        score: 92,
        note: "Topics track the primary history curriculum closely enough that teachers use clips in class.",
      },
    },
    overallNote:
      "The strongest retention trick on the list: attach facts to jokes and gore, and ten-year-olds recite Tudor history unprompted.",
  },
];

/* ---------------- Helpers ---------------- */

export function getShow(slug) {
  return SHOWS.find((s) => s.slug === slug);
}

export function showsByAgeGroup(ageGroupId) {
  return SHOWS.filter((s) => s.ageGroup === ageGroupId);
}

export function getAgeGroup(id) {
  return AGE_GROUPS.find((a) => a.id === id);
}

export function getCategory(id) {
  return CONTENT_CATEGORIES.find((c) => c.id === id);
}

export function metricsByGroup(groupId) {
  return METRICS.filter((m) => m.group === groupId);
}

/* Traffic-light score tiers. These colors are reserved for judgment —
   nothing decorative uses them, so green/amber/red always mean
   good/okay/poor wherever they appear. */
export function scoreTier(score) {
  if (score >= 80)
    return {
      id: "great",
      label: "Great",
      color: "var(--score-great)",
      tint: "var(--score-great-tint)",
    };
  if (score >= 60)
    return {
      id: "okay",
      label: "Okay",
      color: "var(--score-okay)",
      tint: "var(--score-okay-tint)",
    };
  return {
    id: "poor",
    label: "Poor",
    color: "var(--score-poor)",
    tint: "var(--score-poor-tint)",
  };
}

export function scoreColor(score) {
  return scoreTier(score).color;
}

/* Mean score for one metric family on one show — powers the
   at-a-glance strip on show pages. */
export function groupScore(show, groupId) {
  const ms = METRICS.filter((m) => m.group === groupId);
  return Math.round(
    ms.reduce((sum, m) => sum + show.metrics[m.id].score, 0) / ms.length
  );
}
