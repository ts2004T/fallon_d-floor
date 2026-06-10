import json, os

BASE = r"data\raw\statsbomb\data"

events_dir = os.path.join(BASE, "events")
lineups_dir = os.path.join(BASE, "lineups")

print(f"Total event files: {len(os.listdir(events_dir))}")
print(f"Total lineup files: {len(os.listdir(lineups_dir))}")

# Check if we have the UCL final (match_id 22912)
match_id = 22912
event_file = os.path.join(events_dir, f"{match_id}.json")
lineup_file = os.path.join(lineups_dir, f"{match_id}.json")

print(f"\nEvent file exists for UCL final: {os.path.exists(event_file)}")
print(f"Lineup file exists for UCL final: {os.path.exists(lineup_file)}")

if os.path.exists(event_file):
     with open(event_file, encoding="utf-8") as f:
          events = json.load(f)
     print(f"Total events in match: {len(events)}")
     
     # count event types
     from collections import Counter
     types = Counter(e['type']['name'] for e in events)
     for t, count in types.most_common(10):
          print(f"  {t}: {count}")

if os.path.exists(lineup_file):
     with open(lineup_file, encoding="utf-8") as f:
          lineups = json.load(f)
     total_players = sum(len(t['lineup']) for t in lineups)
     print(f"\nTotal players in lineups: {total_players}")
     print("Teams:", [t['team_name'] for t in lineups])