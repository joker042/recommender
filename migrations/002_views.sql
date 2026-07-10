-- 002_views.sql — Aggregated vote score views
-- Run after 001_schema.sql

DO $$ BEGIN
  CREATE VIEW tag_scores AS
    SELECT tag_id, COALESCE(AVG(vote), 0)::REAL AS score, COUNT(*) AS total_votes
    FROM user_tag_votes GROUP BY tag_id;
EXCEPTION WHEN duplicate_table THEN NULL;
END $$;

DO $$ BEGIN
  CREATE VIEW show_scores AS
    SELECT show_id, COALESCE(AVG(vote), 0)::REAL AS score, COUNT(*) AS total_votes
    FROM user_show_votes GROUP BY show_id;
EXCEPTION WHEN duplicate_table THEN NULL;
END $$;

DO $$ BEGIN
  CREATE VIEW show_tag_scores AS
    SELECT show_id, tag_id, COALESCE(AVG(vote), 0)::REAL AS score, COUNT(*) AS total_votes
    FROM user_show_tag_votes GROUP BY show_id, tag_id;
EXCEPTION WHEN duplicate_table THEN NULL;
END $$;

GRANT SELECT ON tag_scores, show_scores, show_tag_scores TO recommender_user;
