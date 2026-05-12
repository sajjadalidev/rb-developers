import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../models/User.js';
import { signToken } from '../utils/token.js';
import { requireAuth } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/asyncHandler.js';
import { requireDb } from '../middleware/requireDb.js';

const router = Router();

router.post('/login', requireDb, asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: String(email || '').toLowerCase() });
  if (!user) return res.status(401).json({ message: 'Invalid email or password' });
  const ok = await bcrypt.compare(password || '', user.passwordHash);
  if (!ok) return res.status(401).json({ message: 'Invalid email or password' });
  res.json({
    token: signToken(user),
    user: { id: user._id, name: user.name, email: user.email, role: user.role }
  });
}));

router.get('/me', requireAuth, (req, res) => {
  res.json({ user: req.user });
});

export default router;
