export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export interface LeaderboardPlayer {
  player_id: number;
  name: string;
  position: string;
  avg_bgpi: number;
  big_game_bgpi: number;
  regular_bgpi: number | null;
  big_game_uplift: number | null;
  matches: number;
  total_goals: number;
  total_assists: number;
  total_xg: number;
}

export interface StatsSummary {
  total_players: number;
  total_matches: number;
  total_records: number;
  avg_bgpi: number;
}

export async function getLeaderboard(limit = 10, minMatches = 10): Promise<LeaderboardPlayer[]> {
  const res = await fetch(`${API_URL}/api/leaderboard?limit=${limit}&min_matches=${minMatches}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error("Failed to fetch leaderboard");
  const data = await res.json();
  return data.leaderboard;
}

export async function getStatsSummary(): Promise<StatsSummary> {
  const res = await fetch(`${API_URL}/api/stats/summary`, {
    next: { revalidate: 300 },
  });
  if (!res.ok) throw new Error("Failed to fetch stats summary");
  return res.json();
}

export interface RecentMatch {
  match_date: string | null;
  home_team: string;
  away_team: string;
  round_type: string;
  match_importance_score: number;
  goals: number;
  assists: number;
  xg: number;
  bgpi: number;
}

export interface PlayerDetail {
  player_id: number;
  name: string;
  position: string;
  avg_bgpi: number;
  big_game_bgpi: number;
  regular_bgpi: number | null;
  matches: number;
  total_goals: number;
  total_assists: number;
  total_xg: number;
  bgpi_std: number;
}

export interface PlayerDetailResponse {
  player: PlayerDetail;
  recent_matches: RecentMatch[];
}

export async function getPlayer(playerId: number): Promise<PlayerDetailResponse> {
  const res = await fetch(`${API_URL}/api/player/${playerId}`);
  if (!res.ok) throw new Error("Failed to fetch player");
  return res.json();
}
