import { v4 as uuidv4 } from 'uuid';
import pool from '../db.js';

export default async function userMiddleware(req, res, next) {
  const guid = req.headers['x-user-guid'];

  if (!guid) {
    req.user = null;
    return next();
  }

  let user = null;
  try {
    const result = await pool.query(
      'SELECT id, guid FROM users WHERE guid = $1',
      [guid]
    );

    if (result.rows.length > 0) {
      user = result.rows[0];
    } else {
      const insert = await pool.query(
        'INSERT INTO users (guid) VALUES ($1) RETURNING id, guid',
        [guid]
      );
      user = insert.rows[0];
    }
  } catch (err) {
    console.error('User middleware error:', err.message);
  }

  req.user = user;
  next();
}
