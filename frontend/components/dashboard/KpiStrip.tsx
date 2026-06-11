import KPICard from "./KPICard";
import { getDashboardLeaderboard, getStatsSummary } from "@/lib/api";
import { lastName } from "@/lib/format";
import styles from "./KpiStrip.module.css";

export default async function KpiStrip() {
  const [stats, leaderboard] = await Promise.all([
    getStatsSummary(),
    getDashboardLeaderboard(),
  ]);

  const topPlayer = leaderboard[0];

  const biggestRiser = leaderboard.reduce((best, p) => {
    if (p.big_game_uplift == null) return best;
    if (best == null || best.big_game_uplift == null) return p;
    return p.big_game_uplift > best.big_game_uplift ? p : best;
  }, undefined as (typeof leaderboard)[number] | undefined);

  return (
    <div className={styles.strip}>
      <KPICard label="Players Audited" value={stats.total_players.toLocaleString()} />
      <KPICard label="Average BGPI" value={stats.avg_bgpi.toFixed(1)} />
      {topPlayer ? (
        <KPICard
          label="Most Clutch Player"
          value={lastName(topPlayer.name)}
          hint={`BGPI ${topPlayer.big_game_bgpi}`}
        />
      ) : (
        <KPICard label="Most Clutch Player" value="—" hint="Not enough data yet" />
      )}
      {biggestRiser && biggestRiser.big_game_uplift != null ? (
        <KPICard
          label="Biggest Riser"
          value={lastName(biggestRiser.name)}
          hint={`+${biggestRiser.big_game_uplift} vs regular form`}
        />
      ) : (
        <KPICard label="Biggest Riser" value="—" hint="Not enough data yet" />
      )}
    </div>
  );
}
