import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const SubNavigationPanel = ({ className = '' }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const getSubNavItems = () => {
    const currentPath = location?.pathname;
    
    if (currentPath === '/quiz-interface' || currentPath === '/ai-tutor-chat') {
      return {
        title: 'Learn',
        items: [
          { label: 'Quiz Interface', path: '/quiz-interface', icon: 'FileQuestion' },
          { label: 'AI Tutor Chat', path: '/ai-tutor-chat', icon: 'Bot' }
        ]
      };
    }
    
    if (currentPath === '/community-forum' || currentPath === '/thread-discussion') {
      return {
        title: 'Community',
        items: [
          { label: 'Forum', path: '/community-forum', icon: 'MessageSquare' },
          { label: 'Discussions', path: '/thread-discussion', icon: 'MessageCircle' }
        ]
      };
    }
    
    return null;
  };

  const subNavData = getSubNavItems();

  if (!subNavData) {
    return null;
  }

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <>
      {/* Desktop Sub Navigation */}
      <div className={`hidden md:block bg-muted border-b border-border ${className}`}>
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center space-x-6">
            <span className="text-sm font-medium text-text-secondary">
              {subNavData?.title}:
            </span>
            <div className="flex items-center space-x-1">
              {subNavData?.items?.map((item) => (
                <button
                  key={item?.path}
                  onClick={() => handleNavigation(item?.path)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-educational hover:bg-accent ${
                    location?.pathname === item?.path
                      ? 'bg-surface text-text-primary shadow-educational'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  <Icon name={item?.icon} size={16} />
                  <span>{item?.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Mobile Sub Navigation Drawer */}
      <div className="md:hidden bg-muted border-b border-border">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-text-secondary">
              {subNavData?.title}
            </span>
          </div>
          <div className="flex space-x-2 overflow-x-auto">
            {subNavData?.items?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-educational ${
                  location?.pathname === item?.path
                    ? 'bg-surface text-text-primary shadow-educational'
                    : 'text-text-secondary hover:text-text-primary hover:bg-accent'
                }`}
              >
                <Icon name={item?.icon} size={16} />
                <span>{item?.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SubNavigationPanel;