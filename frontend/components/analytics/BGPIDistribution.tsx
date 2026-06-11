import { LeaderboardPlayer } from "@/lib/api";
import { buildDistribution } from "@/lib/analytics";
import styles from "./BGPIDistribution.module.css";

interface BGPIDistributionProps {
  leaderboard: LeaderboardPlayer[];
}

export default function BGPIDistribution({ leaderboard }: BGPIDistributionProps) {
  const buckets = buildDistribution(leaderboard, 10);
  const max = Math.max(1, ...buckets.map((b) => b.count));

  return (
    <div className="card pad reveal">
      <div className={styles.head}>
        <div className="eyebrow">Section 3 · Distribution</div>
        <h3 className={styles.title}>BGPI Distribution</h3>
        <p className={styles.question}>Where does most of the audited talent pool sit?</p>
      </div>

      <div
        className={styles.chart}
        role="img"
        aria-label={`Histogram of big-game BGPI scores across ${leaderboard.length} players, grouped in bands of 10 from 0 to 100.`}
      >
        {buckets.map((b) => (
          <div className={styles.col} key={b.label}>
            <span className={styles.count}>{b.count > 0 ? b.count : ""}</span>
            <div className={styles.track}>
              <div className={styles.bar} style={{ height: `${(b.count / max) * 100}%` }} />
            </div>
            <span className={styles.range}>{b.label}</span>
          </div>
        ))}
      </div>

      <table className={styles.srOnly}>
        <caption>BGPI distribution data table</caption>
        <thead>
          <tr><th>BGPI range</th><th>Players</th></tr>
        </thead>
        <tbody>
          {buckets.map((b) => (
            <tr key={b.label}><td>{b.label}</td><td>{b.count}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
