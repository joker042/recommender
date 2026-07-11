import { Router } from 'express';
import pool from '../db.js';

const router = Router();

const BLEND = {
  collaborative: 10,
  cooccurrence: 4,
  era: 4,
  wildcard: 2,
};

router.get('/', async (req, res) => {
  const userId = req.user?.id;
  const excludeIds = req.query.exclude ? req.query.exclude.split(',').map(Number).filter(n => n > 0) : [];

  // Cold start: trending with random shuffle
  if (!userId) {
    try {
      const result = await pool.query(
        `SELECT s.id, s.title, s.type, s.year, s.synopsis,
                COALESCE(ss.score, 0)::REAL AS score, 'trending' AS reason
         FROM shows s
         LEFT JOIN show_scores ss ON ss.show_id = s.id
         WHERE NOT (s.id = ANY($1::int[]))
         ORDER BY RANDOM()
         LIMIT 20`,
        [excludeIds]
      );
      return res.json(result.rows);
    } catch (err) {
      console.error('Trending error:', err.message);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  try {
    const rows = [];

    // 1. Collaborative filtering
    const cfResult = await pool.query(
      `SELECT * FROM user_recommendations($1, $2, 0)
       WHERE NOT (show_id = ANY($3::int[]))
       LIMIT $2`,
      [userId, BLEND.collaborative, excludeIds]
    );
    rows.push(...cfResult.rows);
    const seen = [...excludeIds, ...rows.map(r => r.show_id)];

    // 2. Co-occurrence: shows liked by the same people
    const coResult = await pool.query(
      `SELECT s.id, s.title, s.type, s.year, s.synopsis,
              MAX(co.n)::REAL AS score, 'co-occurrence' AS reason
       FROM show_co_occurrence co
       JOIN shows s ON s.id = co.show_b
       WHERE co.show_a IN (SELECT show_id FROM user_show_votes WHERE user_id = $1 AND vote > 0)
         AND NOT (s.id = ANY($2::int[]))
       GROUP BY s.id, s.title, s.type, s.year, s.synopsis
       ORDER BY MAX(co.n) DESC
       LIMIT $3`,
      [userId, seen, BLEND.cooccurrence]
    );
    rows.push(...coResult.rows);
    seen.push(...coResult.rows.map(r => r.show_id));

    // 3. Era-cluster: same decade as user's likes
    const eraResult = await pool.query(
      `SELECT * FROM era_recommendations($1, $2)
       WHERE NOT (show_id = ANY($3::int[]))`,
      [userId, BLEND.era, seen]
    );
    rows.push(...eraResult.rows);
    seen.push(...eraResult.rows.map(r => r.show_id));

    // 4. Wildcard: random popular shows
    const wildResult = await pool.query(
      `SELECT s.id, s.title, s.type, s.year, s.synopsis,
              0::REAL AS score, 'wildcard' AS reason
       FROM shows s
       WHERE NOT (s.id = ANY($1::int[]))
       ORDER BY RANDOM()
       LIMIT $2`,
      [seen, BLEND.wildcard]
    );
    rows.push(...wildResult.rows);

    // Shortfall: pad with trending/random to reach 20
    if (rows.length < 20) {
      const need = 20 - rows.length;
      const padding = await pool.query(
        `SELECT s.id, s.title, s.type, s.year, s.synopsis,
                0::REAL AS score, 'trending' AS reason
         FROM shows s
         WHERE NOT (s.id = ANY($1::int[]))
         ORDER BY RANDOM()
         LIMIT $2`,
        [seen, need]
      );
      rows.push(...padding.rows);
    }

    return res.json(rows.slice(0, 20));

    // Nothing found — trending fallback
    const trending = await pool.query(
      `SELECT s.id, s.title, s.type, s.year, s.synopsis,
              COALESCE(ss.score, 0)::REAL AS score, 'trending' AS reason
       FROM shows s
       LEFT JOIN show_scores ss ON ss.show_id = s.id
       WHERE NOT (s.id = ANY($1::int[]))
       ORDER BY RANDOM()
       LIMIT 20`,
      [excludeIds]
    );
    res.json(trending.rows);
  } catch (err) {
    console.error('User recs error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
