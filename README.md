# LoadedZone

**Zone 2 training through loaded walking. Research translated to personal action.**

LoadedZone is a research-grounded, tool-first website that helps people achieve zone 2 cardiovascular training through loaded walking (rucking, weighted vests, weighted packs). It translates exercise physiology research into personalised, actionable guidance.

## What's here

- **Three interactive calculators** (React islands in Astro)
  - **Load Up** — the flagship reverse zone 2 calculator. "What should I carry and how fast should I walk to BE in zone 2?" Uses the Pandolf equation.
  - **Find Your Zone 2** — personal heart rate zone calculator using Karvonen, Tanaka/Gulati, and Maffetone methods.
  - **Session Card** — printable two-page walk plan with email-and-forget delivery.
- **Evidence articles** — research translated into plain language with citations
- **Quick guides** — short, practical reference pages

## Tech stack

- [Astro](https://astro.build/) — static site generator
- React — interactive calculator components (Astro islands)
- Tailwind CSS v4 — styling
- TypeScript — strict mode throughout
- Pure calculation functions in `src/lib/calculators.ts`

## Getting started

```bash
npm install
npm run dev      # Development server
npm run build    # Production build
npm run preview  # Preview production build
```

## Project structure

```
src/
├── components/          # React interactive components
│   ├── LoadUpCalculator.tsx
│   ├── FindYourZoneCalculator.tsx
│   └── SessionCardGenerator.tsx
├── layouts/
│   └── BaseLayout.astro
├── lib/
│   └── calculators.ts   # Pure calculation functions (Pandolf, Karvonen, etc.)
├── pages/
│   ├── index.astro
│   ├── load-up.astro
│   ├── find-your-zone.astro
│   ├── session-card.astro
│   ├── about.astro
│   ├── learn/
│   └── guides/
└── styles/
    └── global.css
docs/
├── specs/               # Product specifications
└── personas/            # User personas
CLAUDE.md                # Context file for Claude Code sessions
```

## Design principles

1. **Research-first.** Every claim cites a source. Every calculator shows its working.
2. **Simple by default, deep on demand.** "Show me the science" toggle bridges novice and expert.
3. **The walk is the product, not the screen.** Printable cards, watch-glanceable targets. No engagement tricks.
4. **No dark patterns.** No streaks, badges, social feeds, or push notifications.
5. **Use what you've got.** Any rucksack and any shoes work to start.

## Deployment

Target: Cloudflare Pages. The site is fully static (SSG) with no server-side rendering required. The session card email feature requires a Cloudflare Worker or similar serverless function.

## Licence

UNLICENSED — Private project.
