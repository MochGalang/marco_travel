import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Clock, Users, Star, ArrowRight, Check, X, MessageCircle, Phone, MapPin, Calendar, Shield, Award } from 'lucide-react';

interface Paket {
  id: number;
  nama: string;
  image: string;
  harga: string;
  durasi: string;
  kapasitas: string;
  rating: number;
  badge?: string;
  badgeColor?: string;
  fasilitas: string[];
  highlight: boolean;
  deskripsi: string;
  itinerary: string[];
  includes: string[];
  excludes: string[];
  keberangkatan: string;
  maskapai: string;
  hotel: string;
  wa: string;
}

function ImageWithSkeleton({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="relative w-full h-52 overflow-hidden bg-gray-200">
      {!loaded && <div className="absolute inset-0 shimmer" />}
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        onError={(e) => { e.currentTarget.src = 'https://placehold.co/600x400/1a5c3a/fff?text=Paket+Travel' }}
        className={`w-full h-full object-cover transition-all duration-700 ${loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
      />
    </div>
  );
}

function PaketModal({ paket, onClose }: { paket: Paket; onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />

        {/* Modal */}
        <motion.div
          className="relative bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto z-10"
          initial={{ opacity: 0, scale: 0.88, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.88, y: 40 }}
          transition={{ type: 'spring', stiffness: 300, damping: 28 }}
        >
          {/* Header Image */}
          <div className="relative h-56 overflow-hidden rounded-t-3xl bg-gray-800">
            <img src={paket.image} alt={paket.nama} onError={(e) => { e.currentTarget.src = 'https://placehold.co/800x400/1a5c3a/fff?text=Paket+Travel' }} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            {paket.badge && (
              <span className={`absolute top-4 left-4 ${paket.badgeColor} text-white text-xs font-bold px-3 py-1 rounded-full`}>
                {paket.badge}
              </span>
            )}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white rounded-full p-2 transition-all"
            >
              <X size={18} />
            </button>
            <div className="absolute bottom-4 left-4 right-4">
              <h2 className="text-white text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
                {paket.nama}
              </h2>
              <div className="flex items-center gap-1 mt-1">
                {Array.from({ length: paket.rating || 5 }).map((_, i) => (
                  <Star key={i} size={12} className="text-[#c9a84c] fill-[#c9a84c]" />
                ))}
                <span className="text-white/80 text-xs ml-1">({paket.rating || 5}.0) – Rating Terbaik</span>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Price & Info Pills */}
            <div className="flex flex-wrap items-center gap-3">
              <div>
                <p className="text-xs text-gray-500">Mulai dari</p>
                <p className="text-2xl font-bold text-[#1a5c3a]" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {paket.harga}
                </p>
              </div>
              <div className="ml-auto flex flex-wrap gap-2">
                <span className="flex items-center gap-1 text-xs text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full">
                  <Clock size={12} /> {paket.durasi}
                </span>
                <span className="flex items-center gap-1 text-xs text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full">
                  <Users size={12} /> {paket.kapasitas}
                </span>
                <span className="flex items-center gap-1 text-xs text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full">
                  <Calendar size={12} /> {paket.keberangkatan}
                </span>
              </div>
            </div>

            {/* Quick Info */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2 bg-green-50 rounded-xl p-3">
                <Award size={16} className="text-[#1a5c3a]" />
                <div>
                  <p className="text-xs text-gray-500">Maskapai</p>
                  <p className="text-sm font-semibold text-gray-800">{paket.maskapai}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-yellow-50 rounded-xl p-3">
                <MapPin size={16} className="text-[#c9a84c]" />
                <div>
                  <p className="text-xs text-gray-500">Hotel</p>
                  <p className="text-sm font-semibold text-gray-800">{paket.hotel}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                <Shield size={16} className="text-[#1a5c3a]" /> Tentang Paket
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">{paket.deskripsi}</p>
            </div>

            {/* Itinerary */}
            {paket.itinerary && paket.itinerary.length > 0 && (
              <div>
                <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <Calendar size={16} className="text-[#1a5c3a]" /> Itinerary Perjalanan
                </h3>
                <div className="space-y-2">
                  {paket.itinerary.map((item, i) => (
                    <div key={i} className="flex gap-3 items-start">
                      <div className="w-6 h-6 rounded-full bg-[#1a5c3a] text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">
                        {i + 1}
                      </div>
                      <p className="text-sm text-gray-600">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Includes / Excludes */}
            <div className="grid sm:grid-cols-2 gap-4">
              {paket.includes && paket.includes.length > 0 && (
                <div>
                  <h3 className="font-bold text-gray-800 mb-2 text-sm">✅ Sudah Termasuk</h3>
                  <ul className="space-y-1.5">
                    {paket.includes.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-gray-600">
                        <Check size={12} className="text-[#1a5c3a] mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {paket.excludes && paket.excludes.length > 0 && (
                <div>
                  <h3 className="font-bold text-gray-800 mb-2 text-sm">❌ Tidak Termasuk</h3>
                  <ul className="space-y-1.5">
                    {paket.excludes.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-gray-500">
                        <X size={12} className="text-red-400 mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2 border-t border-gray-100">
              <a
                href={paket.wa}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-green-200 hover:-translate-y-0.5"
              >
                <MessageCircle size={16} />
                Daftar via WhatsApp
              </a>
              <a
                href="tel:+6281234567890"
                className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300"
              >
                <Phone size={16} />
                Telepon
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function PaketSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [selectedPaket, setSelectedPaket] = useState<Paket | null>(null);
  const [pakets, setPakets] = useState<Paket[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mengambil data dari API yang sudah dibuat di folder travel/api
    fetch('https://admin-api-tau.vercel.app/api/paket')
      .then(res => res.json())
      .then(json => {
        if (json.success && json.data) {
          setPakets(json.data);
        }
      })
      .catch(err => console.error("Gagal mengambil data paket:", err))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <section id="paket" ref={ref} className="py-24 bg-gray-50">
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
            <span className="text-[#c9a84c] text-sm font-semibold tracking-widest uppercase">Pilihan Paket</span>
            <div className="h-px w-12 bg-[#c9a84c]" />
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1a5c3a] mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Paket Perjalanan Unggulan
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Temukan paket haji dan umroh yang sesuai dengan kebutuhan dan anggaran Anda
          </p>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#1a5c3a] border-t-transparent"></div>
          </div>
        ) : pakets.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <p>Belum ada paket travel yang tersedia saat ini.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Cards Grid */}
            {pakets.map((paket, i) => (
              <motion.div
                key={paket.id}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className={`group relative bg-white rounded-2xl overflow-hidden card-hover shadow-sm ${
                  paket.highlight ? 'ring-2 ring-[#1a5c3a]' : ''
                }`}
              >
                {/* Badge */}
                {paket.badge && (
                  <div className={`absolute top-4 left-4 z-10 ${paket.badgeColor} text-white text-xs font-bold px-3 py-1 rounded-full tracking-wide`}>
                    {paket.badge}
                  </div>
                )}

                {/* Image */}
                <div className="relative overflow-hidden">
                  <ImageWithSkeleton src={paket.image} alt={paket.nama} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3
                    className="font-bold text-gray-900 text-lg mb-1 leading-tight"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {paket.nama}
                  </h3>

                  <div className="flex items-center gap-1 mb-3">
                    {Array.from({ length: paket.rating || 5 }).map((_, i) => (
                      <Star key={i} size={12} className="text-[#c9a84c] fill-[#c9a84c]" />
                    ))}
                    <span className="text-xs text-gray-500 ml-1">({paket.rating || 5}.0)</span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="flex items-center gap-1 text-xs text-gray-600 bg-gray-100 px-2.5 py-1 rounded-full">
                      <Clock size={11} />{paket.durasi}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-gray-600 bg-gray-100 px-2.5 py-1 rounded-full">
                      <Users size={11} />{paket.kapasitas}
                    </span>
                  </div>

                  <ul className="space-y-1.5 mb-5">
                    {paket.fasilitas && paket.fasilitas.slice(0, 3).map((f, fi) => (
                      <li key={fi} className="flex items-start gap-2 text-xs text-gray-600">
                        <Check size={13} className="text-[#1a5c3a] mt-0.5 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <div className="pt-4 border-t border-gray-100">
                    <p className="text-xs text-gray-500 mb-0.5">Mulai dari</p>
                    <p
                      className="text-xl font-bold text-[#1a5c3a] mb-3"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {paket.harga}
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setSelectedPaket(paket)}
                      className="group/btn flex items-center justify-center gap-2 w-full bg-[#1a5c3a] hover:bg-[#2d7a50] text-white py-2.5 rounded-xl text-sm font-semibold transition-all duration-300"
                    >
                      Lihat Detail
                      <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedPaket && (
        <PaketModal paket={selectedPaket} onClose={() => setSelectedPaket(null)} />
      )}
    </section>
  );
}
