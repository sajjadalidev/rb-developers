import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../models/User.js';
import { requireAdmin, requireAuth } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

const router = Router();
router.use(requireAuth, requireAdmin);

router.get('/', asyncHandler(async (_req, res) => {
  const users = await User.find().select('-passwordHash').sort({ createdAt: -1 });
  res.json(users);
}));

router.post('/', asyncHandler(async (req, res) => {
  const passwordHash = await bcrypt.hash(req.body.password || 'ChangeMe123!', 10);
  const user = await User.create({ ...req.body, passwordHash });
  res.status(201).json({ id: user._id, name: user.name, email: user.email, role: user.role });
}));

router.patch('/:id', asyncHandler(async (req, res) => {
  const updates = { ...req.body };
  if (updates.password) {
    updates.passwordHash = await bcrypt.hash(updates.password, 10);
    delete updates.password;
  }
  const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true }).select('-passwordHash');
  res.json(user);
}));

router.delete('/:id', asyncHandler(async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(204).end();
}));

export default router;
