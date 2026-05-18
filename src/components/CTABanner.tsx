import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Clock, Users, Phone } from 'lucide-react';

export default function CTABanner() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="relative overflow-hidden bg-gradient-to-br from-[#0d3321] via-[#1a5c3a] to-[#2d7a50] py-20">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#c9a84c]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute inset-0 arabesque-pattern opacity-20" />

      {/* Gold border top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#c9a84c] to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          {/* Left Content */}
          <div className="text-center lg:text-left max-w-2xl">
            {/* Urgency Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-red-500/20 border border-red-400/30 text-red-300 px-4 py-1.5 rounded-full text-sm font-semibold mb-6"
            >
              <Clock size={14} className="animate-pulse" />
              Seat Haji Khusus 2026 — Sangat Terbatas!
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Daftarkan Diri Sekarang{' '}
              <span className="text-[#c9a84c]">Sebelum Kehabisan!</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white/80 text-lg mb-8 leading-relaxed"
            >
              Ribuan calon jamaah sudah mendaftar. Jangan lewatkan kesempatan emas ini untuk menunaikan ibadah haji bersama Marco Tour &amp; Travel.
            </motion.p>

            {/* Mini Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap justify-center lg:justify-start gap-6"
            >
              <div className="flex items-center gap-2 text-white/80">
                <Users size={16} className="text-[#c9a84c]" />
                <span className="text-sm">Hanya tersisa <strong className="text-white">12 seat</strong></span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <Phone size={16} className="text-[#c9a84c]" />
                <span className="text-sm">Respon cepat <strong className="text-white">&lt; 5 menit</strong></span>
              </div>
            </motion.div>
          </div>

          {/* Right CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col gap-4 w-full lg:w-auto"
          >
            <a
              href="https://wa.me/6281234567890?text=Halo%20Marco%20Tour%2C%20saya%20ingin%20mendaftar%20Haji%20Khusus%202026"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] text-white px-10 py-5 rounded-2xl font-bold text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-green-900/40 hover:-translate-y-1 min-w-72"
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white flex-shrink-0" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Hubungi Via WhatsApp
            </a>

            <a
              href="tel:+6281234567890"
              className="flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white px-10 py-4 rounded-2xl font-semibold text-base transition-all duration-300 hover:-translate-y-0.5"
            >
              <Phone size={18} />
              +62 812-3456-7890
            </a>

            <p className="text-center text-white/50 text-xs">
              Konsultasi gratis • Tanpa komitmen • Respon cepat
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
