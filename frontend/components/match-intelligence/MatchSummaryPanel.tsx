import { MatchInfo, MatchPlayerStat } from "@/lib/api";
import { MatchNarrative } from "@/lib/match-intelligence";
import styles from "./MatchSummaryPanel.module.css";

interface MatchSummaryPanelProps {
  match: MatchInfo;
  players: MatchPlayerStat[];
  narrative: MatchNarrative;
}

export default function MatchSummaryPanel({ match, players, narrative }: MatchSummaryPanelProps) {
  const top3 = [...players].sort((a, b) => b.bgpi - a.bgpi).slice(0, 3);
  const totalGoals = players.reduce((s, p) => s + p.goals, 0);
  const totalXg = players.reduce((s, p) => s + p.xg, 0);
  const totalShots = players.reduce((s, p) => s + p.shots_on_target, 0);
  const totalKeyPasses = players.reduce((s, p) => s + p.key_passes, 0);
  const redCards = players.filter((p) => p.red_card).length;
  const penaltyMisses = players.filter((p) => p.penalty_miss).length;

  const importanceContext =
    match.match_importance_score >= 8.5
      ? "one of the highest-stakes fixtures in the dataset"
      : match.match_importance_score >= 7
      ? "a high-stakes fixture"
      : match.match_importance_score >= 4
      ? "a moderately important fixture"
      : "a lower-stakes fixture";

  return (
    <div className="card pad reveal">
      <div className={styles.head}>
        <div className="eyebrow">Section 6 · Match Summary</div>
        <h3 className={styles.title}>Structured match recap</h3>
        <p className={styles.note}>
          Built from aggregate match statistics — Fallon d&apos;Floor does not record minute-by-minute events,
          so this is a contextual recap rather than a timeline.
        </p>
      </div>

      <ol className={styles.phases}>
        <li className={styles.phase}>
          <div className={styles.phaseLabel}>Pre-Match Context</div>
          <p className={styles.phaseBody}>
            {match.home_team} hosted {match.away_team} in the {match.competition} ({match.round_type},{" "}
            {match.season}) — {importanceContext} (importance {match.match_importance_score.toFixed(1)}/10).
          </p>
        </li>

        <li className={styles.phase}>
          <div className={styles.phaseLabel}>Final Result</div>
          <p className={styles.phaseBody}>
            {match.home_team} {match.home_score}–{match.away_score} {match.away_team}. {narrative.headline}.
          </p>
        </li>

        <li className={styles.phase}>
          <div className={styles.phaseLabel}>Standout Contributions</div>
          {top3.length > 0 ? (
            <ul className={styles.contribList}>
              {top3.map((p) => (
                <li key={p.player_id}>
                  <strong>{p.name}</strong> ({p.position}) — BGPI {p.bgpi}, {p.goals}G {p.assists}A,{" "}
                  {p.xg.toFixed(2)} xG in {p.minutes_played}&apos;
                </li>
              ))}
            </ul>
          ) : (
            <p className="muted" style={{ fontSize: 13.5 }}>No tracked performers for this match.</p>
          )}
        </li>

        <li className={styles.phase}>
          <div className={styles.phaseLabel}>By the Numbers</div>
          <div className={styles.statGrid}>
            <div className={styles.stat}>
              <span className={styles.statValue}>{totalGoals}</span>
              <span className={styles.statLabel}>Tracked Goals</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>{totalXg.toFixed(2)}</span>
              <span className={styles.statLabel}>Total xG</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>{totalShots}</span>
              <span className={styles.statLabel}>Shots on Target</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>{totalKeyPasses}</span>
              <span className={styles.statLabel}>Key Passes</span>
            </div>
            {redCards > 0 && (
              <div className={styles.stat}>
                <span className={styles.statValue}>{redCards}</span>
                <span className={styles.statLabel}>Red Card{redCards === 1 ? "" : "s"}</span>
              </div>
            )}
            {penaltyMisses > 0 && (
              <div className={styles.stat}>
                <span className={styles.statValue}>{penaltyMisses}</span>
                <span className={styles.statLabel}>Penalty Miss{penaltyMisses === 1 ? "" : "es"}</span>
              </div>
            )}
          </div>
        </li>
      </ol>
    </div>
  );
}
