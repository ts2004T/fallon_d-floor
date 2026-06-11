"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";

const NAV_LINKS = [
  { href: "/", label: "Dashboard" },
  { href: "/live-match", label: "Live Match" },
  { href: "/goat-audit", label: "GOAT Audit" },
  { href: "/analytics", label: "Analytics" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <header className={`nav${open ? " open" : ""}`}>
      <div className="nav-in">
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

        <nav className="navlinks" aria-label="Primary">
          {NAV_LINKS.map(({ href, label }) => (
            <Link key={href} href={href} className={pathname === href ? "active" : ""}>
              {label}
            </Link>
          ))}
        </nav>

        <div className="nav-right">
          <ThemeToggle />
          <button
            type="button"
            className="nav-burger"
            aria-expanded={open}
            aria-label="Menu"
            onClick={() => setOpen((o) => !o)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      <nav className="nav-mobile" aria-label="Primary, mobile">
        {NAV_LINKS.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={pathname === href ? "active" : ""}
            onClick={() => setOpen(false)}
          >
            {label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
