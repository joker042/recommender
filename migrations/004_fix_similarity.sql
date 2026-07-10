-- Fix the similar_shows function to use correct cosine distance
-- Old: only counted seed tags that overlap, giving 1.0 for any overlap
-- New: proper cosine with full vector magnitudes

CREATE OR REPLACE FUNCTION similar_shows(seed_id INTEGER, limit_n INTEGER DEFAULT 10)
RETURNS TABLE(show_id INTEGER, title TEXT, similarity REAL) AS $$
  WITH seed_tags AS (
    SELECT tag_id, weight FROM show_tags WHERE show_id = seed_id
  ),
  seed_mag AS (
    SELECT SQRT(SUM(weight^2))::REAL AS mag FROM seed_tags
  ),
  scores AS (
    SELECT s.id, s.title,
      SUM(st.weight * seed.weight)::REAL /
      NULLIF((SELECT mag FROM seed_mag) * SQRT(SUM(st.weight^2))::REAL, 0) AS similarity
    FROM shows s
    JOIN show_tags st ON st.show_id = s.id
    JOIN seed_tags seed ON seed.tag_id = st.tag_id
    WHERE s.id != seed_id
    GROUP BY s.id, s.title
  )
  SELECT id, title, similarity
  FROM scores
  ORDER BY similarity DESC
  LIMIT limit_n;
$$ LANGUAGE SQL STABLE;
