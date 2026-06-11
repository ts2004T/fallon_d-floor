import { AuditPlayer, getVerdict } from "@/lib/goat";
import { initials } from "@/lib/format";
import BGPIMeter from "./BGPIMeter";
import RankingBadge from "./RankingBadge";
import VerdictBadge from "./VerdictBadge";
import styles from "./PlayerCard.module.css";

const GRADIENTS = ["g0", "g1", "g2", "g3", "g4"];

interface PlayerCardProps {
  player: AuditPlayer;
  index: number;
}

export default function PlayerCard({ player, index }: PlayerCardProps) {
  const verdict = getVerdict(player);
  const gradient = GRADIENTS[index % GRADIENTS.length];
  const xgDiff = player.total_goals - player.total_xg;

  return (
    <article className={`card pcard hoverable reveal ${styles.pcard}`}>
      <div className={`${styles.banner} ${styles[gradient]}`}>
        <RankingBadge rank={player.rank} movement={player.movement} />
        <div className={styles.pav}>{initials(player.name)}</div>
      </div>

      <div className={styles.pbody}>
        <div className={styles.topline}>
          <div>
            <h3 className={styles.pname}>{player.name}</h3>
            <div className={styles.pmeta}>
              {player.position} · {player.matches} matches audited
            </div>
          </div>
          <div className={styles.bgpiCol}>
            <div className="bgpi" style={{ fontSize: 40 }}>{player.big_game_bgpi}</div>
            <div className={styles.pmeta}>BGPI</div>
          </div>
        </div>

        <BGPIMeter value={player.big_game_bgpi} compareValue={player.regular_bgpi} />

        <div className={styles.ministats}>
          <div className={styles.ministat}>
            <div className={styles.v}>{player.total_goals}</div>
            <div className={styles.k}>Goals</div>
          </div>
          <div className={styles.ministat}>
            <div className={styles.v}>{player.total_assists}</div>
            <div className={styles.k}>Assists</div>
          </div>
          <div className={styles.ministat}>
            <div className={styles.v}>{xgDiff > 0 ? "+" : ""}{xgDiff.toFixed(1)}</div>
            <div className={styles.k}>xG over-perf.</div>
          </div>
        </div>

        <div className={styles.verdictRow}>
          <VerdictBadge verdict={verdict} />
        </div>
      </div>
    </article>
  );
}
