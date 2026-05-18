import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle, CheckCircle, Star, Users } from 'lucide-react';

const badges = [
  { icon: <CheckCircle size={16} className="text-[#c9a84c]" />, text: 'Terdaftar Kemenag RI' },
  { icon: <Star size={16} className="text-[#c9a84c]" />, text: '22 Tahun Pengalaman' },
  { icon: <Users size={16} className="text-[#c9a84c]" />, text: '10.000+ Jamaah' },
];

export default function HeroSection() {
  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="beranda"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
      />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0d3321]/95 via-[#1a5c3a]/85 to-[#2d7a50]/70" />
      {/* Arabesque Pattern */}
      <div className="absolute inset-0 arabesque-pattern opacity-30" />
      {/* Geometric decorations */}
      <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-[#c9a84c]/5 blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-emerald-400/5 blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="max-w-4xl">
          {/* Pre-headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-2 mb-6"
          >
            <div className="h-px w-12 bg-[#c9a84c]" />
            <span className="text-[#c9a84c] text-sm font-semibold tracking-widest uppercase font-inter">
              Agen Resmi Kemenag RI
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-playfair text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Wujudkan Impian{' '}
            <span className="text-[#c9a84c]">Ibadah Haji</span>{' '}
            &amp; Umroh Anda{' '}
            <span className="italic">Bersama Marco</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="text-white/80 text-lg sm:text-xl max-w-2xl mb-10 leading-relaxed font-inter"
          >
            Agen resmi haji khusus &amp; umroh terpercaya sejak 2003. Melayani dengan sepenuh hati untuk pengalaman ibadah yang sempurna dan berkesan.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            className="flex flex-col sm:flex-row gap-4 mb-14"
          >
            <button
              onClick={() => handleScrollTo('paket')}
              className="group flex items-center justify-center gap-2 bg-[#c9a84c] hover:bg-[#b8943d] text-white px-8 py-4 rounded-xl font-semibold text-base transition-all duration-300 hover:shadow-xl hover:shadow-yellow-900/30 hover:-translate-y-1"
            >
              Lihat Paket Kami
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-xl font-semibold text-base transition-all duration-300 hover:-translate-y-1"
            >
              <MessageCircle size={18} />
              Hubungi Kami
            </a>
          </motion.div>

          {/* Floating Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="flex flex-wrap gap-3"
          >
            {badges.map((badge, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.9 + i * 0.1 }}
                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2"
              >
                {badge.icon}
                <span className="text-white text-sm font-medium">{badge.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/50 text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 border-2 border-white/30 rounded-full flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 bg-white/50 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
