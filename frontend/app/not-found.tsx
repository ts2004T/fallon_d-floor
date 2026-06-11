import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="wrap">
        <section className="section" style={{ paddingBottom: 60 }}>
          <div className="card pad reveal" style={{ textAlign: "center", maxWidth: "60ch", margin: "40px auto" }}>
            <span className="eyebrow" style={{ justifyContent: "center" }}>404</span>
            <h1 className="sec-h" style={{ marginTop: 12, fontSize: 28 }}>
              This page doesn&apos;t exist.
            </h1>
            <p className="muted" style={{ marginTop: 12 }}>
              The page you&apos;re looking for may have been moved or never existed.
            </p>
            <div style={{ marginTop: 24 }}>
              <Link href="/" className="btn primary">Back to Dashboard</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
