import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { Code2, Layers, Wifi, Lock } from 'lucide-react';

const techStack = [
  { icon: Code2, name: 'Neural Core', detail: 'Advanced AI processing' },
  { icon: Layers, name: 'Quantum Stack', detail: 'Multi-layer architecture' },
  { icon: Wifi, name: 'Gamma Network', detail: 'Real-time synchronization' },
  { icon: Lock, name: 'Fortress Security', detail: 'Zero-trust encryption' },
];

export function TechSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const textOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={sectionRef}
      id="tech"
      className="relative py-32 px-6 overflow-hidden"
    >
      {/* Animated background */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 bg-gradient-to-b from-black via-[#0a150a] to-black"
      />

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(57, 255, 20, 0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(57, 255, 20, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <motion.div
        style={{ opacity: textOpacity }}
        className="relative z-10 max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block px-4 py-2 bg-[#39ff14]/10 border border-[#39ff14]/30 rounded-full mb-6"
          >
            <span className="text-[#39ff14] text-sm uppercase tracking-widest">
              Technology Stack
            </span>
          </motion.span>

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
            Built For
            <br />
            <span className="bg-gradient-to-r from-[#39ff14] via-[#5fff3d] to-[#39ff14] bg-clip-text text-transparent">
              Dominance
            </span>
          </motion.h2>
        </div>

        {/* Tech stack grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {techStack.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 50, rotateX: 45 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.1,
                type: 'spring',
                stiffness: 100,
              }}
              whileHover={{ 
                scale: 1.05,
                rotateY: 5,
                transition: { duration: 0.3 }
              }}
              className="relative group"
              style={{ perspective: '1000px' }}
            >
              <div className="relative p-8 bg-gradient-to-br from-[#1a1a1a] via-[#0f1a0f] to-[#0a0a0a] border border-[#39ff14]/30 hover:border-[#39ff14]/60 transition-all duration-300">
                {/* Corner decorations */}
                <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-[#39ff14]" />
                <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-[#39ff14]" />

                {/* Icon container */}
                <div className="relative mb-6">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex p-4 bg-[#39ff14]/10 border border-[#39ff14]/30"
                  >
                    <tech.icon className="w-10 h-10 text-[#39ff14]" strokeWidth={2} />
                  </motion.div>
                  
                  {/* Glow effect */}
                  <div className="absolute inset-0 blur-xl bg-[#39ff14] opacity-0 group-hover:opacity-40 transition-opacity" />
                </div>

                {/* Content */}
                <h3 className="text-white text-xl mb-2" style={{ fontWeight: 700 }}>
                  {tech.name}
                </h3>
                <p className="text-gray-400 text-sm">
                  {tech.detail}
                </p>

                {/* Animated line */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
                  className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#39ff14] to-transparent origin-left"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-20"
        >
          <motion.button
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 0 40px rgba(57, 255, 20, 0.6)',
            }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-5 bg-gradient-to-r from-[#39ff14] to-[#5fff3d] text-black uppercase tracking-wider relative overflow-hidden group"
            style={{ fontWeight: 700 }}
          >
            <span className="relative z-10">Explore Technology</span>
            <motion.div
              className="absolute inset-0 bg-white"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.6 }}
              style={{ opacity: 0.2 }}
            />
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}
