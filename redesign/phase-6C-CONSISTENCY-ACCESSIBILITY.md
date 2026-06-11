# Phase 6C — Consistency & Accessibility

## Objective

Improve consistency, accessibility, and maintainability across the application.

This phase should not introduce new features.

This phase should not redesign existing pages.

Focus on improving the quality of the existing implementation.

---

## Context

Read before implementation:

1. MASTER-REDESIGN-SPEC.md
2. Phase 1–6B specifications
3. Application audit report

Build on the approved design system.

---

## Scope

Fix only consistency and accessibility issues.

Do not begin Phase 6D.

Do not begin Phase 7.

---

## Fix 1 — Shared Responsive Breakpoints

Current issue:

Different components use different breakpoint values.

Examples:

* 880px
* 820px
* 720px
* 640px
* 600px
* 480px

Requirements:

* Define shared breakpoint tokens.
* Reuse them throughout the application.
* Improve consistency across layouts.

Do not alter intended layouts.

The goal is consistency, not redesign.

---

## Fix 2 — Accessibility Improvements

Review:

* GOAT Audit
* Analytics
* Match Intelligence
* Dashboard

Requirements:

* Improve ARIA labeling.
* Improve screen-reader support.
* Improve keyboard accessibility.
* Improve focus visibility.

Priority areas:

* Ranking indicators
* BGPI explanations
* Comparison controls
* Charts and visualizations

Avoid accessibility regressions.

---

## Fix 3 — KPI Empty States

Current issue:

KPI grids can leave visual gaps when data is unavailable.

Requirements:

* Handle missing data gracefully.
* Preserve layout integrity.
* Avoid broken grid structures.

Provide meaningful placeholders where appropriate.

---

## Fix 4 — Dashboard Empty States

Review:

* PlayerHighlight
* Trending Insights
* Other dashboard widgets

Requirements:

* Avoid silent failures.
* Display informative empty states.
* Preserve layout consistency.

Users should understand why content is unavailable.

---

## Fix 5 — Data Fetch Consistency

Current issue:

Dashboard performs multiple leaderboard fetches.

Requirements:

* Reduce duplication where practical.
* Preserve existing behavior.
* Improve maintainability.

Do not introduce unnecessary complexity.

Favor simple architecture.

---

## Fix 6 — Design System Consistency

Review:

* Match Intelligence
* GOAT Audit
* Analytics

Requirements:

* Consistent spacing
* Consistent card behavior
* Consistent typography usage
* Consistent interaction patterns

Do not redesign pages.

Focus only on consistency.

---

## Deliverables

Before implementation:

1. List affected files.
2. Explain accessibility improvements.
3. Explain consistency improvements.
4. Explain data-flow changes.

After implementation:

1. List modified files.
2. Explain accessibility improvements.
3. Explain consistency improvements.
4. Explain maintainability improvements.
5. Identify remaining polish opportunities.

---

## Success Criteria

When complete:

* Responsive behavior is consistent.
* Accessibility is improved.
* Empty states are reliable.
* Dashboard data flow is cleaner.
* Design system usage is more consistent.

The application should feel cohesive and mature.
