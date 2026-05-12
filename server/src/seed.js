import 'dotenv/config';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { connectDB } from './config/db.js';
import { User } from './models/User.js';
import { Property } from './models/Property.js';
import { Offer } from './models/Offer.js';
import { MarketRate } from './models/MarketRate.js';

await connectDB();

await Promise.all([User.deleteMany(), Property.deleteMany(), Offer.deleteMany(), MarketRate.deleteMany()]);

await User.create({
  name: 'RB Admin',
  email: 'admin@rbdevelopers.pk',
  phone: '+92 300 0000000',
  role: 'admin',
  passwordHash: await bcrypt.hash('Admin12345!', 10)
});

await Property.create([
  {
    title: '5 Marla Luxury House in Bahria Town Lahore',
    slug: '5-marla-luxury-house-bahria-town-lahore',
    purpose: 'sale',
    category: 'house',
    status: 'available',
    isFeatured: true,
    isVerified: true,
    nocApproved: true,
    city: 'Lahore',
    area: 'Bahria Town',
    block: 'Sector E',
    address: 'Jinnah Block, Bahria Town Lahore',
    price: 29000000,
    priceLabel: 'Rs. 2.90 Crore',
    size: 5,
    sizeUnit: 'Marla',
    bedrooms: 5,
    bathrooms: 6,
    parking: 1,
    possession: 'Ready for possession',
    yearBuilt: 2025,
    images: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c'],
    description: 'A verified luxury home near commercial facilities, schools, parks, mosque, hospital access, and secure community amenities.',
    amenities: ['CCTV', 'Parking', 'Backup power', 'Parks nearby', 'Mosque nearby', 'Waste management'],
    nearby: ['Bahria Hospital', 'Imtiaz Mall', 'Ring Road', 'Food Court'],
    agent: { name: 'Awais Zaheer', phone: '+92 321 1112508', whatsapp: '+923211112508', agency: 'RB Developers' },
    tags: ['verified', 'noc-approved', 'ready-possession']
  },
  {
    title: 'Commercial Office in Shahrah-e-Faisal Karachi',
    slug: 'commercial-office-shahrah-e-faisal-karachi',
    purpose: 'sale',
    category: 'office',
    status: 'sold',
    isFeatured: true,
    isVerified: true,
    city: 'Karachi',
    area: 'Shahrah-e-Faisal',
    price: 45000,
    priceLabel: 'Rs. 45,000 / SqFt',
    size: 1608,
    sizeUnit: 'SqFt',
    bathrooms: 1,
    parking: 2,
    possession: 'Vacant',
    images: ['https://images.unsplash.com/photo-1497366754035-f200968a6e72'],
    description: 'A high-demand office space on Karachi’s busiest commercial corridor with excellent access and rental potential.',
    amenities: ['Elevator', 'Security', 'Reception', 'Backup power'],
    nearby: ['Main road', 'Banks', 'Restaurants'],
    agent: { name: 'Faraz Ahmed', phone: '+92 333 1524862', whatsapp: '+923331524862', agency: 'RB Developers' },
    tags: ['commercial', 'sold']
  },
  {
    title: 'Off-Plan Apartment with Installments in Murree',
    slug: 'off-plan-apartment-installments-murree',
    purpose: 'off-plan',
    category: 'apartment',
    status: 'available',
    isFeatured: false,
    isVerified: true,
    nocApproved: true,
    city: 'Murree',
    area: 'New Murree Resort',
    price: 12500000,
    priceLabel: 'Rs. 1.25 Crore',
    size: 780,
    sizeUnit: 'SqFt',
    bedrooms: 1,
    bathrooms: 1,
    possession: '2027 expected',
    images: ['https://images.unsplash.com/photo-1500530855697-b586d89ba3ee'],
    brochureUrl: '#',
    paymentPlanUrl: '#',
    description: 'Tourism-led investment apartment with installment plan, documented payment schedule, and managed rental potential.',
    amenities: ['Mountain view', 'Installment plan', 'Rental management', 'Security'],
    nearby: ['Expressway', 'Tourism spots', 'Restaurants'],
    agent: { name: 'Consultant Team', phone: '+92 300 7444006', whatsapp: '+923007444006', agency: 'RB Developers' },
    tags: ['off-plan', 'installment', 'tourism-roi']
  }
]);

await Offer.create({
  title: 'Upcoming Bahria Town Installment Scheme',
  city: 'Lahore',
  area: 'Bahria Town',
  description: 'Register interest for early access to 5 Marla and 10 Marla installment options with verified documentation.',
  ctaLabel: 'Get Early Access',
  isActive: true
});

await MarketRate.create([
  { project: 'DHA Lahore Phase 10', phase: 'Allocation', unitType: 'Marla', size: '5 Marla', rate: '26.50 Lac', contactPerson: 'RB Sales', contactPhone: '+92 300 0000000' },
  { project: 'Lahore Smart City', phase: 'Executive Block', unitType: 'Marla', size: '10 Marla', rate: '49.45 Lac', contactPerson: 'RB Sales', contactPhone: '+92 300 0000000' }
]);

console.log('Seed complete');
await mongoose.disconnect();
