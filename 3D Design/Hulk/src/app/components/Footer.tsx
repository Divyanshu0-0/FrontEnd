import { motion } from 'motion/react';
import { Zap } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative py-12 px-6 border-t border-[#39ff14]/20">
      {/* Background */}
      <div className="absolute inset-0 bg-black" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo */}
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

          {/* Copyright */}
          <p className="text-gray-400 text-sm">
            © 2026 Gamma Tech. Powered by unstoppable force.
          </p>

          {/* Links */}
          <div className="flex gap-6">
            {['Privacy', 'Terms', 'Contact'].map((link) => (
              <motion.a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-sm text-gray-400 hover:text-[#39ff14] transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                {link}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
