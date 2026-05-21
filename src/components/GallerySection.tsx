import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { ZoomIn } from 'lucide-react';

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
