import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { getProductsByCategory, categories } from '@/data/products';

const CategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const products = getProductsByCategory(categoryId || '');
  const category = categories.find(c => c.id === categoryId);

  return (
    <div className="min-h-screen bg-background">
      <Header isVisible={true} />
      
      {/* Hero */}
      <section className="pt-32 pb-16 md:pb-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-cream/50 hover:text-champagne transition-colors duration-300 mb-8 font-body"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm tracking-wider">Back to Home</span>
            </Link>

            <span className="block text-champagne/60 text-sm tracking-[0.4em] uppercase mb-4 font-body">
              Collection
            </span>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-cream tracking-wide">
              {category?.name || 'Products'}
            </h1>
            <p className="text-cream/50 mt-4 text-lg font-body max-w-xl">
              {category?.description}
            </p>
            <div className="w-24 h-[1px] bg-champagne/40 mt-8" />
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="pb-24 md:pb-32">
        <div className="container mx-auto px-6">
          {products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
              {products.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-cream/50 text-lg font-body">
                No products found in this category.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CategoryPage;
