import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CollectionCard from '@/components/collectioncard';

// 🔹 Define Interface for Type Safety
interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  image: string;
}

// Filter categories
const filterCategories = ['All', 'Sofa', 'Tables', 'Seating', 'Décor', 'Lighting'];

const CollectionsPage = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  // 🔹 STATE FOR DYNAMIC PRODUCTS
  const [displayProducts, setDisplayProducts] = useState<Product[]>([]);

  useEffect(() => {
    setIsMounted(true);
    
    // Scroll logic
    const handleScroll = () => setIsHeaderVisible(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll);

    // 🔹 REAL-TIME LOGIC: Fetch products from localStorage
    const loadProducts = () => {
      try {
        const savedProducts = localStorage.getItem('vanca_inventory');
        if (savedProducts) {
          setDisplayProducts(JSON.parse(savedProducts));
        } else {
          // Fallback Initial setup
          setDisplayProducts([
            { id: '1', name: 'Royal Velvet Sofa', description: 'Luxury comfort, designed to impress', category: 'Sofa', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800' },
            { id: '2', name: 'Oak Dining Table', description: 'Where memories are crafted', category: 'Tables', image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800' }
          ]);
        }
      } catch (error) {
        console.error("Failed to load products:", error);
      }
    };

    loadProducts();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter logic (Memoized style)
  const filteredCollections = activeFilter === 'All'
    ? displayProducts
    : displayProducts.filter((item) => item.category.toLowerCase() === activeFilter.toLowerCase());

  // Grid size logic
  const getCardSize = (index: number) => {
    return index % 5 === 0 ? 'large' : 'medium';
  };

  // Prevent hydration error on AWS/Next.js
  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-[#080808] text-slate-200">
      <Header isVisible={isHeaderVisible} />

      {/* HERO SECTION */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=80"
            alt="Interior"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent" />
        </div>

        <div className="relative z-10 text-center px-6">
          <motion.span 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="text-amber-500 text-xs tracking-[0.5em] uppercase mb-4 block"
          >
            Bespoke Furniture
          </motion.span>
          <motion.h1 
            initial={{ y: 20, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }}
            className="text-5xl md:text-7xl font-display font-bold tracking-tighter"
          >
            The <span className="text-amber-600 italic">Collections</span>
          </motion.h1>
        </div>
      </section>

      {/* DYNAMIC FILTER TABS */}
      <section className="sticky top-0 z-40 bg-[#080808]/80 backdrop-blur-md py-6 border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-2">
            {filterCategories.map(category => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-5 py-2 text-[10px] tracking-widest uppercase transition-all rounded-full border ${
                  activeFilter === category
                    ? 'bg-amber-600 border-amber-600 text-white shadow-lg shadow-amber-600/20'
                    : 'border-white/10 text-white/40 hover:border-white/20'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCT GRID */}
      <section className="py-20 min-h-[400px]">
        <div className="container mx-auto px-6">
          <AnimatePresence mode="wait">
            {filteredCollections.length > 0 ? (
              <motion.div
                key={activeFilter}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
              >
                {filteredCollections.map((product, index) => (
                  <CollectionCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    image={product.image}
                    tagline={product.description}
                    index={index}
                    size={getCardSize(index)}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20 border border-dashed border-white/10 rounded-[3rem]"
              >
                <p className="text-white/20 uppercase tracking-widest text-sm">
                  No products found in {activeFilter}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CollectionsPage;