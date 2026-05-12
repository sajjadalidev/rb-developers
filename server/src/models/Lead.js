import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: String,
    interest: String,
    message: String,
    source: { type: String, default: 'website' },
    property: { type: mongoose.Schema.Types.ObjectId, ref: 'Property' },
    status: { type: String, enum: ['new', 'contacted', 'qualified', 'closed'], default: 'new' }
  },
  { timestamps: true }
);

export const Lead = mongoose.model('Lead', leadSchema);
