"use client";

import { useState } from "react";
import { AuditPlayer, getVerdict } from "@/lib/goat";
import VerdictBadge from "./VerdictBadge";
import RankingBadge from "./RankingBadge";
import styles from "./ComparisonPanel.module.css";

interface ComparisonPanelProps {
  players: AuditPlayer[];
}

function PlayerSelect({
  players,
  value,
  onChange,
  label,
}: {
  players: AuditPlayer[];
  value: number;
  onChange: (id: number) => void;
  label: string;
}) {
  return (
    <select
      aria-label={label}
      className={styles.select}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
    >
      {players.map((p) => (
        <option key={p.player_id} value={p.player_id}>
          #{p.rank} · {p.name}
        </option>
      ))}
    </select>
  );
}

function ComparisonSide({ player }: { player: AuditPlayer }) {
  const verdict = getVerdict(player);
  return (
    <div className={styles.side}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <h4 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>{player.name}</h4>
        <RankingBadge rank={player.rank} movement={player.movement} floating={false} />
      </div>
      <div className="muted" style={{ fontSize: 13 }}>
        {player.position} · {player.matches} matches audited
      </div>

      <div>
        <div className={styles.statRow}>
          <span className="muted">Big Game BGPI</span>
          <span className="bgpi" style={{ fontSize: 22 }}>{player.big_game_bgpi}</span>
        </div>
        <div className={styles.statRow}>
          <span className="muted">Regular BGPI</span>
          <span className="num">{player.regular_bgpi ?? "—"}</span>
        </div>
        <div className={styles.statRow}>
          <span className="muted">Big-game uplift</span>
          {player.big_game_uplift != null ? (
            <span className={player.big_game_uplift >= 0 ? "up" : "down"}>
              {player.big_game_uplift > 0 ? "+" : ""}{player.big_game_uplift}
            </span>
          ) : (
            <span className="num">—</span>
          )}
        </div>
        <div className={styles.statRow}>
          <span className="muted">Goals / Assists</span>
          <span className="num">{player.total_goals} / {player.total_assists}</span>
        </div>
        <div className={styles.statRow}>
          <span className="muted">xG over-perf.</span>
          <span className="num">
            {(player.total_goals - player.total_xg) > 0 ? "+" : ""}
            {(player.total_goals - player.total_xg).toFixed(1)}
          </span>
        </div>
      </div>

      <VerdictBadge verdict={verdict} />
    </div>
  );
}

export default function ComparisonPanel({ players }: ComparisonPanelProps) {
  const [idA, setIdA] = useState(players[0]?.player_id);
  const [idB, setIdB] = useState(players[1]?.player_id ?? players[0]?.player_id);

  const playerA = players.find((p) => p.player_id === idA) ?? players[0];
  const playerB = players.find((p) => p.player_id === idB) ?? players[0];

  if (!playerA || !playerB) return null;

  return (
    <div className="card pad reveal">
      <div className="eyebrow">⚖️ Compare</div>
      <h3 className="sec-h" style={{ fontSize: 22, marginTop: 4 }}>Player vs Player</h3>

      <div className={styles.grid}>
        <div>
          <PlayerSelect players={players} value={playerA.player_id} onChange={setIdA} label="Player A" />
          <div style={{ marginTop: 14 }}>
            <ComparisonSide player={playerA} />
          </div>
        </div>

        <div>
          <PlayerSelect players={players} value={playerB.player_id} onChange={setIdB} label="Player B" />
          <div style={{ marginTop: 14 }}>
            <ComparisonSide player={playerB} />
          </div>
        </div>
      </div>
    </div>
  );
}
