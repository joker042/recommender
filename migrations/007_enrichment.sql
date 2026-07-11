-- Wikipedia enrichment tables

CREATE TABLE IF NOT EXISTS show_details (
  show_id       INTEGER PRIMARY KEY REFERENCES shows(id),
  synopsis      TEXT,
  wikipedia_url TEXT,
  enriched_at   TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS show_people (
  id        SERIAL PRIMARY KEY,
  show_id   INTEGER REFERENCES shows(id),
  name      TEXT NOT NULL,
  role      TEXT NOT NULL CHECK (role IN ('director', 'creator', 'writer', 'cast')),
  UNIQUE (show_id, name, role)
);

CREATE TABLE IF NOT EXISTS show_categories (
  id        SERIAL PRIMARY KEY,
  show_id   INTEGER REFERENCES shows(id),
  category  TEXT NOT NULL,
  UNIQUE (show_id, category)
);

CREATE INDEX IF NOT EXISTS idx_show_people_show ON show_people(show_id);
CREATE INDEX IF NOT EXISTS idx_show_categories_show ON show_categories(show_id);

GRANT ALL ON show_details, show_people, show_categories TO recommender_user;
GRANT USAGE ON SEQUENCE show_people_id_seq, show_categories_id_seq TO recommender_user;
