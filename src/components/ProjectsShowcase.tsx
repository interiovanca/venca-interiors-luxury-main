import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const projects = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80',
    title: 'Modern Living Space',
    location: 'Dubai, UAE',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80',
    title: 'Minimalist Villa',
    location: 'Tokyo, Japan',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80',
    title: 'Luxury Penthouse',
    location: 'New York, USA',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
    title: 'Contemporary Home',
    location: 'London, UK',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=1200&q=80',
    title: 'Coastal Retreat',
    location: 'Sydney, Australia',
  },
];

const ProjectsShowcase = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  }, []);

  const getSlideIndex = (offset: number) =>
    (currentIndex + offset + projects.length) % projects.length;

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.9,
    }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
      scale: 0.9,
    }),
  };

  return (
    <section
      className="
        py-20 md:py-32
        bg-[#F7F2E8] dark:bg-[#080808]
        transition-colors duration-300
        overflow-hidden
      "
    >
      <div className="container mx-auto px-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-12 md:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl md:text-4xl lg:text-5xl tracking-wider uppercase
                       text-black dark:text-white"
          >
            Projects
          </motion.h2>

          <Link
            to="/about"
            className="text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white
                       text-sm tracking-wider underline underline-offset-4 transition-colors"
          >
            View all projects
          </Link>
        </div>
      </div>

      {/* Carousel */}
      <div className="relative px-4 md:px-8">

        <div className="hidden sm:flex items-center justify-center gap-6">

          {/* Left */}
          <motion.div
            key={`left-${getSlideIndex(-1)}`}
            initial={{ opacity: 0, x: -50, scale: 0.8 }}
            animate={{ opacity: 0.5, x: 0, scale: 0.85 }}
            className="w-56 aspect-[3/4] cursor-pointer"
            onClick={prevSlide}
          >
            <img
              src={projects[getSlideIndex(-1)].image}
              className="w-full h-full object-cover rounded-md"
            />
          </motion.div>

          {/* Center */}
          <div className="relative w-[45vw] max-w-3xl aspect-[4/3]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0 rounded-md overflow-hidden shadow-2xl"
              >
                <img
                  src={projects[currentIndex].image}
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                <div className="absolute bottom-6 left-6">
                  <h3 className="text-white text-2xl">
                    {projects[currentIndex].title}
                  </h3>
                  <p className="text-white/70 text-sm">
                    {projects[currentIndex].location}
                  </p>
                </div>

                <div className="absolute inset-y-0 left-0 right-0 flex justify-between items-center px-4">
                  <button
                    onClick={prevSlide}
                    className="p-3 rounded-full bg-black/40 text-white"
                  >
                    <ChevronLeft />
                  </button>

                  <button
                    onClick={nextSlide}
                    className="p-3 rounded-full bg-black/40 text-white"
                  >
                    <ChevronRight />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right */}
          <motion.div
            key={`right-${getSlideIndex(1)}`}
            initial={{ opacity: 0, x: 50, scale: 0.8 }}
            animate={{ opacity: 0.5, x: 0, scale: 0.85 }}
            className="w-56 aspect-[3/4] cursor-pointer"
            onClick={nextSlide}
          >
            <img
              src={projects[getSlideIndex(1)].image}
              className="w-full h-full object-cover rounded-md"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ProjectsShowcase;
