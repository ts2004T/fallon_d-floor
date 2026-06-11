import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Skeleton, CardSkeleton } from "@/components/Skeleton";
import PageHead from "./PageHead";
import styles from "@/components/goat-audit/GoatAuditClient.module.css";

export default function Loading() {
  return (
    <>
      <Navbar />
      <main className="wrap">
        <PageHead />

        <section className="section" style={{ paddingTop: 30, paddingBottom: 60 }}>
          <span className="sr-only" role="status">Loading players…</span>

          <div className={styles.toolbar} aria-hidden="true">
            <Skeleton style={{ flex: "1 1 240px", height: 44 }} />
            <Skeleton style={{ width: 160, height: 44 }} />
            <Skeleton style={{ width: 160, height: 44 }} />
          </div>

          <div className={styles.grid} aria-hidden="true">
            {Array.from({ length: 6 }).map((_, i) => (
              <CardSkeleton key={i} height={300} titleWidth={120} className="reveal" />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
