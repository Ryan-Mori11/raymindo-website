import React from 'react';
import { Star, Quote, CheckCircle2, Ship, Plane, Building } from 'lucide-react';

export default function TestimonialsSection() {
  const partners = [
    { name: 'MAERSK LINE', type: 'Ocean Carrier', code: 'MSK' },
    { name: 'MSC MEDITERRANEAN', type: 'Global Shipping', code: 'MSC' },
    { name: 'EVERGREEN MARINE', type: 'Container Line', code: 'EMC' },
    { name: 'CMA CGM GROUP', type: 'Shipping & Logistics', code: 'CMA' },
    { name: 'GARUDA CARGO', type: 'Air Cargo Flag Carrier', code: 'GIA' },
    { name: 'SINGAPORE AIRLINES CARGO', type: 'Air Cargo Hub', code: 'SQC' },
    { name: 'EMIRATES SKYCARGO', type: 'Global Air Cargo', code: 'UAE' },
    { name: 'CATHAY CARGO', type: 'Asia Pacific Cargo', code: 'CPA' }
  ];

  const testimonials = [
    {
      name: 'Ir. Hendra Gunawan',
      role: 'Director of Supply Chain',
      company: 'PT Surya Makmur Elektronik',
      city: 'Cikarang, Bekasi',
      cargo: 'Air Freight Sparepart & Precision Sensors dari Jepang',
      quote: 'PT Raymindo Interbenua Line sangat luar biasa dalam menangani customs clearance di Tanjung Priok & Bandara Soetta. Kargo sensitif kami selalu rilis tepat waktu tanpa kendala dokumen. Sistem trackingnya juga sangat transparan!',
      rating: 5
    },
    {
      name: 'Melinda Tanuwijaya',
      role: 'Founder & CEO',
      company: 'CV Nusa Indah Tekstil Ekspor',
      city: 'Surabaya, Jawa Timur',
      cargo: 'FCL Sea Freight Garmen ke Eropa & Australia',
      quote: 'Sudah lebih dari 4 tahun kami mempercayakan pengapalan kontainer kain batik dan garmen ke Hamburg dan Sydney lewat Raymindo. Tarifnya sangat bersaing dan jadwal kapal sangat disiplin.',
      rating: 5
    },
    {
      name: 'Rudi Hartono, S.T.',
      role: 'Operations & Procurement Manager',
      company: 'PT Global Machinery Indonesia',
      city: 'Jakarta Utara',
      cargo: 'Import Borongan Mesin Industri dari Shanghai',
      quote: 'Layanan All-In Door to Door Raymindo benar-benar membantu bisnis kami. Dari pick up pabrik di China sampai tiba di gudang Jakarta, kami tidak perlu pusing memikirkan bea cukai dan izin lartas. Sangat direkomendasikan!',
      rating: 5
    }
  ];

  return (
    <section id="mitra" className="py-20 bg-slate-100 border-b border-slate-200 scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
            Kepercayaan Pelanggan & Mitra Global
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight">
            Dipercaya Oleh Importir, Eksportir, & Mitra Pelayaran Dunia
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Kolaborasi erat dengan maskapai penerbangan kargo dan perusahaan pelayaran raksasa untuk menghadirkan alokasi ruang (space guarantee) terbaik bagi kargo Anda.
          </p>
        </div>

        {/* Partners Grid / Logos */}
        <div className="mb-20">
          <div className="text-center text-xs uppercase font-extrabold tracking-widest text-slate-400 mb-6">
            Mitra Pelayaran & Maskapai Kargo Resmi Kami
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {partners.map((p, idx) => (
              <div 
                key={idx} 
                className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col items-center justify-center text-center hover:border-brand-blue hover:shadow-md transition-all group"
              >
                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-700 font-black text-sm mb-2 group-hover:bg-blue-50 group-hover:text-brand-blue transition-colors">
                  {p.code}
                </div>
                <div className="font-extrabold text-xs sm:text-sm text-slate-800 tracking-wide">
                  {p.name}
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  {p.type}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-3xl p-7 border border-slate-200 shadow-soft hover:shadow-card transition-all flex flex-col justify-between"
            >
              <div>
                {/* Rating Stars & Quote Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-slate-200" />
                </div>

                {/* Cargo Route Tag */}
                <div className="inline-block px-2.5 py-1 rounded-md text-[10px] font-bold bg-blue-50 text-blue-700 mb-4 border border-blue-100">
                  {t.cargo}
                </div>

                {/* Testimonial Text */}
                <p className="text-xs sm:text-sm text-slate-600 italic leading-relaxed mb-6">
                  "{t.quote}"
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-slate-100 flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-navy to-brand-blue text-white flex items-center justify-center font-bold text-sm shrink-0">
                  {t.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                </div>
                <div>
                  <div className="font-bold text-xs sm:text-sm text-slate-900">{t.name}</div>
                  <div className="text-[11px] text-slate-500">{t.role} • {t.company}</div>
                  <div className="text-[10px] text-slate-400">{t.city}</div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
