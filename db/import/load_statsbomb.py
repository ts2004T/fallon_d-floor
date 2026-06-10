import json
import os
import psycopg2
from dotenv import load_dotenv

load_dotenv()

conn = psycopg2.connect(
     host=os.getenv("DB_HOST"),
     port=os.getenv("DB_PORT"),
     dbname=os.getenv("DB_NAME"),
     user=os.getenv("DB_USER"),
     password=os.getenv("DB_PASSWORD")
)
cur = conn.cursor()

BASE = r"data\raw\statsbomb\data"
UCL_COMP_ID = 16

# ── Step 1: Insert competition ─────────────────────────────────────────────
cur.execute("""
     INSERT INTO competitions (comp_id, name, country, importance_base_weight)
     VALUES (%s, %s, %s, %s)
     ON CONFLICT (comp_id) DO NOTHING
""", (UCL_COMP_ID, "UEFA Champions League", "Europe", 9.0))
conn.commit()
print("Competition inserted.")

# ── Step 2: Load all UCL match metadata we actually have ──────────────────
matches_dir = os.path.join(BASE, "matches", str(UCL_COMP_ID))
all_matches = {}  # match_id -> match dict

for season_file in os.listdir(matches_dir):
     with open(os.path.join(matches_dir, season_file), encoding="utf-8") as f:
          matches = json.load(f)
     for m in matches:
          all_matches[m["match_id"]] = m

print(f"Match metadata available: {len(all_matches)} matches")

# ── Step 3: Find which event files we actually have ───────────────────────
events_dir = os.path.join(BASE, "events")
lineups_dir = os.path.join(BASE, "lineups")

available_event_ids = set(
     int(f.replace(".json", ""))
     for f in os.listdir(events_dir)
     if f.endswith(".json")
)
print(f"Event files available: {len(available_event_ids)}")

# matches we have BOTH metadata AND events for
loadable = {mid: m for mid, m in all_matches.items() if mid in available_event_ids}
print(f"Matches with both metadata + events: {len(loadable)}")

# also load matches where we only have events (no metadata) — build minimal record
events_only = available_event_ids - set(all_matches.keys())
print(f"Event files with no metadata: {len(events_only)} — will build from events")

def get_round_importance(round_name):
     r = (round_name or "").lower()
     if "final" in r and "semi" not in r:        return 10.0
     elif "semi" in r:                            return 9.0
     elif "quarter" in r:                         return 8.0
     elif "round of 16" in r or "last 16" in r:  return 7.0
     elif "group" in r:                           return 5.0
     else:                                        return 5.0

# ── Step 4: Insert matches from metadata ──────────────────────────────────
inserted_matches = set()

for match_id, m in loadable.items():
     round_name = m.get("competition_stage", {}).get("name", "Group Stage")
     importance = get_round_importance(round_name)
     season_name = m.get("season", {}).get("season_name", "Unknown")

     cur.execute("""
          INSERT INTO matches
               (match_id, comp_id, season, match_date,
               home_team, away_team, home_score, away_score,
               match_importance_score, round_type)
          VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
          ON CONFLICT (match_id) DO NOTHING
     """, (
          match_id, UCL_COMP_ID, season_name,
          m.get("match_date"),
          m["home_team"]["home_team_name"],
          m["away_team"]["away_team_name"],
          m.get("home_score", 0),
          m.get("away_score", 0),
          importance, round_name
     ))
     inserted_matches.add(match_id)

conn.commit()
print(f"Inserted {len(inserted_matches)} matches from metadata.")

# ── Step 5: For events_only matches, extract metadata from event stream ───
print(f"Building metadata for {len(events_only)} events-only matches...")
built = 0

for match_id in events_only:
     event_path = os.path.join(events_dir, f"{match_id}.json")
     with open(event_path, encoding="utf-8") as f:
          events = json.load(f)

     if not events:
          continue

     # extract teams from first few events
     teams = []
     for e in events[:50]:
          t = e.get("team", {}).get("name")
          if t and t not in teams:
               teams.append(t)
          if len(teams) == 2:
               break

     if len(teams) < 2:
          continue

     home_team = teams[0]
     away_team = teams[1]
     match_date = None

     cur.execute("""
          INSERT INTO matches
               (match_id, comp_id, season, match_date,
               home_team, away_team, home_score, away_score,
               match_importance_score, round_type)
          VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
          ON CONFLICT (match_id) DO NOTHING
     """, (
          match_id, UCL_COMP_ID, "Unknown",
          match_date,
          home_team,
          away_team,
          0,
          0,
          5.0,
          "Unknown"
     ))
     built += 1

conn.commit()
print(f"Built and inserted {built} matches from events only.")