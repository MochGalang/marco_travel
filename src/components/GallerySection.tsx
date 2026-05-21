import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ZoomIn, X, ChevronLeft, ChevronRight } from 'lucide-react';

const BASE_URL = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
  ? 'http://localhost:8000/api'
  : 'https://admin-api-tau.vercel.app/api';

const defaultGalleryItems = [
  {
    image: '/images/hero-bg.jpg',
    title: 'Masjidil Haram, Makkah',
    category: 'Ibadah',
    tall: true,
  },
  {
    image: '/images/madinah.jpg',
    title: 'Masjid Nabawi, Madinah',
    category: 'Ibadah',
    tall: false,
  },
  {
    image: '/images/manasik.jpg',
    title: 'Manasik Haji Intensif',
    category: 'Persiapan',
    tall: false,
  },
  {
    image: '/images/gallery-1.jpg',
    title: 'Momen Bersama Jamaah',
    category: 'Dokumentasi',
    tall: true,
  },
  {
    image: '/images/umroh-ramadhan.jpg',
    title: 'Umroh Malam Ramadhan',
    category: 'Ibadah',
    tall: false,
  },
  {
    image: '/images/gallery-2.jpg',
    title: 'Perjalanan Wukuf Arafah',
    category: 'Haji',
    tall: false,
  },
  {
    image: '/images/turki.jpg',
    title: 'Wisata Halal Istanbul',
    category: 'Tour Plus',
    tall: false,
  },
  {
    image: '/images/haji-khusus.jpg',
    title: 'Akomodasi Premium Bintang 5',
    category: 'Fasilitas',
    tall: false,
  },
];

interface GalleryItem {
  id?: number;
  image: string;
  title: string;
  category: string;
  tall: boolean;
}

export default function GallerySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [hovered, setHovered] = useState<number | null>(null);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    fetch(`${BASE_URL}/galeri`)
      .then(res => res.json())
      .then(json => {
        if (json.success && json.data && json.data.length > 0) {
          setGalleryItems(json.data);
        } else {
          setGalleryItems(defaultGalleryItems);
        }
      })
      .catch(err => {
        console.error("Gagal mengambil data galeri:", err);
        setGalleryItems(defaultGalleryItems);
      });
  }, []);

  // Keyboard Navigation & body scroll lock
  useEffect(() => {
    if (selectedIndex === null) {
      document.body.style.overflow = 'unset';
      return;
    }

    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedIndex(null);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [selectedIndex, galleryItems]);

  const handleNext = () => {
    setSelectedIndex((prev) => (prev !== null && prev < galleryItems.length - 1 ? prev + 1 : 0));
  };

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : galleryItems.length - 1));
  };

  const activeItem = selectedIndex !== null ? galleryItems[selectedIndex] : null;

  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-[#c9a84c]" />
            <span className="text-[#c9a84c] text-sm font-semibold tracking-widest uppercase">Galeri Marco</span>
            <div className="h-px w-12 bg-[#c9a84c]" />
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1a5c3a] mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Momen Tak Terlupakan
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Ribuan kenangan indah telah tercipta bersama jamaah Marco Tour &amp; Travel
          </p>
        </motion.div>

        {/* Masonry Grid */}
        <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 space-y-4">
          {galleryItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="break-inside-avoid relative group overflow-hidden rounded-2xl cursor-pointer"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => setSelectedIndex(i)}
            >
              <img
                src={item.image}
                alt={item.title}
                className={`w-full object-cover transition-transform duration-500 group-hover:scale-110 ${item.tall ? 'aspect-[3/4]' : 'aspect-square'}`}
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://placehold.co/400x300/1a5c3a/fff?text=📷';
                }}
              />
              {/* Category Tag */}
              {item.category && (
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[#1a5c3a] text-xs font-semibold px-2.5 py-1 rounded-full">
                  {item.category}
                </div>
              )}

              {/* Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: hovered === i ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-gradient-to-t from-[#1a5c3a]/90 via-[#1a5c3a]/40 to-transparent flex flex-col items-center justify-end p-4"
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: hovered === i ? 1 : 0.8, opacity: hovered === i ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-3"
                >
                  <ZoomIn size={18} className="text-white" />
                </motion.div>
                <p className="text-white font-semibold text-sm text-center leading-tight">{item.title || 'Momen Terbaik'}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Dynamic Lightbox Modal */}
        <AnimatePresence>
          {selectedIndex !== null && activeItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 sm:p-8"
              onClick={() => setSelectedIndex(null)}
            >
              {/* Close Button */}
              <button
                className="absolute top-4 right-4 z-50 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all duration-300"
                onClick={() => setSelectedIndex(null)}
              >
                <X size={24} />
              </button>

              {/* Prev Arrow */}
              <button
                className="absolute left-4 z-50 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all duration-300 hidden sm:block"
                onClick={(e) => { e.stopPropagation(); handlePrev(); }}
              >
                <ChevronLeft size={28} />
              </button>

              {/* Next Arrow */}
              <button
                className="absolute right-4 z-50 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all duration-300 hidden sm:block"
                onClick={(e) => { e.stopPropagation(); handleNext(); }}
              >
                <ChevronRight size={28} />
              </button>

              {/* Lightbox Content Container */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="relative max-w-4xl max-h-[85vh] flex flex-col items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={activeItem.image}
                  alt={activeItem.title}
                  className="max-w-full max-h-[75vh] object-contain rounded-xl shadow-2xl border border-white/10"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://placehold.co/800x600/1a5c3a/fff?text=📷';
                  }}
                />

                {/* Info Text below image */}
                <div className="text-center mt-4 px-4 max-w-xl">
                  {activeItem.category && (
                    <span className="inline-block bg-[#c9a84c] text-white text-[11px] uppercase tracking-wider font-bold px-3 py-1 rounded-full mb-2">
                      {activeItem.category}
                    </span>
                  )}
                  <h3 className="text-white font-medium text-lg leading-snug">
                    {activeItem.title || 'Dokumentasi Perjalanan'}
                  </h3>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Social Proof */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-500 text-sm mb-4">Ikuti kami di media sosial untuk momen terbaru</p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            {[
              { label: '📸 Instagram', handle: '@marco_tour_travel' },
              { label: '📘 Facebook', handle: 'Marco Tour & Travel' },
              { label: '▶️ YouTube', handle: 'Marco Tour Official' },
            ].map((s) => (
              <a
                key={s.label}
                href="#"
                className="px-5 py-2 rounded-full border border-gray-200 text-gray-600 text-sm hover:border-[#1a5c3a] hover:text-[#1a5c3a] hover:bg-emerald-50 transition-all duration-200"
              >
                {s.handle}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
