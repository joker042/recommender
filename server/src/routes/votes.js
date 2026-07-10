import { Router } from 'express';
import pool from '../db.js';
import logActivity from '../middleware/logger.js';

const router = Router();

router.post('/show', async (req, res) => {
  const { show_id, vote } = req.body;
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });

  if (!show_id || !vote) {
    return res.status(400).json({ error: 'show_id and vote required' });
  }

  try {
    await pool.query(
      `INSERT INTO user_show_votes (show_id, user_id, vote)
       VALUES ($1, $2, $3)
       ON CONFLICT (user_id, show_id) DO UPDATE SET vote = $3, updated_at = now()`,
      [show_id, userId, vote]
    );

    await logActivity('vote_show', show_id, null, req);
    res.json({ success: true });
  } catch (err) {
    console.error('Vote show error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/tag', async (req, res) => {
  const { tag_id, vote } = req.body;
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });

  if (!tag_id || !vote) {
    return res.status(400).json({ error: 'tag_id and vote required' });
  }

  try {
    await pool.query(
      `INSERT INTO user_tag_votes (tag_id, user_id, vote)
       VALUES ($1, $2, $3)
       ON CONFLICT (user_id, tag_id) DO UPDATE SET vote = $3, updated_at = now()`,
      [tag_id, userId, vote]
    );

    await logActivity('vote_tag', tag_id, null, req);
    res.json({ success: true });
  } catch (err) {
    console.error('Vote tag error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/show-tag', async (req, res) => {
  const { show_id, tag_id, vote } = req.body;
  const userId = req.user?.id;

  if (!show_id || !tag_id || !vote) {
    return res.status(400).json({ error: 'show_id, tag_id, and vote required' });
  }

  try {
    await pool.query(
      `INSERT INTO user_show_tag_votes (show_id, tag_id, user_id, vote)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (user_id, show_id, tag_id) DO UPDATE SET vote = $4, updated_at = now()`,
      [show_id, tag_id, userId, vote]
    );

    await logActivity('vote_show_tag', show_id, tag_id, req);
    res.json({ success: true });
  } catch (err) {
    console.error('Vote show-tag error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
