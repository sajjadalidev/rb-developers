import { Router } from 'express';
import { Offer } from '../models/Offer.js';
import { requireAuth } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

const router = Router();

router.get('/', asyncHandler(async (req, res) => {
  const filter = req.query.active === 'true' ? { isActive: true } : {};
  const offers = await Offer.find(filter).sort({ createdAt: -1 });
  res.json(offers);
}));

router.post('/', requireAuth, asyncHandler(async (req, res) => {
  const offer = await Offer.create(req.body);
  res.status(201).json(offer);
}));

router.patch('/:id', requireAuth, asyncHandler(async (req, res) => {
  const offer = await Offer.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(offer);
}));

router.delete('/:id', requireAuth, asyncHandler(async (req, res) => {
  await Offer.findByIdAndDelete(req.params.id);
  res.status(204).end();
}));

export default router;
