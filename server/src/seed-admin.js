import 'dotenv/config';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { connectDB } from './config/db.js';
import { User } from './models/User.js';

const admin = {
  name: 'RB Admin',
  email: 'admin@rbdevelopers.pk',
  phone: '+92 304 5595455',
  role: 'admin',
  isActive: true
};

await connectDB();

const passwordHash = await bcrypt.hash('Admin12345!', 10);
const user = await User.findOneAndUpdate(
  { email: admin.email },
  { ...admin, passwordHash },
  { upsert: true, new: true, setDefaultsOnInsert: true }
).select('-passwordHash');

console.log('Admin user ready:');
console.log(JSON.stringify(user, null, 2));

await mongoose.disconnect();
