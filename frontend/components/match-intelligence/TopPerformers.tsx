import { TopPerformers as TopPerformersData } from "@/lib/match-intelligence";
import PerformerCard from "./PerformerCard";
import styles from "./TopPerformers.module.css";

interface TopPerformersProps {
  performers: TopPerformersData;
}

export default function TopPerformers({ performers }: TopPerformersProps) {
  const { highestBgpi, mostImpactfulAttacker, mostEfficientFinisher, highestUpliftPerformer } = performers;

  return (
    <div className="card pad reveal">
      <div className={styles.head}>
        <div className="eyebrow">Section 3 · Top Performers</div>
        <h3 className={styles.title}>Who shaped this match</h3>
        <p className={styles.question}>Four roles, each grounded in a specific stat comparison.</p>
      </div>

      {!highestBgpi ? (
        <p className="muted">No tracked performers for this match.</p>
      ) : (
        <div className={styles.grid}>
          <PerformerCard
            role="Highest BGPI"
            player={highestBgpi}
            explanation={`The standout performance of the match — a BGPI of ${highestBgpi.bgpi} built from ${highestBgpi.goals} goal(s), ${highestBgpi.assists} assist(s) and ${highestBgpi.xg.toFixed(2)} xG across ${highestBgpi.minutes_played} minutes.`}
          />

          {mostImpactfulAttacker && (
            <PerformerCard
              role="Most Impactful Attacker"
              player={mostImpactfulAttacker}
              explanation={`Directly involved in ${mostImpactfulAttacker.goals + mostImpactfulAttacker.assists} goal(s) (${mostImpactfulAttacker.goals}G, ${mostImpactfulAttacker.assists}A) from ${mostImpactfulAttacker.shots_on_target} shot(s) on target.`}
            />
          )}

          {mostEfficientFinisher ? (
            <PerformerCard
              role="Most Efficient Finisher"
              player={mostEfficientFinisher}
              explanation={`Scored ${mostEfficientFinisher.goals} from ${mostEfficientFinisher.xg.toFixed(2)} xG — ${mostEfficientFinisher.xgDiff >= 0 ? "+" : ""}${mostEfficientFinisher.xgDiff.toFixed(2)} goals against expectation.`}
            />
          ) : (
            <div className={styles.empty}>
              <div className="eyebrow">Most Efficient Finisher</div>
              <p className="muted" style={{ fontSize: 13.5, marginTop: 8 }}>
                No tracked performer scored in this match.
              </p>
            </div>
          )}

          {highestUpliftPerformer && highestUpliftPerformer.big_game_uplift != null && (
            <PerformerCard
              role="Highest Uplift Performer"
              player={highestUpliftPerformer}
              explanation={`Career big-game BGPI runs ${highestUpliftPerformer.big_game_uplift >= 0 ? "+" : ""}${highestUpliftPerformer.big_game_uplift} above their regular-season form — a player who typically raises their level on occasions like this.`}
            />
          )}
        </div>
      )}
    </div>
  );
}
