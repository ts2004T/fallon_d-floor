from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import psycopg2
import psycopg2.extras
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Fallon d'Floor API", version="1.0.0")

app.add_middleware(
     CORSMiddleware,
     allow_origins=["http://localhost:3000"],
     allow_credentials=True,
     allow_methods=["*"],
     allow_headers=["*"],
)

def get_conn():
     return psycopg2.connect(
          host=os.getenv("DB_HOST"),
          port=os.getenv("DB_PORT"),
          dbname=os.getenv("DB_NAME"),
          user=os.getenv("DB_USER"),
          password=os.getenv("DB_PASSWORD")
     )

@app.get("/")
def root():
     return {"status": "Fallon d'Floor API is live 🩷"}

@app.get("/api/leaderboard")
def leaderboard(limit: int = 20, min_matches: int = 10):
     conn = get_conn()
     cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
     cur.execute("""
          SELECT
               p.player_id,
               p.name,
               p.position,
               ROUND(AVG(b.bgpi_normalised)::numeric, 1) AS avg_bgpi,
               ROUND(AVG(b.bgpi_normalised)
                    FILTER (WHERE m.match_importance_score >= 7)::numeric, 1)
                    AS big_game_bgpi,
               ROUND(AVG(b.bgpi_normalised)
                    FILTER (WHERE m.match_importance_score < 7)::numeric, 1)
                    AS regular_bgpi,
               ROUND((
                    AVG(b.bgpi_normalised)
                         FILTER (WHERE m.match_importance_score >= 7) -
                    AVG(b.bgpi_normalised)
                         FILTER (WHERE m.match_importance_score < 7)
               )::numeric, 1) AS big_game_uplift,
               COUNT(*) AS matches,
               SUM(pms.goals) AS total_goals,
               SUM(pms.assists) AS total_assists,
               ROUND(SUM(pms.xg)::numeric, 1) AS total_xg
          FROM bgpi_scores b
          JOIN players p ON b.player_id = p.player_id
          JOIN matches m ON b.match_id = m.match_id
          JOIN player_match_stats pms
               ON pms.player_id = b.player_id
               AND pms.match_id = b.match_id
          GROUP BY p.player_id, p.name, p.position
          HAVING COUNT(*) >= %s
               AND AVG(b.bgpi_normalised)
                    FILTER (WHERE m.match_importance_score >= 7) IS NOT NULL
          ORDER BY big_game_bgpi DESC
          LIMIT %s
     """, (min_matches, limit))
     results = cur.fetchall()
     cur.close()
     conn.close()
     return {"leaderboard": [dict(r) for r in results]}

@app.get("/api/player/{player_id}")
def player_detail(player_id: int):
     conn = get_conn()
     cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)

# player summary
     cur.execute("""
          SELECT
               p.player_id, p.name, p.position,
               ROUND(AVG(b.bgpi_normalised)::numeric, 1) AS avg_bgpi,
               ROUND(AVG(b.bgpi_normalised)
                    FILTER (WHERE m.match_importance_score >= 7)::numeric, 1)
                    AS big_game_bgpi,
               ROUND(AVG(b.bgpi_normalised)
                    FILTER (WHERE m.match_importance_score < 7)::numeric, 1)
                    AS regular_bgpi,
               COUNT(*) AS matches,
               SUM(pms.goals) AS total_goals,
               SUM(pms.assists) AS total_assists,
               ROUND(SUM(pms.xg)::numeric, 2) AS total_xg,
               ROUND(STDDEV(b.bgpi_normalised)::numeric, 2) AS bgpi_std
          FROM bgpi_scores b
          JOIN players p ON b.player_id = p.player_id
          JOIN matches m ON b.match_id = m.match_id
          JOIN player_match_stats pms
               ON pms.player_id = b.player_id
               AND pms.match_id = b.match_id
          WHERE p.player_id = %s
          GROUP BY p.player_id, p.name, p.position
     """, (player_id,))
     player = cur.fetchone()

     if not player:
          raise HTTPException(status_code=404, detail="Player not found")

# last 10 matches with BGPI
     cur.execute("""
          SELECT
               m.match_date,
               m.home_team,
               m.away_team,
               m.round_type,
               m.match_importance_score,
               pms.goals,
               pms.assists,
               ROUND(pms.xg::numeric, 2) AS xg,
               ROUND(b.bgpi_normalised::numeric, 1) AS bgpi
          FROM bgpi_scores b
          JOIN matches m ON b.match_id = m.match_id
          JOIN player_match_stats pms
               ON pms.player_id = b.player_id
               AND pms.match_id = b.match_id
          WHERE b.player_id = %s
          ORDER BY m.match_date DESC NULLS LAST
          LIMIT 10
     """, (player_id,))
     recent = cur.fetchall()

     cur.close()
     conn.close()
     return {
          "player": dict(player),
          "recent_matches": [dict(r) for r in recent]
     }

@app.get("/api/stats/summary")
def summary():
     conn = get_conn()
     cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
     cur.execute("""
          SELECT
               COUNT(DISTINCT p.player_id) AS total_players,
               COUNT(DISTINCT m.match_id) AS total_matches,
               COUNT(*) AS total_records,
               ROUND(AVG(b.bgpi_normalised)::numeric, 1) AS avg_bgpi
          FROM bgpi_scores b
          JOIN players p ON b.player_id = p.player_id
          JOIN matches m ON b.match_id = m.match_id
     """)
     result = cur.fetchone()
     cur.close()
     conn.close()
     return dict(result)