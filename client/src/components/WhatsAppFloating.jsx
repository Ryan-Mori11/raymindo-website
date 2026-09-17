import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export default function WhatsAppFloating() {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Mini notification popup */}
      {showTooltip && (
        <div className="mb-2 bg-white text-slate-800 text-xs py-2 px-3 rounded-xl shadow-xl border border-slate-200 flex items-center space-x-2 animate-bounce">
          <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
          <span className="font-semibold">Konsultasi Kargo 24/7? Hubungi Kami!</span>
          <button 
            onClick={() => setShowTooltip(false)}
            className="text-slate-400 hover:text-slate-600 p-0.5"
            title="Tutup"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Floating Button */}
      <a
        href="https://wa.me/6281517077855?text=Halo%20Admin%20PT%20Raymindo%20Interbenua%20Line,%20saya%20ingin%20menanyakan%20layanan%20pengiriman%20kargo%20dan%20undername."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat WhatsApp PT Raymindo"
        className="w-14 h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 group relative"
      >
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400"></span>
        </span>
        <MessageCircle className="w-7 h-7" />
      </a>
    </div>
  );
}
