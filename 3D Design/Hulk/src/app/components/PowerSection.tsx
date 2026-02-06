import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { Zap, Shield, Target, Cpu } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Explosive Energy',
    description: 'Harness unlimited gamma-powered potential with breakthrough technology that adapts to your needs.',
  },
  {
    icon: Shield,
    title: 'Unbreakable Defense',
    description: 'Military-grade security protocols fortified by quantum encryption and real-time threat detection.',
  },
  {
    icon: Target,
    title: 'Precision Strike',
    description: 'Pinpoint accuracy with AI-driven targeting systems that eliminate errors and maximize efficiency.',
  },
  {
    icon: Cpu,
    title: 'Neural Processing',
    description: 'Advanced neural networks that learn, adapt, and evolve with every interaction.',
  },
];

export function PowerSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8]);

  return (
    <section
      ref={sectionRef}
      id="power"
      className="relative py-32 px-6 overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-black" />
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#39ff14] rounded-full blur-[150px]" />
      </div>

      <motion.div
        style={{ opacity, scale }}
        className="relative z-10 max-w-7xl mx-auto"
      >
        {/* Section header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-2 bg-[#39ff14]/10 border border-[#39ff14]/30 rounded-full mb-6">
              <span className="text-[#39ff14] text-sm uppercase tracking-widest">
                Core Systems
              </span>
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-white mb-6"
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              fontWeight: 900,
              lineHeight: 1,
              letterSpacing: '-0.03em',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              textTransform: 'uppercase',
            }}
          >
            Unstoppable
            <br />
            <span className="bg-gradient-to-r from-[#39ff14] via-[#5fff3d] to-[#39ff14] bg-clip-text text-transparent">
              Technology
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            Built on a foundation of raw power and intelligent design, our systems deliver performance that defies limits.
          </motion.p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.02,
                boxShadow: '0 0 40px rgba(57, 255, 20, 0.2)',
              }}
              className="group relative p-8 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-[#39ff14]/20 hover:border-[#39ff14]/50 transition-all duration-300"
            >
              {/* Corner accent */}
              <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-[#39ff14]/50" />
              <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-[#39ff14]/50" />

              {/* Icon */}
              <div className="relative mb-6">
                <div className="inline-flex p-4 bg-[#39ff14]/10 group-hover:bg-[#39ff14]/20 transition-colors">
                  <feature.icon className="w-8 h-8 text-[#39ff14]" strokeWidth={2.5} />
                </div>
                <div className="absolute inset-0 blur-xl bg-[#39ff14] opacity-0 group-hover:opacity-30 transition-opacity" />
              </div>

              {/* Content */}
              <h3 className="text-white text-2xl mb-4" style={{ fontWeight: 700 }}>
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>

              {/* Hover effect line */}
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-[#39ff14] to-[#5fff3d] group-hover:w-full transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
