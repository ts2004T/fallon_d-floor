import { MatchPlayerStat } from "@/lib/api";
import styles from "./PerformerCard.module.css";

interface PerformerCardProps {
  role: string;
  player: MatchPlayerStat;
  explanation: string;
}

export default function PerformerCard({ role, player, explanation }: PerformerCardProps) {
  return (
    <div className={styles.card}>
      <div className="eyebrow">{role}</div>
      <div className={styles.name}>{player.name}</div>
      <div className={styles.position}>{player.position}</div>
      <div className={styles.bgpiRow}>
        <span className="bgpi" style={{ fontSize: 30 }}>
          {player.bgpi}
        </span>
        <span className="muted" style={{ fontSize: 12 }}>
          BGPI
        </span>
      </div>
      <p className={styles.explanation}>{explanation}</p>
    </div>
  );
}
