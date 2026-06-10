import json

with open('data/raw/statsbomb/data/competitions.json') as f:
     comps = json.load(f)

ucl = [c for c in comps if 'Champions' in c['competition_name']]
for c in sorted(ucl, key=lambda x: x['season_name']):
     print(c['competition_id'], c['season_id'], c['season_name'])