import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MethodologyExplainer from "@/components/analytics/MethodologyExplainer";
import AnalyticsKpiStrip from "@/components/analytics/AnalyticsKpiStrip";
import BGPIDistribution from "@/components/analytics/BGPIDistribution";
import PerformanceComparison from "@/components/analytics/PerformanceComparison";
import XGAnalysis from "@/components/analytics/XGAnalysis";
import PlayerDrilldown from "@/components/analytics/PlayerDrilldown";
import InsightsPanel from "@/components/analytics/InsightsPanel";
import { getLeaderboard, getStatsSummary } from "@/lib/api";
import styles from "./page.module.css";

export default async function AnalyticsPage() {
  const [stats, leaderboard] = await Promise.all([
    getStatsSummary(),
    getLeaderboard(100, 10),
  ]);

  const players = leaderboard.map(({ player_id, name, position }) => ({ player_id, name, position }));

  return (
    <>
      <Navbar />
      <main className="wrap">
        <section className={`${styles.pagehead} reveal`}>
          <span className="eyebrow" style={{ justifyContent: "center" }}>Analytics</span>
          <h1>The maths behind the jokes.</h1>
          <p className={styles.sub}>
            Every visualization on this page answers a question, using real BGPI data from
            the audited player pool — no fabricated stats, no decorative charts.
          </p>
        </section>

        <section className="section" style={{ paddingTop: 30, paddingBottom: 60 }}>
          <div className={styles.stack}>
            <MethodologyExplainer />

            <AnalyticsKpiStrip stats={stats} leaderboard={leaderboard} />

            <div className={styles.grid2}>
              <BGPIDistribution leaderboard={leaderboard} />
              <PerformanceComparison leaderboard={leaderboard} />
            </div>

            <XGAnalysis leaderboard={leaderboard} />

            <PlayerDrilldown players={players} />

            <InsightsPanel leaderboard={leaderboard} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
