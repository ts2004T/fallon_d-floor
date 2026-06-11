import { MatchInfo, MatchPlayerStat } from "./api";

const ATTACKING_KEYWORDS = ["forward", "striker", "wing"];
const KNOCKOUT_KEYWORDS = ["final", "semi", "quarter", "knockout", "playoff", "round of"];

export function isAttackingPosition(position: string): boolean {
  const p = position.toLowerCase();
  return ATTACKING_KEYWORDS.some((k) => p.includes(k));
}

function isMidfieldPosition(position: string): boolean {
  return position.toLowerCase().includes("midfield");
}

export function isKnockoutRound(roundType: string): boolean {
  const r = roundType.toLowerCase();
  return KNOCKOUT_KEYWORDS.some((k) => r.includes(k));
}

export interface MatchNarrative {
  headline: string;
  body: string;
  tags: string[];
}

/**
 * Rule-based narrative generator. Every clause is derived from real fields
 * on the match/players response — no invented events or commentary.
 */
export function generateNarrative(match: MatchInfo, players: MatchPlayerStat[]): MatchNarrative {
  const totalGoals = match.home_score + match.away_score;
  const goalDiff = Math.abs(match.home_score - match.away_score);
  const totalXg = players.reduce((sum, p) => sum + p.xg, 0);
  const totalTrackedGoals = players.reduce((sum, p) => sum + p.goals, 0);
  const xgDiff = totalTrackedGoals - totalXg;

  const sorted = [...players].sort((a, b) => b.bgpi - a.bgpi);
  const top = sorted[0];
  const top3 = sorted.slice(0, 3);
  const midfieldCount = top3.filter((p) => isMidfieldPosition(p.position)).length;
  const knockout = isKnockoutRound(match.round_type) || match.match_importance_score >= 8;

  let headline: string;
  if (top && knockout && top.bgpi >= 70) {
    headline = "Clutch Knockout Performance";
  } else if (totalGoals >= 5) {
    headline = "High-Scoring Shootout";
  } else if (totalGoals <= 1) {
    headline = "Defensive Masterclass";
  } else if (goalDiff >= 3) {
    headline = "One-Sided Statement";
  } else if (midfieldCount >= 2) {
    headline = "Midfield Dominance";
  } else if (xgDiff >= 1.5) {
    headline = "Clinical Finishing Display";
  } else {
    headline = "Tight Contest";
  }

  const tags: string[] = [];
  if (match.match_importance_score >= 7) tags.push("High Stakes");
  if (knockout) tags.push("Knockout Football");
  if (xgDiff >= 1.5) tags.push("Overperformed xG");
  if (-xgDiff >= 1.5) tags.push("Wasteful Finishing");

  const sentences: string[] = [
    `${match.home_team} ${match.home_score}–${match.away_score} ${match.away_team} in the ${match.competition} (${match.round_type}), rated ${match.match_importance_score.toFixed(1)}/10 for match importance.`,
  ];

  if (top) {
    sentences.push(
      `${top.name} (${top.position}) led all tracked performers with a BGPI of ${top.bgpi}, recording ${top.goals} goal${top.goals === 1 ? "" : "s"}, ${top.assists} assist${top.assists === 1 ? "" : "s"} and ${top.xg.toFixed(2)} xG across ${top.minutes_played} minutes.`
    );
  }

  let xgClause = ".";
  if (xgDiff >= 0.5) {
    xgClause = " — finishing was clinical relative to the chances created.";
  } else if (xgDiff <= -0.5) {
    xgClause = " — several chances went begging in front of goal.";
  }
  sentences.push(
    `Tracked performers combined for ${totalTrackedGoals} goal${totalTrackedGoals === 1 ? "" : "s"} from ${totalXg.toFixed(2)} expected goals${xgClause}`
  );

  return { headline, body: sentences.join(" "), tags };
}

export interface TopPerformers {
  highestBgpi?: MatchPlayerStat;
  mostImpactfulAttacker?: MatchPlayerStat;
  mostEfficientFinisher?: MatchPlayerStat & { xgDiff: number };
  highestUpliftPerformer?: MatchPlayerStat;
}

/** Section 3 — identifies the standout roles for this match from real per-player rows. */
export function getTopPerformers(players: MatchPlayerStat[]): TopPerformers {
  if (players.length === 0) return {};

  const highestBgpi = [...players].sort((a, b) => b.bgpi - a.bgpi)[0];

  const mostImpactfulAttacker = [...players].sort((a, b) => {
    const score = (p: MatchPlayerStat) => p.goals * 2 + p.assists;
    return score(b) - score(a) || b.xg - a.xg;
  })[0];

  const scorers = players.filter((p) => p.goals > 0);
  const mostEfficientFinisher = scorers.length
    ? scorers
        .map((p) => ({ ...p, xgDiff: p.goals - p.xg }))
        .sort((a, b) => b.xgDiff - a.xgDiff)[0]
    : undefined;

  const withUplift = players.filter((p): p is MatchPlayerStat & { big_game_uplift: number } => p.big_game_uplift != null);
  const highestUpliftPerformer = withUplift.length
    ? [...withUplift].sort((a, b) => b.big_game_uplift - a.big_game_uplift)[0]
    : undefined;

  return { highestBgpi, mostImpactfulAttacker, mostEfficientFinisher, highestUpliftPerformer };
}

export interface MatchInsights {
  highestBgpi?: MatchPlayerStat;
  xgOverperformer?: MatchPlayerStat & { xgDiff: number };
  mostEfficient?: MatchPlayerStat & { per90: number };
  unexpectedContributor?: MatchPlayerStat;
}

/** Section 5 — analytical insight cards, each grounded in a specific stat comparison. */
export function generateMatchInsights(players: MatchPlayerStat[]): MatchInsights {
  if (players.length === 0) return {};

  const highestBgpi = [...players].sort((a, b) => b.bgpi - a.bgpi)[0];

  const xgOverperformer = [...players]
    .map((p) => ({ ...p, xgDiff: p.goals - p.xg }))
    .sort((a, b) => b.xgDiff - a.xgDiff)[0];

  const efficient = players.filter((p) => p.minutes_played > 0 && p.goals + p.assists > 0);
  const mostEfficient = efficient.length
    ? efficient
        .map((p) => ({ ...p, per90: ((p.goals + p.assists) / p.minutes_played) * 90 }))
        .sort((a, b) => b.per90 - a.per90)[0]
    : undefined;

  const nonAttacking = players.filter((p) => !isAttackingPosition(p.position));
  const unexpectedContributor = nonAttacking.length
    ? [...nonAttacking].sort((a, b) => b.bgpi - a.bgpi)[0]
    : undefined;

  return { highestBgpi, xgOverperformer, mostEfficient, unexpectedContributor };
}

/** Sum of the four BGPI components — a player's raw contribution before global normalisation. */
export function contributionScore(p: MatchPlayerStat): number {
  return Math.round((p.goals_score + p.assists_score + p.xg_efficiency + p.match_winning_impact) * 10) / 10;
}

export function formatMatchDate(date: string | null): string {
  if (!date) return "Date unknown";
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return "Date unknown";
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

export function formatShortDate(date: string | null): string {
  if (!date) return "—";
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return "—";
  return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
}
