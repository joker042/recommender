-- Collaborative filtering: find similar users, recommend their upvoted shows

CREATE OR REPLACE FUNCTION user_recommendations(
  target_user_id INTEGER,
  limit_n INTEGER DEFAULT 10
)
RETURNS TABLE(show_id INTEGER, title TEXT, type TEXT, year INTEGER, synopsis TEXT, score REAL, reason TEXT) AS $$
  WITH user_votes AS (
    SELECT show_id, vote FROM user_show_votes 
    WHERE user_id = target_user_id AND vote != 0
  ),
  neighbors AS (
    SELECT 
      usv.user_id,
      SUM(usv.vote * uv.vote)::REAL / 
        NULLIF(SQRT(SUM(usv.vote * usv.vote))::REAL * SQRT(SUM(uv.vote * uv.vote))::REAL, 0) AS similarity,
      COUNT(*) AS shared_votes
    FROM user_show_votes usv
    JOIN user_votes uv ON uv.show_id = usv.show_id
    WHERE usv.user_id != target_user_id
      AND usv.vote != 0
    GROUP BY usv.user_id
    HAVING COUNT(*) >= 1
  ),
  neighbor_recs AS (
    SELECT 
      usv.show_id,
      SUM(n.similarity * usv.vote)::REAL AS score,
      COUNT(DISTINCT n.user_id) AS neighbor_count,
      STRING_AGG(DISTINCT 
        CASE WHEN usv.vote > 0 THEN 'similar-users-upvoted'
             ELSE 'similar-users-downvoted' END, ', '
      ) AS reasons
    FROM neighbors n
    JOIN user_show_votes usv ON usv.user_id = n.user_id AND usv.vote != 0
    LEFT JOIN user_votes uv ON uv.show_id = usv.show_id
    WHERE uv.show_id IS NULL
    GROUP BY usv.show_id
    HAVING SUM(n.similarity * usv.vote) > 0
  )
  SELECT s.id, s.title, s.type, s.year, s.synopsis, r.score, r.reasons
  FROM neighbor_recs r
  JOIN shows s ON s.id = r.show_id
  ORDER BY r.score DESC
  LIMIT limit_n;
$$ LANGUAGE SQL STABLE;
