import React from 'react';
import Icon from '../../../components/AppIcon';

const QuestionCard = ({ 
  question, 
  selectedAnswer, 
  onAnswerSelect, 
  showFeedback = false,
  correctAnswer = null 
}) => {
  const getOptionIcon = (optionIndex) => {
    if (!showFeedback) {
      return selectedAnswer === optionIndex ? 'CheckCircle2' : 'Circle';
    }
    
    if (optionIndex === correctAnswer) {
      return 'CheckCircle2';
    }
    
    if (selectedAnswer === optionIndex && optionIndex !== correctAnswer) {
      return 'XCircle';
    }
    
    return 'Circle';
  };

  const getOptionColor = (optionIndex) => {
    if (!showFeedback) {
      return selectedAnswer === optionIndex ? 'var(--color-primary)' : 'var(--color-text-secondary)';
    }
    
    if (optionIndex === correctAnswer) {
      return 'var(--color-success)';
    }
    
    if (selectedAnswer === optionIndex && optionIndex !== correctAnswer) {
      return 'var(--color-error)';
    }
    
    return 'var(--color-text-secondary)';
  };

  const getOptionClasses = (optionIndex) => {
    const baseClasses = "w-full p-4 rounded-lg border-2 transition-educational cursor-pointer text-left";
    
    if (!showFeedback) {
      if (selectedAnswer === optionIndex) {
        return `${baseClasses} border-primary bg-primary/5 hover:bg-primary/10`;
      }
      return `${baseClasses} border-border bg-surface hover:border-primary/50 hover:bg-accent`;
    }
    
    if (optionIndex === correctAnswer) {
      return `${baseClasses} border-success bg-success/5`;
    }
    
    if (selectedAnswer === optionIndex && optionIndex !== correctAnswer) {
      return `${baseClasses} border-error bg-error/5`;
    }
    
    return `${baseClasses} border-border bg-surface opacity-60`;
  };

  return (
    <div className="bg-surface rounded-xl border border-border p-6 lg:p-8">
      {/* Question */}
      <div className="mb-8">
        <h2 className="text-xl lg:text-2xl font-semibold text-text-primary leading-relaxed">
          {question?.text}
        </h2>
        
        {question?.image && (
          <div className="mt-6 rounded-lg overflow-hidden">
            <img
              src={question?.image}
              alt="Question illustration"
              className="w-full h-64 object-cover"
              onError={(e) => {
                e.target.src = '/assets/images/no_image.png';
              }}
            />
          </div>
        )}
      </div>
      {/* Answer Options */}
      <div className="space-y-3">
        {question?.options?.map((option, index) => (
          <button
            key={index}
            onClick={() => !showFeedback && onAnswerSelect(index)}
            className={getOptionClasses(index)}
            disabled={showFeedback}
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-0.5">
                <Icon 
                  name={getOptionIcon(index)} 
                  size={20} 
                  color={getOptionColor(index)} 
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-text-secondary">
                    {String.fromCharCode(65 + index)}.
                  </span>
                  <span className="text-base font-medium text-text-primary">
                    {option}
                  </span>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
      {/* Explanation (shown after feedback) */}
      {showFeedback && question?.explanation && (
        <div className="mt-6 p-4 bg-muted rounded-lg">
          <div className="flex items-start space-x-2">
            <Icon name="Info" size={16} color="var(--color-primary)" className="mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-medium text-text-primary mb-1">Explanation</h4>
              <p className="text-sm text-text-secondary leading-relaxed">
                {question?.explanation}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionCard;