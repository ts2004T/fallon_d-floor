import { Suspense } from "react";
import Link from "next/link";
import Leaderboard from "@/components/Leaderboard";
import { LeaderboardRowsSkeleton } from "./DashboardSkeletons";

export default function LeaderboardPreview() {
  return (
    <div className="card pad hoverable reveal">
      <div className="section-head" style={{ marginBottom: 14 }}>
        <div>
          <div className="eyebrow">🐐 GOAT Leaderboard</div>
          <h3 className="sec-h" style={{ fontSize: 22, marginTop: 4 }}>Big Game Rankings</h3>
        </div>
        <span className="chip pink">Live Data</span>
      </div>

      <Suspense fallback={<LeaderboardRowsSkeleton />}>
        <Leaderboard limit={5} />
      </Suspense>

      <div style={{ marginTop: 16 }}>
        <Link href="/goat-audit" className="linkmore">View full GOAT Audit →</Link>
      </div>
    </div>
  );
}
