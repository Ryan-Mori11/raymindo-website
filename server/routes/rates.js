import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ratesFilePath = path.join(__dirname, '../data/rates.json');

function getRatesData() {
  try {
    const raw = fs.readFileSync(ratesFilePath, 'utf8');
    return JSON.parse(raw);
  } catch (error) {
    console.error('Error reading rates.json:', error);
    return { destinations: [], currencyRates: { USD_TO_IDR: 16200 } };
  }
}

// GET /api/rates/destinations
router.get('/destinations', (req, res) => {
  const data = getRatesData();
  res.json({
    success: true,
    destinations: data.destinations || [],
    usdRate: data.currencyRates?.USD_TO_IDR || 16200
  });
});

// POST /api/rates/calculate
router.post('/calculate', (req, res) => {
  const {
    direction = 'import', // 'import' (Luar Negeri -> Indonesia) | 'export' (Indonesia -> Luar Negeri)
    countryId = 'SG',
    weight = 50,
    length = 50,
    width = 40,
    height = 30,
    serviceType = 'air_lcl', // 'air_lcl' | 'sea_lcl' | 'sea_fcl_20' | 'sea_fcl_40'
    includeUndername = true,
    includeBahandle = true,
    includeTrucking = true
  } = req.body;

  const actualWeight = Math.max(parseFloat(weight) || 1, 0.5);
  const l = parseFloat(length) || 0;
  const w = parseFloat(width) || 0;
  const h = parseFloat(height) || 0;

  const data = getRatesData();
  const country = data.destinations.find(d => d.id === countryId || d.code === countryId) || {
    id: 'SG',
    name: 'Singapura',
    flag: '🇸🇬',
    region: 'Asia Tenggara'
  };

  // Volumetric weight calculation
  const volumeCubicCm = l * w * h;
  const cbm = volumeCubicCm > 0 ? volumeCubicCm / 1000000 : 0;
  const divisor = serviceType.startsWith('air') ? 5000 : 1000;
  const volumetricWeight = volumeCubicCm > 0 ? parseFloat((volumeCubicCm / divisor).toFixed(2)) : 0;
  const chargeableWeight = Math.max(actualWeight, volumetricWeight);

  // Official Tariffs Breakdown according to PT Raymindo's Rate Sheet
  let items = [];
  let serviceName = '';
  let hubName = '';
  let estimatedDays = '';

  const adminFee = 100000;
  const ediPibFee = 150000;
  const materaiFee = 10000;

  if (serviceType === 'air_lcl') {
    serviceName = 'Air Freight (LCL via Bandara Soekarno-Hatta)';
    hubName = 'Soekarno-Hatta International Cargo Terminal (CGK)';
    estimatedDays = direction === 'import' ? '2 - 4 Hari Kerja' : '1 - 3 Hari Kerja';

    // Inklaring 01-100kg: 1.000.000, extra: 5.000/kg
    const extraWeightInklaring = Math.max(0, chargeableWeight - 100);
    const inklaringCost = 1000000 + Math.round(extraWeightInklaring * 5000);

    // Rush Handling 100kg pertama: 800.000, extra: 4.000/kg
    const extraWeightRush = Math.max(0, chargeableWeight - 100);
    const rushCost = 800000 + Math.round(extraWeightRush * 4000);

    const gerakanCost = 400000;
    const bahandleCost = includeBahandle ? 900000 : 0;
    const truckingCost = includeTrucking ? 800000 : 0;
    const undernameCost = includeUndername ? 1800000 : 0;

    items = [
      { name: 'Inklaring Service (01 - 100 kg pertama)', amount: inklaringCost, note: chargeableWeight > 100 ? `Termasuk tambahan ${extraWeightInklaring.toFixed(1)} kg` : 'Tarif Dasar 100 kg' },
      { name: 'Rush Handling Charges (100 kg pertama)', amount: rushCost, note: chargeableWeight > 100 ? `Termasuk penanganan beban lebih` : 'Penanganan Kargo Cepat Bandara' },
      { name: 'Gerakan (Handling Lapangan)', amount: gerakanCost, note: 'Operasional Gudang Bandara' },
      ...(includeBahandle ? [{ name: 'Bahandle / PJM (Jalur Merah)', amount: bahandleCost, note: 'Pemeriksaan Fisik Petugas Bea Cukai' }] : []),
      ...(includeTrucking ? [{ name: 'Trucking Jakarta Area (200 kg pertama)', amount: truckingCost, note: 'Pengantaran Armada Gudang ke Lokasi' }] : []),
      { name: 'Transfer EDI + PIB', amount: 150000, note: 'Sistem Pertukaran Data Elektronik Kepabeanan' },
      { name: 'Administrasi', amount: 100000, note: 'Administrasi Operasional PIB Bandara' },
      { name: 'Materai', amount: 10000, note: 'Materai Resmi Dokumen PIB' },
      { name: 'Penjaluran & Manifest Bandara', amount: 80000, note: 'Registrasi Manifest Kargo TPS Bandara' },
      ...(includeUndername ? [{ name: 'Under Name Import Barang Umum', amount: undernameCost, note: 'Sewa Izin Impor Legal (NIB / API-U)' }] : [])
    ];
  } 
  else if (serviceType === 'sea_lcl') {
    serviceName = 'Sea Freight (LCL via Pelabuhan Tanjung Priok)';
    hubName = 'Pelabuhan Tanjung Priok (IDTPP)';
    estimatedDays = direction === 'import' ? '8 - 14 Hari Kerja' : '7 - 12 Hari Kerja';

    const extraWeightLcl = Math.max(0, chargeableWeight - 200);
    const inklaringCost = 1000000 + Math.round(extraWeightLcl * 3000);
    const rushCost = 500000;
    const gerakanCost = 600000;
    const bahandleCost = includeBahandle ? 900000 : 0;
    const truckingCost = includeTrucking ? 1000000 : 0;
    const undernameCost = includeUndername ? 2000000 : 0;

    items = [
      { name: 'Inklaring Service LCL', amount: inklaringCost, note: chargeableWeight > 200 ? `Termasuk tambahan ${extraWeightLcl.toFixed(1)} kg` : 'Tarif Dasar 200 kg' },
      { name: 'Rush Handling Charges LCL', amount: rushCost, note: 'Penanganan CFS Gudang Pelabuhan' },
      ...(includeBahandle ? [{ name: 'Bahandle/PJM (Jalur Merah) LCL', amount: bahandleCost, note: 'Pemeriksaan Fisik Bea Cukai' }] : []),
      { name: 'Gerakan', amount: gerakanCost, note: 'Pemindahan Kargo Penumpukan Priok' },
      ...(includeTrucking ? [{ name: 'Trucking Jakarta Area LCL', amount: truckingCost, note: 'Armada Truk Box Jabodetabek' }] : []),
      { name: 'Transfer EDI + PIB', amount: 150000, note: 'Sistem Pertukaran Data Elektronik INSW & PIB' },
      { name: 'Administrasi', amount: 100000, note: 'Administrasi Operasional Dokumen' },
      { name: 'Materai', amount: 6000, note: 'Materai Legalitas Dokumen SPPB' },
      ...(includeUndername ? [{ name: 'Under Name Import Barang Umum', amount: undernameCost, note: 'Sewa Izin Impor Legal LCL' }] : [])
    ];
  }
  else if (serviceType === 'sea_fcl_20') {
    serviceName = 'Sea Freight FCL 20 Feet Container (via Tanjung Priok)';
    hubName = 'Pelabuhan Tanjung Priok Terminal Petikemas JICT/Koja';
    estimatedDays = direction === 'import' ? '12 - 20 Hari Kerja' : '10 - 18 Hari Kerja';

    const inklaringCost = 1500000;
    const rushCost = 800000;
    const bahandleCost = includeBahandle ? 1200000 : 0;
    const gerakanCost = 1400000;
    const truckingCost = includeTrucking ? 1800000 : 0;
    const undernameCost = includeUndername ? 2500000 : 0;

    items = [
      { name: 'Inklaring Service', amount: inklaringCost, note: 'Pengurusan Customs Clearance 1x20ft' },
      { name: 'Rush Handling Charges', amount: rushCost, note: 'Percepatan Administrasi Terminal' },
      ...(includeBahandle ? [{ name: 'Bahandle/PJM (Jalur Merah)', amount: bahandleCost, note: 'Pemeriksaan Fisik Kontainer 20ft' }] : []),
      { name: 'Gerakan', amount: gerakanCost, note: 'Lift On / Lift Off & Shifting Depo' },
      ...(includeTrucking ? [{ name: 'Trucking Jakarta Area', amount: truckingCost, note: 'Armada Truk Trailer 20 Kaki' }] : []),
      { name: 'Transfer EDI + PIB', amount: 150000, note: 'Sistem Pertukaran Data Elektronik & PIB' },
      { name: 'Administrasi', amount: 100000, note: 'Administrasi Operasional Dokumen Terminal' },
      { name: 'Materai', amount: 6000, note: 'Materai Legalitas Dokumen SPPB' },
      ...(includeUndername ? [{ name: 'Under Name Import Barang Umum', amount: undernameCost, note: 'Sewa Izin Impor Legal Kontainer 20ft' }] : [])
    ];
  }
  else { // 'sea_fcl_40'
    serviceName = 'Sea Freight FCL 40 Feet Container (via Tanjung Priok)';
    hubName = 'Pelabuhan Tanjung Priok Terminal Petikemas JICT/Koja';
    estimatedDays = direction === 'import' ? '12 - 20 Hari Kerja' : '10 - 18 Hari Kerja';

    const inklaringCost = 1800000;
    const rushCost = 800000;
    const bahandleCost = includeBahandle ? 1500000 : 0;
    const gerakanCost = 1600000;
    const truckingCost = includeTrucking ? 2200000 : 0;
    const undernameCost = includeUndername ? 3000000 : 0;

    items = [
      { name: 'Inklaring Service', amount: inklaringCost, note: 'Pengurusan Customs Clearance 1x40ft/40HC' },
      { name: 'Rush Handling Charges', amount: rushCost, note: 'Percepatan Administrasi Terminal' },
      ...(includeBahandle ? [{ name: 'Bahandle/PJM (Jalur Merah)', amount: bahandleCost, note: 'Pemeriksaan Fisik Kontainer 40ft' }] : []),
      { name: 'Gerakan', amount: gerakanCost, note: 'Lift On / Lift Off & Shifting Depo 40ft' },
      ...(includeTrucking ? [{ name: 'Trucking Jakarta Area', amount: truckingCost, note: 'Armada Truk Trailer 40 Kaki' }] : []),
      { name: 'Transfer EDI + PIB', amount: 150000, note: 'Sistem Pertukaran Data Elektronik & PIB' },
      { name: 'Administrasi', amount: 100000, note: 'Administrasi Operasional Dokumen Terminal' },
      { name: 'Materai', amount: 10000, note: 'Materai Legalitas Dokumen SPPB' },
      ...(includeUndername ? [{ name: 'Under Name Import Barang Umum', amount: undernameCost, note: 'Sewa Izin Impor Legal Kontainer 40 Kaki' }] : [])
    ];
  }

  const subtotalIdr = items.reduce((sum, item) => sum + item.amount, 0);
  const totalCostIdr = subtotalIdr;
  const usdRate = data.currencyRates?.USD_TO_IDR || 16200;
  const totalCostUsd = parseFloat((totalCostIdr / usdRate).toFixed(2));

  // Determine Origin & Destination
  const routeOrigin = direction === 'import' ? `${country.name} (${country.region || 'Luar Negeri'})` : 'Jakarta, Indonesia';
  const routeDestination = direction === 'import' ? 'Jakarta, Indonesia' : `${country.name} (${country.region || 'Luar Negeri'})`;

  res.json({
    success: true,
    data: {
      direction,
      directionLabel: direction === 'import' ? 'Impor (Luar Negeri ke Indonesia)' : 'Ekspor (Indonesia ke Luar Negeri)',
      origin: routeOrigin,
      destination: routeDestination,
      country: {
        id: country.id,
        name: country.name,
        flag: country.flag || '🌐',
        region: country.region || ''
      },
      service: {
        key: serviceType,
        name: serviceName,
        hub: hubName,
        estimatedDays
      },
      measurements: {
        actualWeightKg: actualWeight,
        volumetricWeightKg: volumetricWeight,
        chargeableWeightKg: chargeableWeight,
        dimensionsCm: `${l} x ${w} x ${h}`,
        cbm: parseFloat(cbm.toFixed(3)),
        chargeBasis: volumetricWeight > actualWeight ? `Volumetrik (${chargeableWeight} kg)` : `Aktual (${actualWeight} kg)`
      },
      pricing: {
        currency: 'IDR',
        subtotalIdr,
        totalCostIdr,
        totalCostUsd,
        usdExchangeRate: usdRate,
        breakdown: items
      },
      disclaimer: 'Biaya di atas belum termasuk Pajak Impor (Bea Masuk, PPN, PPh pasal 22), D/O Fee, Laporan Surveyor (LS), Sewa Gudang/Penumpukan, Jaminan Container, dan Demurrage.'
    }
  });
});

export default router;
