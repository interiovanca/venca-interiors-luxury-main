import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Sofa,
  Armchair,
  BedDouble,
  Table,
  Boxes,
  Hammer,
  Sparkles,
  MessageCircle,
  Palette,
  Layers,
  CheckCircle,
  Wrench
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const services = [
  {
    icon: Sofa,
    title: 'Bespoke Furniture Design',
    description: 'Custom-designed furniture crafted to reflect your taste, space, and lifestyle.',
  },
  {
    icon: Armchair,
    title: 'Luxury Seating Solutions',
    description: 'Sofas, lounge chairs, and seating pieces that balance comfort with elegance.',
  },
  {
    icon: BedDouble,
    title: 'Beds & Bedroom Furniture',
    description: 'Statement beds and bedroom furniture designed for refined living.',
  },
  {
    icon: Table,
    title: 'Dining & Tables',
    description: 'Dining tables, coffee tables, and consoles crafted with timeless appeal.',
  },
  {
    icon: Boxes,
    title: 'Storage & Wardrobes',
    description: 'Thoughtfully designed storage furniture combining beauty and utility.',
  },
  {
    icon: Palette,
    title: 'Material & Finish Customization',
    description: 'Wide selection of premium woods, metals, fabrics, and finishes.',
  },
  {
    icon: Hammer,
    title: 'Furniture Manufacturing',
    description: 'Precision-crafted furniture made by skilled master craftsmen.',
  },
  {
    icon: Sparkles,
    title: 'Furniture Restoration',
    description: 'Reviving and upgrading existing furniture with expert detailing.',
  },
];

const processSteps = [
  { icon: MessageCircle, title: 'Consultation', description: 'Understanding your needs' },
  { icon: Palette, title: 'Design & Customization', description: 'Defining form & finish' },
  { icon: Layers, title: 'Material Selection', description: 'Choosing premium materials' },
  { icon: Wrench, title: 'Crafting', description: 'Precision manufacturing' },
  { icon: CheckCircle, title: 'Delivery', description: 'Perfect final execution' },
];

const expertisePoints = [
  'Premium wood, metal & upholstery materials',
  'Skilled furniture artisans',
  'Fully customized designs',
  'Attention to detail & finishing',
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
            src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1920"
            alt="Luxury Furniture"
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
            OUR CRAFT
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-4xl md:text-6xl lg:text-7xl text-white font-light mb-6"
          >
            Furniture Services
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/70 font-body text-base md:text-lg max-w-xl"
          >
            Crafted furniture designed to elevate everyday living
          </motion.p>

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
                className="group p-8 bg-card rounded-lg border border-border hover:border-primary/30 transition-all duration-500"
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

      {/* Feature Section */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-[4/3] rounded-lg overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200"
                alt="Custom Furniture"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              <div>
                <p className="text-primary tracking-[0.2em] text-xs font-body mb-4">
                  OUR EXPERTISE
                </p>
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-6">
                  Furniture Crafted With Purpose
                </h2>
                <p className="text-muted-foreground font-body leading-relaxed">
                  Every piece we create is a balance of form, function, and fine craftsmanship.
                  From concept to completion, our furniture is designed to last and inspire.
                </p>
              </div>

              <ul className="space-y-4">
                {expertisePoints.map((point, index) => (
                  <motion.li
                    key={point}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center gap-4"
                  >
                    <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                    <span className="text-foreground font-body">{point}</span>
                  </motion.li>
                ))}
              </ul>

              <button className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-body text-sm tracking-wider hover:bg-primary/90 transition-colors rounded-sm">
                Explore Our Craft
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-primary tracking-[0.2em] text-xs font-body mb-4">
              OUR PROCESS
            </p>
            <h2 className="font-display text-3xl md:text-4xl text-foreground">
              From Idea to Furniture
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="mx-auto w-24 h-24 bg-card border border-border rounded-full flex items-center justify-center mb-6">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-display text-lg text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm font-body">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServicesPage;
