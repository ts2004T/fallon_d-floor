import KPICard from "@/components/dashboard/KPICard";
import { LeaderboardPlayer, StatsSummary } from "@/lib/api";
import { topByUplift } from "@/lib/analytics";
import { lastName } from "@/lib/format";
import styles from "./AnalyticsKpiStrip.module.css";

interface AnalyticsKpiStripProps {
  stats: StatsSummary;
  leaderboard: LeaderboardPlayer[];
}

export default function AnalyticsKpiStrip({ stats, leaderboard }: AnalyticsKpiStripProps) {
  const biggestUplift = topByUplift(leaderboard);

  return (
    <div className={styles.strip}>
      <KPICard label="Players Audited" value={stats.total_players.toLocaleString()} />
      <KPICard label="Matches Analyzed" value={stats.total_matches.toLocaleString()} />
      <KPICard label="Average BGPI" value={stats.avg_bgpi.toFixed(1)} hint="Across all player-matches" />
      {biggestUplift && biggestUplift.big_game_uplift != null ? (
        <KPICard
          label="Biggest Big-Game Uplift"
          value={lastName(biggestUplift.name)}
          hint={`+${biggestUplift.big_game_uplift} vs regular form`}
        />
      ) : (
        <KPICard label="Biggest Big-Game Uplift" value="—" hint="Not enough data yet" />
      )}
    </div>
  );
}
