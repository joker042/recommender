import { Router } from 'express';
import pool from '../db.js';

const router = Router();

router.get('/', async (req, res) => {
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const result = await pool.query(
      `SELECT we.id, we.show_id, we.position, we.added_at,
              s.title, s.type, s.year
       FROM watchlist_entries we
       JOIN watchlists w ON w.id = we.watchlist_id
       JOIN shows s ON s.id = we.show_id
       WHERE w.user_id = $1
       ORDER BY we.position ASC`,
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
    const wl = await pool.query(
      `INSERT INTO watchlists (user_id) VALUES ($1)
       ON CONFLICT (user_id) DO UPDATE SET user_id = EXCLUDED.user_id
       RETURNING id`,
      [userId]
    );
    const watchlistId = wl.rows[0].id;

    const maxPos = await pool.query(
      'SELECT COALESCE(MAX(position), 0) + 1 AS next_pos FROM watchlist_entries WHERE watchlist_id = $1',
      [watchlistId]
    );
    const position = maxPos.rows[0].next_pos;

    const result = await pool.query(
      `INSERT INTO watchlist_entries (watchlist_id, show_id, position)
       VALUES ($1, $2, $3) RETURNING *`,
      [watchlistId, show_id, position]
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
      `UPDATE watchlist_entries SET position = $1
       WHERE id = $2 AND watchlist_id = (
         SELECT id FROM watchlists WHERE user_id = $3
       )
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
      `DELETE FROM watchlist_entries WHERE id = $1 AND watchlist_id = (
        SELECT id FROM watchlists WHERE user_id = $2
      )
      RETURNING *`,
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
