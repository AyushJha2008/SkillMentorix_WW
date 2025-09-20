import React from 'react';
import Icon from '../../../components/AppIcon';

const KPICard = ({ 
  title, 
  value, 
  subtitle, 
  icon, 
  trend, 
  trendValue, 
  color = 'primary',
  className = '' 
}) => {
  const getColorClasses = () => {
    switch (color) {
      case 'success':
        return 'text-success bg-success/10';
      case 'warning':
        return 'text-warning bg-warning/10';
      case 'error':
        return 'text-error bg-error/10';
      case 'secondary':
        return 'text-secondary bg-secondary/10';
      default:
        return 'text-primary bg-primary/10';
    }
  };

  const getTrendIcon = () => {
    if (trend === 'up') return 'TrendingUp';
    if (trend === 'down') return 'TrendingDown';
    return 'Minus';
  };

  const getTrendColor = () => {
    if (trend === 'up') return 'text-success';
    if (trend === 'down') return 'text-error';
    return 'text-text-secondary';
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-6 shadow-educational hover:shadow-educational-lg transition-educational ${className}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-text-secondary mb-1">{title}</p>
          <p className="text-3xl font-bold text-text-primary mb-1">{value}</p>
          {subtitle && (
            <p className="text-sm text-text-secondary">{subtitle}</p>
          )}
        </div>
        
        {icon && (
          <div className={`p-3 rounded-lg ${getColorClasses()}`}>
            <Icon name={icon} size={24} />
          </div>
        )}
      </div>
      
      {trend && trendValue && (
        <div className="flex items-center mt-4 pt-4 border-t border-border">
          <Icon name={getTrendIcon()} size={16} className={getTrendColor()} />
          <span className={`text-sm font-medium ml-1 ${getTrendColor()}`}>
            {trendValue}
          </span>
          <span className="text-sm text-text-secondary ml-1">vs last month</span>
        </div>
      )}
    </div>
  );
};

export default KPICard;