import { LeaderboardPlayer } from "./api";

export interface DistributionBucket {
  label: string;
  count: number;
}

/** Buckets players into BGPI ranges (0-10, 10-20, ... 90-100) by big_game_bgpi. */
export function buildDistribution(players: LeaderboardPlayer[], bucketSize = 10): DistributionBucket[] {
  const bucketCount = Math.ceil(100 / bucketSize);
  const buckets: DistributionBucket[] = Array.from({ length: bucketCount }, (_, i) => ({
    label: `${i * bucketSize}–${(i + 1) * bucketSize}`,
    count: 0,
  }));

  players.forEach((p) => {
    let idx = Math.floor(p.big_game_bgpi / bucketSize);
    if (idx >= bucketCount) idx = bucketCount - 1;
    if (idx < 0) idx = 0;
    buckets[idx].count += 1;
  });

  return buckets;
}

export type PerformanceCategory = "big-game" | "riser" | "consistent" | "stat-merchant";

export interface CategoryMeta {
  label: string;
  description: string;
  color: string;
}

export const CATEGORY_META: Record<PerformanceCategory, CategoryMeta> = {
  "big-game": {
    label: "Big Game Player",
    description: "Strong week-to-week form that gets even stronger when it matters.",
    color: "var(--accent)",
  },
  riser: {
    label: "Under-Pressure Riser",
    description: "Modest week-to-week numbers, but steps up when the stakes rise.",
    color: "var(--gold-deep)",
  },
  consistent: {
    label: "Consistent Performer",
    description: "Performs at roughly the same level regardless of the occasion.",
    color: "var(--alt)",
  },
  "stat-merchant": {
    label: "Stat Merchant",
    description: "Strong regular-season numbers that fade when it matters most.",
    color: "var(--negative)",
  },
};

const UPLIFT_THRESHOLD = 3;
const ELITE_THRESHOLD = 50;

export interface CategorizedPlayer extends LeaderboardPlayer {
  category: PerformanceCategory;
}

/**
 * Classifies a player by comparing regular-season BGPI to big-game BGPI.
 * Returns null for players with no regular-season baseline (can't be plotted).
 */
export function categorizePerformance(p: LeaderboardPlayer): PerformanceCategory | null {
  if (p.regular_bgpi == null || p.big_game_uplift == null) return null;
  const uplift = p.big_game_uplift;

  if (uplift >= UPLIFT_THRESHOLD) {
    return p.big_game_bgpi >= ELITE_THRESHOLD ? "big-game" : "riser";
  }
  if (uplift <= -UPLIFT_THRESHOLD) return "stat-merchant";
  return "consistent";
}

export function buildCategorizedPlayers(players: LeaderboardPlayer[]): CategorizedPlayer[] {
  return players.flatMap((p) => {
    const category = categorizePerformance(p);
    return category ? [{ ...p, category }] : [];
  });
}

export interface XgRanking extends LeaderboardPlayer {
  xgDiff: number;
}

/** Returns the top N goals-vs-xG over- and under-performers. */
export function buildXgRankings(players: LeaderboardPlayer[], n = 5) {
  const withDiff: XgRanking[] = players.map((p) => ({ ...p, xgDiff: p.total_goals - p.total_xg }));
  const overperformers = [...withDiff].sort((a, b) => b.xgDiff - a.xgDiff).slice(0, n);
  const underperformers = [...withDiff]
    .sort((a, b) => a.xgDiff - b.xgDiff)
    .slice(0, n)
    .filter((p) => p.xgDiff < 0);
  return { overperformers, underperformers };
}

export function topByBigGameBGPI(players: LeaderboardPlayer[]): LeaderboardPlayer | undefined {
  return [...players].sort((a, b) => b.big_game_bgpi - a.big_game_bgpi)[0];
}

export function topByUplift(players: LeaderboardPlayer[]): LeaderboardPlayer | undefined {
  const withUplift = players.filter((p) => p.big_game_uplift != null);
  return withUplift.sort((a, b) => b.big_game_uplift! - a.big_game_uplift!)[0];
}

export function mostConsistent(players: LeaderboardPlayer[]): LeaderboardPlayer | undefined {
  const withUplift = players.filter((p) => p.big_game_uplift != null);
  return withUplift.sort((a, b) => Math.abs(a.big_game_uplift!) - Math.abs(b.big_game_uplift!))[0];
}
