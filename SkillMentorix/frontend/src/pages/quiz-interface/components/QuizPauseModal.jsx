import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuizPauseModal = ({ 
  isOpen, 
  onResume, 
  onExit, 
  timeRemaining,
  currentQuestion,
  totalQuestions 
}) => {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins?.toString()?.padStart(2, '0')}:${secs?.toString()?.padStart(2, '0')}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-1000"
            onClick={onResume}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-1001 flex items-center justify-center p-4"
          >
            <div className="bg-surface border border-border rounded-xl shadow-educational-lg max-w-md w-full p-6">
              {/* Header */}
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Pause" size={32} color="var(--color-warning)" />
                </div>
                <h2 className="text-xl font-semibold text-text-primary mb-2">
                  Quiz Paused
                </h2>
                <p className="text-text-secondary">
                  Take a moment to rest. Your progress is saved.
                </p>
              </div>

              {/* Quiz Stats */}
              <div className="bg-muted rounded-lg p-4 mb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1 mb-1">
                      <Icon name="FileQuestion" size={16} color="var(--color-primary)" />
                      <span className="text-sm font-medium text-text-primary">Progress</span>
                    </div>
                    <p className="text-lg font-semibold text-text-primary">
                      {currentQuestion}/{totalQuestions}
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1 mb-1">
                      <Icon name="Clock" size={16} color="var(--color-warning)" />
                      <span className="text-sm font-medium text-text-primary">Time Left</span>
                    </div>
                    <p className="text-lg font-semibold text-text-primary font-mono">
                      {formatTime(timeRemaining)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Tips */}
              <div className="bg-accent rounded-lg p-4 mb-6">
                <div className="flex items-start space-x-2">
                  <Icon name="Lightbulb" size={16} color="var(--color-primary)" className="mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-medium text-text-primary mb-1">Quick Tip</h4>
                    <p className="text-sm text-text-secondary">
                      Take deep breaths and stay focused. You're doing great!
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-3">
                <Button
                  variant="default"
                  onClick={onResume}
                  iconName="Play"
                  iconPosition="left"
                  iconSize={16}
                  fullWidth
                >
                  Resume Quiz
                </Button>
                <Button
                  variant="outline"
                  onClick={onExit}
                  iconName="LogOut"
                  iconPosition="left"
                  iconSize={16}
                  fullWidth
                >
                  Exit Quiz
                </Button>
              </div>

              {/* Warning */}
              <div className="mt-4 p-3 bg-warning/10 rounded-lg">
                <div className="flex items-start space-x-2">
                  <Icon name="AlertTriangle" size={14} color="var(--color-warning)" className="mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-warning">
                    Exiting will save your progress, but you'll need to restart from the beginning.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default QuizPauseModal;