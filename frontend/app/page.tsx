import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import DashboardHero from "@/components/dashboard/DashboardHero";
import KpiStrip from "@/components/dashboard/KpiStrip";
import LiveMatchPreview from "@/components/dashboard/LiveMatchPreview";
import LeaderboardPreview from "@/components/dashboard/LeaderboardPreview";
import PlayerHighlight from "@/components/dashboard/PlayerHighlight";
import TrendingInsights from "@/components/dashboard/TrendingInsights";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="wrap">
        <DashboardHero />

        <section className="section">
          <h2 className="eyebrow">At a glance</h2>
          <div style={{ marginTop: 14 }}>
            <Suspense fallback={<p className="muted">Loading stats...</p>}>
              <KpiStrip />
            </Suspense>
          </div>
        </section>

        <section className="section">
          <h2 className="eyebrow">Right now</h2>
          <div className={styles.row} style={{ marginTop: 14 }}>
            <Suspense fallback={<p className="muted">Loading leaderboard...</p>}>
              <LeaderboardPreview />
            </Suspense>
            <LiveMatchPreview />
          </div>
        </section>

        <section className="section">
          <h2 className="eyebrow">Spotlight</h2>
          <div className={styles.row} style={{ marginTop: 14 }}>
            <Suspense fallback={<p className="muted">Loading player...</p>}>
              <PlayerHighlight />
            </Suspense>
            <Suspense fallback={<p className="muted">Loading insights...</p>}>
              <TrendingInsights />
            </Suspense>
          </div>
        </section>
      </main>
    </>
  );
}
