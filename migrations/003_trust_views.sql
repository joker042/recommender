-- 003_trust_views.sql — Replace score views with trust-weighted versions

DROP VIEW IF EXISTS tag_scores CASCADE;
DROP VIEW IF EXISTS show_scores CASCADE;
DROP VIEW IF EXISTS show_tag_scores CASCADE;

-- Tag scores: only count votes from trusted users (trust_score > 0)
CREATE VIEW tag_scores AS
  SELECT utv.tag_id,
         COALESCE(AVG(utv.vote), 0)::REAL AS score,
         COUNT(*) AS total_votes
  FROM user_tag_votes utv
  JOIN users u ON u.id = utv.user_id AND u.trust_score > 0
  GROUP BY utv.tag_id;

CREATE VIEW show_scores AS
  SELECT usv.show_id,
         COALESCE(AVG(usv.vote), 0)::REAL AS score,
         COUNT(*) AS total_votes
  FROM user_show_votes usv
  JOIN users u ON u.id = usv.user_id AND u.trust_score > 0
  GROUP BY usv.show_id;

CREATE VIEW show_tag_scores AS
  SELECT ustv.show_id, ustv.tag_id,
         COALESCE(AVG(ustv.vote), 0)::REAL AS score,
         COUNT(*) AS total_votes
  FROM user_show_tag_votes ustv
  JOIN users u ON u.id = ustv.user_id AND u.trust_score > 0
  GROUP BY ustv.show_id, ustv.tag_id;

GRANT SELECT ON tag_scores, show_scores, show_tag_scores TO recommender_user;
