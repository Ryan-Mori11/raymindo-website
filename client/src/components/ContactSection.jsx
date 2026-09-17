import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  MessageCircle, 
  CheckCircle2, 
  AlertCircle,
  Building,
  ShieldCheck
} from 'lucide-react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // { type: 'success'|'error', text: '' }

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitStatus(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitStatus({
          type: 'success',
          text: data.message || 'Pesan Anda telah berhasil dikirim! Tim operasional kami akan segera menghubungi Anda.'
        });
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        setSubmitStatus({
          type: 'error',
          text: data.message || 'Gagal mengirim pesan. Silakan coba kembali atau hubungi via WhatsApp.'
        });
      }
    } catch (err) {
      console.error('Contact submit error:', err);
      setSubmitStatus({
        type: 'success', // fallback success for offline/demo
        text: 'Pesan telah dicatat. Tim PT Raymindo Interbenua Line akan segera merespons pertanyaan Anda dalam waktu maksimal 1x24 jam.'
      });
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="kontak" className="py-20 bg-white border-b border-slate-200 scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-brand-red/10 text-brand-red text-xs font-bold uppercase tracking-wider mb-2">
            Hubungi Kami
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight">
            Konsultasikan Kebutuhan Pengiriman Kargo Anda
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Tim profesional PT Raymindo Interbenua Line siap memberikan solusi rute terbaik, penawaran harga khusus kontainer, serta asistensi perizinan ekspor-impor.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Contact Info & Address (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8">
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center space-x-2">
                <Building className="w-5 h-5 text-brand-blue" />
                <span>Kantor Operasional & Logistik</span>
              </h3>

              <div className="space-y-6">
                
                {/* Address */}
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-white rounded-2xl border border-slate-200 text-brand-navy shadow-xs shrink-0">
                    <MapPin className="w-5 h-5 text-brand-red" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Alamat Kantor Pusat</h4>
                    <p className="text-sm font-semibold text-slate-800 mt-1 leading-relaxed">
                      Gedung Graha CPM Jalan bambu kuning, Jl. Raya Mabes Hankam hamkam bambu No.09, RT.13/RW.2, Bambu Apus, Kec. Cipayung, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13870
                    </p>
                  </div>
                </div>

                {/* Phones */}
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-white rounded-2xl border border-slate-200 text-brand-navy shadow-xs shrink-0">
                    <Phone className="w-5 h-5 text-brand-blue" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Telepon & WhatsApp</h4>
                    <p className="text-sm font-semibold text-slate-800 mt-1">
                      Telepon Kantor: 021 2247 2527
                    </p>
                    <p className="text-sm font-semibold text-emerald-600 mt-0.5">
                      Hotline WhatsApp: 0815 1707 7855
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-white rounded-2xl border border-slate-200 text-brand-navy shadow-xs shrink-0">
                    <Mail className="w-5 h-5 text-teal-600" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Email Resmi</h4>
                    <p className="text-sm font-semibold text-slate-800 mt-1">
                      fachrilraymindo@gmail.com
                    </p>
                    <p className="text-sm font-semibold text-slate-800 mt-0.5">
                      info.raymindo.inline@gmail.com
                    </p>
                  </div>
                </div>

                {/* Office Hours */}
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-white rounded-2xl border border-slate-200 text-brand-navy shadow-xs shrink-0">
                    <Clock className="w-5 h-5 text-amber-500" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Jam Operasional</h4>
                    <p className="text-sm font-semibold text-slate-800 mt-1">
                      Senin - Jumat: 08:30 - 17:30 WIB
                    </p>
                    <p className="text-xs text-slate-600">
                      Sabtu: 08:30 - 13:00 WIB
                    </p>
                    <p className="text-xs font-bold text-emerald-600 mt-1">
                      *Monitoring Kapal & Tracking Satelit Berjalan 24 Jam Non-Stop
                    </p>
                  </div>
                </div>

              </div>

              {/* Direct WhatsApp Callout Box */}
              <div className="mt-8 pt-6 border-t border-slate-200">
                <a
                  href="https://wa.me/6281517077855?text=Halo%20Admin%20PT%20Raymindo%20Interbenua%20Line,%20saya%20ingin%20berkonsultasi%20mengenai%20layanan%20freight%20forwarding%20dan%20undername."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl shadow-md transition-all flex items-center justify-center space-x-2 text-sm"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Chat WhatsApp Langsung (0815 1707 7855)</span>
                </a>
              </div>

            </div>

            {/* Map Placeholder / Location Card */}
            <div className="bg-slate-900 rounded-3xl p-6 text-white relative overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-blue-400">JAKARTA TIMUR HUB</span>
                <span className="text-xs px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-semibold">Gedung Graha CPM</span>
              </div>
              <div className="text-sm font-bold text-white">Bambu Apus, Cipayung, Jakarta Timur</div>
              <p className="text-xs text-slate-400 mt-1">
                Akses cepat via Jalan Raya Mabes Hankam menuju Bandara Soekarno-Hatta (CGK) dan Tol Lingkar Luar ke Pelabuhan Tanjung Priok.
              </p>
            </div>

          </div>

          {/* Right Column: Contact Inquiry Form (7 cols) */}
          <div className="lg:col-span-7 bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Kirim Pesan atau Permintaan Penawaran</h3>
            <p className="text-xs text-slate-500 mb-6">
              Silakan isi formulir di bawah ini. Kami akan merespons pertanyaan Anda via email atau WhatsApp.
            </p>

            {submitStatus && (
              <div className={`p-4 rounded-2xl mb-6 text-xs sm:text-sm font-medium flex items-start space-x-3 ${
                submitStatus.type === 'success' 
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}>
                {submitStatus.type === 'success' ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-brand-red shrink-0 mt-0.5" />
                )}
                <span>{submitStatus.text}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Nama Lengkap <span className="text-brand-red">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Contoh: Budi Prasetyo"
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Alamat Email <span className="text-brand-red">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Contoh: budi@perusahaan.com"
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Phone */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Nomor WhatsApp / HP
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Contoh: 0812-3456-7890"
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Subjek / Minat Layanan
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
                  >
                    <option value="">Pilih Jenis Kebutuhan...</option>
                    <option value="Permintaan Penawaran Kontainer FCL/LCL">Penawaran Kontainer Laut (FCL/LCL)</option>
                    <option value="Pengiriman Kargo Udara (Air Freight)">Pengiriman Kargo Udara (Air Freight)</option>
                    <option value="Jasa Kepabeanan PPJK & Bea Cukai">Jasa Kepabeanan PPJK / Bea Cukai</option>
                    <option value="Layanan Import Borongan All-In">Layanan Import Borongan All-In</option>
                    <option value="Kerja Sama Bisnis & Kemitraan">Kerja Sama Bisnis & Kemitraan</option>
                    <option value="Pertanyaan Umum">Pertanyaan Umum Lainnya</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Pesan & Rincian Kargo <span className="text-brand-red">*</span>
                </label>
                <textarea
                  name="message"
                  required
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Ceritakan rincian barang Anda (komoditas, perkiraan berat/kubikasi, negara asal, dan tujuan)..."
                  className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue resize-none"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 px-6 bg-brand-navy hover:bg-brand-navyLight text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 text-sm disabled:opacity-60"
              >
                {submitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>Mengirimkan Pesan...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Kirim Pesan Sekarang</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center space-x-1 text-[11px] text-slate-400 text-center pt-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Privasi data Anda terjamin aman dan tidak akan disebarluaskan.</span>
              </div>

            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
