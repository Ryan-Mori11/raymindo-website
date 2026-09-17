import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const shipmentsFilePath = path.join(__dirname, '../data/shipments.json');

// Helper to read shipments data
function getShipments() {
  try {
    const raw = fs.readFileSync(shipmentsFilePath, 'utf8');
    return JSON.parse(raw);
  } catch (error) {
    console.error('Error reading shipments.json:', error);
    return [];
  }
}

// GET /api/tracking - Return quick sample list
router.get('/', (req, res) => {
  const shipments = getShipments();
  const samples = shipments.map(s => ({
    trackingNumber: s.trackingNumber,
    status: s.status,
    service: s.service,
    origin: `${s.origin.city}, ${s.origin.country}`,
    destination: `${s.destination.city}, ${s.destination.country}`,
    lastUpdated: s.details.lastUpdated
  }));
  res.json({
    success: true,
    total: samples.length,
    samples
  });
});

// GET /api/tracking/:trackingNumber - Search tracking by number
router.get('/:trackingNumber', (req, res) => {
  const { trackingNumber } = req.params;
  if (!trackingNumber || !trackingNumber.trim()) {
    return res.status(400).json({
      success: false,
      message: 'Nomor resi tidak boleh kosong.'
    });
  }

  const cleanQuery = trackingNumber.trim().toUpperCase();
  const shipments = getShipments();
  const found = shipments.find(s => s.trackingNumber.toUpperCase() === cleanQuery);

  if (!found) {
    return res.status(404).json({
      success: false,
      trackingNumber: cleanQuery,
      message: `Nomor resi "${cleanQuery}" tidak ditemukan dalam sistem kami. Pastikan format nomor resi sudah benar (contoh: FF123456ID atau RIL98765SG) atau hubungi tim customer service kami.`
    });
  }

  return res.json({
    success: true,
    data: found
  });
});

export default router;
