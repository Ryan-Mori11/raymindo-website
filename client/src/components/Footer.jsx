import React from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  ArrowUp,
  Globe,
  Anchor,
  Plane
} from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-brand-dark text-slate-400 text-xs border-t border-slate-800">
      
      {/* Top Banner with Quick Highlights */}
      <div className="border-b border-slate-800/80 py-8 bg-slate-950/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-blue-600/20 text-blue-400">
              <Anchor className="w-5 h-5" />
            </div>
            <div>
              <div className="text-white font-bold text-sm">Hub Pelabuhan Utama</div>
              <div className="text-slate-400 text-xs">Tanjung Priok, Tanjung Perak, Belawan</div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-brand-red/20 text-red-400">
              <Plane className="w-5 h-5" />
            </div>
            <div>
              <div className="text-white font-bold text-sm">Kargo Udara Cepat</div>
              <div className="text-slate-400 text-xs">Bandara Soekarno-Hatta Terminal Kargo CGK</div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-emerald-600/20 text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-white font-bold text-sm">PPJK Resmi Bea Cukai</div>
              <div className="text-slate-400 text-xs">Kepatuhan Legal Ekspor & Impor 100%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Col 1 & 2: Company Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center">
                <img 
                  src="/logo.png" 
                  alt="Logo PT RAYMINDO INTERBENUA LINE" 
                  className="h-10 w-auto object-contain bg-transparent" 
                  style={{ background: 'transparent' }}
                />
              </div>
              <div>
                <div className="text-white font-bold text-sm leading-tight">
                  PT RAYMINDO INTERBENUA LINE
                </div>
                <div className="text-[11px] text-slate-400 font-semibold tracking-wider uppercase">
                  International Freight Forwarder
                </div>
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Perusahaan jasa pengurusan transportasi (Freight Forwarding) terkemuka di Indonesia yang melayani kargo ekspor dan impor melalui moda laut, udara, kepabeanan resmi (PPJK), serta solusi sewa izin impor (Undername Service) terpadu.
            </p>

            <div className="pt-2 text-slate-300 text-xs space-y-1">
              <div>NPWP / NIB Resmi Perusahaan Terdaftar di Kemenkeu & OSS</div>
              <div className="text-brand-red font-semibold">PPJK & Undername Service Resmi Berizin</div>
            </div>
          </div>

          {/* Col 3: Quick Navigation */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">
              Navigasi Cepat
            </h4>
            <ul className="space-y-2.5">
              <li><a href="#beranda" className="hover:text-white transition-colors">Beranda</a></li>
              <li><a href="#calculator" className="hover:text-white transition-colors">Kalkulator Tarif</a></li>
              <li><a href="#layanan" className="hover:text-white transition-colors">Layanan Logistik</a></li>
              <li><a href="#tentang" className="hover:text-white transition-colors">Profil Perusahaan</a></li>
              <li><a href="#mitra" className="hover:text-white transition-colors">Mitra Pelayaran & Maskapai</a></li>
              <li><a href="#kontak" className="hover:text-white transition-colors">Hubungi Kami</a></li>
            </ul>
          </div>

          {/* Col 4: Layanan Kami */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">
              Layanan Utama
            </h4>
            <ul className="space-y-2.5">
              <li><a href="#layanan" className="hover:text-white transition-colors">Undername Service (Sewa Izin)</a></li>
              <li><a href="#layanan" className="hover:text-white transition-colors">Air Freight Ekspor & Impor</a></li>
              <li><a href="#layanan" className="hover:text-white transition-colors">Sea Freight FCL & LCL</a></li>
              <li><a href="#layanan" className="hover:text-white transition-colors">Customs Clearance (PPJK)</a></li>
              <li><a href="#layanan" className="hover:text-white transition-colors">Door-to-Door Delivery</a></li>
              <li><a href="#layanan" className="hover:text-white transition-colors">Import Borongan All-In</a></li>
            </ul>
          </div>

          {/* Col 5: Kontak Cepat */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">
              Kontak Kantor
            </h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-brand-red shrink-0 mt-0.5" />
                <span className="text-slate-300">Gedung Graha CPM Jl. Raya Mabes Hankam No. 09, Bambu Apus, Cipayung, Jakarta Timur 13870</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <span className="text-slate-300">021 2247 2527 / 0815 1707 7855</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-slate-300 text-[10px]">fachrilraymindo@gmail.com</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-xs text-center sm:text-left">
            &copy; {new Date().getFullYear()} <strong>PT RAYMINDO INTERBENUA LINE</strong>. All Rights Reserved. International Freight Forwarding Services.
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center space-x-1 text-xs text-slate-400 hover:text-white px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 transition-colors"
          >
            <span>Kembali ke Atas</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
