import { Router } from 'express';
import pool from '../db.js';

const router = Router();

router.get('/', async (req, res) => {
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const result = await pool.query(
      `SELECT w.id, w.show_id, w.position, w.created_at,
              s.title, s.type, s.year
       FROM watchlist w
       JOIN shows s ON w.show_id = s.id
       WHERE w.user_id = $1
       ORDER BY w.position ASC`,
      [userId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Watchlist GET error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/', async (req, res) => {
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });

  const { show_id } = req.body;
  if (!show_id) return res.status(400).json({ error: 'show_id required' });

  try {
    const maxPos = await pool.query(
      'SELECT COALESCE(MAX(position), 0) + 1 AS next_pos FROM watchlist WHERE user_id = $1',
      [userId]
    );
    const position = maxPos.rows[0].next_pos;

    const result = await pool.query(
      `INSERT INTO watchlist (user_id, show_id, position)
       VALUES ($1, $2, $3) RETURNING *`,
      [userId, show_id, position]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Watchlist POST error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/:entry_id', async (req, res) => {
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });

  const { position } = req.body;
  if (position === undefined) return res.status(400).json({ error: 'position required' });

  try {
    const result = await pool.query(
      `UPDATE watchlist SET position = $1
       WHERE id = $2 AND user_id = $3
       RETURNING *`,
      [position, req.params.entry_id, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Entry not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Watchlist PUT error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/:entry_id', async (req, res) => {
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const result = await pool.query(
      'DELETE FROM watchlist WHERE id = $1 AND user_id = $2 RETURNING *',
      [req.params.entry_id, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Entry not found' });
    }

    res.json({ success: true });
  } catch (err) {
    console.error('Watchlist DELETE error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
