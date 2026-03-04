import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronDown, MessageCircle, HelpCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const faqs = [
  {
    category: "General & Design",
    questions: [
      {
        q: "What makes Vanca Interio designs unique?",
        a: "Every piece in our collection represents a harmonious blend of artisanal craftsmanship and contemporary innovation. We focus on rigorous quality assessment, sourcing only premium materials, and collaborating with renowned designers to create timeless sanctuaries of refined living."
      },
      {
        q: "Do you offer bespoke or custom furniture design?",
        a: "Yes, we proudly offer bespoke services for clients seeking highly personalized interior solutions. Our expert design consultants will work closely with you to tailor dimensions, finishes, and fabrics to perfectly match your exclusive vision."
      },
      {
        q: "Where are your luxury pieces manufactured?",
        a: "We partner with master craftsmen across Europe and select global artisan hubs. Our manufacturing process prioritizes traditional, generational techniques combined with state-of-the-art precision machinery."
      }
    ]
  },
  {
    category: "Orders & Shipping",
    questions: [
      {
        q: "What is your standard delivery timeline?",
        a: "For our curated ready-to-ship collection, delivery typically takes 1-2 weeks. Bespoke or customized orders require a longer lead time, generally ranging from 8-12 weeks, depending on the complexity of the craftsmanship involved."
      },
      {
        q: "Do you offer White Glove delivery service?",
        a: "Absolutely. We provide a premium White Glove delivery service. Our professional team will carefully transport your furniture, handle all assembly in your room of choice, and remove all packaging materials, ensuring a completely seamless experience."
      },
      {
        q: "Can I track my order status?",
        a: "Yes, once your order is confirmed, you will receive access to your personalized Order Tracking dashboard, where you can monitor the real-time progress of your pieces from our atelier to your home."
      }
    ]
  },
  {
    category: "Care & Warranty",
    questions: [
      {
        q: "What kind of warranty comes with Vanca Interio products?",
        a: "We stand behind the exceptional quality of our creations. All our furniture comes with an exclusive 5-year structural warranty, giving you peace of mind that your investment is protected against any manufacturing defects."
      },
      {
        q: "How should I care for and maintain my luxury furniture?",
        a: "Each piece arrives with a specific care guide tailored to its materials—be it Italian leather, solid mahogany, or premium velvet. Generally, we recommend avoiding direct sunlight and using our approved specialized cleaning products."
      }
    ]
  }
];

const FaqItem = ({ question, answer, isOpen, onClick }: { question: string, answer: string, isOpen: boolean, onClick: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="border-b border-black/10 dark:border-white/10"
    >
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between py-6 text-left focus:outline-none group"
      >
        <h3 className="text-lg md:text-xl font-display text-black dark:text-cream group-hover:text-champagne transition-colors duration-300">
          {question}
        </h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="flex-shrink-0 ml-4 w-8 h-8 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center shadow-sm group-hover:border-champagne group-hover:bg-champagne/10 transition-colors"
        >
          <ChevronDown className="w-4 h-4 text-black/60 dark:text-cream/60 group-hover:text-champagne" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-black/70 dark:text-cream/60 font-body leading-relaxed max-w-3xl pr-8">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FaqPage = () => {
  const [openIndexes, setOpenIndexes] = useState<Record<string, number | null>>({});

  const toggleAccordion = (categoryIndex: number, questionIndex: number) => {
    setOpenIndexes(prev => ({
      ...prev,
      [categoryIndex]: prev[categoryIndex] === questionIndex ? null : questionIndex
    }));
  };

  return (
    <div className="min-h-screen bg-background dark:bg-[#050505] transition-colors duration-300">
      <Header isVisible={true} />

      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pb-24 relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-champagne/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-40 right-1/4 w-64 h-64 bg-amber-500/5 rounded-full blur-[80px] pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-black/60 dark:text-cream/50 hover:text-champagne transition-colors duration-300 mb-8 font-body mx-auto"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm tracking-wider">Back to Home</span>
            </Link>

            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-3xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center backdrop-blur-md shadow-lg">
                <HelpCircle className="w-8 h-8 text-champagne" />
              </div>
            </div>

            <h1 className="font-display text-5xl md:text-6xl text-black dark:text-cream tracking-wide mb-6">
              Frequently Asked Questions
            </h1>

            <p className="text-black/70 dark:text-cream/60 font-body text-lg max-w-2xl mx-auto leading-relaxed">
              Find answers to common questions about our bespoke collections, delivery services, and luxury commitment.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Content Section */}
      <section className="pb-24 md:pb-32 relative z-10">
        <div className="container mx-auto px-6 max-w-4xl">
          {faqs.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              className="mb-16 last:mb-0"
            >
              <h2 className="text-sm font-body tracking-[0.2em] uppercase text-champagne mb-8 border-l-2 border-champagne pl-4">
                {category.category}
              </h2>

              <div className="bg-white/40 dark:bg-[#0a0a0a]/60 backdrop-blur-xl border border-black/5 dark:border-white/5 rounded-[2rem] p-6 md:p-10 shadow-xl shadow-black/5 dark:shadow-black/40">
                {category.questions.map((item, questionIndex) => (
                  <FaqItem
                    key={questionIndex}
                    question={item.q}
                    answer={item.a}
                    isOpen={openIndexes[categoryIndex] === questionIndex}
                    onClick={() => toggleAccordion(categoryIndex, questionIndex)}
                  />
                ))}
              </div>
            </motion.div>
          ))}

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 p-8 md:p-12 bg-black dark:bg-[#0a0a0a] border border-white/5 rounded-[2rem] text-center relative overflow-hidden shadow-2xl"
          >
            {/* Soft inner glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-champagne/10 to-transparent pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center">
              <MessageCircle className="w-10 h-10 text-champagne mb-6" />
              <h3 className="font-display text-3xl md:text-4xl text-white mb-4">
                Still have questions?
              </h3>
              <p className="text-white/70 font-body max-w-xl mx-auto mb-8 leading-relaxed">
                Connect with our dedicated design specialists for personalized assistance regarding your luxury interiors.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-champagne text-black font-body text-sm tracking-wider uppercase rounded-full hover:bg-white hover:scale-105 transition-all duration-300 shadow-xl shadow-champagne/20"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FaqPage;
