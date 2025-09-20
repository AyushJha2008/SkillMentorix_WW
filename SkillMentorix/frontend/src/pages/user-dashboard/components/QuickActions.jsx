import React from 'react';
import { useNavigate } from 'react-router-dom';

import Icon from '../../../components/AppIcon';

const QuickActions = ({ offlineQuizCount, unreadMessages }) => {
  const navigate = useNavigate();

  const actions = [
    {
      title: "Take Quiz",
      description: "Start learning with adaptive quizzes",
      icon: "Brain",
      color: "primary",
      path: "/quiz-interface",
      badge: offlineQuizCount > 0 ? `${offlineQuizCount} offline` : null
    },
    {
      title: "AI Tutor",
      description: "Get personalized help and guidance",
      icon: "Bot",
      color: "secondary",
      path: "/ai-tutor-chat",
      badge: null
    },
    {
      title: "Community",
      description: "Connect with fellow learners",
      icon: "Users",
      color: "success",
      path: "/community-forum",
      badge: unreadMessages > 0 ? `${unreadMessages} new` : null
    },
    {
      title: "Analytics",
      description: "Track your learning progress",
      icon: "BarChart3",
      color: "warning",
      path: "/progress-analytics",
      badge: null
    }
  ];

  const getColorClasses = (color) => {
    switch (color) {
      case 'secondary':
        return 'bg-secondary hover:bg-secondary/90 text-secondary-foreground';
      case 'success':
        return 'bg-success hover:bg-success/90 text-success-foreground';
      case 'warning':
        return 'bg-warning hover:bg-warning/90 text-warning-foreground';
      default:
        return 'bg-primary hover:bg-primary/90 text-primary-foreground';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-educational">
      <h3 className="text-lg font-semibold text-text-primary mb-4">Quick Actions</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {actions?.map((action) => (
          <div
            key={action?.path}
            className="relative group cursor-pointer"
            onClick={() => navigate(action?.path)}
          >
            <div className="bg-muted rounded-lg p-4 hover:bg-accent transition-educational border border-transparent hover:border-border">
              <div className="flex items-start space-x-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getColorClasses(action?.color)}`}>
                  <Icon name={action?.icon} size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-text-primary">
                      {action?.title}
                    </h4>
                    {action?.badge && (
                      <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full">
                        {action?.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-text-secondary mt-1">
                    {action?.description}
                  </p>
                </div>
                <Icon 
                  name="ChevronRight" 
                  size={16} 
                  className="text-text-secondary group-hover:text-text-primary transition-educational" 
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Offline Status Indicator */}
      <div className="mt-4 p-3 bg-muted rounded-lg">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
          <span className="text-sm text-text-secondary">
            Online • {offlineQuizCount} quizzes cached for offline use
          </span>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;