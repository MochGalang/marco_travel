import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FileText, CreditCard, BookOpen, Plane, Home } from 'lucide-react';

const milestones = [
  {
    icon: <FileText size={22} />,
    phase: 'Pendaftaran',
    date: 'Jan – Mar 2026',
    desc: 'Buka pendaftaran resmi haji khusus 2026. Segera daftarkan diri Anda sebelum kuota penuh.',
    color: 'from-blue-500 to-blue-600',
    status: 'open',
  },
  {
    icon: <CreditCard size={22} />,
    phase: 'Pelunasan',
    date: 'Apr – Mei 2026',
    desc: 'Pelunasan biaya perjalanan haji. Tersedia cicilan tanpa bunga hingga 12 bulan.',
    color: 'from-[#c9a84c] to-yellow-500',
    status: 'upcoming',
  },
  {
    icon: <BookOpen size={22} />,
    phase: 'Manasik',
    date: 'Jun 2026',
    desc: 'Pelatihan manasik haji intensif selama 4 minggu bersama pembimbing bersertifikat.',
    color: 'from-purple-500 to-purple-600',
    status: 'upcoming',
  },
  {
    icon: <Plane size={22} />,
    phase: 'Keberangkatan',
    date: '15 Jun 2026',
    desc: 'Keberangkatan menuju Madinah Al-Munawarah untuk arbain sebelum ke Makkah Al-Mukarramah.',
    color: 'from-[#1a5c3a] to-[#2d7a50]',
    status: 'upcoming',
  },
  {
    icon: <Home size={22} />,
    phase: 'Kepulangan',
    date: '25 Jul 2026',
    desc: 'Kepulangan ke tanah air sebagai haji mabrur. Penjemputan resmi di bandara asal.',
    color: 'from-rose-500 to-red-600',
    status: 'upcoming',
  },
];

export default function TimelineSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="py-24 bg-gray-50 overflow-hidden">
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
            <span className="text-[#c9a84c] text-sm font-semibold tracking-widest uppercase">Jadwal Haji 2026</span>
            <div className="h-px w-12 bg-[#c9a84c]" />
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1a5c3a] mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Timeline Haji Khusus 2026
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Ikuti setiap tahapan perjalanan haji Anda dengan panduan lengkap dari tim Marco
          </p>
        </motion.div>

        {/* Desktop Timeline */}
        <div className="hidden lg:block">
          {/* Horizontal line */}
          <div className="relative">
            <div className="absolute top-12 left-0 right-0 h-0.5 bg-gray-200">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 1.5, delay: 0.3, ease: 'easeInOut' }}
                className="h-full bg-gradient-to-r from-[#1a5c3a] to-[#c9a84c] origin-left"
              />
            </div>

            <div className="grid grid-cols-5 gap-4">
              {milestones.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
                  className="flex flex-col items-center"
                >
                  {/* Icon Circle */}
                  <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${item.color} text-white flex items-center justify-center shadow-lg mb-6 relative z-10`}>
                    {item.icon}
                    {item.status === 'open' && (
                      <span className="absolute -top-2 -right-2 bg-green-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                        BUKA
                      </span>
                    )}
                  </div>

                  <div className="text-center">
                    <h3
                      className="font-bold text-gray-900 text-base mb-1"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {item.phase}
                    </h3>
                    <p className="text-[#c9a84c] text-sm font-semibold mb-2">{item.date}</p>
                    <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Timeline */}
        <div className="lg:hidden relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200">
            <motion.div
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : {}}
              transition={{ duration: 1.5, delay: 0.3, ease: 'easeInOut' }}
              className="w-full h-full bg-gradient-to-b from-[#1a5c3a] to-[#c9a84c] origin-top"
            />
          </div>

          <div className="space-y-8">
            {milestones.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.12 }}
                className="flex gap-6 items-start"
              >
                <div className={`flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br ${item.color} text-white flex items-center justify-center shadow-lg relative z-10`}>
                  {item.icon}
                  {item.status === 'open' && (
                    <span className="absolute -top-2 -right-2 bg-green-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                      BUKA
                    </span>
                  )}
                </div>
                <div className="flex-1 pt-1">
                  <h3
                    className="font-bold text-gray-900 text-lg mb-1"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {item.phase}
                  </h3>
                  <p className="text-[#c9a84c] text-sm font-semibold mb-2">{item.date}</p>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
