import InsightCard from "@/components/dashboard/InsightCard";
import { MatchInsights as Insights } from "@/lib/match-intelligence";
import styles from "./MatchInsights.module.css";

interface MatchInsightsProps {
  insights: Insights;
}

export default function MatchInsights({ insights }: MatchInsightsProps) {
  const { highestBgpi, xgOverperformer, mostEfficient, unexpectedContributor } = insights;

  return (
    <div className="card pad reveal">
      <div className={styles.head}>
        <div className="eyebrow">Section 5 · Match Insights</div>
        <h3 className={styles.title}>Reading between the stat lines</h3>
        <p className={styles.question}>Auto-generated from this match&apos;s tracked performances — not decorative.</p>
      </div>

      {!highestBgpi ? (
        <p className="muted">No tracked performers for this match.</p>
      ) : (
        <div className={styles.grid}>
          <InsightCard eyebrow="🏆 Highest BGPI in the Match">
            <strong>{highestBgpi.name}</strong> posted the top BGPI of the match at{" "}
            <span className="up">{highestBgpi.bgpi}</span>, from {highestBgpi.goals}G / {highestBgpi.assists}A
            in {highestBgpi.minutes_played} minutes.
          </InsightCard>

          {xgOverperformer && (
            <InsightCard eyebrow="🎯 Largest xG Overperformance">
              <strong>{xgOverperformer.name}</strong> beat their expected goals by{" "}
              <span className={xgOverperformer.xgDiff >= 0 ? "up" : "down"}>
                {xgOverperformer.xgDiff >= 0 ? "+" : ""}
                {xgOverperformer.xgDiff.toFixed(2)}
              </span>{" "}
              ({xgOverperformer.goals} goal{xgOverperformer.goals === 1 ? "" : "s"} from{" "}
              {xgOverperformer.xg.toFixed(2)} xG).
            </InsightCard>
          )}

          {mostEfficient ? (
            <InsightCard eyebrow="⚡ Most Efficient Player">
              <strong>{mostEfficient.name}</strong> produced {mostEfficient.goals + mostEfficient.assists} goal
              contribution{mostEfficient.goals + mostEfficient.assists === 1 ? "" : "s"} in just{" "}
              {mostEfficient.minutes_played} minutes — {mostEfficient.per90.toFixed(2)} per 90.
            </InsightCard>
          ) : (
            <InsightCard eyebrow="⚡ Most Efficient Player">
              No tracked performer recorded a goal or assist in this match.
            </InsightCard>
          )}

          {unexpectedContributor ? (
            <InsightCard eyebrow="🌟 Unexpected Contributor">
              <strong>{unexpectedContributor.name}</strong> ({unexpectedContributor.position}) posted a BGPI of{" "}
              <span className="up">{unexpectedContributor.bgpi}</span> — a non-attacking player making an outsized
              impact on this match.
            </InsightCard>
          ) : (
            <InsightCard eyebrow="🌟 Unexpected Contributor">
              Every tracked performer in this match plays an attacking position.
            </InsightCard>
          )}
        </div>
      )}
    </div>
  );
}
