import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

  const primaryNavItems = [
    { label: 'Dashboard', path: '/user-dashboard', icon: 'LayoutDashboard' },
    { label: 'Learn', path: '/quiz-interface', icon: 'BookOpen' },
    { label: 'Community', path: '/community-forum', icon: 'Users' },
    { label: 'Analytics', path: '/progress-analytics', icon: 'BarChart3' }
  ];

  const secondaryNavItems = [
    { label: 'AI Tutor', path: '/ai-tutor-chat', icon: 'Bot' },
    { label: 'Discussions', path: '/thread-discussion', icon: 'MessageSquare' }
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsMoreMenuOpen(false);
  };

  const isActivePath = (path) => {
    if (path === '/quiz-interface') {
      return location?.pathname === '/quiz-interface' || location?.pathname === '/ai-tutor-chat';
    }
    if (path === '/community-forum') {
      return location?.pathname === '/community-forum' || location?.pathname === '/thread-discussion';
    }
    return location?.pathname === path;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-1000 bg-surface border-b border-border shadow-educational">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo */}
        <div className="flex items-center">
          <button
            onClick={() => navigate('/user-dashboard')}
            className="flex items-center space-x-2 transition-educational hover:opacity-80"
          >
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="GraduationCap" size={20} color="white" />
            </div>
            <span className="text-xl font-semibold text-text-primary">
              Skill Mentorix
            </span>
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {primaryNavItems?.map((item) => (
            <button
              key={item?.path}
              onClick={() => handleNavigation(item?.path)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-educational hover:bg-accent ${
                isActivePath(item?.path)
                  ? 'bg-primary text-primary-foreground'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <Icon name={item?.icon} size={18} />
              <span>{item?.label}</span>
            </button>
          ))}
          
          {/* More Menu */}
          <div className="relative">
            <button
              onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-accent transition-educational"
            >
              <Icon name="MoreHorizontal" size={18} />
              <span>More</span>
            </button>
            
            {isMoreMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-999"
                  onClick={() => setIsMoreMenuOpen(false)}
                />
                <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg shadow-educational-lg z-1000">
                  {secondaryNavItems?.map((item) => (
                    <button
                      key={item?.path}
                      onClick={() => handleNavigation(item?.path)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 text-sm text-left hover:bg-accent transition-educational first:rounded-t-lg last:rounded-b-lg ${
                        location?.pathname === item?.path
                          ? 'bg-accent text-text-primary' :'text-text-secondary hover:text-text-primary'
                      }`}
                    >
                      <Icon name={item?.icon} size={16} />
                      <span>{item?.label}</span>
                    </button>
                  ))}
                  <hr className="border-border my-1" />
                  <button
                    onClick={() => handleNavigation('/user-profile-settings')}
                    className={`w-full flex items-center space-x-3 px-4 py-3 text-sm text-left hover:bg-accent transition-educational rounded-b-lg ${
                      location?.pathname === '/user-profile-settings' ?'bg-accent text-text-primary' :'text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    <Icon name="Settings" size={16} />
                    <span>Settings</span>
                  </button>
                </div>
              </>
            )}
          </div>

          {/* User Profile Menu */}
          <div className="relative">
            <button
              onClick={() => handleNavigation('/user-profile-settings')}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-accent transition-educational"
              title="Profile Settings"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Icon name="User" size={16} color="white" />
              </div>
            </button>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
          >
            <Icon name="Menu" size={20} />
          </Button>
        </div>
      </div>
      {/* Mobile Navigation Menu */}
      {isMoreMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-999 md:hidden"
            onClick={() => setIsMoreMenuOpen(false)}
          />
          <div className="absolute top-full left-0 right-0 bg-surface border-b border-border shadow-educational-lg z-1000 md:hidden">
            <nav className="px-4 py-2 space-y-1">
              {[...primaryNavItems, ...secondaryNavItems]?.map((item) => (
                <button
                  key={item?.path}
                  onClick={() => handleNavigation(item?.path)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-educational ${
                    location?.pathname === item?.path
                      ? 'bg-primary text-primary-foreground'
                      : 'text-text-secondary hover:text-text-primary hover:bg-accent'
                  }`}
                >
                  <Icon name={item?.icon} size={18} />
                  <span>{item?.label}</span>
                </button>
              ))}
              <hr className="border-border my-2" />
              <button
                onClick={() => handleNavigation('/user-profile-settings')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-educational ${
                  location?.pathname === '/user-profile-settings' ?'bg-primary text-primary-foreground' :'text-text-secondary hover:text-text-primary hover:bg-accent'
                }`}
              >
                <Icon name="Settings" size={18} />
                <span>Profile Settings</span>
              </button>
            </nav>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;