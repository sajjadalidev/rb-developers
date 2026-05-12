import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { connectDBWithRetry, getDBStatus } from './config/db.js';
import { requireDb } from './middleware/requireDb.js';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import propertyRoutes from './routes/property.routes.js';
import offerRoutes from './routes/offer.routes.js';
import leadRoutes from './routes/lead.routes.js';
import marketRoutes from './routes/market.routes.js';
import { errorHandler } from './middleware/error.js';

const app = express();
const port = process.env.PORT || 5000;
const allowedOrigins = (process.env.CLIENT_ORIGIN || 'http://localhost:3000')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(helmet());
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json({ limit: '2mb' }));
app.use(morgan('dev'));

app.get('/api/health', (_req, res) => res.json({ ok: true, service: 'rb-real-estate-api', db: getDBStatus() }));
app.use('/api/auth', requireDb, authRoutes);
app.use('/api/users', requireDb, userRoutes);
app.use('/api/properties', requireDb, propertyRoutes);
app.use('/api/offers', requireDb, offerRoutes);
app.use('/api/leads', requireDb, leadRoutes);
app.use('/api/market', requireDb, marketRoutes);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`API running on http://localhost:${port}`);
  connectDBWithRetry();
});
