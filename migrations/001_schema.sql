-- 001_schema.sql — Recommender database schema

BEGIN;

-- ============================================================
-- SHOWS
-- ============================================================
CREATE TABLE shows (
  id          SERIAL PRIMARY KEY,
  title       TEXT NOT NULL,
  type        TEXT NOT NULL CHECK (type IN ('tv', 'movie', 'miniseries', 'anime', 'documentary')),
  year        INTEGER,
  synopsis    TEXT,
  poster_url  TEXT,
  imdb_id     TEXT,
  created_at  TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- TAGS (admin-created only)
-- ============================================================
CREATE TABLE tags (
  id          SERIAL PRIMARY KEY,
  name        TEXT UNIQUE NOT NULL,
  category    TEXT NOT NULL CHECK (category IN ('genre', 'theme', 'mood', 'style', 'era', 'format')),
  description TEXT,
  created_at  TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- SHOW-TAGS (admin-assigned, weighted)
-- ============================================================
CREATE TABLE show_tags (
  show_id INTEGER REFERENCES shows(id) ON DELETE CASCADE,
  tag_id  INTEGER REFERENCES tags(id) ON DELETE CASCADE,
  weight  REAL DEFAULT 1.0 CHECK (weight >= 0 AND weight <= 1),
  PRIMARY KEY (show_id, tag_id)
);

-- ============================================================
-- USERS (cookie-based GUID, no login)
-- ============================================================
CREATE TABLE users (
  id          SERIAL PRIMARY KEY,
  guid        UUID UNIQUE NOT NULL,
  trust_score REAL DEFAULT 1.0 CHECK (trust_score >= 0 AND trust_score <= 1),
  created_at  TIMESTAMPTZ DEFAULT now(),
  last_seen   TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- USER SHOW VOTES (+1 upvote/like, -1 downvote/dislike)
-- ============================================================
CREATE TABLE user_show_votes (
  user_id     INTEGER REFERENCES users(id) ON DELETE CASCADE,
  show_id     INTEGER REFERENCES shows(id) ON DELETE CASCADE,
  vote        SMALLINT NOT NULL DEFAULT 0 CHECK (vote IN (-1, 0, 1)),
  created_at  TIMESTAMPTZ DEFAULT now(),
  updated_at  TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (user_id, show_id)
);

-- ============================================================
-- USER TAG VOTES (general tag quality)
-- ============================================================
CREATE TABLE user_tag_votes (
  user_id     INTEGER REFERENCES users(id) ON DELETE CASCADE,
  tag_id      INTEGER REFERENCES tags(id) ON DELETE CASCADE,
  vote        SMALLINT NOT NULL DEFAULT 0 CHECK (vote IN (-1, 0, 1)),
  created_at  TIMESTAMPTZ DEFAULT now(),
  updated_at  TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (user_id, tag_id)
);

-- ============================================================
-- USER SHOW-TAG VOTES ("does this tag fit this show?")
-- ============================================================
CREATE TABLE user_show_tag_votes (
  user_id     INTEGER REFERENCES users(id) ON DELETE CASCADE,
  show_id     INTEGER REFERENCES shows(id) ON DELETE CASCADE,
  tag_id      INTEGER REFERENCES tags(id) ON DELETE CASCADE,
  vote        SMALLINT NOT NULL DEFAULT 0 CHECK (vote IN (-1, 0, 1)),
  created_at  TIMESTAMPTZ DEFAULT now(),
  updated_at  TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (user_id, show_id, tag_id)
);

-- ============================================================
-- WATCHLISTS (one per user for now, UNIQUE allows expansion)
-- ============================================================
CREATE TABLE watchlists (
  id          SERIAL PRIMARY KEY,
  user_id     INTEGER REFERENCES users(id) ON DELETE CASCADE UNIQUE,
  title       TEXT DEFAULT 'Watchlist',
  created_at  TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- WATCHLIST ENTRIES (ordered by fractional index)
-- ============================================================
CREATE TABLE watchlist_entries (
  id            SERIAL PRIMARY KEY,
  watchlist_id  INTEGER REFERENCES watchlists(id) ON DELETE CASCADE,
  show_id       INTEGER REFERENCES shows(id) ON DELETE CASCADE,
  position      REAL NOT NULL DEFAULT 0,
  note          TEXT,
  added_at      TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_watchlist_order ON watchlist_entries(watchlist_id, position);

-- ============================================================
-- ACTIVITY LOG (anti-spam — IP + action patterns)
-- ============================================================
CREATE TABLE activity_log (
  id            BIGSERIAL PRIMARY KEY,
  user_id       INTEGER REFERENCES users(id) ON DELETE CASCADE,
  ip_address    INET NOT NULL,
  action        TEXT NOT NULL CHECK (action IN ('vote_show', 'vote_tag', 'vote_show_tag')),
  target_id     INTEGER NOT NULL,
  secondary_id  INTEGER,
  created_at    TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_activity_ring   ON activity_log(ip_address, action, target_id, created_at);
CREATE INDEX idx_activity_user   ON activity_log(user_id);

-- ============================================================
-- HELPER: Nearest neighbour (weighted cosine similarity)
-- ============================================================
CREATE OR REPLACE FUNCTION similar_shows(seed_id INTEGER, limit_n INTEGER DEFAULT 10)
RETURNS TABLE(show_id INTEGER, title TEXT, similarity REAL) AS $$
  SELECT s.id, s.title,
    SUM(st1.weight * st2.weight)::REAL /
    NULLIF(SQRT(SUM(st1.weight^2)::REAL) * SQRT(SUM(st2.weight^2)::REAL), 0) AS similarity
  FROM shows s
  JOIN show_tags st2 ON st2.show_id = s.id
  JOIN show_tags st1 ON st1.tag_id = st2.tag_id AND st1.show_id = seed_id
  WHERE s.id != seed_id
  GROUP BY s.id, s.title
  ORDER BY similarity DESC
  LIMIT limit_n;
$$ LANGUAGE SQL STABLE;

COMMIT;
