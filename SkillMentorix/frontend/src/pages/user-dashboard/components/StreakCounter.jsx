import React from 'react';
import Icon from '../../../components/AppIcon';

const StreakCounter = ({ currentStreak, longestStreak, lastActivity }) => {
  const getStreakIcon = () => {
    if (currentStreak >= 30) return 'Crown';
    if (currentStreak >= 14) return 'Award';
    if (currentStreak >= 7) return 'Star';
    return 'Flame';
  };

  const getStreakColor = () => {
    if (currentStreak >= 30) return 'text-warning';
    if (currentStreak >= 14) return 'text-secondary';
    if (currentStreak >= 7) return 'text-primary';
    return 'text-error';
  };

  const getMotivationalMessage = () => {
    if (currentStreak === 0) return "Start your learning journey today!";
    if (currentStreak < 3) return "Great start! Keep it up!";
    if (currentStreak < 7) return "You're building momentum!";
    if (currentStreak < 14) return "Fantastic consistency!";
    if (currentStreak < 30) return "You're on fire! 🔥";
    return "Learning legend! 👑";
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-educational">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">Learning Streak</h3>
        <div className={`${getStreakColor()}`}>
          <Icon name={getStreakIcon()} size={24} />
        </div>
      </div>
      <div className="space-y-4">
        <div className="text-center">
          <div className="text-4xl font-bold text-text-primary mb-2">
            {currentStreak}
          </div>
          <p className="text-sm text-text-secondary">Days in a row</p>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <div className="text-center">
            <div className="font-semibold text-text-primary">{longestStreak}</div>
            <div className="text-text-secondary">Best Streak</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-text-primary">{lastActivity}</div>
            <div className="text-text-secondary">Last Activity</div>
          </div>
        </div>
        
        <div className="bg-muted rounded-lg p-3 text-center">
          <p className="text-sm font-medium text-text-primary">
            {getMotivationalMessage()}
          </p>
        </div>
        
        {/* Visual streak indicators */}
        <div className="flex justify-center space-x-1">
          {Array.from({ length: Math.min(currentStreak, 7) }, (_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${getStreakColor()?.replace('text-', 'bg-')}`}
            />
          ))}
          {currentStreak > 7 && (
            <div className="flex items-center space-x-1 ml-2">
              <span className="text-xs text-text-secondary">+{currentStreak - 7}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StreakCounter;