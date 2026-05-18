import { useRef, useState } from 'react';
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
    deskripsi: 'Paket haji khusus premium kami dirancang untuk memberikan pengalaman ibadah terbaik dan penuh ketenangan. Dengan fasilitas bintang 5 dan pembimbing berpengalaman, kami memastikan setiap momen ibadah Anda berjalan dengan sempurna.',
    itinerary: [
      'Hari 1-3: Keberangkatan dari Jakarta – tiba Madinah',
      'Hari 4-9: Ibadah Arbain di Madinah & Ziarah',
      'Hari 10-12: Perjalanan ke Makkah',
      'Hari 13-20: Persiapan & Manasik Haji di Makkah',
      'Hari 21-26: Puncak Ibadah Haji (Arafah, Muzdalifah, Mina)',
      'Hari 27-38: Ibadah Pasca Haji & Thawaf Wada',
      'Hari 39-40: Kepulangan ke Jakarta',
    ],
    includes: [
      'Tiket PP Garuda Indonesia Kelas Bisnis',
      'Hotel Bintang 5 dekat Masjidil Haram',
      'Hotel Bintang 5 di Madinah',
      'Visa Haji Resmi',
      'Full Board (3x Makan Sehari)',
      'Pembimbing Ibadah Bersertifikat Kemenag',
      'Manasik Intensif 6 Bulan',
      'Perlengkapan Haji Lengkap',
      'Asuransi Perjalanan Premium',
      'Transportasi AC selama ibadah',
    ],
    excludes: ['Biaya personal', 'Oleh-oleh', 'Tips guide lokal'],
    keberangkatan: 'Juni 2026',
    maskapai: 'Garuda Indonesia',
    hotel: 'Hilton & Pullman Makkah',
    wa: 'https://wa.me/6281234567890?text=Assalamualaikum,%20saya%20tertarik%20dengan%20Paket%20Haji%20Khusus%20Plus%202026',
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
    deskripsi: 'Paket umroh reguler kami adalah pilihan terbaik untuk Anda yang ingin menjalankan ibadah umroh dengan nyaman dan terjangkau. Tersedia setiap bulan dengan kuota terbatas untuk pelayanan optimal.',
    itinerary: [
      'Hari 1: Berangkat dari Jakarta',
      'Hari 2-5: Madinah – Shalat Arbain & Ziarah',
      'Hari 6: Perjalanan ke Makkah via Bir Ali',
      'Hari 7-10: Makkah – Umroh & Ibadah',
      'Hari 11: Ziarah Makkah & persiapan pulang',
      'Hari 12: Kembali ke Jakarta',
    ],
    includes: [
      'Tiket PP Garuda / Saudi Airlines',
      'Hotel Bintang 4 di Makkah & Madinah',
      'Visa Umroh',
      'Full Board selama di Makkah & Madinah',
      'Pembimbing Ibadah Berpengalaman',
      'Ziarah Makkah & Madinah',
      'Perlengkapan Umroh',
      'Asuransi Perjalanan',
    ],
    excludes: ['Biaya personal', 'Oleh-oleh', 'Airport tax'],
    keberangkatan: 'Setiap Bulan',
    maskapai: 'Garuda / Saudi Airlines',
    hotel: 'Swiss-Belhotel Makkah',
    wa: 'https://wa.me/6281234567890?text=Assalamualaikum,%20saya%20tertarik%20dengan%20Paket%20Umroh%20Reguler',
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
    deskripsi: 'Rasakan keistimewaan ibadah umroh di bulan suci Ramadhan. Shalat tarawih di Masjidil Haram, berbuka bersama ribuan jamaah, dan mengejar malam Lailatul Qadar – pengalaman spiritual yang tak terlupakan seumur hidup.',
    itinerary: [
      'Hari 1: Keberangkatan Jakarta – Madinah',
      'Hari 2-5: Madinah – Shalat Tarawih & Ziarah',
      'Hari 6: Perjalanan ke Makkah',
      'Hari 7-12: Makkah – Umroh & Tarawih di Masjidil Haram',
      'Hari 13-14: Itikaf 10 Malam Terakhir',
      'Hari 15: Kembali ke Jakarta',
    ],
    includes: [
      'Tiket PP Emirates / Saudia',
      'Hotel Bintang 5 di Makkah',
      'Hotel Bintang 4 di Madinah',
      'Visa Umroh',
      'Full Board + Sahur & Berbuka',
      'Pembimbing Khusus Ramadhan',
      'Program Itikaf 10 Malam Terakhir',
      'Perlengkapan Umroh Premium',
      'Asuransi Perjalanan',
    ],
    excludes: ['Biaya personal', 'Oleh-oleh'],
    keberangkatan: 'Ramadhan 2026',
    maskapai: 'Emirates / Saudia',
    hotel: 'Fairmont Makkah',
    wa: 'https://wa.me/6281234567890?text=Assalamualaikum,%20saya%20tertarik%20dengan%20Paket%20Umroh%20Ramadhan%202026',
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
    deskripsi: 'Padukan ibadah umroh yang khusyuk dengan wisata sejarah Islam di Turki. Kunjungi Hagia Sophia, Topkapi Palace, dan keajaiban alam Cappadocia dalam satu perjalanan tak terlupakan.',
    itinerary: [
      'Hari 1: Jakarta – Istanbul',
      'Hari 2-4: Istanbul – Hagia Sophia, Topkapi, Grand Bazaar',
      'Hari 5-6: Cappadocia – Balon Udara & Ziarah',
      'Hari 7: Istanbul – Madinah',
      'Hari 8-11: Madinah – Shalat & Ziarah',
      'Hari 12: Madinah – Makkah',
      'Hari 13-17: Makkah – Umroh & Ibadah',
      'Hari 18: Kembali ke Jakarta',
    ],
    includes: [
      'Tiket PP Turkish Airlines',
      'Hotel Bintang 5 di Istanbul, Makkah & Madinah',
      'Visa Umroh + Visa Turki',
      'Full Board sepanjang perjalanan',
      'City Tour Istanbul & Cappadocia',
      'Naik Balon Udara Cappadocia',
      'Pembimbing Ibadah & Tour Guide',
      'Perlengkapan Umroh Premium',
      'Asuransi Perjalanan Internasional',
    ],
    excludes: ['Biaya personal', 'Oleh-oleh', 'Tips guide'],
    keberangkatan: 'Sesuai Jadwal',
    maskapai: 'Turkish Airlines',
    hotel: 'Swissotel Istanbul & Fairmont Makkah',
    wa: 'https://wa.me/6281234567890?text=Assalamualaikum,%20saya%20tertarik%20dengan%20Paket%20Umroh%20Plus%20Turki',
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
          <div className="relative h-56 overflow-hidden rounded-t-3xl">
            <img src={paket.image} alt={paket.nama} className="w-full h-full object-cover" />
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
                {Array.from({ length: paket.rating }).map((_, i) => (
                  <Star key={i} size={12} className="text-[#c9a84c] fill-[#c9a84c]" />
                ))}
                <span className="text-white/80 text-xs ml-1">({paket.rating}.0) – Rating Terbaik</span>
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
              <p className="text-gray-600 text-sm leading-relaxed">{paket.deskripsi}</p>
            </div>

            {/* Itinerary */}
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

            {/* Includes / Excludes */}
            <div className="grid sm:grid-cols-2 gap-4">
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

                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: paket.rating }).map((_, i) => (
                    <Star key={i} size={12} className="text-[#c9a84c] fill-[#c9a84c]" />
                  ))}
                  <span className="text-xs text-gray-500 ml-1">({paket.rating}.0)</span>
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
                  {paket.fasilitas.slice(0, 3).map((f, fi) => (
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
      </div>

      {/* Modal */}
      {selectedPaket && (
        <PaketModal paket={selectedPaket} onClose={() => setSelectedPaket(null)} />
      )}
    </section>
  );
}
