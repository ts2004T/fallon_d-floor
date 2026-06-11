interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div style={{ flex: "1 1 240px" }}>
      <label htmlFor="goat-search" className="eyebrow" style={{ display: "block", marginBottom: 6 }}>
        Search players
      </label>
      <input
        id="goat-search"
        type="search"
        className="card"
        placeholder="Search by player name…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: "100%",
          padding: "11px 14px",
          fontSize: 15,
          fontFamily: "var(--font-body)",
          color: "var(--ink)",
          background: "var(--card)",
        }}
      />
    </div>
  );
}
