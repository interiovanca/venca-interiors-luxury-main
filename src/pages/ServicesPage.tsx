import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Sofa, 
  LayoutDashboard, 
  ChefHat, 
  Shirt, 
  Building2, 
  Box, 
  Wrench, 
  Sparkles,
  MessageCircle,
  Palette,
  Layers,
  Hammer,
  CheckCircle
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const services = [
  {
    icon: Sofa,
    title: 'Custom Furniture Design',
    description: 'Bespoke furniture pieces crafted to your exact specifications and style preferences.',
  },
  {
    icon: LayoutDashboard,
    title: 'Interior Space Planning',
    description: 'Strategic layout optimization to maximize functionality and aesthetic flow.',
  },
  {
    icon: ChefHat,
    title: 'Modular Kitchen Solutions',
    description: 'Contemporary kitchen designs combining efficiency with elegant aesthetics.',
  },
  {
    icon: Shirt,
    title: 'Wardrobe & Storage Solutions',
    description: 'Intelligent storage systems designed for organization and accessibility.',
  },
  {
    icon: Building2,
    title: 'Office & Commercial Interiors',
    description: 'Professional spaces that inspire productivity and reflect brand identity.',
  },
  {
    icon: Box,
    title: '3D Visualization & Concept Design',
    description: 'Photorealistic renderings to envision your space before execution.',
  },
  {
    icon: Wrench,
    title: 'Turnkey Interior Execution',
    description: 'End-to-end project management from concept to completion.',
  },
  {
    icon: Sparkles,
    title: 'Furniture Restoration & Upgrade',
    description: 'Breathing new life into cherished pieces with expert restoration.',
  },
];

const processSteps = [
  { icon: MessageCircle, title: 'Consultation', description: 'Understanding your vision' },
  { icon: Palette, title: 'Design', description: 'Creating concepts' },
  { icon: Layers, title: 'Material Selection', description: 'Choosing finishes' },
  { icon: Hammer, title: 'Production', description: 'Crafting excellence' },
  { icon: CheckCircle, title: 'Installation', description: 'Perfect delivery' },
];

const expertisePoints = [
  'Premium materials sourced globally',
  'Skilled master craftsmen',
  'Personalized design approach',
  'End-to-end project execution',
];

const ServicesPage = () => {
  const [showHeader, setShowHeader] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowHeader(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header isVisible={showHeader} />

      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[75vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920"
            alt="Luxury Interior Services"
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
            WHAT WE OFFER
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-4xl md:text-6xl lg:text-7xl text-white font-light mb-6"
          >
            Our Services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/70 font-body text-base md:text-lg max-w-xl"
          >
            Thoughtfully crafted solutions for refined living
          </motion.p>
          
          {/* Decorative Line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8 w-16 h-px bg-primary"
          />
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative p-8 bg-card rounded-lg border border-border hover:border-primary/30 transition-all duration-500"
              >
                <div className="mb-6 text-primary group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="w-8 h-8" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-xl text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground font-body text-sm leading-relaxed mb-4">
                  {service.description}
                </p>
                <span className="inline-flex items-center gap-2 text-primary text-sm font-body opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Learn More <ArrowRight className="w-4 h-4" />
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Split Feature Section */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-[4/3] rounded-lg overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200"
                alt="Bespoke Solutions"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              <div>
                <p className="text-primary tracking-[0.2em] text-xs font-body mb-4">OUR EXPERTISE</p>
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-6">
                  Bespoke Solutions Tailored To You
                </h2>
                <p className="text-muted-foreground font-body leading-relaxed">
                  Every space we design is a unique reflection of your lifestyle and aspirations. 
                  Our team of expert designers and craftsmen work closely with you to bring your 
                  vision to life with uncompromising quality and attention to detail.
                </p>
              </div>

              <ul className="space-y-4">
                {expertisePoints.map((point, index) => (
                  <motion.li
                    key={point}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className="flex items-center gap-4"
                  >
                    <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                    <span className="text-foreground font-body">{point}</span>
                  </motion.li>
                ))}
              </ul>

              <button className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-body text-sm tracking-wider hover:bg-primary/90 transition-colors duration-300 rounded-sm">
                Explore Our Process
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Flow */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-primary tracking-[0.2em] text-xs font-body mb-4">HOW WE WORK</p>
            <h2 className="font-display text-3xl md:text-4xl text-foreground">Our Process</h2>
          </motion.div>

          <div className="relative">
            {/* Connection Line - Desktop */}
            <div className="hidden md:block absolute top-12 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-4">
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative text-center"
                >
                  <div className="relative z-10 mx-auto w-24 h-24 bg-card border border-border rounded-full flex items-center justify-center mb-6 group-hover:border-primary/50 transition-colors">
                    <step.icon className="w-8 h-8 text-primary" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-display text-lg text-foreground mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm font-body">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 relative overflow-hidden bg-card">
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-6">
              Let's Build Something Exceptional
            </h2>
            <p className="text-muted-foreground font-body text-lg mb-10">
              Tell us about your space and we'll craft a solution just for you.
            </p>
            <button className="inline-flex items-center gap-3 px-10 py-4 bg-primary text-primary-foreground font-body text-sm tracking-wider hover:bg-primary/90 transition-colors duration-300 rounded-sm">
              Get a Free Consultation
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServicesPage;