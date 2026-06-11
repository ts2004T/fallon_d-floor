# Phase 5 — Match Intelligence Center

## Objective

Transform match data into football intelligence.

The purpose of this page is not to display scores.

The purpose of this page is to explain:

- What happened
- Why it happened
- Who influenced the result
- Which performances mattered most

This page should feel like an analyst's match report powered by StatPadder.

---

## Context

Read before implementation:

1. MASTER-REDESIGN-SPEC.md
2. phase-1-design-system.md
3. phase-2-dashboard.md
4. phase-3-goat-audit.md
5. phase-4-analytics.md

Build upon the approved design system.

Use real backend data only.

Do not fabricate match events.

---

## Scope

Focus only on:

- Match Intelligence page
- Match selection
- Match overview
- Match narratives
- Key performers
- Match impact analysis
- Statistical storytelling

Do not modify:

- Dashboard
- GOAT Audit
- Analytics
- Backend APIs
- Database schema

---

## Product Philosophy

This page should answer:

"What happened in this match?"

and

"Why did it happen?"

Avoid becoming a score-tracking application.

Focus on interpretation.

---

## Section 1 — Match Overview

Display:

- Match name
- Competition
- Date
- Score
- Match importance
- Round type

Provide immediate context.

---

## Section 2 — Match Intelligence Summary

Generate a concise narrative.

Examples:

- Defensive masterclass
- High-scoring shootout
- Clutch knockout performance
- Midfield dominance
- Underdog upset

Narratives should be derived from available statistics.

Do not fabricate events.

---

## Section 3 — Top Performers

Identify:

- Highest BGPI performer
- Most impactful attacker
- Most efficient finisher
- Highest uplift performer

Explain why they were influential.

---

## Section 4 — Match Impact Analysis

Display:

- Match importance score
- Player contribution impact
- BGPI contribution

Answer:

"Which performances changed the outcome?"

---

## Section 5 — Match Insights

Generate insight cards.

Examples:

- Highest BGPI in the match
- Largest xG overperformance
- Most efficient player
- Unexpected contributor

Insights should feel analytical.

Not decorative.

---

## Section 6 — Match Timeline Summary

Use available match information to create a structured match summary.

Requirements:

- Chronological presentation
- Key phases of the match
- Statistical context

Do not fabricate minute-by-minute events.

---

## Section 7 — Player Comparison

Allow comparison between notable performers from the selected match.

Compare:

- BGPI
- Goals
- Assists
- xG
- Match contribution

---

## Reusable Components

Create reusable components where appropriate.

Examples:

- MatchSelector
- MatchHero
- MatchNarrative
- PerformerCard
- ImpactPanel
- MatchInsights
- MatchComparison

Avoid duplicated logic.

---

## Mobile Experience

Ensure:

- Responsive layouts
- Responsive comparisons
- Responsive insight cards

No horizontal scrolling.

---

## Accessibility

Maintain:

- Keyboard navigation
- Proper heading hierarchy
- Accessible charts
- Accessible labels

---

## Deliverables

Before implementation:

1. List affected files.
2. Explain architecture.
3. Explain data flow.

After implementation:

1. List modified files.
2. Explain new components.
3. Explain narrative generation.
4. Explain insight generation.

---

## Success Criteria

When Phase 5 is complete:

- Users can explore matches.
- Users understand why results occurred.
- Users can identify key performers.
- Users can understand match importance.

The page should feel like a football intelligence product rather than a live-score application.

It should create a foundation for future Real-Time Match Intelligence in Phase 7.
