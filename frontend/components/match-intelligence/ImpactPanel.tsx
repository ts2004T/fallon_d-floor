import { MatchInfo, MatchPlayerStat } from "@/lib/api";
import styles from "./ImpactPanel.module.css";

interface ImpactPanelProps {
  match: MatchInfo;
  players: MatchPlayerStat[];
}

export default function ImpactPanel({ match, players }: ImpactPanelProps) {
  const top5 = [...players].sort((a, b) => b.bgpi - a.bgpi).slice(0, 5);
  const totals = top5.map(
    (p) => p.goals_score + p.assists_score + p.xg_efficiency + p.match_winning_impact
  );
  const maxTotal = Math.max(1, ...totals);
  const importancePct = (match.match_importance_score / 10) * 100;

  return (
    <div className="card pad reveal">
      <div className={styles.head}>
        <div className="eyebrow">Section 4 · Match Impact Analysis</div>
        <h3 className={styles.title}>Which performances changed the outcome?</h3>
      </div>

      <div className={styles.importance}>
        <div className={styles.importanceLabel}>
          <span>Match Importance</span>
          <span className="num">{match.match_importance_score.toFixed(1)} / 10</span>
        </div>
        <div
          className={styles.importanceTrack}
          role="meter"
          aria-valuenow={match.match_importance_score}
          aria-valuemin={0}
          aria-valuemax={10}
          aria-label="Match importance score"
        >
          <div className={styles.importanceFill} style={{ width: `${importancePct}%` }} />
        </div>
      </div>

      {top5.length === 0 ? (
        <p className="muted">No tracked performers for this match.</p>
      ) : (
        <>
          <div className={styles.legend}>
            <span><span className={styles.swatch} style={{ background: "var(--accent)" }} /> Goals</span>
            <span><span className={styles.swatch} style={{ background: "var(--alt)" }} /> Assists</span>
            <span><span className={styles.swatch} style={{ background: "var(--gold)" }} /> xG Efficiency</span>
            <span><span className={styles.swatch} style={{ background: "var(--positive)" }} /> Match-Winning Impact</span>
          </div>

          <div
            className={styles.bars}
            role="img"
            aria-label={`Stacked BGPI contribution breakdown for the top ${top5.length} performers by BGPI in this match.`}
          >
            {top5.map((p) => (
              <div className={styles.row} key={p.player_id}>
                <span className={styles.name}>{p.name}</span>
                <div className={styles.track}>
                  <div className={styles.seg} style={{ width: `${(p.goals_score / maxTotal) * 100}%`, background: "var(--accent)" }} />
                  <div className={styles.seg} style={{ width: `${(p.assists_score / maxTotal) * 100}%`, background: "var(--alt)" }} />
                  <div className={styles.seg} style={{ width: `${(p.xg_efficiency / maxTotal) * 100}%`, background: "var(--gold)" }} />
                  <div className={styles.seg} style={{ width: `${(p.match_winning_impact / maxTotal) * 100}%`, background: "var(--positive)" }} />
                </div>
                <span className={styles.value}>{p.bgpi}</span>
              </div>
            ))}
          </div>

          <table className="sr-only">
            <caption>BGPI component breakdown for the top performers in this match</caption>
            <thead>
              <tr>
                <th>Player</th>
                <th>Goals Score</th>
                <th>Assists Score</th>
                <th>xG Efficiency</th>
                <th>Match-Winning Impact</th>
                <th>BGPI</th>
              </tr>
            </thead>
            <tbody>
              {top5.map((p) => (
                <tr key={p.player_id}>
                  <td>{p.name}</td>
                  <td>{p.goals_score}</td>
                  <td>{p.assists_score}</td>
                  <td>{p.xg_efficiency}</td>
                  <td>{p.match_winning_impact}</td>
                  <td>{p.bgpi}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
