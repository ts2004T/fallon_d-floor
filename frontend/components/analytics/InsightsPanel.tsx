import InsightCard from "@/components/dashboard/InsightCard";
import { LeaderboardPlayer } from "@/lib/api";
import { buildXgRankings, mostConsistent, topByBigGameBGPI, topByUplift } from "@/lib/analytics";
import { lastName } from "@/lib/format";
import styles from "./InsightsPanel.module.css";

interface InsightsPanelProps {
  leaderboard: LeaderboardPlayer[];
}

export default function InsightsPanel({ leaderboard }: InsightsPanelProps) {
  const topBgpi = topByBigGameBGPI(leaderboard);
  const topUplift = topByUplift(leaderboard);
  const consistent = mostConsistent(leaderboard);
  const { overperformers, underperformers } = buildXgRankings(leaderboard, 1);
  const clinical = overperformers[0];
  const wasteful = underperformers[0];

  return (
    <div className="card pad reveal">
      <div className={styles.head}>
        <div className="eyebrow">Section 7 · Key Insights</div>
        <h3 className={styles.title}>What the numbers say</h3>
        <p className={styles.question}>Auto-generated observations from this dataset — not random stats.</p>
      </div>

      <div className={styles.grid}>
        {topBgpi && (
          <InsightCard eyebrow="🏆 Highest Big-Game BGPI">
            <strong>{lastName(topBgpi.name)}</strong> leads the audited pool with a Big-Game
            BGPI of <span className="up">{topBgpi.big_game_bgpi}</span> across {topBgpi.matches} matches.
          </InsightCard>
        )}

        {topUplift && topUplift.big_game_uplift != null && (
          <InsightCard eyebrow="📈 Biggest Riser">
            <strong>{lastName(topUplift.name)}</strong> gains the most under pressure — Big-Game
            BGPI is <span className="up">+{topUplift.big_game_uplift}</span> over their regular-season form.
          </InsightCard>
        )}

        {consistent && consistent.big_game_uplift != null && (
          <InsightCard eyebrow="⚖️ Most Consistent">
            <strong>{lastName(consistent.name)}</strong> shows the smallest gap between regular
            and big-game form (uplift of {consistent.big_game_uplift >= 0 ? "+" : ""}{consistent.big_game_uplift}) —
            same player, every occasion.
          </InsightCard>
        )}

        {clinical && (
          <InsightCard eyebrow="🎯 Clinical Finisher">
            <strong>{lastName(clinical.name)}</strong> has scored{" "}
            <span className="up">+{clinical.xgDiff.toFixed(1)}</span> goals above their expected
            total ({clinical.total_xg} xG from {clinical.total_goals} goals).
          </InsightCard>
        )}

        {wasteful && (
          <InsightCard eyebrow="🥅 Wasteful Finisher">
            <strong>{lastName(wasteful.name)}</strong> has under-delivered on chances by{" "}
            <span className="down">{wasteful.xgDiff.toFixed(1)}</span> goals versus their
            expected total ({wasteful.total_xg} xG from {wasteful.total_goals} goals).
          </InsightCard>
        )}
      </div>
    </div>
  );
}
