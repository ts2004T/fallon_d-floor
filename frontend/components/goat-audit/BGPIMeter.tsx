import styles from "./BGPIMeter.module.css";

interface BGPIMeterProps {
  value: number;
  compareValue?: number | null;
  max?: number;
}

export default function BGPIMeter({ value, compareValue, max = 100 }: BGPIMeterProps) {
  const fillPct = Math.max(0, Math.min(100, (value / max) * 100));
  const markerPct =
    compareValue != null ? Math.max(0, Math.min(100, (compareValue / max) * 100)) : null;

  return (
    <div className={styles.meter}>
      <div
        className={styles.track}
        role="meter"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label="Big Game Performance Index"
      >
        <div className={styles.fill} style={{ width: `${fillPct}%` }} />
        {markerPct != null && (
          <div
            className={styles.marker}
            style={{ left: `${markerPct}%` }}
            role="img"
            aria-label={`Regular-season BGPI: ${compareValue}`}
            title={`Regular form: ${compareValue}`}
          />
        )}
      </div>
      <div className={styles.legend}>
        <span>0</span>
        {compareValue != null && <span>Marker = regular-season BGPI ({compareValue})</span>}
        <span>{max}</span>
      </div>
    </div>
  );
}
