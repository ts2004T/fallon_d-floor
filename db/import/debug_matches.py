import json, os

BASE = r"data\raw\statsbomb\data"

# Check what's in the matches folder for UCL
matches_dir = os.path.join(BASE, "matches", "16")
print("Files in UCL matches folder:")
for f in os.listdir(matches_dir):
     print(f" {f}")

# Look at one file
with open(os.path.join(matches_dir, "4.json")) as f:
     data = json.load(f)

print(f"\nType of data: {type(data)}")
print(f"Length: {len(data)}")
if isinstance(data, list):
     print(f"First item keys: {data[0].keys() if data else 'empty'}")
     print(f"First match: {data[0].get('match_id')} — {data[0].get('home_team',{}).get('home_team_name')} vs {data[0].get('away_team',{}).get('away_team_name')}")
elif isinstance(data, dict):
     print(f"Keys: {data.keys()}")