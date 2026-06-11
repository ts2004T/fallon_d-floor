import { getDashboardLeaderboard } from "@/lib/api";
import { lastName } from "@/lib/format";
import InsightCard from "./InsightCard";
import styles from "./TrendingInsights.module.css";

export default async function TrendingInsights() {
  const leaderboard = await getDashboardLeaderboard();

  const xgOverperformer = leaderboard.reduce((best, p) => {
    const diff = p.total_goals - p.total_xg;
    const bestDiff = best ? best.total_goals - best.total_xg : -Infinity;
    return diff > bestDiff ? p : best;
  }, undefined as (typeof leaderboard)[number] | undefined);

  const statMerchant = leaderboard.reduce((worst, p) => {
    if (p.big_game_uplift == null) return worst;
    if (worst == null || worst.big_game_uplift == null) return p;
    return p.big_game_uplift < worst.big_game_uplift ? p : worst;
  }, undefined as (typeof leaderboard)[number] | undefined);

  const hasMerchant = statMerchant && statMerchant.big_game_uplift != null;

  if (!xgOverperformer && !hasMerchant) {
    return (
      <div className={styles.stack}>
        <InsightCard eyebrow="📊 Trending Insights">
          Trending insights will appear here once enough matches have been audited.
        </InsightCard>
      </div>
    );
  }

  return (
    <div className={styles.stack}>
      {xgOverperformer && (
        <InsightCard eyebrow="📈 xG Overperformer" href="/analytics" linkLabel="View Analytics →">
          {lastName(xgOverperformer.name)} has scored{" "}
          <span className="up">
            {(xgOverperformer.total_goals - xgOverperformer.total_xg).toFixed(1)}
          </span>{" "}
          goals above their expected total ({xgOverperformer.total_xg} xG) this season.
        </InsightCard>
      )}

      {hasMerchant && (
        <InsightCard eyebrow="📉 Stat Merchant Alert" href="/goat-audit" linkLabel="Run GOAT Audit →">
          {lastName(statMerchant!.name)}&apos;s Big Game BGPI drops{" "}
          <span className="down">{statMerchant!.big_game_uplift}</span>{" "}
          compared to their regular form — numbers that don&apos;t hold up on a rainy Tuesday.
        </InsightCard>
      )}
    </div>
  );
}
