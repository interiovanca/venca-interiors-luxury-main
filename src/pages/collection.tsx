import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CollectionCard from '@/components/collectioncard';

// Collection categories data
const collections = [
  { id: 'sofa', name: 'Sofa', tagline: 'Luxurious comfort, designed to impress', category: 'Furniture', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80' },
  { id: 'center-table', name: 'Center Table', tagline: 'Statement pieces for refined gatherings', category: 'Tables', image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=800&q=80' },
  { id: 'side-table', name: 'Side Table', tagline: 'Elegant accents for every corner', category: 'Tables', image: 'https://images.unsplash.com/photo-1499933374294-4584851497cc?w=800&q=80' },
  { id: 'dining-table', name: 'Dining Table', tagline: 'Where memories are crafted', category: 'Tables', image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&q=80' },
  { id: 'console-table', name: 'Console Table', tagline: 'Refined elegance for entryways', category: 'Tables', image: 'https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?w=800&q=80' },
  { id: 'accent-chair', name: 'Accent Chair', tagline: 'Bold statements in seating', category: 'Seating', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80' },
  { id: 'dining-chair', name: 'Dining Chair', tagline: 'Comfort meets sophistication', category: 'Seating', image: 'https://images.unsplash.com/photo-1503602642458-232111445657?w=800&q=80' },
  { id: 'bar-chair', name: 'Bar Chair', tagline: 'Elevated style for modern spaces', category: 'Seating', image: 'https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=800&q=80' },
  { id: 'bar-counter', name: 'Bar Counter', tagline: 'The heart of entertainment', category: 'Furniture', image: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=800&q=80' },
  { id: 'lighting', name: 'Lighting', tagline: 'Illuminate with elegance', category: 'Lighting', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80' },
  { id: 'flower-vases', name: 'Flower Vases', tagline: 'Artistry in every curve', category: 'Décor', image: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=800&q=80' },
  { id: 'artifacts', name: 'Artifacts', tagline: 'Curated treasures for collectors', category: 'Décor', image: 'https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?w=800&q=80' },
];

const filterCategories = ['All', 'Furniture', 'Seating', 'Tables', 'Décor', 'Lighting'];

const CollectionsPage = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsHeaderVisible(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredCollections =
    activeFilter === 'All'
      ? collections
      : collections.filter(item => item.category.toLowerCase() === activeFilter.toLowerCase());

  const getCardSize = (index: number): 'large' | 'medium' => {
    if (index < 3) return 'large';
    if (index >= 3 && index < 7) return 'medium';
    if (index >= 7 && index < 10) return 'large';
    return 'medium';
  };

  return (
    <div className="min-h-screen bg-muted/40 dark:bg-background">
      <Header isVisible={isHeaderVisible} />

      {/* HERO SECTION */}
      <section className="relative h-[70vh] md:h-[80vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=80"
            alt="Luxury Interior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/5 to-black/20 dark:from-black/60 dark:via-black/40 dark:to-black/70" />
        </div>

        <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-champagne text-sm tracking-[0.4em] uppercase font-body mb-4"
          >
            Our Collections
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-display text-4xl md:text-6xl lg:text-7xl text-foreground tracking-wide mb-6 drop-shadow-[0_2px_8px_rgba(0,0,0,0.25)]"
          >
            Curated Furniture & Décor
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-muted-foreground/80 dark:text-muted-foreground text-lg md:text-xl max-w-2xl font-body tracking-wide"
          >
            Discover timeless pieces crafted for refined living
          </motion.p>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="w-24 h-[1px] bg-champagne/50 mt-10"
          />
        </div>
      </section>

      {/* FILTER TABS */}
      <section className="py-12 md:py-16 bg-transparent">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap justify-center gap-3 md:gap-4"
          >
            {filterCategories.map(category => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-6 py-3 text-sm tracking-[0.15em] uppercase font-body transition-all duration-300 rounded-sm border ${
                  activeFilter === category
                    ? 'bg-champagne text-primary-foreground border-champagne'
                    : 'bg-white dark:bg-transparent text-muted-foreground border-border hover:border-champagne/50 hover:text-foreground'
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* COLLECTIONS GRID */}
      <section className="pb-24 md:pb-32 bg-transparent">
        <div className="container mx-auto px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
            >
              {filteredCollections.map((collection, index) => (
                <CollectionCard
                  key={collection.id}
                  id={collection.id}
                  name={collection.name}
                  image={collection.image}
                  tagline={collection.tagline}
                  index={index}
                  size={activeFilter === 'All' ? getCardSize(index) : 'medium'}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 md:py-32 bg-muted dark:bg-card relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 dark:opacity-5">
          <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-transparent dark:from-champagne/20" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-champagne text-sm tracking-[0.4em] uppercase font-body mb-4 block"
            >
              Transform Your Space
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground tracking-wide mb-6"
            >
              Let's Create Your Perfect Space
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-muted-foreground/80 dark:text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto font-body tracking-wide mb-10"
            >
              Explore bespoke furniture and décor tailored to your lifestyle
            </motion.p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-champagne text-primary-foreground text-sm tracking-[0.2em] uppercase font-body rounded-sm hover:bg-champagne-light transition-all duration-300"
              >
                Explore Projects <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/about"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white dark:bg-transparent text-foreground text-sm tracking-[0.2em] uppercase font-body rounded-sm border border-border hover:border-champagne/50 hover:text-champagne transition-all duration-300"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CollectionsPage;
