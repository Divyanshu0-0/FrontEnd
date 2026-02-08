import { motion } from 'motion/react';
import { Mail, Github, Twitter, Linkedin } from 'lucide-react';

export function ContactSection() {
  return (
    <section
      id="contact"
      className="relative py-32 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-black" />
      
      {/* Radial glow */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[#39ff14] rounded-full blur-[200px]" />
      </div>
      
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}>
          <span className="inline-block px-4 py-2 bg-[#39ff14]/10 border border-[#39ff14]/30 rounded-full mb-8">
            <span className="text-[#39ff14] text-sm uppercase tracking-widest">
              Get In Touch
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
          Ready To
          <br />
          <span className="bg-gradient-to-r from-[#39ff14] via-[#5fff3d] to-[#39ff14] bg-clip-text text-transparent">
            Transform?
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto"
        >
          Join forces with gamma-powered technology. Let's build something unstoppable together.
        </motion.p>

        {/* Contact form */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-xl mx-auto mb-16"
        >
          <div className="space-y-4">
            <input
              type="email"
              placeholder="Your email address"
              className="w-full px-6 py-4 bg-[#1a1a1a] border border-[#39ff14]/30 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#39ff14] transition-colors"
            />
            <textarea
              placeholder="Tell us about your project"
              rows={4}
              className="w-full px-6 py-4 bg-[#1a1a1a] border border-[#39ff14]/30 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#39ff14] transition-colors resize-none"
            />
            <motion.button
              whileHover={{ 
                scale: 1.02,
                boxShadow: '0 0 40px rgba(57, 255, 20, 0.6)',
              }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-8 py-4 bg-[#39ff14] text-black uppercase tracking-wider relative overflow-hidden group"
              style={{ fontWeight: 700 }}
            >
              <span className="relative z-10">Send Message</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#39ff14] to-[#5fff3d]"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
                style={{ opacity: 0.5 }}
              />
            </motion.button>
          </div>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex justify-center gap-6"
        >
          {[
            { icon: Mail, href: '#' },
            { icon: Github, href: '#' },
            { icon: Twitter, href: '#' },
            { icon: Linkedin, href: '#' },
          ].map((social, index) => (
            <motion.a
              key={index}
              href={social.href}
              whileHover={{ 
                scale: 1.2,
                rotate: 5,
              }}
              whileTap={{ scale: 0.9 }}
              className="relative p-4 bg-[#1a1a1a] border border-[#39ff14]/30 hover:border-[#39ff14] transition-colors group"
            >
              <social.icon className="w-6 h-6 text-[#39ff14]" />
              <div className="absolute inset-0 blur-xl bg-[#39ff14] opacity-0 group-hover:opacity-30 transition-opacity" />
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
