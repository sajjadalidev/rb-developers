import mongoose from 'mongoose';

const offerSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    area: { type: String, required: true },
    city: { type: String, required: true },
    description: { type: String, required: true },
    ctaLabel: { type: String, default: 'Register Interest' },
    startsAt: Date,
    endsAt: Date,
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export const Offer = mongoose.model('Offer', offerSchema);
