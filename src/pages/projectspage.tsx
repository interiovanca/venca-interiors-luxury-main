import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X, ChevronLeft, ChevronRight, MapPin, Calendar, Layers } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Project data
const defaultProjects = [
  {
    id: 1,
    title: 'Modern Minimalist Villa',
    category: 'Living Room',
    location: 'Mumbai, India',
    year: '2024',
    materials: ['Italian Marble', 'Solid Oak', 'Brushed Brass'],
    description: 'A contemporary living space that harmonizes clean lines with warm textures, creating an atmosphere of understated luxury.',
    images: [
      '/assets/images/banners/banners-23.webp',
      '/assets/images/banners/banners-24.webp',
      '/assets/images/banners/banners-25.webp',
    ],
  },
  {
    id: 2,
    title: 'Luxury Penthouse Suite',
    category: 'Bedroom',
    location: 'Delhi, India',
    year: '2023',
    materials: ['Walnut Veneer', 'Velvet', 'Gold Accents'],
    description: 'An opulent bedroom retreat featuring custom millwork and sumptuous textiles for ultimate comfort.',
    images: [
      '/assets/images/banners/banners-26.webp',
      '/assets/images/banners/banners-27.webp',
      '/assets/images/banners/banners-28.webp',
    ],
  },
  {
    id: 3,
    title: 'Chef\'s Dream Kitchen',
    category: 'Kitchen',
    location: 'Bangalore, India',
    year: '2024',
    materials: ['Quartz Countertops', 'Matte Black Steel', 'White Oak'],
    description: 'A professional-grade kitchen designed for culinary excellence without compromising on aesthetic appeal.',
    images: [
      '/assets/images/banners/banners-29.webp',
      '/assets/images/banners/banners-30.webp',
      '/assets/images/banners/banners-31.webp',
    ],
  },
  {
    id: 4,
    title: 'Executive Corner Office',
    category: 'Office',
    location: 'Hyderabad, India',
    year: '2023',
    materials: ['Leather', 'Smoked Glass', 'Polished Chrome'],
    description: 'A prestigious office space that commands authority while maintaining comfort for long working hours.',
    images: [
      '/assets/images/banners/banners-32.webp',
      '/assets/images/banners/banners-33.webp',
      '/assets/images/banners/banners-34.webp',
    ],
  },
  {
    id: 5,
    title: 'Grand Dining Experience',
    category: 'Dining',
    location: 'Pune, India',
    year: '2024',
    materials: ['Mahogany', 'Crystal', 'Silk Drapes'],
    description: 'An elegant dining room crafted for memorable gatherings and sophisticated entertaining.',
    images: [
      '/assets/images/banners/banners-35.webp',
      '/assets/images/banners/banners-36.webp',
      '/assets/images/banners/banners-37.webp',
    ],
  },
  {
    id: 6,
    title: 'Bespoke Walk-in Wardrobe',
    category: 'Wardrobe',
    location: 'Chennai, India',
    year: '2023',
    materials: ['Lacquered Panels', 'LED Lighting', 'Soft-close Hardware'],
    description: 'A meticulously organized wardrobe system that transforms dressing into a luxury experience.',
    images: [
      '/assets/images/banners/banners-38.webp',
      '/assets/images/ui/placeholder.webp',
      '/assets/images/ui/placeholder.webp',
    ],
  },
  {
    id: 7,
    title: 'Artisan Furniture Collection',
    category: 'Custom Furniture',
    location: 'Ahmedabad, India',
    year: '2024',
    materials: ['Reclaimed Teak', 'Hand-forged Iron', 'Natural Linen'],
    description: 'Handcrafted furniture pieces that tell a story of traditional craftsmanship meeting modern design.',
    images: [
      '/assets/images/banners/banners-41.webp',
      '/assets/images/banners/banners-42.webp',
      '/assets/images/banners/banners-43.webp',
    ],
  },
  {
    id: 8,
    title: 'Serene Master Retreat',
    category: 'Bedroom',
    location: 'Goa, India',
    year: '2024',
    materials: ['Bamboo', 'Organic Cotton', 'Stone'],
    description: 'A tranquil sanctuary inspired by coastal living, designed for ultimate relaxation.',
    images: [
      '/assets/images/banners/banners-44.webp',
      '/assets/images/banners/banners-45.webp',
      '/assets/images/banners/banners-27.webp',
    ],
  },
];

const categories = ['All', 'Living Room', 'Bedroom', 'Kitchen', 'Office', 'Dining', 'Wardrobe', 'Custom Furniture'];

const ProjectsPage = () => {
  const [showHeader, setShowHeader] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [projects, setProjects] = useState<typeof defaultProjects>([]);
  const [featuredProject, setFeaturedProject] = useState<typeof defaultProjects[0] | null>(null);
  const [selectedProject, setSelectedProject] = useState<typeof defaultProjects[0] | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const storedProjects = localStorage.getItem('vanca_projects');
    if (storedProjects) {
      try {
        const parsed = JSON.parse(storedProjects);
        if (parsed.length > 0) {
          setProjects(parsed);
          setFeaturedProject(parsed[0]);
        } else {
          setProjects(defaultProjects);
          setFeaturedProject(defaultProjects[0]);
        }
      } catch (e) {
        setProjects(defaultProjects);
        setFeaturedProject(defaultProjects[0]);
      }
    } else {
      setProjects(defaultProjects);
      setFeaturedProject(defaultProjects[0]);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowHeader(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  const openProjectDetail = (project: any) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
    document.body.style.overflow = 'hidden';
  };

  const closeProjectDetail = () => {
    setSelectedProject(null);
    document.body.style.overflow = '';
  };

  const nextImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedProject.images.length);
    }
  };

  const prevImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => (prev - 1 + selectedProject.images.length) % selectedProject.images.length);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header isVisible={showHeader} />

      {/* Hero Section */}
      <section className="relative h-[70vh] md:h-[85vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/assets/images/banners/banners-46.webp"
            alt="Luxury Interior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70" />
        </div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-champagne tracking-[0.4em] uppercase text-xs md:text-sm font-body mb-6"
          >
            Our Portfolio
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl text-white font-light tracking-wide mb-8 drop-shadow-lg"
          >
            Our Projects
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-12 h-[1px] bg-champagne mb-8"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-white/90 font-body text-base md:text-lg max-w-xl font-light tracking-wider drop-shadow-md"
          >
            Crafted spaces that define timeless luxury living.
          </motion.p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="py-12 border-b border-charcoal-light/20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`text-xs md:text-sm uppercase font-body tracking-[0.2em] transition-all duration-300 pb-2 border-b-2 ${activeCategory === category
                  ? 'border-champagne text-champagne'
                  : 'border-transparent text-foreground/50 hover:text-foreground'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid – Modern Luxury Style */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20"
          >
            <AnimatePresence>
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 40 }}
                  transition={{ duration: 0.7, delay: index * 0.1, ease: 'easeOut' }}
                  className="group cursor-pointer flex flex-col"
                  onClick={() => openProjectDetail(project)}
                >
                  {/* Image */}
                  <div className="relative aspect-[3/4] overflow-hidden bg-charcoal">
                    <motion.img
                      src={project.images[0]}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  {/* Details BELOW image */}
                  <div className="mt-8 flex flex-col flex-1">
                    <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-champagne/70 font-body mb-3">
                      {project.category}
                    </p>
                    <h3 className="font-display text-2xl lg:text-3xl text-cream tracking-wide mb-3">
                      {project.title}
                    </h3>
                    <p className="text-sm text-cream/50 line-clamp-2 font-body leading-relaxed flex-1">
                      {project.description}
                    </p>

                    <div className="mt-6 flex items-center gap-3 text-xs text-champagne tracking-widest uppercase transition-all group-hover:gap-5 cursor-pointer pb-2 w-max border-b border-champagne/0 group-hover:border-champagne/100">
                      View Exploration <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>


      {/* Featured Project Section */}
      {featuredProject && (
        <section className="py-24 md:py-32 bg-[#0a0a0a] border-y border-charcoal-light/20 relative">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
              {/* Image */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative aspect-[4/3] w-full"
              >
                <img
                  src={featuredProject.images[0]}
                  alt={featuredProject.title}
                  className="w-full h-full object-cover shadow-2xl"
                />
                <div className="absolute -inset-4 border border-champagne/20 -z-10 translate-y-8 translate-x-8" />
              </motion.div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-8"
              >
                <div className="space-y-4">
                  <p className="text-champagne tracking-[0.4em] text-xs font-body uppercase">
                    Featured Masterpiece
                  </p>
                  <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white tracking-wide">
                    {featuredProject.title}
                  </h2>
                </div>

                <div className="w-16 h-[1px] bg-champagne/40" />

                <p className="text-white/70 font-body leading-loose text-sm md:text-base">
                  {featuredProject.description}
                </p>

                <div className="flex flex-wrap gap-6 text-sm text-white/50 font-body tracking-wider">
                  <span className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-champagne" />
                    {featuredProject.location}
                  </span>
                  <span className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-champagne" />
                    {featuredProject.year}
                  </span>
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => openProjectDetail(featuredProject)}
                    className="inline-flex items-center gap-4 px-8 py-4 border border-champagne text-champagne hover:bg-champagne hover:text-black font-body text-xs tracking-[0.2em] uppercase transition-all duration-300"
                  >
                    Explore Details
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-32 relative bg-background flex items-center justify-center border-b border-charcoal-light/20">
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="max-w-3xl mx-auto flex flex-col items-center"
          >
            <div className="w-[1px] h-16 bg-champagne mb-12" />
            <h2 className="font-display text-4xl md:text-5xl lg:text-7xl text-cream tracking-wide mb-8 leading-tight">
              Ready to create your <br />
              <span className="text-champagne italic">masterpiece?</span>
            </h2>
            <p className="text-cream/50 font-body text-base md:text-lg mb-12 tracking-wide font-light max-w-xl">
              Let our experts craft an interior that reflects your unique vision and elevates your everyday living.
            </p>
            <button className="px-10 py-4 bg-champagne text-black font-body text-xs tracking-[0.2em] uppercase hover:bg-cream transition-colors duration-500 flex items-center gap-4">
              Consult With Us
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </section>

      <Footer />

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={closeProjectDetail}
              className="fixed top-6 right-6 z-[110] text-white/60 hover:text-white transition-colors p-2"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="min-h-screen py-16 md:py-24 bg-background">
              {/* Image Gallery */}
              <div className="relative max-w-7xl mx-auto px-4 md:px-8 mb-16">
                <div className="relative aspect-[16/9] lg:aspect-[21/9] overflow-hidden bg-charcoal">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentImageIndex}
                      src={selectedProject.images[currentImageIndex]}
                      alt={selectedProject.title}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-full object-cover"
                    />
                  </AnimatePresence>

                  {/* Navigation Arrows */}
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>

                  {/* Dots */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {selectedProject.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-12 h-[2px] transition-all duration-300 ${index === currentImageIndex ? 'bg-champagne' : 'bg-white/20 hover:bg-white/40'
                          }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Project Info */}
              <div className="max-w-5xl mx-auto px-4 md:px-8">
                <div className="grid md:grid-cols-12 gap-16">
                  <div className="md:col-span-7 space-y-8">
                    <p className="text-champagne tracking-[0.3em] text-xs uppercase font-body">
                      {selectedProject.category}
                    </p>
                    <h2 className="font-display text-4xl md:text-5xl text-cream tracking-wide">
                      {selectedProject.title}
                    </h2>
                    <div className="w-12 h-[1px] bg-champagne/40" />
                    <p className="text-cream/70 font-body leading-loose text-sm md:text-base">
                      {selectedProject.description}
                    </p>
                  </div>

                  <div className="md:col-span-5 space-y-10 pt-4 md:border-l border-charcoal-light/30 pl-0 md:pl-10">
                    <div className="space-y-6">
                      <div>
                        <p className="text-champagne/60 text-xs font-body tracking-[0.1em] uppercase mb-2">Location</p>
                        <p className="text-cream font-body font-light text-lg">{selectedProject.location}</p>
                      </div>
                      <div>
                        <p className="text-champagne/60 text-xs font-body tracking-[0.1em] uppercase mb-2">Year Delivered</p>
                        <p className="text-cream font-body font-light text-lg">{selectedProject.year}</p>
                      </div>
                      <div>
                        <p className="text-champagne/60 text-xs font-body tracking-[0.1em] uppercase mb-3">Key Materials</p>
                        <div className="flex flex-wrap gap-3">
                          {selectedProject.materials.map((material) => (
                            <span
                              key={material}
                              className="px-4 py-2 border border-charcoal text-cream/80 text-xs uppercase tracking-widest font-body"
                            >
                              {material}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <button className="mt-8 w-full flex items-center justify-center gap-4 py-5 border border-champagne text-champagne hover:bg-champagne hover:text-black font-body text-xs tracking-[0.2em] uppercase transition-all duration-300">
                      Request Similar Design
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectsPage;