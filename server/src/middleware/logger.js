import pool from '../db.js';

export default async function logActivity(action, targetId, secondaryId, req) {
  const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.ip;
  try {
    await pool.query(
      `INSERT INTO activity_log (action, target_id, secondary_id, ip_address, user_id)
       VALUES ($1, $2, $3, $4, $5)`,
      [
        action,
        targetId || null,
        secondaryId || null,
        ip || null,
        req?.user?.id || null,
      ]
    );
  } catch (err) {
    console.error('Logger error:', err.message);
  }
}
