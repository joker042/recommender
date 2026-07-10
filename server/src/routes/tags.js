import { Router } from 'express';
import pool from '../db.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT t.id, t.name, t.category,
              COALESCE(ts.score, 0) AS score,
              COALESCE(ts.total_votes, 0) AS votes
       FROM tags t
       LEFT JOIN tag_scores ts ON t.id = ts.tag_id
       ORDER BY t.category, t.name`
    );

    const grouped = {};
    for (const row of result.rows) {
      const cat = row.category || 'Uncategorized';
      if (!grouped[cat]) grouped[cat] = [];
      grouped[cat].push(row);
    }

    res.json(grouped);
  } catch (err) {
    console.error('Tags error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
