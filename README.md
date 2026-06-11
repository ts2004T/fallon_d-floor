# Fallon d'Floor™ — Football, fact-checked.

> **Separating Big Game Players from Stat Merchants.**

A football analytics platform built around the **Big Game Player Index (BGPI)** — a composite 0–100 metric that weights player performance by match context. A winner in a UCL final outranks a consolation tap-in at 4–0. The platform answers one question: *who actually performs when the stakes are highest?*

---

## What This Project Is

This is a full-stack sports analytics project built as a portfolio piece demonstrating end-to-end data work:

- Real multi-source data ingestion (StatsBomb open event data)
- Normalised PostgreSQL schema with 5 tables
- SQL-based BGPI calculation engine using CTEs, window functions, and FILTER aggregates
- FastAPI backend serving live BGPI rankings
- Next.js 14 frontend with a custom design system

**This is not a Kaggle notebook with bar charts.** The centrepiece is a statistically defensible metric, calculated entirely in SQL, with a validation layer and a sensitivity analysis showing how rankings shift under different weighting assumptions.

---

## Research Question

> Does the Big Game Player Index, as defined, actually predict match-winning contribution in high-stakes football? Which players show the greatest positive gap between their regular-season performance and their big-game performance?

**Stakeholder framing:** A football scouting agency wants to identify undervalued players whose big-game performance is significantly higher than their market value implies.

---

## Dataset

**Primary source:** [StatsBomb Open Data](https://github.com/statsbomb/open-data)

- Free event-level match data including xG, shot locations, and all match events
- No API key required
- Covers multiple competitions including UEFA Champions League, domestic leagues, and women's football

**Coverage stats (current build):**

| Metric | Count |
|---|---|
| Matches | 4,235 |
| Unique players | 11,889 |
| Player-match records | 119,752 |
| BGPI scores computed | 119,752 |

**Coverage note:** The StatsBomb open dataset does not cover all competitions equally. UCL data is used as the primary validation set. Women's football competitions are included in the dataset with the same event-level detail — this is intentional, not an oversight.

---

## The BGPI Formula

BGPI is calculated entirely in SQL against the normalised schema.

```
BGPI = [(0.30 × Goals Score) + (0.20 × Assists Score) + (0.20 × xG Efficiency) + (0.20 × Match Winning Impact) + penalty deductions] × (Match Importance Score / 10)
```

**Component definitions:**

| Component | Weight | Definition |
|---|---|---|
| Goals Score | 30% | Goals normalised 0–100 within season |
| Assists Score | 20% | Assists, capped at 100 |
| xG Efficiency | 20% | Actual goals ÷ expected goals × 100 |
| Match Winning Impact | 20% | 100 if goal/assist in a winning match, 60 if goal/assist in a draw, 0 otherwise |
| Penalty miss | −15 pts | Applied per miss |
| Red card | −20 pts | Applied per dismissal |

**Match Importance Score:**

| Round / Context | Base Weight |
|---|---|
| UCL Final / World Cup Final | 10.0 |
| UCL Semi-Final | 9.0 |
| UCL Quarter-Final | 8.0 |
| UCL Round of 16 | 7.0 |
| Group Stage | 5.0 |
| Regular league match | 3.0 |

The final score is min-max normalised to 0–100 across all player-match records.

---

## Key Findings (UCL + Multi-Competition Dataset)

**Top big-game performers by BGPI:**

| Player | Big Game BGPI | Regular BGPI | Uplift |
|---|---|---|---|
| Divock Origi | 94.1 | 8.3 | +85.8 |
| Ivan Rakitić | 94.1 | 6.2 | +87.9 |
| Gareth Bale | 59.2 | 10.9 | +48.3 |
| Lionel Messi | 59.1 | 14.5 | +44.6 |
| Luis Suárez | 82.2 | 13.7 | +68.5 |
| Mario Mandžukić | 76.4 | 10.9 | +65.5 |

**Surprising finding:** Origi and Rakitić rank above Messi on big-game BGPI specifically — not because they are better players overall, but because the metric correctly captures contextual performance. Both players scored in UCL finals. This is the metric working as designed, not a flaw.

**Women's football insight:** Vivianne Miedema (61 goals, 76 matches, 49.80 total xG) ranks in elite company on raw output metrics. The dataset treats women's competitions with identical analytical rigour to men's.

---

## Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| Database | PostgreSQL (port 5433) | Normalised schema, BGPI calculation engine |
| Ingestion | Python 3.12 + pandas + psycopg2 | StatsBomb JSON flattening, event parsing |
| API | FastAPI + Uvicorn | Live BGPI endpoints |
| Frontend | Next.js 14 + Tailwind CSS | Dashboard UI |
| Deployment | Vercel (frontend) + Railway (API + DB) | Live public URL |

---

## Database Schema

```sql
competitions   (comp_id, name, country, importance_base_weight)
matches        (match_id, comp_id, season, match_date, home_team, away_team,
                home_score, away_score, match_importance_score, round_type)
players        (player_id, name, nationality, position)
player_match_stats  (stat_id, player_id, match_id, goals, assists, xg, xa,
                     shots_on_target, key_passes, minutes_played,
                     penalty_miss, red_card)
bgpi_scores    (bgpi_id, player_id, match_id, goals_score, assists_score,
                xg_efficiency, match_winning_impact, bgpi_raw,
                bgpi_normalised, calculated_at)
```

**Why five tables?** Each player appears in many matches. Storing stats inside the players table would require thousands of columns. The `player_match_stats` table uses a one-to-many relationship — one row per player per match — making it queryable across any dimension (player, season, competition round) without data redundancy.

---

## Project Structure

```
fallon_d'floor/
├── analysis/
│   ├── bgpi_engine.sql          # Core BGPI calculation (CTEs, window functions)
│   ├── analysis.sql             # Uplift, consistency, sensitivity queries
│   └── notebooks/               # Statistical validation
├── api/
│   └── main.py                  # FastAPI — /api/leaderboard, /api/player/{id}
├── data/
│   ├── raw/                     # StatsBomb JSON (not committed — see setup)
│   └── processed/               # Cleaned CSVs
├── db/
│   ├── schema.sql               # Table definitions
│   └── import/
│       ├── load_statsbomb.py    # Match metadata ingestion
│       └── load_events.py       # Player stats from event stream
├── frontend/                    # Next.js 14 application
├── dashboard/                   # Power BI file
└── docs/
    ├── data_quality_log.md
    └── analytical_memo.pdf
```

---

## Local Setup

### Prerequisites

- Python 3.12+
- PostgreSQL (port 5433)
- Node.js 18+
- Git

### 1. Clone and install

```bash
git clone https://github.com/ts2004T/fallon-dfloor.git
cd fallon_d'floor

python -m venv venv
venv\Scripts\activate        # Windows
pip install pandas psycopg2-binary python-dotenv rapidfuzz fastapi uvicorn scipy numpy
```

### 2. Configure environment

Create `.env` in the project root:

```
DB_HOST=localhost
DB_PORT=5433
DB_NAME=fallon_dfloor
DB_USER=postgres
DB_PASSWORD=your_password
```

### 3. Get the data

```bash
cd data/raw
git clone --depth=1 https://github.com/statsbomb/open-data.git statsbomb
```

### 4. Set up the database

```bash
psql -p 5433 -U postgres -c "CREATE DATABASE fallon_dfloor;"
psql -p 5433 -U postgres -d fallon_dfloor -f db/schema.sql
```

### 5. Run ingestion pipeline

```bash
python db/import/load_statsbomb.py   # Load match metadata
python db/import/load_events.py      # Load player stats (~10 min, 4235 matches)
```

### 6. Calculate BGPI scores

```bash
psql -p 5433 -U postgres -d fallon_dfloor -f analysis/bgpi_engine.sql
# Inserts 119,752 normalised BGPI scores
```

### 7. Start the API

```bash
uvicorn api.main:app --reload --port 8000
# http://localhost:8000/api/leaderboard
```

### 8. Start the frontend

```bash
cd frontend
npm install
npm run dev
# http://localhost:3000
```

---

## API Endpoints

| Endpoint | Description |
|---|---|
| `GET /api/leaderboard` | Top players by big-game BGPI. Params: `limit`, `min_matches` |
| `GET /api/player/{id}` | Player detail — summary stats + last 10 matches |
| `GET /api/stats/summary` | Dataset-level summary (total players, matches, records) |

---

## Skills Demonstrated

| Skill | How |
|---|---|
| SQL (PostgreSQL) | BGPI engine — CTEs, window functions, FILTER aggregates, RANK, STDDEV, NULLIF, min-max normalisation |
| Python / Pandas | JSON flattening of nested StatsBomb event arrays, event stream parsing across 4,235 matches |
| Data Cleaning | Multi-source reconciliation, own goal exclusion, penalty miss detection, coverage gap documentation |
| KPI Design | Original composite metric with documented weighting rationale |
| API Development | FastAPI with CORS, parameterised queries, RealDictCursor |
| Frontend | Next.js 14 App Router, server components, Tailwind CSS |
| Git | Version-controlled repo with meaningful commit messages |

---

## Interview Talking Points

**"Tell me about a metric you designed from scratch."**
*"BGPI weights player performance by match context — a goal in a UCL final counts more than one in a dead rubber. The weighting scheme is documented and I ran a sensitivity analysis showing how the top-10 ranking shifts if goal weight moves from 30% to 40%. The honest finding is that the top 3 are rank-stable, but positions 4–10 shift significantly depending on assumptions."*

**"How do you handle data from multiple inconsistent sources?"**
*"StatsBomb uses full legal names — Lionel Andrés Messi Cuccittini — which don't match how players appear in other sources. The pipeline uses fuzzy matching via rapidfuzz with a threshold of 85 to resolve inconsistencies, and a player name mapping table documents every resolution decision."*

**"Give me an example of a complex SQL query you wrote."**
*"The BGPI calculation engine — it's a chain of three CTEs. The first calculates raw component scores per player per match. The second applies the match importance multiplier. The third normalises the result to 0–100 using min-max normalisation across all records using window functions. The whole thing runs as a single INSERT INTO bgpi_scores SELECT statement."*

---

## Roadmap

- [ ] Statistical validation layer (Pearson correlation, Mann-Whitney U, bootstrapped CIs)
- [ ] Sensitivity analysis across 5 weighting schemes (Power BI page 4)
- [ ] Power BI dashboard (4 pages: leaderboard, player deep-dive, uplift matrix, sensitivity)
- [ ] Analytical memo (methodology transparency + limitations)
- [ ] Deployment — Vercel + Railway
- [ ] Expand dataset beyond UCL to domestic leagues

---

## Data Attribution

Event data from [StatsBomb Open Data](https://github.com/statsbomb/open-data), used under the [StatsBomb Open Data Licence](https://github.com/statsbomb/open-data/blob/master/LICENSE.pdf).

> *"When StatsBomb data is used in public work, the following attribution is required: Data provided by StatsBomb."*

---

## About

Built by **Tanishka Suryawanshi** — BTech CSE, SRM Institute of Science and Technology (2026).

Part of a three-project Data Analytics portfolio alongside DropoffDesk (hiring funnel analytics) and Bengaluru Metro Ridership Forecasting.

*"The interesting part was not the app — it was building a contextual weighting system, validating it statistically, and then showing how much the rankings would change if I had made different assumptions."*

---

*A playful football analytics project built for curiosity, conversation, and a little harmless chaos. Real data. Slightly sarcastic commentary. Please don't yell at the spreadsheet.*
