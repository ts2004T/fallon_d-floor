-- ============================================================
-- Fallon d'Floor™ — BGPI Calculation Engine
-- Big Game Player Index: 0-100 composite score
-- Weighted by match importance, normalised across all players
-- ============================================================
-- Step 1: Calculate raw component scores per player per match
CREATE OR REPLACE VIEW bgpi_components AS WITH season_maxes AS (
          SELECT EXTRACT(
                    YEAR
                    FROM m.match_date
               ) AS match_year,
               MAX(pms.goals) AS max_goals
          FROM player_match_stats pms
               JOIN matches m ON pms.match_id = m.match_id
          WHERE pms.minutes_played >= 30
          GROUP BY EXTRACT(
                    YEAR
                    FROM m.match_date
               )
     ),
     components AS (
          SELECT p.player_id,
               p.name,
               p.position,
               pms.match_id,
               m.match_importance_score AS mis,
               m.round_type,
               m.season,
               m.home_team,
               m.away_team,
               pms.goals,
               pms.assists,
               pms.xg,
               pms.minutes_played,
               -- Goals score: normalised 0-100 within year
               CASE
                    WHEN sm.max_goals > 0 THEN LEAST(100.0, 100.0 * pms.goals / sm.max_goals)
                    ELSE 0
               END AS goals_score,
               -- Assists score: normalised 0-100, capped
               LEAST(100.0, pms.assists * 25.0) AS assists_score,
               -- xG efficiency: how much did player overperform xG?
               CASE
                    WHEN pms.xg > 0 THEN LEAST(150.0, 100.0 * pms.goals / pms.xg)
                    ELSE 50.0
               END AS xg_eff_score,
               -- Match winning impact
               CASE
                    WHEN (pms.goals + pms.assists > 0)
                    AND (m.home_score != m.away_score) THEN 100.0
                    WHEN (pms.goals + pms.assists > 0) THEN 60.0
                    ELSE 0.0
               END AS mwi_score,
               -- Penalty miss penalty
               CASE
                    WHEN pms.penalty_miss THEN -15.0
                    ELSE 0.0
               END AS penalty_deduction,
               -- Red card penalty
               CASE
                    WHEN pms.red_card THEN -20.0
                    ELSE 0.0
               END AS red_card_deduction
          FROM player_match_stats pms
               JOIN players p ON pms.player_id = p.player_id
               JOIN matches m ON pms.match_id = m.match_id
               LEFT JOIN season_maxes sm ON EXTRACT(
                    YEAR
                    FROM m.match_date
               ) = sm.match_year
          WHERE pms.minutes_played >= 30
     )
SELECT player_id,
     name,
     position,
     match_id,
     mis,
     round_type,
     season,
     home_team,
     away_team,
     goals,
     assists,
     xg,
     minutes_played,
     goals_score,
     assists_score,
     xg_eff_score,
     mwi_score,
     penalty_deduction,
     red_card_deduction,
     -- Weighted composite score (before importance multiplier)
     GREATEST(
          0,
          (0.30 * goals_score) + (0.20 * assists_score) + (0.20 * xg_eff_score) + (0.20 * mwi_score) + penalty_deduction + red_card_deduction
     ) AS composite_raw,
     -- Apply match importance multiplier
     GREATEST(
          0,
          (
               (0.30 * goals_score) + (0.20 * assists_score) + (0.20 * xg_eff_score) + (0.20 * mwi_score) + penalty_deduction + red_card_deduction
          ) * (mis / 10.0)
     ) AS bgpi_raw
FROM components;
-- Step 2: Normalise BGPI to 0-100 scale and insert into bgpi_scores
INSERT INTO bgpi_scores (
          player_id,
          match_id,
          goals_score,
          assists_score,
          xg_efficiency,
          match_winning_impact,
          bgpi_raw,
          bgpi_normalised
     )
SELECT player_id,
     match_id,
     goals_score,
     assists_score,
     xg_eff_score,
     mwi_score,
     bgpi_raw,
     ROUND(
          100.0 * (bgpi_raw - MIN(bgpi_raw) OVER ()) / NULLIF(MAX(bgpi_raw) OVER () - MIN(bgpi_raw) OVER (), 0),
          2
     ) AS bgpi_normalised
FROM bgpi_components ON CONFLICT (player_id, match_id) DO
UPDATE
SET bgpi_normalised = EXCLUDED.bgpi_normalised,
     bgpi_raw = EXCLUDED.bgpi_raw,
     calculated_at = NOW();