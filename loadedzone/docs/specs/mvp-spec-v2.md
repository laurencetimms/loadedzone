# LoadedZone — MVP Specification v2

## Domain: loadedzone.co.uk (also register loadedzone.com if available)

## One-line proposition
"What does the zone 2 research actually mean for your body? Find out — then walk out the door and do it."

## What LoadedZone is
A research-grounded, tool-first website that helps people achieve zone 2 cardiovascular training through loaded walking (rucking, weighted vests, weighted packs). The site translates exercise physiology research into personalised, actionable guidance — calculators, session plans, and evidence articles — then gets out of the way so the user can go for a walk.

Zone 2 is the lead concept (it's what people search for, what the podcasts talk about, what has the broadest demographic appeal). Loaded walking is the featured modality — the most accessible, equipment-light, outdoors-friendly way to achieve zone 2 training.

## Design Principles
1. **Research-first, not influencer-first.** Every claim cites a source. Every calculator shows its working.
2. **Simple by default, deep on demand.** Rachel gets a clear answer. Marcus gets the equation. A "show me the science" toggle bridges the two.
3. **The walk is the product, not the screen.** Anything that tries to keep people on their phone during the walk is wrong. Printable cards, watch-glanceable targets, session plans you memorise before you leave.
4. **No engagement tricks.** No streaks, no badges, no social feeds, no push notifications, no dark patterns. The site helps you, then gets out of the way.
5. **Warm but not patronising.** Janet is a retired physiotherapist. Kai is a doctor. Rachel is a deputy head. These are intelligent adults who happen to want clear guidance.
6. **Use what you've got.** The default assumption is that the user already owns a backpack and a pair of shoes. Premium gear is nice but never required.

## Exclusions
**We are NOT building for:**
- People who want social/competitive features (leaderboards, streaks, sharing)
- People who want military-style programming or tactical aesthetics
- Personal trainers who want to prescribe to clients (liability territory)
- People who want a general fitness tracking app that happens to include rucking
- The competitive endurance athlete who wants an ultramarathon ruck programme

---

## Personas (summary — full personas in separate document)

| Persona | Age | Entry Point | Tech | Pays? |
|---------|-----|-------------|------|-------|
| **Marcus** — The Optimiser | 44 | Zone 2 + Attia listener | Garmin + Android | Yes, immediately |
| **Rachel** — The Quiet Revolutionary | 51 | Perimenopause + bone density | Apple Watch + iPhone | Yes, after trust |
| **Dan** — The HIIT Refugee | 37 | Burnt out, needs aerobic base | Apple Watch Ultra + iPhone | Yes, if design is good |
| **Janet** — The Longevity Investor | 63 | Osteopenia + centenarian decathlon | Apple Watch + iPad | Yes, for programmes |
| **Kai** — The Curious Builder | 29 | Commute as zone 2 | Garmin + Samsung | No (free tier evangelist) |

**Key insight across all personas:** Every single one wants the same core thing — *"What does the research mean for ME, specifically?"* — but delivered at different levels of complexity, tone, and interface.

---

## MVP Feature Set

### TOOL 1: "Find Your Zone 2" — Personal Heart Rate Calculator

**What it does:**
Takes user inputs and calculates their personal zone 2 heart rate range using multiple methods, ranked by accuracy. Explains what zone 2 is and why it matters.

**Inputs:**
- Age (required)
- Resting heart rate (optional but encouraged, with clear "how to measure" instructions)
- Known max heart rate (optional — for users who've been tested)
- Sex (optional — enables Gulati formula for women: 206 − 0.88 × age)
- Fitness self-assessment: sedentary / lightly active / moderately active / very active (used to estimate RHR if not provided)

**Outputs:**
- Zone 2 range in BPM via:
  1. **Karvonen method** (if RHR provided) — flagged as "most accurate without lab testing"
  2. **Percentage of max HR** (60-70%) using Tanaka formula (208 − 0.7 × age) — flagged as "good estimate"
  3. **Maffetone/MAF method** (180 − age ± adjustments) — included because Attia listeners look for it
- Plain-English summary: "Your zone 2 is roughly X to Y bpm. You should be able to hold a conversation but feel like you're working. If you can sing, you're too easy. If you can only manage a few words, you're too hard."
- The talk test as a fallback for people without HR monitors
- "Show me the science" expandable section: each formula, its origin, limitations, and links to original research

**Persona check:** ✅ All five served at appropriate depth levels.

---

### TOOL 2: "Load Up" — The Reverse Zone 2 Calculator ★ FLAGSHIP

**What it does:**
The inverse of every other calculator. Instead of "what zone am I in?", this answers: **"What should I carry, and how fast should I walk, to BE in zone 2?"**

This tool does not exist anywhere else. It is the entire bet.

**Inputs:**
- Body weight (kg/lbs toggle)
- Zone 2 HR range (auto-populated from Tool 1, or manually entered)
- Available walk duration (e.g., 30 min, 45 min, 60 min)
- Terrain type: pavement / gravel trail / grass / mixed
- Estimated gradient: flat / gentle hills / moderate hills
- Current fitness level (affects load-to-HR relationship estimation)

**Calculation engine:**
Simplified Pandolf equation to estimate metabolic cost at different load/speed combinations, mapped to approximate heart rate using the %VO2max-to-%HRR relationship. The site must be explicit that this is an *estimate* and a starting point, not a lab result.

**Outputs:**
- Recommended starting load (kg) and pace (km/h or min/km)
- Adjustment guidance: "Start with Xkg at Y pace. If HR is below zone 2 after 10 minutes, increase pace first, then add 2kg next session."
- Visual: a simple curve showing load/pace combinations that target zone 2 for this person
- Terrain adjustment notes: "On gravel trail, expect ~15% higher HR at the same load/pace"
- Safety note: recommended max load as % of body weight, with progression guidance
- "Show me the science" section: Pandolf equation explained, relationship between metabolic cost and HR, limitations, links to Army research papers

**Persona check:** ✅ All five served. Marcus adjusts the curve. Rachel gets a clear starting point. Janet gets conservative guidance. Kai gets his commute answered.

---

### TOOL 3: "Session Card" — Printable + Emailable Walk Plan

**What it does:**
Takes output from Tools 1 and 2 and generates a clean, two-page session card.

**Page 1 — The Walk Plan:**
- Target HR range (large, readable at a glance)
- Recommended load and pace
- Duration
- Check-in reminders at intervals: "At 10 min: check HR. Above X? Slow down slightly. Below Y? Pick up the pace or add a hill."
- Date field
- Space for handwritten notes (weather, how it felt, actual HR)

**Page 2 — Standard Guidance:**
- The talk test: how to use it, what it means
- How to check your heart rate manually (wrist method, neck method, 15-second count × 4)
- How to check HR on common watches (Apple Watch, Garmin — brief, visual)
- Posture reminders for loaded walking (shoulders back, core engaged, pack high and tight)
- When to stop: warning signs (dizziness, sharp joint pain, chest tightness)
- Hydration reminder

**Format options:**
- Print-friendly web page (no header/footer/nav)
- PDF download
- **"Email me this card"** — user enters email, receives the PDF immediately, email address is not stored. Privacy statement: "We send your card and immediately discard your email address. We don't add you to any list. We don't keep it." Implementation: serverless function → email API → done. No database.
- "Watch card" — super-minimal version: HR range, load, pace, duration only. Designed to be screenshot-friendly for a watch face or taped to a water bottle.

**Persona check:**
- Rachel: ✅✅✅ Prints one every Sunday. This IS the product for her.
- Janet: ✅✅✅ Prints, writes notes, keeps them in a folder. Shows Page 2 to her walking group.
- Marcus: Uses occasionally. Appreciates the email option for forwarding to his Garmin watch face.
- Dan: Screenshots the watch card.
- Kai: Photos it on his phone. Memorises the numbers after a week.

---

### CONTENT 1: "The Research, Decoded" — Evidence Hub

A curated library of long-form reference articles. NOT a blog. Not news. Not opinion. Each article earns its place by serving at least two personas and being the kind of thing someone bookmarks, prints, or sends to a friend.

**MVP articles (10):**

| # | Title | Serves |
|---|-------|--------|
| 1 | **Zone 2: What It Is, Why It Matters, and How to Find Yours** | All five |
| 2 | **Why Loaded Walking Is the Most Accessible Zone 2 Training** | All five (esp. Rachel, Dan) |
| 3 | **Bone Density, Menopause, and Loaded Walking: What the Evidence Says** | Rachel, Janet |
| 4 | **How to Set Up Your Watch for Zone 2 Walking** (Garmin, Apple Watch, Polar, Whoop — step-by-step with screenshots) | Marcus, Dan, Kai, Janet |
| 5 | **The Pandolf Equation: How Military Research Helps You Walk Smarter** | Marcus, Kai |
| 6 | **A 12-Week Zone 2 Loaded Walking Plan** (progressive overload, 3x/week, with a 2x/week "minimal dose" variant) | All five (esp. Rachel, Dan, Janet) |
| 7 | **Short Sessions Count: The Evidence for Zone 2 Under 30 Minutes** | Kai, Dan |
| 8 | **Zone 2 and Strength Training: How They Work Together** | Marcus, Dan, Kai |
| 9 | **Heart Rate Variability: Understanding When to Ease Off** (what HRV is, what a dip means, how to use morning HRV to decide whether today is a load day or a recovery day) | Marcus, Dan, Kai |
| 10 | **Walking With Friends: The Perfect Zone 2 Hack** (the talk test as social activity, the mental health evidence for walking + conversation, why chatting with a friend is literally the best way to ensure you stay in zone 2) | Rachel, Janet, Dan |

**Content format:**
- Clean, generous white space, readable on any device
- Every factual claim hyperlinked to source (PubMed, named expert, research paper)
- "Key takeaway" box at top for scanners
- "What this means for you" personalisation hooks throughout
- "Show me the science" expandable sections for deeper detail
- No publication dates that age the content — reference articles, updated as needed
- Printable versions available

---

### CONTENT 2: "Quick Guides" — Practical Reference Pages

Short (400-800 words), zero-fluff reference pages. One question, one answer.

**MVP set (6):**

| # | Guide | Notes |
|---|-------|-------|
| 1 | **Get Started for Zero Cost** | Use any rucksack. Load with books, bags of garden soil/compost (double-bagged), water bottles, sand. Explains weight distribution. Honest about limits: regular rucksack seams will wear under repeated heavy loads. Mentions footwear (use what you've got, but here's what to think about). The ethos of the whole site in one page. |
| 2 | **Choosing a Heart Rate Monitor** | Chest strap vs wrist-based, accuracy differences, what matters for zone 2 specifically. Affiliate links (Polar H10, Garmin HRM-Pro, budget options). |
| 3 | **Weighted Vest vs Rucksack vs Backpack** | Pros/cons, weight distribution, comfort, when each makes sense. Affiliate links. |
| 4 | **Starting Weight Guide by Body Weight** | Simple reference table. Conservative starting points. Progression guidance. |
| 5 | **The Talk Test: Zone 2 Without Any Tech** | For Rachel, Janet, and anyone without a HR monitor. The simplest, most evidence-backed method. |
| 6 | **Footwear for Loaded Walking** | Trainers vs walking boots vs trail shoes. Socks matter (material, fit, moisture wicking). Blister avoidance (lacing, sock choice, breaking in). Blister care (what to do when it happens). Core message: use what you've already got, but if you're buying, here's what to look for. **No affiliate links at MVP** — earn trust first. Shoe affiliates on the backlog. |

---

## Site Architecture

```
loadedzone.co.uk
│
├── / ................................................ Home
│   (proposition, quick links to three tools, latest articles)
│
├── /find-your-zone .................................. Tool 1: HR Calculator
├── /load-up ......................................... Tool 2: Reverse Zone 2 Calculator ★
├── /session-card .................................... Tool 3: Printable/Emailable Card
│
├── /learn/ .......................................... Evidence Hub
│   ├── /learn/zone-2-explained
│   ├── /learn/loaded-walking-zone-2
│   ├── /learn/bone-density-loaded-walking
│   ├── /learn/watch-setup-guide
│   ├── /learn/pandolf-equation
│   ├── /learn/12-week-plan
│   ├── /learn/short-sessions
│   ├── /learn/zone-2-and-strength
│   ├── /learn/heart-rate-variability
│   └── /learn/walking-with-friends
│
├── /guides/ ......................................... Quick Guides
│   ├── /guides/get-started-free
│   ├── /guides/heart-rate-monitors
│   ├── /guides/vest-vs-rucksack
│   ├── /guides/starting-weight
│   ├── /guides/talk-test
│   └── /guides/footwear
│
└── /about ........................................... Who made this, why, philosophy
```

---

## Revenue Model

### Immediate (month 1):
- Affiliate links in gear guides (Amazon Associates UK, Polar, Garmin). Present only where genuinely helpful, never forced.
- Estimated: negligible until traffic builds, but infrastructure is there from day one.

### Near-term (months 3-6, if traffic validates):
- Premium downloadable programmes (PDF or web): detailed 12-week personalised plans, seasonal variants. One-time purchase, £9-15.

### Medium-term (months 6-12, if retention validates):
- Subscription tier (£3-5/month): session logging, adaptation tracking (HR drift over time), progression recommendations, full programme library.
- Android companion app.

### What we explicitly do NOT monetise:
- The three core calculators — always free, no paywall, no "enter email to see results"
- The evidence articles — always free, never gated
- The session cards — always free, including the email feature
- The quick guides — always free

The free tier IS the product. It earns trust, drives traffic, demonstrates competence. Premium serves people who want ongoing structure and tracking — a different need from "tell me my zone 2 range."

---

## Tech Stack

### Framework: Astro (Static Site Generator)
- Fast, lightweight, zero JS by default — perfect for content pages and SEO
- "Islands" architecture: interactive React/Svelte components hydrate only where needed (calculators)
- Excellent build performance, strong SSG ecosystem
- Well-supported by Claude Code

### Calculators: Client-side TypeScript + React (Astro islands)
- All calculation in the browser — no server round-trip, works offline, no backend costs
- Pandolf equation, Karvonen formula, reverse zone 2 logic as pure TypeScript functions
- React components for the interactive UI
- Chart library (e.g., Recharts or Chart.js) for the load/pace visualisation in Tool 2

### Session Card PDF: jsPDF or @react-pdf/renderer
- Client-side PDF generation
- Two-page layout: Walk Plan + Standard Guidance

### Email feature: Serverless function
- Cloudflare Worker or Vercel Edge Function
- Receives: generated PDF data + email address
- Sends via: Resend or Postmark (generous free tiers)
- Then: discards the email address. No database. No storage. No list.
- Privacy statement displayed at point of email entry

### Hosting: Cloudflare Pages
- Free tier handles significant traffic
- Global CDN
- Built-in Workers for the email serverless function
- Custom domain support
- Analytics via Cloudflare Web Analytics (privacy-respecting, no cookie banner needed)
- Alternative: Vercel (similar economics)

### Analytics: Plausible or Cloudflare Web Analytics
- Privacy-respecting, no cookie banner needed
- Track: calculator usage, PDF downloads, print-view loads, email sends, article time-on-page

### Repository: GitHub
- Public or private repo, your call
- CLAUDE.md in root with project conventions, design principles, persona summaries
- Claude Code auto-memory builds project knowledge over sessions

### Development tool: Claude Code
**Primary development workflow:**
1. Write feature spec (inputs, outputs, persona check, edge cases)
2. Open Claude Code in project directory
3. Prompt with spec reference: "Implement the Karvonen calculator as an Astro island. See /docs/specs/tool-1-find-your-zone.md"
4. Claude Code reads spec, implements, creates tests
5. Review, adjust, iterate
6. Claude Code commits and pushes

**Claude Code project setup:**
- `CLAUDE.md` in repo root containing:
  - Project description and proposition
  - Design principles (all 6)
  - Persona summaries (one paragraph each)
  - Tech stack conventions (Astro, TypeScript, React islands, Tailwind)
  - Code style preferences
  - Exclusion notes (what we're NOT building)
- `/docs/specs/` directory with individual feature specs
- `/docs/personas/` with the full persona document
- Claude Code skills files for recurring patterns (calculator component structure, article template, guide template)

**Claude Code strengths for this project:**
- Multi-file edits across Astro pages, components, and styles
- Implementing mathematical formulas as TypeScript functions with tests
- Generating responsive UI components
- Writing and running tests for calculator accuracy
- Git workflow (branches, commits, PRs)
- Later: parallel agents for building multiple calculators simultaneously

---

## MVP Success Metrics (first 90 days)

1. **Calculator usage:** 500+ unique uses/month by month 3
2. **Session card engagement:** PDF downloads + print-view loads + email sends
3. **Article depth:** Time on page > 3 minutes for evidence articles
4. **Return visits:** Any signal within 30 days
5. **Affiliate clicks:** Even small signals validate the revenue path
6. **Search Console gaps:** What are people searching for that we don't cover yet?

---

## Backlog (NOT in MVP, ordered by likely priority)

### Near backlog (build if MVP metrics validate):
- User accounts and session logging (subscription feature)
- Heart rate drift tracking and adaptation curves over time
- "Commute calculator" — Kai's use case: distance + time + elevation → recommended load
- Interactive load/pace/HR visualisation (explorable version of the Tool 2 curve)
- Shoe/boot affiliate links in footwear guide (after trust is established)
- Email newsletter (only if content genuinely warrants it)

### Medium backlog:
- Android companion app (session tracking, smartwatch HR integration, progressive overload suggestions)
- API integration with Garmin Connect / Apple Health / Strava
- Seasonal programme variants (autumn/winter with daylight and weather adjustments)
- SkiErg and rowing zone 2 content (broadening beyond walking)

### Far backlog (partnership and platform plays):
- **Komoot integration:** "We're in Carlisle for 3 days — find me a walk that hits my zone 2 needs"
- **Walk generation from open map data:** Suggest a walk "near me" using OpenStreetMap elevation data that matches the user's zone 2 target from the calculator. Factor in distance, gradient profile, terrain type, and estimated duration.
- **Garmin Connect IQ widget:** A LoadedZone watch face or data field
- Podcast (only if genuine demand — not a vanity project)

---

## Build Sequence (suggested)

### Phase 1: Foundation + Flagship Tool
1. Repo setup (GitHub, Astro project, CLAUDE.md, Cloudflare Pages deployment)
2. Site skeleton: home page, navigation, base layout, typography, colour system
3. **Tool 2: "Load Up" reverse calculator** — the flagship, build this first
4. Tool 1: "Find Your Zone 2" HR calculator (simpler, and feeds into Tool 2)
5. Tool 3: Session Card generator (PDF + print + email)
6. /about page

### Phase 2: Content
7. Quick Guide: "Get Started for Zero Cost"
8. Quick Guide: "The Talk Test"
9. Article: "Zone 2: What It Is, Why It Matters"
10. Article: "Why Loaded Walking Is the Most Accessible Zone 2 Training"
11. Remaining quick guides and articles in priority order

### Phase 3: Polish + Revenue
12. Affiliate links wired into relevant guides
13. SEO review: meta tags, structured data, Open Graph
14. Performance audit (Core Web Vitals)
15. Remaining evidence articles
16. Submit to Google Search Console, monitor indexing

---

## Appendix: Naming Decision

**Chosen name: LoadedZone**

Rationale:
- Double meaning: physically loaded (weighted) + heart rate zone. Both meanings are immediately clear in context.
- Distinctive and memorable. Sounds like a product, not a blog.
- Not gendered, not military, not intimidating.
- Works as a brand if the site expands to other zone 2 modalities (loaded cycling, loaded rowing).
- Clean in major European languages: no slang faux pas in French (zone chargée), German (beladen), or Spanish (zona cargada).
- English slang associations ("loaded" = wealthy, drunk) are not problematic in context — a fitness site with "zone" attached is unambiguous.

Rejected alternatives:
- **LoadedZone2** — the "2" looks like a version number or sequel. Confusing when spoken aloud.
- **ZoneWalk** — loses the "loaded" concept. Could be about any walking.
- **WalkLoaded** — slightly aggressive as a command.
- **TheLoadedWalk** — too editorial/blog. Doesn't sound like a tools site.
- **ZoneLoad** — sounds like a software or logistics term.

Domain targets: loadedzone.co.uk (primary), loadedzone.com (if available, redirect to .co.uk).
