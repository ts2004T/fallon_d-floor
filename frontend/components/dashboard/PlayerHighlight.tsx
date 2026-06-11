import { getLeaderboard } from "@/lib/api";
import { initials, lastName } from "@/lib/format";

export default async function PlayerHighlight() {
  const leaderboard = await getLeaderboard(10, 10);
  const player = leaderboard[0];

  if (!player) return null;

  return (
    <div className="card pad hoverable reveal" style={{ height: "100%" }}>
      <div className="eyebrow">⭐ Player of the Day</div>

      <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 14 }}>
        <div className="av a1" style={{ width: 56, height: 56, fontSize: 18 }}>
          {initials(player.name)}
        </div>
        <div>
          <div style={{ fontSize: 19, fontWeight: 700 }}>{player.name}</div>
          <div className="faint" style={{ fontSize: 13 }}>
            {player.position} · {player.matches} matches
          </div>
        </div>
        <div style={{ marginLeft: "auto", textAlign: "right" }}>
          <span className="bgpi" style={{ fontSize: 30 }}>{player.big_game_bgpi}</span>
          <div className="faint" style={{ fontSize: 11.5, textTransform: "uppercase", letterSpacing: ".06em" }}>
            Big Game BGPI
          </div>
        </div>
      </div>

      <p className="muted" style={{ marginTop: 16, fontSize: 14.5, lineHeight: 1.6 }}>
        {lastName(player.name)} is currently topping the GOAT Leaderboard, posting a Big Game
        BGPI of {player.big_game_bgpi} across {player.matches} audited matches
        {player.big_game_uplift != null && (
          <>
            {" "}— a{" "}
            <span className={player.big_game_uplift > 0 ? "up" : "down"}>
              {player.big_game_uplift > 0 ? "+" : ""}{player.big_game_uplift}
            </span>{" "}
            shift versus regular fixtures
          </>
        )}
        .
      </p>
    </div>
  );
}
