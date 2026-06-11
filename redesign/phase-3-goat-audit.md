# Phase 3 — GOAT Audit Migration

## Objective

Transform GOAT Audit into the flagship feature of StatPadder.

This page should answer:

"How good is this player really?"

The experience should combine:

- Football analytics
- Statistical evidence
- Ranking systems
- Personality

The page should feel unique to StatPadder.

Users should remember GOAT Audit after leaving the site.

---

## Context

Read before implementation:

1. MASTER-REDESIGN-SPEC.md
2. phase-1-design-system.md
3. phase-2-dashboard.md
4. redesign/GOAT_Audit.html

Build upon the approved design system.

Do not redesign typography, navigation, theme system, or color system.

---

## Scope

Focus only on:

- GOAT Audit page
- Ranking cards
- BGPI presentation
- Player comparison layouts
- Search experience
- Filtering experience
- Verdict system

Do not modify:

- Dashboard
- Analytics page
- Live Match page
- Backend APIs
- Database schema

---

## Product Goals

A user should be able to:

- Search a player
- View their ranking
- Understand their BGPI score
- Compare players
- Understand strengths and weaknesses
- Explore leaderboard movement

The page should feel like a football intelligence product.

---

## Ranking System

Present rankings clearly.

Include:

- Current rank
- Previous rank
- Rank movement
- BGPI score

Use visual indicators:

▲ Rising

▼ Falling

▬ Unchanged

Movement should be immediately visible.

---

## BGPI Presentation

BGPI should be treated as a premium metric.

Requirements:

- Clear visual emphasis
- Easy explanation
- Confidence-inspiring presentation

Users should understand:

"What is BGPI?"

without needing documentation.

Include:

- Metric explanation
- Calculation summary
- Interpretation guidance

---

## Player Cards

Create premium player cards.

Include:

- Name
- Club
- Position
- BGPI
- Ranking
- Key strengths
- Recent form

Cards should feel analytical.

Avoid generic profile cards.

---

## Search Experience

Improve player discovery.

Requirements:

- Fast search
- Clear results
- Keyboard accessibility
- Mobile usability

Search should feel like a professional analytics tool.

---

## Filters

Support filtering by:

- Position
- Club
- League
- Minimum matches
- Season

Design filters for analysts, not casual browsing.

---

## Comparison Experience

Implement comparison layouts.

Examples:

Player A vs Player B

Requirements:

- Side-by-side presentation
- Ranking comparison
- BGPI comparison
- Strength comparison
- Weakness comparison

The experience should encourage exploration.

---

## Verdict System

Preserve StatPadder personality.

Examples:

- Certified Clutch
- Big Match Monster
- Flat Track Bully
- Underrated Gem

Verdicts should be:

- Data-backed
- Memorable
- Entertaining

Humor should support analytics.

Not replace analytics.

---

## Reusable Components

Create reusable components where appropriate.

Examples:

- PlayerCard
- BGPIMeter
- RankingCard
- VerdictBadge
- ComparisonPanel
- SearchBar
- FilterPanel

Avoid duplicated markup.

---

## Mobile Experience

Ensure:

- Responsive rankings
- Responsive comparisons
- Responsive search
- Responsive filters

No horizontal scrolling.

No hidden functionality.

---

## Accessibility

Maintain:

- Keyboard navigation
- Proper headings
- Color contrast
- Screen-reader compatibility

---

## Deliverables

Before implementation:

1. List affected files.
2. Explain component architecture.
3. Explain migration strategy.

After implementation:

1. List modified files.
2. Explain new components.
3. Explain GOAT Audit architecture.
4. Identify future opportunities.

---

## Success Criteria

When Phase 3 is complete:

- GOAT Audit feels like a unique product.
- BGPI feels like a meaningful metric.
- Rankings are easy to understand.
- Comparisons are engaging.
- Users can quickly evaluate players.

A recruiter should immediately recognize GOAT Audit as a differentiating feature rather than another leaderboard page.
