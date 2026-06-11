import { movementSymbol } from "@/lib/goat";
import styles from "./RankingBadge.module.css";

interface RankingBadgeProps {
  rank: number;
  movement: number;
  floating?: boolean;
}

export default function RankingBadge({ rank, movement, floating = true }: RankingBadgeProps) {
  const symbol = movementSymbol(movement);
  const tone = movement > 0 ? styles.up : movement < 0 ? styles.down : styles.flat;

  return (
    <span
      className={`${styles.badge} ${floating ? styles.floating : ""}`}
      title="Big-game rank vs. baseline (regular-form) rank"
    >
      #{rank} · GOAT
      <span className={tone}>
        {symbol}
        {movement !== 0 ? Math.abs(movement) : ""}
      </span>
    </span>
  );
}
