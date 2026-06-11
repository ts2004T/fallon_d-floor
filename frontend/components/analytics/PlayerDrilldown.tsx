"use client";

import { useEffect, useMemo, useState } from "react";
import { LeaderboardPlayer, PlayerDetailResponse, getPlayer } from "@/lib/api";
import BGPIMeter from "@/components/goat-audit/BGPIMeter";
import styles from "./PlayerDrilldown.module.css";

interface PlayerDrilldownProps {
  players: Pick<LeaderboardPlayer, "player_id" | "name" | "position">[];
}

function formatDate(date: string | null): string {
  if (!date) return "—";
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return "—";
  return `${d.getMonth() + 1}/${d.getDate()}`;
}

export default function PlayerDrilldown({ players }: PlayerDrilldownProps) {
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<number | null>(players[0]?.player_id ?? null);
  const [detail, setDetail] = useState<PlayerDetailResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return players;
    return players.filter((p) => p.name.toLowerCase().includes(q));
  }, [players, search]);

  useEffect(() => {
    if (selectedId == null) return;
    let cancelled = false;
    setLoading(true);
    setError(null);
    getPlayer(selectedId)
      .then((data) => {
        if (!cancelled) setDetail(data);
      })
      .catch(() => {
        if (!cancelled) {
          setError("Couldn't load this player's data.");
          setDetail(null);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [selectedId]);

  const trend = useMemo(() => {
    if (!detail) return [];
    return [...detail.recent_matches].reverse();
  }, [detail]);

  return (
    <div className="card pad reveal">
      <div className={styles.head}>
        <div className="eyebrow">Section 6 · Player Drilldown</div>
        <h3 className={styles.title}>Player Drilldown</h3>
        <p className={styles.question}>How has this player trended across their recent matches?</p>
      </div>

      <div className={styles.layout}>
        <div className={styles.searchCol}>
          <label htmlFor="analytics-player-search" className="eyebrow" style={{ display: "block", marginBottom: 2 }}>
            Search players
          </label>
          <input
            id="analytics-player-search"
            type="search"
            className={styles.input}
            placeholder="Search by player name…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className={styles.list} role="listbox" aria-label="Players">
            {filtered.map((p) => (
              <button
                key={p.player_id}
                type="button"
                role="option"
                aria-selected={p.player_id === selectedId}
                className={`${styles.item} ${p.player_id === selectedId ? styles.active : ""}`}
                onClick={() => setSelectedId(p.player_id)}
              >
                <span className={styles.itemName}>{p.name}</span>
                <span className={styles.itemMeta}>{p.position}</span>
              </button>
            ))}
            {filtered.length === 0 && <p className="muted" style={{ fontSize: 13.5 }}>No players match.</p>}
          </div>
        </div>

        <div className={styles.detail}>
          {loading && <p className={styles.state}>Loading player…</p>}
          {error && <p className={styles.state}>{error}</p>}

          {!loading && !error && detail && (
            <>
              <div className={styles.detailHead}>
                <div>
                  <div className={styles.detailName}>{detail.player.name}</div>
                  <div className={styles.detailMeta}>
                    {detail.player.position} · {detail.player.matches} matches audited · BGPI σ {detail.player.bgpi_std}
                  </div>
                </div>
                <div className="bgpi" style={{ fontSize: 36 }}>{detail.player.big_game_bgpi}</div>
              </div>

              <BGPIMeter value={detail.player.big_game_bgpi} compareValue={detail.player.regular_bgpi} />

              <div className={styles.statGrid}>
                <div className={styles.stat}>
                  <div className={styles.statValue}>{detail.player.avg_bgpi}</div>
                  <div className={styles.statLabel}>Average BGPI</div>
                </div>
                <div className={styles.stat}>
                  <div className={styles.statValue}>{detail.player.regular_bgpi ?? "—"}</div>
                  <div className={styles.statLabel}>Regular BGPI</div>
                </div>
                <div className={styles.stat}>
                  <div className={styles.statValue}>{detail.player.total_goals}</div>
                  <div className={styles.statLabel}>Goals</div>
                </div>
                <div className={styles.stat}>
                  <div className={styles.statValue}>{detail.player.total_assists}</div>
                  <div className={styles.statLabel}>Assists</div>
                </div>
              </div>

              {trend.length > 1 ? (
                <div className={styles.trendWrap}>
                  <div className="eyebrow" style={{ fontSize: 11, marginBottom: 6 }}>Recent-match BGPI trend</div>
                  <svg
                    className={styles.trendSvg}
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                    role="img"
                    aria-label={`BGPI across ${trend.length} recent matches, from ${trend[0].bgpi} to ${trend[trend.length - 1].bgpi}.`}
                  >
                    <polyline
                      className={styles.trendLine}
                      points={trend
                        .map((m, i) => {
                          const x = (i / (trend.length - 1)) * 100;
                          const y = 100 - Math.max(0, Math.min(100, m.bgpi));
                          return `${x},${y}`;
                        })
                        .join(" ")}
                    />
                    {trend.map((m, i) => {
                      const x = (i / (trend.length - 1)) * 100;
                      const y = 100 - Math.max(0, Math.min(100, m.bgpi));
                      return (
                        <circle key={i} className={styles.trendDot} cx={x} cy={y} r={1.6}>
                          <title>{`${formatDate(m.match_date)}: BGPI ${m.bgpi} (${m.home_team} vs ${m.away_team})`}</title>
                        </circle>
                      );
                    })}
                  </svg>
                  <div className={styles.trendLabels}>
                    <span>{formatDate(trend[0].match_date)}</span>
                    <span>{formatDate(trend[trend.length - 1].match_date)}</span>
                  </div>
                </div>
              ) : (
                <p className="muted" style={{ fontSize: 13.5 }}>
                  Not enough recent-match history to plot a trend yet.
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
