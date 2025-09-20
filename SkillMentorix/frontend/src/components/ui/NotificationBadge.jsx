import React from 'react';

const NotificationBadge = ({ 
  count = 0, 
  maxCount = 99,
  variant = 'default',
  size = 'default',
  showZero = false,
  className = '',
  children 
}) => {
  const displayCount = count > maxCount ? `${maxCount}+` : count;
  const shouldShow = showZero || count > 0;

  const getVariantClasses = () => {
    switch (variant) {
      case 'success':
        return 'bg-success text-success-foreground';
      case 'warning':
        return 'bg-warning text-warning-foreground';
      case 'error':
        return 'bg-error text-error-foreground';
      case 'secondary':
        return 'bg-secondary text-secondary-foreground';
      default:
        return 'bg-primary text-primary-foreground';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'h-4 min-w-4 text-xs px-1';
      case 'lg':
        return 'h-7 min-w-7 text-sm px-2';
      default:
        return 'h-5 min-w-5 text-xs px-1.5';
    }
  };

  if (!children) {
    // Standalone badge
    return shouldShow ? (
      <span
        className={`inline-flex items-center justify-center rounded-full font-medium transition-educational ${getVariantClasses()} ${getSizeClasses()} ${className}`}
      >
        {displayCount}
      </span>
    ) : null;
  }

  // Badge with children (wrapper)
  return (
    <div className={`relative inline-flex ${className}`}>
      {children}
      {shouldShow && (
        <span
          className={`absolute -top-1 -right-1 inline-flex items-center justify-center rounded-full font-medium transition-educational ${getVariantClasses()} ${getSizeClasses()}`}
        >
          {displayCount}
        </span>
      )}
    </div>
  );
};

export default NotificationBadge;