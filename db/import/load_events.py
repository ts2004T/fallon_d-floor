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
events_dir = os.path.join(BASE, "events")
lineups_dir = os.path.join(BASE, "lineups")

# get all match_ids from DB
cur.execute("SELECT match_id FROM matches")
all_match_ids = [r[0] for r in cur.fetchall()]
print(f"Matches in DB: {len(all_match_ids)}")

players_seen = {}
stats_loaded = 0
processed = 0
errors = 0

for match_id in all_match_ids:
    event_path = os.path.join(events_dir, f"{match_id}.json")
    lineup_path = os.path.join(lineups_dir, f"{match_id}.json")

    if not os.path.exists(event_path):
        continue

    # ── load lineups ──
    player_minutes = {}
    if os.path.exists(lineup_path):
        with open(lineup_path, encoding="utf-8") as f:
            lineups = json.load(f)
        for team in lineups:
            for p in team["lineup"]:
                pid = p["player_id"]
                pos_list = p.get("positions", [])
                pos_name = pos_list[0].get("position", "Unknown") if pos_list else "Unknown"
                players_seen[pid] = (p["player_name"], pos_name)
                player_minutes[pid] = 0

    # ── parse events ──
    try:
        with open(event_path, encoding="utf-8") as f:
            events = json.load(f)
    except Exception as e:
        errors += 1
        continue

    player_stats = {}

    def get_ps(pid):
        if pid not in player_stats:
            player_stats[pid] = {
                "goals": 0, "assists": 0,
                "xg": 0.0, "xa": 0.0,
                "shots_on_target": 0, "key_passes": 0,
                "penalty_miss": False, "red_card": False
            }
        return player_stats[pid]

    for event in events:
        etype = event.get("type", {}).get("name", "")
        pid = event.get("player", {}).get("id")
        if not pid:
            continue

        minute = event.get("minute", 0)
        player_minutes[pid] = max(player_minutes.get(pid, 0), minute)

        if etype == "Shot":
            shot = event.get("shot", {})
            outcome = shot.get("outcome", {}).get("name", "")
            xg_val = shot.get("statsbomb_xg", 0.0) or 0.0
            get_ps(pid)["xg"] += xg_val
            if outcome == "Goal":
                if shot.get("type", {}).get("name", "") != "Own Goal For":
                    get_ps(pid)["goals"] += 1
            if outcome in ("Saved", "Goal"):
                get_ps(pid)["shots_on_target"] += 1
            if shot.get("type", {}).get("name") == "Penalty" and outcome != "Goal":
                get_ps(pid)["penalty_miss"] = True

        elif etype == "Pass":
            pass_data = event.get("pass", {})
            if pass_data.get("goal_assist"):
                get_ps(pid)["assists"] += 1
            get_ps(pid)["xa"] += pass_data.get("xa", 0.0) or 0.0
            if pass_data.get("shot_assist"):
                get_ps(pid)["key_passes"] += 1

        elif etype == "Bad Behaviour":
            card = event.get("bad_behaviour", {}).get("card", {}).get("name", "")
            if "Red" in card:
                get_ps(pid)["red_card"] = True

    # ── insert players + stats ──
    for pid, stats in player_stats.items():
        pname, pos_name = players_seen.get(pid, (f"Player_{pid}", "Unknown"))

        cur.execute("""
            INSERT INTO players (player_id, name, position)
            VALUES (%s, %s, %s)
            ON CONFLICT (player_id) DO NOTHING
        """, (pid, pname, pos_name))

        minutes = max(player_minutes.get(pid, 45), 1)

        cur.execute("""
            INSERT INTO player_match_stats
                (player_id, match_id, goals, assists, xg, xa,
                 shots_on_target, key_passes, minutes_played,
                 penalty_miss, red_card)
            VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
            ON CONFLICT (player_id, match_id) DO NOTHING
        """, (
            pid, match_id,
            stats["goals"], stats["assists"],
            round(stats["xg"], 4), round(stats["xa"], 4),
            stats["shots_on_target"], stats["key_passes"],
            minutes, stats["penalty_miss"], stats["red_card"]
        ))
        stats_loaded += 1

    conn.commit()
    processed += 1
    if processed % 200 == 0:
        print(f"  {processed}/{len(all_match_ids)} matches processed | {stats_loaded} records | {len(players_seen)} players")

print(f"\nDone!")
print(f"Matches processed: {processed}")
print(f"Player-match records loaded: {stats_loaded}")
print(f"Unique players: {len(players_seen)}")
print(f"Errors skipped: {errors}")

cur.close()
conn.close()