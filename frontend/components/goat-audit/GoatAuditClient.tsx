"use client";

import { useMemo, useState } from "react";
import { AuditPlayer } from "@/lib/goat";
import SearchBar from "./SearchBar";
import FilterPanel from "./FilterPanel";
import PlayerCard from "./PlayerCard";
import ComparisonPanel from "./ComparisonPanel";
import MethodCallout from "./MethodCallout";
import styles from "./GoatAuditClient.module.css";

interface GoatAuditClientProps {
  players: AuditPlayer[];
}

export default function GoatAuditClient({ players }: GoatAuditClientProps) {
  const [search, setSearch] = useState("");
  const [position, setPosition] = useState("all");
  const [minMatches, setMinMatches] = useState(10);

  const positions = useMemo(
    () => Array.from(new Set(players.map((p) => p.position))).sort(),
    [players]
  );

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return players.filter((p) => {
      if (query && !p.name.toLowerCase().includes(query)) return false;
      if (position !== "all" && p.position !== position) return false;
      if (p.matches < minMatches) return false;
      return true;
    });
  }, [players, search, position, minMatches]);

  return (
    <>
      <div className={styles.toolbar}>
        <SearchBar value={search} onChange={setSearch} />
        <FilterPanel
          positions={positions}
          position={position}
          onPositionChange={setPosition}
          minMatches={minMatches}
          onMinMatchesChange={setMinMatches}
        />
      </div>

      <p className="sr-only" role="status" aria-live="polite">
        {filtered.length > 0
          ? `${filtered.length} player${filtered.length === 1 ? "" : "s"} found.`
          : "No players match current filters."}
      </p>

      {filtered.length > 0 ? (
        <div className={styles.grid}>
          {filtered.map((player, i) => (
            <PlayerCard key={player.player_id} player={player} index={i} />
          ))}
        </div>
      ) : (
        <div className={`card pad ${styles.empty}`}>
          <p className="muted">No players match your filters. Try widening the search.</p>
        </div>
      )}

      <div style={{ marginTop: 24 }}>
        <ComparisonPanel players={players} />
      </div>

      <div style={{ marginTop: 24 }}>
        <MethodCallout />
      </div>
    </>
  );
}
