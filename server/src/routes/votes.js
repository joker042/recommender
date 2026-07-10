import { Router } from 'express';
import pool from '../db.js';
import logActivity from '../middleware/logger.js';

const router = Router();

router.post('/show', async (req, res) => {
  const { show_id, vote } = req.body;
  const userId = req.user?.id;

  if (!show_id || !vote) {
    return res.status(400).json({ error: 'show_id and vote required' });
  }

  try {
    await pool.query(
      `INSERT INTO show_votes (show_id, user_id, vote)
       VALUES ($1, $2, $3)
       ON CONFLICT (show_id, user_id) DO UPDATE SET vote = $3`,
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

  if (!tag_id || !vote) {
    return res.status(400).json({ error: 'tag_id and vote required' });
  }

  try {
    await pool.query(
      `INSERT INTO tag_votes (tag_id, user_id, vote)
       VALUES ($1, $2, $3)
       ON CONFLICT (tag_id, user_id) DO UPDATE SET vote = $3`,
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
      `INSERT INTO show_tag_votes (show_id, tag_id, user_id, vote)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (show_id, tag_id, user_id) DO UPDATE SET vote = $4`,
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
