import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MethodologyExplainer from "@/components/analytics/MethodologyExplainer";
import AnalyticsDataSections from "@/components/analytics/AnalyticsDataSections";
import AnalyticsSkeleton from "@/components/analytics/AnalyticsSkeleton";
import styles from "./page.module.css";

export default function AnalyticsPage() {
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

            <Suspense fallback={<AnalyticsSkeleton />}>
              <AnalyticsDataSections />
            </Suspense>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
