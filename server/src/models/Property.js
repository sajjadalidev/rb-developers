import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true },
    purpose: { type: String, enum: ['sale', 'rent', 'installment', 'off-plan'], default: 'sale' },
    category: { type: String, enum: ['house', 'apartment', 'plot', 'commercial', 'farmhouse', 'villa', 'penthouse', 'office', 'shop'], required: true },
    status: { type: String, enum: ['available', 'sold', 'rented', 'reserved'], default: 'available' },
    isFeatured: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },
    nocApproved: { type: Boolean, default: false },
    city: { type: String, required: true },
    area: { type: String, required: true },
    block: String,
    address: String,
    mapUrl: String,
    price: { type: Number, required: true },
    priceLabel: String,
    size: { type: Number, required: true },
    sizeUnit: { type: String, enum: ['Marla', 'Kanal', 'SqFt', 'SqYd'], default: 'Marla' },
    bedrooms: Number,
    bathrooms: Number,
    parking: Number,
    possession: String,
    yearBuilt: Number,
    images: [String],
    videoUrl: String,
    virtualTourUrl: String,
    brochureUrl: String,
    paymentPlanUrl: String,
    description: { type: String, required: true },
    amenities: [String],
    nearby: [String],
    agent: {
      name: String,
      phone: String,
      whatsapp: String,
      email: String,
      agency: String
    },
    tags: [String]
  },
  { timestamps: true }
);

propertySchema.index({ title: 'text', city: 'text', area: 'text', description: 'text', tags: 'text' });

export const Property = mongoose.model('Property', propertySchema);
