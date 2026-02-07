import { motion } from 'framer-motion';
import CategoryCard from './CategoryCard';
import chairsImage from '@/assets/category-chairs.jpg';
import sofasImage from '@/assets/category-sofas.jpg';
import lampsImage from '@/assets/category-lamps.jpg';
import tablesImage from '@/assets/category-tables.jpg';

const categories = [
  { id: 'chairs', name: 'Chairs', image: chairsImage, description: 'Timeless seating crafted for distinction' },
  { id: 'sofas', name: 'Sofas', image: sofasImage, description: 'Luxurious comfort, designed to impress' },
  { id: 'lamps', name: 'Lamps', image: lampsImage, description: 'Illuminate with elegance and style' },
  { id: 'tables', name: 'Tables', image: tablesImage, description: 'Statement pieces for refined spaces' },
];

const CategorySection = () => {
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-24"
        >
          <span className="text-champagne/60 text-sm tracking-[0.4em] uppercase font-body">Collections</span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mt-4 tracking-wide">
            Curated Excellence
          </h2>
          <div className="w-16 h-[1px] bg-champagne/40 mx-auto mt-8" />
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {categories.map((category, index) => (
            <CategoryCard
              key={category.id}
              id={category.id}
              name={category.name}
              image={category.image}
              description={category.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
