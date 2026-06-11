"use client";

import { useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
      <Navbar />
      <main className="wrap">
        <section className="section" style={{ paddingBottom: 60 }}>
          <div className="card pad reveal" style={{ textAlign: "center", maxWidth: "60ch", margin: "40px auto" }}>
            <span className="eyebrow" style={{ justifyContent: "center" }}>Something went wrong</span>
            <h1 className="sec-h" style={{ marginTop: 12, fontSize: 28 }}>
              We couldn&apos;t load this page.
            </h1>
            <p className="muted" style={{ marginTop: 12 }}>
              This is usually temporary — try again, or head back to the Dashboard.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 24, flexWrap: "wrap" }}>
              <button type="button" className="btn primary" onClick={() => reset()}>
                Try again
              </button>
              <Link href="/" className="btn">Back to Dashboard</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
