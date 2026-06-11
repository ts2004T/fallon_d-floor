import { LeaderboardPlayer } from "@/lib/api";
import { buildXgRankings, XgRanking } from "@/lib/analytics";
import { lastName } from "@/lib/format";
import styles from "./XGAnalysis.module.css";

interface XGAnalysisProps {
  leaderboard: LeaderboardPlayer[];
}

export default function XGAnalysis({ leaderboard }: XGAnalysisProps) {
  const { overperformers, underperformers } = buildXgRankings(leaderboard, 5);
  const combined: XgRanking[] = [...overperformers, ...underperformers].sort((a, b) => b.xgDiff - a.xgDiff);
  const max = Math.max(0.1, ...combined.map((p) => Math.abs(p.xgDiff)));

  return (
    <div className="card pad reveal">
      <div className={styles.head}>
        <div className="eyebrow">Section 5 · xG Performance</div>
        <h3 className={styles.title}>Goals vs Expected Goals</h3>
        <p className={styles.question}>Who&apos;s clinical in front of goal — and who&apos;s wasteful?</p>
      </div>

      <div className={styles.legend}>
        <span><span className={styles.swatch} style={{ background: "var(--positive)" }} /> Clinical Finisher (goals &gt; xG)</span>
        <span><span className={styles.swatch} style={{ background: "var(--negative)" }} /> Wasteful Finisher (goals &lt; xG)</span>
      </div>

      {combined.length === 0 ? (
        <p className={styles.empty}>Not enough data to compare goals against expected goals.</p>
      ) : (
        <div
          className={styles.rows}
          role="img"
          aria-label={`Diverging bar chart of goals minus expected goals for ${combined.length} players, ranging from ${combined[0]?.xgDiff.toFixed(1)} to ${combined[combined.length - 1]?.xgDiff.toFixed(1)}.`}
        >
          {combined.map((p) => {
            const isPositive = p.xgDiff >= 0;
            const pct = (Math.abs(p.xgDiff) / max) * 50;
            return (
              <div className={styles.row} key={p.player_id}>
                <span className={styles.name}>{lastName(p.name)}</span>
                <div className={styles.track}>
                  <div className={styles.center} />
                  <div
                    className={`${styles.bar} ${isPositive ? styles.positive : styles.negative}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className={`${styles.value} ${isPositive ? styles.positive : styles.negative}`}>
                  {isPositive ? "+" : ""}{p.xgDiff.toFixed(1)}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
