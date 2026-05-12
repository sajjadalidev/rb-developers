import 'dotenv/config';
import mongoose from 'mongoose';

const uri = process.env.MONGO_URI;

if (!uri) {
  console.error('MONGO_URI is missing');
  process.exit(1);
}

const safeUri = uri.replace(/\/\/([^:]+):([^@]+)@/, '//$1:***@');
console.log(`Testing MongoDB URI: ${safeUri}`);

try {
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 15000 });
  console.log('MongoDB connection successful');
  await mongoose.disconnect();
} catch (error) {
  console.error('MongoDB connection failed');
  console.error(error.message);
  process.exit(1);
}
