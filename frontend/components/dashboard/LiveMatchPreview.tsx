import styles from "./LiveMatchPreview.module.css";

interface LiveMatchPreviewProps {
  status?: "live" | "upcoming";
  home?: string;
  away?: string;
  homeScore?: number;
  awayScore?: number;
  minute?: string;
  keyEvent?: string;
  kickoff?: string;
}

export default function LiveMatchPreview({
  status = "upcoming",
  home = "Real Madrid",
  away = "Barcelona",
  homeScore,
  awayScore,
  minute,
  keyEvent,
  kickoff = "Sat, 20:00 — El Clásico",
}: LiveMatchPreviewProps) {
  const isLive = status === "live";

  return (
    <div className="card pad hoverable reveal">
      <div className="eyebrow">
        {isLive ? (
          <span className="live">
            <span className="dot" /> Live{minute ? ` · ${minute}` : ""}
          </span>
        ) : (
          "⚽ Upcoming Fixture"
        )}
      </div>

      <div className={styles.matchup}>
        <div className={styles.side}>
          <div className="badge-crest av a2" style={{ width: 44, height: 44, fontSize: 15 }}>
            {home.slice(0, 3).toUpperCase()}
          </div>
          <span className={styles.teamName}>{home}</span>
        </div>

        <div className={styles.center}>
          {isLive ? (
            <span className={`num ${styles.score}`}>
              {homeScore ?? 0}–{awayScore ?? 0}
            </span>
          ) : (
            <span className={styles.vs}>VS</span>
          )}
        </div>

        <div className={styles.side}>
          <div className="badge-crest av a5" style={{ width: 44, height: 44, fontSize: 15 }}>
            {away.slice(0, 3).toUpperCase()}
          </div>
          <span className={styles.teamName}>{away}</span>
        </div>
      </div>

      <div className={styles.event}>
        {isLive && keyEvent ? (
          <span className="muted" style={{ fontSize: 13.5 }}>{keyEvent}</span>
        ) : (
          <span className="muted" style={{ fontSize: 13.5 }}>{kickoff}</span>
        )}
      </div>
    </div>
  );
}
