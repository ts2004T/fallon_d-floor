import styles from "./page.module.css";

export default function PageHead() {
  return (
    <section className={`${styles.pagehead} reveal`}>
      <span className="eyebrow" style={{ justifyContent: "center" }}>GOAT Audit</span>
      <h1>Clutch, or just padding? Let&apos;s check the receipts.</h1>
      <p className={styles.sub}>
        Every player gets one honest Big Game Index — and one slightly unserious verdict.
        No spreadsheet knowledge required.
      </p>
    </section>
  );
}
