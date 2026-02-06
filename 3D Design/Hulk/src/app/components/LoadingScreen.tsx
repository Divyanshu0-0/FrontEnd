import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { Zap } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 2500;
    const steps = 100;
    const interval = duration / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += 1;
      setProgress(current);

      if (current >= 100) {
        clearInterval(timer);
        setTimeout(onComplete, 500);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
      >
        {/* Radial glow background */}
        <div className="absolute inset-0 bg-gradient-radial from-[#39ff14]/20 via-black to-black" />
        
        {/* Content */}
        <div className="relative z-10 text-center">
          {/* Logo with pulse effect */}
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="mb-8"
          >
            <div className="relative inline-flex">
              <Zap className="w-20 h-20 text-[#39ff14]" fill="#39ff14" strokeWidth={1.5} />
              <div className="absolute inset-0 blur-3xl bg-[#39ff14] opacity-60" />
            </div>
          </motion.div>

          {/* Brand name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl mb-12 text-white uppercase tracking-tight"
            style={{
              fontFamily: 'system-ui, -apple-system, sans-serif',
              fontWeight: 900,
              letterSpacing: '-0.02em',
            }}
          >
            <span className="bg-gradient-to-r from-[#39ff14] via-[#5fff3d] to-[#39ff14] bg-clip-text text-transparent">
              GAMMA
            </span>
          </motion.h1>

          {/* Progress bar */}
          <div className="w-64 md:w-96 mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {/* Bar background */}
              <div className="h-1 bg-[#1a1a1a] border border-[#39ff14]/30 mb-4">
                {/* Progress fill */}
                <motion.div
                  className="h-full bg-gradient-to-r from-[#39ff14] to-[#5fff3d] relative"
                  style={{ width: `${progress}%` }}
                >
                  {/* Glow effect */}
                  <div className="absolute inset-0 blur-md bg-[#39ff14]" />
                </motion.div>
              </div>

              {/* Percentage */}
              <motion.div
                className="text-[#39ff14] text-sm uppercase tracking-widest"
                key={progress}
                initial={{ opacity: 0.5 }}
                animate={{ opacity: 1 }}
              >
                {progress}%
              </motion.div>
            </motion.div>
          </div>

          {/* Loading text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-gray-500 text-sm uppercase tracking-widest mt-8"
          >
            Initializing Power Systems...
          </motion.p>
        </div>

        {/* Particle effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-[#39ff14] rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
