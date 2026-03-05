import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { MessageSquare, X, Loader2 } from 'lucide-react';

type Rating = 1 | 2 | 3 | 4 | 5 | null;

const emojis = [
  { rating: 5 as const, emoji: '😍', label: 'Love' }, 
  { rating: 4 as const, emoji: '🙂', label: 'Like' },
  { rating: 3 as const, emoji: '😐', label: 'Okay' },
  { rating: 2 as const, emoji: '😕', label: 'Dislike'},
  { rating: 1 as const, emoji: '😣', label: 'Hate' },
];

const FeedbackButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [rating, setRating] = useState<Rating>(null);
  const [feedback, setFeedback] = useState('');
  const [isHidden, setIsHidden] = useState(false);
  const [isMounted, setIsMounted] = useState(false); // Fix for Hydration
  const [isSubmitting, setIsSubmitting] = useState(false); // API Loading state

  useEffect(() => {
    setIsMounted(true);
    const feedbackSubmitted = sessionStorage.getItem('feedbackSubmitted');
    if (feedbackSubmitted === 'true') {
      setIsHidden(true);
    }
  }, []);

  const handleNext = async () => {
    if (step === 1 && rating) {
      setStep(2);
    } else if (step === 2) {
      setIsSubmitting(true);

      try {
        // --- API INTEGRATION MODULE ---
        // Replace the URL with your actual AWS API Gateway endpoint
        const response = await fetch('YOUR_AWS_API_ENDPOINT_HERE', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            rating,
            feedback,
            pageUrl: window.location.href,
            timestamp: new Date().toISOString()
          }),
        });

        if (!response.ok) throw new Error('Failed to submit');
        // ------------------------------

        setStep(3);
        sessionStorage.setItem('feedbackSubmitted', 'true');

        setTimeout(() => {
          setIsOpen(false);
          setIsHidden(true);
        }, 2000);
      } catch (error) {
        console.error("Submission error:", error);
        alert("Sorry, we couldn't send your feedback. Please try again later.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleClose = () => {
    if (isSubmitting) return; // Prevent closing while sending
    setIsOpen(false);
    setTimeout(() => {
      setStep(1);
      setRating(null);
      setFeedback('');
    }, 300);
  };

  if (!isMounted || isHidden) return null;

  return (
    <>
      {/* Security Check: Use standard jsx styles instead of raw HTML injection */}
      <style>{`
        .writing-vertical { writing-mode: vertical-rl; text-orientation: mixed; }
        .shadow-luxury { box-shadow: 0 10px 40px -10px rgba(0,0,0,0.3); }
      `}</style>

      {/* Vertical Feedback Button */}
      <motion.button
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => setIsOpen(true)}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-[9999] bg-black text-white px-2 py-4 rounded-l-lg shadow-luxury transition-all hover:bg-zinc-800"
      >
        <div className="flex flex-col items-center gap-2">
          <MessageSquare className="w-4 h-4" />
          <span className="writing-vertical text-[10px] font-bold uppercase tracking-widest">
            Feedback
          </span>
        </div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[10000]"
            />

            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="fixed inset-x-4 top-1/2 -translate-y-1/2 mx-auto z-[10001] w-full max-w-md bg-card border border-border rounded-xl shadow-2xl p-6"
            >
              <button onClick={handleClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>

              {step === 1 && (
                <div className="text-center">
                  <h3 className="text-xl font-bold text-foreground mb-6">How was your experience?</h3>
                  <div className="flex justify-center gap-2 mb-8">
                    {emojis.map(({ rating: r, emoji, label }) => (
                      <button
                        key={r}
                        onClick={() => setRating(r)}
                        className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-all ${rating === r ? 'bg-accent border-2 border-foreground scale-105' : 'hover:bg-accent/50 border-2 border-transparent'
                          }`}
                      >
                        <span className="text-3xl">{emoji}</span>
                        <span className="text-[10px] font-bold text-muted-foreground">{label}</span>
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={handleNext}
                    disabled={!rating}
                    className="w-full py-3 bg-foreground text-background font-bold rounded-lg disabled:opacity-20"
                  >
                    Next
                  </button>
                </div>
              )}

              {step === 2 && (
                <div className="text-center">
                  <h3 className="text-xl font-bold text-foreground mb-4">Care to share more?</h3>
                  <textarea
                    autoFocus
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Tell us more..."
                    className="w-full h-32 p-4 bg-background text-foreground border border-border rounded-lg focus:ring-2 focus:ring-foreground outline-none mb-4"
                  />
                  <button
                    onClick={handleNext}
                    disabled={isSubmitting}
                    className="w-full py-3 bg-foreground text-background font-bold rounded-lg flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Send Feedback'}
                  </button>
                </div>
              )}

              {step === 3 && (
                <div className="text-center py-8">
                  <div className="text-5xl mb-4">🙏</div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">Thank You!</h3>
                  <p className="text-muted-foreground">Your response has been saved to our server.</p>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default FeedbackButton;