-- Diversified recommendation engine

-- Co-occurrence: shows frequently liked together
DROP MATERIALIZED VIEW IF EXISTS show_co_occurrence;
CREATE MATERIALIZED VIEW show_co_occurrence AS
  SELECT a.show_id AS show_a, b.show_id AS show_b, COUNT(*) AS n
  FROM user_show_votes a
  JOIN user_show_votes b ON a.user_id = b.user_id 
    AND a.show_id < b.show_id 
    AND a.vote > 0 AND b.vote > 0
  GROUP BY 1, 2
  HAVING COUNT(*) >= 1;

CREATE INDEX idx_cooc_a ON show_co_occurrence(show_a, n DESC);
CREATE INDEX idx_cooc_b ON show_co_occurrence(show_b, n DESC);
GRANT SELECT ON show_co_occurrence TO recommender_user;

-- Era-cluster: same decade recommendations
CREATE OR REPLACE FUNCTION era_recommendations(
  target_user_id INTEGER, limit_n INTEGER DEFAULT 5
) RETURNS TABLE(show_id INTEGER, title TEXT, type TEXT, year INTEGER, synopsis TEXT, score REAL, reason TEXT) AS $$
  WITH user_eras AS (
    SELECT 
      CASE 
        WHEN s.year >= 2020 THEN '2020s' WHEN s.year >= 2010 THEN '2010s'
        WHEN s.year >= 2000 THEN '2000s' WHEN s.year >= 1990 THEN '1990s'
        WHEN s.year >= 1980 THEN '1980s' WHEN s.year >= 1970 THEN '1970s'
        WHEN s.year >= 1960 THEN '1960s' WHEN s.year >= 1940 THEN '1940s-50s'
        ELSE 'pre-1940'
      END AS era, COUNT(*) AS n
    FROM user_show_votes usv
    JOIN shows s ON s.id = usv.show_id
    WHERE usv.user_id = target_user_id AND usv.vote > 0
    GROUP BY 1 ORDER BY COUNT(*) DESC LIMIT 2
  ),
  top_era AS (SELECT era FROM user_eras ORDER BY n DESC LIMIT 1)
  SELECT s.id, s.title, s.type, s.year, s.synopsis,
         (SELECT n FROM user_eras WHERE era = top_era.era)::REAL AS score,
         'era-' || (SELECT era FROM top_era) AS reason
  FROM shows s JOIN top_era ON (
    CASE 
      WHEN s.year >= 2020 THEN '2020s' WHEN s.year >= 2010 THEN '2010s'
      WHEN s.year >= 2000 THEN '2000s' WHEN s.year >= 1990 THEN '1990s'
      WHEN s.year >= 1980 THEN '1980s' WHEN s.year >= 1970 THEN '1970s'
      WHEN s.year >= 1960 THEN '1960s' WHEN s.year >= 1940 THEN '1940s-50s'
      ELSE 'pre-1940'
    END = top_era.era
  )
  LEFT JOIN user_show_votes uv ON uv.show_id = s.id AND uv.user_id = target_user_id
  WHERE uv.show_id IS NULL
  ORDER BY RANDOM() LIMIT limit_n;
$$ LANGUAGE SQL STABLE;
