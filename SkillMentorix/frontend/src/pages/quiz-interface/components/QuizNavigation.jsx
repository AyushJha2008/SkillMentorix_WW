import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuizNavigation = ({ 
  currentQuestion,
  totalQuestions,
  selectedAnswer,
  onPrevious,
  onNext,
  onSubmit,
  isLastQuestion,
  showSubmit = false,
  disabled = false
}) => {
  const canGoPrevious = currentQuestion > 1;
  const canGoNext = selectedAnswer !== null && currentQuestion < totalQuestions;
  const canSubmit = selectedAnswer !== null && (isLastQuestion || showSubmit);

  return (
    <div className="bg-surface border-t border-border px-4 py-4 lg:px-6">
      <div className="flex items-center justify-between">
        {/* Previous Button */}
        <Button
          variant="outline"
          onClick={onPrevious}
          disabled={!canGoPrevious || disabled}
          iconName="ChevronLeft"
          iconPosition="left"
          iconSize={16}
          className="min-w-24"
        >
          Previous
        </Button>

        {/* Question Indicators */}
        <div className="hidden md:flex items-center space-x-2">
          {Array.from({ length: Math.min(totalQuestions, 10) }, (_, index) => {
            const questionNum = index + 1;
            const isActive = questionNum === currentQuestion;
            const isCompleted = questionNum < currentQuestion;
            
            return (
              <div
                key={questionNum}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-educational ${
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : isCompleted
                    ? 'bg-success text-success-foreground'
                    : 'bg-muted text-text-secondary'
                }`}
              >
                {isCompleted ? (
                  <Icon name="Check" size={12} />
                ) : (
                  questionNum
                )}
              </div>
            );
          })}
          
          {totalQuestions > 10 && (
            <div className="flex items-center space-x-1">
              <span className="text-text-secondary">...</span>
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium text-text-secondary">
                {totalQuestions}
              </div>
            </div>
          )}
        </div>

        {/* Next/Submit Button */}
        <div className="flex items-center space-x-2">
          {!isLastQuestion && !showSubmit ? (
            <Button
              variant="default"
              onClick={onNext}
              disabled={!canGoNext || disabled}
              iconName="ChevronRight"
              iconPosition="right"
              iconSize={16}
              className="min-w-24"
            >
              Next
            </Button>
          ) : (
            <Button
              variant="success"
              onClick={onSubmit}
              disabled={!canSubmit || disabled}
              iconName="CheckCircle"
              iconPosition="right"
              iconSize={16}
              className="min-w-32"
            >
              Submit Quiz
            </Button>
          )}
        </div>
      </div>

      {/* Mobile Question Counter */}
      <div className="md:hidden mt-3 text-center">
        <span className="text-sm text-text-secondary">
          Question {currentQuestion} of {totalQuestions}
        </span>
      </div>
    </div>
  );
};

export default QuizNavigation;