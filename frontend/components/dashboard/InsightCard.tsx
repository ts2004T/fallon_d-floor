import Link from "next/link";
import type { ReactNode } from "react";

interface InsightCardProps {
  eyebrow: string;
  children: ReactNode;
  href?: string;
  linkLabel?: string;
}

export default function InsightCard({ eyebrow, children, href, linkLabel }: InsightCardProps) {
  return (
    <div className="card pad hoverable reveal" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div className="eyebrow">{eyebrow}</div>
      <p className="display" style={{ fontSize: 17, marginTop: 12, flex: 1 }}>
        {children}
      </p>
      {href && (
        <Link href={href} className="linkmore" style={{ marginTop: 12 }}>
          {linkLabel ?? "Learn more →"}
        </Link>
      )}
    </div>
  );
}
