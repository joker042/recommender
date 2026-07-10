import { Router } from 'express';
import pool from '../db.js';

const router = Router();

router.post('/', async (req, res) => {
  try {
    // Use the guid from the x-user-guid header (set by user middleware)
    // or from the request body, or generate one
    const guid = req.user?.guid || req.body.guid || req.headers['x-user-guid'];
    
    if (!guid) {
      return res.status(400).json({ error: 'guid required' });
    }

    // Upsert: find existing or create
    const result = await pool.query(
      `INSERT INTO users (guid) VALUES ($1)
       ON CONFLICT (guid) DO UPDATE SET last_seen = now()
       RETURNING id, guid, trust_score`,
      [guid]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Auth error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
