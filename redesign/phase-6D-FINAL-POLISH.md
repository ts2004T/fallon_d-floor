# Phase 6D — Final Polish & Accessibility Refinement

## Objective

Complete the final round of accessibility, consistency, and cleanup work.

This phase is intentionally small.

Do not introduce new features.

Do not redesign existing pages.

Do not perform architectural refactors.

Focus only on polishing the remaining issues identified during the post-6C audit.

---

## Context

Read before implementation:

1. MASTER-REDESIGN-SPEC.md
2. Phase 1–6C specifications
3. Latest application audit report

Build upon the approved design system.

---

## Scope

Fix only the remaining polish items.

Do not begin Phase 7.

---

## Fix 1 — GOAT Audit Live Result Announcements

Current issue:

Filtering and searching update results visually but do not announce changes to screen-reader users.

Requirements:

* Add an aria-live="polite" region.
* Announce result counts after filtering.
* Announce when no players match current filters.

Examples:

* "17 players found."
* "No players match current filters."

Announcements should be concise.

---

## Fix 2 — XGAnalysis Accessibility Parity

Current issue:

XGAnalysis is the only analytics visualization missing a hidden data table.

Requirements:

Match the accessibility pattern used by:

* BGPIDistribution
* PerformanceComparison
* ImpactPanel

Include:

* Hidden data table
* Meaningful labels
* Screen-reader compatibility

Maintain existing chart behavior.

---

## Fix 3 — Directional Indicator Consistency

Current issue:

Some positive/negative indicators still use local color-only styling.

Requirements:

Adopt the global semantic pattern:

* .up
* .down

Apply where appropriate:

* XGAnalysis
* GOAT Audit xG over-performance indicators

Ensure all directional values receive:

* Consistent styling
* Consistent accessibility treatment
* Directional glyph support

---

## Fix 4 — BGPIMeter Accessibility

Current issue:

Comparison marker relies on title attributes.

Requirements:

Add proper accessibility support.

Examples:

* aria-label
* descriptive assistive text

The comparison marker should communicate its meaning without relying on hover.

---

## Fix 5 — Shared Visually Hidden Utility

Current issue:

Multiple duplicate .srOnly implementations exist.

Requirements:

* Consolidate to one shared pattern.
* Remove duplicated implementations.
* Preserve behavior.

Avoid introducing breaking changes.

---

## Fix 6 — Token Cleanup

Current issue:

A small number of fixed colors remain.

Examples:

* #fff
* #23212a
* rgba(255,255,255,.85)

Requirements:

Review remaining non-token colors.

Where appropriate:

* Replace with semantic design tokens.
* Introduce minimal token additions if needed.

Do not redesign visual appearance.

---

## Fix 7 — Contrast Verification

Review:

* RankingBadge
* PlayerCard gradients
* Theme variations

Requirements:

Verify contrast remains acceptable.

Only modify styling if a genuine issue exists.

Avoid unnecessary visual changes.

---

## Deliverables

Before implementation:

1. List affected files.
2. Explain accessibility improvements.
3. Explain cleanup work.
4. Identify any potential visual impact.

After implementation:

1. List modified files.
2. Explain each accessibility improvement.
3. Explain cleanup work completed.
4. Explain any token additions.
5. Confirm whether contrast changes were required.

---

## Success Criteria

When complete:

* Accessibility patterns are consistent.
* Charts share a common accessibility approach.
* Directional indicators are unified.
* Duplicate utilities are removed.
* Remaining raw colors are documented or tokenized.
* No visible regressions are introduced.

This phase should conclude the Phase 6 polish effort.
