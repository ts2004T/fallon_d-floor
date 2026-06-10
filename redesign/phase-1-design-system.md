# Phase 1 — Design System Foundation & Navigation Migration

## Objective

Implement the foundational design system for StatPadder.

This phase establishes the visual language that every future page and component will inherit.

No dashboard redesign, analytics redesign, GOAT Audit redesign, or Live Match redesign should occur during this phase.

The purpose of Phase 1 is to create a consistent, scalable, production-ready design system for the entire application.

---

## Context

Read the following before making changes:

1. MASTER-REDESIGN-SPEC.md
2. redesign/styles.css
3. redesign/app.js
4. redesign/Home.html
5. redesign/All_Pages.html

The redesign folder is the source of truth.

The frontend folder contains the production application.

The goal is to migrate the approved design system into the frontend architecture while preserving all existing functionality.

---

## Scope

### Included

- Global color system
- Design tokens
- Typography system
- Navigation redesign
- Mobile navigation
- Theme switching
- Global spacing system
- Border radius system
- Shadow system
- Accessibility improvements
- Global UI consistency

### Excluded

Do NOT modify:

- Dashboard content
- KPI cards
- GOAT Audit page
- Analytics page
- Live Match page
- Data visualizations
- Backend logic
- API integrations
- State management
- Database functionality

Only establish the visual foundation.

---

## Typography System

### Approved Typography

Headings:

- Sora

Body:

- Inter

Metrics, scores, rankings, statistics:

- Space Grotesk

### Requirements

Remove:

- Architects Daughter
- Shantell Sans
- Gaegu

Create reusable typography tokens.

Typography should feel:

- Professional
- Analytical
- Modern
- Sports-data focused

The platform should resemble a football analytics product rather than a portfolio website.

---

## Color System

Implement the approved NYNÄ palette.

### Core Tokens

Honeydew
#F6FFEA

Soft Peach
#FFDE96

Coral Glow
#FA855A

Tomato Jam
#C93638

Sky Blue
#62C4DA

---

### Token Structure

Create reusable tokens for:

- backgrounds
- cards
- surfaces
- text
- borders
- accents
- positive states
- negative states
- chart colors
- hover states
- active states

Remove hardcoded colors wherever possible.

Replace inline color definitions with reusable tokens.

---

## Navigation Redesign

### Final Navigation

Dashboard

Live Match

GOAT Audit

Analytics

### Requirements

Implement:

- Responsive navigation
- Mobile navigation drawer
- Active route states
- Hover states
- Keyboard accessibility
- Theme toggle

Navigation should feel modern and professional.

Do not introduce new routes.

---

## Theme System

Maintain:

- Light mode
- Dark mode

Requirements:

- Consistent color mapping
- Consistent typography
- Consistent spacing
- Theme persistence

Remove any color combinations that reduce readability.

Accessibility takes priority over aesthetics.

---

## Design Tokens

Create a centralized design system.

Examples:

Typography

Colors

Spacing

Radii

Shadows

Transitions

Focus states

Avoid one-off styling values whenever possible.

---

## Accessibility

Improve:

- Color contrast
- Focus visibility
- Keyboard navigation
- Mobile usability
- Touch targets

Target WCAG AA compliance where practical.

---

## Mobile Experience

Implement:

- Responsive navigation drawer
- Responsive spacing
- Responsive typography
- Improved touch interactions

The application should function cleanly on:

- Mobile
- Tablet
- Desktop

---

## Expected Deliverables

Before implementation:

1. Identify all files that require modification.
2. Explain why each file must change.
3. Explain migration strategy.

After implementation:

1. List every modified file.
2. Explain all changes.
3. Explain how the design system works.
4. Explain how future phases will build upon this foundation.

---

## Success Criteria

When Phase 1 is complete:

- The application uses a unified design system.
- Typography is consistent.
- Colors are tokenized.
- Navigation is modernized.
- Mobile navigation works.
- Theme switching works.
- Accessibility is improved.
- Existing functionality remains unchanged.

A user should immediately perceive the application as a professional football analytics product.

No page-specific redesign work should occur during this phase.

Future phases will handle:

- Dashboard
- GOAT Audit
- Analytics
- Live Match
