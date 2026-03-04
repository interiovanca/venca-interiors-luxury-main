import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, History, TrendingUp, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

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

export default function SearchBar() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [results, setResults] = useState<Product[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [inventory, setInventory] = useState<Product[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  const fallbackImage = "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&q=80";

  // Load Inventory & Recents
  useEffect(() => {
    const raw = localStorage.getItem("vanca_inventory");
    if (raw) setInventory(JSON.parse(raw));

    const recents = localStorage.getItem("vanca_recent_searches");
    if (recents) setRecentSearches(JSON.parse(recents));
  }, []);

  // Debounced Search Logic
  useEffect(() => {
    const handler = setTimeout(() => {
      if (!query.trim()) {
        setResults([]);
        return;
      }
      const lowerQ = query.toLowerCase();

      const matched = inventory.filter((p) => {
        const name = (p.name || p.title || "").toLowerCase();
        const cat = (p.category || "").toLowerCase();
        const desc = (p.description || "").toLowerCase();
        return name.includes(lowerQ) || cat.includes(lowerQ) || desc.includes(lowerQ);
      });

      setResults(matched.slice(0, 5)); // Limit to 5 suggestions
    }, 300);

    return () => clearTimeout(handler);
  }, [query, inventory]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (val: string) => {
    if (!val.trim()) return;

    // Save to recents
    const lowerVal = val.toLowerCase();
    const updatedRecents = [lowerVal, ...recentSearches.filter((r) => r !== lowerVal)].slice(0, 5);
    setRecentSearches(updatedRecents);
    localStorage.setItem("vanca_recent_searches", JSON.stringify(updatedRecents));

    setIsOpen(false);
    setIsFocused(false);
    navigate(`/search?q=${encodeURIComponent(val)}`);
  };

  const handleProductClick = (id: string) => {
    setIsOpen(false);
    setIsFocused(false);
    navigate(`/product/${id}`);
  };

  const categories = ["Seating", "Tables", "Lighting", "Décor"];

  return (
    <div ref={searchRef} className={`relative transition-all duration-300 ease-in-out ${isFocused ? "w-[280px] md:w-[360px]" : "w-[40px]"}`}>

      {/* Search Input Bar */}
      <div
        onClick={() => {
          if (!isFocused) {
            setIsOpen(true);
            setIsFocused(true);
          }
        }}
        className={`flex items-center h-10 rounded-full transition-all duration-300 ease-in-out border overflow-hidden ${isFocused
            ? "bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.08)] ring-2 ring-gray-100/50 dark:ring-0 w-full"
            : "bg-transparent border-transparent hover:bg-white/10 w-10 cursor-pointer"
          }`}
      >
        <div
          onClick={(e) => {
            if (isFocused && query.trim()) {
              e.stopPropagation();
              handleSearchSubmit(query);
            }
          }}
          className={`w-10 h-10 flex items-center justify-center shrink-0 transition-colors duration-300 ${isFocused ? "text-gray-500 hover:text-gray-900 dark:text-white/50 dark:hover:text-white cursor-pointer" : "text-white/70 text-white cursor-pointer"
            }`}
        >
          <Search size={16} className={isFocused ? "opacity-90 transition-opacity" : ""} />
        </div>

        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => {
            setIsFocused(true);
            setIsOpen(true);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearchSubmit(query);
          }}
          placeholder="Search products..."
          className={`bg-transparent border-none outline-none font-medium h-full transition-all duration-300 ease-in-out ${isFocused
              ? "w-full opacity-100 px-2 text-gray-900 dark:text-white text-sm placeholder:text-gray-400 dark:placeholder:text-white/40"
              : "w-0 opacity-0 px-0 pointer-events-none"
            }`}
        />

        <AnimatePresence>
          {query && isFocused && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={(e) => { e.stopPropagation(); setQuery(""); }}
              className="w-10 h-10 flex items-center justify-center shrink-0 text-gray-400 hover:text-gray-600 dark:text-white/40 dark:hover:text-white transition-colors"
            >
              <X size={14} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* DROPDOWN PANEL (Glassmorphism) */}
      <AnimatePresence>
        {isOpen && isFocused && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="absolute top-[calc(100%+16px)] right-0 w-[300px] md:w-[480px] bg-white dark:bg-[#1a1a1a]/90 backdrop-blur-xl border border-gray-100 dark:border-white/10 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] dark:shadow-2xl overflow-hidden z-50 text-foreground"
          >
            <div className="p-4 max-h-[70vh] overflow-y-auto custom-scrollbar">

              {/* DEFAULT VIEW (No Query) */}
              {!query.trim() && (
                <div className="space-y-6">
                  {recentSearches.length > 0 && (
                    <div>
                      <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-[#a79d93] mb-3 px-2 flex justify-between items-center">
                        Recent Searches
                        <button onClick={() => { setRecentSearches([]); localStorage.removeItem("vanca_recent_searches"); }} className="text-gray-400 hover:text-gray-600 dark:text-white/40 dark:hover:text-white text-[10px] transition-colors">Clear</button>
                      </h4>
                      <div className="flex flex-wrap gap-2 px-2">
                        {recentSearches.map((term, i) => (
                          <button key={i} onClick={() => { setQuery(term); handleSearchSubmit(term); }} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-50 border border-gray-100 dark:bg-white/5 dark:border-white/5 text-xs text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-white/80 dark:hover:bg-white/10 dark:hover:text-white transition-colors">
                            <History size={12} /> {term}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-[#a79d93] mb-3 px-2">Trending Categories</h4>
                    <div className="grid grid-cols-2 gap-2 px-2">
                      {categories.map((cat, i) => (
                        <button key={i} onClick={() => { setQuery(cat); handleSearchSubmit(cat); }} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-50 border border-transparent hover:bg-gray-100 dark:bg-white/5 dark:border-white/5 dark:hover:bg-white/10 transition-colors text-left group">
                          <TrendingUp size={14} className="text-amber-500/70 group-hover:text-amber-500" />
                          <span className="text-sm text-gray-700 group-hover:text-gray-900 dark:text-white/80 dark:group-hover:text-white">{cat}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* SEARCH RESULTS VIEW */}
              {query.trim() && results.length > 0 && (
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-[#a79d93] mb-3 px-2">Products</h4>
                  <div className="space-y-1">
                    {results.map((product) => (
                      <button
                        key={product.id}
                        onClick={() => handleProductClick(product.id)}
                        className="w-full flex justify-between items-center px-3 py-2.5 hover:bg-gray-50 dark:hover:bg-white/10 rounded-xl transition-colors group text-left"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={product.image || (product.images && product.images[0]) || fallbackImage}
                            alt={product.name || product.title}
                            className="w-10 h-10 object-cover rounded-lg bg-gray-100 dark:bg-black/20"
                          />
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-500 transition-colors">{product.name || product.title}</p>
                            <p className="text-xs text-gray-400 dark:text-white/40">{product.category}</p>
                          </div>
                        </div>
                        <span className="text-sm font-display text-gray-700 dark:text-white/80 hidden md:block">₹{Number(product.price).toLocaleString()}</span>
                      </button>
                    ))}
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-100 dark:border-white/10 px-2">
                    <button
                      onClick={() => handleSearchSubmit(query)}
                      className="w-full flex justify-between items-center text-xs uppercase tracking-widest text-amber-600 dark:text-amber-500 hover:text-amber-500 dark:hover:text-amber-400 font-medium group transition-colors"
                    >
                      See all results for "{query}"
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              )}

              {/* NO RESULTS */}
              {query.trim() && results.length === 0 && (
                <div className="py-10 text-center">
                  <Search size={24} className="mx-auto text-gray-300 dark:text-white/20 mb-3" />
                  <p className="text-sm text-gray-500 dark:text-white/60">No matching products found.</p>
                  <p className="text-xs text-gray-400 dark:text-white/40 mt-1">Try checking your spelling or use general terms.</p>
                </div>
              )}

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
