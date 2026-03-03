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
  'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80';

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
          image: p.image || FALLBACK_IMAGE,
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
      <section className="relative h-[75vh] bg-black overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=80"
          className="absolute inset-0 w-full h-full object-cover"
          alt=""
        />
        <div className="absolute inset-0 bg-black/70" />

        <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl text-white mb-6"
          >
            Our Collections
          </motion.h1>

          <p className="text-white/80 max-w-2xl text-lg">
            Luxury furniture & décor crafted with perfection
          </p>
        </div>
      </section>

      {/* FILTERS */}
      <section className="py-14">
        <div className="container mx-auto px-6 flex flex-wrap justify-center gap-3">
          {FILTERS.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-6 py-3 text-xs uppercase tracking-widest border transition
                ${
                  activeFilter === cat
                    ? 'bg-amber-500 text-black border-amber-500'
                    : 'border-border text-muted-foreground hover:border-amber-400'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* GRID */}
      <section className="pb-28">
        <div className="container mx-auto px-6">
          {visible.length === 0 ? (
            <p className="text-center text-muted-foreground">
              No products available
            </p>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFilter}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
              >
                {visible.map((item, index) => (
                  <CollectionCard
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    image={item.image}
                    tagline={item.description}
                    index={index}
                    size="medium"
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-card text-center">
        <h2 className="text-4xl md:text-5xl mb-6">
          Let’s Design Your Dream Space
        </h2>
        <p className="text-muted-foreground mb-10">
          Bespoke furniture handcrafted for you
        </p>

        <div className="flex justify-center gap-4">
          <Link
            to="/"
            className="px-8 py-4 bg-amber-500 text-black uppercase text-sm tracking-widest flex items-center gap-2"
          >
            Explore <ArrowRight size={16} />
          </Link>

          <Link
            to="/contact"
            className="px-8 py-4 border border-border uppercase text-sm tracking-widest"
          >
            Contact
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CollectionsPage;