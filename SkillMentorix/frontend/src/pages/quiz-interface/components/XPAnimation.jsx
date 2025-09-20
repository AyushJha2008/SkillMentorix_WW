import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const XPAnimation = ({ 
  show, 
  points, 
  onComplete,
  position = { x: 0, y: 0 },
  className = '' 
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        onComplete?.();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ 
            opacity: 0, 
            scale: 0.5, 
            x: position?.x, 
            y: position?.y 
          }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            x: position?.x, 
            y: position?.y - 50 
          }}
          exit={{ 
            opacity: 0, 
            scale: 0.8, 
            x: position?.x, 
            y: position?.y - 100 
          }}
          transition={{ 
            duration: 0.6, 
            ease: "easeOut" 
          }}
          className={`fixed z-1000 pointer-events-none ${className}`}
        >
          <div className="flex items-center space-x-2 bg-success text-success-foreground px-4 py-2 rounded-full shadow-educational-lg">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <Icon name="Zap" size={20} color="currentColor" />
            </motion.div>
            <span className="text-sm font-bold">
              +{points} XP
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default XPAnimation;