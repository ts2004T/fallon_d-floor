# FINAL APPROVED DESIGN DECISIONS

This section supersedes any conflicting recommendations elsewhere in this document.

## Project Identity

StatPadder is a football analytics platform.

The final product should feel like:

- StatsBomb
- FBref
- Wyscout
- Hudl
- Opta

and NOT like:

- a portfolio website
- a football fan page
- a social media application
- an Instagram-inspired dashboard

The goal is:

**Professional football analytics platform with personality.**

---

## Typography System (Final)

Previous typography recommendations are overridden.

Use:

### Headings

Sora

Purpose:

- Page titles
- Section headers
- Hero headings
- Card headings

### Body Text

Inter

Purpose:

- Navigation
- Paragraphs
- Labels
- Forms
- Buttons
- Tables
- General UI

### Metrics & Analytics

Space Grotesk

Purpose:

- Scores
- BGPI ratings
- Rankings
- Statistics
- KPI cards
- Charts
- Tables
- Numerical data

Do not use:

- Architects Daughter
- Shantell Sans
- Gaegu

The application should feel analytical, modern, and recruiter-ready.

---

## Brand Personality

Preserve the StatPadder personality.

Keep:

- GOAT Audit
- football humor
- playful insights
- memorable labels
- lighthearted copywriting

Examples:

- "The maths behind the jokes."
- "Can your favorite player do it on a rainy Tuesday?"
- "Certified clutch."

However:

Humor should support the analytics experience, not dominate it.

Analytics must remain the primary focus.

---

## Navigation Structure

Final navigation:

- Dashboard
- Live Match
- GOAT Audit
- Analytics

Do not add:

- About
- Portfolio
- Personal branding pages

Leaderboard functionality should be integrated into Dashboard and GOAT Audit.

---

## Design Philosophy

The redesign folder is the source of truth.

Priority order:

1. MASTER-REDESIGN-SPEC.md
2. redesign/styles.css
3. redesign/Home.html
4. redesign/Live Match.html
5. redesign/GOAT Audit.html
6. redesign/Analytics.html
7. redesign/All_Pages.html

If conflicts occur, follow the highest-priority source.

---

## Frontend Migration Rules

The redesign folder contains design references.

The frontend folder contains production code.

The objective is NOT to copy HTML files directly.

The objective is to:

- Extract the design system
- Extract reusable patterns
- Convert them into reusable React/Next.js components
- Preserve existing functionality
- Preserve API integrations
- Preserve backend integrations

Avoid duplicating markup.

Favor reusable components.

---

## Implementation Workflow

Implementation must occur in phases.

After each phase:

1. Show modified files.
2. Explain changes.
3. Verify functionality.
4. Wait for approval before continuing.

Do not implement multiple phases simultaneously.

---

## Success Criteria

The finished product should immediately communicate:

"This is a serious football analytics platform built by someone who understands sports data products."

The finished product should be suitable for:

- internship applications
- sports analytics portfolios
- data analyst portfolios
- football technology showcases
- recruiter review

All design decisions should support this outcome.

---

# StatPadder — UI/UX Audit & Redesign Plan

_Prepared 2026-06-10 · No code has been modified yet — this is the plan for approval._

---

## 0. What was analyzed

| Source                    | Contents                                                                                                                                                           | Role                                                                                                                                             |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `statpadder (1).zip`      | `fallon/` (5 HTML pages + `styles.css` + `app.js`), `StatPadder Wireframes.html`, `Fallon d'Floor – Standalone.html`, `tweaks-panel.jsx`, `shots/` (5 screenshots) | The codebase. Note: it is a **static HTML prototype suite**, not a framework app. `fallon/styles.css` (217 lines) is the de-facto design system. |
| `fallon-dfloor-site.pptx` | 10 slides, each a full-page screenshot of the Fallon d'Floor prototype (Home, Live Match, GOAT Audit, Analytics)                                                   | Visual design reference — the layout/quality bar to hit.                                                                                         |
| `All Pages.html`          | Single-file build with hash router (#home/#live/#goat/#analytics), theme toggle, all four pages                                                                    | Desired layout & UX direction.                                                                                                                   |
| Palette image (NYNÄ)      | Honeydew `#F6FFEA`, Soft Peach `#FFDE96`, Coral Glow `#FA855A`, Tomato Jam `#C93638`, Sky Blue `#62C4DA`                                                           | The new design system colors — replaces the current pink/lavender scheme.                                                                        |

Key finding up front: the reference materials are all in the **pink/lavender "Fallon d'Floor" brand**, while the palette mandates a **warm retro sunset scheme**. The redesign = keep the Fallon layout, structure, and personality; re-token the entire color system to the NYNÄ palette; resolve the StatPadder-vs-Fallon brand and IA inconsistencies.

---

## 1. UI Audit

**Token system is good but constantly bypassed.** `styles.css` defines a clean CSS-variable system (`--pink`, `--lav`, `--radius`, shadows, 4 font vars, light+dark themes), but the HTML pages hardcode dozens of raw hex gradients inline (`#FF6FB5`, `#D9A5FF`, `#8FB7FF`, `#7EE7C0`, `#FFB07E`…) for avatars, crests, banners, chart fills, and SVG strokes. A palette swap via tokens alone will miss ~40% of color usage. All inline hexes must be migrated to tokens.

**Inline styles dominate the markup.** Nearly every card, row, and number carries `style="..."` attributes (sizes, gaps, fonts, colors), including hardcoded `rgb(...)` text colors that won't adapt to dark mode (e.g. footer text `rgb(62,58,68)`). These need to become utility classes/components.

**Two competing visual languages.** The wireframes use Gaegu + Space Mono, paper-dot background, wobbly 2px sketch borders; the prototype uses Architects Daughter + Shantell Sans + Space Grotesk with soft pink glow shadows. The shipped product should commit to one (the prototype language, re-colored).

**Font inconsistency inside the prototype itself.** `--font-display` is set to Architects Daughter, yet pages re-declare `font-family: "Architects Daughter"` and `"Shantell Sans"` inline per-element, sometimes overriding the variables they should rely on. The merged build even overrides `body` to Architects Daughter — a handwriting font — for _all_ body text.

**Broken render.** `shots/home.png` shows an empty page below the nav — the hash-router/reveal interplay can leave a page blank (router toggles `.current` while `.reveal` animation-delay re-staggers). Needs a fix in the rebuild.

**Other issues:** emoji used as functional icons (⚽🟨🅰️ in the event feed, 🌙 theme toggle) render inconsistently across OSes; micro-typography drops to 10–12.5px in charts/chips (below comfortable minimums); radii are mostly tokenized but `11px/12px/16px` one-offs appear inline; the `.glows` fixed backdrop hardcodes pink/lavender rgba values; `--maxw:1180px` is fine but section spacing is ad-hoc inline padding.

**Accessibility.** Pink `#FF6FB5` on white fails WCAG AA for text (≈2.6:1) yet is used for the signature BGPI numbers; same risk transfers to Coral Glow `#FA855A` (≈2.5:1 on white) and Sky Blue `#62C4DA` (≈2.1:1) — the new palette **requires** deep variants for any text usage (Tomato Jam passes at ≈5.4:1). Live badge relies on color alone; charts have no text alternatives; focus states are unstyled.

---

## 2. UX Audit

**Information architecture is inconsistent across artifacts.** Wireframes: Dashboard · Live Match · GOAT Audit · Leaderboard · About. Prototype: Home · Live Match · GOAT Audit · Analytics (no Leaderboard, no About; screenshots show an About link that goes nowhere). Decision needed — recommended IA: **Dashboard · Live Match · GOAT Audit · Analytics**, with the leaderboard folded into Dashboard (wireframe Direction A proved it works as the hero) and About demoted to footer.

**No mobile navigation.** `.navlinks` is simply `display:none` under 880px with no hamburger/sheet replacement — all pages become unreachable on mobile.

**Strong points to preserve:** the bento dashboard with one tap-through per module ("Tap to see what happened →", "View why →", "Learn more →") creates a coherent hub-and-spoke flow; the Live Match "What just happened" explainer card is the product's best idea (translates a stat change into a sentence); GOAT Audit verdict chips (Certified clutch / Jury still out / Stat-merchant alert) give instant scannability; theme toggle persists correctly.

**Gaps:** no loading/empty/error states anywhere (everything assumes live data exists); analytics charts are static SVG with no tooltips, no time-range or competition filters, no player switcher (the xG chart is hardcoded to Bellingham); GOAT Audit shows only 4 players with no search/sort/compare; hash router scrolls to top on every navigation but keeps no scroll memory; the live event feed has no "new event" affordance despite an "Auto-updating" chip; footer "Built with" chips (Python · SQL · Power BI) appear on every page but link nowhere.

---

## 3. Component Inventory (current, from `fallon/styles.css` + pages)

**Layout & chrome:** `.wrap` (1180px container) · `.nav`/`.nav-in`/`.brand`/`.navlinks`/`.icon-btn` (sticky blurred nav) · `.footer`/`.footer-in` · `.glows` (fixed radial backdrop) · `.section`/`.section-head` · `.page` router views.

**Surfaces:** `.card` (+`.pad`, `.hoverable`) · `.pcard` (GOAT player card: `.banner`, `.rankchip`, `.pav`, `.pbody`, `.topline`, `.status`, `.verdict`) · `.ministat` tiles · `.stile` stat tiles · gradient explainer cards (inline).

**Actions:** `.btn` (default, `.primary` pink-gradient, `.lav`, `.sm`) · `.linkmore` arrow links · theme toggle button.

**Indicators:** `.chip` (default/`pink`/`lav`/`mint`/`coral`) · `.live` pulsing badge · `.eyebrow` section labels · `.kicker` hero pill · `.up`/`.down` delta arrows · `.bgpi` signature number.

**Identity:** `.av` gradient monogram avatars (a1–a6) · `.badge-crest` team crests · ball logo SVG.

**Data display:** `.rrow` ranking rows · `.scoreline`/`.scorecard` match scores · event feed (`.ev`, `.min`, `.ic` goal/card/assist variants) · `.factbig` trending fact.

**Charts (hand-rolled):** `.bars`/`.bartrack`/`.bar` histogram · `.hbar-row/track/fill` horizontal bars · inline SVG scatter, line, and area/momentum charts (`.axis`, `.grid-l`, `.alab`) · `.poss` possession bar · `.heat` 12×7 heatmap (JS-generated) · `.legend`/`.dotk` · `.statgrid`.

**Utility:** `.num`/`.mono`/`.display`/`.muted`/`.faint` text helpers · `.reveal` stagger animation · `tweaks-panel.jsx` (React tweaks shell — dev tool, keep out of production bundle).

Missing components the redesign needs: mobile nav drawer, tooltip, tabs/filter pills, search input, table (leaderboard), skeleton/empty state, toast ("BGPI updated" appears in wireframes but has no component).

---

## 4. Typography Recommendations

Keep the three-tier system, fix the roles, and stop overriding it inline:

| Role            | Token                        | Face                    | Usage rules                                                                                                                     |
| --------------- | ---------------------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Display         | `--font-display`             | **Architects Daughter** | H1/H2 + card "status" one-liners only, ≥21px, never for body or UI labels. It's the brand voice — ration it.                    |
| Body & UI       | `--font-body`                | **Shantell Sans**       | 15–16px body, 500–600 weights for labels/buttons. Remove the merged build's `body{font-family:"Architects Daughter"}` override. |
| Numerals & code | `--font-num` / `--font-logo` | **Space Grotesk**       | All BGPI numbers, scores, deltas, axis labels, chips with values; keep `tabular-nums`. Also the wordmark.                       |

Scale (replace ad-hoc inline sizes): 12 / 13.5 / 15 / 16 / 18 / 21 / 25 / 30 / clamp hero (40→78). Floors: never below 12px; chart axis labels move from 10px → 12px. Eyebrows stay Space Grotesk-style uppercase but at 12.5px+ with `.06em` tracking. Line heights: display 1.02–1.1, body 1.45–1.5. If a calmer look is ever wanted, the drop-in swap is Space Grotesk for display and a humanist sans for body — but the reference materials clearly want the handwritten personality, so the recommendation is keep-and-discipline, not replace.

---

## 5. Color Mapping Recommendations

New token set built from the NYNÄ palette (old token → new value):

| Token                               | Old                   | New                                                                                                  | Notes                                                                                                                                      |
| ----------------------------------- | --------------------- | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `--bg`                              | `#F8F5F7`             | **Honeydew `#F6FFEA`**                                                                               | Page background; soft green-white replaces pink-white.                                                                                     |
| `--bg-2`                            | `#F1ECF2`             | `#ECF6DF` (honeydew-2, derived)                                                                      | Hover fills, chip bg, bar tracks.                                                                                                          |
| `--card`                            | `#FFFFFF`             | `#FFFFFF`                                                                                            | Cards stay white for contrast against honeydew.                                                                                            |
| `--card-2`                          | `#FBF7FB`             | `#FCFFF6`                                                                                            | Tinted card surface.                                                                                                                       |
| `--accent` (was `--pink`)           | `#FF6FB5`             | **Coral Glow `#FA855A`**                                                                             | Primary accent: BGPI fills, primary buttons, active nav, chart series A, logo pip.                                                         |
| `--accent-deep` (was `--pink-deep`) | `#E8459A`             | **Tomato Jam `#C93638`**                                                                             | Text-safe accent (5.4:1 on white): BGPI numerals, links, emphasis spans.                                                                   |
| `--accent-soft` (was `--pink-soft`) | `#FFE6F2`             | `#FEEAE1` (coral-soft)                                                                               | Chips, goal icons, active-nav bg, gradient card washes.                                                                                    |
| `--alt` (was `--lav`)               | `#D9A5FF`             | **Sky Blue `#62C4DA`**                                                                               | Secondary series, assist accents, "lav" buttons/chips.                                                                                     |
| `--alt-deep` (was `--lav-deep`)     | `#A05BD8`             | `#1F7D93` (sky-deep, derived)                                                                        | Text-safe sky variant.                                                                                                                     |
| `--alt-soft` (was `--lav-soft`)     | `#F3E8FF`             | `#E4F5F9` (sky-soft)                                                                                 | Soft fills.                                                                                                                                |
| `--gold` (new, from Soft Peach)     | —                     | **Soft Peach `#FFDE96`**                                                                             | Highlight surfaces: trending-fact card, rank chips, yellow-card icon, heatmap mid-tones, "Player of the day". Deep text variant `#8A6210`. |
| `--positive` (was `--mint`)         | `#7EE787` / `#279D57` | `#3FA968` soft `#E6F4E9`                                                                             | Palette has no green; keep a desaturated green tuned to honeydew for ▲ deltas / "Certified clutch" — color-blind-safer than blue-for-good. |
| `--negative` (was `--coral`)        | `#FF7070` / `#E24E4E` | **Tomato Jam `#C93638`** soft `#F9E3E3`                                                              | ▼ deltas, stat-merchant alert, live badge. Tomato = "danger/judgment", Coral = "brand energy" — distinct jobs.                             |
| Shadows/glow                        | pink rgba             | `rgba(201,54,56,.22)` & `rgba(250,133,90,.40)`                                                       | Re-tint `--shadow-card`, `--shadow-pop`, `--glow-pink`→`--glow-accent`.                                                                    |
| `.glows` backdrop                   | pink+lav radials      | Coral `rgba(250,133,90,.35)` + Sky `rgba(98,196,218,.30)`                                            | Sunset-over-sky mood matching the palette poster.                                                                                          |
| Dark theme                          | `#0F0A14` plum        | `#171A12` deep olive-charcoal; cards `#20241A`; accents brightened (`#FFA07E`, `#7ED4E8`, `#E8625F`) | Maintain the warm character in dark mode.                                                                                                  |

Gradient recipes (replace all inline hexes): avatars/crests rotate through coral→peach, sky→honeydew, tomato→coral, peach→sky; primary button `linear-gradient(135deg,#FA855A,#FFB088)`; hbar fill `90deg, #62C4DA → #FA855A`; histogram bars coral→peach; momentum area coral fade; heatmap opacity ramp on Coral Glow with Tomato hotspots; possession bar coral vs sky.

Hard rule: Coral Glow, Sky Blue, and Soft Peach are **fill/large-number colors only** — any text under ~24px uses the deep variants (Tomato Jam, sky-deep, peach-deep).

---

## 6. Dashboard (Home) Redesign Recommendations

Keep the prototype's hero + bento structure, upgraded with the wireframes' best ideas:

1. **Hero** — kicker pill, the "rainy Tuesday" H1 with `.pop` span in Coral Glow (large enough to pass contrast), sub, two CTAs (primary = coral gradient, secondary = outlined). Honeydew bg with coral/sky glow backdrop.
2. **Bento grid** (2×2 + tall right column, as today) re-mapped: Live-now card (crests in coral/sky gradients, score in Space Grotesk, live badge in tomato); **GOAT scoreboard card promoted** per wireframe Direction A — add ▲/▼ delta column next to BGPI (the prototype dropped it; the wireframe rightly keeps "live movement" visible); Player of the Day card on Soft Peach wash with "+18 today" chip; Trending Fact card with the stat highlighted in Tomato Jam.
3. **Add the toast** from the wireframes ("✨ BGPI updated — Bellingham +18, 90+2' winner") as a dismissible top-right notification — it sells the "live index" concept on arrival.
4. **Mobile:** bento collapses to single column (already specced) + new hamburger→sheet nav; CTAs full-width.
5. **States:** skeleton shimmer for the live card when no match is on, swapping to "Next match in…"; this is the only page that must degrade gracefully when nothing is live.
6. Rename nav "Home" → **Dashboard** (matches wireframes and product mental model), fold Leaderboard into the GOAT scoreboard card's "View full leaderboard →".

## 7. Analytics Page Redesign Recommendations

Keep the page's structure (head → BGPI explainer → 2-col chart grid → full-width momentum → match analytics) and fix substance:

1. **Pagehead:** keep "The maths behind the jokes." Replace the tech-stack chips (Python/SQL/Power BI — portfolio noise for end-users) with **filter controls**: season/competition select + player picker, so every chart answers to the same filters. Move stack chips to the footer/About.
2. **KPI strip** (new, above the grid): 4 `.stile` tiles — players audited, mean BGPI, biggest riser, biggest stat-merchant gap — Space Grotesk numerals in Tomato Jam.
3. **Chart recolor:** series A coral, series B sky blue, danger annotations tomato ("stat merchants" zone gets a tomato-soft wash rather than red text floating in space), peach for reference/secondary bars, grid lines from `--line`. One legend component reused everywhere.
4. **Chart upgrades:** raise axis type to 12px; add hover tooltips (title + value) via a tiny shared JS helper on the existing SVGs — no chart library needed at this scale; give the scatter quadrant labels ("clutch", "stat merchants") as styled pills; xG chart gets the player picker (currently hardcoded Bellingham); momentum chart annotates goals with peach markers + minute labels.
5. **Match analytics block:** possession bar coral-vs-sky; heatmap becomes Coral Glow opacity ramp (deterministic data, not `Math.random()` — current code generates different "facts" each load, which undercuts a "fact-checked" brand); keep the stat tile grid.
6. **Accessibility:** every SVG gets `role="img"` + `aria-label` summarizing the takeaway; add a visually-hidden data table for the Top-10 bar chart.

---

## Proposed implementation order (after your sign-off)

1. Re-token `styles.css` (new palette, both themes, shadows, glows) — single source of truth.
2. Sweep all inline hexes/rgb() in the four pages onto tokens/utility classes; fix dark-mode leaks.
3. Typography discipline pass (remove inline font overrides, apply scale, fix merged-build body font).
4. Nav: rename Dashboard, add mobile sheet; fix the blank-page router bug.
5. Dashboard upgrades (deltas on GOAT card, toast, states).
6. Analytics upgrades (filters, KPI strip, tooltips, deterministic heatmap, recolor).
7. Verify: contrast checks on every text/accent pair, light+dark screenshots of all four pages.

**Open questions before I write code:** (a) Dashboard vs Home naming — go with Dashboard? (b) Keep handwritten display font or switch to a cleaner face? (c) Should the standalone single-file build remain the deliverable, or the split `fallon/` pages?
