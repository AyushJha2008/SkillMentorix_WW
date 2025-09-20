import React from 'react';
import Icon from '../../../components/AppIcon';

const BadgeShowcase = ({ badges, recentBadges }) => {
  const getBadgeIcon = (type) => {
    switch (type) {
      case 'streak': return 'Flame';
      case 'quiz': return 'Brain';
      case 'community': return 'Users';
      case 'achievement': return 'Trophy';
      case 'milestone': return 'Target';
      default: return 'Award';
    }
  };

  const getBadgeColor = (rarity) => {
    switch (rarity) {
      case 'legendary': return 'bg-gradient-to-br from-yellow-400 to-orange-500';
      case 'epic': return 'bg-gradient-to-br from-purple-500 to-pink-500';
      case 'rare': return 'bg-gradient-to-br from-blue-500 to-cyan-500';
      case 'common': return 'bg-gradient-to-br from-green-500 to-emerald-500';
      default: return 'bg-gradient-to-br from-gray-400 to-gray-500';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-educational">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">Achievements</h3>
        <div className="flex items-center space-x-1 text-text-secondary">
          <Icon name="Award" size={16} />
          <span className="text-sm">{badges?.length} earned</span>
        </div>
      </div>
      {/* Recent Badges */}
      {recentBadges?.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-medium text-text-secondary mb-3">Recently Earned</h4>
          <div className="flex space-x-3 overflow-x-auto pb-2">
            {recentBadges?.map((badge) => (
              <div
                key={badge?.id}
                className="flex-shrink-0 text-center group cursor-pointer"
              >
                <div className={`w-16 h-16 rounded-full ${getBadgeColor(badge?.rarity)} flex items-center justify-center mb-2 group-hover:scale-110 transition-educational shadow-educational`}>
                  <Icon name={getBadgeIcon(badge?.type)} size={24} color="white" />
                </div>
                <p className="text-xs font-medium text-text-primary truncate w-16">
                  {badge?.name}
                </p>
                <p className="text-xs text-text-secondary">
                  {badge?.earnedDate}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* All Badges Grid */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-text-secondary">All Achievements</h4>
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
          {badges?.map((badge) => (
            <div
              key={badge?.id}
              className="text-center group cursor-pointer"
              title={`${badge?.name} - ${badge?.description}`}
            >
              <div className={`w-12 h-12 rounded-full ${getBadgeColor(badge?.rarity)} flex items-center justify-center mb-1 group-hover:scale-110 transition-educational shadow-educational ${!badge?.earned ? 'opacity-30 grayscale' : ''}`}>
                <Icon 
                  name={getBadgeIcon(badge?.type)} 
                  size={20} 
                  color="white" 
                />
              </div>
              <p className="text-xs font-medium text-text-primary truncate">
                {badge?.name}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* Progress to Next Badge */}
      <div className="mt-6 p-4 bg-muted rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-text-primary">Next Achievement</span>
          <span className="text-xs text-text-secondary">75% complete</span>
        </div>
        <div className="w-full bg-background rounded-full h-2 mb-2">
          <div className="bg-primary h-2 rounded-full transition-all duration-300" style={{ width: '75%' }}></div>
        </div>
        <p className="text-xs text-text-secondary">Complete 5 more quizzes to earn "Quiz Master" badge</p>
      </div>
    </div>
  );
};

export default BadgeShowcase;