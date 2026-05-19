import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, MessageCircle, CheckCircle, Star, Users } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';

const badges = [
  { icon: <CheckCircle size={16} className="text-[#c9a84c]" />, text: 'Terdaftar Kemenag RI' },
  { icon: <Star size={16} className="text-[#c9a84c]" />, text: '22 Tahun Pengalaman' },
  { icon: <Users size={16} className="text-[#c9a84c]" />, text: '10.000+ Jamaah' },
];

// Floating particles
const particles = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 4 + 2,
  duration: Math.random() * 6 + 5,
  delay: Math.random() * 4,
}));

// Floating icons (moon, star, crescent shapes as unicode)
const floatingIcons = [
  { symbol: '☪', x: 85, y: 20, size: 28, delay: 0 },
  { symbol: '✦', x: 12, y: 65, size: 18, delay: 1.2 },
  { symbol: '☽', x: 75, y: 70, size: 24, delay: 0.6 },
  { symbol: '✦', x: 55, y: 15, size: 14, delay: 2.1 },
  { symbol: '✦', x: 30, y: 80, size: 10, delay: 1.8 },
];

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef1 = useRef<HTMLVideoElement>(null);
  const videoRef2 = useRef<HTMLVideoElement>(null);
  const activeRef = useRef<1 | 2>(1);
  const [activeVideo, setActiveVideo] = useState<1 | 2>(1);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 600], [0, 120]);
  const bgScale = useTransform(scrollY, [0, 600], [1, 1.08]);

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Seamless video loop: crossfade between two video elements
  useEffect(() => {
    const v1 = videoRef1.current;
    const v2 = videoRef2.current;
    if (!v1 || !v2) return;

    const SWITCH_BEFORE = 0.8; // seconds before end to start switching

    v1.play().catch(() => {});

    const makeHandler = (
      current: HTMLVideoElement,
      next: HTMLVideoElement,
      which: 1 | 2
    ) => () => {
      if (!current.duration) return;
      if (
        current.duration - current.currentTime <= SWITCH_BEFORE &&
        activeRef.current === which
      ) {
        activeRef.current = which === 1 ? 2 : 1;
        setActiveVideo(which === 1 ? 2 : 1);
        next.currentTime = 0;
        next.play().catch(() => {});
      }
    };

    const handle1 = makeHandler(v1, v2, 1);
    const handle2 = makeHandler(v2, v1, 2);

    v1.addEventListener('timeupdate', handle1);
    v2.addEventListener('timeupdate', handle2);

    return () => {
      v1.removeEventListener('timeupdate', handle1);
      v2.removeEventListener('timeupdate', handle2);
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect) return;
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
        y: ((e.clientY - rect.top) / rect.height - 0.5) * 12,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      id="beranda"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Video — Dual crossfade for seamless loop */}
      {/* Layer luar: hanya scroll parallax */}
      <motion.div
        className="absolute inset-0 overflow-hidden will-change-transform"
        style={{ y: bgY, scale: bgScale }}
      >
        {/* Layer dalam: hanya mouse movement */}
        <motion.div
          className="absolute inset-0"
          animate={{
            x: mousePos.x * 0.5,
            y: mousePos.y * 0.5,
          }}
          transition={{ type: 'spring', stiffness: 60, damping: 20 }}
        >
        {/* Video A */}
        <motion.video
          ref={videoRef1}
          src="/videos/tawaf.mp4"
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          animate={{ opacity: activeVideo === 1 ? 1 : 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        />
        {/* Video B */}
        <motion.video
          ref={videoRef2}
          src="/videos/tawaf.mp4"
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: activeVideo === 2 ? 1 : 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        />
        </motion.div>
      </motion.div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0d3321]/95 via-[#1a5c3a]/85 to-[#2d7a50]/70" />
      {/* Arabesque Pattern */}
      <div className="absolute inset-0 arabesque-pattern opacity-30" />

      {/* Floating Particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-[#c9a84c]/30 pointer-events-none"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 10, -8, 0],
            opacity: [0.2, 0.7, 0.2],
            scale: [1, 1.4, 1],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Floating Icons */}
      {floatingIcons.map((icon, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none select-none text-[#c9a84c]/20"
          style={{
            left: `${icon.x}%`,
            top: `${icon.y}%`,
            fontSize: icon.size,
          }}
          animate={{
            y: [0, -18, 0],
            rotate: [0, 15, -10, 0],
            opacity: [0.15, 0.35, 0.15],
          }}
          transition={{
            duration: 7 + icon.delay,
            delay: icon.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {icon.symbol}
        </motion.div>
      ))}

      {/* Glowing orbs */}
      <motion.div
        className="absolute top-20 right-10 w-72 h-72 rounded-full bg-[#c9a84c]/8 blur-3xl pointer-events-none"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-emerald-400/8 blur-3xl pointer-events-none"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />

      {/* Floating image card - Masjidil Haram thumbnail */}
      <motion.div
        className="absolute right-8 bottom-24 hidden lg:block pointer-events-none z-10"
        initial={{ opacity: 0, x: 60, y: 20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 1, delay: 1.2, ease: 'easeOut' }}
      >
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-2 shadow-2xl"
        >
          <img
            src="/images/madinah.jpg"
            alt="Madinah"
            className="w-44 h-28 object-cover rounded-xl"
          />
          <div className="p-2">
            <p className="text-white text-xs font-semibold">Madinah Al-Munawwarah</p>
            <div className="flex items-center gap-1 mt-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={9} className="text-[#c9a84c] fill-[#c9a84c]" />
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>



      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32 pt-32">
        <div className="max-w-4xl">
          {/* Pre-headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-2 mb-6"
          >
            <motion.div
              className="h-px bg-[#c9a84c]"
              initial={{ width: 0 }}
              animate={{ width: 48 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            />
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
            <motion.span
              className="text-[#c9a84c]"
              animate={{ opacity: [1, 0.7, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              Ibadah Haji
            </motion.span>{' '}
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
            <motion.button
              onClick={() => handleScrollTo('paket')}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.97 }}
              className="group flex items-center justify-center gap-2 bg-[#c9a84c] hover:bg-[#b8943d] text-white px-8 py-4 rounded-xl font-semibold text-base transition-all duration-300 hover:shadow-xl hover:shadow-yellow-900/30"
            >
              Lihat Paket Kami
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
            <motion.a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-xl font-semibold text-base transition-all duration-300"
            >
              <MessageCircle size={18} />
              Hubungi Kami
            </motion.a>
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
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.18)' }}
                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 cursor-default"
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
