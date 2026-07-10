import { Router } from 'express';
import pool from '../db.js';

const router = Router();

router.get('/', async (req, res) => {
  const userId = req.user?.id;
  const limit = Math.min(parseInt(req.query.limit, 10) || 20, 50);
  const excludeIds = req.query.exclude ? req.query.exclude.split(',').map(Number).filter(n => n > 0) : [];

  // Cold start: trending with exclude
  if (!userId) {
    try {
      const result = await pool.query(
        `SELECT s.id, s.title, s.type, s.year, s.synopsis,
                COALESCE(ss.score, 0)::REAL AS score, 'trending' AS reason
         FROM shows s
         LEFT JOIN show_scores ss ON ss.show_id = s.id
         WHERE NOT (s.id = ANY($1::int[]))
         ORDER BY ss.score DESC NULLS LAST, RANDOM()
         LIMIT $2`,
        [excludeIds, limit]
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
      `SELECT * FROM user_recommendations($1, $2, 0)
       WHERE NOT (show_id = ANY($3::int[]))
       LIMIT $2`,
      [userId, limit, excludeIds]
    );
    let rows = cfResult.rows;

    // Pad with content-based if short
    if (rows.length < limit) {
      const topVote = await pool.query(
        `SELECT show_id FROM user_show_votes 
         WHERE user_id = $1 AND vote > 0 
         ORDER BY vote DESC LIMIT 1`,
        [userId]
      );

      if (topVote.rows.length > 0) {
        const need = limit - rows.length;
        const seenIds = [...excludeIds, ...rows.map(r => r.show_id)];
        const cbResult = await pool.query(
          `SELECT s.id, s.title, s.type, s.year, s.synopsis, sim.similarity AS score, 'content-based' AS reason
           FROM similar_shows($1, $2) sim
           JOIN shows s ON s.id = sim.show_id
           WHERE NOT (s.id = ANY($3::int[]))
           LIMIT $4`,
          [topVote.rows[0].show_id, 50, seenIds, need]
        );
        rows = [...rows, ...cbResult.rows];
      }
    }

    if (rows.length > 0) return res.json(rows);

    // Tier 3: Trending
    const trending = await pool.query(
      `SELECT s.id, s.title, s.type, s.year, s.synopsis,
              COALESCE(ss.score, 0)::REAL AS score, 'trending' AS reason
       FROM shows s
       LEFT JOIN show_scores ss ON ss.show_id = s.id
       WHERE NOT (s.id = ANY($1::int[]))
       ORDER BY ss.score DESC NULLS LAST, RANDOM()
       LIMIT $2`,
      [excludeIds, limit]
    );
    res.json(trending.rows);
  } catch (err) {
    console.error('User recs error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
