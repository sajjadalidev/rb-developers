import mongoose from 'mongoose';

const marketRateSchema = new mongoose.Schema(
  {
    project: { type: String, required: true },
    phase: String,
    unitType: { type: String, enum: ['Marla', 'Kanal', 'SqFt', 'SqYd'], default: 'Marla' },
    size: String,
    rate: String,
    contactPerson: String,
    contactPhone: String,
    updatedOn: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export const MarketRate = mongoose.model('MarketRate', marketRateSchema);
