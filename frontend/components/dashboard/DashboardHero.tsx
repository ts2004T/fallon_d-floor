import Link from "next/link";
import styles from "./DashboardHero.module.css";

export default function DashboardHero() {
  return (
    <section className={styles.hero}>
      <span className={styles.kicker}>
        ⚽ Football, fact-checked — without the spreadsheet face.
      </span>
      <h1 className={`${styles.title} display`}>
        Can your favorite player do it on a{" "}
        <span className={styles.pop}>rainy Tuesday?</span>
      </h1>
      <p className={styles.sub}>
        Separating Big Game Players from Stat Merchants.
      </p>
      <div className={styles.ctas}>
        <Link href="/goat-audit" className="btn primary">
          🐐 Start GOAT Audit
        </Link>
        <Link href="/analytics" className="btn">
          📊 View Analytics
        </Link>
      </div>
    </section>
  );
}
