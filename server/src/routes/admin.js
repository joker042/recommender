import { Router } from 'express';
import pool from '../db.js';

const router = Router();

// Ring detection: users from same IP voting opposite on same target
router.get('/suspicious-rings', async (req, res) => {
  const hours = parseInt(req.query.hours, 10) || 24;
  const minVotes = parseInt(req.query.min_votes, 10) || 3;

  try {
    // Find IPs where multiple users voted on the same target
    const result = await pool.query(
      `SELECT 
        a1.ip_address,
        COUNT(DISTINCT a1.user_id) AS user_count,
        COUNT(*) AS total_votes,
        a1.action,
        a1.target_id,
        MIN(a1.created_at) AS first_seen,
        MAX(a1.created_at) AS last_seen
      FROM activity_log a1
      WHERE a1.created_at > NOW() - ($1 || ' hours')::INTERVAL
      GROUP BY a1.ip_address, a1.action, a1.target_id
      HAVING COUNT(DISTINCT a1.user_id) >= $2
      ORDER BY COUNT(DISTINCT a1.user_id) DESC
      LIMIT 50`,
      [hours, minVotes]
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Ring detection error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Flag a user (set trust to 0)
router.post('/flag-user/:user_id', async (req, res) => {
  try {
    await pool.query(
      'UPDATE users SET trust_score = 0 WHERE id = $1',
      [req.params.user_id]
    );
    res.json({ success: true });
  } catch (err) {
    console.error('Flag user error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get users with lowest trust scores for review
router.get('/flagged-users', async (req, res) => {
  const limit = parseInt(req.query.limit, 10) || 20;
  const threshold = parseFloat(req.query.threshold) || 0.5;

  try {
    const result = await pool.query(
      `SELECT u.id, u.guid, u.trust_score, u.last_seen,
              (SELECT COUNT(*) FROM activity_log WHERE user_id = u.id) AS total_actions,
              (SELECT COUNT(DISTINCT ip_address) FROM activity_log WHERE user_id = u.id) AS ip_count
       FROM users u
       WHERE u.trust_score < $1
       ORDER BY u.trust_score ASC
       LIMIT $2`,
      [threshold, limit]
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Flagged users error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
