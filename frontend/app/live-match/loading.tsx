import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CardSkeleton } from "@/components/Skeleton";
import PageHead from "./PageHead";
import styles from "./page.module.css";

export default function Loading() {
  return (
    <>
      <Navbar />
      <main className="wrap">
        <PageHead />

        <section className="section" style={{ paddingTop: 30, paddingBottom: 60 }}>
          <span className="sr-only" role="status">Loading match…</span>

          <div className={styles.stack} aria-hidden="true">
            <CardSkeleton height={64} titleWidth={120} className="reveal" />
            <CardSkeleton height={220} titleWidth={160} className="reveal" />
            <CardSkeleton height={200} titleWidth={160} className="reveal" />
            <CardSkeleton height={260} titleWidth={160} className="reveal" />
            <CardSkeleton height={200} titleWidth={160} className="reveal" />
            <CardSkeleton height={180} titleWidth={160} className="reveal" />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
