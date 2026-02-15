import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface CategoryCardProps {
  id: string | number;
  name: string;
  image: string;
  tagline: string; // Dashboard ki description yahan tagline banegi
  price?: number;  // Price field add kiya gaya hai
  index: number;
}

const CategoryCard = ({ id, name, image, tagline, price, index }: CategoryCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
    >
      <Link to={`/product/${id}`} className="group block relative overflow-hidden bg-[#0d0d0d] rounded-2xl border border-white/5">
        <div className="aspect-[4/5] relative overflow-hidden">
          
          {/* IMAGE WITH HOVER ZOOM */}
          <motion.div
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
            className="absolute inset-0"
          >
            <img 
              src={image} 
              alt={name}
              className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
            />
          </motion.div>

          {/* GRADIENT OVERLAY (Premium Dark Look) */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

          {/* PRICE TAG (Dynamic from Admin) */}
          {price && (
            <div className="absolute top-6 right-6 z-10">
              <span className="bg-amber-600/90 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase border border-amber-400/30 shadow-xl shadow-amber-900/20">
                ₹{price.toLocaleString()}
              </span>
            </div>
          )}

          {/* CONTENT SECTION */}
          <div className="absolute inset-0 flex flex-col justify-end p-8 z-20">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="font-display text-2xl md:text-3xl text-white tracking-tight mb-2 group-hover:text-amber-500 transition-colors">
                {name}
              </h3>
              
              <p className="text-white/50 text-xs tracking-wide font-body line-clamp-2 mb-6 max-w-[90%]">
                {tagline}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-amber-500 group-hover:gap-5 transition-all duration-300">
                  <span className="text-[10px] tracking-[0.3em] uppercase font-bold">Details</span>
                  <div className="w-10 h-[1px] bg-amber-600 origin-left" />
                </div>
                
                {/* Visual Indicator for Luxury */}
                <div className="w-2 h-2 rounded-full bg-amber-600/40 border border-amber-600 animate-pulse" />
              </div>
            </motion.div>
          </div>

          {/* INNER BORDER ANIMATION */}
          <div className="absolute inset-4 border border-white/0 group-hover:border-white/10 transition-all duration-700 rounded-xl pointer-events-none" />
        </div>
      </Link>
    </motion.div>
  );
};

export default CategoryCard;