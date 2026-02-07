import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X, ChevronLeft, ChevronRight, MapPin, Calendar, Layers } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Project data
const projects = [
  {
    id: 1,
    title: 'Modern Minimalist Villa',
    category: 'Living Room',
    location: 'Mumbai, India',
    year: '2024',
    materials: ['Italian Marble', 'Solid Oak', 'Brushed Brass'],
    description: 'A contemporary living space that harmonizes clean lines with warm textures, creating an atmosphere of understated luxury.',
    images: [
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200',
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
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1200',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1200',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200',
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
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200',
      'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=1200',
      'https://images.unsplash.com/photo-1600489000022-c2086d79f9d4?w=1200',
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
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200',
      'https://images.unsplash.com/photo-1604328698692-f76ea9498e76?w=1200',
      'https://images.unsplash.com/photo-1497215842964-222b430dc094?w=1200',
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
      'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=1200',
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=1200',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200',
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
      'https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=1200',
      'https://images.unsplash.com/photo-1594125311687-3b1b3eefa9f2?w=1200',
      'https://images.unsplash.com/photo-1595428773960-2aa93dc8f5fc?w=1200',
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
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200',
      'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=1200',
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=1200',
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
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200',
      'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=1200',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1200',
    ],
  },
];

const categories = ['All', 'Living Room', 'Bedroom', 'Kitchen', 'Office', 'Dining', 'Wardrobe', 'Custom Furniture'];

const featuredProject = projects[0];

const ProjectsPage = () => {
  const [showHeader, setShowHeader] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

  const openProjectDetail = (project: typeof projects[0]) => {
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
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920"
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
            className="text-primary tracking-[0.3em] text-xs md:text-sm font-body mb-4"
          >
            OUR PORTFOLIO
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-4xl md:text-6xl lg:text-7xl text-white font-light mb-6"
          >
            Our Projects
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/70 font-body text-base md:text-lg max-w-xl"
          >
            Crafted spaces that define timeless living
          </motion.p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="py-8 md:py-12 border-b border-border">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 md:px-6 py-2 md:py-2.5 rounded-full text-xs md:text-sm font-body tracking-wide transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-muted'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Project Grid - Masonry Style */}
      {/* Projects Grid – Modern Furniture Style */}
<section className="py-16 md:py-24 bg-background">
  <div className="container mx-auto px-4 md:px-6">
    <motion.div
      layout
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
    >
      <AnimatePresence>
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className="group cursor-pointer"
            onClick={() => openProjectDetail(project)}
          >
            {/* Image */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-card">
              <motion.img
                src={project.images[0]}
                alt={project.title}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
              />
            </div>

            {/* Text BELOW image (very important) */}
            <div className="mt-5 space-y-2">
              <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
                {project.category}
              </p>
              <h3 className="font-display text-lg md:text-xl text-foreground">
                {project.title}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {project.description}
              </p>

              <span className="inline-flex items-center gap-2 text-sm text-primary mt-2">
                View Project <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  </div>
</section>


      {/* Featured Project Section */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-[4/3] rounded-lg overflow-hidden"
            >
              <img
                src={featuredProject.images[0]}
                alt={featuredProject.title}
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <p className="text-primary tracking-[0.2em] text-xs font-body">FEATURED PROJECT</p>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground">
                {featuredProject.title}
              </h2>
              <p className="text-muted-foreground font-body leading-relaxed">
                {featuredProject.description}
              </p>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  {featuredProject.location}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  {featuredProject.year}
                </span>
              </div>
              <button
                onClick={() => openProjectDetail(featuredProject)}
                className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-body text-sm tracking-wider hover:bg-primary/90 transition-colors duration-300 rounded-sm"
              >
                View Case Study
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary via-background to-card" />
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-6">
              Let's Create Your Dream Space
            </h2>
            <p className="text-muted-foreground font-body text-lg mb-10">
              Share your vision with us and we'll craft something extraordinary.
            </p>
            <button className="inline-flex items-center gap-3 px-10 py-4 bg-primary text-primary-foreground font-body text-sm tracking-wider hover:bg-primary/90 transition-colors duration-300 rounded-sm">
              Start Your Project
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

            <div className="min-h-screen py-12 md:py-20">
              {/* Image Gallery */}
              <div className="relative max-w-6xl mx-auto px-4 md:px-6 mb-12">
                <div className="relative aspect-video rounded-lg overflow-hidden">
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
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === currentImageIndex ? 'bg-primary' : 'bg-white/40'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Project Info */}
              <div className="max-w-4xl mx-auto px-4 md:px-6">
                <div className="grid md:grid-cols-2 gap-12">
                  <div>
                    <p className="text-primary tracking-[0.2em] text-xs mb-4">{selectedProject.category}</p>
                    <h2 className="font-display text-3xl md:text-4xl text-white mb-6">{selectedProject.title}</h2>
                    <p className="text-white/70 font-body leading-relaxed">{selectedProject.description}</p>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <p className="text-white/50 text-sm mb-1">Location</p>
                      <p className="text-white font-body">{selectedProject.location}</p>
                    </div>
                    <div>
                      <p className="text-white/50 text-sm mb-1">Year</p>
                      <p className="text-white font-body">{selectedProject.year}</p>
                    </div>
                    <div>
                      <p className="text-white/50 text-sm mb-2">Materials</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.materials.map((material) => (
                          <span
                            key={material}
                            className="px-3 py-1 bg-white/10 text-white/80 text-sm rounded-full"
                          >
                            {material}
                          </span>
                        ))}
                      </div>
                    </div>
                    <button className="mt-6 inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-body text-sm tracking-wider hover:bg-primary/90 transition-colors duration-300 rounded-sm">
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