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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: 'easeOut' }}
      className="w-full"
    >
      <Link
        to={`/category/${id}`}
        className="group relative block overflow-hidden rounded-2xl bg-[#f5f3ef]"
      >
        {/* Image */}
        <div className="aspect-[4/5] relative overflow-hidden">
          <motion.img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.06 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          />

          {/* Warm furniture overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-70 group-hover:opacity-85 transition-opacity duration-500" />
        </div>

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-8">
          <h3 className="font-serif text-2xl md:text-3xl text-white tracking-wide mb-2">
            {name}
          </h3>

          <p className="text-white/70 text-sm max-w-xs leading-relaxed">
            {description}
          </p>

          {/* CTA */}
          <div className="mt-6 inline-flex items-center gap-3">
            <span className="text-xs tracking-[0.25em] uppercase text-white font-medium">
              View Collection
            </span>
            <span className="block w-10 h-[1px] bg-white/60 group-hover:w-16 transition-all duration-300" />
          </div>
        </div>

        {/* Luxury border */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl border border-white/10 group-hover:border-white/30 transition-colors duration-500" />
      </Link>
    </motion.div>
  );
};

export default CategoryCard;
