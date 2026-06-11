# Analytical Memo — Fallon d'Floor™ BGPI

**To:** Football Scouting & Recruitment  
**From:** Tanishka Suryawanshi, Data Analyst  
**Date:** June 2026  
**Re:** Big Game Player Index — Methodology, Findings & Limitations

---

## Executive Summary

The Big Game Player Index (BGPI) is a composite 0–100 metric that weights
player performance by match context. Analysis of 119,752 player-match records
across 4,235 matches confirms that genuine big-game performers are statistically
rare — only 2.7% of players (101 of 3,775) show meaningfully higher performance
in high-stakes matches than in regular fixtures. The metric reliably identifies
this cohort and is statistically validated at p < 0.001.

---

## Methodology

BGPI combines four components weighted by match importance:

| Component                               | Weight        |
| --------------------------------------- | ------------- |
| Goals (normalised within season)        | 30%           |
| Assists                                 | 20%           |
| xG Efficiency (actual ÷ expected goals) | 20%           |
| Match Winning Impact                    | 20%           |
| Penalty miss / Red card deductions      | −15 / −20 pts |

The composite score is multiplied by a Match Importance Score (5.0 for group
stages → 10.0 for finals) and min-max normalised to 0–100 across all records.

**Data source:** StatsBomb open event data — 4,235 matches, 11,889 unique
players, covering UEFA Champions League, domestic leagues, and women's
football competitions.

---

## Key Findings

**Finding 1 — Big game BGPI is statistically different from regular BGPI**

Mann-Whitney U test confirms the distributions are statistically different
(p < 0.001). Big game mean BGPI: 17.98 vs regular mean BGPI: 5.74. The
difference is not due to chance.

**Finding 2 — Weak but significant correlation with match importance**

Pearson r = 0.1087 (p < 0.001) between match importance score and BGPI.
The correlation is intentionally weak — a strong correlation would mean BGPI
is merely restating match importance rather than measuring player performance
independently. The weak-but-significant result validates the metric's design.

**Finding 3 — Big game performers are genuinely rare**

Only 101 of 3,775 players (2.7%) show positive big-game uplift. The top
performers by uplift — Rakitić (+87.9), Anderson Luís de Souza (+87.8),
Origi (+85.8) — are players historically associated with decisive moments
in high-stakes matches. The metric surfaces them correctly.

**Finding 4 — Confidence interval width reveals sample reliability**

Bootstrap analysis (1,000 resamples) shows that high-BGPI players fall into
two categories: high-confidence specialists (Rakitić, 208 matches, tight CI)
and high-variance specialists (Origi, 17 matches, wide CI). Both are valid
findings but should not be interpreted identically.

**Finding 5 — Women's football included on equal analytical terms**

The dataset includes women's competitions with identical event-level detail.
Vivianne Miedema (61 goals, 76 matches, 49.80 xG) ranks in elite company on
raw output metrics — a finding absent from most football analytics projects
that default to men's competitions only.

---

## Sensitivity Analysis

BGPI rankings were tested under three alternative weighting schemes:

| Scheme        | Goals | Assists | xG Eff | MWI |
| ------------- | ----- | ------- | ------ | --- |
| Original      | 30%   | 20%     | 20%    | 20% |
| Goals Heavy   | 50%   | 15%     | 15%    | 20% |
| Balanced      | 25%   | 25%     | 25%    | 25% |
| Assists Heavy | 20%   | 45%     | 15%    | 20% |

**Result:** The top 5 rankings are stable across all schemes (Alenichev,
Carlos, Van Dijk, Inzaghi, Drogba). Positions 6–15 shift significantly
under assists-heavy weighting — players like Rakitić and Gündoğan drop,
while creative midfielders rise. This confirms the top tier is robust
but mid-table rankings are assumption-dependent.

---

## Limitations

**1. Coverage gap — metadata vs events**  
StatsBomb's open dataset provided complete match metadata (teams, dates,
round types) for only 18 UCL matches. The remaining 4,217 matches were
reconstructed from event files with limited metadata. Round types for
these matches default to "Unknown" and are excluded from big-game analysis.

**2. Historical data quality**  
Early seasons (1970s) have limited player tracking. xG models were not
retroactively applied consistently. Historical BGPI scores should be
treated as indicative rather than precise.

**3. Small sample specialists**  
Players with fewer than 10 big-game appearances have wide confidence
intervals. Origi's 94.12 BGPI is statistically real but based on
2 UCL final appearances — context a recruiter should consider.

**4. No defensive metrics**  
BGPI currently measures only attacking contribution. A defender who
makes a match-winning tackle in a final receives no credit. This is
a known gap planned for a future version.

---

## Recommendation

For scouting purposes, filter to players with:

- Big game BGPI > 50
- Minimum 5 big-game appearances
- Uplift > 20 (meaningfully better in high-stakes matches)

This cohort currently contains **23 players** in the dataset — a
shortlist worth examining for clubs targeting performers who raise
their game when it matters most.

---

_Data provided by StatsBomb. Analysis by Tanishka Suryawanshi._  
_Full methodology, code, and validation at github.com/ts2004T/fallon-dfloor_
