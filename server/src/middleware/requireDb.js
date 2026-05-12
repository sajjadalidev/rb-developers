import { getDBStatus } from '../config/db.js';

export function requireDb(_req, res, next) {
  const db = getDBStatus();

  if (!db.connected) {
    return res.status(503).json({
      message: 'Database is not connected. Please check MongoDB Atlas network access and credentials.',
      db
    });
  }

  next();
}
