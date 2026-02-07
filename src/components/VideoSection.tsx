import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import aboutImage from "@/assets/videos/ankit.png"; // image now

const ImageSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.8, 1, 1, 0.8]
  );

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden"
    >
      {/* 🖼️ FULL SCREEN IMAGE */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 w-full h-full"
      >
        <img
          src={aboutImage}
          alt="Vanca Interio Philosophy"
          className="w-full h-full object-cover scale-105"
        />

        {/* 🎬 CINEMATIC DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/40" />
      </motion.div>

      {/* 📝 CONTENT */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 h-full flex items-center justify-center"
      >
        <div className="text-center max-w-3xl mx-auto px-6">
          <span className="text-champagne text-sm tracking-[0.4em] uppercase font-body">
            Our Philosophy
          </span>

          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white mt-6 leading-tight">
            Know More About
            <br />
            <span className="text-gradient-gold">Our Vision</span>
          </h2>

          <p className="text-white/90 mt-8 text-base md:text-lg leading-relaxed font-body">
            Where artisanal craftsmanship meets contemporary design,
            creating spaces that transcend the ordinary.
          </p>

          <div className="mt-12">
            <Link
              to="/about"
              className="group inline-flex items-center gap-4 px-10 py-4 border border-champagne/60 hover:border-champagne hover:bg-champagne/10 transition-all duration-500"
            >
              <span className="text-champagne tracking-[0.25em] uppercase text-sm font-body">
                Discover
              </span>
              <ArrowRight className="w-4 h-4 text-champagne group-hover:translate-x-2 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ImageSection;
