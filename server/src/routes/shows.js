import { Router } from 'express';
import pool from '../db.js';

const router = Router();

router.get('/', async (req, res) => {
  const { q } = req.query;
  const limit = Math.min(parseInt(req.query.limit, 10) || 20, 100);
  const offset = parseInt(req.query.offset, 10) || 0;

  try {
    if (q) {
      const result = await pool.query(
        `SELECT id, title, type, year
         FROM shows
         WHERE title ILIKE $1
         ORDER BY title
         LIMIT $2 OFFSET $3`,
        [`%${q}%`, limit, offset]
      );
      return res.json(result.rows);
    }

    const result = await pool.query(
      `SELECT id, title, type, year
       FROM shows
       ORDER BY title
       LIMIT $1 OFFSET $2`,
      [limit, offset]
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
      `SELECT s.id, s.title, s.type, s.year, s.synopsis,
              COALESCE(ss.score, 0) AS score,
              COALESCE(ss.total_votes, 0) AS votes,
              COALESCE((SELECT vote FROM user_show_votes WHERE user_id = $2 AND show_id = s.id), 0) AS my_vote
       FROM shows s
       LEFT JOIN show_scores ss ON s.id = ss.show_id
       WHERE s.id = $1`,
      [req.params.id, req.user?.id || 0]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Show not found' });
    }

    const show = result.rows[0];

    const tagsResult = await pool.query(
      `SELECT t.id, t.name, t.category, 
              COALESCE(uts.score, 0) AS score, COALESCE(uts.total_votes, 0) AS votes, st.weight,
              (SELECT COALESCE(vote, 0) FROM user_show_tag_votes WHERE user_id = $2 AND show_id = st.show_id AND tag_id = st.tag_id) AS my_vote
       FROM show_tags st
       JOIN tags t ON t.id = st.tag_id
       LEFT JOIN show_tag_scores uts ON uts.tag_id = st.tag_id AND uts.show_id = st.show_id
       WHERE st.show_id = $1
       ORDER BY t.name`, [req.params.id, req.user?.id || 0]
    );

    show.tags = tagsResult.rows;
    res.json(show);
  } catch (err) {
    console.error('Show detail error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
