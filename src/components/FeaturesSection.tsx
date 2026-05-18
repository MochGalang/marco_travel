import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Shield, BookOpen, Hotel, Clock, DollarSign, Heart } from 'lucide-react';

const features = [
  {
    icon: <Shield size={28} className="text-[#1a5c3a]" />,
    title: 'Berizin Resmi Kemenag',
    desc: 'Terdaftar dan berizin resmi di Kementerian Agama RI. Perjalanan Anda aman dan terjamin secara hukum.',
  },
  {
    icon: <BookOpen size={28} className="text-[#1a5c3a]" />,
    title: 'Pembimbing Berpengalaman',
    desc: 'Tim pembimbing ibadah bersertifikat dengan pengalaman lebih dari 10 tahun mendampingi jamaah.',
  },
  {
    icon: <Hotel size={28} className="text-[#1a5c3a]" />,
    title: 'Akomodasi Bintang 5',
    desc: 'Hotel premium dengan jarak walking distance ke Masjidil Haram dan Masjid Nabawi.',
  },
  {
    icon: <Clock size={28} className="text-[#1a5c3a]" />,
    title: 'Pelayanan 24 Jam',
    desc: 'Tim customer service siap membantu selama 24 jam sehari, 7 hari seminggu selama perjalanan.',
  },
  {
    icon: <DollarSign size={28} className="text-[#1a5c3a]" />,
    title: 'Harga Transparan',
    desc: 'Tidak ada biaya tersembunyi. Semua komponen biaya dijelaskan secara lengkap dan transparan.',
  },
  {
    icon: <Heart size={28} className="text-[#1a5c3a]" />,
    title: 'Komunitas Alumni Aktif',
    desc: 'Bergabunglah dengan komunitas alumni Marco yang aktif untuk berbagi pengalaman dan inspirasi ibadah.',
  },
];

export default function FeaturesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="tentang" ref={ref} className="py-24 bg-white">
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
            <span className="text-[#c9a84c] text-sm font-semibold tracking-widest uppercase">Keunggulan Kami</span>
            <div className="h-px w-12 bg-[#c9a84c]" />
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1a5c3a] mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Mengapa Memilih Marco?
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Kami berkomitmen untuk memberikan pengalaman ibadah haji dan umroh terbaik yang tak terlupakan
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group p-8 rounded-2xl border border-gray-100 hover:border-[#1a5c3a]/20 hover:bg-emerald-50/50 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-900/5 hover:-translate-y-1"
            >
              <div className="w-14 h-14 bg-emerald-50 group-hover:bg-[#1a5c3a]/10 rounded-2xl flex items-center justify-center mb-5 transition-colors duration-300">
                {feat.icon}
              </div>
              <h3
                className="text-xl font-bold text-gray-900 mb-3"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {feat.title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm">{feat.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-6 bg-gradient-to-r from-[#0d3321] to-[#1a5c3a] text-white px-8 py-5 rounded-2xl">
            <div className="text-left">
              <p className="text-sm text-white/70">No. Izin Kemenag RI</p>
              <p className="font-bold text-[#c9a84c]">PHU.HK.07/2/1/3156/2003</p>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <div className="text-left">
              <p className="text-sm text-white/70">IATA Akreditasi</p>
              <p className="font-bold text-[#c9a84c]">PT. Marco Tour & Travel</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
