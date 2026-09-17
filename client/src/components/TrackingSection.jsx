import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Package, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Ship, 
  Plane, 
  Truck, 
  Copy, 
  Check, 
  ArrowRight, 
  FileText, 
  Building2, 
  UserCheck, 
  Share2, 
  MessageCircle,
  ExternalLink,
  ShieldCheck,
  Calendar
} from 'lucide-react';

export default function TrackingSection({ searchNumber, onResetSearch }) {
  const [query, setQuery] = useState(searchNumber || 'FF123456ID');
  const [loading, setLoading] = useState(false);
  const [shipmentData, setShipmentData] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [copied, setCopied] = useState(false);
  const [sampleList, setSampleList] = useState([]);

  // Fetch samples on load
  useEffect(() => {
    fetch('/api/tracking')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.samples) {
          setSampleList(data.samples);
        }
      })
      .catch(err => {
        console.warn('Could not fetch sample list, using default', err);
      });
  }, []);

  // Sync external searchNumber if changed
  useEffect(() => {
    if (searchNumber) {
      setQuery(searchNumber);
      handleSearch(searchNumber);
    }
  }, [searchNumber]);

  // Initial search on mount
  useEffect(() => {
    handleSearch('FF123456ID');
  }, []);

  const handleSearch = async (trackingNoToSearch) => {
    const term = (trackingNoToSearch || query).trim().toUpperCase();
    if (!term) return;

    setLoading(true);
    setErrorMsg(null);
    setShipmentData(null);

    try {
      const response = await fetch(`/api/tracking/${encodeURIComponent(term)}`);
      const result = await response.json();

      if (response.ok && result.success) {
        setShipmentData(result.data);
      } else {
        setErrorMsg(result.message || `Nomor resi ${term} tidak ditemukan.`);
      }
    } catch (err) {
      console.error('Fetch tracking error:', err);
      setErrorMsg('Gagal terhubung ke server pelacakan. Mohon periksa koneksi internet Anda atau coba beberapa saat lagi.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getServiceIcon = (serviceType) => {
    switch (serviceType) {
      case 'AIR_FREIGHT':
        return <Plane className="w-5 h-5 text-blue-500" />;
      case 'SEA_FREIGHT':
        return <Ship className="w-5 h-5 text-teal-500" />;
      case 'DOOR_TO_DOOR':
        return <Truck className="w-5 h-5 text-amber-500" />;
      default:
        return <Package className="w-5 h-5 text-brand-red" />;
    }
  };

  const getStatusBadgeClass = (statusCode) => {
    switch (statusCode) {
      case 'DELIVERED':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'CUSTOMS_CLEARANCE':
        return 'bg-amber-100 text-amber-800 border-amber-300 animate-pulse';
      case 'IN_TRANSIT':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'PICKED_UP':
        return 'bg-indigo-100 text-indigo-800 border-indigo-300';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

  return (
    <section id="tracking" className="py-16 sm:py-24 bg-slate-100 border-b border-slate-200 scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-brand-red/10 text-brand-red text-xs font-bold uppercase tracking-wider mb-2">
            <Package className="w-3.5 h-3.5 mr-1" />
            Sistem Pelacakan Satelit & Bea Cukai
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight">
            Lacak Posisi Kargo & Kontainer Anda
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Dapatkan status terkini penerbangan kargo udara, posisi koordinat kapal laut, dan progres pemeriksaan kepabeanan secara langsung dan akurat.
          </p>
        </div>

        {/* Search Input Box */}
        <div className="max-w-3xl mx-auto mb-10">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch(query);
            }} 
            className="bg-white p-3 sm:p-4 rounded-2xl shadow-card border border-slate-200/80 flex flex-col sm:flex-row gap-3 items-center"
          >
            <div className="relative flex-1 w-full">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Masukkan Nomor Resi / AWB (contoh: FF123456ID)"
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent text-slate-900 font-mono text-sm sm:text-base uppercase placeholder-slate-400"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto px-8 py-3.5 bg-brand-red hover:bg-brand-redHover text-white font-bold rounded-xl shadow-glow-red transition-all flex items-center justify-center space-x-2 shrink-0 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  <span>Mencari...</span>
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  <span>Lacak Resi</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Chips */}
          <div className="mt-3 flex items-center flex-wrap gap-2 text-xs text-slate-500 justify-center">
            <span className="font-semibold text-slate-700">Pilihan Resi Demo:</span>
            <button
              onClick={() => { setQuery('FF123456ID'); handleSearch('FF123456ID'); }}
              className="font-mono bg-white hover:bg-blue-50 text-brand-navy hover:text-blue-600 px-2.5 py-1 rounded-md border border-slate-300 font-bold transition-all shadow-xs"
            >
              FF123456ID (Air Freight - Singapore Customs)
            </button>
            <button
              onClick={() => { setQuery('RIL98765SG'); handleSearch('RIL98765SG'); }}
              className="font-mono bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 px-2.5 py-1 rounded-md border border-slate-300 transition-all shadow-xs"
            >
              RIL98765SG (Delivered - Malaysia)
            </button>
            <button
              onClick={() => { setQuery('RIL44102CN'); handleSearch('RIL44102CN'); }}
              className="font-mono bg-white hover:bg-teal-50 text-slate-700 hover:text-teal-700 px-2.5 py-1 rounded-md border border-slate-300 transition-all shadow-xs"
            >
              RIL44102CN (Sea Freight 40HC - Shanghai)
            </button>
          </div>
        </div>

        {/* State: Error / Not Found */}
        {errorMsg && (
          <div className="max-w-3xl mx-auto bg-white border border-red-200 rounded-2xl p-6 sm:p-8 shadow-card text-center animate-fade-in">
            <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center text-brand-red mb-4">
              <AlertCircle className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Resi Tidak Ditemukan</h3>
            <p className="text-sm text-slate-600 max-w-lg mx-auto mb-6 leading-relaxed">
              {errorMsg}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => {
                  setQuery('FF123456ID');
                  handleSearch('FF123456ID');
                }}
                className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs rounded-xl transition-all"
              >
                Coba Resi Demo bawaan (FF123456ID)
              </button>
              <a
                href={`https://wa.me/6281517077855?text=Halo%20Admin%20Raymindo,%20saya%20ingin%20menanyakan%20status%20resi%20nomor:%20${encodeURIComponent(query)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl flex items-center space-x-2 transition-all shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Bantuan Customer Service via WhatsApp</span>
              </a>
            </div>
          </div>
        )}

        {/* State: Shipment Found */}
        {shipmentData && (
          <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-card border border-slate-200 overflow-hidden">
            
            {/* Header: Status bar & Tracking Number */}
            <div className="bg-brand-navy p-6 sm:p-8 text-white relative">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold">Nomor Resi / AWB:</span>
                    <div className="flex items-center space-x-1.5 bg-white/10 px-2.5 py-1 rounded-lg border border-white/20">
                      <span className="font-mono font-bold text-base sm:text-lg text-white">{shipmentData.trackingNumber}</span>
                      <button 
                        onClick={() => copyToClipboard(shipmentData.trackingNumber)} 
                        title="Salin Nomor Resi"
                        className="text-slate-300 hover:text-white p-1"
                      >
                        {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-slate-300">
                    {getServiceIcon(shipmentData.serviceType)}
                    <span className="font-medium text-white">{shipmentData.service}</span>
                    <span>•</span>
                    <span>Diperbarui: {shipmentData.details.lastUpdated}</span>
                  </div>
                </div>

                {/* Status Pill */}
                <div className="flex flex-col sm:items-end">
                  <span className="text-xs text-slate-300 mb-1">Status Kargo Saat Ini:</span>
                  <span className={`inline-flex items-center px-4 py-2 rounded-xl text-sm font-extrabold border shadow-sm ${getStatusBadgeClass(shipmentData.statusCode)}`}>
                    <span className="w-2.5 h-2.5 rounded-full bg-current mr-2 animate-pulse"></span>
                    {shipmentData.status}
                  </span>
                </div>
              </div>

              {/* Progress Stepper Line */}
              <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Origin Card */}
                <div className="bg-white/5 rounded-xl p-4 border border-white/10 flex items-start space-x-3">
                  <div className="p-2.5 bg-blue-600/30 text-blue-300 rounded-lg shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 uppercase font-semibold">Kota Asal (Origin)</div>
                    <div className="font-bold text-base text-white">{shipmentData.origin.city}, {shipmentData.origin.country}</div>
                    <div className="text-xs text-slate-300 mt-0.5">{shipmentData.origin.hub}</div>
                    <div className="text-xs text-slate-400 mt-1">Pengirim: <strong className="text-slate-200">{shipmentData.shipper.name}</strong></div>
                  </div>
                </div>

                {/* Destination Card */}
                <div className="bg-white/5 rounded-xl p-4 border border-white/10 flex items-start space-x-3">
                  <div className="p-2.5 bg-brand-red/30 text-red-300 rounded-lg shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 uppercase font-semibold">Kota Tujuan (Destination)</div>
                    <div className="font-bold text-base text-white">{shipmentData.destination.city}, {shipmentData.destination.country}</div>
                    <div className="text-xs text-slate-300 mt-0.5">{shipmentData.destination.hub}</div>
                    <div className="text-xs text-slate-400 mt-1">Penerima: <strong className="text-slate-200">{shipmentData.receiver.name}</strong></div>
                  </div>
                </div>

              </div>
            </div>

            {/* Middle: Shipment Specification Badges */}
            <div className="p-6 bg-slate-50 border-b border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div className="p-3 bg-white rounded-xl border border-slate-200/80 shadow-xs">
                <span className="text-[11px] font-semibold text-slate-500 uppercase block">Jumlah Koli</span>
                <span className="text-lg font-black text-brand-navy">{shipmentData.details.pieces} Koli / Colli</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200/80 shadow-xs">
                <span className="text-[11px] font-semibold text-slate-500 uppercase block">Berat Aktual</span>
                <span className="text-lg font-black text-brand-navy">{shipmentData.details.weightKg} kg</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200/80 shadow-xs">
                <span className="text-[11px] font-semibold text-slate-500 uppercase block">Dimensi / Volume</span>
                <span className="text-sm font-bold text-brand-navy mt-1 block">{shipmentData.details.dimensions}</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200/80 shadow-xs">
                <span className="text-[11px] font-semibold text-slate-500 uppercase block">Estimasi Sampai (ETA)</span>
                <span className="text-sm font-bold text-emerald-600 mt-1 block">{shipmentData.details.estimatedDelivery}</span>
              </div>
            </div>

            {/* Content: Timeline / Lini Waktu Perjalanan */}
            <div className="p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-brand-blue" />
                  <span>Riwayat Perjalanan & Pemeriksaan Kepabeanan</span>
                </h3>
                <span className="text-xs text-slate-500 font-mono">
                  {shipmentData.timeline.length} Titik Pembaruan
                </span>
              </div>

              {/* Vertical Stepper */}
              <div className="relative border-l-2 border-blue-200 ml-3 sm:ml-4 pl-6 sm:pl-8 space-y-8">
                {shipmentData.timeline.map((step, idx) => (
                  <div key={idx} className="relative group">
                    {/* Circle Node on Timeline */}
                    <div 
                      className={`absolute -left-[31px] sm:-left-[39px] top-0 flex items-center justify-center rounded-full border-4 border-white ${
                        step.current 
                          ? 'w-6 h-6 sm:w-7 sm:h-7 bg-brand-red text-white shadow-glow-red ring-4 ring-red-100 animate-pulse'
                          : 'w-5 h-5 sm:w-6 sm:h-6 bg-blue-600 text-white shadow-xs'
                      }`}
                    >
                      {step.current ? (
                        <span className="w-2 h-2 rounded-full bg-white"></span>
                      ) : (
                        <Check className="w-3 h-3 text-white" />
                      )}
                    </div>

                    {/* Step Content */}
                    <div className={`p-4 rounded-xl transition-all ${
                      step.current 
                        ? 'bg-red-50/70 border border-red-200 shadow-sm' 
                        : 'bg-slate-50 border border-slate-200/70 hover:bg-slate-100/80'
                    }`}>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5">
                        <div className="flex items-center space-x-2">
                          <h4 className={`font-bold text-sm sm:text-base ${step.current ? 'text-brand-red' : 'text-slate-900'}`}>
                            {step.status}
                          </h4>
                          {step.current && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-brand-red text-white uppercase tracking-wider">
                              Titik Terkini
                            </span>
                          )}
                        </div>
                        <div className="text-xs font-mono text-slate-500 flex items-center space-x-1">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{step.timestamp}</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-1.5 text-xs font-semibold text-slate-700 mb-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>{step.location}</span>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>

                  </div>
                ))}
              </div>

              {/* Bottom Actions */}
              <div className="mt-8 pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
                <div className="text-xs text-slate-500">
                  Komoditas: <strong className="text-slate-800">{shipmentData.details.commodity}</strong>
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => window.print()}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 flex items-center space-x-1.5 transition-all"
                  >
                    <FileText className="w-4 h-4 text-slate-600" />
                    <span>Cetak Manifest</span>
                  </button>
                  <a
                    href={`https://wa.me/6281517077855?text=Halo%20Admin%20Raymindo,%20saya%20ingin%20info%20lebih%20lanjut%20mengenai%20status%20pengiriman%20resi%20${shipmentData.trackingNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 flex items-center space-x-1.5 transition-all shadow-sm"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Konfirmasi via WhatsApp</span>
                  </a>
                </div>
              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  );
}
