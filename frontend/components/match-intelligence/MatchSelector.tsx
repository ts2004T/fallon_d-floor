import Link from "next/link";
import { MatchSummary } from "@/lib/api";
import { formatShortDate } from "@/lib/match-intelligence";
import styles from "./MatchSelector.module.css";

interface MatchSelectorProps {
  matches: MatchSummary[];
  activeId: number;
}

export default function MatchSelector({ matches, activeId }: MatchSelectorProps) {
  return (
    <div className="card pad reveal">
      <div className={styles.head}>
        <div className="eyebrow">Match Selector</div>
        <h3 className={styles.title}>Choose a match to analyze</h3>
        <p className={styles.question}>
          {matches.length} audited matches, ranked by match importance.
        </p>
      </div>
      <div className={styles.list} role="list">
        {matches.map((m) => {
          const active = m.match_id === activeId;
          return (
            <Link
              key={m.match_id}
              href={`/live-match?match=${m.match_id}`}
              className={`${styles.item} ${active ? styles.active : ""}`}
              aria-current={active ? "true" : undefined}
              role="listitem"
            >
              <div className={styles.teams}>
                <span className={styles.team}>{m.home_team}</span>
                <span className={styles.score}>{m.home_score}–{m.away_score}</span>
                <span className={styles.team}>{m.away_team}</span>
              </div>
              <div className={styles.meta}>
                <span>{m.competition}</span>
                <span>{formatShortDate(m.match_date)}</span>
                <span className="chip pink">Importance {m.match_importance_score.toFixed(1)}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
