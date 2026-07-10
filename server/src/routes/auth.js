import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import pool from '../db.js';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const guid = uuidv4();

    const result = await pool.query(
      'INSERT INTO users (guid) VALUES ($1) RETURNING id, guid',
      [guid]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Auth error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
