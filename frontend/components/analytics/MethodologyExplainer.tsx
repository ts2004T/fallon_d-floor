import styles from "./MethodologyExplainer.module.css";

export default function MethodologyExplainer() {
  return (
    <div className={`card pad reveal ${styles.callout}`}>
      <div className="eyebrow">Section 1 · Methodology</div>

      <p className={styles.text}>
        <strong>What BGPI measures:</strong>{" "}
        <span className="muted">
          The Big Game Performance Index (BGPI) is a 0–100 score that asks one question:
          how much did this player actually contribute when the match mattered most? Unlike
          raw season totals, BGPI weighs every contribution by the importance of the match it
          happened in — a goal in a relegation six-pointer or a continental final counts for
          far more than a tap-in in a dead rubber.
        </span>
      </p>

      <div className={styles.formula}>
        <div className="eyebrow" style={{ fontSize: 11 }}>Composite weighting (before deductions &amp; importance scaling)</div>
        <div className={styles.bar} role="img" aria-label="BGPI composite weighting: Goals 30%, Assists 20%, xG Efficiency 20%, Match-Winning Impact 20%, remaining 10% reserved for deductions and scaling">
          <div className={`${styles.segment} ${styles.goals}`} style={{ width: "30%" }}>Goals 30%</div>
          <div className={`${styles.segment} ${styles.assists}`} style={{ width: "20%" }}>Assists 20%</div>
          <div className={`${styles.segment} ${styles.xg}`} style={{ width: "20%" }}>xG Eff. 20%</div>
          <div className={`${styles.segment} ${styles.mwi}`} style={{ width: "20%" }}>Match-Winning 20%</div>
          <div className={`${styles.segment} ${styles.headroom}`} style={{ width: "10%" }} aria-hidden="true" />
        </div>
        <div className={styles.legend}>
          <span><span className={styles.swatch} style={{ background: "var(--accent)" }} /> Goals — normalized vs. the season&apos;s top scorer</span>
          <span><span className={styles.swatch} style={{ background: "var(--alt)" }} /> Assists — capped contribution score</span>
          <span><span className={styles.swatch} style={{ background: "var(--gold-deep)" }} /> xG Efficiency — goals scored vs. goals expected</span>
          <span><span className={styles.swatch} style={{ background: "var(--accent-deep)" }} /> Match-Winning Impact — scored/assisted in a non-draw</span>
        </div>
      </div>

      <div className={styles.notes}>
        <span className="chip coral">Penalty miss −15</span>
        <span className="chip coral">Red card −20</span>
        <span className="chip lav">× Match Importance (1–10)</span>
        <span className="chip">Normalized 0–100 across the dataset</span>
      </div>

      <p className={styles.text}>
        <strong>Why it exists:</strong>{" "}
        <span className="muted">
          Goals and assists alone reward volume, not occasion. BGPI separates players who
          show up in big games — cup finals, derbies, title run-ins — from players whose
          numbers are padded by low-stakes matches. The gap between a player&apos;s{" "}
          <strong>regular-season BGPI</strong> and their <strong>big-game BGPI</strong> is
          the &quot;uplift&quot; that powers the GOAT Audit verdicts and the comparison chart below.
        </span>
      </p>
    </div>
  );
}
