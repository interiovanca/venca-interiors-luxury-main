import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag, ArrowLeft, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Wishlist = () => {
  const navigate = useNavigate();

  const [items, setItems] = React.useState([
    { id: 1, name: 'Minimalist Oak Chair', price: '₹12,000', stock: true, img: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?ixlib=rb-4.0.3&w=300&q=80' },
    { id: 2, name: 'Velvet Lounge Sofa', price: '₹95,000', stock: false, img: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-4.0.3&w=300&q=80' },
    { id: 3, name: 'Marble Coffee Table', price: '₹34,000', stock: true, img: 'https://images.unsplash.com/photo-1532372576444-ea2ba3b4c107?ixlib=rb-4.0.3&w=300&q=80' }
  ]);

  const removeItem = (id: number) => setItems(items.filter(item => item.id !== id));

  return (
    <div className="min-h-screen bg-[#F5F2EC] font-sans pb-20">

      <div className="bg-[#2A2520] pt-12 pb-16 px-6 lg:px-20 text-white rounded-b-[3rem] relative shadow-xl overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] opacity-10 blur-sm mix-blend-overlay" />
        <div className="relative z-10 max-w-7xl mx-auto">
          <button onClick={() => navigate('/user/dashboard')} className="flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-6 text-xs uppercase font-bold tracking-[0.2em]">
            <ArrowLeft className="w-4 h-4" /> Go Back
          </button>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-rose-500/20 rounded-2xl flex items-center justify-center border border-rose-500/30">
              <Heart className="w-6 h-6 text-rose-400 fill-rose-400" />
            </div>
            <div>
              <h1 className="text-4xl font-display font-light">My Favorites</h1>
              <p className="text-white/60 text-sm mt-1">{items.length} Curated Luxury Pieces</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-8 relative z-20">
        {items.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-[2rem] p-16 text-center shadow-xl border border-[#EAE4D7]">
            <Heart className="w-16 h-16 text-[#EAE4D7] mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-[#2A2520] mb-2">Your wishlist is empty</h2>
            <p className="text-[#6D655E] mb-8">Discover our premium collections and add your favorites here.</p>
            <Button onClick={() => navigate('/collection')} className="bg-[#BDA183] hover:bg-[#8C745A] text-white rounded-xl h-12 px-8">Browse Collections</Button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  key={item.id}
                  className="bg-white rounded-[2rem] p-4 shadow-md border border-[#EAE4D7] flex flex-col group hover:shadow-2xl transition-shadow"
                >
                  <div className="relative w-full h-64 rounded-2xl overflow-hidden bg-[#F5F2EC] mb-5">
                    <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <button
                      onClick={() => removeItem(item.id)}
                      className="absolute top-4 right-4 w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-colors shadow-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    {!item.stock && (
                      <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1.5 rounded-full">
                        Out of Stock
                      </div>
                    )}
                  </div>

                  <div className="flex-1 px-2 flex flex-col">
                    <h3 className="text-lg font-bold text-[#2A2520] mb-1">{item.name}</h3>
                    <p className="font-display font-medium text-amber-600 text-lg mb-4">{item.price}</p>

                    <Button
                      disabled={!item.stock}
                      className={`mt-auto w-full h-12 rounded-xl flex items-center justify-center gap-2 font-semibold shadow-md transition-colors ${item.stock
                          ? 'bg-[#2A2520] hover:bg-[#1A1714] text-white'
                          : 'bg-[#F5F2EC] text-[#A79D93] border border-[#EAE4D7]'
                        }`}
                    >
                      <ShoppingBag className="w-4 h-4" />
                      {item.stock ? 'Move to Cart' : 'Notify When Available'}
                    </Button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};
