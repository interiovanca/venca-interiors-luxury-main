import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect, useCallback } from 'react';
import heroVideo1 from '@/assets/videos/hero-video-1.mp4';
import heroInterior from '@/assets/hero-interior.jpg';
import categorySofas from '@/assets/category-sofas.jpg';
import categoryChairs from '@/assets/category-chairs.jpg';
import categoryTables from '@/assets/category-tables.jpg';
import categoryLamps from '@/assets/category-lamps.jpg';

type Slide = {
  type: 'video' | 'image';
  src: string;
  title: string;
};

const slides: Slide[] = [
  { type: 'video', src: heroVideo1, title: 'Living Spaces' },
  { type: 'image', src: heroInterior, title: 'Modern Elegance' },
  { type: 'image', src: categorySofas, title: 'Sofa Collections' },
  { type: 'image', src: categoryChairs, title: 'Designer Chairs' },
  { type: 'image', src: categoryTables, title: 'Luxury Tables' },
  { type: 'image', src: categoryLamps, title: 'Ambient Lighting' },
];

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);
  const textY = useTransform(scrollYProgress, [0, 0.3], ['0%', '-100%']);
  const textOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const currentSlide = slides[currentIndex];

  return (
    <div 
      ref={containerRef} 
      className="relative h-screen overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Slides with Parallax */}
      <motion.div 
        style={{ y, scale }}
        className="absolute inset-0"
      >
        {/* Soft dark gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50 z-10" />
        
        <AnimatePresence mode="wait">
          {currentSlide.type === 'video' ? (
            <motion.video
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              src={currentSlide.src}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover absolute inset-0"
            />
          ) : (
            <motion.img
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              src={currentSlide.src}
              alt={currentSlide.title}
              className="w-full h-full object-cover absolute inset-0"
            />
          )}
        </AnimatePresence>
      </motion.div>

      {/* Hero Content - Centered and fixed position */}
      <motion.div 
        style={{ opacity }}
        className="relative z-20 h-full flex flex-col items-center justify-center"
      >
        <motion.div
          style={{ y: textY, opacity: textOpacity }}
          className="text-center"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-champagne/80 tracking-[0.4em] text-sm md:text-base mb-6 font-body uppercase"
          >
            Luxury Interior Design
          </motion.p>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="font-brand text-3xl md:text-5xl lg:text-6xl text-white tracking-[0.25em] font-normal uppercase"
          >
            Vanca Interio
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.8 }}
            className="w-24 h-[1px] bg-gradient-to-r from-transparent via-champagne to-transparent mx-auto mt-8"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="text-white/70 mt-8 text-sm md:text-base tracking-wider max-w-md mx-auto font-body"
          >
            Curating exceptional spaces with timeless elegance
          </motion.p>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-white/40 text-xs tracking-[0.3em] uppercase font-body">Scroll</span>
            <div className="w-[1px] h-8 bg-gradient-to-b from-champagne/50 to-transparent" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Slide Counter Navigation - Bottom Left, Minimal */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-6 left-6 md:bottom-8 md:left-8 z-30"
      >
        <div className="flex items-center gap-3">
          <button
            onClick={prevSlide}
            className="text-white/70 hover:text-white transition-colors duration-300 text-sm font-light"
            aria-label="Previous slide"
          >
            ←
          </button>
          
          <span className="text-white/80 font-body text-sm font-light tracking-wide">
            {currentIndex + 1} / {slides.length}
          </span>
          
          <button
            onClick={nextSlide}
            className="text-white/70 hover:text-white transition-colors duration-300 text-sm font-light"
            aria-label="Next slide"
          >
            →
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroSection;
