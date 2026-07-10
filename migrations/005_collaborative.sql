-- Collaborative filtering recommendations, excluding interacted shows
DROP FUNCTION IF EXISTS user_recommendations(INTEGER,INTEGER);

CREATE OR REPLACE FUNCTION user_recommendations(
  target_user_id INTEGER,
  limit_n INTEGER DEFAULT 20,
  page_offset INTEGER DEFAULT 0
)
RETURNS TABLE(show_id INTEGER, title TEXT, type TEXT, year INTEGER, synopsis TEXT, score REAL, reason TEXT) AS $$
  WITH user_votes AS (
    SELECT show_id, vote FROM user_show_votes 
    WHERE user_id = target_user_id AND vote != 0
  ),
  user_watchlist AS (
    SELECT we.show_id FROM watchlist_entries we
    JOIN watchlists w ON w.id = we.watchlist_id
    WHERE w.user_id = target_user_id
  ),
  neighbors AS (
    SELECT 
      usv.user_id,
      SUM(usv.vote * uv.vote)::REAL / 
        NULLIF(SQRT(SUM(usv.vote * usv.vote))::REAL * SQRT(SUM(uv.vote * uv.vote))::REAL, 0) AS similarity,
      COUNT(*) AS shared_votes
    FROM user_show_votes usv
    JOIN user_votes uv ON uv.show_id = usv.show_id
    WHERE usv.user_id != target_user_id AND usv.vote != 0
    GROUP BY usv.user_id
    HAVING COUNT(*) >= 1
  ),
  neighbor_recs AS (
    SELECT 
      usv.show_id,
      SUM(n.similarity * usv.vote)::REAL AS score,
      COUNT(DISTINCT n.user_id) AS neighbor_count
    FROM neighbors n
    JOIN user_show_votes usv ON usv.user_id = n.user_id AND usv.vote != 0
    LEFT JOIN user_votes uv ON uv.show_id = usv.show_id
    LEFT JOIN user_watchlist uw ON uw.show_id = usv.show_id
    WHERE uv.show_id IS NULL AND uw.show_id IS NULL
    GROUP BY usv.show_id
    HAVING SUM(n.similarity * usv.vote) > 0
  )
  SELECT s.id, s.title, s.type, s.year, s.synopsis,
         r.score, 'similar-users-upvoted' AS reason
  FROM neighbor_recs r
  JOIN shows s ON s.id = r.show_id
  ORDER BY r.score DESC
  OFFSET page_offset
  LIMIT limit_n;
$$ LANGUAGE SQL STABLE;
