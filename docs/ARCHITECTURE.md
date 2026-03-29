# AI-Native News Experience — Architecture

## 1) System Goal
Deliver a personalized intelligence layer on top of business news where each user gets:
- profile-adapted ranking,
- explainable “why this ranked for you”,
- evidence-backed summary and takeaways,
- user-specific “why this matters”,
- contextual article Q&A,
- a related coverage arc instead of an isolated article card.

## 2) Product Shape
The prototype is now framed as a decision briefing engine rather than a static personalized feed.

Flow:
1. Understand who the user is.
2. Rank stories against that profile.
3. Group stories into decision lenses.
4. Generate evidence-backed briefings progressively.
5. Let the user drill into a full brief or ask contextual follow-ups.

## 3) Agent-Based Design
The system is intentionally structured as a simple presentation-oriented multi-agent pipeline:

1. **News Fetch Agent** (`src/agents/newsFetchAgent.ts`)
   - Pulls article objects from a mock ET-like dataset.
   - In production this would ingest ET APIs, RSS, or editorial systems.

2. **Personalization Agent** (`src/agents/personalizationAgent.ts`)
   - Scores every article against the user profile.
   - Produces ranking reasons, a priority label, and a decision lens.
   - Makes personalization visible instead of hidden.

3. **Insight Generator Agent** (`src/agents/insightGeneratorAgent.ts`)
   - Produces the summary, takeaways, why-it-matters copy, opportunity, follow-up prompts, and related coverage arc.
   - Computes deterministic signal strength instead of a fake random confidence score.
   - Supports optional LLM mode with deterministic fallback.

4. **Visualization Agent** (`src/agents/visualizationAgent.ts`)
   - Derives sentiment, impact level, and trend indicators.
   - Keeps the UI language consistent for badges and directional cues.

## 4) UI Layers
- **Screen 1**: Profile onboarding (`src/components/ProfileOnboarding.tsx`)
- **Screen 2**: Decision-lens feed with explainable cards (`src/components/NewsCard.tsx`)
- **Screen 3**: Full interactive briefing (`src/components/BriefingView.tsx`)

## 5) Data Flow
1. User submits a profile.
2. Profile is loaded from or stored in local storage.
3. News Fetch Agent returns articles.
4. Personalization Agent ranks them and groups them into decision lenses.
5. Feed renders immediately with ranking rationale.
6. Insight Generator progressively fills cards with deeper briefings.
7. User opens a full briefing or asks a follow-up question.

## 6) Trust And Explainability Choices
- Random confidence was removed.
- Signal strength is now deterministic and backed by visible drivers like recency, impact, evidence depth, and continued coverage.
- Story arc is now based on related coverage items rather than invented timeline events.
- Source URLs and evidence points are shown directly in the interface.

## 7) Error Handling Strategy
- LLM failures auto-fallback to deterministic generation.
- Invalid profile cache is auto-cleared and re-onboarded.
- Missing article during Q&A gracefully returns a user-safe fallback.
- Feed ranking and UI still work even if insight generation is delayed.

## 8) Prototype-to-Production Upgrade Path
- Replace mock feed with live ET article ingestion.
- Add retrieval and citation-level grounding.
- Move LLM orchestration server-side.
- Track ranking quality, prompt usage, and user satisfaction metrics.
- Add real story clustering so coverage arcs are generated dynamically.
