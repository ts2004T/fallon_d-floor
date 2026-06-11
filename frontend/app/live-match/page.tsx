export const dynamic = 'force-dynamic'
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MatchSelector from "@/components/match-intelligence/MatchSelector";
import MatchHero from "@/components/match-intelligence/MatchHero";
import MatchNarrative from "@/components/match-intelligence/MatchNarrative";
import TopPerformers from "@/components/match-intelligence/TopPerformers";
import ImpactPanel from "@/components/match-intelligence/ImpactPanel";
import MatchInsights from "@/components/match-intelligence/MatchInsights";
import MatchSummaryPanel from "@/components/match-intelligence/MatchSummaryPanel";
import MatchComparison from "@/components/match-intelligence/MatchComparison";
import PageHead from "./PageHead";
import { getMatch, getMatches } from "@/lib/api";
import { generateMatchInsights, generateNarrative, getTopPerformers } from "@/lib/match-intelligence";
import styles from "./page.module.css";

interface LiveMatchPageProps {
  searchParams: { match?: string };
}

export default async function LiveMatchPage({ searchParams }: LiveMatchPageProps) {
  const matches = await getMatches(30);

  if (matches.length === 0) {
    return (
      <>
        <Navbar />
        <main className="wrap">
          <section className={`${styles.pagehead} reveal`}>
            <span className="eyebrow" style={{ justifyContent: "center" }}>Match Intelligence</span>
            <h1>No audited matches available yet.</h1>
          </section>
        </main>
        <Footer />
      </>
    );
  }

  const requestedId = searchParams.match ? Number(searchParams.match) : NaN;
  const activeId = matches.some((m) => m.match_id === requestedId) ? requestedId : matches[0].match_id;

  const { match, players } = await getMatch(activeId);
  const narrative = generateNarrative(match, players);
  const topPerformers = getTopPerformers(players);
  const insights = generateMatchInsights(players);

  return (
    <>
      <Navbar />
      <main className="wrap">
        <PageHead />

        <section className="section" style={{ paddingTop: 30, paddingBottom: 60 }}>
          <div className={styles.stack}>
            <MatchSelector matches={matches} activeId={activeId} />
            <MatchHero match={match} />
            <MatchNarrative narrative={narrative} />
            <TopPerformers performers={topPerformers} />
            <ImpactPanel match={match} players={players} />
            <MatchInsights insights={insights} />
            <MatchSummaryPanel match={match} players={players} narrative={narrative} />
            <MatchComparison players={players} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
