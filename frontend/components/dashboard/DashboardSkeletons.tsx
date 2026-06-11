import { Skeleton, CardSkeleton } from "@/components/Skeleton";
import stripStyles from "./KpiStrip.module.css";
import stackStyles from "./TrendingInsights.module.css";

export function KpiStripSkeleton() {
  return (
    <>
      <span className="sr-only" role="status">Loading stats…</span>
      <div className={stripStyles.strip} aria-hidden="true">
        {Array.from({ length: 4 }).map((_, i) => (
          <div className="card pad reveal" key={i}>
            <Skeleton style={{ width: "55%", height: 11 }} />
            <Skeleton style={{ width: "40%", height: 30, marginTop: 10 }} />
          </div>
        ))}
      </div>
    </>
  );
}

export function LeaderboardRowsSkeleton() {
  return (
    <>
      <span className="sr-only" role="status">Loading rankings…</span>
      <div aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => (
          <div className="rrow" key={i}>
            <Skeleton style={{ width: 36, height: 36, borderRadius: "50%", flex: "0 0 auto" }} />
            <Skeleton style={{ width: "45%", height: 14 }} />
            <Skeleton style={{ width: 56, height: 14, marginLeft: "auto" }} />
          </div>
        ))}
      </div>
    </>
  );
}

export function PlayerHighlightSkeleton() {
  return (
    <div className="card pad reveal" style={{ height: "100%" }} aria-hidden="true">
      <span className="sr-only" role="status">Loading player…</span>
      <Skeleton style={{ width: 130, height: 11 }} />
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 14 }}>
        <Skeleton style={{ width: 56, height: 56, borderRadius: "50%", flex: "0 0 auto" }} />
        <div style={{ flex: 1 }}>
          <Skeleton style={{ width: "70%", height: 16 }} />
          <Skeleton style={{ width: "45%", height: 12, marginTop: 8 }} />
        </div>
        <Skeleton style={{ width: 48, height: 30 }} />
      </div>
      <Skeleton style={{ width: "100%", height: 13, marginTop: 18 }} />
      <Skeleton style={{ width: "85%", height: 13, marginTop: 8 }} />
    </div>
  );
}

export function TrendingInsightsSkeleton() {
  return (
    <>
      <span className="sr-only" role="status">Loading insights…</span>
      <div className={stackStyles.stack} aria-hidden="true">
        <CardSkeleton height={150} className="reveal" />
        <CardSkeleton height={150} className="reveal" />
      </div>
    </>
  );
}
