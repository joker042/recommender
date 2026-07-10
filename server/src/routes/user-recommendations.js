import { Router } from 'express';
import pool from '../db.js';

const router = Router();

// Collaborative: recommendations FOR a user based on their votes
router.get('/', async (req, res) => {
  const userId = req.user?.id;
  const limit = parseInt(req.query.limit, 10) || 10;

  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized — user required' });
  }

  try {
    // Try collaborative first
    const result = await pool.query(
      'SELECT * FROM user_recommendations($1, $2)',
      [userId, limit]
    );

    if (result.rows.length > 0) {
      return res.json(result.rows);
    }

    // Fallback: content-based from user's most upvoted show
    const topVote = await pool.query(
      `SELECT show_id FROM user_show_votes 
       WHERE user_id = $1 AND vote > 0 
       ORDER BY vote DESC LIMIT 1`,
      [userId]
    );

    if (topVote.rows.length > 0) {
      const cb = await pool.query(
        `SELECT s.id, s.title, s.type, s.year, s.synopsis, sim.similarity AS score, 'content-based' AS reason
         FROM similar_shows($1, $2) sim
         JOIN shows s ON s.id = sim.show_id`,
        [topVote.rows[0].show_id, limit]
      );
      return res.json(cb.rows);
    }

    // Ultimate fallback: trending (most upvoted shows)
    const trending = await pool.query(
      `SELECT s.id, s.title, s.type, s.year, s.synopsis, 
              COALESCE(ss.score, 0)::REAL AS score, 'trending' AS reason
       FROM shows s
       LEFT JOIN show_scores ss ON ss.show_id = s.id
       ORDER BY ss.score DESC NULLS LAST, s.title
       LIMIT $1`,
      [limit]
    );
    res.json(trending.rows);
  } catch (err) {
    console.error('User recs error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
