// import React from 'react';/
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const TabNavigation = ({ className = '' }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const tabs = [
    { 
      label: 'Dashboard', 
      path: '/user-dashboard', 
      icon: 'LayoutDashboard',
      tooltip: 'Overview and quick access'
    },
    { 
      label: 'Learn', 
      path: '/quiz-interface', 
      icon: 'BookOpen',
      tooltip: 'Study & Practice',
      subPaths: ['/quiz-interface', '/ai-tutor-chat']
    },
    { 
      label: 'Community', 
      path: '/community-forum', 
      icon: 'Users',
      tooltip: 'Connect & Share',
      subPaths: ['/community-forum', '/thread-discussion']
    },
    { 
      label: 'Analytics', 
      path: '/progress-analytics', 
      icon: 'BarChart3',
      tooltip: 'Track Progress'
    }
  ];

  const isActiveTab = (tab) => {
    if (tab?.subPaths) {
      return tab?.subPaths?.includes(location?.pathname);
    }
    return location?.pathname === tab?.path;
  };

  const handleTabClick = (tab) => {
    navigate(tab?.path);
  };

  return (
    <>
      {/* Desktop Tab Navigation */}
      <div className={`hidden md:flex items-center justify-center bg-surface border-b border-border ${className}`}>
        <div className="flex items-center space-x-1 px-6 py-3">
          {tabs?.map((tab) => (
            <button
              key={tab?.path}
              onClick={() => handleTabClick(tab)}
              title={tab?.tooltip}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg text-sm font-medium transition-educational hover:bg-accent min-h-44 ${
                isActiveTab(tab)
                  ? 'bg-primary text-primary-foreground shadow-educational'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <Icon name={tab?.icon} size={18} />
              <span>{tab?.label}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Mobile Bottom Tab Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-1000 md:hidden bg-surface border-t border-border">
        <div className="flex items-center justify-around px-2 py-2">
          {tabs?.map((tab) => (
            <button
              key={tab?.path}
              onClick={() => handleTabClick(tab)}
              className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg text-xs font-medium transition-educational min-h-44 min-w-0 flex-1 ${
                isActiveTab(tab)
                  ? 'text-primary' :'text-text-secondary hover:text-text-primary'
              }`}
            >
              <Icon 
                name={tab?.icon} 
                size={20} 
                color={isActiveTab(tab) ? 'var(--color-primary)' : 'currentColor'}
              />
              <span className="truncate">{tab?.label}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default TabNavigation;