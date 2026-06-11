import { LeaderboardPlayer } from "./api";

export interface AuditPlayer extends LeaderboardPlayer {
  rank: number;
  baselineRank: number;
  movement: number;
}

export type VerdictTone = "mint" | "lav" | "coral" | "gold";

export interface Verdict {
  label: string;
  tone: VerdictTone;
  blurb: string;
}

export function buildAuditPlayers(players: LeaderboardPlayer[]): AuditPlayer[] {
  const byBaseline = [...players].sort((a, b) => b.avg_bgpi - a.avg_bgpi);
  const baselineRanks = new Map<number, number>();
  byBaseline.forEach((p, i) => baselineRanks.set(p.player_id, i + 1));

  return players.map((p, i) => {
    const rank = i + 1;
    const baselineRank = baselineRanks.get(p.player_id) ?? rank;
    return { ...p, rank, baselineRank, movement: baselineRank - rank };
  });
}

export function getVerdict(player: AuditPlayer): Verdict {
  const uplift = player.big_game_uplift;

  if (uplift == null) {
    return {
      label: "Big-Game Specialist",
      tone: "gold",
      blurb: "No regular-season baseline on record — pure big-game sample.",
    };
  }
  if (uplift >= 5) {
    return {
      label: "Certified Clutch",
      tone: "mint",
      blurb: "Elevates when it matters most.",
    };
  }
  if (uplift >= 1) {
    return {
      label: "Big-Game Merchant",
      tone: "mint",
      blurb: "Turns up a notch on the big stage.",
    };
  }
  if (uplift > -1) {
    return {
      label: "Steady Eddie",
      tone: "lav",
      blurb: "Same player, every rainy Tuesday.",
    };
  }
  if (uplift > -5) {
    return {
      label: "Jury's Still Out",
      tone: "lav",
      blurb: "Numbers dip when the lights are brightest.",
    };
  }
  return {
    label: "Stat-Merchant Alert",
    tone: "coral",
    blurb: "Padding the regular season, missing in the big ones.",
  };
}

export function movementSymbol(movement: number): "▲" | "▼" | "▬" {
  if (movement > 0) return "▲";
  if (movement < 0) return "▼";
  return "▬";
}
