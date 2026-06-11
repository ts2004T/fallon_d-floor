import type { Verdict } from "@/lib/goat";

interface VerdictBadgeProps {
  verdict: Verdict;
  showBlurb?: boolean;
}

export default function VerdictBadge({ verdict, showBlurb = true }: VerdictBadgeProps) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 9, flexWrap: "wrap" }}>
      <span className={`chip ${verdict.tone}`}>{verdict.label}</span>
      {showBlurb && <span className="muted" style={{ fontSize: 13.5 }}>{verdict.blurb}</span>}
    </div>
  );
}
