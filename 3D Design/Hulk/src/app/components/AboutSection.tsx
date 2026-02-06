import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { Activity, Sparkles, TrendingUp } from 'lucide-react';

export function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-32 px-6 overflow-hidden"
    >
      {/* Background with fracture effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0d1a0d] to-black" />
      
      {/* Animated crack lines */}
      <svg 
        className="absolute inset-0 w-full h-full opacity-30"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="crackGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#39ff14" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#39ff14" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          d="M 0,300 Q 200,250 400,300 T 800,300 L 800,301 Q 600,310 400,301 T 0,301 Z"
          fill="url(#crackGradient)"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.3 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: 'easeInOut' }}
        />
        <motion.path
          d="M 200,100 L 250,400 M 600,150 L 550,450 M 400,50 L 420,500"
          stroke="rgba(57, 255, 20, 0.3)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.3 }}
        />
      </svg>

      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 max-w-7xl mx-auto"
      >
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-4 py-2 bg-[#39ff14]/10 border border-[#39ff14]/30 rounded-full mb-6">
                <span className="text-[#39ff14] text-sm uppercase tracking-widest">
                  About the Power
                </span>
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-white mb-6"
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                fontWeight: 900,
                lineHeight: 1,
                letterSpacing: '-0.03em',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                textTransform: 'uppercase',
              }}
            >
              Where
              <br />
              <span className="bg-gradient-to-r from-[#39ff14] via-[#5fff3d] to-[#39ff14] bg-clip-text text-transparent">
                Force
              </span>
              <br />
              Meets Mind
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-gray-400 text-lg leading-relaxed mb-8"
            >
              Born from gamma radiation and driven by unstoppable determination, our technology
              represents the perfect fusion of raw power and controlled intelligence. Every line
              of code, every algorithm, every system is built to push beyond conventional limits.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-4"
            >
              {[
                { icon: Activity, text: 'Real-time adaptive systems' },
                { icon: Sparkles, text: 'Self-optimizing performance' },
                { icon: TrendingUp, text: 'Exponential scalability' },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-4 group"
                >
                  <div className="p-3 bg-[#39ff14]/10 border border-[#39ff14]/30 group-hover:bg-[#39ff14]/20 transition-colors">
                    <item.icon className="w-5 h-5 text-[#39ff14]" />
                  </div>
                  <span className="text-gray-300 group-hover:text-[#39ff14] transition-colors">
                    {item.text}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right content - Energy visualization */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-square">
              {/* Pulsing rings */}
              {[0, 1, 2].map((index) => (
                <motion.div
                  key={index}
                  className="absolute inset-0 border-2 border-[#39ff14] rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.2, 0.5],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.8,
                    ease: 'easeInOut',
                  }}
                />
              ))}

              {/* Center glow */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="w-32 h-32 bg-[#39ff14] rounded-full blur-3xl"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              </div>

              {/* Rotating particles */}
              {[...Array(8)].map((_, index) => (
                <motion.div
                  key={index}
                  className="absolute top-1/2 left-1/2 w-3 h-3 bg-[#39ff14] rounded-full"
                  style={{
                    x: '-50%',
                    y: '-50%',
                  }}
                  animate={{
                    rotate: 360,
                    x: [
                      '-50%',
                      `calc(-50% + ${Math.cos((index * Math.PI * 2) / 8) * 150}px)`,
                    ],
                    y: [
                      '-50%',
                      `calc(-50% + ${Math.sin((index * Math.PI * 2) / 8) * 150}px)`,
                    ],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: index * 0.2,
                    ease: 'linear',
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
