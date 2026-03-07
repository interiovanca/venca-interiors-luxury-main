import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Use same product type as existing collection.tsx, with price
type Product = {
  id: string;
  name: string;
  description: string;
  category: string;
  image: string;
  price?: number;
};

const FILTERS = ['All', 'Furniture', 'Seating', 'Tables', 'Décor', 'Lighting'];

const FALLBACK_IMAGE = '/assets/images/collections/collections-14.webp';

const CollectionsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);

  /* HEADER SCROLL */
  useEffect(() => {
    const onScroll = () => setIsHeaderVisible(window.scrollY > 80);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* LOAD FROM ADMIN (SAFE) */
  useEffect(() => {
    try {
      const raw = localStorage.getItem('vanca_inventory');
      if (!raw) {
        setProducts([]);
        return;
      }

      const parsed = JSON.parse(raw);

      if (!Array.isArray(parsed)) {
        setProducts([]);
        return;
      }

      const cleaned: Product[] = parsed
        .filter((p: any) => p && p.name) // minimum required
        .map((p: any, index: number) => ({
          id: p.id ?? `${p.name}-${index}`,
          name: p.name ?? 'Untitled',
          description: p.description ?? '',
          category: p.category ?? 'Furniture',
          image: p.image || (p.images && p.images[0]) || FALLBACK_IMAGE,
          price: p.basePrice || p.price || 0,
        }));

      setProducts(cleaned);
    } catch (err) {
      console.error('Collection load error:', err);
      setProducts([]);
    }
  }, []);

  /* FILTER */
  const visible =
    activeFilter === 'All'
      ? products
      : products.filter(p => p.category === activeFilter);

  return (
    <div className="min-h-screen bg-background">
      <Header isVisible={isHeaderVisible} />

      {/* Hero Section */}
      <section className="relative h-[70vh] md:h-[85vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/assets/images/collections/collections-15.webp"
            alt="Collections"
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
            Curated Excellence
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl text-cream font-light tracking-wide mb-8"
          >
            Collections
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
            className="text-cream/80 font-body text-base md:text-lg max-w-xl font-light tracking-wider"
          >
            Luxury furniture & décor crafted with absolute perfection.
          </motion.p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="py-12 border-b border-charcoal-light/20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            {FILTERS.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`text-xs md:text-sm uppercase font-body tracking-[0.2em] transition-all duration-300 pb-2 border-b-2 ${activeFilter === category
                    ? 'border-champagne text-champagne'
                    : 'border-transparent text-cream/50 hover:text-cream'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid Section – Modern Luxury Style */}
      <section className="py-24 md:py-32 bg-background min-h-[50vh]">
        <div className="container mx-auto px-4 md:px-6">
          {visible.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-charcoal mb-6 text-champagne">
                <span className="text-3xl">🪑</span>
              </div>
              <h3 className="font-display text-2xl text-cream mb-3">No Pieces Found</h3>
              <p className="text-cream/50 font-body tracking-wider">
                We are currently handcrafting new pieces for this collection.
              </p>
            </motion.div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-12 gap-y-20"
            >
              <AnimatePresence>
                {visible.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 40 }}
                    transition={{ duration: 0.7, delay: (index % 10) * 0.1, ease: 'easeOut' }}
                  >
                    <Link
                      to={`/product/${item.id}`}
                      className="group block flex flex-col h-full"
                    >
                      {/* Image */}
                      <div className="relative aspect-[3/4] overflow-hidden bg-charcoal">
                        <motion.img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        {item.price ? (
                          <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <span className="bg-black/60 backdrop-blur-md text-champagne px-4 py-2 text-[10px] font-bold tracking-widest uppercase border border-champagne/30">
                              ₹{item.price.toLocaleString()}
                            </span>
                          </div>
                        ) : null}
                      </div>

                      {/* Details BELOW image */}
                      <div className="mt-8 flex flex-col flex-1">
                        <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-champagne/70 font-body mb-3">
                          {item.category}
                        </p>
                        <h3 className="font-display text-2xl lg:text-3xl text-cream tracking-wide mb-3">
                          {item.name}
                        </h3>
                        <p className="text-sm text-cream/50 line-clamp-2 font-body leading-relaxed flex-1">
                          {item.description}
                        </p>

                        <div className="mt-6 flex items-center gap-3 text-xs text-champagne tracking-widest uppercase transition-all group-hover:gap-5 cursor-pointer pb-2 w-max border-b border-champagne/0 group-hover:border-champagne/100">
                          View Details <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative bg-background flex items-center justify-center border-t border-charcoal-light/20">
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
              Ready to find your <br />
              <span className="text-champagne italic">perfect piece?</span>
            </h2>
            <p className="text-cream/50 font-body text-base md:text-lg mb-12 tracking-wide font-light max-w-xl">
              Let our experts craft an interior that reflects your unique vision and elevates your everyday living.
            </p>
            <Link to="/contact" className="px-10 py-4 bg-champagne text-black font-body text-xs tracking-[0.2em] uppercase hover:bg-cream transition-colors duration-500 flex items-center gap-4">
              Consult With Us
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CollectionsPage;