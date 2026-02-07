import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Product } from '@/data/products';

interface ProductCardProps {
  product: Product;
  index: number;
}

const ProductCard = ({ product, index }: ProductCardProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Link to={`/product/${product.id}`} className="group block">
        {/* Image Container */}
        <div className="relative aspect-[4/5] overflow-hidden bg-card mb-6">
          <motion.img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
          
          {/* Hover Overlay - Subtle in light mode */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 dark:bg-background/0 dark:group-hover:bg-background/20 transition-all duration-500" />
          
          {/* Quick View */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileHover={{ opacity: 1, y: 0 }}
            className="absolute bottom-6 left-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          >
            <span className="block w-full py-3 text-center text-sm tracking-[0.2em] uppercase text-champagne border border-champagne/50 bg-white/90 dark:bg-background/80 backdrop-blur-sm font-body">
              View Details
            </span>
          </motion.div>
        </div>

        {/* Product Info */}
        <div className="space-y-2">
          <h3 className="font-display text-xl text-foreground group-hover:text-champagne transition-colors duration-300">
            {product.name}
          </h3>
          <p className="text-champagne/80 text-lg font-body">
            {formatPrice(product.price)}
          </p>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
