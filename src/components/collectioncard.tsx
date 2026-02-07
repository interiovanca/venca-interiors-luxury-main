import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface CategoryCardProps {
  id: string;
  name: string;
  image: string;
  description: string;
  index: number;
}

const CategoryCard = ({ id, name, image, description, index }: CategoryCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, delay: index * 0.15 }}
    >
      <Link to={`/category/${id}`} className="group block relative overflow-hidden">
        <div className="aspect-[4/5] relative overflow-hidden bg-card">
          {/* Image */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="absolute inset-0"
          >
            <img 
              src={image} 
              alt={name}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Overlay - Dark mode only */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent dark:from-background dark:via-background/20 dark:to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-8">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 + 0.3 }}
            >
              <h3 className="font-display text-3xl md:text-4xl text-white dark:text-cream tracking-wider mb-3">
                {name}
              </h3>
              <p className="text-white/70 dark:text-cream/50 text-sm tracking-wide font-body">
                {description}
              </p>
              
              {/* Explore Link */}
              <div className="mt-6 flex items-center gap-3 text-champagne">
                <span className="text-sm tracking-[0.2em] uppercase font-body">Explore</span>
                <motion.div
                  className="w-8 h-[1px] bg-champagne origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1.5 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          </div>

          {/* Border Animation */}
          <div className="absolute inset-0 border border-champagne/0 group-hover:border-champagne/30 transition-all duration-500" />
        </div>
      </Link>
    </motion.div>
  );
};

export default CategoryCard;
