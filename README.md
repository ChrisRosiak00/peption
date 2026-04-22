# Peption

**Your peptide journey, powered by knowledge.**

An educational community platform for peptide protocols: research, tracking, community support, and an AI peptide expert — all in one place.

## Product scope

- **Home dashboard** — greeting, current protocol, daily check-in, progress overview, featured education, AI prompt card.
- **Explore / Peptide library** — searchable, filterable catalog with tier-gated entries (Free / Pro / Expert).
- **Peptide detail** — Overview / Benefits / Mechanism / Research tabs, with citations.
- **AI Assistant** — peptide-expert chat with suggestion pills, comparison tables, message history scaffolding.
- **Tracking** — progress (weight, body composition, energy/appetite sparklines), shots/dose log, lab metrics, progress photos.
- **Community** — feed, groups, Q&A, stories.
- **Profile** — stats, current protocol, tools (Protocol Planner, Shot Tracker, Side Effect Tracker, Lab Results, Reminders), badges.
- **Settings** — account, notifications, privacy, preferences.
- **Pricing** — Starter / Pro / Expert membership tiers with FAQ.
- **Auth** — marketing-grade login and signup pages (social + email/password).

## Stack

- **Next.js 16** (App Router, Turbopack)
- **React 19**
- **TypeScript**
- **Tailwind CSS v4** (with a custom design-token `@theme`)
- **Recharts** for trend visuals
- **Lucide** icons
- **Inter** + **Sora** display fonts via `next/font/google`

## Design system

Design tokens live in `src/app/globals.css` (`@theme inline`):

- **Brand scale** — violet primary (`brand-*`)
- **Accents** — mint (success/trends), blush (attention), amber, sky
- **Ink scale** — neutral surface / text
- **Gradients** — `gradient-brand`, `gradient-brand-soft`, `gradient-mesh`
- **Radii** — soft 14/20/28/36 px
- **Shadows** — tuned for violet glow

Reusable primitives live in `src/components/ui/*` (Button, Card, Input, Avatar, Progress). Layout primitives in `src/components/layout/*`.

## Development

```bash
npm install
npm run dev   # http://localhost:3000
npm run build
npm start
```

## Supabase (plug in later)

The app is scaffolded with mock data in `src/lib/data/*`. When connecting Supabase:

- swap the modules in `src/lib/data/` for Supabase queries
- add a `src/lib/supabase/` client (server + browser)
- secure routes via Supabase Auth in `src/app/auth/*`

## Deployment

Configured for Netlify with `@netlify/plugin-nextjs`. See `netlify.toml`.
