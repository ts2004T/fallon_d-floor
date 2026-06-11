import { MatchInfo } from "@/lib/api";
import { formatMatchDate } from "@/lib/match-intelligence";
import styles from "./MatchHero.module.css";

interface MatchHeroProps {
  match: MatchInfo;
}

export default function MatchHero({ match }: MatchHeroProps) {
  return (
    <div className="card pad reveal">
      <div className={styles.head}>
        <div className="eyebrow">Section 1 · Match Overview</div>
        <span className="chip lav">{match.competition}</span>
      </div>

      <h2 className={styles.matchup}>
        <span className={styles.team}>{match.home_team}</span>
        <span className={styles.score}>
          {match.home_score} – {match.away_score}
        </span>
        <span className={styles.team}>{match.away_team}</span>
      </h2>

      <div className={styles.meta}>
        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>Date</span>
          <span className={styles.metaValue}>{formatMatchDate(match.match_date)}</span>
        </div>
        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>Round</span>
          <span className={styles.metaValue}>{match.round_type}</span>
        </div>
        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>Competition</span>
          <span className={styles.metaValue}>
            {match.competition} · {match.country}
          </span>
        </div>
        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>Match Importance</span>
          <span className={`${styles.metaValue} bgpi`} style={{ fontSize: 22 }}>
            {match.match_importance_score.toFixed(1)}
            <span className="muted" style={{ fontSize: 13, fontWeight: 500 }}>
              {" "}
              / 10
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
