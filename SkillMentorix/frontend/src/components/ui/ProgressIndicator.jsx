import React from 'react';
import Icon from '../AppIcon';

const ProgressIndicator = ({ 
  current = 0, 
  total = 100, 
  label = '', 
  showPercentage = true,
  showSteps = false,
  variant = 'default',
  size = 'default',
  className = ''
}) => {
  const percentage = Math.min(Math.max((current / total) * 100, 0), 100);
  
  const getVariantClasses = () => {
    switch (variant) {
      case 'success':
        return 'bg-success';
      case 'warning':
        return 'bg-warning';
      case 'error':
        return 'bg-error';
      default:
        return 'bg-primary';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'h-2';
      case 'lg':
        return 'h-4';
      default:
        return 'h-3';
    }
  };

  const getIcon = () => {
    if (percentage === 100) {
      return <Icon name="CheckCircle" size={16} color="var(--color-success)" />;
    }
    if (variant === 'error') {
      return <Icon name="XCircle" size={16} color="var(--color-error)" />;
    }
    if (variant === 'warning') {
      return <Icon name="AlertCircle" size={16} color="var(--color-warning)" />;
    }
    return null;
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Header with label and percentage */}
      {(label || showPercentage || showSteps) && (
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            {label && (
              <span className="text-sm font-medium text-text-primary">
                {label}
              </span>
            )}
            {getIcon()}
          </div>
          <div className="flex items-center space-x-2 text-sm text-text-secondary">
            {showSteps && (
              <span>
                {current} of {total}
              </span>
            )}
            {showPercentage && (
              <span className="font-medium">
                {Math.round(percentage)}%
              </span>
            )}
          </div>
        </div>
      )}
      
      {/* Progress Bar */}
      <div className={`w-full bg-muted rounded-full overflow-hidden ${getSizeClasses()}`}>
        <div
          className={`h-full rounded-full transition-all duration-300 ease-out ${getVariantClasses()}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      
      {/* Steps indicator for quiz/learning progress */}
      {showSteps && total <= 20 && (
        <div className="flex items-center justify-between mt-2">
          {Array.from({ length: total }, (_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-educational ${
                index < current
                  ? getVariantClasses()
                  : 'bg-muted'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProgressIndicator;