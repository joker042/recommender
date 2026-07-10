import { Router } from 'express';
import pool from '../db.js';

const router = Router();

router.get('/:show_id', async (req, res) => {
  const { show_id } = req.params;
  const limit = parseInt(req.query.limit, 10) || 10;

  try {
    const result = await pool.query(
      `SELECT * FROM similar_shows($1, $2)`,
      [show_id, limit]
    );

    res.json(result.rows);
  } catch (err) {
    console.error('Recommendations error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
