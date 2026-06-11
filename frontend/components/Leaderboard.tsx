import { getLeaderboard } from "@/lib/api";
import { initials, lastName } from "@/lib/format";

const AVATAR_VARIANTS = ["a1", "a2", "a3", "a4", "a5"];

interface LeaderboardProps {
  limit?: number;
}

export default async function Leaderboard({ limit = 10 }: LeaderboardProps) {
  const players = (await getLeaderboard(10, 10)).slice(0, limit);

  return (
    <div>
      {players.map((p, i) => (
        <div className="rrow" key={p.player_id}>
          <span className="rk">{i + 1}</span>
          <div className={`av ${AVATAR_VARIANTS[i % AVATAR_VARIANTS.length]}`} style={{ width: 36, height: 36, fontSize: 13 }}>
            {initials(p.name)}
          </div>
          <div>
            <div className="nm">{lastName(p.name)}</div>
            <div className="faint" style={{ fontSize: 12 }}>
              {p.position} · {p.matches} matches
            </div>
          </div>
          <div className="meta">
            <span className="bgpi" style={{ fontSize: 22 }}>{p.big_game_bgpi}</span>
            {p.big_game_uplift != null && (
              <span className={p.big_game_uplift > 0 ? "up" : "down"} style={{ fontSize: 14 }}>
                {p.big_game_uplift > 0 ? "+" : ""}{p.big_game_uplift}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
