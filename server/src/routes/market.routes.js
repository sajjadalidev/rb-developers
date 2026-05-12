import { Router } from 'express';
import { MarketRate } from '../models/MarketRate.js';
import { requireAuth } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

const router = Router();

router.get('/rates', asyncHandler(async (_req, res) => {
  const rates = await MarketRate.find().sort({ updatedOn: -1 });
  res.json(rates);
}));

router.post('/rates', requireAuth, asyncHandler(async (req, res) => {
  const rate = await MarketRate.create(req.body);
  res.status(201).json(rate);
}));

export default router;
