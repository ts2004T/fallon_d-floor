export const dynamic = 'force-dynamic'
import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DashboardHero from "@/components/dashboard/DashboardHero";
import KpiStrip from "@/components/dashboard/KpiStrip";
import RecentMatchCard from "@/components/dashboard/RecentMatchCard";
import LeaderboardPreview from "@/components/dashboard/LeaderboardPreview";
import PlayerHighlight from "@/components/dashboard/PlayerHighlight";
import TrendingInsights from "@/components/dashboard/TrendingInsights";
import {
  KpiStripSkeleton,
  PlayerHighlightSkeleton,
  TrendingInsightsSkeleton,
} from "@/components/dashboard/DashboardSkeletons";
import { getMatches } from "@/lib/api";
import styles from "./page.module.css";

export default async function Home() {
  const matches = await getMatches(1);

  return (
    <>
      <Navbar />
      <main className="wrap">
        <DashboardHero />

        <section className="section">
          <h2 className="eyebrow">At a glance</h2>
          <div style={{ marginTop: 14 }}>
            <Suspense fallback={<KpiStripSkeleton />}>
              <KpiStrip />
            </Suspense>
          </div>
        </section>

        <section className="section">
          <h2 className="eyebrow">Right now</h2>
          <div className={styles.row} style={{ marginTop: 14 }}>
            <LeaderboardPreview />
            <RecentMatchCard match={matches[0] ?? null} />
          </div>
        </section>

        <section className="section">
          <h2 className="eyebrow">Spotlight</h2>
          <div className={styles.row} style={{ marginTop: 14 }}>
            <Suspense fallback={<PlayerHighlightSkeleton />}>
              <PlayerHighlight />
            </Suspense>
            <Suspense fallback={<TrendingInsightsSkeleton />}>
              <TrendingInsights />
            </Suspense>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
