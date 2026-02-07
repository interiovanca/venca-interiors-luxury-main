import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles, Heart, Target, Eye, Award, Users, Compass, Gem, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import aboutImage from '@/assets/about-interior.jpg';
import categorySofas from '@/assets/category-sofas.jpg';
import categoryChairs from '@/assets/category-chairs.jpg';
import categoryTables from '@/assets/category-tables.jpg';

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: 'easeOut' }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.15
    }
  }
};

const philosophyCards = [
  {
    icon: Heart,
    title: 'We Listen Before We Craft',
    description: 'Understanding your vision is the foundation of every masterpiece we create.'
  },
  {
    icon: Target,
    title: 'We Prioritize Your Vision',
    description: 'Your lifestyle and aspirations guide every design decision we make.'
  },
  {
    icon: Sparkles,
    title: 'We Combine Artistry with Precision',
    description: 'Where creative expression meets meticulous craftsmanship.'
  }
];

const processSteps = [
  {
    step: '01',
    title: 'Discovery & Insight',
    description: 'We begin by understanding your space, style, and aspirations through meaningful conversation.'
  },
  {
    step: '02',
    title: 'Concept & Design',
    description: 'Our designers craft bespoke concepts that translate your vision into tangible forms.'
  },
  {
    step: '03',
    title: 'Craft & Execution',
    description: 'Master artisans bring designs to life with precision and uncompromising quality.'
  },
  {
    step: '04',
    title: 'Refinement & Reveal',
    description: 'Every detail is perfected before your extraordinary piece finds its home.'
  }
];

const whyVanca = [
  { icon: Gem, title: 'Timelessly Elegant', description: 'Designs that transcend trends and remain beautiful for generations.' },
  { icon: Users, title: 'Intimately Personal', description: 'Each piece is crafted to reflect your unique identity and story.' },
  { icon: Award, title: 'Meticulously Crafted', description: 'Handcrafted by master artisans with decades of expertise.' },
  { icon: Eye, title: 'Experience Driven', description: 'We create not just furniture, but transformative experiences.' }
];

const designValues = [
  { title: 'Craftsmanship Above All', description: 'Every joint, curve, and finish reflects our commitment to excellence.' },
  { title: 'Material Integrity', description: 'We source only the finest materials from trusted partners worldwide.' },
  { title: 'Human-Centric Design', description: 'Comfort and functionality are woven into every design decision.' },
  { title: 'Timeless Aesthetics', description: 'Beauty that endures, evolves, and enriches your space over time.' }
];

const testimonials = [
  {
    quote: "Vanca Interio transformed our living space into a sanctuary. Every piece tells a story of exceptional craftsmanship.",
    author: "Alexandra Chen",
    role: "Interior Designer, London"
  },
  {
    quote: "The attention to detail is extraordinary. Our custom dining table has become the heart of our home.",
    author: "Marcus Weber",
    role: "Private Collector, Munich"
  },
  {
    quote: "Working with Vanca was an experience in itself. They understood our vision perfectly.",
    author: "Sofia Rosetti",
    role: "Architect, Milan"
  }
];

const OurStoryPage = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header isVisible={true} />
      
      {/* Hero Section */}
      <section className="relative h-[80vh] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={aboutImage} 
            alt="Vanca Interio Showroom"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
        </div>
        
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-champagne/80 tracking-[0.4em] text-xs md:text-sm mb-6 font-body uppercase"
          >
            Crafting Timeless Furniture
          </motion.p>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl text-white tracking-wide"
          >
            Our Story
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-white/70 mt-6 text-base md:text-lg tracking-wider max-w-xl mx-auto font-body"
          >
            Curating unique furniture pieces that define elegance
          </motion.p>
          
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 1 }}
            className="w-24 h-[1px] bg-gradient-to-r from-transparent via-champagne to-transparent mt-8"
          />
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-champagne/60 text-sm tracking-[0.3em] uppercase mb-4 block font-body">
                About Us
              </span>
              <h2 className="font-display text-4xl md:text-5xl text-foreground mb-8">
                Who We Are
              </h2>
              <p className="text-muted-foreground leading-relaxed font-body text-lg mb-6">
                At Vanca Interio, we believe true luxury lies in the uniqueness of a piece — not just in how it looks, but in how it transforms your space.
              </p>
              <p className="text-muted-foreground leading-relaxed font-body">
                We craft furniture that tells a story, elevates experiences, and stands the test of time. Our philosophy is rooted in artistry, meticulous craftsmanship, and an unwavering focus on quality.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img 
                  src={categorySofas} 
                  alt="Luxury Furniture"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 border border-champagne/30 dark:border-champagne/20" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Philosophy Section */}
      <section className="py-24 md:py-32 bg-muted/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="text-champagne/60 text-sm tracking-[0.3em] uppercase mb-4 block font-body">
              Our Approach
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-foreground">
              Our Philosophy
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {philosophyCards.map((card, index) => (
              <motion.div
                key={card.title}
                variants={fadeInUp}
                className="bg-card p-8 md:p-10 border border-border/50 hover:border-champagne/30 transition-all duration-500 group"
              >
                <card.icon className="w-10 h-10 text-champagne mb-6 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="font-display text-xl text-foreground mb-4">
                  {card.title}
                </h3>
                <p className="text-muted-foreground font-body leading-relaxed">
                  {card.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Our Process Section */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="text-champagne/60 text-sm tracking-[0.3em] uppercase mb-4 block font-body">
              How We Work
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-foreground">
              Our Process
            </h2>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-champagne/30 to-transparent transform -translate-y-1/2" />
            
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-4 gap-8"
            >
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.step}
                  variants={fadeInUp}
                  className="text-center relative"
                >
                  <div className="relative z-10 bg-background">
                    <span className="font-display text-5xl text-champagne/30 mb-4 block">
                      {step.step}
                    </span>
                    <h3 className="font-display text-xl text-foreground mb-4">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground font-body text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Vanca Interio Section */}
      <section className="py-24 md:py-32 bg-muted/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="text-champagne/60 text-sm tracking-[0.3em] uppercase mb-4 block font-body">
              The Difference
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-foreground">
              Why Vanca Interio
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {whyVanca.map((item, index) => (
              <motion.div
                key={item.title}
                variants={fadeInUp}
                className="text-center p-8"
              >
                <item.icon className="w-12 h-12 text-champagne mx-auto mb-6" />
                <h3 className="font-display text-2xl text-foreground mb-4">
                  {item.title}
                </h3>
                <p className="text-muted-foreground font-body leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Signature Design Values Section */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="text-champagne/60 text-sm tracking-[0.3em] uppercase mb-4 block font-body">
              What We Stand For
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-foreground">
              Signature Design Values
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-0 max-w-4xl mx-auto"
          >
            {designValues.map((value, index) => (
              <motion.div
                key={value.title}
                variants={fadeInUp}
                className="p-8 md:p-12 border-b border-r border-border/50 hover:bg-muted/20 transition-colors duration-300"
                style={{
                  borderRight: index % 2 === 1 ? 'none' : undefined,
                  borderBottom: index >= 2 ? 'none' : undefined
                }}
              >
                <h3 className="font-display text-xl text-foreground mb-4">
                  {value.title}
                </h3>
                <p className="text-muted-foreground font-body leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 md:py-32 bg-muted/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="text-champagne/60 text-sm tracking-[0.3em] uppercase mb-4 block font-body">
              Testimonials
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-foreground">
              Words from Our Clients
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto relative">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <Quote className="w-16 h-16 text-champagne/30 mx-auto mb-8" />
              <p className="font-display text-2xl md:text-3xl text-foreground mb-8 leading-relaxed">
                "{testimonials[currentTestimonial].quote}"
              </p>
              <p className="text-champagne font-body tracking-wider">
                {testimonials[currentTestimonial].author}
              </p>
              <p className="text-muted-foreground font-body text-sm mt-1">
                {testimonials[currentTestimonial].role}
              </p>
            </motion.div>

            <div className="flex items-center justify-center gap-6 mt-12">
              <button
                onClick={prevTestimonial}
                className="w-12 h-12 border border-border/50 hover:border-champagne flex items-center justify-center transition-colors duration-300"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5 text-muted-foreground" />
              </button>
              <span className="text-muted-foreground font-body text-sm">
                {currentTestimonial + 1} / {testimonials.length}
              </span>
              <button
                onClick={nextTestimonial}
                className="w-12 h-12 border border-border/50 hover:border-champagne flex items-center justify-center transition-colors duration-300"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-24 md:py-32 bg-charcoal-deep relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal-deep via-charcoal to-charcoal-deep opacity-90" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMC4wMyIvPjwvc3ZnPg==')] opacity-30" />
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="font-display text-4xl md:text-5xl text-cream mb-6">
              Start Your Story With Vanca Interio
            </h2>
            <p className="text-cream/60 font-body mb-10 leading-relaxed">
              Let us help you create spaces that inspire, comfort, and endure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-8 py-4 border border-champagne bg-champagne text-charcoal-deep tracking-[0.15em] uppercase font-body text-sm hover:bg-transparent hover:text-champagne transition-all duration-500"
              >
                Book a Consultation
              </Link>
              <Link
                to="/category/all"
                className="inline-flex items-center justify-center px-8 py-4 border border-cream/30 text-cream tracking-[0.15em] uppercase font-body text-sm hover:border-champagne hover:text-champagne transition-all duration-500"
              >
                Explore Our Pieces
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default OurStoryPage;