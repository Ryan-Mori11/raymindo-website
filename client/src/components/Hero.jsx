import React, { useState } from 'react';
import { 
  Calculator, 
  ArrowRight, 
  Ship, 
  Plane, 
  ShieldCheck, 
  Globe2, 
  CheckCircle2,
  Box,
  MessageCircle,
  Clock,
  Truck
} from 'lucide-react';

export default function Hero({ onQuickCalculate }) {
  const [quickDirection, setQuickDirection] = useState('import'); // 'import' | 'export'
  const [quickService, setQuickService] = useState('air_lcl'); // 'air_lcl' | 'sea_lcl' | 'sea_fcl_20' | 'sea_fcl_40'
  const [quickCountry, setQuickCountry] = useState('SG');
  const [quickWeight, setQuickWeight] = useState('');

  // Quick live base estimate
  const getQuickTotal = () => {
    const w = parseFloat(quickWeight) || 0;
    if (quickService === 'air_lcl') {
      const extraKgInklaring = Math.max(0, (w || 100) - 100);
      const extraKgRush = Math.max(0, (w || 100) - 100);
      const extraKgTrucking = Math.max(0, (w || 100) - 200);
      return 6040000 + (extraKgInklaring * 5000) + (extraKgRush * 4000) + (extraKgTrucking * 3000);
    } else if (quickService === 'sea_lcl') {
      const extraKgLcl = Math.max(0, (w || 200) - 200);
      return 6256000 + (extraKgLcl * 3000);
    } else if (quickService === 'sea_fcl_20') {
      return 9456000;
    } else {
      return 11160000;
    }
  };

  const handleQuoteSubmit = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (onQuickCalculate) {
      onQuickCalculate(quickCountry, quickWeight, quickService, quickDirection);
    }
    const el = document.getElementById('calculator');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div id="beranda" className="relative bg-gradient-to-br from-brand-dark via-brand-navy to-slate-900 text-white overflow-hidden pt-6 pb-20 lg:pt-12 lg:pb-28 border-b border-slate-800">
      {/* Background Decorative Graphic Elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px]"></div>
      <div className="absolute top-1/4 right-5 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-brand-red/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headline, Trust, and CTA */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Verified Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs text-blue-200 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-brand-red animate-ping"></span>
              <span className="font-semibold text-white">PT RAYMINDO INTERBENUA LINE</span>
              <span className="text-slate-400">|</span>
              <span>Official Freight Forwarder Indonesia</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight leading-[1.15] text-white">
              Koneksikan Bisnis Anda ke <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-red-400">Pasar Global</span> Tanpa Hambatan.
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed">
              Layanan ekspor impor profesional berbasis kargo udara (<strong className="text-white">Air Freight</strong>), kargo laut (<strong className="text-white">FCL & LCL Sea Freight</strong>), kepabeanan resmi (<strong className="text-white">PPJK Bea Cukai</strong>), serta solusi <strong className="text-white">Undername Service</strong> ke 150+ negara di dunia.
            </p>

            {/* Key Value Points */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="flex items-center space-x-2 text-xs sm:text-sm text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Customs Clearance Resmi</span>
              </div>
              <div className="flex items-center space-x-2 text-xs sm:text-sm text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Kalkulator Tarif Real-Time</span>
              </div>
              <div className="flex items-center space-x-2 text-xs sm:text-sm text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Biaya Transparan & Resmi</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href="#calculator"
                onClick={handleQuoteSubmit}
                className="inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-brand-red hover:bg-brand-redHover shadow-glow-red transition-all transform hover:-translate-y-0.5"
              >
                <Calculator className="w-4 h-4" />
                <span>Hitung Tarif Pengiriman</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/6281517077855?text=Halo%20PT%20Raymindo%20Interbenua%20Line,%20saya%20ingin%20konsultasi%20tarif%20pengiriman%20kargo"
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-slate-800/90 hover:bg-slate-700 border border-slate-700/80 shadow-soft transition-all"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Konsultasi WhatsApp 24/7</span>
              </a>
            </div>

            {/* Bottom mini stats */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800/80">
              <div>
                <div className="text-2xl sm:text-3xl font-black text-white">15+</div>
                <div className="text-xs text-slate-400 uppercase tracking-wider">Tahun Pengalaman</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-white">150+</div>
                <div className="text-xs text-slate-400 uppercase tracking-wider">Destinasi Negara</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-emerald-400">99.8%</div>
                <div className="text-xs text-slate-400 uppercase tracking-wider">Ketepatan Waktu</div>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Quick Calculator Widget */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900/95 backdrop-blur-xl border border-slate-700/80 rounded-2xl shadow-2xl p-6 sm:p-7 relative overflow-hidden">
              
              {/* Header Accent Bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-brand-red to-blue-400"></div>

              {/* Widget Header */}
              <div className="mb-5 pb-3 border-b border-slate-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-lg bg-brand-red/20 text-brand-red flex items-center justify-center">
                      <Calculator className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white leading-tight">
                        Cek Tarif & Biaya Resmi
                      </h3>
                      <p className="text-[11px] text-slate-400">
                        Customs Clearance CGK & Tanjung Priok
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] uppercase font-extrabold px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-800/50">
                    Live Rate
                  </span>
                </div>
              </div>

              {/* Rate Form */}
              <form onSubmit={handleQuoteSubmit} className="space-y-4">
                
                {/* Direction Switcher */}
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Arah Pengiriman:
                  </label>
                  <div className="grid grid-cols-2 gap-2 bg-slate-950/80 p-1 rounded-xl border border-slate-800">
                    <button
                      type="button"
                      onClick={() => setQuickDirection('import')}
                      className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
                        quickDirection === 'import'
                          ? 'bg-brand-navy text-white shadow-sm border border-blue-500/50'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <span>📥</span>
                      <span>Impor (Masuk)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setQuickDirection('export')}
                      className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
                        quickDirection === 'export'
                          ? 'bg-brand-red text-white shadow-sm border border-red-500/50'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <span>📤</span>
                      <span>Ekspor (Keluar)</span>
                    </button>
                  </div>
                </div>

                {/* Service Selection */}
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Moda & Jenis Kargo:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setQuickService('air_lcl')}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                        quickService === 'air_lcl'
                          ? 'bg-blue-600/20 border-blue-500 text-white ring-1 ring-blue-500'
                          : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center space-x-1.5 text-xs font-bold text-white">
                        <Plane className="w-3.5 h-3.5 text-blue-400" />
                        <span>Air Freight LCL</span>
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">Bandara Soetta (100 kg)</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setQuickService('sea_lcl')}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                        quickService === 'sea_lcl'
                          ? 'bg-teal-600/20 border-teal-500 text-white ring-1 ring-teal-500'
                          : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center space-x-1.5 text-xs font-bold text-white">
                        <Ship className="w-3.5 h-3.5 text-teal-400" />
                        <span>Sea Freight LCL</span>
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">Tanjung Priok (200 kg)</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setQuickService('sea_fcl_20')}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                        quickService === 'sea_fcl_20'
                          ? 'bg-red-600/20 border-brand-red text-white ring-1 ring-brand-red'
                          : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center space-x-1.5 text-xs font-bold text-white">
                        <Box className="w-3.5 h-3.5 text-red-400" />
                        <span>FCL 20ft Container</span>
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">Full Container 20 Kaki</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setQuickService('sea_fcl_40')}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                        quickService === 'sea_fcl_40'
                          ? 'bg-indigo-600/20 border-indigo-500 text-white ring-1 ring-indigo-500'
                          : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center space-x-1.5 text-xs font-bold text-white">
                        <Box className="w-3.5 h-3.5 text-indigo-400" />
                        <span>FCL 40ft Container</span>
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">Full Container 40 Kaki</div>
                    </button>
                  </div>
                </div>

                {/* Country & Weight Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                      {quickDirection === 'import' ? 'Negara Asal' : 'Negara Tujuan'}
                    </label>
                    <select
                      value={quickCountry}
                      onChange={(e) => setQuickCountry(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-white text-xs focus:outline-none focus:ring-2 focus:ring-brand-red"
                    >
                      <option value="SG">🇸🇬 Singapura</option>
                      <option value="MY">🇲🇾 Malaysia</option>
                      <option value="CN">🇨🇳 China / Shanghai</option>
                      <option value="JP">🇯🇵 Jepang</option>
                      <option value="KR">🇰🇷 Korea Selatan</option>
                      <option value="AU">🇦🇺 Australia</option>
                      <option value="US">🇺🇸 USA</option>
                      <option value="DE">🇩🇪 Jerman</option>
                      <option value="AE">🇦🇪 Dubai (UAE)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                      Berat Kargo (kg)
                    </label>
                    <input
                      type="number"
                      step="1"
                      min="1"
                      value={quickWeight}
                      onChange={(e) => setQuickWeight(e.target.value)}
                      placeholder={quickService === 'air_lcl' ? '100' : quickService === 'sea_lcl' ? '200' : '1 (Kontainer)'}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-white text-xs focus:outline-none focus:ring-2 focus:ring-brand-red"
                    />
                  </div>
                </div>

                {/* Live Estimated Cost Pill */}
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-medium">Estimasi Tarif Awal:</span>
                    <span className="text-lg font-black text-emerald-400">
                      Rp {getQuickTotal().toLocaleString('id-ID')}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block uppercase font-medium">Waktu Kirim:</span>
                    <span className="text-xs font-bold text-amber-300 flex items-center justify-end space-x-1">
                      <Clock className="w-3 h-3 inline" />
                      <span>{quickService === 'air_lcl' ? '2 - 4 Hari' : '8 - 20 Hari'}</span>
                    </span>
                  </div>
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  className="w-full py-3.5 px-4 bg-brand-red hover:bg-brand-redHover text-white font-bold rounded-xl shadow-glow-red transition-all flex items-center justify-center space-x-2 text-sm transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <Calculator className="w-4 h-4" />
                  <span>Lihat Rincian Biaya Lengkap & Hitung</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-[11px] text-slate-400 text-center">
                  Rincian resmi Inklaring, Rush Handling, PJM, dan Trucking Jakarta Area.
                </p>
              </form>

              {/* Verified Badge Footer */}
              <div className="mt-4 pt-3.5 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center space-x-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Garansi Dokumen Aman</span>
                </span>
                <span className="flex items-center space-x-1.5">
                  <Globe2 className="w-4 h-4 text-blue-400" />
                  <span>PPJK Resmi Ditjen Bea Cukai</span>
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
