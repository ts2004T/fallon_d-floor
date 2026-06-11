"use client";

import { useState } from "react";
import { MatchPlayerStat } from "@/lib/api";
import { contributionScore } from "@/lib/match-intelligence";
import styles from "./MatchComparison.module.css";

interface MatchComparisonProps {
  players: MatchPlayerStat[];
}

interface Metric {
  key: string;
  label: string;
  get: (p: MatchPlayerStat) => number;
  format?: (v: number) => string;
}

const METRICS: Metric[] = [
  { key: "bgpi", label: "BGPI", get: (p) => p.bgpi },
  { key: "goals", label: "Goals", get: (p) => p.goals },
  { key: "assists", label: "Assists", get: (p) => p.assists },
  { key: "xg", label: "xG", get: (p) => p.xg, format: (v) => v.toFixed(2) },
  { key: "contribution", label: "Match Contribution", get: contributionScore },
];

export default function MatchComparison({ players }: MatchComparisonProps) {
  const sorted = [...players].sort((a, b) => b.bgpi - a.bgpi);
  const [aId, setAId] = useState<number>(sorted[0]?.player_id);
  const [bId, setBId] = useState<number>(sorted[1]?.player_id ?? sorted[0]?.player_id);

  const a = players.find((p) => p.player_id === aId);
  const b = players.find((p) => p.player_id === bId);

  return (
    <div className="card pad reveal">
      <div className={styles.head}>
        <div className="eyebrow">Section 7 · Player Comparison</div>
        <h3 className={styles.title}>Compare two performances</h3>
        <p className={styles.question}>
          Match Contribution is the sum of a player&apos;s BGPI components (goals, assists, xG efficiency,
          match-winning impact) before global normalisation.
        </p>
      </div>

      {players.length < 2 || !a || !b ? (
        <p className="muted">Not enough tracked performers in this match to compare.</p>
      ) : (
        <>
          <div className={styles.selectors}>
            <label className={styles.selectWrap}>
              <span className="eyebrow">Player A</span>
              <select
                value={aId}
                onChange={(e) => setAId(Number(e.target.value))}
                className={styles.select}
              >
                {players.map((p) => (
                  <option key={p.player_id} value={p.player_id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </label>
            <label className={styles.selectWrap}>
              <span className="eyebrow">Player B</span>
              <select
                value={bId}
                onChange={(e) => setBId(Number(e.target.value))}
                className={styles.select}
              >
                {players.map((p) => (
                  <option key={p.player_id} value={p.player_id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className={styles.names}>
            <span className={styles.nameA}>{a.name}</span>
            <span className={styles.nameB}>{b.name}</span>
          </div>

          <div
            className={styles.rows}
            role="img"
            aria-label={`Comparison of ${a.name} versus ${b.name} across ${METRICS.length} metrics: ${METRICS.map(
              (m) =>
                `${m.label} — ${a.name} ${m.format ? m.format(m.get(a)) : m.get(a)}, ${b.name} ${
                  m.format ? m.format(m.get(b)) : m.get(b)
                }`
            ).join("; ")}.`}
          >
            {METRICS.map((m) => {
              const va = m.get(a);
              const vb = m.get(b);
              const max = Math.max(Math.abs(va), Math.abs(vb), 0.001);
              return (
                <div className={styles.row} key={m.key}>
                  <div className={`${styles.barWrap} ${styles.left}`}>
                    <span className={styles.value}>{m.format ? m.format(va) : va}</span>
                    <div className={styles.track}>
                      <div
                        className={`${styles.bar} ${styles.barA}`}
                        style={{ width: `${(Math.abs(va) / max) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className={styles.label}>{m.label}</div>
                  <div className={`${styles.barWrap} ${styles.right}`}>
                    <div className={styles.track}>
                      <div
                        className={`${styles.bar} ${styles.barB}`}
                        style={{ width: `${(Math.abs(vb) / max) * 100}%` }}
                      />
                    </div>
                    <span className={styles.value}>{m.format ? m.format(vb) : vb}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
