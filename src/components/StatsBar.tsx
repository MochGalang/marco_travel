import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, Users, Shield, Star } from 'lucide-react';

interface StatItem {
  icon: React.ReactNode;
  value: number;
  suffix: string;
  label: string;
  prefix?: string;
}

const stats: StatItem[] = [
  {
    icon: <Award size={28} className="text-[#c9a84c]" />,
    value: 22,
    suffix: '+',
    label: 'Tahun Pengalaman',
  },
  {
    icon: <Users size={28} className="text-[#c9a84c]" />,
    value: 10000,
    suffix: '+',
    label: 'Jamaah Diberangkatkan',
  },
  {
    icon: <Shield size={28} className="text-[#c9a84c]" />,
    value: 100,
    suffix: '%',
    label: 'Legal Kemenag RI',
  },
  {
    icon: <Star size={28} className="text-[#c9a84c]" />,
    value: 5,
    suffix: '★',
    label: 'Rating Kepuasan Jamaah',
  },
];

function AnimatedCounter({ value, suffix, prefix, started }: { value: number; suffix: string; prefix?: string; started: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const duration = 2000;
    const step = 16;
    const increment = value / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, step);
    return () => clearInterval(timer);
  }, [started, value]);

  return (
    <span>
      {prefix}{count.toLocaleString('id-ID')}{suffix}
    </span>
  );
}

export default function StatsBar() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section ref={ref} className="relative z-10 bg-gradient-to-r from-[#0d3321] to-[#1a5c3a] py-14">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#c9a84c] via-yellow-300 to-[#c9a84c]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="flex flex-col items-center text-center group"
            >
              {/* Separator line (except first) */}
              {i > 0 && (
                <div className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 h-12 w-px bg-white/10" />
              )}

              <div className="mb-3 p-3 bg-white/5 rounded-2xl group-hover:bg-white/10 transition-colors duration-300">
                {stat.icon}
              </div>

              <div
                className="text-3xl sm:text-4xl font-bold text-white mb-1 font-playfair"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  prefix={stat.prefix}
                  started={isInView}
                />
              </div>

              <p className="text-white/70 text-sm font-medium font-inter">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
