import { Router } from 'express';
import slugify from 'slugify';
import { Property } from '../models/Property.js';
import { requireAuth } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

const router = Router();

function buildFilter(query) {
  const filter = {};
  ['city', 'area', 'purpose', 'category', 'status'].forEach((key) => {
    if (query[key]) filter[key] = query[key];
  });
  if (query.featured === 'true') filter.isFeatured = true;
  if (query.verified === 'true') filter.isVerified = true;
  if (query.minPrice || query.maxPrice) filter.price = {};
  if (query.minPrice) filter.price.$gte = Number(query.minPrice);
  if (query.maxPrice) filter.price.$lte = Number(query.maxPrice);
  if (query.q) filter.$text = { $search: query.q };
  return filter;
}

router.get('/', asyncHandler(async (req, res) => {
  const properties = await Property.find(buildFilter(req.query)).sort({ isFeatured: -1, createdAt: -1 }).limit(80);
  res.json(properties);
}));

router.get('/:slug', asyncHandler(async (req, res) => {
  const property = await Property.findOne({ slug: req.params.slug });
  if (!property) return res.status(404).json({ message: 'Property not found' });
  res.json(property);
}));

router.post('/', requireAuth, asyncHandler(async (req, res) => {
  const baseSlug = slugify(req.body.title, { lower: true, strict: true });
  const slug = `${baseSlug}-${Date.now().toString(36)}`;
  const property = await Property.create({ ...req.body, slug });
  res.status(201).json(property);
}));

router.patch('/:id', requireAuth, asyncHandler(async (req, res) => {
  const property = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(property);
}));

router.delete('/:id', requireAuth, asyncHandler(async (req, res) => {
  await Property.findByIdAndDelete(req.params.id);
  res.status(204).end();
}));

export default router;
