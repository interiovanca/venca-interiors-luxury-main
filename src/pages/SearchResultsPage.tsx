import React, { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, ChevronDown, Check, LayoutGrid, LayoutList, Search } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Product {
  id: string;
  name: string;
  title?: string;
  price: number;
  image?: string;
  images?: string[];
  category: string;
  description?: string;
}

export default function SearchResultsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const rawQuery = searchParams.get('q') || '';
  const navigate = useNavigate();

  const [inventory, setInventory] = useState<Product[]>([]);
  const [results, setResults] = useState<Product[]>([]);

  // Filters & State
  const [sortBy, setSortBy] = useState<'relevance' | 'price_low' | 'price_high' | 'newest'>('relevance');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const fallbackImage = "/assets/images/products/products-47.webp";

  useEffect(() => {
    window.scrollTo(0, 0);
    const stored = localStorage.getItem('vanca_inventory');
    if (stored) {
      setInventory(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    if (!inventory.length) return;

    const lowerQ = rawQuery.toLowerCase();
    let filtered = inventory.filter((p) => {
      const name = (p.name || p.title || "").toLowerCase();
      const cat = (p.category || "").toLowerCase();
      const desc = (p.description || "").toLowerCase();

      const searchMatch = !lowerQ || name.includes(lowerQ) || cat.includes(lowerQ) || desc.includes(lowerQ);
      const catMatch = categoryFilter === 'All' || p.category === categoryFilter;

      return searchMatch && catMatch;
    });

    // Sorting
    if (sortBy === 'price_low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price_high') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'newest') {
      // Fake newest by reversing if no date
      filtered.reverse();
    }

    setResults(filtered);
  }, [rawQuery, inventory, categoryFilter, sortBy]);

  const allCategories = ['All', ...Array.from(new Set(inventory.map(p => p.category).filter(Boolean)))];

  return (
    <div className="min-h-screen bg-background dark:bg-[#050505] text-foreground transition-colors duration-300">
      <Header isVisible={true} />

      <main className="pt-32 pb-24 container mx-auto px-6 max-w-7xl">

        {/* HEADER */}
        <div className="mb-10 text-center md:text-left">
          <p className="text-xs uppercase tracking-widest text-[#a79d93] mb-2">Search Results</p>
          <h1 className="font-display text-4xl lg:text-5xl text-gray-900 dark:text-cream">
            {rawQuery ? `"${rawQuery}"` : "All Products"}
          </h1>
          <p className="text-sm font-body text-gray-500 mt-2">{results.length} products found</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* SIDEBAR FILTERS */}
          <div className="w-full lg:w-[240px] shrink-0 space-y-8">
            {/* Category Filter */}
            <div>
              <h3 className="text-xs uppercase tracking-widest font-bold mb-4 text-gray-900 dark:text-cream border-b border-gray-200 dark:border-white/10 pb-2">Category</h3>
              <ul className="space-y-2">
                {allCategories.map(cat => (
                  <li key={cat}>
                    <button
                      onClick={() => setCategoryFilter(cat)}
                      className={`text-sm tracking-wide flex items-center justify-between w-full transition-colors ${categoryFilter === cat ? 'text-amber-600 font-semibold' : 'text-gray-500 hover:text-gray-900 dark:hover:text-cream'}`}
                    >
                      <span>{cat}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sort Order */}
            <div>
              <h3 className="text-xs uppercase tracking-widest font-bold mb-4 text-gray-900 dark:text-cream border-b border-gray-200 dark:border-white/10 pb-2">Sort By</h3>
              <div className="space-y-3 relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full appearance-none bg-white dark:bg-[#121212] border border-gray-200 dark:border-white/10 text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-amber-500 text-gray-800 dark:text-cream shadow-sm cursor-pointer"
                >
                  <option value="relevance">Relevance</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                  <option value="newest">Newest Arrivals</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div className="hidden lg:flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg border transition-colors ${viewMode === 'grid' ? 'border-amber-500 text-amber-500 bg-amber-500/10' : 'border-gray-200 dark:border-white/10 text-gray-400'}`}
              >
                <LayoutGrid size={18} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg border transition-colors ${viewMode === 'list' ? 'border-amber-500 text-amber-500 bg-amber-500/10' : 'border-gray-200 dark:border-white/10 text-gray-400'}`}
              >
                <LayoutList size={18} />
              </button>
            </div>
          </div>

          {/* RESULTS GRID / LIST */}
          <div className="flex-1 w-full relative min-h-[50vh]">
            {results.length === 0 ? (
              <div className="text-center py-20 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-3xl h-full flex flex-col items-center justify-center">
                <Search size={40} className="text-gray-300 dark:text-gray-600 mb-4" />
                <h3 className="font-display text-2xl text-gray-900 dark:text-white mb-2">No exact matches</h3>
                <p className="text-gray-500 text-sm">We couldn't find anything matching "{rawQuery}". Try refining your search or checking spelling.</p>
                <button
                  onClick={() => { setCategoryFilter('All'); setSearchParams({}); }}
                  className="mt-6 px-6 py-2.5 bg-black dark:bg-white text-white dark:text-black rounded-full text-xs uppercase tracking-widest font-medium hover:bg-amber-600 dark:hover:bg-amber-500 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6' : 'flex flex-col gap-6'}>
                <AnimatePresence>
                  {results.map((item, i) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4, delay: i * 0.05 }}
                      key={item.id}
                    >
                      <Link
                        to={`/product/${item.id}`}
                        className={`group block bg-white dark:bg-[#0a0a0a] rounded-2xl border border-gray-100 dark:border-white/5 overflow-hidden shadow-sm hover:shadow-xl hover:border-amber-500/30 transition-all ${viewMode === 'list' ? 'flex flex-row items-center gap-6 h-40 pr-6' : ''}`}
                      >
                        <div className={`relative overflow-hidden bg-gray-100 dark:bg-white/5 shrink-0 ${viewMode === 'list' ? 'w-40 h-full' : 'w-full aspect-square'}`}>
                          <img
                            src={item.image || (item.images && item.images[0]) || fallbackImage}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 mix-blend-multiply dark:mix-blend-normal"
                            alt=""
                          />
                        </div>
                        <div className={`p-5 flex flex-col justify-center ${viewMode === 'list' ? 'flex-1 py-0' : ''}`}>
                          <p className="text-[10px] uppercase tracking-widest text-[#a79d93] mb-1">{item.category}</p>
                          <h3 className="text-lg font-display text-gray-900 dark:text-cream group-hover:text-amber-600 transition-colors line-clamp-2 md:line-clamp-1">
                            {item.name || item.title}
                          </h3>
                          {viewMode === 'list' && (
                            <p className="text-gray-500 text-sm mt-2 line-clamp-2 hidden sm:block">{item.description}</p>
                          )}
                          <p className="mt-4 font-display text-xl text-gray-900 dark:text-cream">₹{Number(item.price).toLocaleString()}</p>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
