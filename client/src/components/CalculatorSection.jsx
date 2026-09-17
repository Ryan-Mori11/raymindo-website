import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  Plane, 
  Ship, 
  ArrowRight, 
  CheckCircle2, 
  MessageCircle, 
  Box, 
  ShieldCheck, 
  Truck, 
  FileCheck, 
  AlertTriangle,
  Info
} from 'lucide-react';

const FOREIGN_DESTINATIONS = [
  { id: 'SG', name: 'Singapura (Singapore)', flag: '🇸🇬', region: 'Asia Tenggara' },
  { id: 'CN', name: 'Tiongkok / China (Shanghai/Guangzhou)', flag: '🇨🇳', region: 'Asia Timur' },
  { id: 'MY', name: 'Malaysia (Kuala Lumpur/Penang)', flag: '🇲🇾', region: 'Asia Tenggara' },
  { id: 'JP', name: 'Jepang (Tokyo/Osaka)', flag: '🇯🇵', region: 'Asia Timur' },
  { id: 'KR', name: 'Korea Selatan (Seoul/Busan)', flag: '🇰🇷', region: 'Asia Timur' },
  { id: 'TH', name: 'Thailand (Bangkok)', flag: '🇹🇭', region: 'Asia Tenggara' },
  { id: 'VN', name: 'Vietnam (Ho Chi Minh/Hanoi)', flag: '🇻🇳', region: 'Asia Tenggara' },
  { id: 'TW', name: 'Taiwan (Taipei)', flag: '🇹🇼', region: 'Asia Timur' },
  { id: 'HK', name: 'Hong Kong', flag: '🇭🇰', region: 'Asia Timur' },
  { id: 'AU', name: 'Australia (Sydney/Melbourne)', flag: '🇦🇺', region: 'Oseania' },
  { id: 'US', name: 'Amerika Serikat / USA (Los Angeles/NY)', flag: '🇺🇸', region: 'Amerika Utara' },
  { id: 'DE', name: 'Jerman / Germany (Hamburg/Frankfurt)', flag: '🇩🇪', region: 'Eropa' },
  { id: 'NL', name: 'Belanda / Netherlands (Rotterdam)', flag: '🇳🇱', region: 'Eropa' },
  { id: 'AE', name: 'Uni Emirat Arab (Dubai)', flag: '🇦🇪', region: 'Timur Tengah' },
  { id: 'SA', name: 'Arab Saudi (Jeddah/Riyadh)', flag: '🇸🇦', region: 'Timur Tengah' },
  { id: 'GB', name: 'Inggris / UK (London/Southampton)', flag: '🇬🇧', region: 'Eropa' }
];

export default function CalculatorSection({ initialCountry, initialWeight, initialService, initialDirection }) {
  // Mode Arah Pengiriman: 'import' (Luar Negeri -> Indonesia) | 'export' (Indonesia -> Luar Negeri)
  const [direction, setDirection] = useState(initialDirection || 'import');
  
  // Pilihan Negara Luar Negeri (Indonesia selalu dikecualikan dari dropdown)
  const [selectedCountry, setSelectedCountry] = useState(initialCountry || 'SG');
  
  // Parameter Kargo
  const [weight, setWeight] = useState(initialWeight || '');
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  
  // Moda Layanan: 'air_lcl' | 'sea_lcl' | 'sea_fcl_20' | 'sea_fcl_40'
  const [serviceType, setServiceType] = useState(initialService || 'air_lcl');
  
  // Opsi Tambahan Kepabeanan
  const [includeUndername, setIncludeUndername] = useState(true);
  const [includeBahandle, setIncludeBahandle] = useState(true);
  const [includeTrucking, setIncludeTrucking] = useState(true);

  // Sync initial props
  React.useEffect(() => {
    if (initialCountry) setSelectedCountry(initialCountry);
    if (initialWeight !== undefined && initialWeight !== '') setWeight(initialWeight);
    if (initialService) setServiceType(initialService);
    if (initialDirection) setDirection(initialDirection);
  }, [initialCountry, initialWeight, initialService, initialDirection]);

  // Kalkulasi Otomatis & Seketika (Real-Time Synchronous)
  const quoteResult = useMemo(() => {
    const country = FOREIGN_DESTINATIONS.find(d => d.id === selectedCountry) || FOREIGN_DESTINATIONS[0];
    
    // Parsing nilai berat
    const hasEnteredWeight = weight !== '' && !isNaN(parseFloat(weight)) && parseFloat(weight) > 0;
    const parsedWeight = hasEnteredWeight ? parseFloat(weight) : 0;
    
    // Default base limits
    const baseWeightAir = 100;
    const baseWeightSeaLcl = 200;
    
    // Volume & Volumetrik
    const l = parseFloat(length) || 0;
    const w = parseFloat(width) || 0;
    const h = parseFloat(height) || 0;
    const volumeCubicCm = l * w * h;
    const divisor = serviceType === 'air_lcl' ? 5000 : 1000;
    const volumetricWeight = volumeCubicCm > 0 ? parseFloat((volumeCubicCm / divisor).toFixed(2)) : 0;
    
    // Effective chargeable weight calculation
    let effectiveWeight = parsedWeight;
    if (!hasEnteredWeight) {
      effectiveWeight = serviceType === 'air_lcl' ? baseWeightAir : serviceType === 'sea_lcl' ? baseWeightSeaLcl : 1;
    }
    const chargeableWeight = Math.max(effectiveWeight, volumetricWeight);

    let items = [];
    let serviceName = '';
    let hubName = '';
    let estimatedDays = '';

    if (serviceType === 'air_lcl') {
      serviceName = 'Air Freight LCL (Bandara Soekarno-Hatta)';
      hubName = 'Soekarno-Hatta Cargo Terminal (CGK)';
      estimatedDays = direction === 'import' ? '2 - 4 Hari Kerja' : '1 - 3 Hari Kerja';

      const extraKgInklaring = Math.max(0, chargeableWeight - 100);
      const inklaringCost = 1000000 + Math.round(extraKgInklaring * 5000);

      const extraKgRush = Math.max(0, chargeableWeight - 100);
      const rushCost = 800000 + Math.round(extraKgRush * 4000);

      const extraKgTrucking = Math.max(0, chargeableWeight - 200);
      const truckingCost = includeTrucking ? (800000 + Math.round(extraKgTrucking * 3000)) : 0;

      items = [
        { 
          name: 'Inklaring Service (01 - 100 kg pertama)', 
          amount: inklaringCost, 
          note: extraKgInklaring > 0 ? `Termasuk tambahan ${extraKgInklaring.toFixed(1)} kg (@Rp 5.000/kg)` : 'Tarif Dasar Kuota 100 kg' 
        },
        { 
          name: 'Rush Handling Charges (100 kg pertama)', 
          amount: rushCost, 
          note: extraKgRush > 0 ? `Termasuk percepatan beban lebih (@Rp 4.000/kg)` : 'Penanganan Kargo Cepat Bandara' 
        },
        { 
          name: 'Gerakan (Handling Lapangan)', 
          amount: 400000, 
          note: 'Operasional Gudang Lini 1 Bandara Soekarno-Hatta' 
        },
        ...(includeBahandle ? [{ 
          name: 'Bahandle / PJM (Jalur Merah)', 
          amount: 900000, 
          note: 'Pemeriksaan Fisik Kargo Petugas Bea Cukai' 
        }] : []),
        ...(includeTrucking ? [{ 
          name: 'Trucking Jakarta Area (200 kg pertama)', 
          amount: truckingCost, 
          note: extraKgTrucking > 0 ? `Termasuk armada tambahan (@Rp 3.000/kg)` : 'Armada Truk Box Bandara ke Gudang' 
        }] : []),
        { 
          name: 'Transfer EDI + PIB', 
          amount: 150000, 
          note: 'Pertukaran Data Elektronik Sistem Kepabeanan' 
        },
        { 
          name: 'Administrasi', 
          amount: 100000, 
          note: 'Administrasi Operasional PIB Bandara' 
        },
        { 
          name: 'Materai', 
          amount: 10000, 
          note: 'Materai Resmi Dokumen PIB' 
        },
        { 
          name: 'Penjaluran & Manifest Bandara', 
          amount: 80000, 
          note: 'Registrasi Manifest Kargo TPS Bandara' 
        },
        ...(includeUndername ? [{ 
          name: 'Under Name Import Barang Umum', 
          amount: 1800000, 
          note: 'Sewa Izin Impor Legal (NIB / API-U Perusahaan)' 
        }] : [])
      ];
    } 
    else if (serviceType === 'sea_lcl') {
      serviceName = 'Sea Freight LCL (Pelabuhan Tanjung Priok)';
      hubName = 'Pelabuhan Tanjung Priok (IDTPP)';
      estimatedDays = direction === 'import' ? '8 - 14 Hari Kerja' : '7 - 12 Hari Kerja';

      const extraKgLcl = Math.max(0, chargeableWeight - 200);
      const inklaringCost = 1000000 + Math.round(extraKgLcl * 3000);

      items = [
        { 
          name: 'Inklaring Service LCL', 
          amount: inklaringCost, 
          note: extraKgLcl > 0 ? `Termasuk penyesuaian ${extraKgLcl.toFixed(1)} kg (@Rp 3.000/kg)` : 'Tarif Dasar 01 s/d 200 kg' 
        },
        { 
          name: 'Rush Handling Charges LCL', 
          amount: 500000, 
          note: 'Penanganan CFS & Stripping Gudang Pelabuhan' 
        },
        ...(includeBahandle ? [{ 
          name: 'Bahandle/PJM (Jalur Merah) LCL', 
          amount: 900000, 
          note: 'Pemeriksaan Fisik Kargo Petugas Bea Cukai' 
        }] : []),
        { 
          name: 'Gerakan', 
          amount: 600000, 
          note: 'Handling Petikemas LCL Area Penumpukan Priok' 
        },
        ...(includeTrucking ? [{ 
          name: 'Trucking Jakarta Area LCL', 
          amount: 1000000, 
          note: 'Armada Truk Box Pelabuhan ke Lokasi Jabodetabek' 
        }] : []),
        { 
          name: 'Transfer EDI + PIB', 
          amount: 150000, 
          note: 'Pertukaran Data Elektronik INSW & PIB' 
        },
        { 
          name: 'Administrasi', 
          amount: 100000, 
          note: 'Administrasi Operasional Dokumen' 
        },
        { 
          name: 'Materai', 
          amount: 6000, 
          note: 'Materai Legalitas Dokumen SPPB' 
        },
        ...(includeUndername ? [{ 
          name: 'Under Name Import Barang Umum', 
          amount: 2000000, 
          note: 'Sewa Izin Impor Legal LCL PT Raymindo' 
        }] : [])
      ];
    }
    else if (serviceType === 'sea_fcl_20') {
      serviceName = 'Sea Freight FCL Container 20 Feet';
      hubName = 'Pelabuhan Tanjung Priok (Terminal Petikemas JICT/Koja)';
      estimatedDays = direction === 'import' ? '12 - 20 Hari Kerja' : '10 - 18 Hari Kerja';

      items = [
        { 
          name: 'Inklaring Service', 
          amount: 1500000, 
          note: 'Pengurusan Dokumen Kepabeanan 1x20ft Container' 
        },
        { 
          name: 'Rush Handling Charges', 
          amount: 800000, 
          note: 'Percepatan Administrasi Gate & Terminal Container' 
        },
        ...(includeBahandle ? [{ 
          name: 'Bahandle/PJM (Jalur Merah)', 
          amount: 1200000, 
          note: 'Pemeriksaan Fisik Kontainer 20 Kaki' 
        }] : []),
        { 
          name: 'Gerakan', 
          amount: 1400000, 
          note: 'Handling CY Container Lift On/Off & Depo' 
        },
        ...(includeTrucking ? [{ 
          name: 'Trucking Jakarta Area', 
          amount: 1800000, 
          note: 'Armada Truk Trailer 20 Kaki Jabodetabek' 
        }] : []),
        { 
          name: 'Transfer EDI + PIB', 
          amount: 150000, 
          note: 'Sistem Pertukaran Data Elektronik INSW & PIB' 
        },
        { 
          name: 'Administrasi', 
          amount: 100000, 
          note: 'Administrasi Operasional Dokumen Terminal' 
        },
        { 
          name: 'Materai', 
          amount: 6000, 
          note: 'Materai Legalitas Dokumen SPPB' 
        },
        ...(includeUndername ? [{ 
          name: 'Under Name Import Barang Umum', 
          amount: 2500000, 
          note: 'Sewa Izin Legal Impor Kontainer 20 Kaki' 
        }] : [])
      ];
    }
    else { // 'sea_fcl_40'
      serviceName = 'Sea Freight FCL Container 40 Feet';
      hubName = 'Pelabuhan Tanjung Priok (Terminal Petikemas JICT/Koja)';
      estimatedDays = direction === 'import' ? '12 - 20 Hari Kerja' : '10 - 18 Hari Kerja';

      items = [
        { 
          name: 'Inklaring Service', 
          amount: 1800000, 
          note: 'Pengurusan Dokumen Kepabeanan 1x40ft/40HC Container' 
        },
        { 
          name: 'Rush Handling Charges', 
          amount: 800000, 
          note: 'Percepatan Administrasi Gate & Terminal Container' 
        },
        ...(includeBahandle ? [{ 
          name: 'Bahandle/PJM (Jalur Merah)', 
          amount: 1500000, 
          note: 'Pemeriksaan Fisik Kontainer 40 Kaki' 
        }] : []),
        { 
          name: 'Gerakan', 
          amount: 1600000, 
          note: 'Handling CY Container Lift On/Off & Depo 40ft' 
        },
        ...(includeTrucking ? [{ 
          name: 'Trucking Jakarta Area', 
          amount: 2200000, 
          note: 'Armada Truk Trailer 40 Kaki Jabodetabek' 
        }] : []),
        { 
          name: 'Transfer EDI + PIB', 
          amount: 150000, 
          note: 'Sistem Pertukaran Data Elektronik INSW & PIB' 
        },
        { 
          name: 'Administrasi', 
          amount: 100000, 
          note: 'Administrasi Operasional Dokumen Terminal' 
        },
        { 
          name: 'Materai', 
          amount: 10000, 
          note: 'Materai Legalitas Dokumen SPPB' 
        },
        ...(includeUndername ? [{ 
          name: 'Under Name Import Barang Umum', 
          amount: 3000000, 
          note: 'Sewa Izin Legal Impor Kontainer 40 Kaki' 
        }] : [])
      ];
    }

    const totalCostIdr = items.reduce((sum, item) => sum + item.amount, 0);
    const usdRate = 16200;
    const totalCostUsd = parseFloat((totalCostIdr / usdRate).toFixed(2));

    const origin = direction === 'import' ? country.name : 'Jakarta, Indonesia';
    const destination = direction === 'import' ? 'Jakarta, Indonesia' : country.name;

    return {
      direction,
      directionLabel: direction === 'import' ? 'Impor (Luar Negeri ke Indonesia)' : 'Ekspor (Indonesia ke Luar Negeri)',
      country,
      origin,
      destination,
      service: {
        key: serviceType,
        name: serviceName,
        hub: hubName,
        estimatedDays
      },
      measurements: {
        hasEnteredWeight,
        actualWeightKg: effectiveWeight,
        volumetricWeightKg: volumetricWeight,
        chargeableWeightKg: chargeableWeight,
        dimensionsCm: `${l} x ${w} x ${h}`,
        chargeBasis: volumetricWeight > effectiveWeight ? `Volumetrik (${chargeableWeight} kg)` : `Aktual (${effectiveWeight} kg)`
      },
      pricing: {
        currency: 'IDR',
        totalCostIdr,
        totalCostUsd,
        breakdown: items
      },
      disclaimer: 'Biaya di atas belum termasuk Pajak Impor (Bea Masuk, PPN, PPh pasal 22), D/O Fee, Laporan Surveyor (LS), Sewa Gudang/Penumpukan, Jaminan Container, dan Demurrage.'
    };
  }, [
    direction, 
    selectedCountry, 
    weight, 
    length, 
    width, 
    height, 
    serviceType, 
    includeUndername, 
    includeBahandle, 
    includeTrucking
  ]);

  // WhatsApp link generator dengan rincian lengkap penawaran
  const getWhatsAppBookingUrl = () => {
    if (!quoteResult) return 'https://wa.me/6281517077855';
    const text = `Halo PT RAYMINDO INTERBENUA LINE, saya ingin konsultasi / konfirmasi jadwal pengiriman kargo resmi:

• Arah Pengiriman: ${quoteResult.directionLabel}
• Rute: ${quoteResult.origin} ➔ ${quoteResult.destination}
• Layanan: ${quoteResult.service.name}
• Terminal / Hub: ${quoteResult.service.hub}
• Berat / Muatan: ${quoteResult.measurements.actualWeightKg} kg (Dimensi: ${quoteResult.measurements.dimensionsCm} cm)
• Estimasi Waktu: ${quoteResult.service.estimatedDays}

RINCIAN BIAYA PENAWARAN (RESMI):
${quoteResult.pricing.breakdown.map(b => `- ${b.name}: Rp ${b.amount.toLocaleString('id-ID')}`).join('\n')}
---------------------------------
TOTAL ESTIMASI DASAR: Rp ${quoteResult.pricing.totalCostIdr.toLocaleString('id-ID')} (≈ USD $${quoteResult.pricing.totalCostUsd})

Catatan: ${quoteResult.disclaimer}

Mohon konfirmasi ketersediaan space dan jadwal kargo terdekat. Terima kasih!`;

    return `https://wa.me/6281517077855?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="calculator" className="py-16 sm:py-24 bg-white border-b border-slate-200 scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider mb-2">
            <Calculator className="w-3.5 h-3.5 mr-1 text-blue-600" />
            Struktur Biaya Resmi & Transparan
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight">
            Kalkulator Tarif Forwarding & Customs Clearance
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Perhitungan estimasi biaya pengiriman dua arah (Impor & Ekspor) berpedoman pada daftar tarif resmi PT Raymindo Interbenua Line melalui Bandara Soekarno-Hatta & Pelabuhan Tanjung Priok.
          </p>
        </div>

        {/* Direction Switcher (Dua Arah: Impor vs Ekspor) */}
        <div className="max-w-xl mx-auto mb-8 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 flex items-center shadow-inner">
          <button
            type="button"
            onClick={() => setDirection('import')}
            className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center space-x-2 transition-all ${
              direction === 'import'
                ? 'bg-brand-navy text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="text-base">📥</span>
            <span>Impor: Luar Negeri ➔ Indonesia</span>
          </button>

          <button
            type="button"
            onClick={() => setDirection('export')}
            className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center space-x-2 transition-all ${
              direction === 'export'
                ? 'bg-brand-red text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="text-base">📤</span>
            <span>Ekspor: Indonesia ➔ Luar Negeri</span>
          </button>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Form Inputs (7 cols) */}
          <div className="lg:col-span-7 bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center space-x-2">
              <Box className="w-5 h-5 text-brand-blue" />
              <span>Parameter Pengiriman ({direction === 'import' ? 'Barang Masuk / Impor' : 'Barang Keluar / Ekspor'})</span>
            </h3>

            <div className="space-y-6">
              
              {/* Dropdown Negara Asal / Tujuan (Khusus Negara Luar Negeri) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  {direction === 'import' ? 'Negara Asal Pengiriman (Origin - Luar Negeri)' : 'Negara Tujuan Pengiriman (Destination - Luar Negeri)'}
                </label>
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3.5 text-slate-900 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-brand-blue shadow-xs"
                >
                  {FOREIGN_DESTINATIONS.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.flag} {d.name} ({d.region})
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-slate-500 mt-1.5 flex items-center space-x-1">
                  <Info className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                  <span>
                    {direction === 'import' 
                      ? 'Barang dikirim dari negara luar negeri ke Jakarta, Indonesia.' 
                      : 'Barang dikirim dari Jakarta, Indonesia menuju negara tujuan terpilih.'}
                  </span>
                </p>
              </div>

              {/* Service Selection Cards */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
                  Pilih Moda & Jenis Kargo
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  
                  {/* Air LCL */}
                  <button
                    type="button"
                    onClick={() => setServiceType('air_lcl')}
                    className={`p-3.5 rounded-2xl border text-left transition-all ${
                      serviceType === 'air_lcl'
                        ? 'bg-blue-50 border-brand-blue text-brand-navy shadow-sm ring-2 ring-brand-blue'
                        : 'bg-white border-slate-300 text-slate-700 hover:border-slate-400'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <Plane className={`w-5 h-5 ${serviceType === 'air_lcl' ? 'text-brand-blue' : 'text-slate-400'}`} />
                      <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-blue-100 text-blue-800">CGK Airport</span>
                    </div>
                    <div className="font-bold text-xs sm:text-sm">Air Freight LCL</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">Bandara Soekarno-Hatta (01 - 100 kg)</div>
                  </button>

                  {/* Sea LCL */}
                  <button
                    type="button"
                    onClick={() => setServiceType('sea_lcl')}
                    className={`p-3.5 rounded-2xl border text-left transition-all ${
                      serviceType === 'sea_lcl'
                        ? 'bg-teal-50 border-teal-600 text-brand-navy shadow-sm ring-2 ring-teal-600'
                        : 'bg-white border-slate-300 text-slate-700 hover:border-slate-400'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <Ship className={`w-5 h-5 ${serviceType === 'sea_lcl' ? 'text-teal-600' : 'text-slate-400'}`} />
                      <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-teal-100 text-teal-800">Tanjung Priok</span>
                    </div>
                    <div className="font-bold text-xs sm:text-sm">Sea Freight LCL</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">Pelabuhan Tanjung Priok (01 - 200 kg)</div>
                  </button>

                  {/* Sea FCL 20ft */}
                  <button
                    type="button"
                    onClick={() => setServiceType('sea_fcl_20')}
                    className={`p-3.5 rounded-2xl border text-left transition-all ${
                      serviceType === 'sea_fcl_20'
                        ? 'bg-red-50 border-brand-red text-brand-navy shadow-sm ring-2 ring-brand-red'
                        : 'bg-white border-slate-300 text-slate-700 hover:border-slate-400'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <Ship className={`w-5 h-5 ${serviceType === 'sea_fcl_20' ? 'text-brand-red' : 'text-slate-400'}`} />
                      <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-red-100 text-brand-red">1x20ft Container</span>
                    </div>
                    <div className="font-bold text-xs sm:text-sm">FCL 20 Feet Container</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">Full Container Load (Kapasitas ~33 CBM)</div>
                  </button>

                  {/* Sea FCL 40ft */}
                  <button
                    type="button"
                    onClick={() => setServiceType('sea_fcl_40')}
                    className={`p-3.5 rounded-2xl border text-left transition-all ${
                      serviceType === 'sea_fcl_40'
                        ? 'bg-indigo-50 border-indigo-600 text-brand-navy shadow-sm ring-2 ring-indigo-600'
                        : 'bg-white border-slate-300 text-slate-700 hover:border-slate-400'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <Ship className={`w-5 h-5 ${serviceType === 'sea_fcl_40' ? 'text-indigo-600' : 'text-slate-400'}`} />
                      <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-indigo-100 text-indigo-800">1x40ft / 40HC</span>
                    </div>
                    <div className="font-bold text-xs sm:text-sm">FCL 40 Feet Container</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">Full Container 40 Kaki / High Cube (~67 CBM)</div>
                  </button>

                </div>
              </div>

              {/* Weight and Dimensions (Relevant for LCL & Air) */}
              <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Berat Kargo (kg)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        min="1"
                        step="1"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        placeholder={serviceType === 'air_lcl' ? '100' : serviceType === 'sea_lcl' ? '200' : 'Kontainer'}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
                      />
                      <span className="absolute right-3.5 top-2.5 text-xs font-bold text-slate-400">KG</span>
                    </div>
                    {(!weight || weight === '0') && (
                      <span className="text-[11px] text-amber-600 font-medium mt-1 block">
                        *Menampilkan estimasi dasar standar ({serviceType === 'air_lcl' ? '01 - 100 kg' : serviceType === 'sea_lcl' ? '01 - 200 kg' : '1 Kontainer'}).
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Dimensi Paket (P x L x T cm)
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <input
                        type="number"
                        placeholder="P"
                        value={length}
                        onChange={(e) => setLength(e.target.value)}
                        className="bg-slate-50 border border-slate-300 rounded-lg p-2 text-center text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-brand-blue"
                      />
                      <input
                        type="number"
                        placeholder="L"
                        value={width}
                        onChange={(e) => setWidth(e.target.value)}
                        className="bg-slate-50 border border-slate-300 rounded-lg p-2 text-center text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-brand-blue"
                      />
                      <input
                        type="number"
                        placeholder="T"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        className="bg-slate-50 border border-slate-300 rounded-lg p-2 text-center text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-brand-blue"
                      />
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1 block">
                      Digunakan untuk validasi perhitungan berat volumetrik kargo.
                    </span>
                  </div>
                </div>
              </div>

              {/* Option Checkboxes: Undername, Bahandle, Trucking */}
              <div className="space-y-3 pt-2 border-t border-slate-200">
                <span className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Opsi Tambahan Layanan Kepabeanan:
                </span>

                {/* Undername Service Toggle */}
                <label className="flex items-start space-x-3 p-3.5 bg-white rounded-2xl border border-slate-200 hover:bg-blue-50/40 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={includeUndername}
                    onChange={(e) => setIncludeUndername(e.target.checked)}
                    className="mt-1 w-4 h-4 text-brand-red rounded border-slate-300 focus:ring-brand-red"
                  />
                  <div>
                    <div className="text-xs font-bold text-slate-900 flex items-center space-x-1.5">
                      <FileCheck className="w-3.5 h-3.5 text-brand-red" />
                      <span>Gunakan Layanan Undername (Sewa Izin Impor Resmi)</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Sewa izin legal impor (NIB/API-U) jika Anda belum memiliki dokumen izin impor sendiri.
                    </p>
                  </div>
                </label>

                {/* Bahandle / PJM */}
                <label className="flex items-start space-x-3 p-3.5 bg-white rounded-2xl border border-slate-200 hover:bg-amber-50/40 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={includeBahandle}
                    onChange={(e) => setIncludeBahandle(e.target.checked)}
                    className="mt-1 w-4 h-4 text-amber-600 rounded border-slate-300 focus:ring-amber-500"
                  />
                  <div>
                    <div className="text-xs font-bold text-slate-900 flex items-center space-x-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                      <span>Pemeriksaan Bahandle / PJM (Jalur Merah Bea Cukai)</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Biaya pendampingan pemeriksaan fisik barang jika kargo terkena jalur merah saat proses clearance.
                    </p>
                  </div>
                </label>

                {/* Trucking Area Jakarta */}
                <label className="flex items-start space-x-3 p-3.5 bg-white rounded-2xl border border-slate-200 hover:bg-emerald-50/40 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={includeTrucking}
                    onChange={(e) => setIncludeTrucking(e.target.checked)}
                    className="mt-1 w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
                  />
                  <div>
                    <div className="text-xs font-bold text-slate-900 flex items-center space-x-1.5">
                      <Truck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Trucking Area Jakarta / Jabodetabek</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Pengantaran armada dari terminal bandara/pelabuhan sampai ke gudang Anda di area Jabodetabek.
                    </p>
                  </div>
                </label>

              </div>

            </div>
          </div>

          {/* Right Column: Itemized Breakdown Display (5 cols) - ANTI KOSONG */}
          <div className="lg:col-span-5 space-y-4">
            
            <div className="bg-gradient-to-br from-brand-navy to-slate-900 rounded-3xl p-6 sm:p-7 text-white shadow-card border border-slate-700/80 relative overflow-hidden">
              
              {/* Direction & Hub Header */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{quoteResult.country.flag}</span>
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Rute Kargo:</div>
                    <div className="font-bold text-xs sm:text-sm text-white">{quoteResult.origin} ➔ {quoteResult.destination}</div>
                  </div>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold border ${
                  direction === 'import' ? 'bg-blue-900/60 text-blue-200 border-blue-600/50' : 'bg-red-900/60 text-red-200 border-red-600/50'
                }`}>
                  {direction === 'import' ? '📥 IMPOR RESMI' : '📤 EKSPOR RESMI'}
                </span>
              </div>

              {/* Service & Hub Badge */}
              <div className="text-xs text-slate-300 mb-4 bg-white/5 p-3 rounded-2xl border border-white/10">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-semibold">Moda Layanan:</span>
                    <strong className="text-white text-sm">{quoteResult.service.name}</strong>
                    <span className="block text-[11px] text-blue-300 mt-0.5">Hub: {quoteResult.service.hub}</span>
                  </div>
                  <span className="text-[11px] bg-amber-400/20 text-amber-300 border border-amber-400/30 px-2 py-0.5 rounded-lg font-bold">
                    ⏱ {quoteResult.service.estimatedDays}
                  </span>
                </div>
              </div>

              {/* Total Price Display */}
              <div className="mb-4 bg-slate-950/80 p-4 rounded-2xl border border-slate-800">
                <span className="text-[11px] uppercase tracking-wider text-slate-400 block mb-1">
                  Estimasi Total Penawaran Jasa:
                </span>
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-200 to-green-400">
                    Rp {quoteResult.pricing.totalCostIdr.toLocaleString('id-ID')}
                  </span>
                </div>
                <div className="text-xs text-slate-300 font-mono mt-1 flex justify-between items-center">
                  <span>≈ USD ${quoteResult.pricing.totalCostUsd.toFixed(2)}</span>
                  <span className="text-[11px] text-slate-400">
                    {quoteResult.service.key.startsWith('sea_fcl') 
                      ? 'Dasar: 1 Unit Kontainer FCL' 
                      : (quoteResult.measurements.hasEnteredWeight 
                          ? `Dasar: ${quoteResult.measurements.chargeableWeightKg} kg` 
                          : `Dasar: Estimasi Standar (${quoteResult.measurements.chargeableWeightKg} kg)`)}
                  </span>
                </div>
              </div>

              {/* Itemized Table Breakdown */}
              <div className="bg-slate-950/70 rounded-2xl p-4 border border-slate-800 mb-4 max-h-72 overflow-y-auto space-y-2">
                <div className="text-[11px] font-bold text-slate-300 border-b border-slate-800 pb-2 flex justify-between">
                  <span>Rincian Komponen Biaya Resmi:</span>
                  <span>Tarif (IDR)</span>
                </div>

                {quoteResult.pricing.breakdown.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-start text-[11px] text-slate-300 py-1.5 border-b border-slate-900/80">
                    <div className="pr-2">
                      <span className="font-semibold text-white block leading-tight">{item.name}</span>
                      {item.note && <span className="text-[10px] text-slate-400">{item.note}</span>}
                    </div>
                    <span className="font-mono font-bold text-emerald-400 whitespace-nowrap text-right">
                      Rp {item.amount.toLocaleString('id-ID')}
                    </span>
                  </div>
                ))}
              </div>

              {/* Mandatory Official Disclaimer */}
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-3.5 mb-5 flex items-start space-x-2.5 text-amber-200 text-xs leading-relaxed">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Catatan Penting:</strong> {quoteResult.disclaimer}
                </span>
              </div>

              {/* WhatsApp Action Button */}
              <a
                href={getWhatsAppBookingUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold rounded-2xl shadow-lg transition-all flex items-center justify-center space-x-2 text-xs sm:text-sm transform hover:-translate-y-0.5"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Kirim Penawaran Ini ke WhatsApp (0815 1707 7855)</span>
                <ArrowRight className="w-4 h-4" />
              </a>

            </div>

            {/* Feature Note Box */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs text-slate-600 space-y-2">
              <div className="font-bold text-slate-900 flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Keunggulan Layanan PT Raymindo Interbenua Line:</span>
              </div>
              <p>
                ✓ Izin Undername lengkap dan aktif untuk barang umum, mesin industri, tekstil, dan aksesoris.
              </p>
              <p>
                ✓ Penanganan kepabeanan resmi (PPJK) berpengalaman di Bandara Soekarno-Hatta & Pelabuhan Tanjung Priok.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
