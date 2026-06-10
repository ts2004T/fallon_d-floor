# Phase 2 — Dashboard Migration & Product Experience

## Objective

Transform the Dashboard into a professional football analytics homepage.

The Dashboard is the first page users see and should immediately communicate:

"This is a serious football analytics platform."

The dashboard should balance:

- Professional analytics
- Football personality
- Data storytelling
- Clear navigation

The Dashboard should feel inspired by:

- StatsBomb
- FBref
- Wyscout
- Hudl

while preserving the unique StatPadder identity.

---

## Context

Read before implementation:

1. MASTER-REDESIGN-SPEC.md
2. phase-1-design-system.md
3. redesign/Home.html
4. redesign/All_Pages.html

Phase 1 design decisions must remain intact.

Do not overwrite the design system.

Build on top of it.

---

## Scope

### Included

Dashboard only.

Focus on:

- Hero section
- KPI cards
- Dashboard layout
- Dashboard information hierarchy
- GOAT leaderboard preview
- Live Match preview
- Player of the Day
- Trending Insights
- Dashboard navigation flow

### Excluded

Do NOT modify:

- GOAT Audit page
- Analytics page
- Live Match page
- Backend logic
- APIs
- Database functionality

---

## Dashboard Goals

The Dashboard should answer:

1. What is happening right now?
2. Which players are trending?
3. Who is rising in GOAT rankings?
4. What match insights matter?
5. Where should the user go next?

Users should understand the product within 10 seconds.

---

## Hero Section

Implement a high-quality hero section.

Include:

- Product identity
- Short explanation
- Primary action
- Secondary action

Preserve:

- Football personality
- StatPadder voice

Examples:

- Can your favorite player do it on a rainy Tuesday?
- Football analytics without the nonsense.
- The maths behind the jokes.

The hero should feel memorable.

---

## KPI Cards

Implement professional KPI cards.

Examples:

- Players Audited
- Average BGPI
- Biggest Riser
- Most Clutch Player
- Most Improved

Requirements:

- Space Grotesk for metrics
- Consistent sizing
- Clear hierarchy
- Strong visual contrast

Metrics should be immediately scannable.

---

## GOAT Leaderboard Preview

The Dashboard should contain a preview of GOAT Audit.

Requirements:

- Top players
- BGPI score
- Ranking movement
- Quick access to full GOAT Audit

Show:

- ▲ movement
- ▼ movement
- New entrants

The preview should create curiosity.

---

## Live Match Preview

Implement a Live Match summary card.

Requirements:

- Current score
- Match status
- Key event
- Quick navigation to Live Match page

If no live match exists:

Show an upcoming fixture state.

Do not show empty cards.

---

## Player of the Day

Implement a featured player card.

Include:

- Name
- Club
- Key statistic
- BGPI movement
- Brief insight

The card should feel editorial.

Not just another statistic.

---

## Trending Insights

Implement a dashboard insight section.

Examples:

- Highest xG overperformance
- Most clutch performance
- Unexpected ranking change
- Statistical anomaly

The goal is to create curiosity.

Users should want to explore deeper analytics.

---

## Information Architecture

Dashboard order:

1. Hero
2. KPI Cards
3. Live Match Preview
4. GOAT Leaderboard Preview
5. Player of the Day
6. Trending Insights

The Dashboard should tell a story.

Avoid random card placement.

---

## Component Requirements

Create reusable components where appropriate.

Examples:

- KPICard
- DashboardHero
- LeaderboardPreview
- PlayerHighlight
- InsightCard
- LiveMatchPreview

Avoid duplicated markup.

Favor reusable architecture.

---

## Accessibility

Ensure:

- Keyboard navigation
- Proper heading hierarchy
- Screen-reader support
- Color contrast compliance

Accessibility must remain intact.

---

## Mobile Experience

Dashboard must remain fully usable on:

- Mobile
- Tablet
- Desktop

The dashboard should collapse gracefully.

No horizontal scrolling.

No hidden content.

---

## Expected Deliverables

Before implementation:

1. Identify affected files.
2. Explain component architecture.
3. Explain migration strategy.

After implementation:

1. List modified files.
2. Explain component changes.
3. Explain new reusable components.
4. Explain remaining dashboard improvements.

---

## Success Criteria

When Phase 2 is complete:

- Dashboard feels professional.
- Dashboard feels football-focused.
- Dashboard feels data-driven.
- Dashboard encourages exploration.
- Dashboard communicates the value of StatPadder immediately.

The Dashboard should be strong enough that a recruiter immediately understands the product's purpose.
