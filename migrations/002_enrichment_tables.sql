-- 002_enrichment_tables.sql — Wikipedia enrichment tables

BEGIN;

CREATE TABLE show_details (
  id                SERIAL PRIMARY KEY,
  show_id           INTEGER REFERENCES shows(id) ON DELETE CASCADE UNIQUE,
  wikipedia_page_id INTEGER,
  wikipedia_title   TEXT,
  extract           TEXT,
  enriched_at       TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE show_people (
  id      SERIAL PRIMARY KEY,
  show_id INTEGER REFERENCES shows(id) ON DELETE CASCADE,
  name    TEXT NOT NULL,
  role    TEXT NOT NULL CHECK (role IN ('director', 'star', 'creator', 'writer'))
);

CREATE INDEX idx_show_people_show ON show_people(show_id);
CREATE INDEX idx_show_people_role ON show_people(role);

CREATE TABLE show_categories (
  id       SERIAL PRIMARY KEY,
  show_id  INTEGER REFERENCES shows(id) ON DELETE CASCADE,
  category TEXT NOT NULL
);

CREATE INDEX idx_show_categories_show ON show_categories(show_id);

COMMIT;
