import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CollectionCard from '@/components/collectioncard';

type Product = {
  id: string;
  name: string;
  description: string;
  category: string;
  image: string;
};

const FILTERS = ['All', 'Furniture', 'Seating', 'Tables', 'Décor', 'Lighting'];

const FALLBACK_IMAGE =
  '/assets/images/collections/collections-14.webp';

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

      {/* HERO */}
      <section className="relative h-[70vh] md:h-[80vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/assets/images/collections/collections-15.webp"
            className="w-full h-full object-cover"
            alt="Collections"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
        </div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-champagne/80 tracking-[0.4em] text-xs md:text-sm mb-6 font-body uppercase"
          >
            Curated Excellence
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl text-white tracking-wide mb-6"
          >
            Collections
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-white/70 text-base md:text-lg tracking-wider max-w-xl mx-auto font-body"
          >
            Luxury furniture & décor crafted with absolute perfection
          </motion.p>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 1 }}
            className="w-24 h-[1px] bg-gradient-to-r from-transparent via-champagne to-transparent mt-12"
          />
        </div>
      </section>

      {/* FILTERS */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-nowrap md:flex-wrap items-center md:justify-center gap-2 md:gap-4 overflow-x-auto pb-4 md:pb-0 hide-scrollbar">
            {FILTERS.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`flex-shrink-0 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300
                  ${activeFilter === cat
                    ? 'bg-foreground text-background shadow-lg shadow-foreground/10 scale-105'
                    : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground border border-transparent'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* GRID */}
      <section className="pb-28 pt-8 md:pt-16 min-h-[50vh]">
        <div className="container mx-auto px-6">
          {visible.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-6">
                <span className="text-3xl">🪑</span>
              </div>
              <h3 className="font-display text-2xl text-foreground mb-3">No Pieces Found</h3>
              <p className="text-muted-foreground font-body">
                We are currently handcrafting new pieces for this collection.
              </p>
            </motion.div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFilter}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12"
              >
                {visible.map((item, index) => (
                  <CollectionCard
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    image={item.image}
                    tagline={item.description}
                    index={index}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 bg-charcoal-deep relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal-deep via-charcoal to-charcoal-deep opacity-90" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMC4wMyIvPjwvc3ZnPg==')] opacity-30" />

        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-cream mb-6">
              Let’s Design Your Dream Space
            </h2>
            <p className="text-cream/60 font-body text-lg mb-10">
              Bespoke furniture curated and handcrafted personally for you.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-champagne text-charcoal-deep font-bold uppercase text-xs tracking-[0.2em] hover:bg-white transition-colors duration-300"
              >
                Explore Home <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-8 py-4 border border-cream/30 text-cream uppercase text-xs tracking-[0.2em] font-bold hover:border-champagne hover:text-champagne transition-colors duration-300"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CollectionsPage;