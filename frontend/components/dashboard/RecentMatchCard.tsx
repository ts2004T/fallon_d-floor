import Link from "next/link";
import { MatchSummary } from "@/lib/api";
import { formatMatchDate } from "@/lib/match-intelligence";
import styles from "./RecentMatchCard.module.css";

interface RecentMatchCardProps {
  match: MatchSummary | null;
}

export default function RecentMatchCard({ match }: RecentMatchCardProps) {
  if (!match) {
    return (
      <div className="card pad hoverable reveal" style={{ height: "100%" }}>
        <div className="eyebrow">⚽ Match Intelligence</div>
        <p className="muted" style={{ marginTop: 14 }}>
          No audited matches available yet. Check back once match data has been processed.
        </p>
      </div>
    );
  }

  return (
    <div className="card pad hoverable reveal">
      <div className="eyebrow">⚽ Recent Match</div>

      <div className={styles.matchup}>
        <div className={styles.side}>
          <div className="badge-crest av a2" style={{ width: 44, height: 44, fontSize: 15 }}>
            {match.home_team.slice(0, 3).toUpperCase()}
          </div>
          <span className={styles.teamName}>{match.home_team}</span>
        </div>

        <div className={styles.center}>
          <span className={`num ${styles.score}`}>
            {match.home_score}–{match.away_score}
          </span>
        </div>

        <div className={styles.side}>
          <div className="badge-crest av a5" style={{ width: 44, height: 44, fontSize: 15 }}>
            {match.away_team.slice(0, 3).toUpperCase()}
          </div>
          <span className={styles.teamName}>{match.away_team}</span>
        </div>
      </div>

      <div className={styles.event}>
        <span className="muted" style={{ fontSize: 13.5 }}>
          {match.competition} · {match.round_type} · {formatMatchDate(match.match_date)}
        </span>
        <Link href={`/live-match?match=${match.match_id}`} className="linkmore">
          View Match Intelligence →
        </Link>
      </div>
    </div>
  );
}
