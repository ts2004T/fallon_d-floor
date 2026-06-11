import AnalyticsKpiStrip from "./AnalyticsKpiStrip";
import BGPIDistribution from "./BGPIDistribution";
import PerformanceComparison from "./PerformanceComparison";
import XGAnalysis from "./XGAnalysis";
import PlayerDrilldown from "./PlayerDrilldown";
import InsightsPanel from "./InsightsPanel";
import { getLeaderboard, getStatsSummary } from "@/lib/api";
import pageStyles from "@/app/analytics/page.module.css";

export default async function AnalyticsDataSections() {
  const [stats, leaderboard] = await Promise.all([
    getStatsSummary(),
    getLeaderboard(100, 10),
  ]);

  const players = leaderboard.map(({ player_id, name, position }) => ({ player_id, name, position }));

  return (
    <>
      <AnalyticsKpiStrip stats={stats} leaderboard={leaderboard} />

      <div className={pageStyles.grid2}>
        <BGPIDistribution leaderboard={leaderboard} />
        <PerformanceComparison leaderboard={leaderboard} />
      </div>

      <XGAnalysis leaderboard={leaderboard} />

      <PlayerDrilldown players={players} />

      <InsightsPanel leaderboard={leaderboard} />
    </>
  );
}
