import { Router } from 'express';
import { Lead } from '../models/Lead.js';
import { requireAuth } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

const router = Router();

router.get('/', requireAuth, asyncHandler(async (_req, res) => {
  const leads = await Lead.find().populate('property', 'title slug').sort({ createdAt: -1 });
  res.json(leads);
}));

router.post('/', asyncHandler(async (req, res) => {
  const lead = await Lead.create(req.body);
  res.status(201).json(lead);
}));

router.patch('/:id', requireAuth, asyncHandler(async (req, res) => {
  const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(lead);
}));

router.delete('/:id', requireAuth, asyncHandler(async (req, res) => {
  await Lead.findByIdAndDelete(req.params.id);
  res.status(204).end();
}));

export default router;
