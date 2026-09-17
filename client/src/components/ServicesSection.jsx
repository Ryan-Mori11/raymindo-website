import React from 'react';
import { 
  Plane, 
  Ship, 
  ShieldCheck, 
  Truck, 
  PackageCheck, 
  Warehouse, 
  FileCheck,
  Factory,
  ArrowRight, 
  Check, 
  MessageCircle 
} from 'lucide-react';

export default function ServicesSection() {

  const services = [
    {
      id: 'undername-service',
      icon: <FileCheck className="w-8 h-8 text-brand-red" />,
      title: 'Undername Service',
      subtitle: 'Sewa Izin Impor Resmi & Tepercaya',
      desc: 'Tidak memiliki dokumen kelengkapan impor? Mudah, kami memiliki izin import yang lengkap dan siap menyewakan kepada perusahaan atau perorangan yang membutuhkan izin impor atau disebut juga undername.',
      features: [
        'Sewa izin impor aktif: NIB, API-U, & Hak Akses Kepabeanan',
        'Penyelesaian dokumen PIB & kepabeanan atas nama legal kami',
        'Tersedia untuk barang umum, tekstil, mesin, sparepart & elektronik',
        'Pendampingan sampai barang keluar (SPPB) dari bandara / pelabuhan'
      ],
      tag: 'Solusi Tanpa Izin Sendiri',
      badgeColor: 'bg-red-100 text-brand-red'
    },
    {
      id: 'kuota-pi-besi-baja',
      icon: <Factory className="w-8 h-8 text-orange-600" />,
      title: 'Kuota PI Besi dan Baja',
      subtitle: 'Persetujuan Impor Resmi Kemendag RI',
      desc: 'Layanan penyediaan kuota dan izin Persetujuan Impor (PI) Besi & Baja resmi dari Kementerian Perdagangan. Solusi impor komoditas besi dan baja yang legal, aman, dan cepat tanpa perlu mengurus izin mandiri.',
      features: [
        'Persetujuan Impor (PI) Besi & Baja resmi Kemendag RI',
        'Penyediaan kuota impor siap pakai untuk ragam HS Code besi/baja',
        'Asistensi Laporan Surveyor (LS) & verifikasi teknis kepabeanan',
        'Jaminan legalitas 100%, aman, cepat, dan bebas kendala Lartas'
      ],
      tag: 'Resmi Kemendag',
      badgeColor: 'bg-orange-100 text-orange-800'
    },
    {
      id: 'air-freight',
      icon: <Plane className="w-8 h-8 text-blue-500" />,
      title: 'Air Freight (Kargo Udara)',
      subtitle: 'Pengiriman Cepat Antar-Benua Berjadwal',
      desc: 'Solusi pengiriman kargo via udara untuk komoditas bernilai tinggi, suku cadang mesin penting, dokumen rahasia, maupun barang yang sensitif terhadap waktu dengan jangkauan global.',
      features: [
        'Layanan Ekspres (1-2 hari) & Reguler (3-5 hari)',
        'Kemitraan langsung maskapai terkemuka (Garuda, SQ, Emirates, Cathay)',
        'Penanganan Dangerous Goods (DG) & Temperature-Controlled Cargo',
        'Update status kargo & manifes penerbangan 24/7'
      ],
      tag: 'Cepat & Andal',
      badgeColor: 'bg-blue-100 text-blue-800'
    },
    {
      id: 'sea-freight',
      icon: <Ship className="w-8 h-8 text-teal-600" />,
      title: 'Sea Freight (Kargo Laut)',
      subtitle: 'FCL & LCL Seluruh Pelabuhan Utama Dunia',
      desc: 'Layanan angkutan kargo laut dengan kapasitas besar dan efisiensi biaya tertinggi. Melayani FCL (Full Container Load 20ft/40ft/40HC) dan LCL (Less Container Load / Konsolidasi).',
      features: [
        'FCL (20ft, 40ft, 40HC, Open Top, Flat Rack, Reefer)',
        'LCL Konsolidasi mingguan dari & ke pelabuhan utama dunia',
        'Kerja sama dengan Maersk, MSC, Evergreen, CMA CGM, ONE',
        'Asuransi kargo laut komprehensif (Marine Cargo Insurance)'
      ],
      tag: 'Kapasitas Terbesar',
      badgeColor: 'bg-teal-100 text-teal-800'
    },
    {
      id: 'customs-clearance',
      icon: <ShieldCheck className="w-8 h-8 text-brand-red" />,
      title: 'Customs Clearance (PPJK Resmi)',
      subtitle: 'Pengurusan Kepabeanan Ekspor & Impor',
      desc: 'Legalitas resmi Perusahaan Pengurusan Jasa Kepabeanan (PPJK) berizin Ditjen Bea dan Cukai Republik Indonesia. Menjamin kepatuhan regulasi HS Code, perizinan lartas, dan rilis kargo cepat.',
      features: [
        'Pengurusan dokumen PIB (Pemberitahuan Impor Barang) & PEB',
        'Penentuan HS Code akurat untuk kalkulasi Bea Masuk & PDRI',
        'Pengurusan izin Lartas kementerian teknis (BPOM, Kemenperin, Kemendag)',
        'Penyelesaian jalur hijau, kuning, dan asistensi jalur merah (SPBL/SPJM)'
      ],
      tag: 'Berizin Resmi PPJK',
      badgeColor: 'bg-red-100 text-brand-red'
    },
    {
      id: 'door-to-door',
      icon: <Truck className="w-8 h-8 text-amber-500" />,
      title: 'Door to Door Service',
      subtitle: 'Dari Gudang Pengirim ke Pintu Penerima',
      desc: 'Layanan terintegrasi tanpa repot. Kami mengambil paket kargo langsung dari alamat pabrik/vendor luar negeri dan mengantarkannya langsung sampai ke depan pintu gudang Anda di Indonesia.',
      features: [
        'Pick-up di pabrik asal (China, Singapore, Malaysia, USA, dll.)',
        'Pengurusan seluruh dokumen ekspor di negara asal',
        'Pengiriman multimoda udara/laut hingga pelabuhan Indonesia',
        'Last-mile delivery armada truk Raymindo ke seluruh pelosok Nusantara'
      ],
      tag: 'Praktis Bebas Repot',
      badgeColor: 'bg-amber-100 text-amber-800'
    },
    {
      id: 'import-borongan',
      icon: <PackageCheck className="w-8 h-8 text-indigo-600" />,
      title: 'Import Borongan / All-In',
      subtitle: 'Solusi Impor Lengkap Termasuk Pajak & Ongkir',
      desc: 'Layanan impor satu harga (All-In) per kilogram atau per meter kubik (CBM) yang sudah mencakup ongkos kirim internasional, pajak bea masuk, PPN, PPh, hingga pengantaran lokal.',
      features: [
        'Tidak membutuhkan izin impor / API-U / NIB khusus bagi pemula',
        'Biaya flat per kg / per CBM tanpa biaya tambahan tersembunyi',
        'Sangat cocok untuk produk garmen, sparepart, elektronik konsumen, dan aksesoris',
        'Garansi keamanan barang dan ganti rugi bila terjadi kehilangan'
      ],
      tag: 'Favorit Pebisnis & UMKM',
      badgeColor: 'bg-indigo-100 text-indigo-800'
    },
    {
      id: 'warehousing',
      icon: <Warehouse className="w-8 h-8 text-emerald-600" />,
      title: 'Warehousing & Konsolidasi',
      subtitle: 'Gudang Modern & Pusat Manajemen Kargo',
      desc: 'Fasilitas pergudangan strategis di kawasan Pelabuhan Tanjung Priok dan Bandara Soekarno-Hatta dengan sistem manajemen inventori modern, repacking, dan fasilitas cross-docking.',
      features: [
        'Gudang aman dengan sistem CCTV 24/7 dan fire suppression',
        'Jasa packing kayu (wooden crating) standar ekspor ISPM 15',
        'Konsolidasi barang dari berbagai supplier menjadi satu muatan',
        'Cross-docking dan distribusi ke jaringan cabang di Indonesia'
      ],
      tag: 'Keamanan Maksimal',
      badgeColor: 'bg-emerald-100 text-emerald-800'
    }
  ];

  return (
    <section id="layanan" className="py-20 bg-slate-50 border-b border-slate-200 scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-brand-navy/10 text-brand-navy text-xs font-bold uppercase tracking-wider mb-2">
            Layanan Logistik Komprehensif
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight">
            Solusi Freight Forwarding Terpadu
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Dari pengiriman ekspres udara hingga muatan kontainer laut berskala besar, PT Raymindo Interbenua Line menyediakan layanan logistik end-to-end yang disesuaikan dengan kebutuhan bisnis Anda.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((svc) => (
            <div
              key={svc.id}
              className="bg-white rounded-3xl p-7 border border-slate-200/90 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Top Badge & Icon */}
                <div className="flex items-center justify-between mb-5">
                  <div className="p-3 bg-slate-50 group-hover:bg-blue-50/50 rounded-2xl border border-slate-100 transition-colors">
                    {svc.icon}
                  </div>
                  <span className={`text-[11px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider ${svc.badgeColor}`}>
                    {svc.tag}
                  </span>
                </div>

                {/* Title & Subtitle */}
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-brand-blue transition-colors">
                  {svc.title}
                </h3>
                <div className="text-xs font-semibold text-brand-red mt-1 mb-3">
                  {svc.subtitle}
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                  {svc.desc}
                </p>

                {/* Feature Bullet List */}
                <ul className="space-y-2 mb-6 border-t border-slate-100 pt-4">
                  {svc.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start text-xs text-slate-700">
                      <Check className="w-4 h-4 text-emerald-500 mr-2 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Action CTA */}
              <div className="pt-4 border-t border-slate-100">
                <a
                  href={`https://wa.me/6281517077855?text=Halo%20PT%20Raymindo,%20saya%20tertarik%20konsultasi%20layanan%20${encodeURIComponent(svc.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-brand-navy hover:text-white bg-slate-100 hover:bg-brand-navy transition-all flex items-center justify-center space-x-2"
                >
                  <span>Konsultasi Layanan Ini</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>
          ))}
        </div>

        {/* Bottom Banner for Custom Consultation */}
        <div className="mt-16 bg-gradient-to-r from-brand-dark via-brand-navy to-slate-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-800">
          <div className="max-w-xl">
            <h3 className="text-2xl font-bold">Butuh Solusi Kargo Khusus atau Proyek Khusus?</h3>
            <p className="text-slate-300 text-sm mt-2 leading-relaxed">
              Kami juga melayani pengiriman kargo alat berat (Break Bulk), pengapalan charter kapal/pesawat khusus, dan konsultasi legalitas kepabeanan mendalam.
            </p>
          </div>
          <a
            href="https://wa.me/6281517077855?text=Halo%20Raymindo,%20kami%20memiliki%20kebutuhan%20proyek%20kargo%20khusus"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 bg-brand-red hover:bg-brand-redHover text-white font-bold text-sm rounded-xl shadow-glow-red transition-all flex items-center space-x-2 shrink-0"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Hubungi Spesialis Kargo Kami</span>
          </a>
        </div>

      </div>
    </section>
  );
}
