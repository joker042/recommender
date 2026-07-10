import { Router } from 'express';
import pool from '../db.js';

const router = Router();

router.get('/', async (req, res) => {
  const userId = req.user?.id;
  const limit = parseInt(req.query.limit, 10) || 20;
  const offset = parseInt(req.query.offset, 10) || 0;

  // Cold start: no user — trending
  if (!userId) {
    try {
      const result = await pool.query(
        `SELECT s.id, s.title, s.type, s.year, s.synopsis,
                COALESCE(ss.score, 0)::REAL AS score, 'trending' AS reason
         FROM shows s
         LEFT JOIN show_scores ss ON ss.show_id = s.id
         ORDER BY ss.score DESC NULLS LAST, s.title
         OFFSET $1 LIMIT $2`,
        [offset, limit]
      );
      return res.json(result.rows);
    } catch (err) {
      console.error('Trending error:', err.message);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  try {
    // Tier 1: Collaborative filtering
    const cfResult = await pool.query(
      'SELECT * FROM user_recommendations($1, $2, $3)',
      [userId, limit, offset]
    );
    let rows = cfResult.rows;

    // If short, pad with content-based from user's top upvoted show
    if (rows.length < limit) {
      const topVote = await pool.query(
        `SELECT show_id FROM user_show_votes 
         WHERE user_id = $1 AND vote > 0 
         ORDER BY vote DESC LIMIT 1`,
        [userId]
      );

      if (topVote.rows.length > 0) {
        const need = limit - rows.length;
        const seenIds = rows.map(r => r.show_id);
        const cbResult = await pool.query(
          `SELECT s.id, s.title, s.type, s.year, s.synopsis, sim.similarity AS score, 'content-based' AS reason
           FROM similar_shows($1, 50) sim
           JOIN shows s ON s.id = sim.show_id
           WHERE NOT (s.id = ANY($2::int[]))
           LIMIT $3`,
          [topVote.rows[0].show_id, seenIds, need]
        );
        rows = [...rows, ...cbResult.rows];
      }
    }

    if (rows.length > 0) return res.json(rows);

    // Tier 2: No votes at all — trending
    const trending = await pool.query(
      `SELECT s.id, s.title, s.type, s.year, s.synopsis,
              COALESCE(ss.score, 0)::REAL AS score, 'trending' AS reason
       FROM shows s
       LEFT JOIN show_scores ss ON ss.show_id = s.id
       ORDER BY ss.score DESC NULLS LAST, s.title
       OFFSET $1 LIMIT $2`,
      [offset, limit]
    );
    res.json(trending.rows);
  } catch (err) {
    console.error('User recs error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
