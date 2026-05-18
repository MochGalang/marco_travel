import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';

const navLinks = [
  { label: 'Beranda', href: '#beranda' },
  { label: 'Paket Haji', href: '#paket' },
  { label: 'Tentang Kami', href: '#tentang' },
  { label: 'Testimoni', href: '#testimoni' },
  { label: 'Kontak', href: '#kontak' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-xl shadow-lg shadow-emerald-900/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-3">
          {/* Logo */}
          <a
            href="#beranda"
            onClick={(e) => { e.preventDefault(); handleNavClick('#beranda'); }}
            className="flex items-center gap-3 group"
          >
            {/* Hexagon Logo */}
            <div className="relative w-11 h-11 flex items-center justify-center">
              <div className="hexagon w-11 h-11 bg-gradient-to-br from-[#1a5c3a] to-[#2d7a50] flex items-center justify-center shadow-lg group-hover:shadow-emerald-500/40 transition-shadow duration-300">
                <span
                  className="font-playfair font-bold text-white text-xl leading-none"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  M
                </span>
              </div>
              <div className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#c9a84c]" />
            </div>
            <div className="flex flex-col">
              <span
                className={`font-bold text-lg leading-tight tracking-wide transition-colors duration-300 ${
                  scrolled ? 'text-[#1a5c3a]' : 'text-white'
                }`}
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                MARCO
              </span>
              <span
                className={`text-xs font-medium tracking-widest uppercase transition-colors duration-300 ${
                  scrolled ? 'text-[#c9a84c]' : 'text-[#c9a84c]'
                }`}
              >
                Tour . Travel
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-emerald-50 hover:text-[#1a5c3a] ${
                  scrolled ? 'text-gray-700' : 'text-white/90 hover:text-white hover:bg-white/10 hover:bg-emerald-50/0'
                }`}
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#1a5c3a] hover:bg-[#2d7a50] text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-emerald-900/30 hover:-translate-y-0.5"
            >
              <Phone size={15} />
              Konsultasi Gratis
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            className={`md:hidden p-2 rounded-lg transition-colors ${
              scrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
            }`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden bg-white/95 backdrop-blur-xl border-t border-gray-100 overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="px-4 py-3 rounded-xl text-gray-700 font-medium hover:bg-emerald-50 hover:text-[#1a5c3a] transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.05 }}
                className="mt-2 flex items-center justify-center gap-2 bg-[#1a5c3a] text-white px-5 py-3 rounded-xl font-semibold"
              >
                <Phone size={16} />
                Konsultasi Gratis
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
