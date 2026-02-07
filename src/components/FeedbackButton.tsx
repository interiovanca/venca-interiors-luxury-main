import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { MessageSquare, X } from 'lucide-react';

type Rating = 1 | 2 | 3 | 4 | 5 | null;

const emojis = [
  { rating: 1 as const, emoji: '😣', label: 'Hate' },
  { rating: 2 as const, emoji: '😕', label: 'Dislike' },
  { rating: 3 as const, emoji: '😐', label: 'Okay' },
  { rating: 4 as const, emoji: '🙂', label: 'Like' },
  { rating: 5 as const, emoji: '😍', label: 'Love' },
];

const FeedbackButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [rating, setRating] = useState<Rating>(null);
  const [feedback, setFeedback] = useState('');
  const [isHidden, setIsHidden] = useState(false);

  // Check sessionStorage on mount
  useEffect(() => {
    const feedbackSubmitted = sessionStorage.getItem('feedbackSubmitted');
    if (feedbackSubmitted === 'true') {
      setIsHidden(true);
    }
  }, []);

  const handleRatingSelect = (selectedRating: Rating) => {
    setRating(selectedRating);
  };

  const handleNext = () => {
    if (step === 1 && rating) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
      // Mark feedback as submitted in sessionStorage
      sessionStorage.setItem('feedbackSubmitted', 'true');
      // Hide after showing thank you
      setTimeout(() => {
        setIsOpen(false);
        setIsHidden(true);
      }, 2000);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      setStep(1);
      setRating(null);
      setFeedback('');
    }, 300);
  };

  // Don't render if feedback was submitted this session
  if (isHidden) {
    return null;
  }

  return (
    <>
      {/* Vertical Feedback Button */}
      <motion.button
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        transition={{ duration: 0.5, delay: 1 }}
        onClick={() => setIsOpen(true)}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-50 bg-primary hover:bg-primary/90 text-primary-foreground px-2 py-4 rounded-l-lg shadow-luxury transition-all duration-300 group"
        aria-label="Open feedback"
      >
        <div className="flex flex-col items-center gap-2">
          <MessageSquare className="w-4 h-4" />
          <span className="writing-vertical text-xs font-medium tracking-wider">
            Feedback
          </span>
        </div>
      </motion.button>

      {/* Feedback Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="fixed inset-0 bg-background/60 backdrop-blur-sm z-50"
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="fixed inset-x-4 top-1/2 -translate-y-1/2 mx-auto z-50 w-auto max-w-md max-h-[85vh] overflow-y-auto bg-card border border-border rounded-lg shadow-luxury p-4 sm:p-6 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2"
            >
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Close feedback"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Step 1: Rating */}
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center"
                >
                  <p className="text-sm text-muted-foreground mb-2">1/3</p>
                  <h3 className="text-lg font-display text-foreground mb-6">
                    How would you rate your experience?
                  </h3>
                  
                  <div className="flex justify-center gap-3 mb-6">
                    {emojis.map(({ rating: r, emoji, label }) => (
                      <button
                        key={r}
                        onClick={() => handleRatingSelect(r)}
                        className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all duration-200 ${
                          rating === r
                            ? 'bg-primary/20 scale-110'
                            : 'hover:bg-muted'
                        }`}
                      >
                        <span className="text-3xl">{emoji}</span>
                        <span className="text-xs text-muted-foreground">{label}</span>
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={handleNext}
                    disabled={!rating}
                    className="px-8 py-2 bg-muted hover:bg-muted/80 text-foreground text-sm rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </motion.div>
              )}

              {/* Step 2: Written Feedback */}
              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center"
                >
                  <p className="text-sm text-muted-foreground mb-2">2/3</p>
                  <h3 className="text-lg font-display text-foreground mb-4">
                    Tell us more (optional)
                  </h3>
                  
                  <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="What could we improve?"
                    className="w-full h-24 p-3 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-1 focus:ring-ring mb-4"
                  />

                  <button
                    onClick={handleNext}
                    className="px-8 py-2 bg-muted hover:bg-muted/80 text-foreground text-sm rounded transition-colors"
                  >
                    Submit
                  </button>
                </motion.div>
              )}

              {/* Step 3: Thank You */}
              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-4"
                >
                  <p className="text-4xl mb-4">🙏</p>
                  <h3 className="text-xl font-display text-foreground mb-2">
                    Thank you!
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Your feedback helps us improve.
                  </p>
                </motion.div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default FeedbackButton;
