import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Minus, Plus } from "lucide-react";
import { useState } from "react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getProductById } from "@/data/products";
import { Button } from "@/components/ui/button";

/* ----------------------------- */
/* Product Page Component        */
/* ----------------------------- */

const ProductPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const product = getProductById(productId || "");

  const [quantity, setQuantity] = useState(1);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price);
  };

  /* ----------------------------- */
  /* If Product Not Found          */
  /* ----------------------------- */

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-4xl text-cream mb-4">
            Product Not Found
          </h1>

          <Link
            to="/"
            className="text-champagne hover:underline font-body"
          >
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  /* ----------------------------- */
  /* Main Layout                   */
  /* ----------------------------- */

  return (
    <div className="min-h-screen bg-background">
      <Header isVisible={true} />

      <section className="pt-32 pb-24 md:pb-32">
        <div className="container mx-auto px-6">

          {/* Back Link */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              to={`/category/${product.category}`}
              className="inline-flex items-center gap-2 text-cream/50 hover:text-champagne transition-colors duration-300 mb-12 font-body"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm tracking-wider">
                Back to Collection
              </span>
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

            {/* Product Image */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="relative aspect-square bg-charcoal overflow-hidden"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Product Details */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col justify-center"
            >

              <span className="text-champagne/60 text-sm tracking-[0.3em] uppercase font-body mb-4">
                {product.category}
              </span>

              <h1 className="font-display text-4xl md:text-5xl text-cream tracking-wide mb-6">
                {product.name}
              </h1>

              <p className="text-champagne text-3xl font-body mb-8">
                {formatPrice(product.price)}
              </p>

              <div className="w-16 h-[1px] bg-champagne/30 mb-8" />

              <p className="text-cream/60 leading-relaxed font-body mb-8">
                {product.description}
              </p>

              {/* Specifications */}
              <div className="space-y-4 mb-10">

                <div className="flex justify-between py-3 border-b border-charcoal-light">
                  <span className="text-cream/50 text-sm font-body">
                    Material
                  </span>
                  <span className="text-cream text-sm font-body">
                    {product.material}
                  </span>
                </div>

                <div className="flex justify-between py-3 border-b border-charcoal-light">
                  <span className="text-cream/50 text-sm font-body">
                    Dimensions
                  </span>
                  <span className="text-cream text-sm font-body">
                    {product.dimensions}
                  </span>
                </div>

              </div>

              {/* Quantity Selector */}
              <div className="flex items-center gap-6 mb-10">

                <span className="text-cream/50 text-sm font-body tracking-wide">
                  Quantity
                </span>

                <div className="flex items-center border border-charcoal-light">

                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 text-cream/50 hover:text-champagne transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>

                  <span className="w-12 text-center text-cream font-body">
                    {quantity}
                  </span>

                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 text-cream/50 hover:text-champagne transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>

                </div>
              </div>

              {/* Add To Cart */}
              <Button
                variant="luxury"
                size="lg"
                className="w-full md:w-auto"
              >
                Add to Cart
              </Button>

            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProductPage;
