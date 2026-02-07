import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import aboutImage from '@/assets/about-interior.jpg';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-[#f5f0df] dark:bg-black transition-colors duration-300">
      <Header isVisible={true} />

      {/* Hero */}
      <section className="pt-32 pb-16 md:pb-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-black/60 dark:text-cream/50 hover:text-champagne transition-colors duration-300 mb-8 font-body"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm tracking-wider">Back to Home</span>
            </Link>

            <span className="block text-champagne/60 text-sm tracking-[0.4em] uppercase mb-4 font-body">
              About Us
            </span>

            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-black dark:text-cream tracking-wide max-w-3xl">
              Crafting Extraordinary Spaces
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Image */}
      <section className="pb-16 md:pb-24 overflow-hidden">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative aspect-[21/9] overflow-hidden rounded-sm"
          >
            <img
              src={aboutImage}
              alt="Vanca Interio Showroom"
              className="w-full h-full object-cover"
            />

            {/* Soft overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 dark:from-black/40 to-transparent pointer-events-none" />
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-24 md:pb-32">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

            {/* Left */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-display text-3xl md:text-4xl text-black dark:text-cream mb-6">
                Our Philosophy
              </h2>

              <p className="text-black/70 dark:text-cream/60 leading-relaxed font-body mb-6">
                At Vanca Interio, we believe that exceptional design transcends mere aesthetics.
                Every piece in our collection represents a harmonious blend of artisanal
                craftsmanship and contemporary innovation.
              </p>

              <p className="text-black/70 dark:text-cream/60 leading-relaxed font-body">
                Founded on principles of excellence and attention to detail, we curate
                furniture and décor that transforms spaces into sanctuaries of refined living.
              </p>
            </motion.div>

            {/* Right */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="font-display text-3xl md:text-4xl text-black dark:text-cream mb-6">
                Our Promise
              </h2>

              <p className="text-black/70 dark:text-cream/60 leading-relaxed font-body mb-6">
                We partner with master craftsmen and renowned designers from across Europe
                to bring you furniture that embodies timeless elegance and uncompromising quality.
              </p>

              <p className="text-black/70 dark:text-cream/60 leading-relaxed font-body">
                Each creation undergoes rigorous quality assessment, ensuring that what
                enters your home is nothing short of extraordinary.
              </p>
            </motion.div>

          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
          >
            {[
              { number: '25+', label: 'Years of Excellence' },
              { number: '150+', label: 'Artisan Partners' },
              { number: '5000+', label: 'Curated Pieces' },
              { number: '40+', label: 'Global Destinations' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <span className="font-display text-4xl md:text-5xl text-champagne">
                  {stat.number}
                </span>

                <p className="text-black/60 dark:text-cream/50 text-sm mt-2 font-body tracking-wide">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
