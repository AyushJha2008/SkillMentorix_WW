import React from 'react';
import Icon from '../../../components/AppIcon';
import ProgressIndicator from '../../../components/ui/ProgressIndicator';
import NotificationBadge from '../../../components/ui/NotificationBadge';

const QuizHeader = ({ 
  currentQuestion, 
  totalQuestions, 
  timeRemaining, 
  xpPoints, 
  difficulty,
  onPause,
  onExit 
}) => {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins?.toString()?.padStart(2, '0')}:${secs?.toString()?.padStart(2, '0')}`;
  };

  const getDifficultyColor = () => {
    switch (difficulty) {
      case 'easy': return 'text-success';
      case 'medium': return 'text-warning';
      case 'hard': return 'text-error';
      default: return 'text-text-secondary';
    }
  };

  const getDifficultyIcon = () => {
    switch (difficulty) {
      case 'easy': return 'TrendingDown';
      case 'medium': return 'Minus';
      case 'hard': return 'TrendingUp';
      default: return 'Minus';
    }
  };

  return (
    <div className="bg-surface border-b border-border px-4 py-3 lg:px-6 lg:py-4">
      <div className="flex items-center justify-between">
        {/* Left Section - Progress */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Icon name="FileQuestion" size={20} color="var(--color-primary)" />
            <span className="text-sm font-medium text-text-primary">
              Question {currentQuestion} of {totalQuestions}
            </span>
          </div>
          
          {/* Difficulty Indicator */}
          <div className={`flex items-center space-x-1 px-2 py-1 rounded-md bg-muted ${getDifficultyColor()}`}>
            <Icon name={getDifficultyIcon()} size={14} />
            <span className="text-xs font-medium capitalize">{difficulty}</span>
          </div>
        </div>

        {/* Right Section - Timer, XP, Controls */}
        <div className="flex items-center space-x-4">
          {/* XP Points */}
          <NotificationBadge count={xpPoints} variant="success" size="default">
            <div className="flex items-center space-x-1 px-3 py-1 bg-success/10 rounded-lg">
              <Icon name="Zap" size={16} color="var(--color-success)" />
              <span className="text-sm font-medium text-success">XP</span>
            </div>
          </NotificationBadge>

          {/* Timer */}
          <div className={`flex items-center space-x-2 px-3 py-1 rounded-lg ${
            timeRemaining <= 60 ? 'bg-error/10 text-error' : 'bg-muted text-text-secondary'
          }`}>
            <Icon 
              name="Clock" 
              size={16} 
              color={timeRemaining <= 60 ? 'var(--color-error)' : 'currentColor'} 
            />
            <span className="text-sm font-medium font-mono">
              {formatTime(timeRemaining)}
            </span>
          </div>

          {/* Control Buttons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={onPause}
              className="p-2 rounded-lg hover:bg-accent transition-educational"
              title="Pause Quiz"
            >
              <Icon name="Pause" size={18} color="var(--color-text-secondary)" />
            </button>
            <button
              onClick={onExit}
              className="p-2 rounded-lg hover:bg-accent transition-educational"
              title="Exit Quiz"
            >
              <Icon name="X" size={18} color="var(--color-text-secondary)" />
            </button>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-3">
        <ProgressIndicator
          current={currentQuestion}
          total={totalQuestions}
          showPercentage={false}
          showSteps={false}
          size="sm"
        />
      </div>
    </div>
  );
};

export default QuizHeader;