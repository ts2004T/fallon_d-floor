import Link from "next/link";
import styles from "./MethodCallout.module.css";

export default function MethodCallout() {
  return (
    <div className={`card pad reveal ${styles.callout}`}>
      <div className="eyebrow">Method</div>
      <p className={styles.text}>
        <strong>How the verdict is reached:</strong>{" "}
        <span className="muted">
          BGPI combines goals, assists, xG efficiency, match importance, and game-winning
          contributions into a single 0–100 score. A goal in a relegation six-pointer is
          worth more than a tap-in at 5–0. The ranking badge compares each player&apos;s
          big-game rank against their regular-season rank — that&apos;s the ▲▼▬ you see
          on every card.
        </span>
      </p>
      <Link href="/analytics" className="btn lav sm">See the maths →</Link>
    </div>
  );
}
