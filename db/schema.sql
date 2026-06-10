CREATE TABLE IF NOT EXISTS competitions (
     comp_id INTEGER PRIMARY KEY,
     name TEXT NOT NULL,
     country TEXT,
     importance_base_weight NUMERIC DEFAULT 1.0
);
CREATE TABLE IF NOT EXISTS matches (
     match_id INTEGER PRIMARY KEY,
     comp_id INTEGER REFERENCES competitions(comp_id),
     season TEXT NOT NULL,
     match_date DATE,
     home_team TEXT,
     away_team TEXT,
     home_score INTEGER,
     away_score INTEGER,
     match_importance_score NUMERIC DEFAULT 3.0,
     round_type TEXT
);
CREATE TABLE IF NOT EXISTS players (
     player_id INTEGER PRIMARY KEY,
     name TEXT NOT NULL,
     nationality TEXT,
     position TEXT
);
CREATE TABLE IF NOT EXISTS player_match_stats (
     stat_id SERIAL PRIMARY KEY,
     player_id INTEGER REFERENCES players(player_id),
     match_id INTEGER REFERENCES matches(match_id),
     goals INTEGER DEFAULT 0,
     assists INTEGER DEFAULT 0,
     xg NUMERIC DEFAULT 0,
     xa NUMERIC DEFAULT 0,
     shots_on_target INTEGER DEFAULT 0,
     key_passes INTEGER DEFAULT 0,
     minutes_played INTEGER DEFAULT 0,
     penalty_miss BOOLEAN DEFAULT FALSE,
     red_card BOOLEAN DEFAULT FALSE,
     UNIQUE(player_id, match_id)
);
CREATE TABLE IF NOT EXISTS bgpi_scores (
     bgpi_id SERIAL PRIMARY KEY,
     player_id INTEGER REFERENCES players(player_id),
     match_id INTEGER REFERENCES matches(match_id),
     goals_score NUMERIC,
     assists_score NUMERIC,
     xg_efficiency NUMERIC,
     match_winning_impact NUMERIC,
     bgpi_raw NUMERIC,
     bgpi_normalised NUMERIC,
     calculated_at TIMESTAMP DEFAULT NOW(),
     UNIQUE(player_id, match_id)
);