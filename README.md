# Mental Trening 🧠

A mobile-first web app that teaches **beginner mental training to young athletes** (ages ~12–19), in **English and Norwegian**.

Everything in the app — the lessons and the AI coach — is grounded in **peer-reviewed sport psychology** (meta-analyses and systematic reviews from PubMed and similar databases). Every citation was independently fact-checked against the journal's own records before being included.

## What's inside

- **8 short lessons**, each with an interactive exercise:
  1. What is mental training? → mental skills check-in
  2. Goals that actually work → goal ladder worksheet
  3. Calm under pressure → guided breathing timer
  4. Talk to yourself like a coach → self-talk reframe builder
  5. See it before you do it → guided imagery rep
  6. Focus on the next play → one-minute focus exercise
  7. Pre-performance routines → routine builder
  8. Confidence you can build → evidence bank
- **Ask the coach** — a Claude-powered chatbot whose system prompt is built from the same verified evidence library as the lessons, with youth-safety guardrails (no diagnoses; escalates to trusted adults for wellbeing concerns).
- **Science page** — the full evidence library with links, PMIDs and DOIs so anyone can check the sources.
- **EN/NO language toggle**, progress tracking, and all personal data (goals, journals, chat history) stored **only on the device** (localStorage). No accounts, no tracking.

## Design

- Primary color: **white** · Secondary color: **turquoise**
- Mobile-first with bottom navigation; works fine on desktop too.

## Running it

```bash
npm install
cp .env.example .env.local   # add your ANTHROPIC_API_KEY for the chatbot
npm run dev
```

Open http://localhost:3000. The app works without an API key — the chat page will just show a "coach not connected" notice until `ANTHROPIC_API_KEY` is set.

## Tech

- Next.js (App Router) + TypeScript + Tailwind CSS 4
- `@anthropic-ai/sdk` (Claude, streaming) for the coach
- No database — v1 is deliberately account-free; a Supabase project is the plan for future accounts/sync

## A note on scope

This app teaches performance skills. It is **not** medical advice or therapy, and the coach is instructed to say so and to point young athletes toward parents, coaches, school nurses or doctors when something bigger than performance is going on.
