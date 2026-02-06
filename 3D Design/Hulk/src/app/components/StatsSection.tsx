import { motion, useScroll, useTransform } from 'motion/react';
import { useRef, useEffect, useState } from 'react';

const stats = [
  { value: 99.9, suffix: '%', label: 'Uptime Guarantee' },
  { value: 10, suffix: 'M+', label: 'Transactions/sec' },
  { value: 500, suffix: 'TB', label: 'Data Processed' },
  { value: 150, suffix: 'K+', label: 'Active Users' },
];

export function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 px-6 overflow-hidden"
    >
      {/* Animated background */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0 bg-gradient-to-b from-black via-[#0f1a0f] to-black"
      />
      
      {/* Fracture effect overlay */}
      <div className="absolute inset-0 opacity-30">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="fracture" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path
                d="M10,50 L30,20 L50,40 L70,10 L90,30"
                stroke="rgba(57, 255, 20, 0.1)"
                strokeWidth="2"
                fill="none"
              />
              <path
                d="M20,80 L40,60 L60,70 L80,50"
                stroke="rgba(57, 255, 20, 0.1)"
                strokeWidth="2"
                fill="none"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#fracture)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <StatCounter
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface StatCounterProps {
  value: number;
  suffix: string;
  label: string;
  delay: number;
}

function StatCounter({ value, suffix, label, delay }: StatCounterProps) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          
          const duration = 2000;
          const steps = 60;
          const increment = value / steps;
          let current = 0;
          
          const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
              setCount(value);
              clearInterval(timer);
            } else {
              setCount(current);
            }
          }, duration / steps);

          return () => clearInterval(timer);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [value, hasAnimated]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay }}
      className="text-center group"
    >
      <div className="relative mb-4">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="inline-block"
        >
          <div className="text-white" style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 900,
            lineHeight: 1,
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}>
            <span className="bg-gradient-to-r from-[#39ff14] via-[#5fff3d] to-[#39ff14] bg-clip-text text-transparent">
              {typeof count === 'number' && count % 1 !== 0 
                ? count.toFixed(1) 
                : Math.floor(count)}
            </span>
            <span className="text-[#39ff14]">{suffix}</span>
          </div>
        </motion.div>
        
        {/* Glow effect */}
        <div className="absolute inset-0 blur-2xl bg-[#39ff14] opacity-0 group-hover:opacity-20 transition-opacity pointer-events-none" />
      </div>

      <p className="text-gray-400 uppercase tracking-widest text-sm">
        {label}
      </p>

      {/* Underline animation */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: delay + 0.2 }}
        className="w-16 h-1 bg-gradient-to-r from-[#39ff14] to-[#5fff3d] mx-auto mt-4"
      />
    </motion.div>
  );
}
