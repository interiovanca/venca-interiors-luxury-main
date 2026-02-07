import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const POPUP_DELAY = 1000; // 1000ms delay

const NewsletterPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    // Run only in browser
    if (typeof window === 'undefined') return;

    // Show popup only on landing page
    if (window.location.pathname !== '/') return;

    // Prevent reopening in same session (StrictMode safe)
    if (sessionStorage.getItem('newsletter_popup_seen')) return;

    // Mark as seen immediately to avoid double-trigger
    sessionStorage.setItem('newsletter_popup_seen', 'true');

    const timer = setTimeout(() => {
      setIsOpen(true);
    }, POPUP_DELAY);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Newsletter subscription:', email);
    handleClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="relative z-10 flex flex-col md:flex-row w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-luxury rounded-lg"
          >
            {/* Top/Left - Image */}
            <div className="w-full md:w-1/2 relative h-40 sm:h-48 md:h-auto flex-shrink-0">
              <img
                src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80"
                alt="Luxury Interior"
                className="w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-transparent to-black/20" />
            </div>

            {/* Bottom/Right - Form */}
            <div className="w-full md:w-1/2 bg-[#2a2a2a] p-6 sm:p-8 md:p-12 flex flex-col justify-center relative overflow-y-auto">
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors duration-300"
                aria-label="Close popup"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="space-y-6">
                <span className="text-champagne text-xs tracking-[0.3em] uppercase font-body">
                  Welcome to the world of Vanca
                </span>

                <h2 className="font-display text-3xl md:text-4xl text-white tracking-wide">
                  Hello there!
                </h2>

                <p className="text-white/60 text-sm leading-relaxed font-body">
                  Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@newsletter.com"
                    required
                    className="w-full bg-transparent border border-white/20 px-4 py-3 text-white placeholder:text-white/40 focus:border-champagne focus:outline-none transition-colors duration-300 font-body text-sm"
                  />

                  <button
                    type="submit"
                    className="w-full bg-champagne text-black py-3 text-sm tracking-[0.2em] uppercase font-body hover:bg-champagne-light transition-colors duration-300"
                  >
                    Join
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NewsletterPopup;
