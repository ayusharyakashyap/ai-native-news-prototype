# AI-Native News Experience (Problem Statement 8)

A fast prototype for ET Hackathon 2026 that turns static business news into a personalized decision briefing engine.

## What this prototype includes
- Profile-based onboarding for role, goals, interests, risk, pace, and time horizon
- Explainable feed ranking with visible “Why this ranked for you” reasons
- Decision-lens sections instead of a flat feed
- Rich briefing cards for each story:
  - personalized summary
  - evidence pulled from the source story
  - 2-3 concrete takeaways
  - why this matters to the specific user
  - deterministic signal strength instead of random confidence
  - suggested follow-up prompts for contextual Q&A
- Interactive detailed briefing:
  - decision brief + what to watch next
  - related coverage arc built from surrounding stories
  - signal-strength explanation
  - source evidence and key entities
- Presentation-oriented agent modules:
  - News Fetch Agent
  - Personalization Agent
  - Insight Generator Agent
  - Visualization Agent

## Product framing
This is not a “better article card” prototype.

The product direction is: turn ET-style business coverage into a set of actionable, profile-aware decision briefs. An investor sees portfolio and macro implications. A founder sees buyer and operating signals. A student sees explainable context and interview-ready takeaways.

## Tech stack
- React + TypeScript + Vite
- Local state + localStorage persistence
- Optional OpenAI API integration via browser call for prototype mode only

## Quick start
```bash
npm install
npm run dev
```

## Optional LLM setup
If you want live LLM generation instead of deterministic fallback, create `.env`:

```bash
VITE_OPENAI_API_KEY=your_key_here
```

Without this key, the app still works fully in fallback mode.

Important: browser-side API usage is included only for hackathon speed. A production version should move LLM orchestration, retrieval, and source citation handling server-side.

## Quality checks
```bash
npm run lint
npm run build
```

## Project structure
- `src/agents/` - personalization, briefing, and visual signal logic
- `src/components/` - onboarding, feed cards, and detailed briefing UI
- `src/data/` - mock ET-like news set with evidence and related coverage
- `src/utils/storage.ts` - profile persistence
- `docs/ARCHITECTURE.md` - architecture write-up
- `docs/IMPACT_MODEL.md` - quantified impact assumptions
- `docs/PITCH_FLOW.md` - ready 3-minute demo narrative


## Notes
This is still a prototype optimized for speed and demo clarity. For production, replace the mock feed with live ET APIs, attach citation-level retrieval, add server-side orchestration, and measure recommendation quality with feedback loops.
