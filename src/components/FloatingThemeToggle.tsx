import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { Sun, Moon, GripVertical } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { useState, useRef, useEffect } from 'react';

interface FloatingThemeToggleProps {
  isVisible: boolean;
}

const FloatingThemeToggle = ({ isVisible }: FloatingThemeToggleProps) => {
  const { theme, toggleTheme } = useTheme();
  const dragControls = useDragControls();
  const constraintsRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  // Set initial position on mount
  useEffect(() => {
    const savedPosition = sessionStorage.getItem('themeTogglePosition');
    if (savedPosition) {
      try {
        setPosition(JSON.parse(savedPosition));
      } catch {
        // Use default position
      }
    }
  }, []);

  const handleDragEnd = (_: any, info: any) => {
    const newPosition = { x: info.offset.x, y: info.offset.y };
    setPosition(newPosition);
    sessionStorage.setItem('themeTogglePosition', JSON.stringify(newPosition));
    setIsDragging(false);
  };

  return (
    <>
      {/* Drag constraints container - full viewport */}
      <div 
        ref={constraintsRef} 
        className="fixed inset-0 pointer-events-none z-40 hidden md:block"
      />

      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            drag
            dragControls={dragControls}
            dragMomentum={false}
            dragElastic={0.1}
            dragConstraints={constraintsRef}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={handleDragEnd}
            className="fixed top-20 right-6 z-40 hidden md:flex items-center gap-1 cursor-grab active:cursor-grabbing"
            style={{ x: position.x, y: position.y }}
          >
            {/* Drag handle */}
            <motion.div 
              className={`p-1 text-white/30 hover:text-white/50 transition-colors ${isDragging ? 'text-white/50' : ''}`}
            >
              <GripVertical className="w-3 h-3" />
            </motion.div>

            {/* Toggle button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="w-10 h-10 rounded-full bg-card/90 hover:bg-card border border-border/50 shadow-lg backdrop-blur-sm flex items-center justify-center transition-all duration-300 group"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              <motion.div
                initial={false}
                animate={{ rotate: theme === 'dark' ? 0 : 180 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4 text-champagne/80 group-hover:text-champagne transition-colors" />
                ) : (
                  <Moon className="w-4 h-4 text-foreground/70 group-hover:text-foreground transition-colors" />
                )}
              </motion.div>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingThemeToggle;
