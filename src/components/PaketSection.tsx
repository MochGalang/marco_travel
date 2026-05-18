import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Clock, Users, Star, ArrowRight, Check } from 'lucide-react';

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
}

const pakets: Paket[] = [
  {
    id: 1,
    nama: 'Haji Khusus Plus 2026',
    image: '/images/haji-khusus.jpg',
    harga: 'Rp 220.000.000',
    durasi: '40 Hari',
    kapasitas: 'Terbatas 45 Seat',
    rating: 5,
    badge: 'TERBATAS',
    badgeColor: 'bg-red-500',
    fasilitas: [
      'Hotel Bintang 5 dekat Masjidil Haram',
      'Pembimbing Bersertifikat Kemenag',
      'Visa Haji Resmi',
      'Full Board (Makan 3x Sehari)',
      'Manasik Intensif 6 Bulan',
    ],
    highlight: true,
  },
  {
    id: 2,
    nama: 'Umroh Reguler',
    image: '/images/umroh-reguler.jpg',
    harga: 'Rp 32.500.000',
    durasi: '12 Hari',
    kapasitas: 'Setiap Bulan',
    rating: 5,
    badge: 'TERPOPULER',
    badgeColor: 'bg-[#1a5c3a]',
    fasilitas: [
      'Hotel Bintang 4 Makkah & Madinah',
      'Tiket PP Garuda / Saudi Airlines',
      'Pembimbing Ibadah Berpengalaman',
      'Full Board Makkah & Madinah',
      'Ziarah Makkah & Madinah',
    ],
    highlight: false,
  },
  {
    id: 3,
    nama: 'Umroh Ramadhan',
    image: '/images/umroh-ramadhan.jpg',
    harga: 'Rp 45.000.000',
    durasi: '15 Hari',
    kapasitas: 'Ramadhan 2026',
    rating: 5,
    badge: 'SPESIAL',
    badgeColor: 'bg-[#c9a84c]',
    fasilitas: [
      'Hotel Bintang 5 Makkah',
      'Shalat Tarawih di Masjidil Haram',
      'Itikaf 10 Malam Terakhir',
      'Pembimbing Khusus Ramadhan',
      'Full Board + Sahur & Buka',
    ],
    highlight: false,
  },
  {
    id: 4,
    nama: 'Umroh Plus Turki',
    image: '/images/turki.jpg',
    harga: 'Rp 58.000.000',
    durasi: '18 Hari',
    kapasitas: 'Terbatas 30 Seat',
    rating: 5,
    badge: 'PREMIUM',
    badgeColor: 'bg-purple-600',
    fasilitas: [
      'Makkah + Madinah + Istanbul',
      'Hotel Bintang 5 Semua Kota',
      'City Tour Istanbul & Cappadocia',
      'Full Board Sepanjang Perjalanan',
      'Perlengkapan Umroh Premium',
    ],
    highlight: false,
  },
];

function ImageWithSkeleton({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="relative w-full h-52 overflow-hidden">
      {!loaded && <div className="absolute inset-0 shimmer" />}
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        className={`w-full h-full object-cover transition-all duration-700 ${loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
      />
    </div>
  );
}

export default function PaketSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

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

        {/* Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
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

                {/* Rating */}
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: paket.rating }).map((_, i) => (
                    <Star key={i} size={12} className="text-[#c9a84c] fill-[#c9a84c]" />
                  ))}
                  <span className="text-xs text-gray-500 ml-1">({paket.rating}.0)</span>
                </div>

                {/* Info Pills */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="flex items-center gap-1 text-xs text-gray-600 bg-gray-100 px-2.5 py-1 rounded-full">
                    <Clock size={11} />
                    {paket.durasi}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-gray-600 bg-gray-100 px-2.5 py-1 rounded-full">
                    <Users size={11} />
                    {paket.kapasitas}
                  </span>
                </div>

                {/* Facilities */}
                <ul className="space-y-1.5 mb-5">
                  {paket.fasilitas.slice(0, 3).map((f, fi) => (
                    <li key={fi} className="flex items-start gap-2 text-xs text-gray-600">
                      <Check size={13} className="text-[#1a5c3a] mt-0.5 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* Price & CTA */}
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-500 mb-0.5">Mulai dari</p>
                  <p
                    className="text-xl font-bold text-[#1a5c3a] mb-3"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {paket.harga}
                  </p>
                  <a
                    href="https://wa.me/6281234567890"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn flex items-center justify-center gap-2 w-full bg-[#1a5c3a] hover:bg-[#2d7a50] text-white py-2.5 rounded-xl text-sm font-semibold transition-all duration-300"
                  >
                    Lihat Detail
                    <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
