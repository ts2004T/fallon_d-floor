import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GoatAuditClient from "@/components/goat-audit/GoatAuditClient";
import PageHead from "./PageHead";
import { getLeaderboard } from "@/lib/api";
import { buildAuditPlayers } from "@/lib/goat";

export default async function GoatAuditPage() {
  const leaderboard = await getLeaderboard(50, 10);
  const players = buildAuditPlayers(leaderboard);

  return (
    <>
      <Navbar />
      <main className="wrap">
        <PageHead />

        <section className="section" style={{ paddingTop: 30, paddingBottom: 60 }}>
          <GoatAuditClient players={players} />
        </section>
      </main>
      <Footer />
    </>
  );
}
