import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    name: 'Hj. Siti Rahayu Susanti',
    city: 'Jakarta Selatan',
    year: 'Umroh 2024',
    rating: 5,
    avatar: 'SR',
    photo: '/images/comment/women-1.jpg',
    color: 'from-emerald-500 to-teal-600',
    text: 'Alhamdulillah, perjalanan umroh saya bersama Marco Tour sangat berkesan. Pembimbing kami, Ustaz Hasan, sangat sabar dan kompeten dalam menjelaskan setiap rukun ibadah. Hotel yang disediakan sangat dekat dengan Masjidil Haram. Saya sudah rekomendasikan ke seluruh keluarga.',
  },
  {
    name: 'Bpk. Christiano Ronaldo, S.E.',
    city: 'Surabaya, Jawa Timur',
    year: 'Haji Khusus 2023',
    rating: 5,
    avatar: 'AF',
    photo: '/images/comment/men-1.jpg',
    color: 'from-blue-500 to-indigo-600',
    text: 'Pengalaman haji bersama Marco benar-benar luar biasa. Manasik yang intensif selama 6 bulan membuat kami sangat siap secara mental dan fisik. Akomodasi bintang 5 yang diberikan sangat memudahkan ibadah kami, terutama untuk istri saya yang lansia. Terima kasih Marco!',
  },
  {
    name: 'Ibu Dewi Kartika Sari',
    city: 'Bandung, Jawa Barat',
    year: 'Umroh Ramadhan 2024',
    rating: 5,
    avatar: 'DK',
    photo: '/images/comment/women-2.jpg',
    color: 'from-purple-500 to-pink-600',
    text: 'Subhanallah, umroh di bulan Ramadhan bersama Marco adalah pengalaman spiritual terbaik dalam hidup saya. Bisa shalat tarawih di Masjidil Haram, i\'tikaf 10 malam terakhir, dan sahur buka bersama di hotel bintang 5. Tim Marco sangat responsif dan profesional.',
  },
  {
    name: 'H. Neymar Jr, M.M.',
    city: 'Semarang, Jawa Tengah',
    year: 'Umroh Plus Turki 2023',
    rating: 5,
    avatar: 'BW',
    photo: '/images/comment/men-2.jpg',
    color: 'from-orange-500 to-red-600',
    text: 'Paket Umroh Plus Turki dari Marco adalah nilai terbaik yang pernah saya dapatkan. Mengunjungi Makkah, Madinah, dan Istanbul dalam satu perjalanan. Guide lokal di Turki juga sangat berpengetahuan. Sangat direkomendasikan untuk yang ingin umroh sekaligus wisata halal.',
  },
  {
    name: 'Hj. Nurul Hidayah',
    city: 'Medan, Sumatera Utara',
    year: 'Umroh 2024',
    rating: 5,
    avatar: 'NH',
    photo: '/images/comment/women-3.jpg',
    color: 'from-teal-500 to-cyan-600',
    text: 'Ini adalah kali ketiga saya berangkat umroh bersama Marco Tour. Setiap tahun kualitasnya semakin baik. Pelayanan dari awal pendaftaran, manasik, hingga kepulangan sangat teratur dan profesional. Tim customer service selalu siap 24 jam. Marco memang pilihan terbaik!',
  },
  {
    name: 'Bpk. Rizky Pratama, S.T.',
    city: 'Yogyakarta, DIY',
    year: 'Umroh 2025',
    rating: 5,
    avatar: 'RP',
    photo: '/images/comment/men-3.jpg',
    color: 'from-green-500 to-emerald-600',
    text: 'Sebagai first timer umroh, saya sangat terbantu dengan bimbingan tim Marco. Dari pengurusan dokumen, persiapan perlengkapan, hingga panduan ibadah di tanah suci, semua dijelaskan dengan sangat baik. Hotel kami hanya 5 menit jalan kaki dari Masjidil Haram. Luar biasa!',
  },
];

export default function TestimoniSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const goTo = (idx: number) => {
    setDirection(idx > current ? 1 : -1);
    setCurrent(idx);
  };

  const prev = () => goTo(current === 0 ? testimonials.length - 1 : current - 1);
  const next = () => goTo(current === testimonials.length - 1 ? 0 : current + 1);

  useEffect(() => {
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [current]);

  const visible = [
    (current - 1 + testimonials.length) % testimonials.length,
    current,
    (current + 1) % testimonials.length,
  ];

  return (
    <section id="testimoni" ref={ref} className="py-24 bg-gradient-to-br from-[#0d3321] to-[#1a5c3a] overflow-hidden">
      {/* Decorative */}
      <div className="absolute inset-0 arabesque-pattern opacity-10 pointer-events-none" />

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
            <span className="text-[#c9a84c] text-sm font-semibold tracking-widest uppercase">Testimoni Jamaah</span>
            <div className="h-px w-12 bg-[#c9a84c]" />
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Kata Mereka Tentang Marco
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Lebih dari 10.000 jamaah telah mempercayakan perjalanan ibadah mereka kepada kami
          </p>
        </motion.div>

        {/* Desktop: 3 cards visible */}
        <div className="hidden md:block">
          <div className="grid grid-cols-3 gap-6">
            {visible.map((idx, pos) => {
              const t = testimonials[idx];
              const isCenter = pos === 1;
              return (
                <motion.div
                  key={idx}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isCenter ? 1 : 0.6, y: 0, scale: isCenter ? 1 : 0.97 }}
                  transition={{ duration: 0.4 }}
                  className={`bg-white rounded-2xl p-7 cursor-pointer transition-all duration-300 ${isCenter ? 'shadow-2xl shadow-black/30' : 'shadow-lg'}`}
                  onClick={() => goTo(idx)}
                >
                  <Quote size={32} className="text-[#c9a84c] mb-4" />
                  <p className="text-gray-700 leading-relaxed text-sm mb-6 line-clamp-4">{t.text}</p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-[#c9a84c]/40">
                      <img
                        src={t.photo}
                        alt={t.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const el = e.currentTarget;
                          el.style.display = 'none';
                          el.parentElement!.classList.add(`bg-gradient-to-br`, ...t.color.split(' '));
                          el.parentElement!.innerHTML = `<span class="text-white font-bold text-sm flex items-center justify-center w-full h-full">${t.avatar}</span>`;
                        }}
                      />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{t.name}</p>
                      <p className="text-gray-500 text-xs">{t.city} • {t.year}</p>
                    </div>
                    <div className="ml-auto flex">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} size={13} className="text-[#c9a84c] fill-[#c9a84c]" />
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-10">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`rounded-full transition-all duration-300 ${i === current ? 'w-6 h-2 bg-[#c9a84c]' : 'w-2 h-2 bg-white/30 hover:bg-white/50'}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Mobile: single card */}
        <div className="md:hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              initial={{ opacity: 0, x: direction * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -direction * 60 }}
              transition={{ duration: 0.35 }}
              className="bg-white rounded-2xl p-6"
            >
              {(() => {
                const t = testimonials[current];
                return (
                  <>
                    <Quote size={28} className="text-[#c9a84c] mb-3" />
                    <p className="text-gray-700 leading-relaxed text-sm mb-5">{t.text}</p>
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-[#c9a84c]/40">
                        <img
                          src={t.photo}
                          alt={t.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const el = e.currentTarget;
                            el.style.display = 'none';
                            el.parentElement!.classList.add(`bg-gradient-to-br`, ...t.color.split(' '));
                            el.parentElement!.innerHTML = `<span class="text-white font-bold text-sm flex items-center justify-center w-full h-full">${t.avatar}</span>`;
                          }}
                        />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 text-sm">{t.name}</p>
                        <p className="text-gray-500 text-xs">{t.city} • {t.year}</p>
                      </div>
                    </div>
                  </>
                );
              })()}
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-center gap-3 mt-6">
            <button onClick={prev} className="w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center">
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => goTo(i)} className={`rounded-full transition-all duration-300 ${i === current ? 'w-6 h-2 bg-[#c9a84c]' : 'w-2 h-2 bg-white/30'}`} />
              ))}
            </div>
            <button onClick={next} className="w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
