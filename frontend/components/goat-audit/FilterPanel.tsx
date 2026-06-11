import styles from "./FilterPanel.module.css";

export const MIN_MATCHES_OPTIONS = [10, 15, 20, 30];

interface FilterPanelProps {
  positions: string[];
  position: string;
  onPositionChange: (value: string) => void;
  minMatches: number;
  onMinMatchesChange: (value: number) => void;
}

export default function FilterPanel({
  positions,
  position,
  onPositionChange,
  minMatches,
  onMinMatchesChange,
}: FilterPanelProps) {
  return (
    <div className={styles.panel}>
      <div className={styles.field}>
        <label htmlFor="goat-position" className="eyebrow">Position</label>
        <select
          id="goat-position"
          className={styles.select}
          value={position}
          onChange={(e) => onPositionChange(e.target.value)}
        >
          <option value="all">All positions</option>
          {positions.map((pos) => (
            <option key={pos} value={pos}>{pos}</option>
          ))}
        </select>
      </div>

      <div className={styles.field}>
        <label htmlFor="goat-min-matches" className="eyebrow">Min. matches</label>
        <select
          id="goat-min-matches"
          className={styles.select}
          value={minMatches}
          onChange={(e) => onMinMatchesChange(Number(e.target.value))}
        >
          {MIN_MATCHES_OPTIONS.map((n) => (
            <option key={n} value={n}>{n}+ matches</option>
          ))}
        </select>
      </div>
    </div>
  );
}
