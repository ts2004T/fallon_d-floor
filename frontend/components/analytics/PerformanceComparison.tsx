import { LeaderboardPlayer } from "@/lib/api";
import { buildCategorizedPlayers, CATEGORY_META, PerformanceCategory } from "@/lib/analytics";
import styles from "./PerformanceComparison.module.css";

interface PerformanceComparisonProps {
  leaderboard: LeaderboardPlayer[];
}

const CATEGORY_ORDER: PerformanceCategory[] = ["big-game", "riser", "consistent", "stat-merchant"];

export default function PerformanceComparison({ leaderboard }: PerformanceComparisonProps) {
  const categorized = buildCategorizedPlayers(leaderboard);
  const excluded = leaderboard.length - categorized.length;

  const counts = categorized.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] ?? 0) + 1;
    return acc;
  }, {} as Record<PerformanceCategory, number>);

  return (
    <div className="card pad reveal">
      <div className={styles.head}>
        <div className="eyebrow">Section 4 · Big-Game Performance</div>
        <h3 className={styles.title}>Big-Game vs Regular Form</h3>
        <p className={styles.question}>Who rises to the occasion, and who fades when it matters?</p>
      </div>

      <div className={styles.body}>
        <div>
          <div className={styles.chartWrap}>
            <span className={styles.axisLabelY}>Big-Game BGPI</span>
            <div className={styles.axisY}>
              <span>100</span>
              <span>50</span>
              <span>0</span>
            </div>
            <svg
              className={styles.svg}
              viewBox="0 0 100 100"
              role="img"
              aria-label={`Scatter plot comparing each player's regular-season BGPI against their big-game BGPI. ${categorized.length} players plotted across four categories: Big Game Players, Under-Pressure Risers, Consistent Performers, and Stat Merchants.`}
            >
              <line x1="0" y1="100" x2="100" y2="0" className={styles.refLine} />
              {categorized.map((p) => (
                <circle
                  key={p.player_id}
                  className={styles.dot}
                  cx={Math.max(0, Math.min(100, p.regular_bgpi as number))}
                  cy={100 - Math.max(0, Math.min(100, p.big_game_bgpi))}
                  r={1.8}
                  fill={CATEGORY_META[p.category].color}
                >
                  <title>
                    {p.name}: regular {p.regular_bgpi}, big-game {p.big_game_bgpi} ({CATEGORY_META[p.category].label})
                  </title>
                </circle>
              ))}
            </svg>
            <div className={styles.axisX}>
              <span>0</span>
              <span>50</span>
              <span>100</span>
            </div>
          </div>
          <div className={styles.axisLabelX}>Regular-Season BGPI</div>
        </div>

        <div className={styles.legend}>
          {CATEGORY_ORDER.map((key) => {
            const meta = CATEGORY_META[key];
            return (
              <div className={styles.legendItem} key={key}>
                <span className={styles.swatch} style={{ background: meta.color }} />
                <span>
                  <span className={styles.legendLabel}>{meta.label}</span>{" "}
                  <span className="muted">({counts[key] ?? 0})</span>
                  <span className={styles.legendDesc}>{meta.description}</span>
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {excluded > 0 && (
        <p className={styles.note}>
          {excluded} player{excluded === 1 ? "" : "s"} excluded — no regular-season baseline on record (big-game appearances only).
        </p>
      )}

      <table className={styles.srOnly}>
        <caption>Big-game vs regular-season BGPI by player</caption>
        <thead>
          <tr><th>Player</th><th>Regular BGPI</th><th>Big-Game BGPI</th><th>Uplift</th><th>Category</th></tr>
        </thead>
        <tbody>
          {categorized.map((p) => (
            <tr key={p.player_id}>
              <td>{p.name}</td>
              <td>{p.regular_bgpi}</td>
              <td>{p.big_game_bgpi}</td>
              <td>{p.big_game_uplift}</td>
              <td>{CATEGORY_META[p.category].label}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
