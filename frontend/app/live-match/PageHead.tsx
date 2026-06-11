import styles from "./page.module.css";

export default function PageHead() {
  return (
    <section className={`${styles.pagehead} reveal`}>
      <span className="eyebrow" style={{ justifyContent: "center" }}>Match Intelligence</span>
      <h1>What happened — and why it happened.</h1>
      <p className={styles.sub}>
        An analyst&apos;s read on a single match: who shaped the result, how their numbers stack up, and
        what the BGPI engine made of it. Built from real audited match data — no fabricated events.
      </p>
    </section>
  );
}
