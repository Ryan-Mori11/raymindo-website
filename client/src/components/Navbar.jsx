import React, { useState, useEffect } from 'react';
import { 
  Ship, 
  Plane, 
  Phone, 
  Mail, 
  Clock, 
  Menu, 
  X, 
  Calculator, 
  MessageCircle, 
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

export default function Navbar({ onNavigateToCalculator }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Beranda', href: '#beranda' },
    { name: 'Cek Tarif', href: '#calculator', onClick: onNavigateToCalculator },
    { name: 'Layanan', href: '#layanan' },
    { name: 'Tentang Kami', href: '#tentang' },
    { name: 'Testimoni & Mitra', href: '#mitra' },
    { name: 'Kontak', href: '#kontak' },
  ];

  return (
    <header className="sticky top-0 z-50 transition-all duration-300">
      {/* Top Bar for contact info & office hours */}
      <div className="bg-brand-dark text-slate-300 text-xs py-2 px-4 border-b border-slate-800 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Phone className="w-3.5 h-3.5 text-brand-red" />
              <span>Hotline / WA: <strong className="text-white">0815 1707 7855</strong> | Telp: <strong className="text-white">021 2247 2527</strong></span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="w-3.5 h-3.5 text-blue-400" />
              <span>fachrilraymindo@gmail.com | info.raymindo.inline@gmail.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>Senin - Jumat: 08:30 - 17:30</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-red-900/50 text-red-200 border border-red-700/50">
              <ShieldCheck className="w-3 h-3 mr-1 text-red-400" /> PPJK & Undername Service Resmi
            </span>
            <a 
              href="https://wa.me/6281517077855?text=Halo%20PT%20Raymindo%20Interbenua%20Line,%20saya%20ingin%20konsultasi%20pengiriman%20kargo"
              target="_blank" 
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center space-x-1"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp Official</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className={`transition-all duration-300 ${isScrolled ? 'bg-brand-navy/95 backdrop-blur-md shadow-xl py-2.5' : 'bg-brand-navy py-3.5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo: RR */}
            <a href="#beranda" className="flex items-center space-x-3 group">
              <div className="flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <img 
                  src="/logo.png" 
                  alt="PT RAYMINDO INTERBENUA LINE" 
                  className="h-10 sm:h-12 w-auto object-contain bg-transparent" 
                  style={{ background: 'transparent' }}
                />
              </div>
              <div className="text-left">
                <div className="text-white font-black text-base sm:text-lg leading-tight tracking-wide">
                  PT RAYMINDO INTERBENUA LINE
                </div>
                <div className="text-slate-300 text-xs font-semibold tracking-wider uppercase">
                  International Freight Forwarder
                </div>
              </div>
            </a>

            {/* Desktop Nav Items */}
            <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              {navLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={item.onClick}
                  className="px-3 py-2 rounded-md text-sm font-medium text-slate-200 hover:text-white hover:bg-white/10 transition-colors"
                >
                  {item.name}
                </a>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="hidden sm:flex items-center space-x-3">
              <a
                href="#calculator"
                onClick={onNavigateToCalculator}
                className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-lg text-xs font-bold text-white bg-brand-red hover:bg-brand-redHover shadow-glow-red transition-all transform hover:-translate-y-0.5"
              >
                <Calculator className="w-3.5 h-3.5" />
                <span>Cek Tarif</span>
              </a>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex lg:hidden items-center space-x-2">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-200 hover:text-white hover:bg-white/10 focus:outline-none"
                aria-label="Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-brand-dark/95 backdrop-blur-xl border-t border-slate-800 px-4 pt-3 pb-6 space-y-2">
            {navLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  if (item.onClick) item.onClick(e);
                }}
                className="block px-3 py-2.5 rounded-lg text-base font-medium text-slate-200 hover:text-white hover:bg-white/10 flex items-center justify-between"
              >
                <span>{item.name}</span>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </a>
            ))}
            <div className="pt-4 border-t border-slate-800/80">
              <a
                href="#calculator"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 px-3 rounded-lg text-center font-bold text-xs text-white bg-brand-red flex items-center justify-center space-x-1.5 shadow-glow-red"
              >
                <Calculator className="w-4 h-4" />
                <span>Cek Estimasi Tarif</span>
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
