# LoadedZone — Project Context

## What this is
A research-grounded, tool-first website helping people achieve zone 2 cardiovascular training through loaded walking. We translate exercise physiology research into personalised, actionable guidance — calculators, session plans, and evidence articles — then get out of the way so the user can go for a walk.

Zone 2 is the lead concept. Loaded walking (rucking, weighted vests) is the featured modality.

## Design Principles
1. **Research-first.** Every claim cites a source. Every calculator shows its working.
2. **Simple by default, deep on demand.** Clear answers up front. "Show me the science" toggle for depth.
3. **The walk is the product, not the screen.** Printable cards, watch-glanceable targets. No engagement tricks.
4. **No dark patterns.** No streaks, badges, social feeds, push notifications, gamification.
5. **Warm but not patronising.** Our users are intelligent adults (teachers, doctors, physiotherapists, engineers). Write for them.
6. **Use what you've got.** Never assume the user needs to buy something. Any rucksack and any shoes work to start.

## Personas (brief)
- **Marcus, 44** — Garmin-wearing optimiser, ex-CrossFit, Attia listener. Wants the equations and data.
- **Rachel, 51** — Deputy head, perimenopausal, new to fitness. Wants clear, jargon-free guidance. Prints session cards.
- **Dan, 37** — Burnt-out HIIT refugee. Wants zone 2 to feel like legitimate training. Design-conscious.
- **Janet, 63** — Retired NHS physio, osteopenia. Wants safety, citations, conservative progression. Uses iPad.
- **Kai, 29** — Junior doctor, lifter. Wants to turn his commute into zone 2. Reads primary research. Free tier evangelist.

## We are NOT building for
- Social/competitive features (leaderboards, sharing)
- Military-style programming or aesthetic
- Personal trainers prescribing to clients
- General fitness tracking

## Tech Stack
- **Framework:** Astro (SSG) with React islands for interactive components
- **Styling:** Tailwind CSS v4 via @tailwindcss/vite
- **Calculators:** Client-side TypeScript + React. All computation in the browser. No server round-trips.
- **Hosting target:** Cloudflare Pages
- **Analytics:** Privacy-respecting only (Plausible or Cloudflare Web Analytics)

## Code Conventions
- TypeScript strict mode throughout
- Calculator logic as pure functions in `/src/lib/` with unit tests
- React components in `/src/components/` — interactive islands only, not full SPA
- Astro pages in `/src/pages/` — content pages are Astro, tool pages use React islands
- CSS: Tailwind utility classes. Custom CSS only for component-specific animation or layout.
- Accessibility: semantic HTML, ARIA labels on interactive elements, keyboard navigable
- Units: metric by default (kg, km/h) with imperial toggle (lbs, mph)
- Mobile-first responsive design

## Key Files
- `/src/lib/calculators.ts` — Pure calculation functions (Karvonen, Pandolf, zone mapping)
- `/src/components/LoadUpCalculator.tsx` — Flagship reverse zone 2 calculator
- `/src/components/FindYourZone.tsx` — Heart rate zone calculator
- `/src/components/SessionCard.tsx` — Printable session card generator
- `/src/layouts/BaseLayout.astro` — Site-wide layout
- `/docs/specs/` — Feature specifications
- `/docs/personas/` — Full persona documents
