interface KPICardProps {
  label: string;
  value: string;
  hint?: string;
}

export default function KPICard({ label, value, hint }: KPICardProps) {
  return (
    <div className="card pad hoverable reveal">
      <div className="eyebrow">{label}</div>
      <div className="num" style={{ fontSize: 32, marginTop: 8 }}>
        {value}
      </div>
      {hint && (
        <div className="muted" style={{ fontSize: 13, marginTop: 6 }}>
          {hint}
        </div>
      )}
    </div>
  );
}
