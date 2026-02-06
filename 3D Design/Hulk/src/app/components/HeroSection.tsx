import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/50 to-black pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="mb-6"
        >
          <div className="inline-block px-4 py-2 bg-[#39ff14]/10 border border-[#39ff14]/30 rounded-full mb-8">
            <span className="text-[#39ff14] text-sm uppercase tracking-widest">
              Unleash the Power Within
            </span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6 text-white"
          style={{
            fontSize: 'clamp(3rem, 10vw, 8rem)',
            fontWeight: 900,
            lineHeight: 0.9,
            letterSpacing: '-0.04em',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            textTransform: 'uppercase',
          }}
        >
          <span className="block">Raw</span>
          <span className="block bg-gradient-to-r from-[#39ff14] via-[#5fff3d] to-[#39ff14] bg-clip-text text-transparent">
            Strength
          </span>
          <span className="block">Unleashed</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Experience unstoppable force powered by gamma energy. Where raw power meets controlled intelligence.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(57, 255, 20, 0.5)' }}
            whileTap={{ scale: 0.95 }}
            className="relative px-8 py-4 bg-[#39ff14] text-black uppercase tracking-wider overflow-hidden group"
            style={{ fontWeight: 700 }}
          >
            <span className="relative z-10">Enter the Arena</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#39ff14] to-[#5fff3d] opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 border-2 border-[#39ff14]/50 text-[#39ff14] uppercase tracking-wider hover:bg-[#39ff14]/10 transition-colors"
            style={{ fontWeight: 700 }}
          >
            Discover More
          </motion.button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-[#39ff14] text-xs uppercase tracking-widest">Scroll</span>
            <ChevronDown className="w-6 h-6 text-[#39ff14]" />
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}
