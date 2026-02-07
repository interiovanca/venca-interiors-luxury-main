import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import aboutVideo from '@/assets/videos/about-video.mp4';

const VideoSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.5, 1, 1, 0.5]);

  return (
    <section ref={containerRef} className="relative h-[80vh] overflow-hidden">
      {/* Background Video with Parallax */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0"
      >
        <video 
          src={aboutVideo}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover scale-110"
        />
        <div className="absolute inset-0 bg-black/50 dark:bg-background/60" />
      </motion.div>

      {/* Content */}
      <motion.div 
        style={{ opacity }}
        className="relative z-10 h-full flex items-center justify-center"
      >
        <div className="text-center max-w-3xl mx-auto px-6">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-champagne text-sm tracking-[0.4em] uppercase font-body"
          >
            Our Philosophy
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl text-white mt-6 tracking-wide leading-tight"
          >
            Know More About
            <br />
            <span className="text-gradient-gold">Our Vision</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white/70 mt-8 text-base md:text-lg leading-relaxed font-body"
          >
            Where artisanal craftsmanship meets contemporary design, 
            creating spaces that transcend the ordinary.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12"
          >
            <Link 
              to="/about" 
              className="group inline-flex items-center gap-4 px-8 py-4 border border-champagne/40 hover:border-champagne hover:bg-champagne/10 transition-all duration-500"
            >
              <span className="text-champagne tracking-[0.2em] uppercase text-sm font-body">Discover</span>
              <ArrowRight className="w-4 h-4 text-champagne group-hover:translate-x-2 transition-transform duration-300" />
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default VideoSection;
