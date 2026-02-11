import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import CategoryCard from "./CategoryCard";

import chairsImage from "@/assets/category-chairs.jpg";
import sofasImage from "@/assets/category-sofas.jpg";
import lampsImage from "@/assets/category-lamps.jpg";
import tablesImage from "@/assets/category-tables1.jpg";

const categories = [
  { id: "chairs", name: "Chairs", image: chairsImage, description: "Timeless seating crafted for distinction" },
  { id: "sofas", name: "Sofas", image: sofasImage, description: "Luxurious comfort, designed to impress" },
  { id: "lamps", name: "Lamps", image: lampsImage, description: "Illuminate with elegance and style" },
  { id: "tables", name: "Tables", image: tablesImage, description: "Statement pieces for refined spaces" },
];

const CategorySection = () => {
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-champagne/60 tracking-[0.4em] uppercase text-sm">
            Collections
          </span>
          <h2 className="text-5xl md:text-6xl font-display mt-4">
            Curated Excellence
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              to={`/collections?category=${category.id}`}
              className="block"
            >
              <CategoryCard
                id={category.id}
                name={category.name}
                image={category.image}
                description={category.description}
                index={index}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
