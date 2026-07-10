import { Router } from 'express';
import pool from '../db.js';

const router = Router();

router.get('/', async (req, res) => {
  const { q } = req.query;

  try {
    if (q) {
      const result = await pool.query(
        `SELECT id, title, type, year
         FROM shows
         WHERE title ILIKE $1
         ORDER BY title
         LIMIT 50`,
        [`%${q}%`]
      );
      return res.json(result.rows);
    }

    const result = await pool.query(
      `SELECT id, title, type, year
       FROM shows
       ORDER BY title
       LIMIT 50`
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Shows error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT s.id, s.title, s.type, s.year, s.description,
              COALESCE(ss.total_score, 0) AS score,
              COALESCE(ss.total_votes, 0) AS votes
       FROM shows s
       LEFT JOIN show_scores ss ON s.id = ss.show_id
       WHERE s.id = $1`,
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Show not found' });
    }

    const show = result.rows[0];

    const tagsResult = await pool.query(
      `SELECT t.id, t.name, t.category, COALESCE(st.score, 0) AS score, COALESCE(st.total_votes, 0) AS votes
       FROM tags t
       LEFT JOIN show_tag_scores st ON t.id = st.tag_id AND st.show_id = $1
       ORDER BY t.name`,
      [req.params.id]
    );

    show.tags = tagsResult.rows;
    res.json(show);
  } catch (err) {
    console.error('Show detail error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
