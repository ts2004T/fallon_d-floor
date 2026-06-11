import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GoatAuditClient from "@/components/goat-audit/GoatAuditClient";
import { getLeaderboard } from "@/lib/api";
import { buildAuditPlayers } from "@/lib/goat";
import styles from "./page.module.css";

export default async function GoatAuditPage() {
  const leaderboard = await getLeaderboard(50, 10);
  const players = buildAuditPlayers(leaderboard);

  return (
    <>
      <Navbar />
      <main className="wrap">
        <section className={`${styles.pagehead} reveal`}>
          <span className="eyebrow" style={{ justifyContent: "center" }}>GOAT Audit</span>
          <h1>Clutch, or just padding? Let&apos;s check the receipts.</h1>
          <p className={styles.sub}>
            Every player gets one honest Big Game Index — and one slightly unserious verdict.
            No spreadsheet knowledge required.
          </p>
        </section>

        <section className="section" style={{ paddingTop: 30, paddingBottom: 60 }}>
          <GoatAuditClient players={players} />
        </section>
      </main>
      <Footer />
    </>
  );
}
