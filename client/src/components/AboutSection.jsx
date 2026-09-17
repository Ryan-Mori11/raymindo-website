import React from 'react';
import { 
  ShieldCheck, 
  Award, 
  Globe2, 
  Users2, 
  Compass, 
  Target, 
  Anchor,
  Plane,
  Building2,
  CheckCircle2
} from 'lucide-react';

export default function AboutSection() {
  const values = [
    {
      title: 'Integritas & Kepatuhan Legal',
      desc: 'Beroperasi dengan izin resmi PPJK Bea Cukai, memastikan setiap dokumen ekspor dan impor mematuhi regulasi perdagangan nasional dan internasional.',
      icon: <ShieldCheck className="w-6 h-6 text-brand-red" />
    },
    {
      title: 'Jaringan Global di 150+ Negara',
      desc: 'Didukung agen freight forwarder tepercaya di pelabuhan dan bandara tersibuk dunia, memastikan kargo Anda tertangani secara profesional di negara tujuan.',
      icon: <Globe2 className="w-6 h-6 text-blue-600" />
    },
    {
      title: 'Efisiensi Waktu & Biaya',
      desc: 'Optimasi rute kargo multimoda untuk memangkas waktu transit dan memberikan penawaran tarif paling kompetitif tanpa biaya tersembunyi.',
      icon: <Target className="w-6 h-6 text-emerald-600" />
    },
    {
      title: 'Dedikasi & Pelayanan 24/7',
      desc: 'Tim operasional kargo dan layanan pelanggan yang responsif siap memantau serta memberikan laporan status pengiriman Anda secara berkala.',
      icon: <Users2 className="w-6 h-6 text-amber-500" />
    }
  ];

  return (
    <section id="tentang" className="py-20 bg-white border-b border-slate-200 scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Visual & Badge Box (5 cols) */}
          <div className="lg:col-span-5 relative">
            
            {/* Main Brand Card */}
            <div className="bg-gradient-to-br from-brand-navy via-slate-900 to-brand-dark rounded-3xl p-8 sm:p-10 text-white shadow-2xl relative overflow-hidden border border-slate-800">
              <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-brand-red/20 rounded-full blur-3xl pointer-events-none"></div>
              
              {/* Logo Presentation: RR with transparent background */}
              <div className="w-fit mb-6 flex items-center justify-center">
                <img 
                  src="/logo.png" 
                  alt="Logo RR PT RAYMINDO INTERBENUA LINE" 
                  className="h-14 w-auto object-contain bg-transparent" 
                  style={{ background: 'transparent' }}
                />
              </div>

              <div className="text-xs uppercase font-extrabold tracking-widest text-brand-red mb-1">
                Profil Resmi Perusahaan
              </div>
              <h3 className="text-2xl font-black text-white leading-tight">
                PT RAYMINDO INTERBENUA LINE
              </h3>
              <p className="text-xs text-slate-300 tracking-wider uppercase font-semibold mt-1 mb-6">
                International Freight Forwarder
              </p>

              <div className="space-y-4 text-xs text-slate-300 leading-relaxed border-t border-white/10 pt-6">
                <p>
                  Didirikan dengan komitmen teguh untuk memajukan rantai pasok Indonesia, kami menghubungkan para produsen lokal, eksportir, importir, dan industri manufaktur nasional dengan pasar global secara efektif dan aman.
                </p>
                <p>
                  Dengan kantor operasional di pusat maritim Tanjung Priok Jakarta dan gerbang kargo udara Bandara Soekarno-Hatta, Raymindo siap menjadi mitra logistik strategis pertumbuhan bisnis Anda.
                </p>
              </div>

              {/* Stat Counters inside card */}
              <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-white/10">
                <div>
                  <span className="text-2xl font-black text-white">50.000+</span>
                  <span className="block text-[11px] text-slate-400">Kontainer Laut Terkirim</span>
                </div>
                <div>
                  <span className="text-2xl font-black text-emerald-400">12.000+</span>
                  <span className="block text-[11px] text-slate-400">Ton Kargo Udara Sukses</span>
                </div>
              </div>

            </div>

            {/* Floating Accreditation Badge */}
            <div className="hidden sm:flex absolute -bottom-6 -right-6 bg-white rounded-2xl p-4 shadow-xl border border-slate-200 items-center space-x-3">
              <div className="p-2.5 bg-emerald-100 rounded-xl text-emerald-700">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">Perusahaan Berizin Resmi</div>
                <div className="text-[11px] text-slate-500">PPJK Bea Cukai • IATA Member</div>
              </div>
            </div>

          </div>

          {/* Right Text & Values (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-brand-red/10 text-brand-red text-xs font-bold uppercase tracking-wider">
              Tentang Kami
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight leading-tight">
              Dedikasi Penuh untuk Kelancaran Arus Kargo Ekspor & Impor Anda
            </h2>

            <p className="text-base text-slate-600 leading-relaxed">
              Sebagai salah satu freight forwarder internasional terdepan di Indonesia, <strong>PT RAYMINDO INTERBENUA LINE</strong> memadukan pengalaman operasional bertahun-tahun dengan teknologi pelacakan digital termutakhir. Kami memahami bahwa setiap detik dalam logistik memiliki nilai tinggi bagi bisnis Anda.
            </p>

            {/* Core Values Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-3">
              {values.map((val, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 transition-all">
                  <div className="p-2 bg-white rounded-xl w-fit shadow-xs mb-3 border border-slate-100">
                    {val.icon}
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mb-1.5">{val.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{val.desc}</p>
                </div>
              ))}
            </div>

            {/* Major Hubs Mention */}
            <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200 text-xs text-blue-900 space-y-2">
              <div className="font-bold flex items-center space-x-2">
                <Anchor className="w-4 h-4 text-brand-blue" />
                <span>Gerbang Logistik Utama Kami di Indonesia:</span>
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="px-2.5 py-1 bg-white rounded-md font-semibold text-slate-800 border border-blue-200">
                  Pelabuhan Tanjung Priok (Jakarta)
                </span>
                <span className="px-2.5 py-1 bg-white rounded-md font-semibold text-slate-800 border border-blue-200">
                  Pelabuhan Tanjung Perak (Surabaya)
                </span>
                <span className="px-2.5 py-1 bg-white rounded-md font-semibold text-slate-800 border border-blue-200">
                  Pelabuhan Belawan (Medan)
                </span>
                <span className="px-2.5 py-1 bg-white rounded-md font-semibold text-slate-800 border border-blue-200">
                  Bandara Soekarno-Hatta CGK (Kargo Udara)
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
