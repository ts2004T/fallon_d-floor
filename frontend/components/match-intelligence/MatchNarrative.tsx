import { MatchNarrative as Narrative } from "@/lib/match-intelligence";
import styles from "./MatchNarrative.module.css";

interface MatchNarrativeProps {
  narrative: Narrative;
}

export default function MatchNarrative({ narrative }: MatchNarrativeProps) {
  return (
    <div className="card pad reveal">
      <div className={styles.head}>
        <div className="eyebrow">Section 2 · Match Intelligence Summary</div>
        <h3 className={styles.headline}>{narrative.headline}</h3>
      </div>
      <p className={styles.body}>{narrative.body}</p>
      {narrative.tags.length > 0 && (
        <div className={styles.tags}>
          {narrative.tags.map((t) => (
            <span key={t} className="chip gold">
              {t}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
