import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingBag, Plus, Minus, MoveRight, Check } from 'lucide-react';
import { toast } from 'sonner';
import { useCart } from '../context/CartContext';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

const FALLBACK_IMAGE = '/assets/images/collections/collections-14.webp';

export default function ProductDetailPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const data = JSON.parse(localStorage.getItem('vanca_inventory') || '[]');
    const found = data.find((p: any) => p.id === id);
    if (found) {
      setProduct({
        ...found,
        images: found.images && found.images.length > 0 ? found.images : [found.image || FALLBACK_IMAGE],
        price: found.price || 0,
      });
    }
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-background dark:bg-[#050505] flex items-center justify-center">
        <div className="text-center font-body">
          <p className="text-black/50 dark:text-white/50 mb-4 text-lg">Product not found.</p>
          <Link to="/collection" className="text-amber-600 hover:text-amber-500 flex items-center justify-center gap-2 uppercase tracking-widest text-sm transition-colors">
            <ArrowLeft size={16} /> Back to Collection
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    setIsAdding(true);

    addToCart({
      id: product.id,
      name: product.title || product.name || 'Vanca Signature',
      price: Number(product.price) || 0,
      image: product.images[0] || FALLBACK_IMAGE,
      quantity,
      category: product.category || 'Luxury Collection'
    });

    setTimeout(() => {
      setIsAdding(false);
      toast.success(`${quantity}x ${product.title || product.name} added to your cart`);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-background dark:bg-[#050505] transition-colors duration-300 text-black dark:text-cream">
      <Header isVisible={true} />

      <main className="pt-32 pb-24 container mx-auto px-6 max-w-7xl">
        <Link to="/collection" className="inline-flex items-center gap-2 text-xs md:text-sm uppercase tracking-widest text-black/50 dark:text-white/50 hover:text-amber-600 dark:hover:text-amber-500 mb-10 transition-colors font-medium">
          <ArrowLeft size={14} /> Back to Collections
        </Link>

        <div className="flex flex-col lg:flex-row gap-16 xl:gap-24">

          {/* IMAGE GALLERY */}
          <div className="w-full lg:w-1/2 space-y-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="aspect-[4/5] bg-black/5 dark:bg-white/5 rounded-3xl overflow-hidden relative shadow-sm border border-black/5 dark:border-white/5"
            >
              <img
                src={product.images[activeImage]}
                alt={product.title || product.name || 'Product Image'}
                className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal"
              />
            </motion.div>

            {product.images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {product.images.map((img: string, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`shrink-0 w-24 h-24 rounded-xl overflow-hidden border-2 transition-all ${activeImage === idx ? 'border-amber-600 dark:border-amber-500 opacity-100 shadow-md' : 'border-transparent opacity-50 hover:opacity-100'
                      }`}
                  >
                    <img src={img} className="w-full h-full object-cover" alt="" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* PRODUCT INFO */}
          <div className="w-full lg:w-1/2 flex flex-col justify-start pt-4 lg:pt-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center justify-between mb-4">
                <p className="text-amber-700 dark:text-amber-500 font-medium tracking-[0.2em] uppercase text-xs">
                  {product.category || 'Luxury Collection'}
                </p>
                <span className="text-xs tracking-widest uppercase border border-black/10 dark:border-white/10 px-3 py-1 rounded-full text-black/50 dark:text-white/50">
                  In Stock
                </span>
              </div>

              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight mb-6 leading-[1.1]">
                {product.title || product.name || 'Vanca Signature'}
              </h1>

              <p className="font-display text-2xl lg:text-3xl font-light tracking-wide mb-10 text-black/80 dark:text-white/90">
                ₹{Number(product.price).toLocaleString()}
              </p>

              <div className="w-full h-[1px] bg-black/10 dark:bg-white/10 mb-10" />

              <p className="font-body text-base lg:text-lg leading-relaxed text-black/60 dark:text-white/60 mb-12 shrink-0">
                {product.description || 'Elevate your space with our meticulously crafted luxury design, blending timeless aesthetics with uncompromised comfort. Masterfully developed to transform any interior into a sanctuary of elegance.'}
              </p>

              {/* CONTROLS */}
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center mb-16">
                <div className="flex items-center border border-black/20 dark:border-white/20 rounded-full p-1 w-32 h-14 bg-transparent shrink-0">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="w-10 h-full flex items-center justify-center text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="flex-1 text-center font-medium font-body text-black dark:text-white">{quantity}</span>
                  <button
                    onClick={() => setQuantity(q => q + 1)}
                    className="w-10 h-full flex items-center justify-center text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={isAdding}
                  className="flex-1 w-full h-14 bg-[#1a1a1a] dark:bg-card text-white dark:text-black rounded-full flex items-center justify-center gap-3 hover:bg-black dark:hover:bg-cream transition-all font-body tracking-[0.15em] uppercase text-[11px] sm:text-xs shadow-xl shadow-black/5"
                >
                  {isAdding ? (
                    <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.4 }}>
                      <Check size={18} />
                    </motion.div>
                  ) : (
                    <>
                      <ShoppingBag size={16} /> Add to Cart
                    </>
                  )}
                </button>
              </div>

              {/* ACCORDION DETAILS */}
              <div className="space-y-0 border-t border-black/10 dark:border-white/10">
                {[
                  { title: "Product Details & Specifications", content: `This exquisite piece features intricate design details with superior materials. Originating from curated raw materials and finished to a premium standard perfectly aligning with Vanca Interio's luxury ethos.` },
                  { title: "Dimensions & Care Instructions", content: "To maintain the pristine condition, clean with a soft, slightly damp cloth. Avoid harsh chemicals and prolonged exposure to direct sunlight." },
                  { title: "Delivery & Returns Available", content: "Complimentary White-glove delivery available. Returns are accepted within 30 days for unused items in their original protective packaging." }
                ].map((item, i) => (
                  <details key={i} className="group border-b border-black/10 dark:border-white/10 py-5">
                    <summary className="flex items-center justify-between text-xs md:text-sm uppercase tracking-widest font-medium cursor-pointer list-none text-black dark:text-cream hover:text-amber-600 dark:hover:text-amber-500 transition-colors">
                      {item.title}
                      <span className="transition group-open:rotate-180">
                        <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                      </span>
                    </summary>
                    <p className="text-black/60 dark:text-white/60 mt-4 leading-loose font-body text-sm md:text-base pr-6">
                      {item.content}
                    </p>
                  </details>
                ))}
              </div>

            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
