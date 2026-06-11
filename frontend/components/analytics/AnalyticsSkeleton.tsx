import { Skeleton, CardSkeleton } from "@/components/Skeleton";
import stripStyles from "./AnalyticsKpiStrip.module.css";
import pageStyles from "@/app/analytics/page.module.css";

export default function AnalyticsSkeleton() {
  return (
    <>
      <span className="sr-only" role="status">Loading analytics…</span>

      <div className={stripStyles.strip} aria-hidden="true">
        {Array.from({ length: 4 }).map((_, i) => (
          <div className="card pad reveal" key={i}>
            <Skeleton style={{ width: "55%", height: 11 }} />
            <Skeleton style={{ width: "40%", height: 30, marginTop: 10 }} />
          </div>
        ))}
      </div>

      <div className={pageStyles.grid2} aria-hidden="true">
        <CardSkeleton height={360} titleWidth={160} className="reveal" />
        <CardSkeleton height={360} titleWidth={160} className="reveal" />
      </div>

      <CardSkeleton height={340} titleWidth={180} className="reveal" />
      <CardSkeleton height={380} titleWidth={160} className="reveal" />
      <CardSkeleton height={300} titleWidth={150} className="reveal" />
    </>
  );
}
