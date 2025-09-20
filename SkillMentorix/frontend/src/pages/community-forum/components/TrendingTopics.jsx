import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TrendingTopics = ({ topics, onTopicClick }) => {
  const getTrendIcon = (trend) => {
    if (trend > 0) return { icon: 'TrendingUp', color: 'text-green-600' };
    if (trend < 0) return { icon: 'TrendingDown', color: 'text-red-600' };
    return { icon: 'Minus', color: 'text-gray-600' };
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Flame" size={20} className="text-orange-500" />
          <h3 className="text-lg font-semibold text-text-primary">
            Trending Topics
          </h3>
        </div>
        <Button variant="ghost" size="sm" iconName="MoreHorizontal" />
      </div>
      <div className="space-y-3">
        {topics?.map((topic, index) => {
          const trendData = getTrendIcon(topic?.trend);
          
          return (
            <button
              key={index}
              onClick={() => onTopicClick(topic?.tag)}
              className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-accent transition-educational group"
            >
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-8 h-8 bg-primary/10 text-primary rounded-full text-sm font-bold">
                  {index + 1}
                </div>
                <div className="text-left">
                  <p className="font-medium text-text-primary group-hover:text-primary transition-educational">
                    #{topic?.tag}
                  </p>
                  <p className="text-sm text-text-secondary">
                    {topic?.count} discussions
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <Icon 
                    name={trendData?.icon} 
                    size={14} 
                    className={trendData?.color}
                  />
                  <span className={`text-sm font-medium ${trendData?.color}`}>
                    {Math.abs(topic?.trend)}%
                  </span>
                </div>
                <Icon 
                  name="ChevronRight" 
                  size={16} 
                  className="text-text-secondary group-hover:text-primary transition-educational" 
                />
              </div>
            </button>
          );
        })}
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <Button
          variant="outline"
          fullWidth
          iconName="Hash"
          onClick={() => onTopicClick('all')}
        >
          View All Topics
        </Button>
      </div>
    </div>
  );
};

export default TrendingTopics;