import { motion } from 'motion/react';
import { Zap } from 'lucide-react';

export function NavigationBar() {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-40 px-6 py-4"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <motion.div 
          className="flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
        >
          <div className="relative">
            <Zap className="w-8 h-8 text-[#39ff14]" fill="#39ff14" />
            <div className="absolute inset-0 blur-xl bg-[#39ff14] opacity-50" />
          </div>
          <span className="text-2xl tracking-tight text-white uppercase" style={{ 
            fontFamily: 'system-ui, -apple-system, sans-serif',
            fontWeight: 900,
            letterSpacing: '-0.02em'
          }}>
            GAMMA
          </span>
        </motion.div>

        <div className="flex items-center gap-8">
          {['About', 'Power', 'Tech', 'Contact'].map((item, index) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm uppercase tracking-wider text-gray-400 hover:text-[#39ff14] transition-colors relative group"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
              whileHover={{ scale: 1.05 }}
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#39ff14] group-hover:w-full transition-all duration-300" />
            </motion.a>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}
