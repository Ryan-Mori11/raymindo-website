import express from 'express';
import cors from 'cors';
import trackingRoutes from './routes/tracking.js';
import ratesRoutes from './routes/rates.js';
import contactRoutes from './routes/contact.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/tracking', trackingRoutes);
app.use('/api/rates', ratesRoutes);
app.use('/api/contact', contactRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    company: 'PT RAYMINDO INTERBENUA LINE',
    service: 'International Freight Forwarding API',
    timestamp: new Date().toISOString()
  });
});

// 404 Handler for API
app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint API tidak ditemukan.'
  });
});

app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🚀 PT RAYMINDO INTERBENUA LINE - Freight API Server`);
  console.log(`📡 Server running on http://localhost:${PORT}`);
  console.log(`📦 Tracking API : http://localhost:${PORT}/api/tracking/FF123456ID`);
  console.log(`💰 Rates API    : http://localhost:${PORT}/api/rates/destinations`);
  console.log(`====================================================`);
});
