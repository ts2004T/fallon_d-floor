import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-in">
        <div style={{ flex: 1, minWidth: 220 }}>
          <Link href="/" className="brand">
            <svg className="ball" viewBox="0 0 32 32" aria-hidden="true">
              <circle cx="16" cy="16" r="13.3" fill="none" stroke="currentColor" strokeWidth="2" />
              <polygon points="16,9.4 20.8,12.9 19,18.5 13,18.5 11.2,12.9" fill="var(--accent)" />
              <path
                d="M16 9.4V4.1M20.8 12.9L26.1 10.3M19 18.5L22.8 23.5M13 18.5L9.2 23.5M11.2 12.9L5.9 10.3"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
              />
            </svg>
            Fallon d&apos;Floor<span className="tm">™</span>
          </Link>
          <p className="muted" style={{ margin: "12px 0 0", maxWidth: "34ch" }}>
            Football performance analytics. Big-game impact, quantified from event-level match data.
          </p>
        </div>
        <div style={{ display: "flex", gap: 48, flexWrap: "wrap" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
            <strong className="eyebrow">Explore</strong>
            <Link href="/">Dashboard</Link>
            <Link href="/live-match">Live Match</Link>
            <Link href="/goat-audit">GOAT Audit</Link>
            <Link href="/analytics">Analytics</Link>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
            <strong className="eyebrow">Built with</strong>
            <span>Python · SQL</span>
            <span>FastAPI · Next.js</span>
            <span>PostgreSQL</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
